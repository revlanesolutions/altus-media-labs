import { type Metadata } from "next";
import { ArrowRight, Mail } from "lucide-react";
import { contactFaqs } from "@/data/contact-faqs";
import { contactEmail, bookingUrl } from "@/lib/site-config";
import { PageHero } from "@/components/site/PageHero";
import { FAQ } from "@/components/site/FAQ";
import { ContactForm } from "@/components/forms/ContactForm";
import { getServiceOptions } from "@/lib/server/content";

export const metadata: Metadata = { title: "Start a project" };

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const { service } = await searchParams;
  const deliveryEnabled = Boolean(process.env.CONTACT_WEBHOOK_URL);
  const initialService = typeof service === "string" ? service : "";

  return (
    <>
      {/* Hero: Start a conversation */}
      <PageHero
        eyebrow="Start a conversation"
        title="What’s your next move?"
        description="Tell us about your business, your goals, and the challenge you want to solve. We’ll work out the next step together."
      />
      {/* Project enquiry: Contact form and next steps */}
      <section className="site-section section-divider">
        <div className="site-container grid gap-8 md:grid-cols-[minmax(0,1fr)_290px] md:gap-10 wide:grid-cols-[minmax(0,1fr)_340px] wide:gap-[72px]">
          <div>
            <ContactForm
              deliveryEnabled={deliveryEnabled}
              initialService={initialService}
              services={getServiceOptions()}
            />
          </div>
          <aside className="self-start border-t-2 border-primary pt-7 md:sticky md:top-[120px]">
            <span className="text-eyebrow mb-5">A good place to begin</span>
            <h2 className="heading-card">
              Let’s understand
              <br />
              the opportunity.
            </h2>
            <p className="text-body mt-5 text-base">
              You don’t need a finished brief. A little context about your goals
              will help us have a useful first conversation.
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="action-link mt-6 break-all"
            >
              <Mail size={18} className="shrink-0" />
              {contactEmail}
            </a>
            {bookingUrl && (
              <a href={bookingUrl} className="button button-secondary mt-6">
                Book an introductory call <ArrowRight size={16} />
              </a>
            )}
            <div className="border-t border-border pt-6 mt-8">
              <h3 className="font-semibold">What happens next?</h3>
              <ol className="list-decimal pl-5 mt-4 space-y-3 text-base text-graphite">
                <li>We review your goals and the project context.</li>
                <li>We arrange a conversation to understand the fit.</li>
                <li>We outline a scope and the next steps together.</li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
      {/* Good questions: Before you reach out */}
      <section className="site-section section-divider">
        <div className="site-container grid gap-8 md:grid-cols-2 md:gap-10 wide:gap-[72px]">
          <div>
            <span className="text-eyebrow mb-5">Good questions</span>
            <h2 className="heading-section">Before you reach out.</h2>
          </div>
          <FAQ items={contactFaqs} />
        </div>
      </section>
    </>
  );
}
