import type { SupabaseClient, User } from "@supabase/supabase-js";

export const INTERNAL_PORTAL_ROLES = [
  "admin",
  "manager",
  "customer_care",
] as const;

export type InternalPortalRole = (typeof INTERNAL_PORTAL_ROLES)[number];

export type PortalProfile = {
  id: string;
  full_name: string | null;
  role: string | null;
  status: string | null;
};

export type PortalAccessResult =
  | {
      ok: true;
      profile: PortalProfile;
      role: InternalPortalRole;
      redirectPath: string;
    }
  | {
      ok: false;
      reason: "unassigned" | "inactive" | "unauthorized" | "role_mismatch";
      message: string;
    };

const redirectByRole: Record<InternalPortalRole, string> = {
  admin: "/admin/dashboard",
  manager: "/manager/dashboard",
  customer_care: "/customer-care/dashboard",
};

export function normalizePortalRole(value: unknown): InternalPortalRole | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim().toLowerCase();

  if (normalized === "admin" || normalized === "manager") {
    return normalized;
  }

  if (
    normalized === "customer care" ||
    normalized === "customer_care" ||
    normalized === "customer-care" ||
    normalized === "customercare"
  ) {
    return "customer_care";
  }

  return null;
}

function isActiveStatus(value: unknown) {
  return typeof value === "string" && value.trim().toLowerCase() === "active";
}

export async function fetchPortalProfile(
  supabase: SupabaseClient,
  userId: string,
) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, role, status")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return (data ?? null) as PortalProfile | null;
}

export async function resolvePortalAccess(
  supabase: SupabaseClient,
  user: User | null | undefined,
  selectedRole?: string | null,
): Promise<PortalAccessResult> {
  if (!user) {
    return {
      ok: false,
      reason: "unauthorized",
      message: "Unable to verify account access.",
    };
  }

  const profile = await fetchPortalProfile(supabase, user.id);

  if (!profile) {
    return {
      ok: false,
      reason: "unassigned",
      message: "Account not assigned. Please contact admin.",
    };
  }

  if (!isActiveStatus(profile.status)) {
    return {
      ok: false,
      reason: "inactive",
      message: "Your account is inactive.",
    };
  }

  const role = normalizePortalRole(profile.role);

  if (!role) {
    return {
      ok: false,
      reason: "unauthorized",
      message:
        "Your account does not have permission to access this internal portal.",
    };
  }

  const expectedRole = normalizePortalRole(selectedRole);

  if (expectedRole && expectedRole !== role) {
    return {
      ok: false,
      reason: "role_mismatch",
      message: "Selected role does not match your account.",
    };
  }

  return {
    ok: true,
    profile,
    role,
    redirectPath: redirectByRole[role],
  };
}

export function formatPortalRole(role: InternalPortalRole | null | undefined) {
  if (!role) {
    return null;
  }

  if (role === "customer_care") {
    return "Customer Care";
  }

  return role.charAt(0).toUpperCase() + role.slice(1);
}
