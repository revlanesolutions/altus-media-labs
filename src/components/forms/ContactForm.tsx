"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { contactEmail } from "@/lib/site-config";
import type { ServiceOption } from "@/data/content-types";
import {
  contactFieldErrors,
  type ContactFields as Fields,
} from "@/lib/form-validation";
const inputClasses =
  "min-h-12 w-full min-w-0 rounded-[12px] border border-input bg-card px-3.5 py-3 text-[16px] focus:border-primary aria-invalid:border-terracotta aria-invalid:focus:border-primary";

export function ContactForm({
  deliveryEnabled = false,
  initialService = "",
  services,
}: {
  deliveryEnabled?: boolean;
  initialService?: string;
  services: ServiceOption[];
}) {
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    company: "",
    budget: "",
    description: "",
  });
  const [selected, setSelected] = useState<string[]>(
    services.some((s) => s.slug === initialService) ? [initialService] : [],
  );
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "draft" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>(
    {},
  );
  const statusRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (status === "sent" || status === "error" || status === "draft")
      statusRef.current?.focus();
  }, [status]);
  function update(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setFields({ ...fields, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  }
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = contactFieldErrors(fields);
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(Object.keys(next)[0])?.focus();
      return;
    }
    const chosen = services
      .filter((s) => selected.includes(s.slug))
      .map((s) => s.title);
    if (!deliveryEnabled) {
      const body = `Name: ${fields.name}\nEmail: ${fields.email}\nCompany: ${fields.company || "Not provided"}\nBudget: ${fields.budget || "Not specified"}\nServices: ${chosen.join(", ") || "Let’s discuss"}\n\n${fields.description}`;
      window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent("Project enquiry — " + fields.name)}&body=${encodeURIComponent(body)}`;
      setStatus("draft");
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          services: selected,
          website: new FormData(e.currentTarget).get("website") || "",
        }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error || "Your enquiry could not be sent. Please try again.",
        );
      setStatus("sent");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Your enquiry could not be sent. Please try again.",
      );
      setStatus("error");
    }
  }
  const field = (
    id: keyof Fields,
    label: string,
    required = false,
    type = "text",
  ) => (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[16px] font-semibold">
        {label}
        {required ? " *" : ""}
      </label>
      <input
        className={inputClasses}
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={
          id === "name" ? "name" : id === "email" ? "email" : "organization"
        }
        maxLength={id === "email" ? 254 : 120}
        value={fields[id]}
        onChange={update}
        aria-invalid={Boolean(errors[id])}
        aria-describedby={errors[id] ? `${id}-error` : undefined}
      />
      {errors[id] && (
        <p id={`${id}-error`} className="text-[14px] text-terracotta">
          {errors[id]}
        </p>
      )}
    </div>
  );
  return (
    <>
      {status === "sent" ? (
        <div
          className="rounded-[12px] border border-primary bg-blue-soft p-5"
          ref={statusRef}
          tabIndex={-1}
          role="status"
        >
          <CheckCircle2 className="text-primary mb-4" />
          <h2 className="heading-section">Enquiry received.</h2>
          <p className="mt-4">
            Thank you for telling us about your project. We’ll review your
            details and reply to {fields.email}.
          </p>
          <button
            className="action-link mt-4"
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
        <form noValidate onSubmit={submit} className="space-y-8">
          <p className="text-meta">Fields marked * are required.</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {field("name", "Full name", true)}
            {field("email", "Email address", true, "email")}
            {field("company", "Company")}
            <div className="flex flex-col gap-2">
              <label htmlFor="budget" className="text-[16px] font-semibold">
                Budget range <span className="text-meta">(optional)</span>
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
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>
          <fieldset>
            <legend className="text-[16px] font-semibold mb-4">
              Services you’re interested in{" "}
              <span className="text-meta">(optional)</span>
            </legend>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {services.map((s) => (
                <label
                  className="flex min-h-12 cursor-pointer items-center gap-3 rounded-[12px] border border-input px-4 py-3 text-[16px] has-checked:border-primary has-checked:bg-blue-soft"
                  key={s.slug}
                >
                  <input
                    className="size-[18px] shrink-0 accent-primary"
                    type="checkbox"
                    name="services"
                    value={s.slug}
                    checked={selected.includes(s.slug)}
                    onChange={(e) =>
                      setSelected(
                        e.target.checked
                          ? [...selected, s.slug]
                          : selected.filter((x) => x !== s.slug),
                      )
                    }
                  />
                  {s.shortTitle}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-[16px] font-semibold">
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
              placeholder="What would you like to achieve? Is there a timeline we should know about?"
              aria-invalid={Boolean(errors.description)}
              aria-describedby={
                errors.description ? "description-error" : "description-help"
              }
            />
            {errors.description ? (
              <p className="text-[14px] text-terracotta" id="description-error">
                {errors.description}
              </p>
            ) : (
              <p className="text-meta" id="description-help">
                A short outline is enough to start. 20–5,000 characters.
              </p>
            )}
          </div>
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Leave this field blank</label>
            <input
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <p className="text-meta">
            We’ll use these details to respond to your enquiry.{" "}
            <Link className="text-primary underline" href="/privacy-policy">
              Read our privacy policy.
            </Link>
          </p>
          {!deliveryEnabled && (
            <p className="text-meta">
              This opens your email app with a prepared draft. Your enquiry is
              sent only when you send that email.
            </p>
          )}
          {status === "error" && (
            <div
              className="rounded-[12px] border border-terracotta bg-clay-soft p-5"
              ref={statusRef}
              tabIndex={-1}
              role="alert"
            >
              <AlertCircle size={20} />
              <p>{message}</p>
              <a href={`mailto:${contactEmail}`} className="action-link">
                Email us directly
              </a>
            </div>
          )}
          {status === "draft" && (
            <div
              className="rounded-[12px] border border-primary bg-blue-soft p-5"
              ref={statusRef}
              tabIndex={-1}
              role="status"
            >
              <p>
                Your draft is ready in your email app. Nothing has been
                submitted through this website.
              </p>
              <p>
                If your email app did not open, email{" "}
                <a className="underline" href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>
                . Your details remain in the form.
              </p>
            </div>
          )}
          <button
            className="button button-primary"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending"
              ? "Sending…"
              : deliveryEnabled
                ? "Send enquiry"
                : "Open email draft"}
            <ArrowRight size={18} />
          </button>
        </form>
      )}
    </>
  );
}
