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
      <h2 className="mb-5 text-[14px] font-semibold">Stay informed</h2>
      {sent ? (
        <p role="status">
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
              className="text-[16px] font-semibold"
            >
              Email address
            </label>
            <input
              className="min-h-12 w-full min-w-0 rounded-[12px] border border-input bg-card px-3.5 py-3 text-[16px] focus:border-primary"
              id="newsletter-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={254}
            />
          </div>
          <label className="flex gap-3 items-start text-sm mt-4">
            <input type="checkbox" required className="mt-1 accent-primary" />
            I’d like occasional insights from Altus Media Labs.
          </label>
          <p className="text-meta mt-3">
            <Link href="/privacy-policy" className="underline">
              Privacy policy
            </Link>
          </p>
          <button className="button button-primary mt-4" disabled={busy}>
            {busy ? "Subscribing…" : "Subscribe"}
          </button>
          {status && (
            <p role="alert" className="text-[14px] text-terracotta mt-3">
              {status}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
