import { type Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { imageFor } from "@/data/imagery";
import { Media } from "@/components/site/Media";
import { CTA } from "@/components/site/CTA";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <>
      {/* Hero: Our expertise */}
      <PageHero
        eyebrow="Our expertise"
        title="Built around your next move."
        description="Six integrated disciplines. One team connecting strategy, technology, and growth around the needs of your business."
      />

      {/* Services: Six integrated disciplines */}
      <section className="site-section section-divider">
        <div className="site-container grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
          {services.map((s, i) => (
            <Link
              href={`/services/${s.slug}`}
              className="group/work block min-w-0 rounded-2xl text-inherit no-underline transition-transform duration-200 hover:-translate-y-0.5"
              key={s.slug}
            >
              <Media
                image={s.image || imageFor(s.slug)}
                aspectRatio="landscape"
                radiusClassName="rounded-2xl"
                className="transition-all duration-300 group-hover/work:shadow-md group-hover/work:scale-[1.01]"
              />
              <div className="pt-6">
                <span className="text-eyebrow mb-4">
                  0{i + 1} / {s.shortTitle}
                </span>
                <h2 className="heading-card group-hover/work:text-primary transition-colors">
                  {s.tagline}
                </h2>
                <p className="text-body mt-3">
                  {s.description.split(". ")[0]}.
                </p>
                <span className="action-link mt-4">
                  Explore {s.shortTitle.toLowerCase()} <ArrowRight size={18} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to action: Not sure where to start? */}
      <CTA
        title="Not sure where to start?"
        copy="Tell us about the challenge. We’ll help you find the right combination of services."
      />
    </>
  );
}
