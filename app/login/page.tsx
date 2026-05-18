"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";

import {
  formatPortalRole,
  INTERNAL_PORTAL_ROLES,
  resolvePortalAccess,
} from "@/lib/supabase/auth";
import { getSupabaseClient } from "@/lib/supabase/client";

const roleOptions = INTERNAL_PORTAL_ROLES.map((role) => ({
  value: role,
  label: formatPortalRole(role) ?? role,
}));

export default function LoginPage() {
  const router = useRouter();
  const supabase = useMemo(() => getSupabaseClient(), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<(typeof INTERNAL_PORTAL_ROLES)[number]>("admin");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const denied = searchParams.get("denied");

      if (denied === "inactive") {
        setErrorMessage("Your account is inactive.");
      } else if (denied === "unassigned") {
        setErrorMessage("Account not assigned. Please contact admin.");
      } else if (denied === "role") {
        setErrorMessage(
          "Your account does not have permission to access this internal portal.",
        );
      }
    }

    supabase.auth.getSession().then(async ({ data }) => {
      if (!isMounted || !data.session) {
        return;
      }

      const access = await resolvePortalAccess(supabase, data.session.user);
      if (!isMounted) {
        return;
      }

      if (!access.ok) {
        setErrorMessage(access.message);
        void supabase.auth.signOut();
        return;
      }

      router.replace(access.redirectPath);
    });

    return () => {
      isMounted = false;
    };
  }, [router, supabase]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    const access = await resolvePortalAccess(
      supabase,
      data.user,
      selectedRole,
    );

    if (!access.ok) {
      await supabase.auth.signOut();
      setErrorMessage(access.message);
      setIsSubmitting(false);
      return;
    }

    router.replace(access.redirectPath);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10">
      <div className="absolute inset-0 bg-admin-grid bg-admin-grid opacity-60" />
      <div className="relative grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/70 bg-white/80 shadow-card backdrop-blur xl:grid-cols-[1.1fr_0.9fr]">
        <section className="hidden bg-ink px-10 py-12 text-white xl:flex xl:flex-col xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">
              DELLA App
            </p>
            <h1 className="mt-6 max-w-md text-4xl font-semibold leading-tight">
              Internal access for operations, service visibility, and support.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-white/72">
              DELLA&apos;s internal web portal is reserved for Admin,
              Manager, and Customer Care teams managing users, providers,
              bookings, services, and platform operations.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {roleOptions.map((role) => (
              <div
                key={role.value}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-sm text-white/60">Access role</p>
                <p className="mt-2 text-lg font-medium">{role.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center px-6 py-8 sm:px-10 sm:py-12">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 xl:hidden">
              <p className="text-sm uppercase tracking-[0.3em] text-accent">
                DELLA App
              </p>
              <h1 className="mt-4 text-3xl font-semibold text-ink">
                Welcome back
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate">
                Sign in with your internal DELLA account to access the admin
                workspace.
              </p>
            </div>

            <div className="hidden xl:block">
              <p className="text-sm uppercase tracking-[0.3em] text-accent">
                Secure Sign In
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-ink">
                Welcome back
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate">
                Sign in with your Supabase email and password credentials.
                Your account must already exist in Supabase Auth and also have
                an active record in `public.profiles`.
              </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-ink"
                  htmlFor="email"
                >
                  Work email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@della.app"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    className="block text-sm font-medium text-ink"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-accent hover:text-accent-dark"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
                />
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-medium text-ink"
                  htmlFor="role"
                >
                  Role
                </label>
                <select
                  id="role"
                  value={selectedRole}
                  onChange={(event) =>
                    setSelectedRole(
                      event.target.value as (typeof INTERNAL_PORTAL_ROLES)[number],
                    )
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
                >
                  {roleOptions.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>

              {errorMessage ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {errorMessage}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="block w-full rounded-2xl bg-accent px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Signing in..." : "Sign in to dashboard"}
              </button>
            </form>

            <p className="mt-6 text-sm leading-6 text-slate">
              This sign-in is for internal teams only: Admin, Customer Care,
              and Manager. Your selected role must match `public.profiles.role`.
            </p>
            <p className="mt-4 text-sm leading-6 text-slate">
              <Link
                href="/"
                className="font-medium text-accent hover:text-accent-dark"
              >
                Back to the DELLA home page
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
