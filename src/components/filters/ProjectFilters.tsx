"use client";

import { useState } from "react";
import { WorkCard } from "@/components/cards/WorkCard";
import type { ProjectSummary } from "@/data/content-types";

export function ProjectFilters({
  projects: caseStudies,
}: {
  projects: ProjectSummary[];
}) {
  const [filter, setFilter] = useState("All");
  const projects = caseStudies.filter(
    (c) => filter === "All" || c.industry === filter,
  );
  const industries = Array.from(new Set(caseStudies.map((c) => c.industry)));

  return (
    <section className="section-divider">
      <div className="site-container">
        <div
          className="flex flex-wrap gap-2.5 py-6"
          role="group"
          aria-label="Filter projects by industry"
        >
          {["All", ...industries].map((f) => (
            <button
              key={f}
              className="min-h-10 rounded-full border border-border px-5 py-2 text-sm font-semibold transition-colors aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-white [&:hover:not([aria-pressed=true])]:bg-muted [&:hover:not([aria-pressed=true])]:border-foreground"
              aria-pressed={f === filter}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <p className="text-meta" role="status" aria-live="polite">
          {projects.length} {projects.length === 1 ? "project" : "projects"}
          {filter === "All" ? "" : ` in ${filter}`}
        </p>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 pt-8 pb-10 md:pb-20">
          {projects.map((c) => (
            <WorkCard key={c.slug} study={c} />
          ))}
        </div>
        {!projects.length && (
          <div className="rounded-2xl border border-primary/20 bg-blue-soft p-6">
            <p className="text-graphite">No projects in this category yet.</p>
            <button className="action-link mt-2" onClick={() => setFilter("All")}>
              View all projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
