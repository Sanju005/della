type KpiCardProps = {
  label: string;
  value: string;
  delta: string;
  detail: string;
};

export function KpiCard({ label, value, delta, detail }: KpiCardProps) {
  return (
    <article className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-card">
      <p className="text-sm text-slate">{label}</p>
      <div className="mt-5 flex items-end justify-between gap-4">
        <p className="text-3xl font-semibold text-ink">{value}</p>
        <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-dark">
          {delta}
        </span>
      </div>
      <p className="mt-4 text-sm text-slate">{detail}</p>
    </article>
  );
}
