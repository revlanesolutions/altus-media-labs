export function Metrics({
  items,
  ariaLabel = "Results",
}: {
  items: { value: string; label: string; description?: string }[];
  ariaLabel?: string;
  textured?: boolean;
}) {
  return (
    <section
      className="relative overflow-hidden bg-slate-950 py-16 text-white md:py-20 border-y border-slate-900"
      aria-label={ariaLabel}
    >
      <div className="site-container relative grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {items.map((item) => (
          <div className="text-center" key={item.label}>
            <strong className="block text-4xl md:text-5xl font-extrabold tracking-tight tabular-nums text-white">
              {item.value}
            </strong>
            <span className="mt-3 block text-xs font-bold uppercase tracking-wider text-blue-400">
              {item.label}
            </span>
            {item.description && (
              <p className="mx-auto mt-2 max-w-[28ch] text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
