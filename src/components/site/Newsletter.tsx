"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const onSubmitted = () => {
      setSent(true);
    };
    form.addEventListener("rgm:submitted", onSubmitted);
    return () => form.removeEventListener("rgm:submitted", onSubmitted);
  }, []);

  return (
    <div>
      <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-smoke">
        Stay informed
      </h2>
      {sent ? (
        <div className="rounded-xl border border-primary/20 bg-blue-soft p-4">
          <p role="status" className="text-sm font-semibold text-foreground">
            Thank you for subscribing.
          </p>
          <p className="mt-1 text-xs text-graphite">
            You will receive our latest digital growth and automation insights.
          </p>
        </div>
      ) : (
        <form
          ref={formRef}
          id="newsletter-form"
          name="newsletter_form"
          aria-label="Newsletter Subscription"
          data-rgm-form="Newsletter Subscription"
          className="space-y-3"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="newsletter-email"
              className="text-sm font-semibold text-foreground"
            >
              Email address
            </label>
            <input
              className="min-h-11 w-full min-w-0 rounded-xl border border-input bg-white px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-blue-100 transition-colors"
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={254}
              placeholder="you@company.com"
            />
          </div>
          <label className="flex gap-2.5 items-start text-xs text-graphite mt-3 cursor-pointer">
            <input
              type="checkbox"
              name="consent"
              id="newsletter-consent"
              required
              className="mt-0.5 size-4 accent-primary"
            />
            <span>I’d like occasional insights from Altus Media Labs.</span>
          </label>
          <p className="text-xs text-smoke mt-2">
            <Link href="/privacy-policy" className="underline hover:text-primary">
              Privacy policy
            </Link>
          </p>
          <button
            className="button button-primary text-sm !min-h-[40px] !py-2 !px-4 mt-3 w-full sm:w-auto"
            type="submit"
          >
            Subscribe
          </button>
          <div
            data-rgm-result
            role="status"
            className="text-xs font-semibold text-primary mt-2 empty:hidden"
          />
        </form>
      )}
    </div>
  );
}
