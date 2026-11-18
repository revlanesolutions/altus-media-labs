import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { caseStudies } from "@/data/case-studies";
import { getArticleSlugs } from "@/lib/server/blog-content";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://altusmedialabs.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE_URL}/services`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE_URL}/work`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE_URL}/about`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/blog`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${BASE_URL}/contact`, priority: 0.9, changeFrequency: "monthly" },
    {
      url: `${BASE_URL}/privacy-policy`,
      priority: 0.3,
      changeFrequency: "yearly",
    },
    {
      url: `${BASE_URL}/terms-of-service`,
      priority: 0.3,
      changeFrequency: "yearly",
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  const workRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${BASE_URL}/work/${cs.slug}`,
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  const blogRoutes: MetadataRoute.Sitemap = getArticleSlugs().map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    priority: 0.6,
    changeFrequency: "yearly",
  }));

  return [...staticRoutes, ...serviceRoutes, ...workRoutes, ...blogRoutes];
}
