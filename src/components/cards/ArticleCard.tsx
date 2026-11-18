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
          row ? "rounded-[12px] md:rounded-[24px]" : "rounded-[20px]"
        }
        className={row ? "max-md:aspect-square" : ""}
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
              ? "text-eyebrow mb-2.5 max-md:text-[11px]"
              : "text-eyebrow mt-6 mb-5"
          }
        >
          {post.category}
        </span>
        <h3
          className={
            row
              ? "heading-card group-hover/article:text-primary max-md:text-[23px]"
              : "heading-card my-3.5 group-hover/article:text-primary"
          }
        >
          {post.title}
        </h3>
        {!row && <p className="text-body text-base">{post.excerpt}</p>}
        <p className={row ? "text-meta mt-3" : "text-meta mt-4"}>
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
          className="hidden md:block"
          size={20}
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
