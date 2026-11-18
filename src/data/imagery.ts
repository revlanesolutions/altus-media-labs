export interface SiteImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  focalPoint?: string;
  fit?: "cover" | "contain";
  kind: "editorial" | "project" | "photo";
}
export const editorial: Record<string, SiteImage> = {
  strategy: {
    src: "/images/editorial/strategy.webp",
    alt: "A blue bridge connects an architectural blueprint to a terracotta arch.",
    width: 1536,
    height: 1024,
    focalPoint: "50% 55%",
    kind: "editorial",
  },
  systems: {
    src: "/images/editorial/systems.webp",
    alt: "Blue channels guide documents through an orderly architectural paper machine.",
    width: 1536,
    height: 1024,
    focalPoint: "50% 50%",
    kind: "editorial",
  },
  growth: {
    src: "/images/editorial/growth.webp",
    alt: "Sculptural blue leaves grow from a terracotta vessel on paper plinths.",
    width: 1536,
    height: 1024,
    focalPoint: "66% 50%",
    kind: "editorial",
  },
  brand: {
    src: "/images/editorial/brand.webp",
    alt: "Paper packaging, blue sculptural forms, and a terracotta seal arranged as a brand study.",
    width: 1536,
    height: 1024,
    kind: "editorial",
  },
  discovery: {
    src: "/images/editorial/discovery.webp",
    alt: "An architectural blue telescope points through a terracotta ring.",
    width: 1536,
    height: 1024,
    kind: "editorial",
  },
  experience: {
    src: "/images/editorial/experience.webp",
    alt: "A terracotta courtyard with blue arches, cream stairs, and a cypress tree.",
    width: 1536,
    height: 1024,
    kind: "editorial",
  },
};

const serviceEditorial: Record<string, SiteImage> = {
  automation: {
    src: "/images/services/ai-business-automation-v2.webp",
    alt: "Documents, messages, and data travel through a connected automation system and emerge as organized records and analytics.",
    width: 1536,
    height: 1024,
    kind: "editorial",
  },
  webDevelopment: {
    src: "/images/services/web-development-v2.webp",
    alt: "A website blueprint crosses into finished responsive desktop, tablet, and mobile interfaces.",
    width: 1536,
    height: 1024,
    kind: "editorial",
  },
  branding: {
    src: "/images/services/branding-design-v2.webp",
    alt: "A cohesive visual identity is applied across packaging, stationery, guidelines, and color samples.",
    width: 1536,
    height: 1024,
    kind: "editorial",
  },
  socialMedia: {
    src: "/images/services/social-media-management-v2.webp",
    alt: "A content calendar feeds scheduled posts into a mobile social feed with engagement and analytics signals.",
    width: 1536,
    height: 1024,
    kind: "editorial",
  },
  paidMarketing: {
    src: "/images/services/paid-marketing-v2.webp",
    alt: "Ad creatives move through targeting and conversion steps toward a landing page and measured results.",
    width: 1536,
    height: 1024,
    kind: "editorial",
  },
  seo: {
    src: "/images/services/search-engine-optimization-v2.webp",
    alt: "A magnifying lens examines a website while search results rise and a local business becomes easier to discover.",
    width: 1536,
    height: 1024,
    kind: "editorial",
  },
};

const mapping: Record<string, string> = {
  "ai-automation-for-small-business": "systems",
  "building-a-practical-brand-system": "brand",
  "local-seo-for-small-business": "discovery",
  "social-media-system-for-local-business": "growth",
  "small-business-website-essentials": "strategy",
  "paid-advertising-beyond-roas": "experience",
};
export function imageFor(slug: string): SiteImage | undefined {
  const serviceMapping: Record<string, string> = {
    "ai-business-automation": "automation",
    "web-development": "webDevelopment",
    "branding-design": "branding",
    "social-media-management": "socialMedia",
    "paid-marketing": "paidMarketing",
    "search-engine-optimization": "seo",
  };

  const serviceImage = serviceEditorial[serviceMapping[slug]];
  if (serviceImage) return serviceImage;

  return editorial[mapping[slug]];
}
