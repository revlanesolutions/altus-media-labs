import "server-only";
import type { SiteImage } from "./imagery";
export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  bio: string;
  photo?: SiteImage;
}
export const team: TeamMember[] = [
  {
    name: "Marcus Rivera",
    role: "Head of AI Solutions",
    initials: "MR",
    bio: "Former ML engineer at Google, now building AI systems that create real business value",
  },
  {
    name: "Priya Sharma",
    role: "Creative Director",
    initials: "PS",
    bio: "Award-winning designer with 15 years of experience shaping brand identities",
  },
  {
    name: "James Okafor",
    role: "SEO Strategy Lead",
    initials: "JO",
    bio: "Has driven over $20M in organic revenue for B2B and DTC brands alike",
  },
  {
    name: "Elena Vasquez",
    role: "Social Media Director",
    initials: "EV",
    bio: "Built communities of 500K+ and turned social followers into paying customers",
  },
  {
    name: "Ryan Chen",
    role: "Lead Engineer",
    initials: "RC",
    bio: "Full-stack architect specializing in high-performance web applications and APIs",
  },
  {
    name: "Sarah Kim",
    role: "Paid Media Director",
    initials: "SK",
    bio: "Managed $15M+ in ad spend with a consistent 5x+ return on investment",
  },
];
