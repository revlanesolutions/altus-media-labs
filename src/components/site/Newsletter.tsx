"use client";
import { useState } from "react";
import Link from "next/link";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <div>
      <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-smoke">
        Stay informed
      </h2>
      {sent ? (
        <p role="status" className="text-sm text-graphite">
          Your subscription request has been received. Check your inbox for the
          next step.
        </p>
      ) : (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            setStatus("");
            try {
              const r = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, consent: true }),
              });
              const body = await r.json();
              if (!r.ok) throw new Error(body.error);
              setSent(true);
            } catch (error) {
              setStatus(
                error instanceof Error
                  ? error.message
                  : "Could not subscribe. Please try again.",
              );
            } finally {
              setBusy(false);
            }
          }}
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
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={254}
            />
          </div>
          <label className="flex gap-2.5 items-start text-xs text-graphite mt-3">
            <input type="checkbox" required className="mt-0.5 accent-primary" />
            I’d like occasional insights from Altus Media Labs.
          </label>
          <p className="text-xs text-smoke mt-2">
            <Link href="/privacy-policy" className="underline hover:text-primary">
              Privacy policy
            </Link>
          </p>
          <button className="button button-primary text-sm !min-h-[40px] !py-2 !px-4 mt-4" disabled={busy}>
            {busy ? "Subscribing…" : "Subscribe"}
          </button>
          {status && (
            <p role="alert" className="text-xs font-semibold text-red-600 mt-3">
              {status}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
