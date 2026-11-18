import { NextResponse } from "next/server";
import { validEmail } from "@/lib/form-validation";
import { checkOrigin, readForm, deliver } from "@/lib/server/form-delivery";
export async function POST(request: Request) {
  if (!checkOrigin(request))
    return NextResponse.json(
      { error: "Please subscribe from this website." },
      { status: 403 },
    );
  let body: unknown;
  try {
    body = await readForm(request);
  } catch {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (
    !body ||
    typeof body !== "object" ||
    !("email" in body) ||
    !validEmail(body.email) ||
    !("consent" in body) ||
    body.consent !== true
  )
    return NextResponse.json(
      { error: "Enter a valid email and confirm that you want to subscribe." },
      { status: 400 },
    );
  return deliver(process.env.NEWSLETTER_WEBHOOK_URL, {
    type: "newsletter-subscription",
    email: body.email.trim(),
    consent: true,
    submittedAt: new Date().toISOString(),
  });
}
