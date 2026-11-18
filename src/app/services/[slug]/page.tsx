import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import { getService, projectSummary } from "@/lib/server/content";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import { imageFor } from "@/data/imagery";
import { PageHero } from "@/components/site/PageHero";
import { CTA } from "@/components/site/CTA";
import { FAQ } from "@/components/site/FAQ";
import { Metrics } from "@/components/site/Metrics";
import { ProcessSection } from "@/components/site/ProcessSection";
import { WorkCard } from "@/components/cards/WorkCard";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getService(slug);
  if (!item) notFound();
  return {
    title: item.title,
    openGraph: { title: item.title + " — Altus Media Labs" },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;

  const service = getService(slug);
  if (!service) notFound();
  const related = services.filter((s) => s.slug !== slug).slice(0, 3);
  const project = caseStudies.find((c) =>
    c.serviceSlugs.includes(service.slug),
  );
  return (
    <>
      <div className="site-container pt-6">
        <Link href="/services" className="action-link">
          <ArrowLeft size={16} />
          All services
        </Link>
      </div>
      {/* Hero: Service overview */}
      <PageHero
        eyebrow={service.shortTitle}
        title={service.tagline}
        description={service.description}
        image={service.image || imageFor(slug)}
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={`/contact?service=${slug}`}
            className="button button-primary"
          >
            Discuss your project <ArrowRight size={18} />
          </Link>
        </div>
      </PageHero>
      {/* Service results */}
      <Metrics items={service.stats} />
      {/* Capabilities: What we can build together */}
      <section className="site-section section-divider">
        <div className="site-container">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:mb-10 md:flex-row md:items-end md:gap-8">
            <div>
              <span className="text-eyebrow mb-5">Capabilities</span>
              <h2 className="heading-section">What we can build together.</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 border-t border-border md:grid-cols-2 lg:grid-cols-3">
            {service.features.map((f, i) => (
              <div
                className="flex flex-col gap-4 border-b border-border px-0 py-7 text-inherit no-underline transition-[background] duration-[180ms] ease-[ease] hover:bg-muted md:p-8 md:max-lg:odd:border-r lg:[&:not(:nth-child(3n))]:border-r"
                key={f.title}
              >
                <span className="text-eyebrow mb-5">0{i + 1}</span>
                <h3 className="heading-card">{f.title}</h3>
                <p className="text-body text-base">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Our process: A clear path from idea to impact */}
      <ProcessSection
        eyebrow="Our process"
        title={
          <>
            A clear path
            <br />
            from idea to impact.
          </>
        }
        description="You’ll know what we’re doing, why it matters, and what comes next. Each stage builds on a shared understanding of your goals."
        items={service.process}
      />
      {project && (
        /* In practice: See the work behind the thinking */
        <section className="site-section section-divider">
          <div className="site-container grid gap-8 md:grid-cols-2 md:gap-10 wide:gap-[72px]">
            <div>
              <span className="text-eyebrow mb-5">In practice</span>
              <h2 className="heading-section">
                See the work
                <br />
                behind the thinking.
              </h2>
            </div>
            <WorkCard study={projectSummary(project)} />
          </div>
        </section>
      )}
      {/* Your questions: Before we begin */}
      <section className="site-section section-divider">
        <div className="site-container grid gap-8 md:grid-cols-2 md:gap-10 wide:gap-[72px]">
          <div>
            <span className="text-eyebrow mb-5">Your questions</span>
            <h2 className="heading-section">Before we begin.</h2>
          </div>
          <FAQ items={service.faq} />
        </div>
      </section>
      {/* Related services: Connected expertise */}
      <section className="site-section section-divider">
        <div className="site-container">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:mb-10 md:flex-row md:items-end md:gap-8">
            <h2 className="heading-section">Connected expertise.</h2>
            <Link href="/services" className="action-link">
              All services <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 border-t border-border md:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <Link
                className="flex flex-col gap-4 border-b border-border px-0 py-7 text-inherit no-underline transition-[background] duration-[180ms] ease-[ease] hover:bg-muted md:p-8 md:max-lg:odd:border-r lg:[&:not(:nth-child(3n))]:border-r"
                href={`/services/${s.slug}`}
                key={s.slug}
              >
                <h3 className="heading-card">{s.shortTitle}</h3>
                <p className="text-body text-base">{s.tagline}</p>
                <span className="action-link mt-auto">
                  Explore <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Call to action: Have a challenge in mind? */}
      <CTA />
    </>
  );
}
