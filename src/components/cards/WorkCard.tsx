import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Media } from "@/components/site/Media";
import type { ProjectSummary } from "@/data/content-types";
export function WorkCard({ study }: { study: ProjectSummary }) {
  return (
    <Link
      className="group/work block min-w-0 rounded-[24px] text-inherit no-underline"
      href={`/work/${study.slug}`}
    >
      <Media
        image={study.image}
        aspectRatio="landscape"
        className="transition-shadow duration-[180ms] ease-[ease] group-hover/work:shadow-[0_0_0_2px_var(--color-primary)]"
      />
      <div className="pt-6">
        <div className="text-meta mb-3 flex flex-wrap gap-x-5 gap-y-2">
          <span>{study.client}</span>
          <span>{study.industry}</span>
        </div>
        <h2 className="heading-card group-hover/work:text-primary">
          {study.title}
        </h2>
        <p className="text-meta mt-3">{study.services.join(" / ")}</p>
        <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-border pt-5">
          <strong className="text-[26px] font-semibold tabular-nums">
            {study.results[0].value}
          </strong>
          <span className="text-meta">{study.results[0].metric}</span>
        </div>
        <span className="action-link mt-4">
          View case study <ArrowUpRight size={18} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
