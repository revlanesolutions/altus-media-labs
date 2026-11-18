import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Media } from "@/components/site/Media";
import type { ArticleSummary } from "@/data/content-types";
import { formatDate } from "@/lib/dates";

export function ArticleCard({
  post,
  row = false,
}: {
  post: ArticleSummary;
  row?: boolean;
}) {
  return (
    <Link
      className={
        row
          ? "group/article grid grid-cols-[100px_minmax(0,1fr)] items-start gap-5 border-t first-of-type:border-t-0 border-border py-7 first-of-type:pt-0 last-of-type:pb-0 text-inherit no-underline md:grid-cols-[200px_minmax(0,1fr)_auto] md:items-center md:gap-8"
          : "group/article min-w-0 text-inherit no-underline"
      }
      href={`/blog/${post.slug}`}
    >
      <Media
        image={post.image}
        radiusClassName={
          row ? "rounded-xl md:rounded-2xl" : "rounded-2xl"
        }
        className={row ? "max-md:aspect-square" : "transition-transform duration-300 group-hover/article:scale-[1.01]"}
        sizes={
          row
            ? "(max-width: 767px) 100px, 200px"
            : "(max-width: 767px) 100vw, 33vw"
        }
      />
      <div>
        <span
          className={
            row
              ? "text-eyebrow mb-2.5 text-xs"
              : "text-eyebrow mt-6 mb-4 text-xs"
          }
        >
          {post.category}
        </span>
        <h3
          className={
            row
              ? "heading-card group-hover/article:text-primary transition-colors text-lg md:text-xl"
              : "heading-card my-3 group-hover/article:text-primary transition-colors"
          }
        >
          {post.title}
        </h3>
        {!row && <p className="text-body text-base">{post.excerpt}</p>}
        <p className={row ? "text-meta mt-2" : "text-meta mt-3"}>
          {post.author} · {post.readTime}{" "}
          {!row && (
            <>
              · <time dateTime={post.date}>{formatDate(post.date)}</time>
            </>
          )}
        </p>
      </div>
      {row && (
        <ArrowUpRight
          className="hidden md:block text-smoke group-hover/article:text-primary transition-colors"
          size={20}
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
