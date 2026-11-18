import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { homeServiceSummaries } from "@/data/homepage";
import { caseStudies } from "@/data/case-studies";
import { editorial, imageFor } from "@/data/imagery";
import { Media } from "@/components/site/Media";
import { CTA } from "@/components/site/CTA";
import { Metrics } from "@/components/site/Metrics";
import { ProcessSection } from "@/components/site/ProcessSection";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { WorkHero } from "@/components/home/heroes/WorkHero";
import { StartingPoint } from "@/components/home/StartingPoint";
import { BeforeWeBegin } from "@/components/home/BeforeWeBegin";
import { serviceTitles } from "@/lib/server/content";
import { getArticleSummaries } from "@/lib/server/blog-content";

export default function HomePage() {
  return (
    <>
      {/* Main hero: An editorial contact sheet of case studies */}
      <WorkHero />

      {/* Find your starting point: Practical guidance for your business challenge */}
      <StartingPoint />

      {/* Our expertise: Six disciplines. One integrated team. */}
      <section className="site-section section-divider">
        <div className="site-container">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:mb-10 md:flex-row md:items-end md:gap-8">
            <div>
              <span className="text-eyebrow mb-5">Our expertise</span>
              <h2 className="heading-section">
                Six disciplines.
                <br />
                One integrated team.
              </h2>
              <p className="text-body mt-5 max-w-[60ch]">
                Bring us a focused project or a challenge that spans several
                services. We connect the strategy, creative work, and
                implementation around the same business goal.
              </p>
            </div>
            <Link className="action-link" href="/services">
              All services <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 border-t border-border md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Link
                className="flex flex-col gap-4 border-b border-border px-0 py-7 text-inherit no-underline transition-[background] duration-200 hover:bg-muted/70 md:p-8 md:max-lg:odd:border-r lg:[&:not(:nth-child(3n))]:border-r"
                href={`/services/${s.slug}`}
                key={s.slug}
              >
                <div className="mb-3 flex items-center justify-between text-xs font-bold text-primary tracking-wider uppercase">
                  <span>0{i + 1}</span>
                  <ArrowUpRight size={18} />
                </div>
                <h3 className="heading-card">
                  {homeServiceSummaries[s.slug]?.title ?? s.shortTitle}
                </h3>
                <p className="text-body text-base">
                  {homeServiceSummaries[s.slug]?.description ?? s.tagline}
                </p>
                <span className="action-link mt-auto">
                  Explore service <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Selected work: Thoughtful work. Measurable outcomes. */}
      <section className="site-section section-divider">
        <div className="site-container">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:mb-10 md:flex-row md:items-end md:gap-8">
            <div>
              <span className="text-eyebrow mb-5">Selected work</span>
              <h2 className="heading-section">
                Thoughtful work.
                <br />
                Measurable outcomes.
              </h2>
            </div>
            <Link className="action-link" href="/work">
              All projects <ArrowRight size={18} />
            </Link>
          </div>
          {caseStudies.slice(0, 3).map((cs) => (
            <article
              className="grid grid-cols-1 items-center gap-8 border-t first-of-type:border-t-0 border-border py-8 first-of-type:pt-0 last-of-type:pb-0 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-12"
              key={cs.slug}
            >
              <Link
                href={`/work/${cs.slug}`}
                aria-label={`View ${cs.client} case study`}
              >
                <Media
                  image={cs.image || imageFor(cs.slug)}
                  aspectRatio="landscape"
                  radiusClassName="rounded-2xl"
                  className="shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.01]"
                />
              </Link>
              <div>
                <span className="text-meta">
                  {cs.client} / {cs.industry}
                </span>
                <h3 className="heading-section mt-4 mb-5">
                  {cs.title}
                </h3>
                <p className="text-body text-base">
                  {serviceTitles(cs.serviceSlugs).join(" / ")}
                </p>
                <div className="text-left mt-6">
                  <strong className="block text-3xl md:text-4xl font-bold leading-tight tabular-nums text-foreground">
                    {cs.results[0].value}
                  </strong>
                  <span className="mt-2 block text-sm text-smoke">
                    {cs.results[0].metric}
                  </span>
                </div>
                <Link href={`/work/${cs.slug}`} className="action-link mt-6">
                  Read the case study <ArrowUpRight size={18} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Our approach at a glance: Services, delivery, and engagement options */}
      <Metrics
        ariaLabel="Our approach at a glance"
        items={[
          {
            value: String(services.length),
            label: "Service disciplines",
            description: "Brand, web, marketing, and automation.",
          },
          {
            value: "5",
            label: "Delivery stages",
            description: "From discovery through improvement.",
          },
          {
            value: "1",
            label: "Shared business goal",
            description: "Guiding the strategy and execution.",
          },
          {
            value: "2",
            label: "Ways to work together",
            description: "A focused project or ongoing support.",
          },
        ]}
      />

      {/* How we work: Clarity first. Progress together. */}
      <ProcessSection
        eyebrow="How we work"
        divider={false}
        title={
          <>
            Clarity first.
            <br />
            Progress together.
          </>
        }
        description="We agree on the problem, the priorities, and what success looks like before building. Each stage gives us something concrete to review together."
        items={[
          {
            step: 1,
            title: "Discover & Define",
            description:
              "Review your goals, audience, and existing setup. Agree on the problem to solve and how success will be measured.",
          },
          {
            step: 2,
            title: "Strategize & Plan",
            description:
              "Define the scope, priorities, and milestones so everyone knows what will be delivered and what is needed to get there.",
          },
          {
            step: 3,
            title: "Build & Launch",
            description:
              "Create and test the agreed solution, review it with your team, and prepare it for launch.",
          },
          {
            step: 4,
            title: "Measure & Learn",
            description:
              "Compare performance with the starting point and agreed goals. Identify what is working and where friction remains.",
          },
          {
            step: 5,
            title: "Optimize & Grow",
            description:
              "Prioritize the next improvements based on the evidence, with further work agreed around your needs.",
          },
        ]}
      >
        <Media
          image={editorial.systems}
          radiusClassName="rounded-2xl"
          className="shadow-sm"
        />
        <Link className="action-link mt-6" href="/about">
          Meet Altus <ArrowRight size={18} />
        </Link>
      </ProcessSection>

      {/* Our journal: Better questions. Better decisions. */}
      <section className="site-section section-divider">
        <div className="site-container">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:mb-10 md:flex-row md:items-end md:gap-8">
            <div>
              <span className="text-eyebrow mb-5">Our journal</span>
              <h2 className="heading-section">
                Better questions. Better decisions.
              </h2>
              <p className="text-body mt-5 max-w-[60ch]">
                Practical perspectives on choosing what to build, automate, and
                invest in next.
              </p>
            </div>
            <Link href="/blog" className="action-link">
              All articles <ArrowRight size={18} />
            </Link>
          </div>
          {getArticleSummaries()
            .slice(0, 2)
            .map((p) => (
              <ArticleCard key={p.slug} post={p} row />
            ))}
        </div>
      </section>

      {/* Before we begin: Scope, preparation, and working with your existing setup */}
      <BeforeWeBegin />

      {/* Call to action: Have a challenge in mind? */}
      <CTA copy="Tell us what you want to improve. We'll discuss the challenge, see whether we're a fit, and work out a useful next step." />
    </>
  );
}
