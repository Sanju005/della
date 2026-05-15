type PlaceholderTableProps = {
  title: string;
  description: string;
  columns: string[];
  rows: Array<Array<string | number>>;
  emptyMessage?: string;
  errorMessage?: string | null;
  isLoading?: boolean;
};

export function PlaceholderTable({
  title,
  description,
  columns,
  rows,
  emptyMessage = "No data available yet.",
  errorMessage,
  isLoading = false,
}: PlaceholderTableProps) {
  const hasRows = rows.length > 0;

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
            {isLoading ? (
              <tr className="border-t border-slate-100">
                <td
                  colSpan={columns.length}
                  className="px-6 py-6 text-sm text-slate"
                >
                  Loading data...
                </td>
              </tr>
            ) : errorMessage ? (
              <tr className="border-t border-slate-100">
                <td
                  colSpan={columns.length}
                  className="px-6 py-6 text-sm text-rose-600"
                >
                  {errorMessage}
                </td>
              </tr>
            ) : hasRows ? (
              rows.map((row, index) => (
                <tr
                  key={`${title}-${index}`}
                  className="border-t border-slate-100"
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`${cell}-${cellIndex}`}
                      className="whitespace-nowrap px-6 py-4 text-sm text-ink"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="border-t border-slate-100">
                <td
                  colSpan={columns.length}
                  className="px-6 py-6 text-sm text-slate"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
