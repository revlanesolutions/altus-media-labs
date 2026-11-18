import type { SiteImage } from "./imagery";

export interface BlogPost {
  slug: string;
  image?: SiteImage;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  content: string;
}
