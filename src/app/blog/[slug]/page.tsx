import { type Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getArticles,
  getArticle,
  getArticleSlugs,
  articleSummary,
} from "@/lib/server/blog-content";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Media } from "@/components/site/Media";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { formatDate } from "@/lib/dates";
import { ArticleContent } from "@/components/site/ArticleContent";
import { parseArticleContent, articleHeadings } from "@/lib/article-markdown";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getArticle(slug);
  if (!item) notFound();
  return {
    title: item.title,
    openGraph: { title: item.title + " — Altus Media Labs" },
  };
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;

  const post = getArticle(slug);
  if (!post) notFound();
  const related = getArticles()
    .filter((p) => p.slug !== slug)
    .sort(
      (a, b) =>
        Number(b.category === post.category) -
        Number(a.category === post.category),
    )
    .slice(0, 3);
  const blocks = parseArticleContent(post.content);
  const headings = articleHeadings(blocks);
  return (
    <>
      <article>
        {/* Article header: Title, author, publication date, and cover image */}
        <header className="pt-12 pb-14 md:pt-[72px] md:pb-20">
          <div className="site-container">
            <div className="reading-container">
              <Link href="/blog" className="action-link mb-8">
                <ArrowLeft size={16} />
                All articles
              </Link>
              <span className="text-eyebrow mb-5">{post.category}</span>
              <h1 className="heading-section text-[clamp(36px,4.5vw,60px)]">
                {post.title}
              </h1>
              <p className="text-lead mt-7">{post.excerpt}</p>
              <p className="text-meta mt-6">
                By {post.author} · {post.authorRole}
              </p>
              <p className="text-meta mt-2">
                <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
                {post.readTime}
              </p>
            </div>
            <div className="mt-10">
              <Media
                image={post.image}
                priority
                aspectRatio="wide"
                sizes="(max-width: 1400px) 100vw, 1360px"
              />
            </div>
          </div>
        </header>
        {/* Article content: Table of contents, body, and author */}
        <div className="site-container">
          <div className="reading-container pb-16">
            {headings.length > 2 && (
              <nav
                aria-label="Article contents"
                className="mb-10 border-y border-border py-6"
              >
                <p className="font-semibold mb-3">In this article</p>
                {headings.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className="block text-base text-primary underline py-2"
                  >
                    {h.title}
                  </a>
                ))}
              </nav>
            )}
            <ArticleContent blocks={blocks} />
            <div className="border-t border-border pt-6 mt-10">
              <p className="font-semibold">{post.author}</p>
              <p className="text-meta">{post.authorRole}</p>
            </div>
          </div>
        </div>
      </article>
      {/* Keep exploring: Related reading */}
      <section className="site-section section-divider">
        <div className="site-container">
          <span className="text-eyebrow mb-5">Keep exploring</span>
          <h2 className="heading-section mb-10">Related reading.</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ArticleCard key={p.slug} post={articleSummary(p)} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
