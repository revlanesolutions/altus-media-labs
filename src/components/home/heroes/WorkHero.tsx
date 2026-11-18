import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import { imageFor } from "@/data/imagery";
import { Media } from "@/components/site/Media";
import { HeroActions } from "./HeroActions";

export function WorkHero() {
  const [systems, brand, discovery] = caseStudies;

  return (
    <section
      id="hero-work"
      aria-labelledby="work-hero-title"
      className="site-section scroll-mt-[76px] pt-8 md:scroll-mt-[88px] md:pt-12"
    >
      <div className="site-container">
        <span className="text-eyebrow mb-5 md:mb-7">
          Growth & Automation Agency
        </span>
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] md:items-end md:gap-12">
          <h1
            id="work-hero-title"
            className="font-display text-[clamp(44px,6vw,96px)] font-medium leading-[1.05] tracking-[-0.04em]"
          >
            Growth made
            <br />
            <span className="font-normal italic text-primary">tangible.</span>
          </h1>
          <div>
            <p className="text-body max-w-[37ch]">
              We help businesses attract customers and reduce manual work
              through brand strategy, websites, marketing, and automation.
            </p>
            <div className="mt-5 md:mt-6">
              <HeroActions />
            </div>
          </div>
        </div>
        {/* Contact sheet: one dominant study and two supporting details. */}
        <div className="mt-9 grid gap-8 md:mt-20 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:gap-10">
          <Link
            href={`/work/${systems.slug}`}
            className="group/study block min-w-0 text-inherit no-underline"
          >
            <div className="mb-3 flex items-center justify-between gap-3 text-meta">
              <span className="text-terracotta">01 / Systems</span>
            </div>
            <Media
              image={systems.image || imageFor(systems.slug)}
              priority
              aspectRatio="landscape"
              radiusClassName="rounded-[4px]"
              sizes="(max-width: 767px) 100vw, 58vw"
            />
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="heading-card group-hover/study:text-primary">
                  {systems.client}
                </h3>
                <p className="text-meta mt-1">
                  Automating loan applications and document checks
                </p>
              </div>
              <ArrowUpRight
                size={22}
                aria-hidden="true"
                className="mt-1 text-primary"
              />
            </div>
          </Link>
          <div className="grid content-start gap-8">
            <Link
              href={`/work/${brand.slug}`}
              className="group/study block min-w-0 text-inherit no-underline"
            >
              <div className="mb-3 flex items-center justify-between gap-3 text-meta">
                <span className="text-terracotta">02 / Identity</span>
              </div>
              <Media
                image={brand.image || imageFor(brand.slug)}
                aspectRatio="wide"
                radiusClassName="rounded-[4px]"
                sizes="(max-width: 767px) 100vw, 42vw"
              />
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="heading-card group-hover/study:text-primary">
                    {brand.client}
                  </h3>
                  <p className="text-meta mt-1">
                    Bringing a farm’s brand to shelves and online
                  </p>
                </div>
                <ArrowUpRight
                  size={22}
                  aria-hidden="true"
                  className="mt-1 text-primary"
                />
              </div>
            </Link>
            <Link
              href={`/work/${discovery.slug}`}
              className="hidden md:grid group/study min-w-0 grid-cols-[minmax(0,0.45fr)_minmax(0,1fr)] items-center gap-5 border-t border-border pt-6 text-inherit no-underline"
            >
              <Media
                image={discovery.image || imageFor(discovery.slug)}
                aspectRatio="landscape"
                radiusClassName="rounded-[4px]"
                sizes="(max-width: 767px) 40vw, 16vw"
              />
              <div>
                <span className="text-meta text-terracotta">03 / Search</span>
                <h3 className="heading-card mt-2 group-hover/study:text-primary">
                  {discovery.client}
                </h3>
                <p className="text-meta mt-2">
                  Building organic search visibility for a SaaS platform
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-primary">
                  Read the case study{" "}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
