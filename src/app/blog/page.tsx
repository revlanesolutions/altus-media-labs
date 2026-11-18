import { type Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { ArticleFilters } from "@/components/filters/ArticleFilters";
import { getArticleSummaries } from "@/lib/server/blog-content";

export const metadata: Metadata = { title: "Insights & thinking" };

export default function BlogListingPage() {
  return (
    <>
      {/* Hero: The journal */}
      <PageHero
        eyebrow="The journal"
        title="Ideas for what comes next."
        description="Perspectives on strategy, design, technology, and growth from the people doing the work."
      />
      {/* Articles: Topic filters and journal entries */}
      <ArticleFilters articles={getArticleSummaries()} />
    </>
  );
}
