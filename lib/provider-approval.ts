import "server-only";

import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export const ADMIN_PROVIDER_ACTIONS = [
  "approve",
  "reject",
  "request_documents",
] as const;

export type AdminProviderAction = (typeof ADMIN_PROVIDER_ACTIONS)[number];

function getResendApiKey() {
  return process.env.RESEND_API_KEY ?? "";
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

function mapActionToStatus(action: AdminProviderAction) {
  if (action === "approve") {
    return "approved";
  }

  if (action === "reject") {
    return "rejected";
  }

  return "additional_documents_required";
}

function buildEmailContent({
  action,
  providerName,
  note,
}: {
  action: AdminProviderAction;
  providerName: string;
  note: string;
}) {
  if (action === "approve") {
    return {
      subject: "Your DELLA provider application has been approved",
      html: `
        <p>Hello ${providerName},</p>
        <p>Your DELLA provider application has been approved.</p>
        ${note ? `<p>Admin note: ${note}</p>` : ""}
        <p>You can now continue into the provider experience as your profile moves live.</p>
      `,
    };
  }

  if (action === "reject") {
    return {
      subject: "Your DELLA provider application was not approved",
      html: `
        <p>Hello ${providerName},</p>
        <p>Your DELLA provider application was reviewed and was not approved at this time.</p>
        ${note ? `<p>Admin note: ${note}</p>` : ""}
        <p>You may contact support or submit a new application when ready.</p>
      `,
    };
  }

  return {
    subject: "Additional documents are required for your DELLA provider application",
    html: `
      <p>Hello ${providerName},</p>
      <p>We reviewed your DELLA provider application and need additional documents before approval.</p>
      ${note ? `<p>Admin note: ${note}</p>` : ""}
      <p>Please return to your provider flow and upload the requested documents.</p>
    `,
  };
}

export async function updateProviderApprovalStatus({
  providerId,
  action,
  note,
}: {
  providerId: string;
  action: AdminProviderAction;
  note?: string;
}) {
  const supabase = getSupabaseAdminClient();
  const nextStatus = mapActionToStatus(action);

  const { data: provider, error: providerLookupError } = await supabase
    .from("providers")
    .select("id, full_name, email, verification_email")
    .eq("id", providerId)
    .maybeSingle();

  if (providerLookupError) {
    throw providerLookupError;
  }

  if (!provider) {
    throw new Error("Provider could not be found.");
  }

  const { error: updateError } = await supabase
    .from("providers")
    .update({
      status: nextStatus,
    } as never)
    .eq("id", providerId);

  if (updateError) {
    throw updateError;
  }

  const providerName = String(provider.full_name ?? "Provider");
  const providerEmail = String(
    provider.verification_email ?? provider.email ?? "",
  ).trim();
  const trimmedNote = note?.trim() ?? "";

  const notificationBody =
    action === "approve"
      ? `${providerName} was approved by admin.`
      : action === "reject"
        ? `${providerName} was rejected by admin.`
        : `${providerName} needs additional documents before approval.`;

  const { error: notificationError } = await supabase
    .from("admin_notifications")
    .insert([
      {
        type: "provider_status_updated",
        title: "Provider review action completed",
        body: notificationBody,
        status: "unread",
        provider_id: providerId,
        metadata: {
          action,
          status: nextStatus,
          note: trimmedNote,
        },
      },
    ] as never);

  if (notificationError) {
    throw notificationError;
  }

  const emailContent = buildEmailContent({
    action,
    providerName,
    note: trimmedNote,
  });

  if (providerEmail) {
    await sendEmail({
      to: [providerEmail],
      subject: emailContent.subject,
      html: emailContent.html,
    });
  }

  return {
    providerId,
    status: nextStatus,
  };
}
