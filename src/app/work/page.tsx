import { type Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { CTA } from "@/components/site/CTA";
import { ProjectFilters } from "@/components/filters/ProjectFilters";
import { getProjectSummaries } from "@/lib/server/content";

export const metadata: Metadata = { title: "Our work" };

export default function WorkPage() {
  return (
    <>
      {/* Hero: Selected work */}
      <PageHero
        eyebrow="Selected work"
        title="Good thinking. Tangible impact."
        description="Explore the challenges, decisions, and outcomes behind our work across brands, technology, and growth."
      />
      {/* Projects: Industry filters and case studies */}
      <ProjectFilters projects={getProjectSummaries()} />
      {/* Call to action: Let’s build your next chapter */}
      <CTA title="Let’s build your next chapter." />
    </>
  );
}
