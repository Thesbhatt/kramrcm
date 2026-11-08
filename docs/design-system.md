# Design system (Medallion-style revamp, branch `design/medallion-style`, Nov 8 2026)

The client found every earlier hero (photo, carousel, looping video) "basic" and likes https://www.medallion.co for being clean. This branch rebuilds the site in that style: white page, Space Grotesk + Inter, hairline rules, 4px uppercase buttons, one framed product visual. We borrow the style, never Medallion's copy, logos, imagery or stats. `main` keeps the earlier direction (Geist, photo/video hero, orange/charcoal bands) as the fallback.

Tokens live in `src/app/globals.css` (`@theme`).

## Colour
| Token | Value | Use |
|---|---|---|
| `ink` / `fg` | #040810 | Text, filled buttons, footer |
| `muted` | ink at 64% opacity | Secondary text (about 6:1 on white) |
| `line` | #D1D5D6 | Every 1px hairline and border |
| `tint` (`stone`) | #EFF2F3 | The one pale band (closing CTA) and the fill of the two framed visuals. `stone` is a legacy alias so inner pages inherit it |
| `tint-2` (`stone-2`) | #E1E6E8 | "In review" pill, slider track |
| `orange` | #F77C27 | Logo orange, the single accent: dots, progress track, underline under the phone link. Never text on light (2.67:1) |
| `orange-ink` | #B84A0C | Orange text on light (5.2:1 on white, 4.6:1 on tint), step numerals, and the fill of "Approved/Paid" pills (white text) |
| `orange-soft` | #FFA366 | Small orange text on ink |
| `ink-2` / `ink-line` / `on-ink` | #0E1420 / #262D3A / #C9CED6 | Surfaces, hairlines and body text on ink (footer) |
| `graphite` | #3A404B | Hover for filled buttons, icons on light |
| `peach*` | legacy | Only used by inner-page leftovers |

Why the tint is a cool grey: a cream or peach tint beside an orange accent is the default look of generated pages, and Kram's palette has always been orange plus grey (no blue). #EFF2F3 shares a hue with the #D1D5D6 hairline, so orange is the only warm colour on the page. Text on orange surfaces is white (client decision, Nov 8 2026), so keep orange surfaces small: dots, tracks, pills (which use `orange-ink`).

Page rhythm: white everywhere, hairlines between sections, one tint band (closing CTA), ink footer.

## Type
| Role | Font | Spec |
|---|---|---|
| H1 | Space Grotesk 400 | 48px (clamp from 34px on phones), tracking −0.02em, line-height 1.08 |
| Section titles (H2) | Space Grotesk 300 | 44px (clamp from 32px), tracking −0.02em, line-height 1.1 |
| H3, row titles, step titles | Space Grotesk 300 or 400 | 20–24px |
| Big numbers (stats, 01–04) | Space Grotesk 300 | `tabular-nums` |
| Body | Inter 400 | 16px, line-height 1.6; muted text is `text-muted` |
| Buttons | Inter 600 | 11px, uppercase, tracking 0.04em |

Both fonts are latin-subset variable woff2 in `src/fonts` (OFL licences beside them), loaded by `next/font/local` in `layout.tsx` as `--font-space-grotesk` (`font-display`) and `--font-inter` (`font-sans`). The base layer in `globals.css` sets h1/h2/h3, so do not put `text-[clamp(...)]` on headings. Line length is at most 68ch; headings use `text-balance`.

Avoid: tracked-caps eyebrows over every heading, "A · B · C" dot strings, a single accented word in a headline (the old `<Highlight>` pill is now plain text), numbered markers anywhere except "How we work".

## Components
- **Buttons** (`ButtonLink` in `ui/primitives.tsx`): 4px radius, padding 13px 22px. `dark` and `soft` both render the filled ink button; `white` is the 1px ink outline; `ghost-dark` is the outline on ink. Primary label site-wide: "Book a free practice review"; header: "Get in touch".
- **Header**: white, 97px tall on desktop (72px on phones), 1px bottom border, centered text links with an ink underline on the current page, one small CTA at the right. Hamburger below 1024px. No mega-menus, no phone number in the bar (it is in the mobile menu, footer and closing band).
- **Hairline rows** replace cards: services list, specialties, FAQ, stats cells, process steps. Only two things are framed: the hero status board and the weekly report (`rounded-[28px]` tint frame, white inner panel with a 1px border).
- **Status pills**: Submitted = outline, In review = `tint-2`, Approved/Paid = `orange-ink` with white text.
- **Closing CTA**: pale tint band, centered, rendered by the footer so every page ends with it.

## Hero
Centered and calm: one outcome headline (the existing copy, no highlight), one sentence, ONE button, one muted trust line (`hero.reassurance` joined), then the status board of a SAMPLE practice, labelled "Sample practice, illustrative". No photo, carousel or video. Row labels are generic ("Provider A", "Claim batch"); never add real payer or client names, people, counts or amounts.

## Motion
- Hover 150 ms, UI 250 ms, easing `cubic-bezier(.2,.7,.2,1)` (`--ease-out-soft`); `--ease-out-strong` `cubic-bezier(.16,1,.3,1)` for the board's fills.
- **One orchestrated moment**: the status board. On first view the frame fades up (0.9 s), then each row in turn (0.45 s apart) moves its pill Submitted → In review and fills its track; rows marked `done` continue to Approved/Paid 1.6 s later. About 5 s in total, once, then it holds. Some rows deliberately stop at In review. Pure CSS; `MotionObserver` only holds it until it is visible (phones).
- Nothing else moves: no section reveals, parallax, marquee, count-ups, scroll progress or hover lifts.
- `prefers-reduced-motion`: the board shows its end state and nothing animates. Without JS it plays on load.

## Accessibility
Visible focus rings (2px ink on light, orange on ink), labels on every input, 16px body, `aria-hidden` on the animated pills with an `sr-only` end-state status, real `<table>` for the weekly report, "Learn more" links carry an `sr-only` "about {service}" suffix. Do not use the single-word "Learn more" without context elsewhere.
