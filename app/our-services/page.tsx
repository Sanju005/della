import Link from "next/link";

import { services } from "@/lib/marketing-content";

export default function OurServicesPage() {
  return (
    <main className="bg-white text-black">
      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#26FF40]">
                DELLA
              </p>
              <p className="mt-2 text-sm text-white/65">
                Service categories that drive downloads
              </p>
            </div>

            <nav className="flex flex-wrap gap-3 text-sm font-semibold">
              <Link
                href="/"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-white transition hover:border-[#26FF40] hover:text-[#26FF40]"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-white transition hover:border-[#26FF40] hover:text-[#26FF40]"
              >
                About Company
              </Link>
              <Link
                href="/login"
                className="rounded-full bg-[#26FF40] px-5 py-3 text-black transition hover:bg-white"
              >
                Staff Login
              </Link>
            </nav>
          </div>

          <div className="grid gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#26FF40]">
                Our Services
              </p>
              <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-tight">
                Show people what DELLA can do, then guide them into the app
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
                This page works like a marketing catalog. It explains the
                service range clearly and keeps the next step simple: install
                the DELLA app and start using it.
              </p>
            </div>

            <div className="rounded-[34px] bg-[linear-gradient(135deg,#26FF40_0%,#123815_55%,#000000_100%)] p-8 text-black">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-black/65">
                Download Path
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight">
                Services on the website, onboarding in the app
              </h2>
              <p className="mt-4 text-base leading-7 text-black/80">
                Customers and providers should move from this page into the app.
                Internal team access stays available separately through the web
                login.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-[28px] border border-black/10 bg-white p-7 shadow-[0_16px_40px_rgba(0,0,0,0.06)] transition hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(0,0,0,0.1)]"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#26FF40] text-black shadow-[0_10px_30px_rgba(38,255,64,0.2)]">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
                  {service.icon}
                </svg>
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-black">
                {service.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-black/65">
                {service.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-[36px] bg-[#f4f7f4] px-7 py-10 sm:px-10 sm:py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0f7a22]">
                Next Step
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-black">
                Download the DELLA app to register, discover, and book
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-black/70">
                The services page should support conversion. Customers and
                providers move into the app, while staff members continue into
                the dedicated portal.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <a
                href="#download"
                className="rounded-[24px] bg-black px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#26FF40] hover:text-black"
              >
                Download for Android
              </a>
              <a
                href="#download"
                className="rounded-[24px] border border-black bg-white px-7 py-4 text-center text-sm font-semibold text-black transition hover:bg-black hover:text-white"
              >
                Download for iPhone
              </a>
              <Link
                href="/login"
                className="rounded-[24px] border border-black/20 bg-white px-7 py-4 text-center text-sm font-semibold text-black transition hover:border-black"
              >
                Staff Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
