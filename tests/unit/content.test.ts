import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { services } from "../../src/data/services";
import {
  getArticles,
  getArticleSummaries,
} from "../../src/lib/server/blog-content";
import { caseStudies } from "../../src/data/case-studies";
import { team } from "../../src/data/team";
import { editorial, imageFor, type SiteImage } from "../../src/data/imagery";
import {
  getProjectSummaries,
  getServiceOptions,
  serviceTitles,
} from "../../src/lib/server/content";
import {
  articleHeadings,
  parseArticleContent,
} from "../../src/lib/article-markdown";
import { formatDate } from "../../src/lib/dates";

const blogPosts = getArticles();

function checkImage(image: SiteImage) {
  assert.ok(image.src.startsWith("/"));
  assert.ok(existsSync(join(process.cwd(), "public", image.src)));
  assert.ok(image.alt.trim());
  assert.ok(image.width > 0 && image.height > 0);
}
test("content has unique URL-safe slugs, titles and existing images", () => {
  for (const records of [services, blogPosts, caseStudies]) {
    assert.equal(new Set(records.map((r) => r.slug)).size, records.length);
    for (const record of records) {
      assert.match(record.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      assert.ok(record.title.trim());
      const image = record.image ?? imageFor(record.slug);
      assert.ok(image);
      checkImage(image);
    }
  }
  for (const image of Object.values(editorial)) checkImage(image);
  for (const member of team) if (member.photo) checkImage(member.photo);
});
test("projects reference known service IDs and contain a card result", () => {
  const known = new Set(services.map((s) => s.slug));
  for (const project of caseStudies) {
    assert.ok(project.results.length);
    assert.ok(project.serviceSlugs.length);
    for (const slug of project.serviceSlugs) assert.ok(known.has(slug));
    assert.equal(
      serviceTitles(project.serviceSlugs).length,
      project.serviceSlugs.length,
    );
  }
});
test("article dates are valid calendar dates and heading anchors are unique", () => {
  for (const post of blogPosts) {
    assert.match(post.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(
      new Date(post.date + "T12:00:00Z").toISOString().slice(0, 10),
      post.date,
    );
    assert.ok(formatDate(post.date));
    assert.ok(post.content.trim());
    const headings = articleHeadings(parseArticleContent(post.content));
    assert.equal(new Set(headings.map((h) => h.id)).size, headings.length);
  }
});
test("client summaries exclude article bodies and project narratives", () => {
  for (const post of getArticleSummaries()) {
    assert.equal("content" in post, false);
    assert.equal("authorRole" in post, false);
  }
  for (const project of getProjectSummaries()) {
    for (const key of ["content", "challenge", "approach", "testimonial"])
      assert.equal(key in project, false);
    assert.equal(project.results.length, 1);
  }
  for (const option of getServiceOptions())
    assert.deepEqual(Object.keys(option).sort(), [
      "shortTitle",
      "slug",
      "title",
    ]);
});
test("explicit route entry points exist for every website section", () => {
  for (const segment of [
    "services",
    "work",
    "blog",
    "about",
    "contact",
    "privacy-policy",
    "terms-of-service",
  ])
    assert.ok(existsSync(join(process.cwd(), "src/app", segment, "page.tsx")));
  for (const segment of ["services", "work", "blog"])
    assert.ok(
      existsSync(join(process.cwd(), "src/app", segment, "[slug]/page.tsx")),
    );
  assert.equal(
    existsSync(join(process.cwd(), "src/app/[...path]/page.tsx")),
    false,
  );
});
