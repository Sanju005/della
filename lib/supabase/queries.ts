import { getSupabaseClient } from "@/lib/supabase/client";

export type SupabaseRow = Record<string, unknown>;

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

export function fetchProviders() {
  return fetchTable("providers");
}

export function fetchCustomers() {
  return fetchTable("customers");
}

export function fetchBookings() {
  return fetchTable("bookings");
}
