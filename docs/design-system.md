# Design system (Medallion-style revamp, branch `design/medallion-style`, Nov 8 2026)

The client found every earlier hero (photo, carousel, looping video) "basic" and likes https://www.medallion.co for being clean. This branch rebuilds the site in that style: white page, Space Grotesk + Inter, hairline rules, 4px uppercase buttons, one framed product visual. We borrow the style, never Medallion's copy, logos, imagery or stats. `main` keeps the earlier direction (Geist, photo/video hero, orange/charcoal bands) as the fallback.

Tokens live in `src/app/globals.css` (`@theme`).

## Colour
| Token | Value | Use |
|---|---|---|
| `ink` | #404045 | The logo's gray (Nov 9 2026, replaced near-black navy): footer, data cards, outline buttons, gray bands |
| `fg` | #26272B | Body text (charcoal) |
| `muted` | fg at 70% opacity | Secondary text (about 5.7:1 on white) |
| `line` | #D1D5D6 | Every 1px hairline and border |
| `tint` (`stone`) | #EFF2F3 | The one pale band (closing CTA) and the fill of the two framed visuals. `stone` is a legacy alias so inner pages inherit it |
| `tint-2` (`stone-2`) | #E1E6E8 | "In review" pill, slider track |
| `orange` | #F77C27 | Logo orange, the brand colour (Nov 9 2026, client wants more orange): primary buttons, the stats band, the closing CTA band, the contact band, the `.hl` word marker, slider tracks. All text on it is white (2.67:1, client decision; black on orange was rejected). Never orange text on light |
| `orange-ink` | #B84A0C | Orange text on light (5.2:1 on white, 4.6:1 on tint), step numerals, and the fill of "Approved/Paid" pills (white text) |
| `orange-soft` | #FFA366 | Small orange text on ink |
| `ink-deep` | #4C4C4C | The Kram RCM logo gray (Nov 10 2026, from the on-white logo file; the logo letters in `src/assets/brand` are recolored to it): footer background only |
| `ink-2` / `ink-line` / `on-ink` | #4C4C52 / #62626A / #E6E6E9 | Surfaces, hairlines and body text on ink (footer, gray bands) |
| `graphite` | #3A404B | Hover for filled buttons, icons on light |
| `peach*` | legacy | Only used by inner-page leftovers |

Why the tint is a cool grey: a cream or peach tint beside an orange accent is the default look of generated pages, and Kram's palette has always been orange plus grey (no blue). #EFF2F3 shares a hue with the #D1D5D6 hairline, so orange is the only warm colour on the page. Text on orange surfaces is white (client decision, Nov 8 2026), so keep orange surfaces small: dots, tracks, pills (which use `orange-ink`).

