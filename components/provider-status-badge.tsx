"use client";

import clsx from "clsx";

type ProviderStatusBadgeProps = {
  status: string | null | undefined;
  className?: string;
};

function formatProviderStatus(status: string | null | undefined) {
  if (!status) {
    return "Unknown";
  }

  return status
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function ProviderStatusBadge({
  status,
  className,
}: ProviderStatusBadgeProps) {
  const normalizedStatus = status?.trim().toLowerCase();

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
        normalizedStatus === "approved" &&
          "border-emerald-200 bg-emerald-50 text-emerald-700",
        normalizedStatus === "pending_review" &&
          "border-amber-200 bg-amber-50 text-amber-700",
        normalizedStatus === "additional_documents_required" &&
          "border-orange-200 bg-orange-50 text-orange-700",
        normalizedStatus === "rejected" &&
          "border-rose-200 bg-rose-50 text-rose-700",
        normalizedStatus === "suspended" &&
          "border-slate-200 bg-slate-100 text-slate-700",
        !normalizedStatus &&
          "border-slate-200 bg-slate-100 text-slate-700",
        className,
      )}
    >
      {formatProviderStatus(status)}
    </span>
  );
}
