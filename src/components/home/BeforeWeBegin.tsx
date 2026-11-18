import { FAQ } from "@/components/site/FAQ";

const questions = [
  {
    question: "Do we need a finished brief?",
    answer:
      "No. Tell us what you want to improve, what's getting in the way, and any deadline or budget you're working with. That gives us a useful starting point for the conversation.",
  },
  {
    question: "Can we start with just one thing?",
    answer:
      "Yes. A focused website, brand, or automation project can stand on its own. We can discuss related opportunities, but you don't need to take on every service to work with us.",
  },
  {
    question: "How are cost and timing agreed?",
    answer:
      "They depend on the scope, your existing setup, and what needs to be ready for launch. We use the initial conversation to clarify those details, then outline the work, milestones, and pricing in a proposal.",
  },
  {
    question: "Can we build on what we already have?",
    answer:
      "Bring your existing website, brand materials, tools, and team into the conversation. Understanding what already works helps us identify what to keep, what to improve, and where something new is needed.",
  },
];

export function BeforeWeBegin() {
  return (
    <section
      id="before-we-begin"
      aria-labelledby="before-we-begin-title"
      className="site-section bg-muted/50 border-t border-border"
    >
      <div className="site-container">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-14 lg:gap-20">
          <div>
            <span className="text-eyebrow mb-4">Before we begin</span>
            <h2 id="before-we-begin-title" className="heading-section">
              A little clarity
              <br />
              before we talk.
            </h2>
            <p className="text-body mt-5">
              A few practical answers to help you evaluate the next step and understand how we partner with our clients.
            </p>
          </div>
          <div>
            <FAQ items={questions} />
          </div>
        </div>
      </div>
    </section>
  );
}
