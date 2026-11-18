export function Metrics({
  items,
  ariaLabel = "Results",
  textured = false,
}: {
  items: { value: string; label: string; description?: string }[];
  ariaLabel?: string;
  textured?: boolean;
}) {
  return (
    <section
      className="relative overflow-hidden bg-foreground py-14 text-card md:py-12"
      aria-label={ariaLabel}
    >
      {textured && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 blur-[6px] bg-[url('/images/metrics-sand-original.webp')] bg-cover bg-center opacity-[0.72]"
        />
      )}
      <div className="site-container relative grid grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-4 md:gap-8">
        {items.map((item) => (
          <div className="text-center" key={item.label}>
            <strong className="block text-[clamp(40px,4vw,54px)] font-semibold leading-[1.15] tabular-nums [overflow-wrap:anywhere]">
              {item.value}
            </strong>
            <span className="mt-3 block text-[16px] text-inverse-muted">
              {item.label}
            </span>
            {item.description && (
              <p className="mx-auto mt-2 max-w-[28ch] text-[14px] text-inverse-muted">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
