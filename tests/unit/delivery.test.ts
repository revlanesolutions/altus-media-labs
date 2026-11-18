import assert from "node:assert/strict";
import { test } from "node:test";
import {
  checkOrigin,
  readForm,
  deliver,
} from "../../src/lib/server/form-delivery";

test("same-origin checks reject a different origin", () => {
  assert.ok(
    checkOrigin(
      new Request("https://altus.example/api/contact", {
        headers: { origin: "https://altus.example" },
      }),
    ),
  );
  assert.equal(
    checkOrigin(
      new Request("https://altus.example/api/contact", {
        headers: { origin: "https://foreign.example" },
      }),
    ),
    false,
  );
});
test("malformed and oversized bodies are rejected", async () => {
  await assert.rejects(
    readForm(
      new Request("https://altus.example/api/contact", {
        method: "POST",
        body: "not json",
      }),
    ),
  );
  await assert.rejects(
    readForm(
      new Request("https://altus.example/api/contact", {
        method: "POST",
        body: "x".repeat(24001),
      }),
    ),
  );
});
test("missing endpoints and insecure endpoints never call an external service", async (t) => {
  const fetchMock = t.mock.method(globalThis, "fetch", async () => {
    throw new Error("Must not fetch");
  });
  assert.equal((await deliver(undefined, {})).status, 503);
  assert.equal((await deliver("http://webhook.example", {})).status, 502);
  assert.equal(fetchMock.mock.callCount(), 0);
});
test("HTTPS delivery only acknowledges accepted responses", async (t) => {
  const calls: RequestInit[] = [];
  t.mock.method(
    globalThis,
    "fetch",
    async (_url: unknown, options?: RequestInit) => {
      calls.push(options ?? {});
      return new Response("accepted", { status: 202 });
    },
  );
  const response = await deliver("https://webhook.example", { type: "test" });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(calls[0].redirect, "error");
  assert.equal(calls[0].body, JSON.stringify({ type: "test" }));
});
test("delivery failures are reported without exposing provider details", async (t) => {
  t.mock.method(
    globalThis,
    "fetch",
    async () => new Response("private provider error", { status: 500 }),
  );
  const response = await deliver("https://webhook.example", {});
  assert.equal(response.status, 502);
  assert.equal(
    JSON.stringify(await response.json()).includes("private provider error"),
    false,
  );
});
