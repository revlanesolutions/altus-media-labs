# Design implementation and continuation guide

Updated: 30 September 2026.

## Completed implementation

| Plan area              | Delivered                                                                                                                                                                                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Color system           | Original blue `#2B59D1`, one complementary terracotta `#A6472B`, neutral parchment, white and charcoal. Solid surfaces replace gradients. Blue carries actions; terracotta carries labels, rules and error states.                                    |
| Typography             | Locally hosted Newsreader for display headings and Source Sans 3 for body/UI, with fallback fonts and OFL licenses in `public/fonts`. Responsive type scales and comfortable article line lengths.                                                    |
| Image system           | Six original editorial illustrations, optimized as WebP. Shared image component provides responsive sizes, focal points, alt text and failure handling. All images are explicitly editorial rather than client evidence.                              |
| Layouts                | Homepage, service listing and six service details, work listing and four case studies, about, journal listing and six articles, contact, privacy and terms use shared spacing, buttons, grids and reading styles.                                     |
| Navigation             | Real URLs, contextual metadata, invalid-route handling, skip link, route focus, active links, accessible desktop disclosure, scrollable mobile navigation, focus loop and Escape support.                                                             |
| Discovery              | Project and article filters derive their options from content, communicate the selected state and announce result counts. Articles have real lists, paragraphs and linked section navigation.                                                         |
| Contact                | Accessible field labels and errors, first-invalid-field focus, service preselection, optional budget and services, server validation and delivery states. Unconfigured delivery explicitly prepares an email draft rather than claiming a submission. |
| Newsletter and booking | Newsletter appears only when delivery is configured. Booking link appears only when supplied. Placeholder social links removed.                                                                                                                       |
| Cleanup                | Removed unused `src/pages/homepage.css` and obsolete Tailwind configuration; Tailwind 4 tokens live in `src/app/globals.css`. Explicit project root prevents an unrelated parent lockfile from defining the build root.                               |
| Accessibility          | Visible keyboard focus, native FAQ disclosures, semantic form groups, 16px form controls, reduced-motion rules and image descriptions. Manual checks below cover representative interactions, not a formal accessibility certification.               |

## Verification completed

- `npm run lint` and `npx tsc --noEmit --incremental false`: passed.
- `npm run build` (default Turbopack) and `npm run build -- --webpack`: passed, including compilation, type checking and prerendering. The default build required permission to start its local CSS compiler outside the sandbox.
- All 24 content routes loaded at 320px without horizontal document overflow and with one primary heading. All six service pages had no gradient backgrounds; no broken completed images were detected there.
- All eight top-level routes passed overflow checks at 768px and 1440px.
- Homepage visually reviewed at desktop and 390px; a long case study title reviewed at 320px. Final desktop capture: `screenshots/homepage-desktop.jpg`.
- Project industry filter returned the single Hospitality & Travel project; journal SEO filter returned one article.
- Service enquiry link preselected SEO/GEO. Empty and malformed contact inputs produced linked errors and focused the correct input. No valid enquiry was sent or email draft opened during QA.
- Desktop disclosure opens all six services; Escape closes it and restores trigger focus.
- Short mobile viewport (390 × 400): menu scrolls, background is inert and body scrolling is locked; Tab and Shift+Tab wrap through the visible header and menu controls. Escape restores toggle focus.
- All ten article/case detail routes passed the narrow overflow check; article section anchors resolve to existing headings.
- Local API checks: malformed contact returns 400, foreign-origin contact returns 403, invalid newsletter returns 400. No external message or subscription was created.

## Remaining release requirements

1. **Connect delivery.** Copy `.env.example` to `.env.local` and supply a real HTTPS `CONTACT_WEBHOOK_URL`, optionally `NEWSLETTER_WEBHOOK_URL`, and any `FORM_WEBHOOK_TOKEN`. Endpoints must return 2xx only after durable acceptance. Restart development; rebuild for production after changing public environment variables or footer configuration. Test delivery, recipient notification, rejected responses, retry behavior and consent storage using the chosen provider.
2. **Confirm contact and booking.** Verify the retained `hello@altusmedialabs.com` address. Set `NEXT_PUBLIC_CONTACT_EMAIL` if different and `NEXT_PUBLIC_BOOKING_URL` only when a real booking page is ready.
3. **Supply authentic content.** Verify the existing project metrics, testimonials, team identities, dates and legal wording before public release. They were retained from the original content and have not been independently substantiated.
4. **Upgrade portfolio imagery.** Supply approved screenshots, photographs or brand artifacts. Set each record's optional `image` property using the `SiteImage` type in `src/data/imagery.ts`; set `kind: 'project'` or `'photo'`, accurate alt text, dimensions and focal point. Images render without figure wrappers or captions; retain accurate imagery kind metadata. Team entries support optional real photos; initials currently provide an honest fallback.
5. **Deployment review.** Verify the actual hosting domain, email delivery, booking destination and production environment configuration. Check the deployed site on real iOS/Android devices and perform a screen-reader pass. Configure provider-side spam/rate controls for publicly exposed form delivery.

## Asset and maintenance decisions

- Editorial artwork uses architectural paper/collage scenes in blue, terracotta, parchment and charcoal: a strategy bridge, connected systems, purposeful growth, brand objects, audience discovery and an experience courtyard. It is illustrative and must not be presented as completed client work.
- WebP assets are stored in `public/images/editorial`; the registry and slug mapping live in `src/data/imagery.ts`. Prefer record-specific imagery as authentic assets become available.
- The current variable fonts are local TTF files. WOFF2 conversion is an optional later payload optimization; preserve the font licenses and complete browser checks if formats change.
- Shared design rules live in `src/styles` and are imported by `src/app/globals.css`; reusable layout/content elements live in `src/components`. Page-specific layouts live directly in their App Router `src/app/**/page.tsx` files, alongside metadata and route parameters. Legal documents remain editable Markdown under `src/content/legal`.
- The pre-redesign backup is temporarily available at `/tmp/altus-before-redesign`. Local Git is now initialized with a baseline commit; no remote or public deployment is configured.

## Where continuation starts

The code implementation and manual QA listed above are complete. The next substantive work starts with verified project/team content and service configuration, then end-to-end delivery and deployed-device validation. These depend on authentic assets and account settings rather than further placeholder UI.
