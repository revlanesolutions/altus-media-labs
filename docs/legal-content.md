# Editing legal documents

The two legal pages read their content from:

- `src/content/legal/privacy-policy.md`
- `src/content/legal/terms-of-service.md`

Edit those files instead of the page components. Their titles, dates, section names, and body copy are all maintained in Markdown. Existing URLs and route metadata remain in the App Router files.

## Document format

Start with one document title, followed by a separate updated-date paragraph:

```md
# Privacy Policy

Last updated: January 15, 2025

Introduction paragraph.

## 1. Information We Collect

Section text.

### Personal Information

Subsection text.

- First item.
- **Label:** Second item.
```

Use `##` for sections and `###` for subsections. Paragraphs are separated by blank lines. Soft wrapping within a paragraph is supported, so paragraphs can stay readable in the editor. Keep section numbers in the heading text when adding or reordering sections.

Supported content includes paragraphs, bullet and numbered lists, emphasis (`**text**` and `*text*`), inline code, and links (`[label](https://example.com)`). The existing emphasis treatment retains the document's foreground color and normal weight. Links receive the site's blue underline styling.

For compact contact details, end each line except the last with two spaces or a backslash. These Markdown hard breaks keep the existing spacing between contact-detail lines:

```md
**Altus Media Labs, LLC**\
Email: privacy@altusmedialabs.com\
Website: altusmedialabs.com
```

The renderer is scoped to these text documents. Tables, images, block quotes, fenced code blocks, task lists, and nested lists are outside its supported document format. Raw HTML blocks are rejected; inline HTML is displayed as text rather than executed.

## Presentation and verification

`src/components/site/LegalDocument.tsx` owns the shared layout and Tailwind presentation. `src/lib/server/legal-content.ts` loads only the two known document paths on the server. The Markdown parser stays out of the browser bundle; both legal routes remain statically generated.

After editing, run `npm run check` and `npm run build`, then inspect both pages. The parser reports missing titles or dates, unsupported block types, and unsupported heading levels during validation. No styling changes are needed for ordinary text edits.
