import Link from "next/link";

import { adminRoles, services } from "@/lib/marketing-content";

const heroCards = [
  {
    title: "Home Services",
    description:
      "Cleaning, aircond service, handyman, plumbing, and daily home support.",
    link: "Explore home services",
    icon: (
      <path
        d="M4.5 10.5 12 4l7.5 6.5v8.25A1.25 1.25 0 0 1 18.25 20H14v-5h-4v5H5.75A1.25 1.25 0 0 1 4.5 18.75Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    ),
  },
  {
    title: "Family Care",
    description:
      "Babysitting, elderly care, confinement help, and trusted support for families.",
    link: "Find care services",
    icon: (
      <>
        <circle
          cx="12"
          cy="8"
          r="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M7.5 19c.55-2.75 2.27-4.5 4.5-4.5s3.95 1.75 4.5 4.5M8 6.5l-1.5-2M16 6.5l1.5-2"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </>
    ),
  },
  {
    title: "Tuition & Classes",
    description:
      "Home tuition, online lessons, exam coaching, music, language, and skills classes.",
    link: "View classes",
    icon: (
      <>
        <path
          d="M3.5 8 12 4l8.5 4-8.5 4Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <path
          d="M6.5 9.75v4.5c0 1.52 2.46 2.75 5.5 2.75s5.5-1.23 5.5-2.75v-4.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </>
    ),
  },
  {
    title: "Beauty & Wellness",
    description:
      "Massage, nails, makeup, salon, grooming, and wellness services at your convenience.",
    link: "Discover wellness",
    icon: (
      <>
        <path
          d="M12 5.25c1.85-2.12 5.2-2.36 7.14-.45 1.96 1.93 2 5.13.12 7.15L12 19.5l-7.26-7.55C2.86 9.93 2.9 6.73 4.86 4.8c1.95-1.91 5.29-1.67 7.14.45Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <path
          d="M12 8.5v4M10 10.5h4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      </>
    ),
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

          <div className="pb-14 pt-10 lg:pb-24 lg:pt-14">
            <div className="relative min-h-[680px] overflow-visible rounded-[38px] bg-[linear-gradient(90deg,#083D1A_0%,#0C6C2E_38%,#0DFF40_100%)] shadow-[0_26px_80px_rgba(13,255,64,0.18)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_24%,rgba(255,255,255,0.22),transparent_18%),radial-gradient(circle_at_14%_84%,rgba(255,255,255,0.08),transparent_24%)]" />

              <div className="relative grid gap-10 px-7 pb-28 pt-8 md:px-10 md:pt-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:px-12 lg:pb-32">
                <div className="z-10 text-white">
                  <div className="inline-flex rounded-full border border-white/18 bg-white/8 px-4 py-2 text-sm font-medium text-white">
                    Download-first service platform for DELLA
                  </div>
                  <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.98] sm:text-6xl xl:text-[5.2rem]">
                    Find the right service faster
                  </h1>
                  <p className="mt-6 max-w-2xl text-lg leading-8 text-white/84">
                    Book trusted home services, babysitting, tuition, repairs,
                    beauty, and more from one simple DELLA app.
                  </p>

                  <div className="mt-9 flex flex-wrap gap-4">
                    <a
                      href="#download"
                      className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#083D1A] transition hover:bg-[#F3FFF6]"
                    >
                      Download the App
                    </a>
                    <Link
                      href="/our-services"
                      className="rounded-full border border-white/24 bg-transparent px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      Explore Services
                    </Link>
                  </div>
                </div>

                <div className="relative min-h-[360px] lg:min-h-[500px]">
                  <div className="absolute right-2 top-4 h-56 w-40 rounded-[34px] border border-white/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(232,255,237,0.94))] shadow-[0_26px_60px_rgba(0,0,0,0.22)] lg:right-14 lg:top-0 lg:h-72 lg:w-52">
                    <div className="mx-auto mt-4 h-2 w-16 rounded-full bg-black/10" />
                    <div className="px-5 pt-6">
                      <div className="h-24 rounded-[22px] bg-[linear-gradient(135deg,#0DFF40,#0A5A25)]" />
                      <div className="mt-4 h-3 w-24 rounded-full bg-black/10" />
                      <div className="mt-2 h-3 w-16 rounded-full bg-black/8" />
                      <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-3 rounded-2xl bg-white px-3 py-3 shadow-[0_10px_18px_rgba(0,0,0,0.06)]">
                          <div className="h-10 w-10 rounded-2xl bg-[#0DFF40]/18" />
                          <div className="space-y-2">
                            <div className="h-2 w-16 rounded-full bg-black/12" />
                            <div className="h-2 w-10 rounded-full bg-black/8" />
                          </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-2xl bg-white px-3 py-3 shadow-[0_10px_18px_rgba(0,0,0,0.06)]">
                          <div className="h-10 w-10 rounded-2xl bg-[#0DFF40]/18" />
                          <div className="space-y-2">
                            <div className="h-2 w-14 rounded-full bg-black/12" />
                            <div className="h-2 w-12 rounded-full bg-black/8" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-0 top-16 h-40 w-56 rounded-[34px] border border-white/16 bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(255,255,255,0.08))] p-5 shadow-[0_22px_40px_rgba(0,0,0,0.18)] lg:left-12 lg:top-20 lg:h-48 lg:w-64">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/88">
                          Providers
                        </p>
                        <p className="mt-3 max-w-[170px] text-sm leading-6 text-white/84">
                          Trusted professionals growing through one DELLA app.
                        </p>
                      </div>
                      <div className="rounded-2xl bg-white/16 p-3 text-white">
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
                          <path
                            d="M8 9V7.5A2.5 2.5 0 0 1 10.5 5h3A2.5 2.5 0 0 1 16 7.5V9"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                          />
                          <path
                            d="M4.5 9.5h15v8.75A1.75 1.75 0 0 1 17.75 20H6.25A1.75 1.75 0 0 1 4.5 18.25Z"
                            fill="none"
                            stroke="currentColor"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-8 left-6 h-32 w-44 rounded-[30px] border border-white/16 bg-[linear-gradient(135deg,rgba(255,255,255,0.2),rgba(255,255,255,0.08))] p-5 shadow-[0_18px_34px_rgba(0,0,0,0.16)] lg:bottom-10 lg:left-20">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/88">
                      Services
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["Home", "Care", "Classes", "Beauty"].map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-white/14 px-3 py-2 text-xs font-semibold text-white"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-8 right-0 rounded-[28px] border border-white/16 bg-white/92 px-5 py-4 text-black shadow-[0_18px_34px_rgba(0,0,0,0.14)] lg:right-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#067a2b]">
                      1 App
                    </p>
                    <p className="mt-2 max-w-[220px] text-sm leading-6 text-black/74">
                      Users and service providers register through the same DELLA app.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative z-20 mx-auto -mt-16 grid max-w-6xl gap-5 px-6 md:grid-cols-2 xl:grid-cols-4 xl:px-10">
                {heroCards.map((card) => (
                  <article
                    key={card.title}
                    className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#11E64A_0%,#0A8C31_100%)] p-6 text-white shadow-[0_24px_40px_rgba(0,0,0,0.16)]"
                  >
                    <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_55%)]" />
                    <div className="relative z-10">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/18 bg-white/12 text-white">
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
                          {card.icon}
                        </svg>
                      </div>
                      <h3 className="mt-5 text-2xl font-semibold text-white">
                        {card.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/90">
                        {card.description}
                      </p>
                      <p className="mt-6 text-sm font-semibold text-white">
                        {card.link} <span aria-hidden="true">→</span>
                      </p>
                    </div>
                  </article>
                ))}
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
