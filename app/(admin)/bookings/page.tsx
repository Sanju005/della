"use client";

import { useEffect, useState } from "react";

import { PlaceholderTable } from "@/components/placeholder-table";
import { pickValue } from "@/lib/supabase/format";
import { fetchBookings, type SupabaseRow } from "@/lib/supabase/queries";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<SupabaseRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    fetchBookings()
      .then((data) => {
        if (!active) {
          return;
        }

        setBookings(data);
        setErrorMessage(null);
      })
      .catch((error) => {
        if (!active) {
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Failed to load booking data."
        );
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const rows = bookings.map((booking) => [
    pickValue(booking, ["booking_id", "code", "id"]),
    pickValue(booking, ["service_name", "service", "service_id"]),
    pickValue(booking, ["customer_name", "customer", "customer_id"]),
    pickValue(booking, ["provider_name", "provider", "provider_id"]),
    pickValue(booking, ["status"]),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-accent">
          Bookings
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-ink">
          Booking operations
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate">
          Schedule, monitor, and review booking records from the live Supabase
          dataset.
        </p>
      </div>

      <PlaceholderTable
        title="Recent bookings"
        description="Live booking data from the Supabase bookings table."
        columns={["Booking ID", "Service", "Customer", "Provider", "Status"]}
        rows={rows}
        isLoading={isLoading}
        errorMessage={errorMessage}
        emptyMessage="No booking records were returned from Supabase."
      />
    </div>
  );
}
