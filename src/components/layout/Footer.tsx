import Link from "next/link";
import { services } from "@/data/services";
import { Brand } from "@/components/site/Brand";
import { MapPin } from "lucide-react";
import { Newsletter } from "@/components/site/Newsletter";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white pt-16 md:pt-20">
      <div className="site-container">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-12 pb-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Column 1: Brand & Agency Identity (4 cols on lg) */}
          <div className="flex flex-col items-start lg:col-span-4">
            <Brand />
            <p className="mt-5 text-base text-graphite leading-relaxed max-w-[36ch]">
              Altus Media Labs is a digital growth and automation agency.
              We connect brand strategy, software engineering, and performance
              marketing around measurable revenue outcomes.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-graphite">
                <MapPin size={13} className="text-primary" />
                Serving clients across the United States
              </span>
            </div>
          </div>

          {/* Column 2: Our Disciplines (3 cols on lg) */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-smoke">
              Our Disciplines
            </h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-flex text-sm font-medium text-graphite transition-colors hover:text-primary hover:underline underline-offset-4"
                  >
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company & Exploration (2 cols on lg) */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-smoke">
              Company
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Selected Work", href: "/work" },
                { label: "About Altus", href: "/about" },
                { label: "The Journal", href: "/blog" },
                { label: "Start a Project", href: "/contact" },
              ].map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="inline-flex text-sm font-medium text-graphite transition-colors hover:text-primary hover:underline underline-offset-4"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription (3 cols on lg) */}
          <div className="lg:col-span-3">
            <Newsletter />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-4 border-t border-border/80 py-8 text-xs text-smoke sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} Altus Media Labs, LLC.</span>
            <span className="inline-flex items-center gap-1.5 text-xs text-graphite">
              <span className="size-2 rounded-full bg-emerald-500"></span>
              All systems active
            </span>
          </div>

          <div className="flex flex-wrap gap-6 text-xs text-smoke">
            <Link
              href="/privacy-policy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