Page rhythm: white sections with hairlines, warm-gray cards, orange bands (stats, contact, closing CTA), gray footer. The tint is now a warm pale gray (#F6F4F1).

## Type
| Role | Font | Spec |
|---|---|---|
| H1 | Space Grotesk 400 | 48px (clamp from 34px on phones), tracking −0.02em, line-height 1.08 |
| Section titles (H2) | Space Grotesk 300 | 44px (clamp from 32px), tracking −0.02em, line-height 1.1 |
| H3, row titles, step titles | Space Grotesk 300 or 400 | 20–24px |
| Big numbers (stats, 01–04) | Space Grotesk 300 | `tabular-nums` |
| Header nav links, mobile menu, logo wordmark, footer column titles | Space Grotesk 400 (logo 600/700) | 16–18px, tracking −0.01em |
| Body | Inter 400 | 16px, line-height 1.6; muted text is `text-muted` |
| Buttons | Inter 600 | 11px, uppercase, tracking 0.04em |

Both fonts are latin-subset variable woff2 in `src/fonts` (OFL licences beside them), loaded by `next/font/local` in `layout.tsx` as `--font-space-grotesk` (`font-display`) and `--font-inter` (`font-sans`). The base layer in `globals.css` sets h1/h2/h3, so do not put `text-[clamp(...)]` on headings. Line length is at most 68ch; headings use `text-balance`.

Avoid: tracked-caps eyebrows over every heading, "A · B · C" dot strings, a single accented word in a headline (the old `<Highlight>` pill is now plain text), numbered markers anywhere except "How we work".

## Components
- **Buttons** (`ButtonLink` in `ui/primitives.tsx`): 4px radius, padding 13px 22px. `dark` and `soft` both render the PRIMARY button, filled `orange-ink` with white text (5.2:1, so the 12px label passes AA; hover `graphite`; changed from logo orange after the Nov 9 2026 design critique). The `.hl` headline marker uses `orange-ink` too. Home services is a white section with an orange rounded panel (headline plus cutout inside it), not a full-width orange band; `white` is the 1px gray outline (orange fill on hover); `light` is white with an orange label, for orange bands; `ghost-dark` is the outline on ink. Primary label site-wide: "Book a free practice review"; header: "Get in touch".
- **Header**: white, 97px tall on desktop (72px on phones), 1px bottom border, centered Space Grotesk links, one small CTA at the right. One orange bar (no background fill) rests under the current page (also `aria-current`, full-ink text) and glides (400 ms) to the hovered or focused link, then returns; links drop in 60 ms apart on first load. In the mobile menu the current page has full-ink text, an orange left bar and a dot (no fill), and rows step in 40 ms apart. Hamburger below 1024px. No mega-menus, no phone number in the bar (it is in the mobile menu, footer and closing band).
- **Hairline rows** replace cards: services list, specialties, FAQ, stats cells, process steps. Only two things are framed: the hero status board and the weekly report (`rounded-[28px]` tint frame, white inner panel with a 1px border).
- **Status pills**: Submitted = outline, In review = `tint-2`, Approved/Paid = `orange-ink` with white text.
- **Closing CTA**: pale tint band, centered, rendered by the footer so every page ends with it.
- **Footer** (Nov 15 2026 redesign): flat logo gray (`ink-deep`, no orange wash, client rule) with a faint white dot texture top right. An orange hairline draws in from the center; brand block (logo, "Accuracy you can count on." in Space Grotesk, blurb) beside Company / Services / Follow columns with orange-soft uppercase titles; links grow an orange dash on hover/focus. Three contact tiles (orange icon square, uppercase label, value in Space Grotesk): hover/focus warms the ring to orange, glows the icon, nudges the arrow and draws a bottom bar (no lift). A giant outlined `KRAM RCM` wordmark fills the container width (`19.6cqw`), letters rise 55 ms apart, an orange light sweeps through once (2.2 s), then a spotlight follows the cursor (PointerGlow). Bottom row: ©, legal, "Back to top" (`#top`, no JS). Focus rings on the footer gray are orange.

## Hero
Split layout (Nov 8 2026): on the left, one outcome headline (the existing copy, no highlight; words rise from a mask on load), one sentence, ONE button and one muted trust line (`hero.reassurance` joined); on the right, a near-square rounded photo carousel. On phones everything stacks. The photos are placeholder stock images (`hero.slides` in `site.ts`; TODO(client): their own photography).

The animated **status board** of a SAMPLE practice ("Sample practice, illustrative") is NOT in the hero any more: it is the right-hand visual of the "Every status, every week, in one report" section (`sections/product-preview.tsx`), where it plays once as it scrolls into view. Row labels are generic ("Provider A", "Claim batch"); never add real payer or client names, people, counts or amounts.

Home order: hero, "Trusted by" strip (hidden until real logos), stats band, services, how we work, "Every status, every week" with the board, specialties, FAQ, closing band.

(Nov 8 2026: the client first asked for no photo, then, after seeing the calm version, asked for a photo and animation across the site. The photo and the motion below are that later decision.)

## Motion
- Hover 150 ms, UI 250 ms, easing `--ease-out-soft`; entrances 0.85-1.1 s with `--ease-out-strong` `cubic-bezier(.16,1,.3,1)`.
- **Hero load sequence (CSS only, no JS)**: headline words rise from a mask (70 ms apart), then the sentence, button and trust line rise (120 ms apart), the photo frame opens from an inset clip (1.3 s) and drifts slightly on scroll (`animation-timeline: view()` where supported), (the status board is further down the page and plays when it scrolls into view).
- **Hero photo carousel** (`home/hero-carousel.tsx`, client): five photos change every 1.5 s (`INTERVAL_MS`). The incoming photo fades in over 0.85 s while it settles from a 1.07 zoom (1.9 s); the outgoing one stays fully opaque underneath, so the frame never dips to the background. Slide 1 is in the server HTML. Autoplay stops for reduced motion (then no controls), a hidden tab, and the hero off screen. Dots show position (decorative); no controls (client removed the Pause button, Nov 15 2026).
- **Status board** (in the "Every status, every week" section; it rises in with the section's reveal): each row, 0.45 s apart, moves its pill Submitted → In review and fills its track; `done` rows continue to Approved/Paid 1.6 s later. Once, then it holds. Held until a third of it is on screen, so it starts when the visitor reaches it.
- **Scroll reveals**: `reveal(delayMs)` on a block, `stagger` on a list/grid (children rise 90 ms apart, `--i` set by `MotionObserver`). Each plays once, 28 px rise + fade. Process steps also draw a hairline across the top of each column. Service rows shift and tint on hover; their arrow nudges. Featured specialty cards (`SpecialtyCard`, home + /specialties) all share one tinted look at rest; on hover/focus an orange `.spec-fill` layer fades in (opacity, 0.6 s) and the text eases to white (0.5 s). Use an opacity layer, not a background-color swap, on anything that also has `.spot`: its unlayered `transition` overrides Tailwind transition utilities.
- **Count-up** (`data-count`, plus `data-suffix`): stats band, About stats, specialties page aside, About timelines (`~45 days`). 1.7 s ease-out quart from 0; the real number is in the HTML.
- Cutout clinicians (`ui/cutout.tsx`): rise 120px + a white glow blooms behind them, once on first view. Corner glows (`.band-glow` on orange, `.band-glow-ink` on gray) give flat bands depth, as on the calculator card. The status board is a ~6 s one-shot: pills roll up, rows flash, tracks glow, footer tallies count; "Replay" restarts it.
- Not used: parallax on text, looping or bouncing motion, hover lifts. One exception, added Nov 9 2026 at the client's request (ported from `main`): the home specialties marquee (two slow rows, pauses on hover/focus, off under reduced motion). Nov 12 2026, also client-requested: the home payers marquee, same rules. Nov 15 2026: client removed all pause/play buttons.
- `prefers-reduced-motion`: everything is shown at once, nothing counts, the board shows its end state. Without JS everything is visible and the hero and board still play.

## Accessibility
Visible focus rings (2px ink on light, orange on ink), labels on every input, 16px body, `aria-hidden` on the animated pills with an `sr-only` end-state status, real `<table>` for the weekly report, "Learn more" links carry an `sr-only` "about {service}" suffix. Do not use the single-word "Learn more" without context elsewhere.
