# Homepage hero comparison

The contact-sheet hero is the homepage's main hero, with the editorial hero directly below it for comparison. Both precede the existing expertise section. The original hero, Connected Systems, and dark variants have been removed. All layouts live in components; `src/app/page.tsx` controls their order.

| Order | Design                                  | Component                                      | Preview anchor     |
| ----- | --------------------------------------- | ---------------------------------------------- | ------------------ |
| 03    | Editorial contact sheet of case studies | `src/components/home/heroes/WorkHero.tsx`      | `/#hero-work`      |
| 01    | Editorial headline with woven imagery   | `src/components/home/heroes/EditorialHero.tsx` | `/#hero-editorial` |

Both hero components render on the server and use the existing light palette with local Tailwind styling. `HeroActions.tsx` supplies their contact and work actions.

The editorial mobile headline has three deliberate rows with “strategy meets” together. Contact-sheet CTAs appear with the introduction, before the project images, in each layout.

The contact sheet uses existing case-study illustrations. Project-specific screenshots can replace them later without changing the composition.

## Choosing a hero

1. Compare the two light layouts on desktop and mobile.
2. Keep the chosen component invocation in `src/app/page.tsx`; remove the unwanted invocations and their imports.
3. Keep a single hero and make its title the page's only `h1`. The contact-sheet hero currently uses `h1`, and the editorial hero uses `h2`. Promote the editorial title if it is selected instead. Only the main hero's first image is loaded with priority.
4. Remove the discarded component file; retain `HeroActions.tsx` for the chosen layout.
5. Remove the comparison labels such as `01 / Editorial composition` from the selected hero. Move it to the start of the page and adjust its opening spacing for the fixed navigation.
6. Update `tests/e2e/heroes.spec.ts` for the selected layout. This test intentionally checks the comparison stack while all options are present.

No global CSS rules, new font files, animation packages, or additional image assets were added for these alternatives.
