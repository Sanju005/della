import Link from "next/link";

import {
  adminRoles,
  companyPillars,
  services,
} from "@/lib/marketing-content";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 bg-admin-grid bg-admin-grid opacity-50" />

      <section className="relative border-b border-white/60">
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-8 lg:px-10">
          <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-accent">
                DELLA App
              </p>
              <p className="mt-2 text-sm text-slate">
                A service marketplace designed to turn interest into installs.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/about"
                className="rounded-full border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-ink transition hover:border-accent/30 hover:text-accent"
              >
                About Company
              </Link>
              <Link
                href="/our-services"
                className="rounded-full border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-ink transition hover:border-accent/30 hover:text-accent"
              >
                Services
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-accent/20 bg-white/80 px-5 py-3 text-sm font-semibold text-accent shadow-card transition hover:border-accent hover:bg-white"
              >
                Admin Login
              </Link>
            </div>
          </header>

          <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1.08fr_0.92fr] lg:py-16">
            <div>
              <div className="inline-flex rounded-full border border-accent/15 bg-accent-soft px-4 py-2 text-sm font-medium text-accent-dark">
                Discover services. Install the app. Book with confidence.
              </div>

              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.03] text-ink sm:text-6xl">
                DELLA brings everyday services into one app people will want to
                keep using.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate">
                From home support and beauty to tuition, babysitting, and repair
                work, DELLA helps customers find what they need fast while
                giving providers a better way to connect with demand.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="#download"
                  className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
                >
                  Download the App
                </Link>
                <Link
                  href="/our-services"
                  className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-accent/30 hover:text-accent"
                >
                  Explore Services
                </Link>
                <Link
                  href="/login"
                  className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-accent/30 hover:text-accent"
                >
                  Admin and Staff Login
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[24px] border border-white/80 bg-white/85 p-5 shadow-card">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate">
                    Customers
                  </p>
                  <p className="mt-3 text-sm leading-6 text-ink">
                    Browse services and register through the DELLA mobile app.
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/80 bg-white/85 p-5 shadow-card">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate">
                    Providers
                  </p>
                  <p className="mt-3 text-sm leading-6 text-ink">
                    Join the platform and receive service opportunities through
                    the app ecosystem.
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/80 bg-white/85 p-5 shadow-card">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate">
                    Internal Team
                  </p>
                  <p className="mt-3 text-sm leading-6 text-ink">
                    Admin, Customer Care, and Managers use the web portal to log
                    in and operate the platform.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-[32px] bg-ink p-7 text-white shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-white/55">
                  Marketing Focus
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight">
                  The homepage now pushes one clear action: install the app and
                  start using DELLA.
                </h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-3xl font-semibold">6+</p>
                    <p className="mt-2 text-sm leading-6 text-white/70">
                      Service categories already featured in the public story.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-3xl font-semibold">1 App</p>
                    <p className="mt-2 text-sm leading-6 text-white/70">
                      One place for service discovery, registration, and growth.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[32px] border border-white/80 bg-white/90 p-7 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-accent">
                  Admin Access
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-ink">
                  Internal login stays separate
                </h3>
                <div className="mt-5 flex flex-wrap gap-3">
                  {adminRoles.map((role) => (
                    <span
                      key={role}
                      className="rounded-full border border-accent/15 bg-accent-soft px-4 py-2 text-sm font-medium text-accent-dark"
                    >
                      {role}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-7 text-slate">
                  Users and service providers should register through the app.
                  The web login button remains available for your internal team
                  without distracting from the main marketing goal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-accent">
                About DELLA
              </p>
              <h2 className="mt-4 text-4xl font-semibold text-ink">
                A company built to simplify access to useful local services
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate">
                DELLA is positioned as a modern service platform that helps
                people discover, book, and manage quality services while giving
                providers and internal teams a stronger operating system.
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex rounded-full border border-accent/20 bg-white px-6 py-3 text-sm font-semibold text-accent transition hover:border-accent hover:bg-accent-soft"
              >
                Read About the Company
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {companyPillars.map((pillar) => (
                <article
                  key={pillar.title}
                  className="rounded-[28px] border border-white/80 bg-white/90 p-6 shadow-card"
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
          </div>
        </div>
      </section>

      <section className="relative border-y border-white/60 bg-white/45">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-accent">
                Services
              </p>
              <h2 className="mt-4 text-4xl font-semibold text-ink">
                A public services story that encourages installs
              </h2>
              <p className="mt-4 text-base leading-7 text-slate">
                Give visitors a fast preview of what they can access in the
                DELLA app, then lead them to download instead of overwhelming
                them on the homepage.
              </p>
            </div>

            <Link
              href="/our-services"
              className="inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
            >
              View All Services
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.slice(0, 3).map((service) => (
              <article
                key={service.title}
                className="rounded-[28px] border border-white/80 bg-white/90 p-7 shadow-card"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent-dark">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
                    {service.icon}
                  </svg>
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="download" className="relative">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="rounded-[36px] bg-ink px-7 py-10 text-white shadow-card sm:px-10 sm:py-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/55">
                  Download the App
                </p>
                <h2 className="mt-4 text-4xl font-semibold leading-tight">
                  Turn interest into installs and let users start inside DELLA.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/72">
                  Customers and service providers should onboard through the
                  DELLA mobile app. The web experience keeps one clean staff
                  login button for admins, customer care, and managers.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <a
                  href="#download"
                  className="rounded-3xl border border-white/15 bg-white/10 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  Download for Android
                </a>
                <a
                  href="#download"
                  className="rounded-3xl border border-white/15 bg-white/10 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  Download for iPhone
                </a>
                <Link
                  href="/login"
                  className="rounded-3xl bg-white px-6 py-4 text-center text-sm font-semibold text-ink transition hover:bg-accent-soft"
                >
                  Staff Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
