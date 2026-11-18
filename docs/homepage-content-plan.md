# Homepage content additions

## Purpose and placement

The homepage already presents projects, services, aggregate results, the delivery process, articles, and a contact invitation. Add two sections that answer different visitor questions without expanding the service catalogue or repeating the case studies.

1. **Find your starting point**, between the hero alternatives and Our expertise. Help visitors recognize their business problem before choosing a service. Three selectable challenges reveal a practical first step, three things to investigate, and one relevant service link.
2. **Before we begin**, between the journal and the closing CTA. Answer four practical questions about preparing a brief, starting with one service, agreeing scope and estimates, and working with existing assets or systems.

Do not add new testimonials, result claims, prices, turnaround promises, or another project showcase in this update. Use the site's existing service descriptions and enquiry process as the basis for the copy.

## Design decisions

- Starting point: an unboxed vertical choice list beside one white advice panel. The active choice uses the existing blue. It is a decision guide, visually distinct from the service grid and process list.
- Before we begin: a centered introduction and an open two-column question-and-answer layout on a muted neutral surface. Answers remain visible; there is no carousel, accordion, or additional CTA competing with the existing final invitation.
- Retain Source Sans 3, Newsreader, the existing color tokens, section spacing, and containers. Use component-local Tailwind utilities and the shared typography presets.
- Keep each section in a named homepage component and annotate its position in the page source.

## Responsive and interaction rules

- Build from a single column. Starting-point choices precede their answer panel at mobile and tablet widths; split into two columns only at 1024px. The choices remain vertical at every size.
- Q&A uses one column on phones and two from 768px. Maintain the same reading order at every size.
- Use content-driven heights, wrapping text, minimum-width-zero grid tracks, and at least 44px interaction targets. No absolute positioning, horizontal scrolling, fixed-height text areas, or hover-only information.
- Implement the choice list as vertical accessible tabs, with selected state, associated panels, arrow-key navigation, Home/End, and visible focus. Only the current panel is exposed to assistive technology.
- Honor the existing reduced-motion styles; do not introduce animated height changes or automatic scrolling.

## Verification

Check the new sections at 320, 375, 430, 768, 1024, and 1440px. Verify every choice, its service destination, keyboard navigation, touch activation, readable Q&A, and absence of horizontal overflow. Inspect actual screenshots at phone, tablet, and desktop widths. Run formatting, lint, type checking, unit tests, and the production build.

Implemented and verified on October 1, 2026. All six viewport widths passed in desktop Chrome and mobile touch emulation. Screenshots were reviewed at 320, 768, and 1440px. Formatting, lint, type checking, 25 unit tests, the production build, and 12 targeted browser tests passed. The browser run covered the new content, navigation, existing routes, filters, and contact validation; it did not include the older test that expects the intentionally hidden editorial hero to be visible.

## Existing-section copy revision

Subsequent copy revisions completed on October 1, 2026:

- Clarified the main hero's offer and changed its action to “Discuss your project.”
- Replaced project category captions with descriptions of the actual work; renamed “Discovery” to “Search” and clarified the case-study link.
- Explained the integrated service offering and added homepage-specific service summaries in `src/data/homepage.ts`. Detailed service-page copy remains independent.
- Rewrote process descriptions around scope, outputs, review, and agreed follow-on work.
- Updated the journal heading and introduction. The featured AI article's existing “Where to Start” content supports its revised title and excerpt; its URL, date, and body are preserved.
- Clarified the homepage closing CTA through its copy prop and updated the shared footer description.
- Updated the hero test for the revised action text and the current intentionally hidden editorial alternative.

Metrics follow-up completed after the user confirmed the previous performance figures were dummy data. The homepage now presents the offering at a glance: six service disciplines (counted from the service data), five delivery stages, one shared business goal, and two engagement options (focused projects or ongoing support). Each point has a short explanation. The section is labeled “Our approach at a glance” rather than “Results,” and no invented revenue, retention, or delivery totals were introduced. Service-page metrics were outside this homepage update.

Verification: formatting, lint, type checking, 25 unit tests, production build, all 14 permanent browser tests, and two temporary responsive screenshot checks passed. Reviewed mobile, tablet, and desktop renders of the revised copy.
