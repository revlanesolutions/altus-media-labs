import "server-only";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { cache } from "react";
import type { BlogPost } from "@/data/blog-types";
import type { ArticleSummary } from "@/data/content-types";
import { editorial, imageFor } from "@/data/imagery";
import { parseBlogPost } from "@/lib/blog-markdown";

/** Discover posts automatically; cache repeated reads only within a render. */
export const getArticles = cache((): BlogPost[] => {
  const filenames = readdirSync(join(process.cwd(), "src/content/blog")).filter(
    (filename) => filename.endsWith(".md"),
  );
  return filenames
    .map((filename) => {
      const slug = filename.slice(0, -3);
      const source = readFileSync(
        join(process.cwd(), "src/content/blog", filename),
        "utf8",
      );
      const post = parseBlogPost(slug, source);
      const image = post.image || imageFor(slug) || editorial.strategy;
      if (!existsSync(join(process.cwd(), "public", image.src)))
        throw new Error(`${filename} references a missing image: ${image.src}`);
      return { ...post, image };
    })
    .sort(
      (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
    );
});

export function getArticle(slug: string) {
  return getArticles().find((post) => post.slug === slug);
}

export function getArticleSlugs() {
  return getArticles().map((post) => post.slug);
}

export function getArticleSummaries(): ArticleSummary[] {
  return getArticles().map(articleSummary);
}

export function articleSummary(post: BlogPost): ArticleSummary {
  return {
    slug: post.slug,
    image: post.image,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    author: post.author,
    date: post.date,
    readTime: post.readTime,
  };
}
