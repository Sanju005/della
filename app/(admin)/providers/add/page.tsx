"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";

import { getStringValue } from "@/lib/supabase/format";
import {
  createProvider,
  fetchServices,
  PROVIDER_STATUSES,
  type CreateProviderInput,
  type ProviderStatus,
  type SupabaseRow,
} from "@/lib/supabase/queries";

type ServiceDraft = {
  selected: boolean;
  hourly_price: string;
  daily_price: string;
  per_job_price: string;
  per_trip_price: string;
};

type ServicePriceField =
  | "hourly_price"
  | "daily_price"
  | "per_job_price"
  | "per_trip_price";

function parseNullableNumber(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatStatusLabel(status: ProviderStatus) {
  return status
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getServiceName(service: SupabaseRow) {
  return (
    getStringValue(service, ["name", "title", "service_name", "category"]) ??
    "Service"
  );
}

function getServiceDescription(service: SupabaseRow) {
  return (
    getStringValue(service, ["description", "summary", "details"]) ??
    "Assign pricing for this provider if they will offer this service."
  );
}

const servicePriceFields: { key: ServicePriceField; label: string }[] = [
  {
    key: "hourly_price",
    label: "Hourly price",
  },
  {
    key: "daily_price",
    label: "Daily price",
  },
  {
    key: "per_job_price",
    label: "Per job price",
  },
  {
    key: "per_trip_price",
    label: "Per trip price",
  },
];

export default function AddProviderPage() {
  const router = useRouter();
  const [services, setServices] = useState<SupabaseRow[]>([]);
  const [serviceDrafts, setServiceDrafts] = useState<Record<string, ServiceDraft>>(
    {},
  );
  const [fullName, setFullName] = useState("");
  const [status, setStatus] = useState<ProviderStatus>("pending_review");
  const [radiusKm, setRadiusKm] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    fetchServices()
      .then((serviceData) => {
        if (!active) {
          return;
        }

        setServices(serviceData);
        setServiceDrafts(
          Object.fromEntries(
            serviceData.map((service) => {
              const id = String(service.id ?? getServiceName(service));
              return [
                id,
                {
                  selected: false,
                  hourly_price: "",
                  daily_price: "",
                  per_job_price: "",
                  per_trip_price: "",
                },
              ];
            }),
          ),
        );
      })
      .catch((error) => {
        if (!active) {
          return;
        }

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Failed to load services for assignment.",
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

  const selectedCount = useMemo(() => {
    return Object.values(serviceDrafts).filter((draft) => draft.selected).length;
  }, [serviceDrafts]);

  function updateServiceDraft(
    serviceId: string,
    updater: (draft: ServiceDraft) => ServiceDraft,
  ) {
    setServiceDrafts((current) => ({
      ...current,
      [serviceId]: updater(
        current[serviceId] ?? {
          selected: false,
          hourly_price: "",
          daily_price: "",
          per_job_price: "",
          per_trip_price: "",
        },
      ),
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage("Provider full name is required.");
      return;
    }

    const selectedServices = services
      .map((service) => {
        const serviceId = String(service.id ?? "");
        const draft = serviceDrafts[serviceId];

        if (!serviceId || !draft?.selected) {
          return null;
        }

        return {
          service_id: serviceId,
          hourly_price: parseNullableNumber(draft.hourly_price),
          daily_price: parseNullableNumber(draft.daily_price),
          per_job_price: parseNullableNumber(draft.per_job_price),
          per_trip_price: parseNullableNumber(draft.per_trip_price),
        };
      })
      .filter((service): service is CreateProviderInput["services"][number] => {
        return service !== null;
      });

    if (selectedServices.length === 0) {
      setErrorMessage("Select at least one service for this provider.");
      return;
    }

    setIsSubmitting(true);

    try {
      const provider = await createProvider({
        full_name: fullName.trim(),
        status,
        radius_km: parseNullableNumber(radiusKm),
        experience_years: parseNullableNumber(experienceYears),
        bio: bio.trim() || null,
        services: selectedServices,
      });

      const providerId = getStringValue(provider, ["id"]);

      if (!providerId) {
        throw new Error("Provider was created, but no provider id was returned.");
      }

      router.push(`/providers/details?providerId=${encodeURIComponent(providerId)}`);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to create provider profile.",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent">
              Providers
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-ink">
              Add provider
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate">
              Create a provider profile, assign services, and capture DELLA
              pricing models from the admin panel.
            </p>
          </div>

          <Link
            href="/providers"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent-dark"
          >
            Back to providers
          </Link>
        </div>
      </section>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-card">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <label className="mb-2 block text-sm font-medium text-ink" htmlFor="full-name">
                Provider full name
              </label>
              <input
                id="full-name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Enter provider full name"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-ink" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(event) => setStatus(event.target.value as ProviderStatus)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
              >
                {PROVIDER_STATUSES.map((option) => (
                  <option key={option} value={option}>
                    {formatStatusLabel(option)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-medium text-ink"
                htmlFor="experience-years"
              >
                Experience years
              </label>
              <input
                id="experience-years"
                inputMode="decimal"
                value={experienceYears}
                onChange={(event) => setExperienceYears(event.target.value)}
                placeholder="e.g. 5"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-ink" htmlFor="radius-km">
                Radius (km)
              </label>
              <input
                id="radius-km"
                inputMode="decimal"
                value={radiusKm}
                onChange={(event) => setRadiusKm(event.target.value)}
                placeholder="e.g. 15"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="mb-2 block text-sm font-medium text-ink" htmlFor="bio">
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                placeholder="Add provider experience, specialties, and service notes"
                rows={5}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
              />
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-card">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-ink">
                Assign services and pricing
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate">
                Select one or more services, then add hourly, daily, per-job,
                or per-trip pricing as needed.
              </p>
            </div>

            <p className="text-sm text-slate">
              {isLoading
                ? "Loading services..."
                : `${selectedCount} services selected`}
            </p>
          </div>

          {errorMessage ? (
            <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {errorMessage}
            </div>
          ) : null}

          <div className="mt-6 grid gap-4 xl:grid-cols-2">
            {services.map((service) => {
              const serviceId = String(service.id ?? "");
              const draft = serviceDrafts[serviceId];
              const isSelected = Boolean(draft?.selected);

              return (
                <article
                  key={serviceId || getServiceName(service)}
                  className={`rounded-[24px] border p-5 transition ${
                    isSelected
                      ? "border-accent/30 bg-accent-soft/60"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-ink">
                        {getServiceName(service)}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate">
                        {getServiceDescription(service)}
                      </p>
                    </div>

                    <label className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-ink">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(event) =>
                          updateServiceDraft(serviceId, (current) => ({
                            ...current,
                            selected: event.target.checked,
                          }))
                        }
                        className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent"
                      />
                      Assign
                    </label>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {servicePriceFields.map((field) => (
                      <div key={field.key}>
                        <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-slate">
                          {field.label}
                        </label>
                        <input
                          inputMode="decimal"
                          value={draft?.[field.key] ?? ""}
                          onChange={(event) =>
                            updateServiceDraft(serviceId, (current) => ({
                              ...current,
                              [field.key]: event.target.value,
                            }))
                          }
                          placeholder="0.00"
                          disabled={!isSelected}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                        />
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/providers"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent-dark"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="inline-flex items-center justify-center rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Creating provider..." : "Create provider"}
          </button>
        </div>
      </form>
    </div>
  );
}
