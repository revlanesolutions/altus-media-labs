import Image from "next/image";
import { editorial } from "@/data/imagery";
import { HeroActions } from "./HeroActions";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import { imageFor } from "@/data/imagery";
import { Media } from "@/components/site/Media";

export function EditorialHero() {
  const [systems, brand, discovery] = caseStudies;

  return (
    <section
      id="hero-editorial"
      aria-labelledby="editorial-hero-title"
      className="hidden site-section section-divider scroll-mt-[76px] md:scroll-mt-[88px] border-t-0"
    >
      <div className="site-container">
        <h2
          id="editorial-hero-title"
          className="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-3 gap-y-1 font-display text-[clamp(40px,9.8vw,70px)] font-medium leading-[1.04] tracking-[-0.045em] md:block md:text-[clamp(44px,8.3vw,120px)]"
        >
          <span className="contents md:flex md:flex-wrap md:items-center md:gap-x-7 md:gap-y-3">
            <span className="col-start-1 row-start-1">Where</span>{" "}
            <span className="relative col-start-2 row-start-1 inline-block h-[0.7em] w-full max-w-[190px] shrink-0 self-center overflow-hidden rounded-[100px] md:h-[0.8em] md:w-[2.05em] md:max-w-none">
              <Image
                src={editorial.strategy.src}
                alt=""
                fill
                sizes="(max-width: 767px) 190px, 250px"
                className="object-cover object-[50%_65%]"
              />
            </span>
            <span className="col-start-1 row-start-2">strategy</span>
          </span>{" "}
          <span className="contents md:mt-2 md:flex md:flex-wrap md:gap-x-[0.22em] md:pl-[16%]">
            <span className="col-start-2 row-start-2">meets</span>{" "}
            <span className="col-span-2 row-start-3 font-normal italic text-primary">
              execution.
            </span>
          </span>
        </h2>
        <div className="mt-7 grid gap-7 border-t border-border pt-6 md:mt-14 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-12 md:pt-7">
          <p className="text-lead max-w-[44ch]">
            Clear thinking. Connected disciplines. We turn your next ambition
            into brands, experiences, and systems that move your business
            forward.
          </p>
          <HeroActions />
        </div>

        {/* One dominant study and two supporting details. */}
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
              aspectRatio="landscape"
              radiusClassName="rounded-[4px]"
              sizes="(max-width: 767px) 100vw, 58vw"
            />
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="heading-card group-hover/study:text-primary">
                  {systems.client}
                </h3>
                <p className="text-meta mt-1">AI & business automation</p>
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
                    Brand strategy & digital experience
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
                <span className="text-meta text-terracotta">
                  03 / Discovery
                </span>
                <h3 className="heading-card mt-2 group-hover/study:text-primary">
                  {discovery.client}
                </h3>
                <p className="text-meta mt-2">Search strategy & growth</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-primary">
                  See the thinking <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
