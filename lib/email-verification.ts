import "server-only";

import crypto from "node:crypto";

import { getSupabaseAdminClient } from "@/lib/supabase/admin";

function getResendApiKey() {
  return process.env.RESEND_API_KEY ?? "";
}

function getAppBaseUrl() {
  return process.env.APP_BASE_URL?.trim() || "http://localhost:3000";
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

export async function sendVerificationEmail(email: string) {
  const supabase = getSupabaseAdminClient();
  const token = crypto.randomBytes(24).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  const { error: insertError } = await supabase.from("email_verifications").insert([
    {
      email,
      token_hash: tokenHash,
      status: "pending",
    },
  ] as never);

  if (insertError) {
    throw insertError;
  }

  const verifyUrl = `${getAppBaseUrl()}/api/auth/email-verify/confirm?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`;

  await sendEmail({
    to: [email],
    subject: "Verify your DELLA email address",
    html: `
      <p>Hello,</p>
      <p>Please verify your email address to continue your DELLA provider registration.</p>
      <p><a href="${verifyUrl}">Verify Email Address</a></p>
      <p>If the button does not open, use this link:</p>
      <p>${verifyUrl}</p>
    `,
  });

  return { ok: true };
}

export async function confirmVerificationEmail({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  const supabase = getSupabaseAdminClient();
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  const { data, error } = await supabase
    .from("email_verifications")
    .select("id, status")
    .eq("email", email)
    .eq("token_hash", tokenHash)
    .eq("status", "pending")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("Verification link is invalid or expired.");
  }

  const { error: updateError } = await supabase
    .from("email_verifications")
    .update({
      status: "verified",
      verified_at: new Date().toISOString(),
    } as never)
    .eq("id", data.id);

  if (updateError) {
    throw updateError;
  }

  return { ok: true };
}

export async function getEmailVerificationStatus(email: string) {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("email_verifications")
    .select("status, verified_at, created_at")
    .eq("email", email)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ?? null;
}
