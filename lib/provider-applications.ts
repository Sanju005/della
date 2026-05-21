import "server-only";

import { getSupabaseAdminClient } from "@/lib/supabase/admin";

type AvailabilityMode = "Always available" | "9 to 5" | "Weekends only";

type PortfolioItem = {
  title: string;
  caption: string;
  image_url: string;
};

type ServiceSubmission = {
  service_id: string;
  service_name: string;
  years_experience: number | null;
  specialties: string | null;
  radius_km: number | null;
  service_description: string | null;
  hourly_price: number | null;
  minimum_booking_hours: number | null;
  payments: string[];
  availability_modes: AvailabilityMode[];
  certificates_label?: string | null;
  driving_license_label?: string | null;
  portfolio: PortfolioItem[];
};

type DocumentSubmission = {
  document_type: string;
  label: string;
  file_url?: string | null;
  notes?: string | null;
};

export type ProviderApplicationSubmission = {
  first_name: string;
  last_name: string;
  date_of_birth?: string | null;
  residential_address: string;
  current_location: string;
  email: string;
  phone_number: string;
  id_number: string;
  profile_photo_url?: string | null;
  verification_email: string;
  verification_phone: string;
  services: ServiceSubmission[];
  documents?: DocumentSubmission[];
};

type CreatedNotification = {
  providerId: string;
  notificationId: string | null;
};

function getResendApiKey() {
  return process.env.RESEND_API_KEY ?? "";
}

function getAdminNotificationEmails() {
  return (process.env.ADMIN_NOTIFICATION_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string[];
  subject: string;
  html: string;
}) {
  const resendApiKey = getResendApiKey();

  if (!resendApiKey || to.length === 0) {
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "DELLA <no-reply@della.app>",
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend email failed: ${errorText}`);
  }
}

export async function submitProviderApplication(
  input: ProviderApplicationSubmission,
): Promise<CreatedNotification> {
  const supabase = getSupabaseAdminClient();

  const fullName = `${input.first_name} ${input.last_name}`.trim();
  const maxRadiusKm =
    input.services.reduce<number | null>((maxValue, service) => {
      if (service.radius_km === null) {
        return maxValue;
      }

      return maxValue === null ? service.radius_km : Math.max(maxValue, service.radius_km);
    }, null) ?? null;

  const maxExperienceYears =
    input.services.reduce<number | null>((maxValue, service) => {
      if (service.years_experience === null) {
        return maxValue;
      }

      return maxValue === null
        ? service.years_experience
        : Math.max(maxValue, service.years_experience);
    }, null) ?? null;

  const providerBio = input.services
    .map((service) => service.service_description?.trim())
    .filter((value): value is string => Boolean(value))
    .join("\n\n");

  const { data: provider, error: providerError } = await supabase
    .from("providers")
    .insert([
      {
        full_name: fullName,
        first_name: input.first_name,
        last_name: input.last_name,
        date_of_birth: input.date_of_birth,
        residential_address: input.residential_address,
        current_location: input.current_location,
        email: input.email,
        phone_number: input.phone_number,
        id_number: input.id_number,
        profile_photo_url: input.profile_photo_url,
        verification_email: input.verification_email,
        verification_phone: input.verification_phone,
        verification_status: "verified",
        status: "pending_review",
        radius_km: maxRadiusKm,
        experience_years: maxExperienceYears,
        bio: providerBio || null,
      },
    ] as never)
    .select("id")
    .single();

  if (providerError) {
    throw providerError;
  }

  const providerId = String(provider.id);

  const providerServicesPayload = input.services.map((service) => ({
    provider_id: providerId,
    service_id: service.service_id,
    service_name: service.service_name,
    hourly_price: service.hourly_price,
    radius_km: service.radius_km,
    experience_years: service.years_experience,
    specialties: service.specialties,
    description: service.service_description,
    minimum_booking_hours: service.minimum_booking_hours,
    payment_methods: service.payments,
    availability_modes: service.availability_modes,
    certificates_label: service.certificates_label ?? null,
    driving_license_label: service.driving_license_label ?? null,
    current_location: input.current_location,
  }));

  if (providerServicesPayload.length > 0) {
    const { error: servicesError } = await supabase
      .from("provider_services")
      .insert(providerServicesPayload as never);

    if (servicesError) {
      throw servicesError;
    }
  }

  const providerImagesPayload = input.services.flatMap((service) =>
    service.portfolio.slice(0, 3).map((item, index) => ({
      provider_id: providerId,
      service_id: service.service_id,
      image_url: item.image_url,
      caption: item.caption,
      title: item.title,
      sort_order: index,
    })),
  );

  if (providerImagesPayload.length > 0) {
    const { error: imagesError } = await supabase
      .from("provider_images")
      .insert(providerImagesPayload as never);

    if (imagesError) {
      throw imagesError;
    }
  }

  const providerDocumentsPayload = (input.documents ?? []).map((document) => ({
    provider_id: providerId,
    document_type: document.document_type,
    label: document.label,
    file_url: document.file_url ?? null,
    notes: document.notes ?? null,
    status: "pending_review",
  }));

  if (providerDocumentsPayload.length > 0) {
    const { error: documentsError } = await supabase
      .from("provider_documents")
      .insert(providerDocumentsPayload as never);

    if (documentsError) {
      throw documentsError;
    }
  }

  const { data: notification, error: notificationError } = await supabase
    .from("admin_notifications")
    .insert([
      {
        type: "pending_provider_registration",
        title: "New provider registration pending review",
        body: `${fullName} submitted a provider application with ${input.services.length} service(s).`,
        status: "unread",
        provider_id: providerId,
        metadata: {
          provider_name: fullName,
          email: input.email,
          phone_number: input.phone_number,
          services: input.services.map((service) => service.service_name),
        },
      },
    ] as never)
    .select("id")
    .maybeSingle();

  if (notificationError) {
    throw notificationError;
  }

  await Promise.all([
    sendEmail({
      to: [input.verification_email],
      subject: "Your DELLA provider application has been submitted",
      html: `
        <p>Your application has been submitted successfully.</p>
        <p>Our team is now reviewing your profile and documents. You will receive an email or in-app notification when your application is approved or if we need additional documents from you.</p>
      `,
    }),
    sendEmail({
      to: getAdminNotificationEmails(),
      subject: "New DELLA provider registration pending review",
      html: `
        <p>${fullName} submitted a new provider registration.</p>
        <p>Services: ${input.services.map((service) => service.service_name).join(", ")}</p>
        <p>Email: ${input.email}</p>
        <p>Phone: ${input.phone_number}</p>
      `,
    }),
  ]);

  return {
    providerId,
    notificationId: notification?.id ? String(notification.id) : null,
  };
}
