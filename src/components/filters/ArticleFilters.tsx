"use client";
import { useState } from "react";
import { ArticleCard } from "@/components/cards/ArticleCard";
import type { ArticleSummary } from "@/data/content-types";
export function ArticleFilters({
  articles: blogPosts,
}: {
  articles: ArticleSummary[];
}) {
  const [category, setCategory] = useState("All");
  const posts = blogPosts.filter(
    (p) => category === "All" || p.category === category,
  );
  const categories = Array.from(new Set(blogPosts.map((p) => p.category)));
  return (
    <section className="section-divider">
      <div className="site-container">
        <div
          className="flex flex-wrap gap-2.5 py-5"
          role="group"
          aria-label="Filter articles by topic"
        >
          {["All", ...categories].map((c) => (
            <button
              key={c}
              className="min-h-11 rounded-[100px] border border-input px-[18px] py-2 text-[15px] aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-card [&:hover:not([aria-pressed=true])]:bg-card"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <p className="text-meta" role="status">
          {posts.length} {posts.length === 1 ? "article" : "articles"}
          {category === "All" ? "" : ` about ${category}`}
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 py-10 md:py-16">
          {posts.map((p) => (
            <ArticleCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
