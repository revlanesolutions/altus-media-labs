import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { parseLegalMarkdown } from "../../src/lib/legal-markdown";

test("legal Markdown groups sections without losing subsection, list, or inline content", () => {
  const document = parseLegalMarkdown(`# Example policy

Last updated: October 1, 2026

Introduction with **emphasis**.

## 1. Your rights

Opening paragraph.

### Requests

- **Access:** Request your records.
- Contact [our team](mailto:privacy@example.com).

Closing paragraph.

## 2. Contact

Example Company  
Email: privacy@example.com  
Website: example.com
`);
  assert.equal(document.title, "Example policy");
  assert.equal(document.updated, "October 1, 2026");
  assert.equal(document.introduction.length, 1);
  assert.deepEqual(
    document.sections.map((section) => section.heading.text),
    ["1. Your rights", "2. Contact"],
  );
  const blocks = document.sections[0].blocks;
  assert.deepEqual(
    blocks.map((block) => block.type),
    ["paragraph", "heading", "list", "paragraph"],
  );
  const list = blocks[2];
  assert.equal(list.type, "list");
  if (list.type === "list") {
    assert.equal(list.items.length, 2);
    assert.match(list.items[1].text, /mailto:privacy@example.com/);
  }
  const contact = document.sections[1].blocks[0];
  assert.equal(contact.type, "paragraph");
  if (contact.type === "paragraph") {
    assert.equal(
      contact.tokens.filter((token) => token.type === "br").length,
      2,
    );
  }
});

test("legal Markdown rejects missing metadata, invalid heading levels, and raw HTML blocks", () => {
  assert.throws(() => parseLegalMarkdown("## Missing title"), /must start/);
  assert.throws(
    () => parseLegalMarkdown("# Title\n\nBody without a date"),
    /must start/,
  );
  assert.throws(
    () =>
      parseLegalMarkdown(
        "# Title\n\nLast updated: Today\n\n#### Incorrect heading",
      ),
    /subsections/,
  );
  assert.throws(
    () =>
      parseLegalMarkdown(
        "# Title\n\nLast updated: Today\n\n<script>alert(1)</script>",
      ),
    /Unsupported/,
  );
});

test("both legal content files have a valid document header and populated sections", () => {
  for (const [slug, title] of [
    ["privacy-policy", "Privacy Policy"],
    ["terms-of-service", "Terms of Service"],
  ]) {
    const document = parseLegalMarkdown(
      readFileSync(
        join(process.cwd(), "src/content/legal", `${slug}.md`),
        "utf8",
      ),
    );
    assert.equal(document.title, title);
    assert.ok(document.updated.trim());
    assert.ok(document.introduction.length);
    assert.ok(document.sections.length);
    for (const section of document.sections) {
      assert.ok(section.heading.text.trim());
      assert.ok(section.blocks.length);
    }
  }
});
