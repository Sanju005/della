import Link from "next/link";

import { services } from "@/lib/marketing-content";

export default function OurServicesPage() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 bg-admin-grid bg-admin-grid opacity-45" />

      <section className="relative">
        <div className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.3em] text-accent">
                Services
              </p>
              <h1 className="mt-4 text-4xl font-semibold text-ink">
                Explore the services people can discover through DELLA
              </h1>
              <p className="mt-4 text-base leading-7 text-slate">
                This page gives visitors a clearer look at DELLA&apos;s service
                categories and pushes them toward downloading the app to start.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-accent/30 hover:text-accent"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-accent/30 hover:text-accent"
              >
                About Company
              </Link>
              <Link
                href="/login"
                className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
              >
                Staff Login
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-[28px] border border-white/80 bg-white/90 p-7 shadow-card"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent-dark">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
                    {service.icon}
                  </svg>
                </div>
                <h2 className="mt-5 text-2xl font-semibold text-ink">
                  {service.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate">
                  {service.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-[36px] bg-ink px-7 py-10 text-white shadow-card sm:px-10 sm:py-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/55">
                  Next Step
                </p>
                <h2 className="mt-4 text-4xl font-semibold leading-tight">
                  Download the DELLA app to explore, register, and book.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/72">
                  Customers and providers should use the app experience. Internal
                  operations staff can continue using the web portal login.
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
