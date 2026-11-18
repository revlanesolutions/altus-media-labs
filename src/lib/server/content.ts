import "server-only";
import { services } from "@/data/services";
import { caseStudies, type CaseStudy } from "@/data/case-studies";
import { imageFor } from "@/data/imagery";
import type { ProjectSummary, ServiceOption } from "@/data/content-types";
export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
export function getProject(slug: string) {
  return caseStudies.find((p) => p.slug === slug);
}
export function getServiceOptions(): ServiceOption[] {
  return services.map(({ slug, title, shortTitle, tagline }) => ({
    slug,
    title,
    shortTitle,
    tagline,
  }));
}
export function serviceTitles(slugs: string[]) {
  return slugs.map((slug) => {
    const service = getService(slug);
    if (!service) throw new Error("Unknown service: " + slug);
    return service.title;
  });
}
export function projectSummary(p: CaseStudy): ProjectSummary {
  return {
    slug: p.slug,
    image: p.image || imageFor(p.slug),
    title: p.title,
    client: p.client,
    industry: p.industry,
    services: serviceTitles(p.serviceSlugs),
    results: p.results.slice(0, 1),
  };
}
export function getProjectSummaries(): ProjectSummary[] {
  return caseStudies.map(projectSummary);
}
