import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function HeroActions() {
  return (
    <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
      <Link href="/contact" className="button button-primary">
        Discuss your project <ArrowRight size={18} aria-hidden="true" />
      </Link>
      <Link href="/work" className="action-link">
        Explore our work <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
    </div>
  );
}
