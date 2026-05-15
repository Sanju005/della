"use client";

import { useEffect, useState } from "react";

import { PlaceholderTable } from "@/components/placeholder-table";
import { pickValue } from "@/lib/supabase/format";
import { fetchServices, type SupabaseRow } from "@/lib/supabase/queries";

export default function ServicesPage() {
  const [services, setServices] = useState<SupabaseRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    fetchServices()
      .then((data) => {
        if (!active) {
          return;
        }

        setServices(data);
        setErrorMessage(null);
      })
      .catch((error) => {
        if (!active) {
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Failed to load service data."
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

  const rows = services.map((service) => [
    pickValue(service, ["name", "category", "title"]),
    pickValue(service, ["sub_services", "subservices", "service_count", "items_count"]),
    pickValue(service, ["regions", "region", "coverage"]),
    pickValue(service, ["lead_owner", "owner", "manager"]),
    pickValue(service, ["status"]),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-accent">
          Services
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-ink">
          Service catalog
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate">
          Manage service categories, availability, and operational ownership
          from the live Supabase dataset.
        </p>
      </div>

      <PlaceholderTable
        title="Service categories"
        description="Live service records from the Supabase services table."
        columns={["Category", "Sub-services", "Regions", "Lead owner", "Status"]}
        rows={rows}
        isLoading={isLoading}
        errorMessage={errorMessage}
        emptyMessage="No service records were returned from Supabase."
      />
    </div>
  );
}
