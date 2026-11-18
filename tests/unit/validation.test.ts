import assert from "node:assert/strict";
import { test } from "node:test";
import {
  contactFieldErrors,
  validateContact,
  validEmail,
} from "../../src/lib/form-validation";

const enquiry = {
  name: "Alex",
  email: "alex@example.com",
  company: "Example",
  budget: "",
  description: "A website project with a clear scope.",
  services: ["web-development"],
  website: "",
};

test("valid enquiry is trimmed and optional fields have defaults", () => {
  const result = validateContact({
    name: " Alex ",
    email: " alex@example.com ",
    description: " A website project with a clear scope. ",
  });
  assert.ok("data" in result);
  assert.equal(result.data.name, "Alex");
  assert.equal(result.data.email, "alex@example.com");
  assert.equal(result.data.company, "");
  assert.deepEqual(result.data.services, []);
});
test("rejects malformed bodies and fields before delivery", () => {
  for (const value of [
    null,
    [],
    "text",
    {},
    { ...enquiry, name: 12 },
    { ...enquiry, company: {} },
    { ...enquiry, email: "bad" },
    { ...enquiry, description: "short" },
    { ...enquiry, description: "x".repeat(5001) },
    { ...enquiry, services: [42] },
    { ...enquiry, services: Array(7).fill("web-development") },
  ])
    assert.ok("error" in validateContact(value));
});
test("description bounds are inclusive and shared by browser and server", () => {
  for (const length of [20, 5000]) {
    const fields = { ...enquiry, description: "x".repeat(length) };
    assert.deepEqual(contactFieldErrors(fields), {});
    assert.ok("data" in validateContact(fields));
  }
  for (const length of [19, 5001]) {
    const fields = { ...enquiry, description: "x".repeat(length) };
    assert.ok(contactFieldErrors(fields).description);
    assert.ok("error" in validateContact(fields));
  }
});
test("email validation rejects whitespace, missing domains and oversized input", () => {
  assert.ok(validEmail(" alex@example.com "));
  for (const value of [
    null,
    "a@b",
    "a b@example.com",
    "a".repeat(250) + "@example.com",
  ])
    assert.equal(validEmail(value), false);
});
