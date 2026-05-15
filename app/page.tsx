"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-card">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">
          DELLA App
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-ink">
          Redirecting to login
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate">
          If the redirect does not happen automatically, continue to the login
          screen.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-flex rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
        >
          Open login
        </Link>
      </div>
    </main>
  );
}
