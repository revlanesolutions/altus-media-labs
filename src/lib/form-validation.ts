export type ContactFields = {
  name: string;
  email: string;
  company: string;
  budget: string;
  description: string;
};
export type ContactPayload = ContactFields & {
  services: string[];
  website: string;
};
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function validEmail(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.trim().length <= 254 &&
    emailPattern.test(value.trim())
  );
}
export function contactFieldErrors(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  if (!fields.name.trim()) errors.name = "Please enter your name.";
  else if (fields.name.trim().length > 120)
    errors.name = "Please enter a name of up to 120 characters.";
  if (!validEmail(fields.email))
    errors.email = "Please enter a valid email address.";
  if (fields.description.trim().length < 20)
    errors.description = "Tell us a little more — at least 20 characters.";
  else if (fields.description.trim().length > 5000)
    errors.description =
      "Your project description must be 20–5,000 characters.";
  if (fields.company.trim().length > 120)
    errors.company = "Please shorten your company name.";
  if (fields.budget.trim().length > 80)
    errors.budget = "Please shorten your budget details.";
  return errors;
}
export function validateContact(
  value: unknown,
): { data: ContactPayload } | { error: string } {
  if (!value || typeof value !== "object" || Array.isArray(value))
    return { error: "Please provide your enquiry details." };
  const v = value as Record<string, unknown>;
  for (const key of ["name", "email", "description"])
    if (typeof v[key] !== "string")
      return { error: "Please complete all required fields." };
  for (const key of ["company", "budget", "website"])
    if (v[key] !== undefined && typeof v[key] !== "string")
      return { error: "Please check your form details." };
  if (
    v.services !== undefined &&
    (!Array.isArray(v.services) ||
      v.services.length > 6 ||
      v.services.some((s) => typeof s !== "string" || s.length > 80))
  )
    return { error: "Please check your service selection." };
  const data: ContactPayload = {
    name: (v.name as string).trim(),
    email: (v.email as string).trim(),
    description: (v.description as string).trim(),
    company: ((v.company as string) || "").trim(),
    budget: ((v.budget as string) || "").trim(),
    services: (v.services as string[]) || [],
    website: ((v.website as string) || "").trim(),
  };
  const errors = contactFieldErrors(data);
  const error = Object.values(errors)[0];
  return error ? { error } : { data };
}
