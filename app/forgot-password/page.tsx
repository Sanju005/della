"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

import { getSupabaseClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = useMemo(() => getSupabaseClient(), []);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/reset-password`
        : undefined;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      setErrorMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    setSuccessMessage(
      "Password reset link sent. Please check your email to continue.",
    );
    setIsSubmitting(false);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10">
      <div className="absolute inset-0 bg-admin-grid bg-admin-grid opacity-60" />
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/70 bg-white/80 shadow-card backdrop-blur xl:grid-cols-[1fr_0.95fr]">
        <section className="hidden bg-ink px-10 py-12 text-white xl:flex xl:flex-col xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">
              DELLA App
            </p>
            <h1 className="mt-6 max-w-md text-4xl font-semibold leading-tight">
              Recover internal access safely.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-white/72">
              Use your work email to request a secure password reset link for
              the DELLA internal portal.
            </p>
          </div>
        </section>

        <section className="flex items-center px-6 py-8 sm:px-10 sm:py-12">
          <div className="mx-auto w-full max-w-md">
            <p className="text-sm uppercase tracking-[0.3em] text-accent">
              Password Reset
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-ink">
              Forgot your password?
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate">
              Enter your work email and we&apos;ll send you a reset link for
              the DELLA admin portal.
            </p>

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

              {errorMessage ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {errorMessage}
                </div>
              ) : null}

              {successMessage ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {successMessage}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="block w-full rounded-2xl bg-accent px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send reset link"}
              </button>
            </form>

            <p className="mt-6 text-sm leading-6 text-slate">
              <Link
                href="/login"
                className="font-medium text-accent hover:text-accent-dark"
              >
                Back to login
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
