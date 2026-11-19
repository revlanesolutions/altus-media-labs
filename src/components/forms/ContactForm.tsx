"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { ServiceOption } from "@/data/content-types";

const inputClasses =
  "min-h-12 w-full min-w-0 rounded-xl border border-input bg-white px-4 py-3 text-base text-foreground focus:border-primary focus:ring-2 focus:ring-blue-100 transition-colors aria-invalid:border-red-500";

export function ContactForm({
  initialService = "",
  services,
}: {
  deliveryEnabled?: boolean;
  initialService?: string;
  services: ServiceOption[];
}) {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    description: "",
  });
  const [selected, setSelected] = useState<string[]>(
    services.some((s) => s.slug === initialService) ? [initialService] : [],
  );
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const handleSubmitted = () => {
      setStatus("sent");
    };
    form.addEventListener("rgm:submitted", handleSubmitted);
    return () => form.removeEventListener("rgm:submitted", handleSubmitted);
  }, []);

  useEffect(() => {
    if (status === "sent") {
      statusRef.current?.focus();
    }
  }, [status]);

  function update(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setFields({ ...fields, [e.target.name]: e.target.value });
  }

  return (
    <>
      {status === "sent" ? (
        <div
          className="rounded-2xl border border-primary/20 bg-blue-soft p-6 md:p-8"
          ref={statusRef}
          tabIndex={-1}
          role="status"
        >
          <CheckCircle2 className="text-primary mb-4 size-8" />
          <h2 className="heading-section">Enquiry received.</h2>
          <p className="mt-4 text-graphite text-base">
            Thank you for telling us about your project. We’ll review your
            details and reply to {fields.email}.
          </p>
          <button
            className="action-link mt-6"
            onClick={() => {
              setStatus("idle");
              setFields({
                name: "",
                email: "",
                company: "",
                budget: "",
                description: "",
              });
              setSelected([]);
            }}
          >
            Start another enquiry <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <form
          ref={formRef}
          id="contact-form"
          name="contact_form"
          aria-label="Contact Form"
          data-rgm-form="Contact Form"
          className="space-y-8"
        >
          <p className="text-meta">Fields marked * are required.</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-semibold text-foreground">
                Full name *
              </label>
              <input
                className={inputClasses}
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                maxLength={120}
                value={fields.name}
                onChange={update}
                placeholder="Jane Smith"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-foreground">
                Email address *
              </label>
              <input
                className={inputClasses}
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                maxLength={254}
                value={fields.email}
                onChange={update}
                placeholder="jane@company.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="company" className="text-sm font-semibold text-foreground">
                Company
              </label>
              <input
                className={inputClasses}
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                maxLength={120}
                value={fields.company}
                onChange={update}
                placeholder="Company, LLC"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="budget" className="text-sm font-semibold text-foreground">
                Budget range <span className="text-meta font-normal">(optional)</span>
              </label>
              <select
                className={inputClasses}
                id="budget"
                name="budget"
                value={fields.budget}
                onChange={update}
              >
                <option value="">Let’s discuss</option>
                {[
                  "Under $10K",
                  "$10K–$25K",
                  "$25K–$50K",
                  "$50K–$100K",
                  "$100K+",
                ].map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <fieldset>
            <legend className="text-sm font-semibold text-foreground mb-4">
              Services you’re interested in{" "}
              <span className="text-meta font-normal">(optional)</span>
            </legend>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {services.map((s) => (
                <label
                  className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-input px-4 py-3 text-sm font-medium has-checked:border-primary has-checked:bg-blue-soft transition-colors"
                  key={s.slug}
                >
                  <input
                    className="size-4 shrink-0 accent-primary"
                    type="checkbox"
                    name="services"
                    value={s.shortTitle}
                    checked={selected.includes(s.slug)}
                    onChange={(e) =>
                      setSelected(
                        e.target.checked
                          ? [...selected, s.slug]
                          : selected.filter((x) => x !== s.slug),
                      )
                    }
                  />
                  <span>{s.shortTitle}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-semibold text-foreground">
              Tell us about your project *
            </label>
            <textarea
              className={`${inputClasses} min-h-[180px] resize-y`}
              id="description"
              name="description"
              minLength={20}
              maxLength={5000}
              rows={6}
              value={fields.description}
              onChange={update}
              required
              placeholder="What would you like to achieve? Is there a timeline or specific outcome we should know about?"
            />
            <p className="text-meta" id="description-help">
              A short outline is enough to start. 20–5,000 characters.
            </p>
          </div>

          <p className="text-meta">
            We’ll use these details to respond to your enquiry.{" "}
            <Link className="text-primary underline" href="/privacy-policy">
              Read our privacy policy.
            </Link>
          </p>

          <div
            data-rgm-result
            role="status"
            className="text-sm font-semibold text-primary empty:hidden"
          />

          <button
            className="button button-primary"
            type="submit"
          >
            Send enquiry <ArrowRight size={18} />
          </button>
        </form>
      )}
    </>
  );
}
