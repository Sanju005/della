"use client";

import { useEffect, useState } from "react";

import { PlaceholderTable } from "@/components/placeholder-table";
import { formatTimestamp, pickValue } from "@/lib/supabase/format";
import { fetchCustomers, type SupabaseRow } from "@/lib/supabase/queries";

export default function UsersPage() {
  const [customers, setCustomers] = useState<SupabaseRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    fetchCustomers()
      .then((data) => {
        if (!active) {
          return;
        }

        setCustomers(data);
        setErrorMessage(null);
      })
      .catch((error) => {
        if (!active) {
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Failed to load customer data."
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

  const rows = customers.map((customer) => [
    pickValue(customer, ["name", "full_name", "customer_name"]),
    pickValue(customer, ["role", "user_role"], "Customer"),
    pickValue(customer, ["email"]),
    pickValue(customer, ["status"], "Active"),
    formatTimestamp(customer, ["last_active_at", "updated_at", "created_at"]),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Users</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink">User management</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate">
          Customer records from Supabase are shown here within the existing user
          management view.
        </p>
      </div>

      <PlaceholderTable
        title="All users"
        description="Live customer data from the Supabase customers table."
        columns={["Name", "Role", "Email", "Status", "Last active"]}
        rows={rows}
        isLoading={isLoading}
        errorMessage={errorMessage}
        emptyMessage="No customer records were returned from Supabase."
      />
    </div>
  );
}
