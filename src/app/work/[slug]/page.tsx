import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/data/case-studies";
import { getProject, serviceTitles } from "@/lib/server/content";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { imageFor } from "@/data/imagery";
import { Media } from "@/components/site/Media";
import { CTA } from "@/components/site/CTA";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getProject(slug);
  if (!item) notFound();
  return {
    title: item.title,
    openGraph: { title: item.title + " — Altus Media Labs" },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;

  const index = caseStudies.findIndex((c) => c.slug === slug);
  if (index < 0) notFound();
  const cs = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];
  return (
    <>
      {/* Hero: Project overview */}
      <section className="pt-12 pb-14 md:pt-[72px] md:pb-20">
        <div className="site-container">
          <Link href="/work" className="action-link mb-8">
            <ArrowLeft size={16} />
            All work
          </Link>
          <span className="text-eyebrow mb-5">
            {cs.client} / {cs.industry}
          </span>
          <h1 className="heading-display max-w-5xl">{cs.title}</h1>
          {cs.disclaimer && (
            <p className="text-meta mt-5 max-w-3xl">{cs.disclaimer}</p>
          )}
          <dl className="mt-10 flex flex-wrap gap-6 border-y border-border py-7 md:gap-x-12">
            <div>
              <dt className="text-[13px] text-smoke">Client</dt>
              <dd className="mt-1.5 text-[17px]">{cs.client}</dd>
            </div>
            <div>
              <dt className="text-[13px] text-smoke">Expertise</dt>
              <dd className="mt-1.5 text-[17px]">
                {serviceTitles(cs.serviceSlugs).join(" / ")}
              </dd>
            </div>
            <div>
              <dt className="text-[13px] text-smoke">Timeline</dt>
              <dd className="mt-1.5 text-[17px]">{cs.timeline}</dd>
            </div>
          </dl>
          <div className="mt-10">
            <Media
              image={cs.image || imageFor(slug)}
              priority
              aspectRatio="wide"
              sizes="(max-width: 1400px) 100vw, 1360px"
            />
          </div>
        </div>
      </section>
      {/* 01 / The challenge: Where we started */}
      <section className="site-section section-divider">
        <div className="site-container grid gap-8 md:grid-cols-2 md:gap-10 wide:gap-[72px]">
          <div>
            <span className="text-eyebrow mb-5">01 / The challenge</span>
            <h2 className="heading-section">Where we started.</h2>
          </div>
          <p className="text-reading">{cs.challenge}</p>
        </div>
      </section>
      {/* 02 / The approach: A focused response */}
      <section className="site-section section-divider">
        <div className="site-container grid gap-8 md:grid-cols-2 md:gap-10 wide:gap-[72px]">
          <div>
            <span className="text-eyebrow mb-5">02 / The approach</span>
            <h2 className="heading-section">A focused response.</h2>
          </div>
          <p className="text-reading">{cs.approach}</p>
        </div>
      </section>
      {/* 03 / The results: What changed */}
      <section className="site-section section-divider">
        <div className="site-container">
          <span className="text-eyebrow mb-5">03 / The results</span>
          <h2 className="heading-section mb-10">What changed.</h2>
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4 md:gap-8">
            {cs.results.map((r) => (
              <div className="text-left" key={r.metric}>
                <strong className="block text-[clamp(28px,3vw,42px)] font-semibold leading-[1.15] tabular-nums [overflow-wrap:anywhere]">
                  {r.value}
                </strong>
                <span className="mt-3 block text-[14px] text-smoke">
                  {r.metric}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Client testimonial, shown only when a verified quote is available */}
      {cs.testimonial && (
        <section className="site-section section-divider">
          <div className="site-container reading-container border-l-[3px] border-terracotta pl-8">
            <blockquote className="mb-6 font-display text-[clamp(26px,3vw,36px)] leading-[1.35]">
              “{cs.testimonial.quote}”
            </blockquote>
            <p>{cs.testimonial.author}</p>
            <p className="text-meta">{cs.testimonial.role}</p>
          </div>
        </section>
      )}
      {/* 04 / Behind the work: How it came together */}
      <section className="site-section section-divider">
        <div className="site-container">
          <div className="reading-container">
            <span className="text-eyebrow mb-5">04 / Behind the work</span>
            <h2 className="heading-section mb-10">How it came together.</h2>
          </div>
          <div>
            {cs.content.map((s, i) => (
              /* Story section: Title and body from cs.content */
              <section
                className="border-t border-border py-12 first:border-t-0 first:pt-4"
                key={s.section}
              >
                <div className="reading-container">
                  <h2
                    className="mb-5 scroll-mt-28 font-display text-[32px] font-medium leading-[1.2] text-foreground"
                    id={`story-${i + 1}`}
                  >
                    {s.section}
                  </h2>
                  <p className="text-reading">{s.body}</p>
                </div>
                {s.image && (
                  <div className="reading-container mt-8 md:mt-10">
                    <Media
                      image={s.image}
                      aspectRatio="wide"
                      className="border border-foreground"
                      sizes="(max-width: 767px) 100vw, 68ch"
                    />
                  </div>
                )}
              </section>
            ))}
          </div>
          <div className="reading-container">
            <Link href={`/work/${next.slug}`} className="action-link mt-10">
              Next project: {next.client} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      {/* Call to action: Have a challenge in mind? */}
      <CTA />
    </>
  );
}
