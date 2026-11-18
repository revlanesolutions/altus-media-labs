import "server-only";
import { NextResponse } from "next/server";
export function checkOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}
export async function readForm(request: Request) {
  if (Number(request.headers.get("content-length") || 0) > 24000)
    throw new Error("Too large");
  const body = await request.text();
  if (body.length > 24000) throw new Error("Too large");
  return JSON.parse(body) as unknown;
}
export async function deliver(url: string | undefined, data: unknown) {
  if (!url)
    return NextResponse.json(
      {
        error:
          "Online submission is not available yet. Please email us directly.",
      },
      { status: 503 },
    );
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") throw new Error("Invalid endpoint");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.FORM_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.FORM_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(8000),
      redirect: "error",
    });
    if (!response.ok) throw new Error("Delivery rejected");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        error:
          "We could not deliver your request. Your details have been kept so you can try again or email us.",
      },
      { status: 502 },
    );
  }
}
