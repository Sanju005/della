import { NextResponse } from "next/server";

import {
  submitProviderApplication,
  type ProviderApplicationSubmission,
} from "@/lib/provider-applications";

function parseNullableNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function parseStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const servicesRaw = Array.isArray(body.services) ? body.services : [];

    if (servicesRaw.length === 0) {
      return NextResponse.json(
        { error: "At least one service is required." },
        { status: 400 },
      );
    }

    const submission: ProviderApplicationSubmission = {
      first_name: String(body.first_name ?? "").trim(),
      last_name: String(body.last_name ?? "").trim(),
      date_of_birth: body.date_of_birth ? String(body.date_of_birth) : null,
      residential_address: String(body.residential_address ?? "").trim(),
      current_location: String(body.current_location ?? "").trim(),
      email: String(body.email ?? "").trim(),
      phone_number: String(body.phone_number ?? "").trim(),
      id_number: String(body.id_number ?? "").trim(),
      profile_photo_url: body.profile_photo_url ? String(body.profile_photo_url) : null,
      verification_email: String(body.verification_email ?? body.email ?? "").trim(),
      verification_phone: String(body.verification_phone ?? body.phone_number ?? "").trim(),
      documents: Array.isArray(body.documents)
        ? body.documents.map((document) => ({
            document_type: String((document as Record<string, unknown>).document_type ?? "").trim(),
            label: String((document as Record<string, unknown>).label ?? "").trim(),
            file_url: (document as Record<string, unknown>).file_url
              ? String((document as Record<string, unknown>).file_url)
              : null,
            notes: (document as Record<string, unknown>).notes
              ? String((document as Record<string, unknown>).notes)
              : null,
          }))
        : [],
      services: servicesRaw.map((service) => {
        const raw = service as Record<string, unknown>;

        return {
          service_id: String(raw.service_id ?? "").trim(),
          service_name: String(raw.service_name ?? "").trim(),
          years_experience: parseNullableNumber(raw.years_experience),
          specialties: raw.specialties ? String(raw.specialties) : null,
          radius_km: parseNullableNumber(raw.radius_km),
          service_description: raw.service_description ? String(raw.service_description) : null,
          hourly_price: parseNullableNumber(raw.hourly_price),
          minimum_booking_hours: parseNullableNumber(raw.minimum_booking_hours),
          payments: parseStringArray(raw.payments),
          availability_modes: parseStringArray(raw.availability_modes) as (
            | "Always available"
            | "9 to 5"
            | "Weekends only"
          )[],
          certificates_label: raw.certificates_label ? String(raw.certificates_label) : null,
          driving_license_label: raw.driving_license_label ? String(raw.driving_license_label) : null,
          portfolio: Array.isArray(raw.portfolio)
            ? raw.portfolio.slice(0, 3).map((item) => ({
                title: String((item as Record<string, unknown>).title ?? "").trim(),
                caption: String((item as Record<string, unknown>).caption ?? "").trim(),
                image_url: String((item as Record<string, unknown>).image_url ?? "").trim(),
              }))
            : [],
        };
      }),
    };

    if (
      !submission.first_name ||
      !submission.last_name ||
      !submission.residential_address ||
      !submission.current_location ||
      !submission.email ||
      !submission.phone_number ||
      !submission.id_number
    ) {
      return NextResponse.json(
        { error: "Missing required provider fields." },
        { status: 400 },
      );
    }

    const result = await submitProviderApplication(submission);

    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to submit provider application.",
      },
      { status: 500 },
    );
  }
}
