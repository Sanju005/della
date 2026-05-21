import * as FileSystem from "expo-file-system/legacy";
import { Platform } from "react-native";

import { mobileSupabase } from "./supabase";

const PROVIDER_ASSETS_BUCKET = "provider-assets";

export type LocalUploadAsset = {
  uri: string;
  name: string;
  mimeType: string | null;
};

export type ProviderApplicationPortfolioItemPayload = {
  title: string;
  caption: string;
  image_url: string;
};

export type ProviderApplicationServicePayload = {
  service_id: string;
  service_name: string;
  years_experience: number | null;
  specialties: string | null;
  radius_km: number | null;
  service_description: string | null;
  hourly_price: number | null;
  minimum_booking_hours: number | null;
  payments: string[];
  availability_modes: string[];
  certificates_label?: string | null;
  driving_license_label?: string | null;
  portfolio: ProviderApplicationPortfolioItemPayload[];
};

export type ProviderApplicationDocumentPayload = {
  document_type: string;
  label: string;
  file_url: string | null;
  notes?: string | null;
};

export type ProviderApplicationPayload = {
  first_name: string;
  last_name: string;
  date_of_birth?: string | null;
  residential_address: string;
  current_location: string;
  email: string;
  phone_number: string;
  id_number: string;
  profile_photo_url?: string | null;
  verification_email: string;
  verification_phone: string;
  documents: ProviderApplicationDocumentPayload[];
  services: ProviderApplicationServicePayload[];
};

export type ProviderApplicationStatusPayload = {
  ok: true;
  provider: {
    id: string;
    full_name: string | null;
    first_name: string | null;
    last_name: string | null;
    status: string | null;
    verification_email: string | null;
    verification_phone: string | null;
    created_at: string | null;
  };
  services: Array<{
    service_id: string | null;
    service_name: string | null;
    hourly_price: number | null;
    minimum_booking_hours: number | null;
    availability_modes: string[] | null;
  }>;
  documents: Array<{
    id: string;
    document_type: string;
    label: string;
    status: string | null;
    notes: string | null;
    created_at: string | null;
  }>;
  latest_review: {
    created_at: string | null;
    action: string | null;
    status: string | null;
    note: string | null;
  } | null;
};

function sanitizeSegment(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function getApiBaseUrl() {
  const configured = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();

  if (configured) {
    return configured.replace(/\/$/, "");
  }

  if (Platform.OS === "web" && typeof window !== "undefined") {
    return window.location.origin;
  }

  return "http://localhost:3000";
}

function getFileExtension(source: string, contentType: string | null, fileName?: string) {
  if (contentType?.includes("png")) {
    return "png";
  }

  if (contentType?.includes("webp")) {
    return "webp";
  }

  if (contentType?.includes("jpeg") || contentType?.includes("jpg")) {
    return "jpg";
  }

  const nameMatch = fileName?.match(/\.([a-zA-Z0-9]+)$/);

  if (nameMatch?.[1]) {
    return nameMatch[1].toLowerCase();
  }

  const urlMatch = source.match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
  return urlMatch?.[1]?.toLowerCase() ?? "jpg";
}

function decodeBase64(base64: string) {
  const normalized = base64.replace(/\s/g, "");
  const binary = atob(normalized);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

async function readAssetBody(asset: LocalUploadAsset) {
  if (Platform.OS === "web") {
    const response = await fetch(asset.uri);

    if (!response.ok) {
      throw new Error(`Failed to read selected file: ${asset.name}`);
    }

    return response.blob();
  }

  const base64 = await FileSystem.readAsStringAsync(asset.uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return decodeBase64(base64);
}

export async function uploadLocalAssetToStorage({
  asset,
  storagePath,
}: {
  asset: LocalUploadAsset;
  storagePath: string;
}) {
  const body = await readAssetBody(asset);
  const extension = getFileExtension(asset.uri, asset.mimeType, asset.name);
  const finalPath = `${storagePath}.${extension}`;

  const { error: uploadError } = await mobileSupabase.storage
    .from(PROVIDER_ASSETS_BUCKET)
    .upload(finalPath, body, {
      contentType: asset.mimeType || "application/octet-stream",
      upsert: true,
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = mobileSupabase.storage
    .from(PROVIDER_ASSETS_BUCKET)
    .getPublicUrl(finalPath);

  return data.publicUrl;
}

export async function submitProviderApplication(payload: ProviderApplicationPayload) {
  const response = await fetch(`${getApiBaseUrl()}/api/provider-applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as {
    ok?: boolean;
    error?: string;
    providerId?: string;
    notificationId?: string | null;
  };

  if (!response.ok || !data.ok) {
    throw new Error(data.error ?? "Failed to submit provider application.");
  }

  return data;
}

export async function fetchProviderApplicationStatus(providerId: string) {
  const response = await fetch(`${getApiBaseUrl()}/api/provider-applications/${providerId}/status`);

  const data = (await response.json()) as ProviderApplicationStatusPayload | { ok?: boolean; error?: string };

  if (!response.ok || data.ok !== true || !("provider" in data)) {
    throw new Error(("error" in data && data.error) || "Failed to fetch provider application status.");
  }

  return data;
}

export async function sendPhoneOtp(phoneNumber: string) {
  const response = await fetch(`${getApiBaseUrl()}/api/auth/phone-otp/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNumber }),
  });

  const data = (await response.json()) as {
    ok?: boolean;
    error?: string;
    status?: string;
  };

  if (!response.ok || !data.ok) {
    throw new Error(data.error ?? "Failed to send phone OTP.");
  }

  return data;
}

export async function verifyPhoneOtp(phoneNumber: string, code: string) {
  const response = await fetch(`${getApiBaseUrl()}/api/auth/phone-otp/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNumber, code }),
  });

  const data = (await response.json()) as {
    ok?: boolean;
    error?: string;
    status?: string;
  };

  if (!response.ok) {
    throw new Error(data.error ?? "Failed to verify phone OTP.");
  }

  if (!data.ok) {
    throw new Error(
      data.status === "pending"
        ? "Invalid OTP code. Please try again."
        : data.error ?? "Phone OTP verification failed.",
    );
  }

  return data;
}

export async function sendEmailVerification(email: string) {
  const response = await fetch(`${getApiBaseUrl()}/api/auth/email-verify/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = (await response.json()) as {
    ok?: boolean;
    error?: string;
  };

  if (!response.ok || !data.ok) {
    throw new Error(data.error ?? "Failed to send verification email.");
  }

  return data;
}

export async function getEmailVerificationStatus(email: string) {
  const response = await fetch(`${getApiBaseUrl()}/api/auth/email-verify/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = (await response.json()) as {
    ok?: boolean;
    error?: string;
    status?: string;
    verifiedAt?: string | null;
  };

  if (!response.ok || !data.ok) {
    throw new Error(data.error ?? "Failed to fetch email verification status.");
  }

  return data;
}

export function buildProviderAssetPath({
  firstName,
  lastName,
  folder,
  fileLabel,
}: {
  firstName: string;
  lastName: string;
  folder: string;
  fileLabel: string;
}) {
  const applicant = sanitizeSegment(`${firstName}-${lastName}`) || "provider";
  const suffix = Date.now();
  return `${folder}/${applicant}/${sanitizeSegment(fileLabel) || "file"}-${suffix}`;
}
