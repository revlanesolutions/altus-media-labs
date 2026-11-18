import Link from "next/link";
import { services } from "@/data/services";
import { Brand } from "@/components/site/Brand";
import { Mail, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import { Newsletter } from "@/components/site/Newsletter";
import { contactEmail } from "@/lib/site-config";

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

          {/* Column 4: Direct Inquiries & Newsletter (3 cols on lg) */}
          <div className="lg:col-span-3">
            {process.env.NEWSLETTER_WEBHOOK_URL ? (
              <Newsletter />
            ) : (
              <div className="rounded-2xl border border-border/80 bg-muted/60 p-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                  <Sparkles size={14} />
                  <span>Start a Conversation</span>
                </div>
                <h4 className="mt-2 text-base font-semibold text-foreground">
                  Have a challenge in mind?
                </h4>
                <p className="mt-1.5 text-sm text-graphite leading-relaxed">
                  Tell us what you're working toward. We'll outline a concrete next step together.
                </p>
                <div className="mt-4 border-t border-border/70 pt-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-smoke block">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline break-all"
                  >
                    <Mail size={14} className="shrink-0" />
                    {contactEmail}
                  </a>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-smoke">
                  <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                  <span>Response within 24 business hours</span>
                </div>
              </div>
            )}
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
