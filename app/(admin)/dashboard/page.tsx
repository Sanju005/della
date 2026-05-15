import { KpiCard } from "@/components/kpi-card";
import { PlaceholderTable } from "@/components/placeholder-table";

const metrics = [
  {
    label: "Active users",
    value: "2,184",
    delta: "+8.4%",
    detail: "vs. last 30 days",
  },
  {
    label: "Verified providers",
    value: "316",
    delta: "+12",
    detail: "pending review: 19",
  },
  {
    label: "Open bookings",
    value: "128",
    delta: "-3.1%",
    detail: "today across all regions",
  },
  {
    label: "Service categories",
    value: "24",
    delta: "+2",
    detail: "new launches this quarter",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent">
              Control Center
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-ink">
              DELLA Admin Dashboard
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate">
              A starter overview for internal operations. The cards and tables
              below are static placeholders for now, ready to be connected to
              Supabase data and role-aware permissions in a later iteration.
            </p>
          </div>

          <div className="rounded-2xl border border-accent/15 bg-accent-soft px-4 py-3 text-sm text-accent-dark">
            Snapshot refreshed just now
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <KpiCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <PlaceholderTable
          title="Recent bookings"
          description="Latest booking activity will appear here once booking queries are connected."
          columns={["Booking ID", "Customer", "Provider", "Status", "Date"]}
          rows={[
            ["BK-24018", "Aina Rahman", "Glow Spa", "Scheduled", "15 May"],
            ["BK-24017", "Nur Amal", "FixPro", "Pending", "15 May"],
            ["BK-24016", "M. Karim", "CleanCare", "Completed", "14 May"],
            ["BK-24015", "Sara Lee", "PetEase", "Cancelled", "14 May"],
          ]}
        />

        <div className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-card">
          <h2 className="text-lg font-semibold text-ink">Team notes</h2>
          <div className="mt-5 space-y-4">
            {[
              "Provider onboarding workflow still pending database integration.",
              "Customer Care role should eventually have read-heavy access.",
              "Settings page is prepared for environment and policy controls.",
            ].map((note) => (
              <div
                key={note}
                className="rounded-2xl border border-slate-200 bg-mist/60 p-4 text-sm leading-6 text-slate"
              >
                {note}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
