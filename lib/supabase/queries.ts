import { getSupabaseClient } from "@/lib/supabase/client";

export type SupabaseRow = Record<string, unknown>;

export const PROVIDER_STATUSES = [
  "pending_review",
  "approved",
  "rejected",
  "suspended",
] as const;

export type ProviderStatus = (typeof PROVIDER_STATUSES)[number];

export type ProviderServiceInput = {
  service_id: string;
  hourly_price: number | null;
  daily_price: number | null;
  per_job_price: number | null;
  per_trip_price: number | null;
};

export type CreateProviderInput = {
  full_name: string;
  status: ProviderStatus;
  radius_km: number | null;
  experience_years: number | null;
  bio: string | null;
  services: ProviderServiceInput[];
};

async function fetchTable(table: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from(table).select("*").limit(100);

  if (error) {
    throw error;
  }

  return (data ?? []) as SupabaseRow[];
}

export function fetchServices() {
  return fetchTable("services");
}

export async function fetchProviders() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("providers")
    .select("*")
    .limit(200);

  if (error) {
    throw error;
  }

  return (data ?? []) as SupabaseRow[];
}

export async function fetchProviderById(providerId: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("providers")
    .select("*")
    .eq("id", providerId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return (data ?? null) as SupabaseRow | null;
}

export async function fetchProviderServices(providerId?: string) {
  const supabase = getSupabaseClient();
  let query = supabase
    .from("provider_services")
    .select("*")
    .limit(providerId ? 200 : 500);

  if (providerId) {
    query = query.eq("provider_id", providerId);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return (data ?? []) as SupabaseRow[];
}

export async function fetchProviderImages(providerId?: string) {
  const supabase = getSupabaseClient();
  let query = supabase
    .from("provider_images")
    .select("*")
    .limit(providerId ? 50 : 300);

  if (providerId) {
    query = query.eq("provider_id", providerId);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return (data ?? []) as SupabaseRow[];
}

export function fetchCustomers() {
  return fetchTable("customers");
}

export function fetchBookings() {
  return fetchTable("bookings");
}

export async function createProvider(input: CreateProviderInput) {
  const supabase = getSupabaseClient();

  const providerPayload = {
    full_name: input.full_name,
    status: input.status,
    radius_km: input.radius_km,
    experience_years: input.experience_years,
    bio: input.bio,
  };

  const { data: provider, error: providerError } = await supabase
    .from("providers")
    .insert(providerPayload)
    .select("*")
    .single();

  if (providerError) {
    throw providerError;
  }

  if (input.services.length > 0) {
    const servicePayload = input.services.map((service) => ({
      provider_id: provider.id,
      service_id: service.service_id,
      hourly_price: service.hourly_price,
      daily_price: service.daily_price,
      per_job_price: service.per_job_price,
      per_trip_price: service.per_trip_price,
    }));

    const { error: servicesError } = await supabase
      .from("provider_services")
      .insert(servicePayload);

    if (servicesError) {
      throw servicesError;
    }
  }

  return provider as SupabaseRow;
}
