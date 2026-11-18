# Altus Media Labs

Next.js App Router website using React, TypeScript, Tailwind CSS 4, and locally hosted fonts. The project keeps page content on the server and isolates browser state in navigation, filters, forms, and image error handling.

## Requirements and setup

Use Node.js 22 or newer and npm. Install the locked dependencies:

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Local environment files are ignored by Git. Never place tokens in a `NEXT_PUBLIC_` variable or in `public/`.

## Commands

| Command                | Purpose                                                |
| ---------------------- | ------------------------------------------------------ |
| `npm run dev`          | Development server on port 3000                        |
| `npm run format`       | Format source, configuration, tests, and documentation |
| `npm run format:check` | Verify formatting without modifying files              |
| `npm run lint`         | ESLint with Next.js and TypeScript checks              |
| `npm run typecheck`    | Generate route types and run strict TypeScript checks  |
| `npm test`             | Unit tests for content, validation, APIs, and delivery |
| `npm run check`        | Formatting, lint, type checking, and unit tests        |
| `npm run build`        | Production build and static content generation         |
| `npm run start`        | Serve the production build                             |
| `npm run test:e2e`     | Desktop/mobile Chromium regression tests               |

To run browser tests after building, install Chromium with `npx playwright install chromium`. The test configuration starts a production server on port 3100. Invalid form tests never send a real enquiry. Unit delivery tests use mocked network requests. CI runs all checks, builds, installs Chromium, and runs the browser suite.

## Structure and ownership

```text
src/
  app/                  Page-specific layouts, route metadata, and API handlers
  components/
    layout/             Shared Navbar and Footer
    site/               Hero, CTA, FAQ, metrics, media, and Markdown presentation
    cards/              Article and project card presentation
    filters/            Small client components for listing filters
    forms/              Contact form state and submission
  content/
    blog/               One Markdown file per article, with YAML metadata
    legal/              Editable Markdown privacy policy and terms of service
  data/                 Typed content records and image metadata
  lib/
    server/             Server-only content projections and webhook delivery
    dates.ts            Shared date formatting
    form-validation.ts  Shared browser/server validation
    site-config.ts      Public contact and booking configuration
  styles/               Tokens, global defaults, shared typography, spacing, and controls
tests/
  unit/                 Node test runner tests
  e2e/                  Playwright route and interaction tests
public/                 Publicly served images, fonts, and licenses
docs/                   Design and architecture decisions
```

Keep page-specific layouts in their route's `page.tsx`, alongside metadata and route parameter handling. Shared sections, cards, forms, and layout elements belong in `src/components`; editable content belongs in `src/content` or `src/data`. Each service, article, and case study is generated from its known slug at build time; unknown slugs return 404. Contact remains dynamic because it reads query parameters. Interactive components receive compact records rather than importing full article or project datasets. Server-only modules use the `server-only` boundary marker.

## Editing content and design

- Services: `src/data/services.ts`.
- Projects: `src/data/case-studies.ts`. Use `serviceSlugs` to reference services; titles are resolved centrally and validated by tests.
- Articles: `src/content/blog/*.md`. Each filename defines its URL slug; YAML frontmatter holds card and page metadata. Files are discovered automatically and sorted newest first. See [the blog authoring guide](docs/blog-content.md) for adding and editing posts.
- Team and contact questions: `src/data/team.ts` and `src/data/contact-faqs.ts`.
- Privacy policy and terms: `src/content/legal/privacy-policy.md` and `src/content/legal/terms-of-service.md`. Edit the Markdown content, including its title and updated date. See [the legal content guide](docs/legal-content.md) for supported formatting.
- Image registry: `src/data/imagery.ts`. Record-specific images override editorial fallbacks.
- Colors, fonts, and radii: `src/styles/tokens.css`. Shared typography, section spacing, and controls live in focused CSS files under the component layer. Component layouts and states use Tailwind utilities in their TSX files. See [the styling guide](docs/styling-guide.md) for editing conventions and the scope of shared changes.

Blog articles use normal Markdown sections (`##`), subsections (`###`), paragraphs, lists, emphasis, links, and inline code. The article renderer and contents navigation share the same parsed blocks. Raw HTML blocks and embedded media are outside the supported text format. Legal documents retain their own presentation rules. Existing editorial images are illustrative rather than client project evidence.

## Form configuration

`NEXT_PUBLIC_CONTACT_EMAIL` controls the public email address. `NEXT_PUBLIC_BOOKING_URL` enables a real booking destination. `CONTACT_WEBHOOK_URL` and `NEWSLETTER_WEBHOOK_URL` must be HTTPS endpoints accepting JSON and returning 2xx only after durable acceptance. `FORM_WEBHOOK_TOKEN` optionally authenticates both endpoints and stays server-only.

Without a contact endpoint, the form explicitly prepares an email draft. The newsletter is hidden without its endpoint. Restart development and rebuild production after configuration changes. Test real delivery with your chosen provider before release; automated tests intentionally avoid external messages. Configure provider-side spam and rate controls when enabling public delivery.

## Local Git and review workflow

The repository has a local baseline commit and no remote has been configured. Work on a branch, inspect the diff, run `npm run check` and `npm run build`, and commit reviewed changes. Connect a remote only when ready; GitHub CI runs after the workflow is pushed. Public deployment and verified project/team content remain separate release tasks.

See `docs/design-implementation.md` for the visual design decisions and `docs/architecture-updates.md` for this refactor's implementation and verification record.
