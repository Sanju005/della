const settingsGroups = [
  {
    title: "Workspace settings",
    items: ["Branding", "Navigation", "Default dashboard widgets"],
  },
  {
    title: "Access policies",
    items: ["Role permissions", "Session policy", "Audit logging"],
  },
  {
    title: "Integrations",
    items: ["Supabase env setup", "Storage", "Future service connectors"],
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-accent">
          Settings
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-ink">
          Platform settings
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate">
          Reserved for configuration, permission controls, and future
          environment-aware options.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {settingsGroups.map((group) => (
          <section
            key={group.title}
            className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-card"
          >
            <h2 className="text-lg font-semibold text-ink">{group.title}</h2>
            <div className="mt-4 space-y-3">
              {group.items.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-mist/60 px-4 py-3 text-sm text-slate"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
