import Image from "next/image";
import Link from "next/link";

import { adminRoles, services } from "@/lib/marketing-content";

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

          <div className="pb-8 pt-10 lg:pb-12 lg:pt-14">
            <div className="relative min-h-[680px] overflow-visible rounded-[38px] bg-[linear-gradient(96deg,#063113_0%,#0A6A28_48%,#0DFF40_100%)] shadow-[0_26px_80px_rgba(13,255,64,0.16)]">
              <div className="absolute inset-0 rounded-[38px] bg-[radial-gradient(circle_at_72%_44%,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_52%_70%,rgba(114,255,88,0.14),transparent_28%)]" />
              <div className="grid min-h-[680px] gap-8 px-7 pb-12 pt-8 md:px-10 md:pb-14 md:pt-10 lg:grid-cols-[0.84fr_1.16fr] lg:items-center lg:px-12 lg:pb-16">
                <div className="z-10 text-white">
                  <div className="inline-flex rounded-full border border-white/18 bg-white/8 px-4 py-2 text-sm font-medium text-white">
                    Download-first service platform for DELLA
                  </div>
                  <h1 className="mt-8 max-w-3xl text-5xl font-semibold leading-[0.92] sm:text-6xl xl:text-[5.35rem]">
                    Find the right
                    <br />
                    service <span className="text-[#7AFF72]">faster</span>
                  </h1>
                  <p className="mt-7 max-w-xl text-lg leading-8 text-white/84">
                    Book trusted home services, babysitting, tuition, repairs,
                    beauty, and more from one simple DELLA app.
                  </p>

                  <div className="mt-9 flex flex-wrap gap-4">
                    <a
                      href="#download"
                      className="rounded-2xl bg-[#72FF58] px-8 py-4 text-lg font-semibold text-[#042C12] shadow-[0_16px_30px_rgba(114,255,88,0.24)] transition hover:bg-white"
                    >
                      Download the App
                    </a>
                    <Link
                      href="/our-services"
                      className="rounded-2xl border border-[#72FF58]/70 bg-transparent px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
                    >
                      Explore Services
                    </Link>
                  </div>

                  <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
                    {[
                      {
                        title: "Trusted Professionals",
                        icon: (
                          <path
                            d="M12 3.75 19 6.5v4.75c0 3.96-2.7 7.58-7 8.75-4.3-1.17-7-4.79-7-8.75V6.5z"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                          />
                        ),
                      },
                      {
                        title: "On-Demand Booking",
                        icon: (
                          <>
                            <circle
                              cx="12"
                              cy="12"
                              r="8.25"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            />
                            <path
                              d="M12 7.5v5l3 1.75"
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
                        title: "Secure Payments",
                        icon: (
                          <>
                            <rect
                              x="5"
                              y="8"
                              width="14"
                              height="11"
                              rx="2"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            />
                            <path
                              d="M8.5 8V6.75A3.5 3.5 0 0 1 12 3.25a3.5 3.5 0 0 1 3.5 3.5V8"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeWidth="1.8"
                            />
                          </>
                        ),
                      },
                      {
                        title: "24/7 Support",
                        icon: (
                          <>
                            <path
                              d="M6.5 10.75a5.5 5.5 0 1 1 11 0v4.5a1.25 1.25 0 0 1-1.25 1.25H15l-2.1 2.1a1 1 0 0 1-1.4 0L9.4 16.5H7.75A1.25 1.25 0 0 1 6.5 15.25z"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.8"
                            />
                          </>
                        ),
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="rounded-[22px] border border-white/14 bg-black/8 px-4 py-4 backdrop-blur-[2px]"
                      >
                        <div className="flex items-center gap-4 text-white">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/16 bg-white/8 text-[#72FF58]">
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
                              {item.icon}
                            </svg>
                          </div>
                          <p className="text-base font-semibold leading-7 text-white">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative min-h-[440px] lg:min-h-[620px]">
                  <div className="absolute inset-y-10 right-4 w-[86%] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,255,90,0.35)_0%,rgba(34,255,90,0.16)_42%,transparent_65%)] blur-[70px]" />
                  <div
                    className="absolute -right-8 -top-2 h-[118%] w-[132%] lg:-right-18 lg:-top-5 lg:w-[136%]"
                    style={{
                      WebkitMaskImage:
                        "radial-gradient(circle at center, black 55%, rgba(0,0,0,0.88) 68%, transparent 78%)",
                      maskImage:
                        "radial-gradient(circle at center, black 55%, rgba(0,0,0,0.88) 68%, transparent 78%)",
                    }}
                  >
                    <Image
                      src="/images/della-hero-blended.png"
                      alt="DELLA app hero visual"
                      fill
                      className="object-contain object-right opacity-[0.96]"
                      priority
                    />
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
