import type { BlogPost } from "./blog-types";
import type { CaseStudy } from "./case-studies";
import type { Service } from "./services";
export type ArticleSummary = Omit<BlogPost, "content" | "authorRole">;
export type ProjectSummary = Pick<
  CaseStudy,
  "slug" | "image" | "title" | "client" | "industry" | "results"
> & { services: string[] };
export type ServiceOption = Pick<Service, "slug" | "title" | "shortTitle" | "tagline">;
