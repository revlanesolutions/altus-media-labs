"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";

const startingPoints = [
  {
    id: "operations",
    challenge: "Too much work is still manual.",
    title: "Start with one workflow.",
    description:
      "Choose a recurring task that slows your team down. Map how information moves, where it gets copied, and where someone has to step in before deciding what to automate.",
    questions: [
      "Which steps repeat most often?",
      "Which decisions need a person’s judgment?",
      "How much time could a better process save?",
    ],
    href: "/services/ai-business-automation",
    link: "Explore automation",
  },
  {
    id: "website",
    challenge: "Our website isn’t turning interest into action.",
    title: "Find where people lose their way.",
    description:
      "Walk through the journey from a visitor’s first impression to an enquiry or purchase. Understanding where it becomes unclear helps you decide what actually needs to change.",
    questions: [
      "Is the offer clear to a first-time visitor?",
      "Is the next step easy to find and complete?",
      "What do the enquiry or purchase data reveal?",
    ],
    href: "/services/web-development",
    link: "Explore web development",
  },
  {
    id: "brand",
    challenge: "We’ve outgrown the way we present ourselves.",
    title: "Clarify the story before the look.",
    description:
      "A new direction starts with who you serve and why they should choose you. Get that story clear, then use it to guide your identity, website, and communications.",
    questions: [
      "Who are you trying to reach next?",
      "What makes your offer worth choosing?",
      "Where does your current message fall short?",
    ],
    href: "/services/branding-design",
    link: "Explore brand strategy",
  },
];

export function StartingPoint() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function navigateChoices(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let next: number;
    switch (event.key) {
      case "ArrowDown":
        next = (index + 1) % startingPoints.length;
        break;
      case "ArrowUp":
        next = (index - 1 + startingPoints.length) % startingPoints.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = startingPoints.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return (
    <section
      id="starting-point"
      aria-labelledby="starting-point-title"
      className="site-section section-divider"
    >
      <div className="site-container">
        <div className="mb-8 max-w-[680px] md:mb-10">
          <span className="text-eyebrow mb-5">Find your starting point</span>
          <h2 id="starting-point-title" className="heading-section">
            What’s getting in the way?
          </h2>
          <p className="text-body mt-5">
            You don’t need to know which service you need. Choose what sounds
            familiar to see a useful place to begin.
          </p>
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-12">
          <div
            role="tablist"
            aria-label="Choose your business challenge"
            aria-orientation="vertical"
            className="grid min-w-0 gap-2.5"
          >
            {startingPoints.map((point, index) => (
              <button
                key={point.id}
                ref={(element) => {
                  tabs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={`starting-point-${point.id}-tab`}
                aria-controls={`starting-point-${point.id}-panel`}
                aria-selected={selected === index}
                tabIndex={selected === index ? 0 : -1}
                onClick={() => setSelected(index)}
                onKeyDown={(event) => navigateChoices(event, index)}
                className={`flex min-h-16 w-full items-center gap-4 rounded-xl px-5 py-4 text-left transition-all ${
                  selected === index
                    ? "bg-primary text-white shadow-md shadow-blue-500/20"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`text-xs font-bold tabular-nums ${
                    selected === index ? "text-blue-100" : "text-smoke"
                  }`}
                >
                  0{index + 1}
                </span>
                <span className="min-w-0 flex-1 text-base md:text-lg font-semibold leading-snug">
                  {point.challenge}
                </span>
                <ArrowDown
                  aria-hidden="true"
                  size={18}
                  className={`shrink-0 lg:-rotate-90 transition-transform ${
                    selected === index ? "text-white" : "text-smoke"
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="min-w-0 rounded-2xl border border-border bg-white p-6 md:p-8 lg:p-10 shadow-sm">
            {startingPoints.map((point, index) => (
              <div
                key={point.id}
                role="tabpanel"
                id={`starting-point-${point.id}-panel`}
                aria-labelledby={`starting-point-${point.id}-tab`}
                hidden={selected !== index}
                tabIndex={0}
              >
                <span className="text-eyebrow mb-3">A useful first step</span>
                <h3 className="heading-card text-2xl md:text-3xl font-bold mt-2">
                  {point.title}
                </h3>
                <p className="text-body mt-4 text-base">
                  {point.description}
                </p>
                <p className="mt-6 text-xs font-bold uppercase tracking-wider text-smoke">
                  Questions worth asking
                </p>
                <ul className="mt-3 space-y-3">
                  {point.questions.map((question) => (
                    <li
                      key={question}
                      className="flex items-start gap-3 text-sm md:text-base text-graphite"
                    >
                      <Check
                        aria-hidden="true"
                        size={17}
                        className="mt-0.5 shrink-0 text-primary"
                      />
                      <span>{question}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={point.href}
                  className="action-link mt-6 text-primary"
                >
                  {point.link}{" "}
                  <ArrowRight
                    aria-hidden="true"
                    size={18}
                    className="shrink-0"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
