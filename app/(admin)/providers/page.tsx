"use client";

import { useEffect, useState } from "react";

import { PlaceholderTable } from "@/components/placeholder-table";
import { pickValue } from "@/lib/supabase/format";
import { fetchProviders, type SupabaseRow } from "@/lib/supabase/queries";

export default function ProvidersPage() {
  const [providers, setProviders] = useState<SupabaseRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    fetchProviders()
      .then((data) => {
        if (!active) {
          return;
        }

        setProviders(data);
        setErrorMessage(null);
      })
      .catch((error) => {
        if (!active) {
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Failed to load provider data."
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

  const rows = providers.map((provider) => [
    pickValue(provider, ["name", "provider_name"]),
    pickValue(provider, ["category", "service_category", "type"]),
    pickValue(provider, ["region", "city", "location"]),
    pickValue(provider, ["verification", "verification_status"]),
    pickValue(provider, ["status"]),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-accent">
          Providers
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-ink">
          Provider directory
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate">
          Track onboarding, verification, and performance from the live
          Supabase provider table.
        </p>
      </div>

      <PlaceholderTable
        title="Provider queue"
        description="Provider records, operational status, and verification fields from Supabase."
        columns={["Provider", "Category", "Region", "Verification", "Status"]}
        rows={rows}
        isLoading={isLoading}
        errorMessage={errorMessage}
        emptyMessage="No provider records were returned from Supabase."
      />
    </div>
  );
}
