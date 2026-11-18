import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Media } from "@/components/site/Media";
import type { ProjectSummary } from "@/data/content-types";

export function WorkCard({ study }: { study: ProjectSummary }) {
  return (
    <Link
      className="group/work block min-w-0 rounded-2xl text-inherit no-underline transition-transform duration-200 hover:-translate-y-0.5"
      href={`/work/${study.slug}`}
    >
      <Media
        image={study.image}
        aspectRatio="landscape"
        radiusClassName="rounded-2xl"
        className="transition-all duration-300 group-hover/work:shadow-md group-hover/work:scale-[1.01]"
      />
      <div className="pt-6">
        <div className="text-meta mb-3 flex flex-wrap gap-x-4 gap-y-1">
          <span className="font-semibold text-foreground">{study.client}</span>
          <span className="text-smoke">·</span>
          <span>{study.industry}</span>
        </div>
        <h2 className="heading-card group-hover/work:text-primary transition-colors">
          {study.title}
        </h2>
        <p className="text-meta mt-2">{study.services.join(" / ")}</p>
        <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-border pt-5">
          <strong className="text-2xl font-bold tabular-nums text-foreground">
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
