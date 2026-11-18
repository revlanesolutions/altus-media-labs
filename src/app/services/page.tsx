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
              className="group/work block min-w-0 rounded-[24px] text-inherit no-underline"
              key={s.slug}
            >
              <Media
                image={s.image || imageFor(s.slug)}
                aspectRatio="landscape"
                className="transition-shadow duration-[180ms] ease-[ease] group-hover/work:shadow-[0_0_0_2px_var(--color-primary)]"
              />
              <div className="pt-6">
                <span className="text-eyebrow mb-5">
                  0{i + 1} / {s.shortTitle}
                </span>
                <h2 className="heading-card group-hover/work:text-primary">
                  {s.tagline}
                </h2>
                <p className="text-body mt-4">
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
