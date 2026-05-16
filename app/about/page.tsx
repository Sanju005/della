import Link from "next/link";

import { companyPillars } from "@/lib/marketing-content";

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 bg-admin-grid bg-admin-grid opacity-45" />

      <section className="relative">
        <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-accent">
                About DELLA
              </p>
              <h1 className="mt-4 text-4xl font-semibold text-ink">
                A service platform built around trust, convenience, and growth
              </h1>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-accent/30 hover:text-accent"
              >
                Home
              </Link>
              <Link
                href="/our-services"
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-accent/30 hover:text-accent"
              >
                Services
              </Link>
              <Link
                href="/login"
                className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
              >
                Staff Login
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[32px] border border-white/80 bg-white/90 p-8 shadow-card">
              <p className="text-sm uppercase tracking-[0.3em] text-accent">
                Company Story
              </p>
              <p className="mt-5 text-base leading-8 text-slate">
                DELLA is designed to make everyday services easier to discover,
                easier to trust, and easier to manage. The company vision is to
                connect customers with quality providers through a mobile-first
                experience while giving internal teams the tools to keep the
                platform efficient and reliable.
              </p>
              <p className="mt-5 text-base leading-8 text-slate">
                On the public side, DELLA should feel simple, useful, and
                install-worthy. On the operational side, DELLA gives admins,
                customer care teams, and managers a separate workspace to manage
                providers, services, bookings, and support needs.
              </p>
            </div>

            <div className="rounded-[32px] bg-ink p-8 text-white shadow-card">
              <p className="text-sm uppercase tracking-[0.3em] text-white/55">
                Mission
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight">
                Build one dependable ecosystem for users, providers, and
                operations.
              </h2>
              <p className="mt-5 text-base leading-8 text-white/72">
                DELLA creates a clear digital path: discover services, download
                the app, register, and take action. That same ecosystem supports
                provider growth and internal operational control behind the
                scenes.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {companyPillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-[28px] border border-white/80 bg-white/90 p-7 shadow-card"
              >
                <p className="text-sm uppercase tracking-[0.24em] text-accent">
                  {pillar.title}
                </p>
                <p className="mt-4 text-sm leading-7 text-slate">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-[32px] border border-accent/15 bg-accent-soft px-8 py-7">
            <h2 className="text-2xl font-semibold text-ink">
              The main public goal
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate">
              The marketing pages should encourage customers and service
              providers to download the DELLA app, while keeping the staff login
              visible but secondary.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
