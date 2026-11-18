import type { ReactNode } from "react";

type ProcessStep = {
  step: number;
  title: string;
  description: string;
};

export function ProcessSection({
  eyebrow,
  title,
  description,
  items,
  divider = true,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  items: ProcessStep[];
  divider?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className={`site-section${divider ? " section-divider" : ""}`}>
      <div className="site-container grid gap-8 md:grid-cols-2 md:gap-10 wide:gap-[72px]">
        <div>
          <span className="text-eyebrow mb-5">{eyebrow}</span>
          <h2 className="heading-section">{title}</h2>
          <p className={`text-body mt-6${children ? " mb-8" : ""}`}>
            {description}
          </p>
          {children}
        </div>
        <div>
          {items.map((item) => (
            <div
              className="grid grid-cols-[32px_1fr] gap-5 border-t border-border py-6 first:border-t-0"
              key={item.step}
            >
              <span className="text-[13px] text-terracotta">
                {String(item.step).padStart(2, "0")}
              </span>
              <div>
                <h3 className="heading-card">{item.title}</h3>
                <p className="mt-3 text-graphite">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
