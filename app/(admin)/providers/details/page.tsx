"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { ProviderStatusBadge } from "@/components/provider-status-badge";
import { getNumberValue, getStringValue } from "@/lib/supabase/format";
import {
  fetchProviderById,
  fetchProviderDocuments,
  fetchProviderImages,
  fetchProviderServices,
  fetchServices,
  type SupabaseRow,
} from "@/lib/supabase/queries";

function formatCurrency(value: number | null) {
  if (value === null) {
    return "Not set";
  }

  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
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

function getProviderName(provider: SupabaseRow | null) {
  if (!provider) {
    return "Provider";
  }

  return (
    getStringValue(provider, ["full_name", "name", "provider_name"]) ??
    "Unnamed provider"
  );
}

function getImageUrl(image: SupabaseRow) {
  const value = getStringValue(image, [
    "image_url",
    "url",
    "public_url",
    "src",
    "path",
  ]);

  if (!value) {
    return null;
  }

  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("/")
  ) {
    return value;
  }

  return null;
}

type ProviderServiceCard = {
  assignmentId: string;
  serviceName: string;
  hourlyPrice: number | null;
  dailyPrice: number | null;
  perJobPrice: number | null;
  perTripPrice: number | null;
};

export default function ProviderDetailPage() {
  const searchParams = useSearchParams();
  const providerId = searchParams.get("providerId");

  const [provider, setProvider] = useState<SupabaseRow | null>(null);
  const [services, setServices] = useState<SupabaseRow[]>([]);
  const [assignments, setAssignments] = useState<SupabaseRow[]>([]);
  const [images, setImages] = useState<SupabaseRow[]>([]);
  const [documents, setDocuments] = useState<SupabaseRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reviewNote, setReviewNote] = useState("");
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [isActionSubmitting, setIsActionSubmitting] = useState(false);

  useEffect(() => {
    if (!providerId) {
      setIsLoading(false);
      setErrorMessage("Provider id is missing.");
      return;
    }

    const resolvedProviderId = providerId;
    let active = true;

    async function loadProviderDetail(showLoader = true) {
      if (showLoader) {
        setIsLoading(true);
      }

      try {
        const [providerData, serviceData, assignmentData, imageData, documentData] =
          await Promise.all([
            fetchProviderById(resolvedProviderId),
            fetchServices(),
            fetchProviderServices(resolvedProviderId),
            fetchProviderImages(resolvedProviderId),
            fetchProviderDocuments(resolvedProviderId),
          ]);

        if (!active) {
          return;
        }

        setProvider(providerData);
        setServices(serviceData);
        setAssignments(assignmentData);
        setImages(imageData);
        setDocuments(documentData);
        setErrorMessage(null);
      } catch (error) {
        if (!active) {
          return;
        }

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Failed to load provider detail.",
        );
      } finally {
        if (active && showLoader) {
          setIsLoading(false);
        }
      }
    }

    void loadProviderDetail(true);

    return () => {
      active = false;
    };
  }, [providerId]);

  const serviceMap = useMemo(() => {
    return new Map(
      services.map((service) => [
        String(service.id ?? getServiceName(service)),
        service,
      ]),
    );
  }, [services]);

  const serviceCards = useMemo<ProviderServiceCard[]>(() => {
    return assignments.map((assignment, index) => {
      const serviceId = getStringValue(assignment, ["service_id"]);
      const service = serviceId ? serviceMap.get(serviceId) : undefined;

      return {
        assignmentId:
          getStringValue(assignment, ["id"]) ??
          `${serviceId ?? "service"}-${index}`,
        serviceName: getServiceName(service),
        hourlyPrice: getNumberValue(assignment, ["hourly_price"]),
        dailyPrice: getNumberValue(assignment, ["daily_price"]),
        perJobPrice: getNumberValue(assignment, ["per_job_price"]),
        perTripPrice: getNumberValue(assignment, ["per_trip_price"]),
      };
    });
  }, [assignments, serviceMap]);

  const imageUrls = useMemo(() => {
    return images
      .map((image) => getImageUrl(image))
      .filter((value): value is string => Boolean(value));
  }, [images]);

  const providerBio =
    getStringValue(provider ?? {}, ["bio", "description", "about"]) ??
    "No provider biography has been saved yet.";

  async function handleProviderAction(
    action: "approve" | "reject" | "request_documents",
  ) {
    if (!providerId) {
      return;
    }

    setIsActionSubmitting(true);
    setActionMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch(`/api/admin/providers/${encodeURIComponent(providerId)}/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          note: reviewNote,
        }),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Failed to update provider status.");
      }

      setActionMessage(
        action === "approve"
          ? "Provider approved and email sent."
          : action === "reject"
            ? "Provider rejected and email sent."
            : "Provider marked as additional documents required and email sent.",
      );

      const [providerData, assignmentData, imageData, documentData] =
        await Promise.all([
          fetchProviderById(providerId),
          fetchProviderServices(providerId),
          fetchProviderImages(providerId),
          fetchProviderDocuments(providerId),
        ]);

      setProvider(providerData);
      setAssignments(assignmentData);
      setImages(imageData);
      setDocuments(documentData);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to update provider status.",
      );
    } finally {
      setIsActionSubmitting(false);
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
              {isLoading ? "Loading provider..." : getProviderName(provider)}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate">
              Review provider details, assigned services, pricing, and image
              records from Supabase.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/providers"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent-dark"
            >
              Back to providers
            </Link>
            <Link
              href="/providers/add"
              className="inline-flex items-center justify-center rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
            >
              Add another provider
            </Link>
          </div>
        </div>
      </section>

      {errorMessage ? (
        <div className="rounded-[24px] border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
          {errorMessage}
        </div>
      ) : null}

      {actionMessage ? (
        <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
          {actionMessage}
        </div>
      ) : null}

      {isLoading ? (
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="h-72 animate-pulse rounded-[28px] border border-slate-200 bg-mist/70" />
          <div className="h-72 animate-pulse rounded-[28px] border border-slate-200 bg-mist/70" />
        </div>
      ) : !provider ? (
        <div className="rounded-[24px] border border-dashed border-slate-300 bg-mist/50 px-6 py-10 text-center text-sm leading-6 text-slate">
          The provider record could not be found.
        </div>
      ) : (
        <>
          <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-card">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-accent">
                  Review actions
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-ink">
                  Approve, reject, or request documents
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate">
                  These actions update the provider status in Supabase and send
                  an email to the provider with the result.
                </p>
              </div>
            </div>

            <div className="mt-5">
              <label
                className="mb-2 block text-sm font-medium text-ink"
                htmlFor="review-note"
              >
                Admin note
              </label>
              <textarea
                id="review-note"
                value={reviewNote}
                onChange={(event) => setReviewNote(event.target.value)}
                placeholder="Optional note sent to the provider"
                rows={4}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
              />
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                disabled={isActionSubmitting}
                onClick={() => void handleProviderAction("approve")}
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isActionSubmitting ? "Updating..." : "Approve provider"}
              </button>
              <button
                type="button"
                disabled={isActionSubmitting}
                onClick={() => void handleProviderAction("request_documents")}
                className="inline-flex items-center justify-center rounded-2xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                Request documents
              </button>
              <button
                type="button"
                disabled={isActionSubmitting}
                onClick={() => void handleProviderAction("reject")}
                className="inline-flex items-center justify-center rounded-2xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                Reject provider
              </button>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-card">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-accent">
                    Profile summary
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-ink">
                    {getProviderName(provider)}
                  </h2>
                </div>

                <ProviderStatusBadge status={getStringValue(provider, ["status"])} />
              </div>

              <p className="mt-5 text-sm leading-7 text-slate">{providerBio}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-mist/50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate">
                    Experience
                  </p>
                  <p className="mt-2 text-lg font-semibold text-ink">
                    {getNumberValue(provider, ["experience_years"]) !== null
                      ? `${getNumberValue(provider, ["experience_years"])} years`
                      : "Not set"}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-mist/50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate">
                    Service radius
                  </p>
                  <p className="mt-2 text-lg font-semibold text-ink">
                    {getNumberValue(provider, ["radius_km"]) !== null
                      ? `${getNumberValue(provider, ["radius_km"])} km`
                      : "Not set"}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-mist/50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate">
                    Assigned services
                  </p>
                  <p className="mt-2 text-lg font-semibold text-ink">
                    {serviceCards.length}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-mist/50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate">
                    Provider images
                  </p>
                  <p className="mt-2 text-lg font-semibold text-ink">
                    {images.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-card">
              <h2 className="text-xl font-semibold text-ink">
                Assigned services
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate">
                Services and pricing attached to this provider application.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {serviceCards.length > 0 ? (
                  serviceCards.map((serviceCard) => (
                    <span
                      key={`${serviceCard.assignmentId}-tag`}
                      className="rounded-full border border-accent/20 bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent-dark"
                    >
                      {serviceCard.serviceName}
                    </span>
                  ))
                ) : (
                  <span className="rounded-full border border-slate-200 bg-mist/50 px-3 py-1.5 text-xs font-medium text-slate">
                    No services assigned yet
                  </span>
                )}
              </div>

              <div className="mt-6 grid gap-4">
                {serviceCards.length > 0 ? (
                  serviceCards.map((serviceCard) => (
                    <article
                      key={serviceCard.assignmentId}
                      className="rounded-[24px] border border-slate-200 bg-white p-5"
                    >
                      <h3 className="text-lg font-semibold text-ink">
                        {serviceCard.serviceName}
                      </h3>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-slate-200 bg-mist/40 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate">
                            Hourly
                          </p>
                          <p className="mt-2 text-sm font-semibold text-ink">
                            {formatCurrency(serviceCard.hourlyPrice)}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-mist/40 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate">
                            Daily
                          </p>
                          <p className="mt-2 text-sm font-semibold text-ink">
                            {formatCurrency(serviceCard.dailyPrice)}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-mist/40 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate">
                            Per job
                          </p>
                          <p className="mt-2 text-sm font-semibold text-ink">
                            {formatCurrency(serviceCard.perJobPrice)}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-mist/40 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate">
                            Per trip
                          </p>
                          <p className="mt-2 text-sm font-semibold text-ink">
                            {formatCurrency(serviceCard.perTripPrice)}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="rounded-[24px] border border-dashed border-slate-300 bg-mist/50 px-5 py-8 text-center text-sm leading-6 text-slate">
                    No pricing assignments have been created for this provider
                    yet.
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-card">
            <h2 className="text-xl font-semibold text-ink">Provider images</h2>
            <p className="mt-2 text-sm leading-6 text-slate">
              Records from the <code>provider_images</code> table are shown
              here when public image URLs are available.
            </p>

            {imageUrls.length > 0 ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {imageUrls.map((imageUrl, index) => (
                  <div
                    key={`${imageUrl}-${index}`}
                    className="overflow-hidden rounded-[24px] border border-slate-200 bg-mist/50"
                  >
                    <img
                      src={imageUrl}
                      alt={`${getProviderName(provider)} image ${index + 1}`}
                      className="h-64 w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-[24px] border border-dashed border-slate-300 bg-mist/50 px-5 py-8 text-center text-sm leading-6 text-slate">
                No public provider image URLs were available to preview.
              </div>
            )}
          </section>

          <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-card">
            <h2 className="text-xl font-semibold text-ink">Provider documents</h2>
            <p className="mt-2 text-sm leading-6 text-slate">
              Submitted provider documents available for admin review.
            </p>

            {documents.length > 0 ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {documents.map((document, index) => {
                  const fileUrl = getStringValue(document, ["file_url"]);
                  const label =
                    getStringValue(document, ["label", "document_type"]) ??
                    `Document ${index + 1}`;

                  return (
                    <article
                      key={getStringValue(document, ["id"]) ?? `${label}-${index}`}
                      className="rounded-[24px] border border-slate-200 bg-white p-5"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-lg font-semibold text-ink">{label}</h3>
                        <ProviderStatusBadge
                          status={getStringValue(document, ["status"])}
                        />
                      </div>
                      {getStringValue(document, ["notes"]) ? (
                        <p className="mt-3 text-sm leading-6 text-slate">
                          {getStringValue(document, ["notes"])}
                        </p>
                      ) : null}
                      {fileUrl ? (
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent-dark"
                        >
                          Open document
                        </a>
                      ) : (
                        <p className="mt-4 text-sm text-slate">
                          No file URL is available for this document.
                        </p>
                      )}
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="mt-6 rounded-[24px] border border-dashed border-slate-300 bg-mist/50 px-5 py-8 text-center text-sm leading-6 text-slate">
                No provider documents were available to review.
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
