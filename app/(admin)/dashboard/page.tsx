"use client";

import { useEffect, useState } from "react";

import { KpiCard } from "@/components/kpi-card";
import { PlaceholderTable } from "@/components/placeholder-table";
import { formatCount, pickValue } from "@/lib/supabase/format";
import {
  fetchBookings,
  fetchCustomers,
  fetchProviders,
  fetchServices,
  type SupabaseRow,
} from "@/lib/supabase/queries";

export default function DashboardPage() {
  const [bookings, setBookings] = useState<SupabaseRow[]>([]);
  const [providers, setProviders] = useState<SupabaseRow[]>([]);
  const [customers, setCustomers] = useState<SupabaseRow[]>([]);
  const [services, setServices] = useState<SupabaseRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadDashboardData() {
      try {
        const [bookingsData, providersData, customersData, servicesData] =
          await Promise.all([
            fetchBookings(),
            fetchProviders(),
            fetchCustomers(),
            fetchServices(),
          ]);

        if (!active) {
          return;
        }

        setBookings(bookingsData);
        setProviders(providersData);
        setCustomers(customersData);
        setServices(servicesData);
        setErrorMessage(null);
      } catch (error) {
        if (!active) {
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Failed to load dashboard data."
        );
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadDashboardData();

    return () => {
      active = false;
    };
  }, []);

  const metrics = [
    {
      label: "Customers",
      value: formatCount(customers.length),
      delta: errorMessage ? "Sync issue" : "Live",
      detail: "customer records in Supabase",
    },
    {
      label: "Providers",
      value: formatCount(providers.length),
      delta: errorMessage ? "Sync issue" : "Live",
      detail: "provider records in Supabase",
    },
    {
      label: "Bookings",
      value: formatCount(bookings.length),
      delta: errorMessage ? "Sync issue" : "Live",
      detail: "booking records in Supabase",
    },
    {
      label: "Services",
      value: formatCount(services.length),
      delta: errorMessage ? "Sync issue" : "Live",
      detail: "service records in Supabase",
    },
  ];

  const bookingRows = bookings.slice(0, 6).map((booking) => [
    pickValue(booking, ["booking_id", "code", "id"]),
    pickValue(booking, ["customer_name", "customer", "customer_id"]),
    pickValue(booking, ["provider_name", "provider", "provider_id"]),
    pickValue(booking, ["status"]),
    pickValue(booking, ["booking_date", "scheduled_at", "date", "created_at"]),
  ]);

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent">
              Control Center
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-ink">
              DELLA Admin Dashboard
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate">
              A live operations overview powered by Supabase Auth and database
              queries while preserving the existing admin panel layout.
            </p>
          </div>

          <div className="rounded-2xl border border-accent/15 bg-accent-soft px-4 py-3 text-sm text-accent-dark">
            {isLoading ? "Refreshing snapshot..." : "Snapshot refreshed just now"}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <KpiCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <PlaceholderTable
          title="Recent bookings"
          description="Latest booking activity from the Supabase bookings table."
          columns={["Booking ID", "Customer", "Provider", "Status", "Date"]}
          rows={bookingRows}
          isLoading={isLoading}
          errorMessage={errorMessage}
          emptyMessage="No bookings were returned from Supabase."
        />

        <div className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-card">
          <h2 className="text-lg font-semibold text-ink">Team notes</h2>
          <div className="mt-5 space-y-4">
            {[
              "Supabase Auth now protects the admin workspace before route access.",
              "Providers, services, customers, and bookings load from live tables.",
              "Settings remains focused on configuration without extra product modules.",
            ].map((note) => (
              <div
                key={note}
                className="rounded-2xl border border-slate-200 bg-mist/60 p-4 text-sm leading-6 text-slate"
              >
                {note}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
