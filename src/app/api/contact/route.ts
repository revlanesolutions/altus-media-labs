import { NextResponse } from "next/server";
import { validateContact } from "@/lib/form-validation";
import { checkOrigin, readForm, deliver } from "@/lib/server/form-delivery";
import { services } from "@/data/services";
export async function POST(request: Request) {
  if (!checkOrigin(request))
    return NextResponse.json(
      { error: "Please submit the form from this website." },
      { status: 403 },
    );
  let body: unknown;
  try {
    body = await readForm(request);
  } catch {
    return NextResponse.json(
      { error: "Please check your form details." },
      { status: 400 },
    );
  }
  const result = validateContact(body);
  if ("error" in result) return NextResponse.json(result, { status: 400 });
  if (result.data.website)
    return NextResponse.json(
      {
        error: "Your request could not be accepted. Please email us directly.",
      },
      { status: 400 },
    );
  if (
    result.data.services.some((slug) => !services.some((s) => s.slug === slug))
  )
    return NextResponse.json(
      { error: "Please check your service selection." },
      { status: 400 },
    );
  return deliver(process.env.CONTACT_WEBHOOK_URL, {
    type: "project-enquiry",
    ...result.data,
    submittedAt: new Date().toISOString(),
  });
}
