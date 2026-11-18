# Architecture updates

## Implementation checklist

- [x] Ignore local environment files while retaining `.env.example`.
- [x] Initialize local Git and record a baseline; do not configure a remote or publish.
- [x] Add pinned Prettier tooling, editor settings, and format/check scripts.
- [x] Restore Next.js/TypeScript lint rules, strict implicit-any checks, and React Strict Mode.
- [x] Replace the catch-all dispatcher with explicit route folders and route-local metadata.
- [x] Generate known service, article, and case-study slugs at build time.
- [x] Keep static page shells on the server; extract client filters and ContactForm.
- [x] Pass compact content projections to interactive components; remove client imports of full content datasets.
- [x] Extract shared cards, heroes, CTA, FAQ, metrics, and date formatting into named modules.
- [x] Split global/component styling and use shared color variables.
- [x] Reference services through stable slugs and validate content relationships.
- [x] Add server-only boundaries to content projections and delivery infrastructure.
- [x] Share contact validation between the browser and API.
- [x] Remove unused router, UI/toast scaffold, shadcn configuration, and associated dependencies.
- [x] Add content, validation, delivery, and API tests.
- [x] Add desktop/mobile browser tests and a GitHub CI workflow.
- [x] Document setup, content editing, design ownership, configuration, and review commands.

## Verification

- `npm run check` passed: project-wide formatting, restored ESLint checks, generated route types, strict TypeScript, and all 16 unit tests.
- `npm run build` passed on Next.js 16.3.8. The build generates known service, article, and project pages statically; contact and API handlers remain dynamic.
- Browser checks on the local production build covered all 24 content routes at desktop and 320px, and the eight top-level routes at 768px. No horizontal overflow was found. Article section links resolve to existing elements.
- Project and article filters announce the expected single result. Contact preselects Web Development and focuses the first invalid input. Mobile navigation locks the background, closes on Escape, and restores focus; the desktop service disclosure behaves correctly.
- The stylesheet split initially changed the order of the generic button rule and mobile CTA rule. Importing global base styles before component styles fixes it. The browser suite includes an assertion that the desktop CTA is hidden on mobile.
- Unknown article slugs render the 404 page. The final production homepage was visually reviewed at desktop and mobile widths; a desktop capture is saved at `screenshots/architecture-desktop.jpg`.
- The automated Playwright suite registers eight desktop/mobile tests (`npm run test:e2e -- --list`). Its scenarios were checked through the connected browser during this refactor; the standalone Playwright runner and remote CI execution have not been run here. CI configuration is local until a remote is connected and the workflow is pushed.
- Compatible dependency fixes updated Next.js from 16.2.10 to 16.3.8 and updated affected transitive packages. The online npm audit after those fixes reported zero known vulnerabilities.
- Compiled client chunks do not contain the checked full article, case-study, or service-description passages. Full content datasets have server-only markers to prevent future client imports.
- Git confirms `.env`, `.env.local`, and `.env.production` are ignored. The local baseline commit is `0c4a76c`; architecture changes remain available in the working-tree diff for review. No remote is configured and nothing was pushed.

Unit delivery uses mocked requests; no external enquiry or newsletter subscription was sent. The production preview is available locally on port 3000. Stop it before starting `npm run dev` on the same port.

## Release requirements

Verified project/team imagery and claims, delivery credentials, booking configuration, deployed-device checks, and provider-side spam controls remain as documented in the design implementation guide. This architecture refactor does not publish the website or configure business services.
