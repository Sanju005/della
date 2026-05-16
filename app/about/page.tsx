import Link from "next/link";

import { adminRoles, companyPillars } from "@/lib/marketing-content";

export default function AboutPage() {
  return (
    <main className="bg-white text-black">
      <section className="bg-white text-black">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 border-b border-black/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#26FF40]">
                DELLA
              </p>
              <p className="mt-2 text-sm text-black/60">
                About the company behind the platform
              </p>
            </div>

            <nav className="flex flex-wrap gap-3 text-sm font-semibold">
              <Link
                href="/"
                className="rounded-full border border-black/10 bg-white px-5 py-3 text-black transition hover:border-[#26FF40] hover:text-[#0f7a22]"
              >
                Home
              </Link>
              <Link
                href="/our-services"
                className="rounded-full border border-black/10 bg-white px-5 py-3 text-black transition hover:border-[#26FF40] hover:text-[#0f7a22]"
              >
                Services
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
                About Company
              </p>
              <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-tight">
                DELLA is building a more useful everyday service ecosystem
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-black/68">
                The company vision is simple: help customers find trusted
                services faster, help providers grow through better visibility,
                and help internal teams run the platform with more confidence.
              </p>
            </div>

            <div className="rounded-[34px] bg-[linear-gradient(135deg,#26FF40_0%,#00FF19_45%,#E8FFEC_100%)] p-8 text-black shadow-[0_18px_45px_rgba(38,255,64,0.14)]">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-black/70">
                DELLA Mission
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight">
                Turn service discovery into a smoother mobile-first journey.
              </h2>
              <p className="mt-4 text-base leading-7 text-black/80">
                The website supports marketing and lead generation. The app
                handles customer and provider registration. The admin portal
                supports staff operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          {companyPillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-[28px] border border-black/10 bg-white p-7 shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0f7a22]">
                {pillar.title}
              </p>
              <p className="mt-4 text-sm leading-7 text-black/65">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[30px] bg-[#f4f7f4] p-8">
            <h2 className="text-3xl font-semibold text-black">
              How the DELLA ecosystem works
            </h2>
            <div className="mt-6 grid gap-4">
              <div className="rounded-[22px] border border-black/8 bg-white px-5 py-4 text-sm leading-7 text-black/70">
                Public website: attracts visitors, explains the brand, and
                pushes app downloads.
              </div>
              <div className="rounded-[22px] border border-black/8 bg-white px-5 py-4 text-sm leading-7 text-black/70">
                Customer and provider apps: handle onboarding, registration, and
                everyday service activity.
              </div>
              <div className="rounded-[22px] border border-black/8 bg-white px-5 py-4 text-sm leading-7 text-black/70">
                Staff portal: supports Admin, Customer Care, and Manager roles.
              </div>
            </div>
          </div>

          <div className="rounded-[30px] bg-[linear-gradient(135deg,#26FF40_0%,#00FF19_45%,#F1FFF4_100%)] p-8 text-black shadow-[0_16px_40px_rgba(38,255,64,0.12)]">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0f7a22]">
              Staff Access
            </p>
            <h2 className="mt-4 text-3xl font-semibold">
              Internal access remains visible, but secondary
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {adminRoles.map((role) => (
                <span
                  key={role}
                  className="rounded-full border border-black/10 bg-white/75 px-4 py-2 text-sm font-semibold text-black"
                >
                  {role}
                </span>
              ))}
            </div>
            <Link
              href="/login"
              className="mt-8 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
            >
              Go to Staff Login
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
