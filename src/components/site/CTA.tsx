import Link from "next/link";
import { ArrowRight } from "lucide-react";
export function CTA({
  title = "Have a challenge in mind?",
  copy = "Let’s turn a thoughtful strategy into something that moves your business forward.",
}: {
  title?: string;
  copy?: string;
}) {
  return (
    <section className="site-section pt-0">
      <div className="site-container flex flex-col items-start justify-between gap-7 rounded-[24px] bg-primary px-6 py-8 text-card md:p-12 lg:flex-row lg:items-center lg:gap-12 lg:p-16">
        <div>
          <h2 className="heading-section">{title}</h2>
          <p className="mt-5 max-w-[55ch] text-card">{copy}</p>
        </div>
        <Link
          href="/contact"
          className="button button-inverse shrink-0 w-[100%] md:w-auto"
        >
          Start a conversation <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
