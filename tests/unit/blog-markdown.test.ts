import assert from "node:assert/strict";
import { test } from "node:test";
import { parseBlogPost } from "../../src/lib/blog-markdown";
import {
  articleHeadings,
  parseArticleContent,
} from "../../src/lib/article-markdown";
import {
  getArticle,
  getArticles,
  getArticleSlugs,
} from "../../src/lib/server/blog-content";

const metadata = `title: "An article: with punctuation"
excerpt: >-
  An excerpt that wraps
  across two lines.
category: "Strategy"
author: "Example Author"
authorRole: "Editor"
date: "2024-02-29"
readTime: "3 min read"`;
const source = `---\n${metadata}\n---\n\nIntroduction.\n\n## A section\n\nArticle body.`;

test("blog frontmatter handles quoted and folded text while preserving its Markdown body", () => {
  const post = parseBlogPost("example-article", source);
  assert.equal(post.slug, "example-article");
  assert.equal(post.title, "An article: with punctuation");
  assert.equal(post.excerpt, "An excerpt that wraps across two lines.");
  assert.equal(post.date, "2024-02-29");
  assert.equal(post.content, "Introduction.\n\n## A section\n\nArticle body.");
  assert.equal(post.image, undefined);
});

test("blog validation catches authoring mistakes before a post can be generated", () => {
  assert.throws(
    () => parseBlogPost("../outside", source),
    /Invalid blog filename/,
  );
  assert.throws(
    () => parseBlogPost("example", "No frontmatter"),
    /frontmatter/,
  );
  assert.throws(
    () =>
      parseBlogPost(
        "example",
        source.replace('author: "Example Author"', "author: 123"),
      ),
    /author string/,
  );
  assert.throws(
    () =>
      parseBlogPost(
        "example",
        source.replace('date: "2024-02-29"', 'date: "2025-02-29"'),
      ),
    /valid date/,
  );
  assert.throws(
    () =>
      parseBlogPost(
        "example",
        source.replace('readTime: "3 min read"', 'readTime: ""'),
      ),
    /readTime string/,
  );
  assert.throws(
    () =>
      parseBlogPost(
        "example",
        source.replace(metadata, metadata + '\ntitle: "Duplicate"'),
      ),
    /unique/,
  );
  assert.throws(
    () =>
      parseBlogPost(
        "example",
        source.replace(metadata, metadata + '\nslug: "different-slug"'),
      ),
    /unknown field: slug/,
  );
  assert.throws(
    () => parseBlogPost("example", `---\n${metadata}\n---\n`),
    /article content/,
  );
});

test("optional article images validate their metadata and local paths", () => {
  const withImage = source.replace(
    metadata,
    metadata +
      `\nimage:
  src: "/images/editorial/strategy.webp"
  alt: "A blue bridge"
  width: 1536
  height: 1024
  kind: "editorial"
  fit: "cover"
  focalPoint: "50% 55%"`,
  );
  const image = parseBlogPost("example", withImage).image;
  assert.equal(image?.width, 1536);
  assert.equal(image?.focalPoint, "50% 55%");
  assert.throws(
    () =>
      parseBlogPost(
        "example",
        withImage.replace(
          'src: "/images/editorial/strategy.webp"',
          'src: "/../../outside"',
        ),
      ),
    /local src/,
  );
  assert.throws(
    () =>
      parseBlogPost("example", withImage.replace("width: 1536", "width: -1")),
    /positive/,
  );
  assert.throws(
    () =>
      parseBlogPost(
        "example",
        withImage.replace('fit: "cover"', 'fit: "unknown"'),
      ),
    /image.fit/,
  );
});

test("Markdown outlines use the rendered heading text and retain section-index anchors", () => {
  const blocks = parseArticleContent(
    "Introduction.\n\n## Why **strategy** matters\n\nA paragraph.\n\n### A subsection\n\n- First point.\n- Second point.",
  );
  assert.deepEqual(articleHeadings(blocks), [
    { id: "section-1", title: "Why strategy matters" },
    { id: "section-3", title: "A subsection" },
  ]);
  assert.equal(blocks[4].type, "list");
  assert.throws(
    () => parseArticleContent("# Duplicate page title"),
    /page supplies its title/,
  );
  assert.throws(
    () => parseArticleContent("<script>alert(1)</script>"),
    /Unsupported/,
  );
});

test("literal list markers within prose stay paragraphs while actual lists remain lists", () => {
  const blocks = parseArticleContent(
    "**A lead-in**\nLiteral markers:\n\\- One point\n1\\. A numbered point\n\n- Actual list item",
  );
  assert.deepEqual(
    blocks.map((block) => block.type),
    ["paragraph", "list"],
  );
});

test("discovered article slugs and summaries remain ordered, and unknown slugs return no article", () => {
  const posts = getArticles();
  assert.deepEqual(
    getArticleSlugs(),
    posts.map((post) => post.slug),
  );
  for (let index = 1; index < posts.length; index++)
    assert.ok(posts[index - 1].date >= posts[index].date);
  assert.equal(getArticle("not-a-real-article"), undefined);
  assert.equal(getArticle("../../package"), undefined);
  for (const post of posts) assert.ok(post.image?.alt);
});
