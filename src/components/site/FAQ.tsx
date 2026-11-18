import { ChevronDown } from "lucide-react";

export function FAQ({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item) => (
        <details
          key={item.question}
          className="group py-4 transition-colors md:py-5"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-4 py-2 text-left text-lg font-semibold text-foreground transition-colors hover:text-primary list-none [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <ChevronDown
              size={18}
              className="shrink-0 text-smoke transition-transform duration-200 group-open:rotate-180 group-open:text-primary"
            />
          </summary>
          <div className="pt-2 pb-3 text-base text-graphite leading-relaxed max-w-[65ch]">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
