import Link from "next/link";

const services = [
  {
    title: "Home Services",
    description:
      "Book trusted cleaning, repairs, maintenance, and everyday home support in one place.",
  },
  {
    title: "Beauty and Wellness",
    description:
      "Connect customers with self-care, salon, and wellness experiences that fit their schedule.",
  },
  {
    title: "Provider Opportunities",
    description:
      "Help service professionals reach more customers, manage jobs, and grow with better visibility.",
  },
];

const benefits = [
  "Fast booking flow for customers who want reliable services without friction.",
  "A single ecosystem for customers, service providers, and internal operations.",
  "Admin oversight for customer care, managers, and platform operations teams.",
  "A scalable foundation for onboarding, bookings, services, and support workflows.",
];

const adminRoles = ["Admin", "Customer Care", "Manager"];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 bg-admin-grid bg-admin-grid opacity-50" />

      <section className="relative border-b border-white/60">
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-8 lg:px-10">
          <header className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-accent">
                DELLA App
              </p>
              <p className="mt-2 text-sm text-slate">
                Services, support, and operations in one connected platform.
              </p>
            </div>

            <Link
              href="/login"
              className="rounded-full border border-accent/20 bg-white/80 px-5 py-3 text-sm font-semibold text-accent shadow-card transition hover:border-accent hover:bg-white"
            >
              Admin Login
            </Link>
          </header>

          <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1.08fr_0.92fr] lg:py-16">
            <div>
              <div className="inline-flex rounded-full border border-accent/15 bg-accent-soft px-4 py-2 text-sm font-medium text-accent-dark">
                Built for customers, providers, and the DELLA operations team
              </div>

              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] text-ink sm:text-6xl">
                Everyday services, smarter support, and a stronger platform
                experience.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate">
                DELLA helps users discover and book useful services, gives
                providers a place to grow, and gives your internal team the
                tools to manage the whole experience with confidence.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="#download"
                  className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
                >
                  Download the App
                </Link>
                <Link
                  href="/login"
                  className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-accent/30 hover:text-accent"
                >
                  Log In to Admin Panel
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[24px] border border-white/80 bg-white/85 p-5 shadow-card">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate">
                    Customers
                  </p>
                  <p className="mt-3 text-sm leading-6 text-ink">
                    Explore services and register through the DELLA mobile app.
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/80 bg-white/85 p-5 shadow-card">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate">
                    Providers
                  </p>
                  <p className="mt-3 text-sm leading-6 text-ink">
                    Join the network and manage service opportunities through the
                    app experience.
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/80 bg-white/85 p-5 shadow-card">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate">
                    Operations
                  </p>
                  <p className="mt-3 text-sm leading-6 text-ink">
                    Admin, Customer Care, and Managers use this portal to log
                    in and run operations.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-[32px] bg-ink p-7 text-white shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-white/55">
                  Why DELLA
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight">
                  One brand experience across booking, support, and delivery.
                </h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-3xl font-semibold">24/7</p>
                    <p className="mt-2 text-sm leading-6 text-white/70">
                      Digital access for users to discover services anytime.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-3xl font-semibold">3 Roles</p>
                    <p className="mt-2 text-sm leading-6 text-white/70">
                      Internal roles supported through the admin login flow.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[32px] border border-white/80 bg-white/90 p-7 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-accent">
                  Admin Access
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-ink">
                  Who logs in here?
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
                  Customers and service providers should register and use DELLA
                  through the mobile app. This web portal is for the internal
                  team that manages operations, support, providers, services,
                  and bookings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="relative">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-accent">
              Services
            </p>
            <h2 className="mt-4 text-4xl font-semibold text-ink">
              What DELLA provides
            </h2>
            <p className="mt-4 text-base leading-7 text-slate">
              DELLA brings together practical daily services and the operations
              layer needed to keep the customer experience smooth.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-[28px] border border-white/80 bg-white/90 p-7 shadow-card"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-lg font-semibold text-accent-dark">
                  {service.title.charAt(0)}
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

      <section className="relative border-y border-white/60 bg-white/45">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-accent">
                Benefits
              </p>
              <h2 className="mt-4 text-4xl font-semibold text-ink">
                Why teams and users will value the platform
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate">
                The public app and the internal admin panel each have a clear
                purpose, which keeps the experience simple for every audience.
              </p>
            </div>

            <div className="grid gap-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-[24px] border border-white/80 bg-white/90 px-6 py-5 text-sm leading-7 text-ink shadow-card"
                >
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="download" className="relative">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="rounded-[36px] bg-ink px-7 py-10 text-white shadow-card sm:px-10 sm:py-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/55">
                  Download
                </p>
                <h2 className="mt-4 text-4xl font-semibold leading-tight">
                  Use the app for customer and provider registration.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/72">
                  Customers and service providers should onboard through the
                  DELLA mobile app. Internal staff can use the admin login to
                  manage services, bookings, and support operations.
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
                  Go to Admin Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
