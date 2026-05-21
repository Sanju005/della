import { NextResponse } from "next/server";

import { getSupabaseAdminClient } from "@/lib/supabase/admin";

type RouteContext = {
  params: Promise<{
    providerId: string;
  }>;
};

export async function GET(_: Request, context: RouteContext) {
  const { providerId } = await context.params;

  if (!providerId?.trim()) {
    return NextResponse.json(
      {
        ok: false,
        error: "Provider id is required.",
      },
      { status: 400 },
    );
  }

  const supabase = getSupabaseAdminClient();

  const [{ data: provider, error: providerError }, { data: services, error: servicesError }, { data: documents, error: documentsError }, { data: latestReview, error: reviewError }] = await Promise.all([
    supabase
      .from("providers")
      .select("id, full_name, first_name, last_name, status, verification_email, verification_phone, created_at")
      .eq("id", providerId)
      .maybeSingle(),
    supabase
      .from("provider_services")
      .select("service_id, service_name, hourly_price, minimum_booking_hours, availability_modes")
      .eq("provider_id", providerId)
      .order("service_name", { ascending: true }),
    supabase
      .from("provider_documents")
      .select("id, document_type, label, status, notes, created_at")
      .eq("provider_id", providerId)
      .order("created_at", { ascending: false }),
    supabase
      .from("admin_notifications")
      .select("metadata, created_at")
      .eq("provider_id", providerId)
      .eq("type", "provider_status_updated")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  if (providerError || servicesError || documentsError || reviewError) {
    return NextResponse.json(
      {
        ok: false,
        error:
          providerError?.message ||
          servicesError?.message ||
          documentsError?.message ||
          reviewError?.message ||
          "Failed to fetch provider application status.",
      },
      { status: 500 },
    );
  }

  if (!provider) {
    return NextResponse.json(
      {
        ok: false,
        error: "Provider application not found.",
      },
      { status: 404 },
    );
  }

  const metadata =
    latestReview?.metadata && typeof latestReview.metadata === "object"
      ? (latestReview.metadata as Record<string, unknown>)
      : {};

  return NextResponse.json({
    ok: true,
    provider: {
      id: provider.id,
      full_name: provider.full_name,
      first_name: provider.first_name,
      last_name: provider.last_name,
      status: provider.status,
      verification_email: provider.verification_email,
      verification_phone: provider.verification_phone,
      created_at: provider.created_at,
    },
    services: services ?? [],
    documents: documents ?? [],
    latest_review: latestReview
      ? {
          created_at: latestReview.created_at,
          action: typeof metadata.action === "string" ? metadata.action : null,
          status: typeof metadata.status === "string" ? metadata.status : null,
          note: typeof metadata.note === "string" ? metadata.note : null,
        }
      : null,
  });
}
