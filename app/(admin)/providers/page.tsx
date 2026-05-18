"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { ProviderStatusBadge } from "@/components/provider-status-badge";
import { getNumberValue, getStringValue } from "@/lib/supabase/format";
import {
  fetchProviderImages,
  fetchProviders,
  fetchProviderServices,
  fetchServices,
  type SupabaseRow,
} from "@/lib/supabase/queries";

function formatCurrency(value: number | null) {
  if (value === null) {
    return null;
  }

  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

function getProviderName(provider: SupabaseRow) {
  return (
    getStringValue(provider, ["full_name", "name", "provider_name"]) ??
    "Unnamed provider"
  );
}

function getServiceName(service: SupabaseRow | undefined) {
  if (!service) {
    return "Assigned service";
  }

  return (
    getStringValue(service, ["name", "title", "service_name", "category"]) ??
    "Assigned service"
  );
}

function getProviderBio(provider: SupabaseRow) {
  return (
    getStringValue(provider, ["bio", "description", "about"]) ??
    "No provider biography has been added yet."
  );
}

type ProviderCardData = {
  id: string;
  name: string;
  status: string | null;
  bio: string;
  radiusKm: number | null;
  experienceYears: number | null;
  assignedServices: { id: string; name: string }[];
  minPriceLabel: string | null;
  imageCount: number;
};

export default function ProvidersPage() {
  const [providers, setProviders] = useState<SupabaseRow[]>([]);
  const [services, setServices] = useState<SupabaseRow[]>([]);
  const [providerServices, setProviderServices] = useState<SupabaseRow[]>([]);
  const [providerImages, setProviderImages] = useState<SupabaseRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadProviderModule() {
      try {
        const [providerData, serviceData, assignmentData, imageData] =
          await Promise.all([
            fetchProviders(),
            fetchServices(),
            fetchProviderServices(),
            fetchProviderImages(),
          ]);

        if (!active) {
          return;
        }

        setProviders(providerData);
        setServices(serviceData);
        setProviderServices(assignmentData);
        setProviderImages(imageData);
        setErrorMessage(null);
      } catch (error) {
        if (!active) {
          return;
        }

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Failed to load provider management data.",
        );
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadProviderModule();

    return () => {
      active = false;
    };
  }, []);

  const serviceMap = useMemo(() => {
    return new Map(
      services.map((service) => [
        String(service.id ?? getServiceName(service)),
        service,
      ]),
    );
  }, [services]);

  const assignmentsByProvider = useMemo(() => {
    const result = new Map<string, SupabaseRow[]>();

    providerServices.forEach((assignment) => {
      const providerId = getStringValue(assignment, ["provider_id"]);
      if (!providerId) {
        return;
      }

      const currentAssignments = result.get(providerId) ?? [];
      currentAssignments.push(assignment);
      result.set(providerId, currentAssignments);
    });

    return result;
  }, [providerServices]);

  const imageCountByProvider = useMemo(() => {
    const result = new Map<string, number>();

    providerImages.forEach((image) => {
      const providerId = getStringValue(image, ["provider_id"]);
      if (!providerId) {
        return;
      }

      result.set(providerId, (result.get(providerId) ?? 0) + 1);
    });

    return result;
  }, [providerImages]);

  const providerCards = useMemo<ProviderCardData[]>(() => {
    return providers
      .map((provider) => {
        const id = getStringValue(provider, ["id"]);
        if (!id) {
          return null;
        }

        const assignments = assignmentsByProvider.get(id) ?? [];
        const assignedServices = assignments.map((assignment) => {
          const serviceId = getStringValue(assignment, ["service_id"]) ?? "service";
          return {
            id: serviceId,
            name: getServiceName(serviceMap.get(serviceId)),
          };
        });

        const prices = assignments
          .flatMap((assignment) => [
            getNumberValue(assignment, ["hourly_price"]),
            getNumberValue(assignment, ["daily_price"]),
            getNumberValue(assignment, ["per_job_price"]),
            getNumberValue(assignment, ["per_trip_price"]),
          ])
          .filter((value): value is number => value !== null);

        return {
          id,
          name: getProviderName(provider),
          status: getStringValue(provider, ["status"]),
          bio: getProviderBio(provider),
          radiusKm: getNumberValue(provider, ["radius_km"]),
          experienceYears: getNumberValue(provider, ["experience_years"]),
          assignedServices,
          minPriceLabel:
            prices.length > 0
              ? `Starts from ${formatCurrency(Math.min(...prices))}`
              : null,
          imageCount: imageCountByProvider.get(id) ?? 0,
        };
      })
      .filter((provider): provider is ProviderCardData => provider !== null);
  }, [assignmentsByProvider, imageCountByProvider, providers, serviceMap]);

  const metrics = useMemo(() => {
    return [
      {
        label: "Total providers",
        value: providerCards.length,
        detail: "profiles in the admin directory",
      },
      {
        label: "Pending review",
        value: providerCards.filter(
          (provider) => provider.status === "pending_review",
        ).length,
        detail: "profiles waiting for approval",
      },
      {
        label: "Approved",
        value: providerCards.filter((provider) => provider.status === "approved")
          .length,
        detail: "ready for live assignments",
      },
      {
        label: "Service assignments",
        value: providerServices.length,
        detail: "provider to service pricing records",
      },
    ];
  }, [providerCards, providerServices.length]);

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent">
              Providers
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-ink">
              Provider management
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate">
              Manage provider profiles, service assignments, pricing models,
              and onboarding status from one DELLA admin workspace.
            </p>
          </div>

          <Link
            href="/providers/add"
            className="inline-flex items-center justify-center rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
          >
            Add provider
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-[24px] border border-white/70 bg-white/90 p-5 shadow-card"
          >
            <p className="text-xs uppercase tracking-[0.26em] text-slate">
              {metric.label}
            </p>
            <p className="mt-4 text-3xl font-semibold text-ink">
              {metric.value}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate">{metric.detail}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-card">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-ink">
              Provider directory
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate">
              Every provider profile with service tags, pricing coverage, and
              status visibility.
            </p>
          </div>

          <p className="text-sm text-slate">
            {isLoading
              ? "Refreshing provider records..."
              : `${providerCards.length} providers loaded`}
          </p>
        </div>

        {errorMessage ? (
          <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {errorMessage}
          </div>
        ) : null}

        {isLoading ? (
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-64 animate-pulse rounded-[24px] border border-slate-200 bg-mist/70"
              />
            ))}
          </div>
        ) : providerCards.length === 0 ? (
          <div className="mt-6 rounded-[24px] border border-dashed border-slate-300 bg-mist/50 px-6 py-10 text-center text-sm leading-6 text-slate">
            No providers were returned from Supabase yet. Add the first provider
            profile to start assigning services.
          </div>
        ) : (
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {providerCards.map((provider) => (
              <article
                key={provider.id}
                className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-card"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.26em] text-accent">
                      Provider profile
                    </p>
                    <h3 className="mt-3 text-xl font-semibold text-ink">
                      {provider.name}
                    </h3>
                  </div>

                  <ProviderStatusBadge status={provider.status} />
                </div>

                <p className="mt-4 text-sm leading-6 text-slate">
                  {provider.bio}
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-mist/40 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate">
                      Experience
                    </p>
                    <p className="mt-2 text-sm font-semibold text-ink">
                      {provider.experienceYears !== null
                        ? `${provider.experienceYears} years`
                        : "Not set"}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-mist/40 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate">
                      Radius
                    </p>
                    <p className="mt-2 text-sm font-semibold text-ink">
                      {provider.radiusKm !== null
                        ? `${provider.radiusKm} km`
                        : "Not set"}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-mist/40 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate">
                      Images
                    </p>
                    <p className="mt-2 text-sm font-semibold text-ink">
                      {provider.imageCount} uploaded
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate">
                    Assigned services
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {provider.assignedServices.length > 0 ? (
                      provider.assignedServices.map((service) => (
                        <span
                          key={`${provider.id}-${service.id}`}
                          className="rounded-full border border-accent/20 bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent-dark"
                        >
                          {service.name}
                        </span>
                      ))
                    ) : (
                      <span className="rounded-full border border-slate-200 bg-mist/50 px-3 py-1.5 text-xs font-medium text-slate">
                        No services assigned
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-slate">
                    {provider.minPriceLabel ?? "Pricing will appear after rates are added."}
                  </div>
                  <Link
                    href={`/providers/details?providerId=${encodeURIComponent(provider.id)}`}
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent-dark"
                  >
                    View details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
