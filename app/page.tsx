import Link from "next/link";

import { adminRoles, services } from "@/lib/marketing-content";

const heroCards = [
  {
    title: "Home Services",
    description:
      "Cleaning, maintenance, and trusted support for everyday home needs.",
    tone: "from-[#0DFF40]/30 to-white",
  },
  {
    title: "Beauty and Wellness",
    description:
      "Self-care and wellness services customers can discover and book faster.",
    tone: "from-[#067a2b]/25 to-white",
  },
  {
    title: "Babysitting and Tuition",
    description:
      "Family-focused support for childcare, learning, and flexible daily help.",
    tone: "from-[#0DFF40]/24 to-white",
  },
  {
    title: "Repairs and Providers",
    description:
      "Repair works and provider opportunities powered by one DELLA app.",
    tone: "from-[#067a2b]/22 to-white",
  },
];

const appCards = [
  {
    title: "DELLA App",
    description:
      "One app where both users and service providers can register, discover services, and manage activity.",
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
    <div className="inline-flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#0DFF40] text-black shadow-[0_10px_24px_rgba(13,255,64,0.18)]">
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(13,255,64,0.12),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(6,122,43,0.08),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
          <header className="flex flex-col gap-5 border-b border-black/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#0DFF40]">
                DELLA
              </p>
              <p className="mt-2 text-sm text-black/60">
                Everyday services in one powerful mobile platform
              </p>
            </div>

            <nav className="flex flex-wrap gap-3 text-sm font-semibold">
              <Link
                href="/"
                className="rounded-full border border-black/10 bg-white px-5 py-3 text-black transition hover:border-[#0DFF40] hover:text-[#0DFF40]"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-black/10 bg-white px-5 py-3 text-black transition hover:border-[#0DFF40] hover:text-[#0DFF40]"
              >
                About Company
              </Link>
              <Link
                href="/our-services"
                className="rounded-full border border-black/10 bg-white px-5 py-3 text-black transition hover:border-[#0DFF40] hover:text-[#0DFF40]"
              >
                Services
              </Link>
              <Link
                href="/login"
                className="rounded-full bg-[#0DFF40] px-5 py-3 text-black transition hover:bg-white"
              >
                Staff Login
              </Link>
            </nav>
          </header>

          <div className="pb-8 pt-10 lg:pb-12 lg:pt-14">
            <div className="overflow-hidden rounded-[38px] bg-[linear-gradient(120deg,#063f1d_0%,#0a6a2d_28%,#0DFF40_100%)] shadow-[0_22px_70px_rgba(13,255,64,0.16)]">
              <div className="grid gap-10 px-7 py-8 md:px-10 md:py-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-12">
                <div className="text-white">
                  <div className="inline-flex rounded-full border border-white/18 bg-white/8 px-4 py-2 text-sm font-medium text-white">
                Download-first marketing page for DELLA
                  </div>
                  <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.98] sm:text-6xl xl:text-7xl">
                    Find the right service faster and get people into the DELLA app.
                  </h1>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82">
                    DELLA helps customers discover home support, babysitting,
                    tuition classes, repair works, beauty, and more. The
                    website should attract customers, build trust, and lead them
                    straight to the app.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <a
                      href="#download"
                      className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#063f1d] transition hover:bg-[#F3FFF6]"
                    >
                      Download the App
                    </a>
                    <Link
                      href="/our-services"
                      className="rounded-full border border-white/18 bg-white/8 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/12"
                    >
                      Explore Services
                    </Link>
                  </div>
                </div>

                <div className="relative min-h-[280px] overflow-hidden rounded-[32px] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))] p-6 lg:min-h-[340px]">
                  <div className="absolute -right-10 top-6 h-40 w-40 rounded-full bg-white/18 blur-3xl" />
                  <div className="absolute left-8 top-14 h-24 w-24 rounded-full bg-[#0DFF40]/35 blur-2xl" />
                  <div className="absolute right-8 top-10 h-40 w-56 rounded-[32px] border border-white/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.28),rgba(255,255,255,0.08))] shadow-[0_20px_40px_rgba(0,0,0,0.18)]" />
                  <div className="absolute right-20 top-28 h-44 w-32 rounded-[30px] border border-white/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(233,255,238,0.94))] shadow-[0_20px_40px_rgba(0,0,0,0.18)]" />
                  <div className="absolute bottom-10 left-6 h-32 w-28 rounded-[28px] border border-white/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(240,255,243,0.92))] shadow-[0_16px_34px_rgba(0,0,0,0.14)]" />
                  <div className="absolute bottom-8 right-10 h-24 w-40 rounded-[28px] border border-white/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(240,255,243,0.92))] shadow-[0_16px_34px_rgba(0,0,0,0.14)]" />

                  <div className="relative z-10 ml-auto max-w-[220px] rounded-[26px] border border-white/16 bg-white/92 p-5 text-black shadow-[0_18px_36px_rgba(0,0,0,0.14)]">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#067a2b]">
                      1 App
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold leading-tight">
                      Users and providers register in the same DELLA app.
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-black/72">
                      One place for discovery, registration, and service activity.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="-mt-2 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {heroCards.map((card, index) => (
                <article
                  key={card.title}
                  className={`relative overflow-hidden rounded-[28px] border border-[#0DFF40]/18 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${card.tone} p-6 shadow-[0_18px_40px_rgba(0,0,0,0.06)]`}
                >
                  <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top_right,rgba(13,255,64,0.18),transparent_55%)]" />
                  <div className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-[#0DFF40]/10 blur-2xl" />
                  <div className="relative z-10">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0DFF40] text-lg font-semibold text-black shadow-[0_10px_20px_rgba(13,255,64,0.18)]">
                      {index + 1}
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold text-black">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-black/70">
                      {card.description}
                    </p>
                  </div>
                </article>
              ))}
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
            className="inline-flex rounded-full border border-black px-6 py-3 text-sm font-semibold text-black transition hover:border-[#0DFF40] hover:bg-[#0DFF40]"
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
          <div className="rounded-[32px] border border-[#0DFF40]/20 bg-[#F4FFF6] p-8 text-black shadow-[0_18px_45px_rgba(13,255,64,0.10)]">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0DFF40]">
              Our Apps
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight">
              One DELLA app for users and service providers
            </h2>
            <p className="mt-4 text-base leading-7 text-black/70">
              Users and service providers both register through the same DELLA
              app. The website remains the marketing front door, while staff
              keep a separate login path.
            </p>
          </div>

          <div className="grid gap-6">
            {appCards.map((app) => (
              <article
                key={app.title}
                className="rounded-[30px] border border-black/10 bg-white p-7 shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
              >
                <div className="inline-flex rounded-full bg-[#0DFF40] px-4 py-2 text-sm font-semibold text-black">
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
                    className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0DFF40] hover:text-black"
                  >
                    App Store
                  </a>
                  <a
                    href="#download"
                    className="rounded-full border border-black px-5 py-3 text-sm font-semibold text-black transition hover:border-[#0DFF40] hover:bg-[#0DFF40]"
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
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0DFF40]">
                Stories From DELLA
              </p>
              <h2 className="mt-4 text-4xl font-semibold">
                Use real customer needs as the marketing engine
              </h2>
            </div>
            <Link
              href="/about"
              className="inline-flex rounded-full border border-black/10 px-6 py-3 text-sm font-semibold text-black transition hover:border-[#0DFF40] hover:text-[#0DFF40]"
            >
              About the Company
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {stories.map((story) => (
              <article
                key={story.title}
                className="rounded-[30px] border border-[#0DFF40]/20 bg-white p-7 shadow-[0_16px_40px_rgba(0,0,0,0.05)]"
              >
                <div className="inline-flex rounded-full bg-[#0DFF40] px-4 py-2 text-sm font-semibold text-black">
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

      <section id="download" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
          <div className="grid gap-10 rounded-[36px] border border-[#0DFF40]/20 bg-[#F4FFF6] px-7 py-10 shadow-[0_18px_45px_rgba(13,255,64,0.10)] sm:px-10 sm:py-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0DFF40]">
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
