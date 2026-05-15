type PlaceholderTableProps = {
  title: string;
  description: string;
  columns: string[];
  rows: string[][];
};

export function PlaceholderTable({
  title,
  description,
  columns,
  rows,
}: PlaceholderTableProps) {
  return (
    <section className="overflow-hidden rounded-[28px] border border-white/70 bg-white/90 shadow-card">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-semibold text-ink">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate">{description}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-mist/70">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${title}-${index}`} className="border-t border-slate-100">
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${cell}-${cellIndex}`}
                    className="whitespace-nowrap px-6 py-4 text-sm text-ink"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
