import Link from "next/link";
import { services } from "@/data/services";
import { Brand } from "@/components/site/Brand";
import { ArrowUpRight } from "lucide-react";
import { Newsletter } from "@/components/site/Newsletter";
import { contactEmail } from "@/lib/site-config";
export function Footer() {
  return (
    <footer className="border-t border-border pt-16">
      <div className="site-container">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 pb-14 md:gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div className="max-md:col-span-full">
            <Brand />
            <p className="text-body mt-6 text-base">
              Brand, web, marketing, and automation—connected around your
              business goals.
            </p>
          </div>
          <div>
            <h2 className="mb-5 text-[14px] font-semibold">Our expertise</h2>
            {services.map((s) => (
              <Link
                className="flex min-h-11 items-center text-[16px] text-graphite no-underline hover:text-primary hover:underline"
                href={`/services/${s.slug}`}
                key={s.slug}
              >
                {s.shortTitle}
              </Link>
            ))}
          </div>
          <div>
            <h2 className="mb-5 text-[14px] font-semibold">Explore</h2>
            {["Work", "About", "Blog", "Contact"].map((p) => (
              <Link
                key={p}
                className="flex min-h-11 items-center text-[16px] text-graphite no-underline hover:text-primary hover:underline"
                href={`/${p.toLowerCase()}`}
              >
                {p}
              </Link>
            ))}
          </div>
          <div>
            {process.env.NEWSLETTER_WEBHOOK_URL ? (
              <Newsletter />
            ) : (
              <>
                <h2 className="mb-5 text-[14px] font-semibold">
                  Have something in mind?
                </h2>
                <p className="text-body text-base">
                  Tell us what you’re working toward. We’ll explore the next
                  step together.
                </p>
                <Link className="action-link mt-4" href="/contact">
                  Start a conversation <ArrowUpRight size={18} />
                </Link>
                <div className="mt-6 border-t border-border pt-4">
                  <span className="text-meta block">Direct inquiry</span>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="action-link text-primary mt-1 text-sm break-all"
                  >
                    {contactEmail}
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border py-6 text-[14px] text-smoke">
          <span>© {new Date().getFullYear()} Altus Media Labs</span>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy-policy">Privacy policy</Link>
            <Link href="/terms-of-service">Terms of service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
