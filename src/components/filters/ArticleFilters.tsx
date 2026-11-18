"use client";

import { useState } from "react";
import { ArticleCard } from "@/components/cards/ArticleCard";
import type { ArticleSummary } from "@/data/content-types";

export function ArticleFilters({
  articles,
  posts = articles || [],
}: {
  articles?: ArticleSummary[];
  posts?: ArticleSummary[];
}) {
  const [category, setCategory] = useState("All");
  const list = posts;
  const filtered = list.filter(
    (p) => category === "All" || p.category === category,
  );
  const categories = ["All", ...Array.from(new Set(list.map((p) => p.category)))];

  return (
    <section className="section-divider">
      <div className="site-container">
        <div
          className="flex flex-wrap gap-2.5 py-6"
          role="group"
          aria-label="Filter articles by category"
        >
          {categories.map((c) => (
            <button
              key={c}
              className="min-h-10 rounded-full border border-border px-5 py-2 text-sm font-semibold transition-colors aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-white [&:hover:not([aria-pressed=true])]:bg-muted [&:hover:not([aria-pressed=true])]:border-foreground"
              aria-pressed={c === category}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <p className="text-meta" role="status" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "article" : "articles"}
          {category === "All" ? "" : ` in ${category}`}
        </p>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3 pt-8 pb-10 md:pb-20">
          {filtered.map((p) => (
            <ArticleCard key={p.slug} post={p} />
          ))}
        </div>
        {!filtered.length && (
          <div className="rounded-2xl border border-primary/20 bg-blue-soft p-6">
            <p className="text-graphite">No articles in this category yet.</p>
            <button
              className="action-link mt-2"
              onClick={() => setCategory("All")}
            >
              View all articles
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
