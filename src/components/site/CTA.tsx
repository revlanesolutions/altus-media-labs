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
      <div className="site-container flex flex-col items-start justify-between gap-7 rounded-3xl bg-primary px-6 py-8 text-white shadow-xl shadow-blue-500/10 md:p-12 lg:flex-row lg:items-center lg:gap-12 lg:p-16">
        <div>
          <h2 className="heading-section text-white">{title}</h2>
          <p className="mt-4 max-w-[55ch] text-blue-100 text-base md:text-lg leading-relaxed">
            {copy}
          </p>
        </div>
        <Link
          href="/contact"
          className="button button-inverse shrink-0 w-full md:w-auto font-semibold"
        >
          Start a conversation <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
