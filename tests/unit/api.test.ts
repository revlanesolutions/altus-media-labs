import assert from "node:assert/strict";
import { test } from "node:test";
import { POST as contact } from "../../src/app/api/contact/route";
import { POST as newsletter } from "../../src/app/api/newsletter/route";

function request(body: unknown, origin = "https://altus.example") {
  return new Request("https://altus.example/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", origin },
    body: JSON.stringify(body),
  });
}
const valid = {
  name: "Alex",
  email: "alex@example.com",
  description: "A website project with a clear scope.",
  services: ["web-development"],
};
test("API handlers reject invalid forms, unknown services, traps and missing consent", async () => {
  assert.equal((await contact(request({}))).status, 400);
  assert.equal(
    (await contact(request({ ...valid, services: ["unknown"] }))).status,
    400,
  );
  assert.equal(
    (await contact(request({ ...valid, website: "spam" }))).status,
    400,
  );
  assert.equal(
    (await contact(request(valid, "https://foreign.example"))).status,
    403,
  );
  assert.equal(
    (await newsletter(request({ email: "alex@example.com", consent: false })))
      .status,
    400,
  );
});
test("valid requests cannot claim success when delivery is unconfigured", async (t) => {
  const previous = process.env.CONTACT_WEBHOOK_URL;
  delete process.env.CONTACT_WEBHOOK_URL;
  t.mock.method(globalThis, "fetch", async () => {
    throw new Error("Unexpected external request");
  });
  try {
    assert.equal((await contact(request(valid))).status, 503);
  } finally {
    if (previous !== undefined) process.env.CONTACT_WEBHOOK_URL = previous;
  }
});
