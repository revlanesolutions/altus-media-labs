const questions = [
  {
    question: "Do we need a finished brief?",
    answer:
      "No. Tell us what you want to improve, what’s getting in the way, and any deadline or budget you’re working with. That gives us a useful starting point for the conversation.",
  },
  {
    question: "Can we start with just one thing?",
    answer:
      "Yes. A focused website, brand, or automation project can stand on its own. We can discuss related opportunities, but you don’t need to take on every service to work with us.",
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
    // Before we begin: Practical answers before the closing contact invitation.
    <section
      id="before-we-begin"
      aria-labelledby="before-we-begin-title"
      className="site-section bg-muted pb-7 md:pb-16"
    >
      <div className="site-container">
        <div className="mx-auto mb-8 max-w-[640px] text-center md:mb-12">
          <span className="text-eyebrow mb-5">Before we begin</span>
          <h2 id="before-we-begin-title" className="heading-section">
            A little clarity before we talk.
          </h2>
          <p className="text-body mt-5">
            A few practical answers to help you take the next step.
          </p>
        </div>
        <dl className="grid gap-x-10 md:grid-cols-2 lg:gap-x-20">
          {questions.map((item) => (
            <div
              key={item.question}
              className="min-w-0 border-t border-border py-7 md:py-8"
            >
              <dt className="heading-card text-[25px] md:text-[28px]">
                {item.question}
              </dt>
              <dd className="text-body mt-3 text-[17px]">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
