# Adding and editing blog posts

Each article lives in its own Markdown file under `src/content/blog`. The filename defines the URL: `my-next-article.md` becomes `/blog/my-next-article`. Use lowercase words separated by hyphens. Keep existing filenames when editing a published article so its URL stays unchanged.

All `.md` files in this folder are discovered automatically. There is no central article array or import registry to update. Do not store draft or template files in this published-content folder.

## New article example

Create `src/content/blog/my-next-article.md`:

```md
---
title: "My next article"
excerpt: "A short introduction used on article cards and at the top of the post."
category: "Strategy"
author: "Author Name"
authorRole: "Strategy Lead"
date: "2026-10-01"
readTime: "5 min read"
---

An introduction paragraph.

## A clear section heading

Article text with **bold emphasis**, _italics_, and a
[helpful link](https://example.com).

- First point.
- Second point.

### A subsection

More article text.
```

All seven metadata fields are required. Dates must be valid calendar dates in `YYYY-MM-DD` format. Quote metadata strings, particularly titles containing colons. For a long excerpt, YAML folded text is also supported:

```yaml
excerpt: >-
  A readable excerpt written across multiple lines
  becomes one paragraph on the website.
```

The filename supplies the slug; do not add a separate `slug` field. Articles are sorted by date, newest first, with the slug as the tie-breaker. The homepage shows the first three summaries, and related articles still prioritize the current article's category. Reading time remains an editorial value rather than being recalculated during this migration.

## Markdown presentation

Use `##` for sections and `###` for subsections; the page already renders the title as its single `h1`. The contents navigation is generated from these headings. Existing `section-*` anchors were preserved during migration; the index reflects the heading's position among rendered blocks.

Supported body content includes paragraphs, unordered and ordered lists (including nested lists), bold and italic emphasis, links, inline code, and hard line breaks. A blank line separates paragraphs. Soft wrapping is supported, so long paragraphs can remain readable in the editor.

Some migrated articles contain escaped markers such as `\-` or `1\.` inside paragraphs. These intentionally keep previously inline list-like text in its original paragraph layout. For a real list, use ordinary markers on their own lines, separated from the previous paragraph by a blank line.

Tables, block quotes, fenced code blocks, images inside the article body, and raw HTML blocks are outside the current text renderer's format. Inline HTML is displayed as text. Add new rendering features deliberately with their styling and tests.

## Cover images

Existing articles keep their current editorial image mappings. New filenames without a mapping receive the default strategy illustration. To choose a specific cover image, add an optional `image` object inside the frontmatter:

```yaml
image:
  src: "/images/editorial/strategy.webp"
  alt: "A blue bridge connects a blueprint to a terracotta arch."
  width: 1536
  height: 1024
  kind: "editorial"
  focalPoint: "50% 55%"
  fit: "cover"
```

The file must exist under `public`, and `src` starts with `/`. Use accurate alt text and the image's real dimensions. `kind` must be `editorial`, `project`, or `photo`; `fit` and `focalPoint` are optional. Next.js still handles responsive image loading through the shared `Media` component.

## Loading and verification

`src/lib/server/blog-content.ts` discovers files, reads and validates them, resolves cover images, sorts articles, and provides slugs and summaries. Repeated reads are cached within a React server render, rather than permanently caching files across edits. Only summaries are passed to client-side filters; article bodies and parsing dependencies stay on the server.

`src/data/blog-types.ts` defines the article type. `src/lib/blog-markdown.ts` validates metadata; `src/lib/article-markdown.ts` supplies parsed body blocks and the outline; `src/components/site/ArticleContent.tsx` owns their Tailwind presentation.

After editing, run `npm run check` and `npm run build`. Both validate the content. Production pages are statically generated, so rebuild and deploy to publish new or edited articles. In development, refresh the page after edits; restart the development server if a newly added file has not appeared.
