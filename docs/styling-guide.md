# Styling and editing guide

The site uses a small shared CSS foundation and Tailwind utilities for component-specific presentation. Keep layout edits next to the JSX that owns them.

## Shared foundation

| File                        | Responsibility                                                                                                                                     |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/styles/tokens.css`     | Website-wide color, font-family, and radius tokens. `ink` remains available by request even though it has no current consumers.                    |
| `src/styles/base.css`       | Browser-wide focus indicators, text selection, heading wrapping, tap behavior, and reduced-motion handling. Tailwind Preflight supplies the reset. |
| `src/styles/spacing.css`    | `site-container`, `reading-container`, standard `site-section` spacing, and `section-divider`.                                                     |
| `src/styles/typography.css` | `heading-display`, `heading-section`, `heading-card`, `text-lead`, `text-body`, `text-reading`, `text-eyebrow`, and `text-meta`.                   |
| `src/styles/controls.css`   | The `button` base, `button-primary`, `button-secondary`, `button-inverse`, and `action-link`.                                                      |

Shared presentation classes live in `@layer components`. Tailwind utilities can override them without `!important` or dependence on stylesheet import order. Changing a shared preset intentionally changes every consumer; search for its class name before changing it.

Typography presets define the text's appearance. Put contextual margins, positioning, and layout directly on the element, for example `className="heading-section mb-6"`. `font-display` selects only the display font family; add weight and tracking explicitly when a preset is inappropriate.

## Component and page edits

Use utilities for grids, alignment, gaps, positioning, responsive visibility, borders, local backgrounds, and contextual spacing. Do not recreate global component classes with `@apply`, add parent selectors that reach into shared components, or create a central collection of layout class strings.

Small local class mappings are appropriate for true variants. `ContactForm` keeps its repeated field styling in a local `inputClasses` constant. Article rows and cards own their different image and text presentation. Named groups (`group/work` and `group/article`) keep hover behavior local to each card.

Shared React components still have deliberate shared effects: changing `Metrics` changes its consumers, and changing `Media` changes its default image presentation. Page-specific project metrics and results use their own utilities rather than a generic `.metric` selector.

## Images

`Media` accepts `aspectRatio`:

- `standard`: 3:2, the default.
- `landscape`: 4:3.
- `wide`: 16:9.
- `portrait`: 4:5.

The former `shape="square"` was 4:3; it is now correctly named `aspectRatio="landscape"`.

Use `radiusClassName` to select corners and `className` for additional wrapper behavior. For example, article rows pass `max-md:aspect-square` to make mobile thumbnails square while keeping the desktop ratio. Keep these complete utility strings in source so Tailwind can detect them. Focal-point positioning remains a data-driven inline style; image fit uses object-fit utilities.

Image alt text, loading priority, responsive sizes, and error handling remain part of the component. Images render without figure wrappers or captions.

## Responsive behavior

Preserve the existing transitions when editing layouts:

- 360px (`xs`): narrow wordmark and team-grid adjustment.
- 768px (`md`): tablet layouts and typography.
- 1024px (`lg`): desktop navigation and larger grids.
- 1101px (`wide`, defined as 68.8125rem to match Tailwind’s breakpoint units): wider gaps and contact-sidebar sizing.

Standard section spacing remains 56px on mobile, 80px on tablet, and 96px on desktop. Container side margins remain 20px, 32px, and 40px respectively, with the existing desktop maximum width.

## Verification

Run `npm run check` and `npm run build`. Run the existing browser suite with `npm run test:e2e` when the Playwright browser is installed. Inspect the affected component at narrow, tablet, and desktop widths, including hover, keyboard focus, selected, invalid, and disabled states when relevant. Browser tests use semantic locators rather than styling class names.
