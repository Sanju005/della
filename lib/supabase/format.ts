import type { SupabaseRow } from "@/lib/supabase/queries";

function normalizeValue(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (value instanceof Date) {
    return value.toLocaleString();
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    const nested = [
      record.name,
      record.title,
      record.label,
      record.email,
      record.id,
    ].find((item) => item !== null && item !== undefined && item !== "");

    if (nested !== undefined) {
      return normalizeValue(nested);
    }
  }

  return String(value);
}

export function pickValue(
  row: SupabaseRow,
  candidates: string[],
  fallback = "-"
) {
  for (const candidate of candidates) {
    const value = row[candidate];
    if (value !== null && value !== undefined && value !== "") {
      return normalizeValue(value);
    }
  }

  return fallback;
}

export function formatTimestamp(
  row: SupabaseRow,
  candidates: string[],
  fallback = "-"
) {
  for (const candidate of candidates) {
    const value = row[candidate];
    if (typeof value === "string" || value instanceof Date) {
      const date = new Date(value);
      if (!Number.isNaN(date.getTime())) {
        return date.toLocaleString();
      }
    }
  }

  return fallback;
}

export function formatCount(value: number) {
  return new Intl.NumberFormat().format(value);
}
