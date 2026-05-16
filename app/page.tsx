import Link from "next/link";

import { adminRoles, services } from "@/lib/marketing-content";

const audienceCards = [
  {
    title: "For Customers",
    description:
      "Discover useful local services, compare options, and book from one app.",
    cta: "Download App",
  },
  {
    title: "For Providers",
    description:
      "Grow your visibility, receive requests, and manage work through DELLA.",
    cta: "Join Through App",
  },
];

const appCards = [
  {
    title: "Customer App",
    description:
      "Browse services, register, and manage bookings from your phone.",
  },
  {
    title: "Provider App",
    description:
      "Join the DELLA network, respond faster, and grow your business.",
  },
];

const reasons = [
  "Fast service discovery with a clearer path from interest to booking.",
  "A stronger digital experience for customers and service providers.",
  "One connected system for operations, providers, and customer care.",
  "Designed to push app downloads while keeping staff access available.",
];

const stories = [
  {
    title: "Families need trusted help faster",
    description:
      "Babysitting, tuition, and home support become easier to discover in one place.",
  },
  {
    title: "Providers need better visibility",
    description:
      "DELLA gives service providers a digital storefront that leads to more demand.",
  },
];

function ServiceIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#26FF40] text-black shadow-[0_10px_30px_rgba(38,255,64,0.2)]">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
        {children}
      </svg>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="bg-white text-black">
      <section className="relative overflow-hidden bg-white text-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(38,255,64,0.22),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(0,255,25,0.14),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
          <header className="flex flex-col gap-5 border-b border-black/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#26FF40]">
                DELLA
              </p>
              <p className="mt-2 text-sm text-black/60">
                Everyday services in one powerful mobile platform
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
                href="/about"
                className="rounded-full border border-black/10 bg-white px-5 py-3 text-black transition hover:border-[#26FF40] hover:text-[#0f7a22]"
              >
                About Company
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
          </header>

          <div className="grid gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
            <div>
              <div className="inline-flex rounded-full border border-[#26FF40]/30 bg-[#26FF40]/10 px-4 py-2 text-sm font-medium text-[#0f7a22]">
                Download-first marketing page for DELLA
              </div>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.98] sm:text-6xl xl:text-7xl">
                Find the right service faster and get people into the DELLA app.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-black/68">
                DELLA helps customers discover useful services like home
                support, babysitting, tuition classes, repair works, beauty,
                and more. The website should attract attention, build trust, and
                lead users straight to app download.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#download"
                  className="rounded-full bg-[#26FF40] px-7 py-3 text-sm font-semibold text-black transition hover:bg-white"
                >
                  Download the App
                </a>
                <Link
                  href="/our-services"
                  className="rounded-full border border-black/10 bg-white px-7 py-3 text-sm font-semibold text-black transition hover:border-[#26FF40] hover:text-[#0f7a22]"
                >
                  Explore Services
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-[24px] border border-[#26FF40]/15 bg-[linear-gradient(135deg,rgba(38,255,64,0.12),rgba(255,255,255,0.96))] p-5 shadow-[0_14px_35px_rgba(0,0,0,0.05)]">
                  <p className="text-3xl font-semibold text-[#26FF40]">8+</p>
                  <p className="mt-2 text-sm leading-6 text-black/65">
                    Services available through the DELLA platform
                  </p>
                </div>
                <div className="rounded-[24px] border border-[#26FF40]/15 bg-[linear-gradient(135deg,rgba(0,255,25,0.1),rgba(255,255,255,0.96))] p-5 shadow-[0_14px_35px_rgba(0,0,0,0.05)]">
                  <p className="text-3xl font-semibold text-[#26FF40]">1 App</p>
                  <p className="mt-2 text-sm leading-6 text-black/65">
                    One mobile experience for discovery, booking, and growth
                  </p>
                </div>
                <div className="rounded-[24px] border border-[#26FF40]/15 bg-[linear-gradient(135deg,rgba(38,255,64,0.12),rgba(255,255,255,0.96))] p-5 shadow-[0_14px_35px_rgba(0,0,0,0.05)]">
                  <p className="text-3xl font-semibold text-[#26FF40]">
                    Malaysia
                  </p>
                  <p className="mt-2 text-sm leading-6 text-black/65">
                    Built to serve customers and providers all over Malaysia
                  </p>
                </div>
                <div className="rounded-[24px] border border-[#26FF40]/15 bg-[linear-gradient(135deg,rgba(0,255,25,0.1),rgba(255,255,255,0.96))] p-5 shadow-[0_14px_35px_rgba(0,0,0,0.05)]">
                  <p className="text-3xl font-semibold text-[#26FF40]">
                    Reliable
                  </p>
                  <p className="mt-2 text-sm leading-6 text-black/65">
                    A dependable service platform focused on trust and quality
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[34px] border border-[#26FF40]/15 bg-white/90 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.06)] backdrop-blur">
                <div className="rounded-[28px] bg-[linear-gradient(135deg,#26FF40_0%,#00FF19_48%,#E8FFEC_100%)] p-7 text-black shadow-[0_20px_60px_rgba(38,255,64,0.16)]">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-black/70">
                    Download DELLA
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold leading-tight text-black">
                    One app for customers. One growth channel for providers.
                  </h2>
                  <p className="mt-4 max-w-lg text-base leading-7 text-black/80">
                    The public site should act like a campaign landing page:
                    explain the offer, show the service categories, and push
                    users to install DELLA.
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {audienceCards.map((card) => (
                      <div
                        key={card.title}
                        className="rounded-[22px] bg-white/90 p-5 text-black shadow-[0_14px_30px_rgba(0,0,0,0.15)]"
                      >
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0f7a22]">
                          {card.title}
                        </p>
                        <p className="mt-3 text-sm leading-6 text-black/75">
                          {card.description}
                        </p>
                        <p className="mt-4 text-sm font-semibold text-black">
                          {card.cta}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0f7a22]">
              Service Access
            </p>
            <h2 className="mt-4 text-4xl font-semibold text-black">
              Services people actually search for every week
            </h2>
            <p className="mt-4 text-base leading-7 text-black/65">
              Instead of showcasing truck sizes, DELLA should showcase the
              service categories customers care about and lead them directly
              toward installation.
            </p>
          </div>

          <Link
            href="/our-services"
            className="inline-flex rounded-full border border-black px-6 py-3 text-sm font-semibold text-black transition hover:border-[#26FF40] hover:bg-[#26FF40]"
          >
            View All Services
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-[28px] border border-black/10 bg-white p-7 shadow-[0_16px_40px_rgba(0,0,0,0.06)] transition hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(0,0,0,0.1)]"
            >
              <ServiceIcon>{service.icon}</ServiceIcon>
              <h3 className="mt-5 text-2xl font-semibold text-black">
                {service.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-black/65">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0f7a22]">
                Why DELLA
              </p>
              <h2 className="mt-4 text-4xl font-semibold text-black">
                A cleaner marketing story that builds trust before the download
              </h2>
              <p className="mt-4 text-base leading-7 text-black/65">
                DELLA should feel useful, modern, and reliable. The site can do
                the selling, while the app handles onboarding, registration, and
                service activity.
              </p>
            </div>

            <div className="grid gap-4">
              {reasons.map((reason) => (
                <div
                  key={reason}
                  className="rounded-[24px] border border-black/8 bg-white px-6 py-5 text-sm leading-7 text-black shadow-[0_14px_35px_rgba(0,0,0,0.05)]"
                >
                  {reason}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[32px] bg-[linear-gradient(135deg,#26FF40_0%,#00FF19_45%,#E8FFEC_100%)] p-8 text-black shadow-[0_18px_45px_rgba(38,255,64,0.14)]">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0f7a22]">
              Our Apps
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight">
              Lead customers and providers into the right DELLA app experience
            </h2>
            <p className="mt-4 text-base leading-7 text-black/70">
              Customers and service providers should register through the app.
              The website remains the marketing front door, while staff keep a
              separate login path.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {appCards.map((app) => (
              <article
                key={app.title}
                className="rounded-[30px] border border-black/10 bg-white p-7 shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
              >
                <div className="inline-flex rounded-full bg-[#26FF40] px-4 py-2 text-sm font-semibold text-black">
                  App Download
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-black">
                  {app.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-black/65">
                  {app.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#download"
                    className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26FF40] hover:text-black"
                  >
                    App Store
                  </a>
                  <a
                    href="#download"
                    className="rounded-full border border-black px-5 py-3 text-sm font-semibold text-black transition hover:border-[#26FF40] hover:bg-[#26FF40]"
                  >
                    Google Play
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0f7a22]">
                Stories From DELLA
              </p>
              <h2 className="mt-4 text-4xl font-semibold">
                Use real customer needs as the marketing engine
              </h2>
            </div>
            <Link
              href="/about"
              className="inline-flex rounded-full border border-black/10 px-6 py-3 text-sm font-semibold text-black transition hover:border-[#26FF40] hover:text-[#0f7a22]"
            >
              About the Company
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {stories.map((story) => (
              <article
                key={story.title}
                className="rounded-[30px] border border-[#26FF40]/15 bg-[linear-gradient(135deg,rgba(38,255,64,0.1),rgba(255,255,255,0.98))] p-7 shadow-[0_16px_40px_rgba(0,0,0,0.05)]"
              >
                <div className="inline-flex rounded-full bg-[#26FF40] px-4 py-2 text-sm font-semibold text-black">
                  DELLA Insight
                </div>
                <h3 className="mt-5 text-3xl font-semibold">{story.title}</h3>
                <p className="mt-4 text-sm leading-7 text-black/68">
                  {story.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="download"
        className="bg-[linear-gradient(135deg,#26FF40_0%,#c8ffd0_40%,#ffffff_100%)]"
      >
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0f7a22]">
                Ready To Download?
              </p>
              <h2 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight text-black">
                Bring customers into DELLA with a strong final call to action.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-black/75">
                Customers and service providers should use the app for
                registration and service activity. Internal web access remains
                available for:
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {adminRoles.map((role) => (
                  <span
                    key={role}
                    className="rounded-full border border-black/15 bg-white/85 px-4 py-2 text-sm font-semibold text-black"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <a
                href="#download"
                className="rounded-[24px] bg-black px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-white hover:text-black"
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
                className="rounded-[24px] border border-black/20 bg-white/80 px-7 py-4 text-center text-sm font-semibold text-black transition hover:border-black hover:bg-white"
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
