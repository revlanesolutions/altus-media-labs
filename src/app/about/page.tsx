import { type Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { team } from "@/data/team";
import { editorial } from "@/data/imagery";
import { PageHero } from "@/components/site/PageHero";
import { CTA } from "@/components/site/CTA";
import { Media } from "@/components/site/Media";

export const metadata: Metadata = { title: "About us" };

export default function AboutPage() {
  return (
    <>
      {/* Hero: Meet Altus */}
      <PageHero
        eyebrow="Meet Altus"
        title="Good people. Connected thinking."
        description="We bring strategy, design, engineering, and marketing together around one shared purpose: moving your business forward."
        image={editorial.growth}
      />

      {/* Our perspective: The idea is only the beginning */}
      <section className="site-section section-divider">
        <div className="site-container grid gap-8 md:grid-cols-2 md:gap-10 wide:gap-[72px]">
          <div>
            <span className="text-eyebrow mb-5">Our perspective</span>
            <h2 className="heading-section">
              The idea is only
              <br />
              the beginning.
            </h2>
          </div>
          <div className="text-reading">
            <p className="mb-6">
              We exist to close the gap between ambitious strategy and
              thoughtful execution. The most useful work happens when people who
              understand the business work closely with the people building the
              solution.
            </p>
            <p className="mb-6">
              That is how we organize our work. Strategists, engineers,
              designers, and marketers bring their different perspectives to the
              same challenge. We stay involved from the first conversation
              through launch and beyond.
            </p>
            <p className="mb-6">
              Whether you need one discipline or an integrated team, we start
              with the same questions: what needs to change, who does it matter
              to, and how will we know it is working?
            </p>
          </div>
        </div>
      </section>

      {/* What guides us: Principles in practice */}
      <section className="site-section section-divider">
        <div className="site-container">
          <span className="text-eyebrow mb-5">What guides us</span>
          <h2 className="heading-section mb-10">Principles in practice.</h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
            {[
              {
                title: "Understand before acting",
                copy: "Every engagement starts with the problem. Discovery gives the work a clear direction.",
              },
              {
                title: "Measure what matters",
                copy: "We connect the work to business outcomes, with clear objectives and shared measures of progress.",
              },
              {
                title: "Keep the conversation open",
                copy: "You know what we are doing, why it matters, and what happens next.",
              },
              {
                title: "Care about the details",
                copy: "Good thinking deserves careful execution. We review, refine, and improve the work together.",
              },
            ].map((v, i) => (
              <div
                className="grid grid-cols-[36px_1fr] gap-5 border-t border-border py-6"
                key={v.title}
              >
                <span className="text-xs font-bold text-primary tracking-wider pt-1">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="heading-card">{v.title}</h3>
                  <p className="mt-2 text-base text-graphite leading-relaxed">
                    {v.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The people: Different disciplines. A shared commitment. */}
      <section className="site-section section-divider">
        <div className="site-container">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:mb-10 md:flex-row md:items-end md:gap-8">
            <div>
              <span className="text-eyebrow mb-5">The people</span>
              <h2 className="heading-section">
                Different disciplines.
                <br />A shared commitment.
              </h2>
            </div>
            <Link href="/contact" className="action-link">
              Work with us <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 xs:grid-cols-2 md:grid-cols-3 md:gap-8">
            {team.map((t) => (
              <article key={t.name} className="border-t border-border pt-6">
                {t.photo ? (
                  <Media
                    image={t.photo}
                    aspectRatio="portrait"
                    radiusClassName="rounded-2xl"
                    className="shadow-sm"
                  />
                ) : (
                  <span
                    className="mb-5 inline-flex size-14 items-center justify-center rounded-full bg-blue-soft font-semibold text-primary"
                    aria-hidden="true"
                  >
                    {t.initials}
                  </span>
                )}
                <h3 className="heading-card mt-4">{t.name}</h3>
                <p className="text-meta mt-1">{t.role}</p>
                <p className="text-body mt-3 text-sm">{t.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action: Meet the team */}
      <CTA title="Let’s work together." />
    </>
  );
}
