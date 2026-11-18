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
        <span className="text-eyebrow mb-4 md:mb-6">
          Growth & Automation Agency
        </span>
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] md:items-end md:gap-12">
          <h1
            id="work-hero-title"
            className="heading-display font-bold"
          >
            Growth made
            <br />
            <span className="text-primary">tangible.</span>
          </h1>
          <div>
            <p className="text-lead">
              We help US businesses attract customers and eliminate manual operational friction
              through strategic branding, websites, marketing, and custom automation.
            </p>
            <div className="mt-6">
              <HeroActions />
            </div>
          </div>
        </div>

        {/* Contact sheet: one dominant study and two supporting details. */}
        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:gap-10">
          <Link
            href={`/work/${systems.slug}`}
            className="group/study block min-w-0 text-inherit no-underline"
          >
            <div className="mb-3 flex items-center justify-between gap-3 text-meta">
              <span className="text-primary font-semibold text-xs tracking-wider uppercase">01 / Systems</span>
            </div>
            <Media
              image={systems.image || imageFor(systems.slug)}
              priority
              aspectRatio="landscape"
              radiusClassName="rounded-2xl"
              className="shadow-sm transition-all duration-300 group-hover/study:shadow-md group-hover/study:scale-[1.01]"
              sizes="(max-width: 767px) 100vw, 58vw"
            />
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="heading-card group-hover/study:text-primary transition-colors">
                  {systems.client}
                </h3>
                <p className="text-meta mt-1">
                  Automating loan applications and document checks
                </p>
              </div>
              <ArrowUpRight
                size={22}
                aria-hidden="true"
                className="mt-1 text-primary transition-transform duration-200 group-hover/study:translate-x-0.5 group-hover/study:-translate-y-0.5"
              />
            </div>
          </Link>
          <div className="grid content-start gap-8">
            <Link
              href={`/work/${brand.slug}`}
              className="group/study block min-w-0 text-inherit no-underline"
            >
              <div className="mb-3 flex items-center justify-between gap-3 text-meta">
                <span className="text-primary font-semibold text-xs tracking-wider uppercase">02 / Identity</span>
              </div>
              <Media
                image={brand.image || imageFor(brand.slug)}
                aspectRatio="wide"
                radiusClassName="rounded-2xl"
                className="shadow-sm transition-all duration-300 group-hover/study:shadow-md group-hover/study:scale-[1.01]"
                sizes="(max-width: 767px) 100vw, 42vw"
              />
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="heading-card group-hover/study:text-primary transition-colors">
                    {brand.client}
                  </h3>
                  <p className="text-meta mt-1">
                    Bringing a farm's brand to shelves and online
                  </p>
                </div>
                <ArrowUpRight
                  size={22}
                  aria-hidden="true"
                  className="mt-1 text-primary transition-transform duration-200 group-hover/study:translate-x-0.5 group-hover/study:-translate-y-0.5"
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
                radiusClassName="rounded-xl"
                className="shadow-sm transition-all duration-300 group-hover/study:shadow-md"
                sizes="(max-width: 767px) 40vw, 16vw"
              />
              <div>
                <span className="text-primary font-semibold text-xs tracking-wider uppercase">
                  03 / Search
                </span>
                <h3 className="heading-card mt-1 group-hover/study:text-primary transition-colors">
                  {discovery.client}
                </h3>
                <p className="text-meta mt-1">
                  Building organic search visibility for a SaaS platform
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Read the case study{" "}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
