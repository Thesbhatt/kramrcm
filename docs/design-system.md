# Design system

**Direction v2 (Nov 7 2026), replaces the dark-hero/serif v1 board in `design/ui-direction.html`.**
Reference chosen by the client: Dribbble "Healthcare Website Design" (https://dribbble.com/shots/25541388). We borrow its layout grammar, not its content:
- The page is a rounded white canvas (28px radius) on a warm `canvas` backdrop; the footer is a dark rounded card below it.
- Big sans headlines (Public Sans 500, tracking −0.035em) with ONE keyword in a soft `peach` highlight pill (`.hl`, `<Highlight>`).
- Pill buttons: primary = `ink` with white text; secondary = `peach` with dark text.
- Hero: copy left, rounded gradient visual right with floating white cards; bottom-left proof cluster (stacked circles + stat) and a "partner" prompt pill.
- Centered statement section whose words darken on scroll (CSS view timeline).
- Cards are flat `stone` fills, 20–32px radius, no borders; one dark card per row for rhythm.
- Real multi-page site matching the live URLs: `/`, `/about-us`, `/services`, `/specialties`, `/contact-us`.
- Photography: full-bleed photo inside the rounded hero card, floating white cards at the bottom (never over faces). Placeholder Unsplash photos live in `src/assets/photos/` (sources in `CREDITS.md`), loaded via static import + `next/image` (AVIF → WebP). TODO(client): replace with their own team/office photos.

Tokens live in `src/app/globals.css` (`@theme`).

## Colour (sampled from client logo files, Nov 7 2026)
| Token | Hex | Source / use |
|---|---|---|
| `orange` | #F77C27 | Logo petals. Buttons (with dark text), highlights, icons on dark. |
| `orange-ink` | #A9490C | Orange text/links on light (5.2:1 on stone). |
| `orange-soft` | #FBA066 | Orange text on ink (7.3:1). |
| `graphite` | #414546 | Logo X mark. Secondary text, icons (9.7:1 on white). |
| `ink` | #23282B | Darkest surface: hero, footer, dark bands (14.9:1 with white). |
| `ink-2` | #2D3337 | Raised surface on ink (cards in dark bands). |
| `fg` | #1C2023 | Body text on light. |
| `muted` | #5E6366 | Secondary text on light (5.4:1 on stone). |
| `canvas` | #F6ECE2 | Backdrop around the white page frame. |
| `peach` / `peach-2` | #FDE6D3 / #FFF3EA | Keyword highlight + soft buttons / soft card fill. |
| `stone` | #F6F4F1 | Card fill on white. |
| `stone-2` | #ECE8E4 | Chips, alternate bands. |
| `line` | #E2DED9 | Borders on light. |
| `success` | #1D6F66 | Functional only ("Approved", form success). |

Proportion: ~60% stone/white, 25% ink, 10% white cards, 5% orange.
Contrast rule: `#F77C27` on white = 2.67:1 → never for text on light, never white text on orange.

## Type
- One family: **Public Sans** (variable 400–700). Headlines 500 with tight negative tracking; body 400; UI 500. (Source Serif 4 was dropped in v2; its file in `src/fonts/` is unused.) Tabular numbers for stats (`tabular-nums`).
- Scale (desktop → mobile via clamp): Display 56→36, H2 40→30, H3 24→20, Body 18/28 (min 16), Small 15, Eyebrow 13 caps +0.08em.
- Line length ≤ 68ch. Headings `text-wrap: balance`.

## Motion
- Ease `cubic-bezier(.2,.7,.2,1)` everywhere. 150 ms hover, 250 ms UI, 600 ms reveal, 70 ms stagger.
- Patterns: section reveal (rise 16px + fade), stat count-up, card hover lift (−3px + shadow + orange border), process line draw, header compacts on scroll (CSS scroll-driven animation, no JS), slow specialty marquee (pauses on hover).
- No parallax on text, no bounces/spins, no autoplay video, no carousels in the hero.
- `prefers-reduced-motion: reduce` → all motion off, content shown immediately.

## Components
Buttons: pill (full radius). Primary = `ink` bg + white text; secondary = `peach` bg + `fg`; on dark = white or ghost. One primary CTA label site-wide: **"Book a free practice review"**; header uses **"Get in touch"**.
Cards: `stone` fill on white, 20–32px radius, no border, lift + soft shadow on hover.
Pills (status): Approved = success tint, In review = blue tint, Docs needed = orange tint.
