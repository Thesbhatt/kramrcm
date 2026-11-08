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
| Header nav links, mobile menu, logo wordmark, footer column titles | Space Grotesk 400 (logo 600/700) | 16–18px, tracking −0.01em |
| Body | Inter 400 | 16px, line-height 1.6; muted text is `text-muted` |
| Buttons | Inter 600 | 11px, uppercase, tracking 0.04em |

Both fonts are latin-subset variable woff2 in `src/fonts` (OFL licences beside them), loaded by `next/font/local` in `layout.tsx` as `--font-space-grotesk` (`font-display`) and `--font-inter` (`font-sans`). The base layer in `globals.css` sets h1/h2/h3, so do not put `text-[clamp(...)]` on headings. Line length is at most 68ch; headings use `text-balance`.

Avoid: tracked-caps eyebrows over every heading, "A · B · C" dot strings, a single accented word in a headline (the old `<Highlight>` pill is now plain text), numbered markers anywhere except "How we work".

## Components
- **Buttons** (`ButtonLink` in `ui/primitives.tsx`): 4px radius, padding 13px 22px. `dark` and `soft` both render the filled ink button; `white` is the 1px ink outline; `ghost-dark` is the outline on ink. Primary label site-wide: "Book a free practice review"; header: "Get in touch".
- **Header**: white, 97px tall on desktop (72px on phones), 1px bottom border, centered Space Grotesk links, one small CTA at the right. One tint pill with an orange base bar rests behind the current page (also `aria-current`, full-ink text) and glides (400 ms) to the hovered or focused link, then returns; links drop in 60 ms apart on first load. In the mobile menu the current page is a tint row with an orange left bar and dot, and rows step in 40 ms apart. Hamburger below 1024px. No mega-menus, no phone number in the bar (it is in the mobile menu, footer and closing band).
- **Hairline rows** replace cards: services list, specialties, FAQ, stats cells, process steps. Only two things are framed: the hero status board and the weekly report (`rounded-[28px]` tint frame, white inner panel with a 1px border).
- **Status pills**: Submitted = outline, In review = `tint-2`, Approved/Paid = `orange-ink` with white text.
- **Closing CTA**: pale tint band, centered, rendered by the footer so every page ends with it.

## Hero
Split layout (Nov 8 2026): on the left, one outcome headline (the existing copy, no highlight; words rise from a mask on load), one sentence, ONE button and one muted trust line (`hero.reassurance` joined); on the right, a near-square rounded photo of two doctors reviewing a tablet. On phones everything stacks. The photo is a placeholder stock image (`hero.photo` in `site.ts`; TODO(client): their own photography).

The animated **status board** of a SAMPLE practice ("Sample practice, illustrative") is NOT in the hero any more: it is the right-hand visual of the "Every status, every week, in one report" section (`sections/product-preview.tsx`), where it plays once as it scrolls into view. Row labels are generic ("Provider A", "Claim batch"); never add real payer or client names, people, counts or amounts.

Home order: hero, "Trusted by" strip (hidden until real logos), stats band, services, how we work, "Every status, every week" with the board, specialties, FAQ, closing band.

(Nov 8 2026: the client first asked for no photo, then, after seeing the calm version, asked for a photo and animation across the site. The photo and the motion below are that later decision.)

## Motion
- Hover 150 ms, UI 250 ms, easing `--ease-out-soft`; entrances 0.85-1.1 s with `--ease-out-strong` `cubic-bezier(.16,1,.3,1)`.
- **Hero load sequence (CSS only, no JS)**: headline words rise from a mask (70 ms apart), then the sentence, button and trust line rise (120 ms apart), the photo opens from an inset clip while it settles from a 1.16 zoom (1.3 s / 2.2 s) and drifts slightly on scroll (`animation-timeline: view()` where supported), (the status board is further down the page and plays when it scrolls into view).
- **Status board** (in the "Every status, every week" section; it rises in with the section's reveal): each row, 0.45 s apart, moves its pill Submitted → In review and fills its track; `done` rows continue to Approved/Paid 1.6 s later. Once, then it holds. Held until a third of it is on screen, so it starts when the visitor reaches it.
- **Scroll reveals**: `reveal(delayMs)` on a block, `stagger` on a list/grid (children rise 90 ms apart, `--i` set by `MotionObserver`). Each plays once, 28 px rise + fade. Process steps also draw a hairline across the top of each column. Service rows shift and tint on hover; their arrow nudges.
- **Count-up** (`data-count`, plus `data-suffix`): stats band, About stats, specialties page aside, About timelines (`~45 days`). 1.7 s ease-out quart from 0; the real number is in the HTML.
- Not used: parallax on text, marquees, looping or bouncing motion, hover lifts.
- `prefers-reduced-motion`: everything is shown at once, nothing counts, the board shows its end state. Without JS everything is visible and the hero and board still play.

## Accessibility
Visible focus rings (2px ink on light, orange on ink), labels on every input, 16px body, `aria-hidden` on the animated pills with an `sr-only` end-state status, real `<table>` for the weekly report, "Learn more" links carry an `sr-only` "about {service}" suffix. Do not use the single-word "Learn more" without context elsewhere.
