# Design system

**Direction v2 (Nov 7 2026), replaces the dark-hero/serif v1 board in `design/ui-direction.html`.**
Reference chosen by the client: Dribbble "Healthcare Website Design" (https://dribbble.com/shots/25541388). We borrow its layout grammar, not its content:
- The page is a rounded white canvas (28px radius) on a warm `canvas` backdrop; the footer is a dark rounded card below it.
- Big sans headlines (Public Sans 500, tracking −0.035em) with ONE keyword in a solid `orange` highlight pill (`.hl`, `<Highlight>`).
- Pill buttons: primary = `ink` with white text; secondary = `orange` with dark text.
- Hero: copy left, rounded gradient visual right with floating white cards; bottom-left proof cluster (stacked circles + stat) and a "partner" prompt pill.
- Centered statement section whose words darken on scroll (CSS view timeline).
- Cards are flat `stone` fills, 20–32px radius, no borders; one dark card per row for rhythm.
- Real multi-page site matching the live URLs: `/`, `/about-us`, `/services`, `/specialties`, `/contact-us`.
- Photography: full-bleed photo inside the rounded hero card, floating white cards at the bottom (never over faces). Placeholder Unsplash photos live in `src/assets/photos/` (sources in `CREDITS.md`), loaded via static import + `next/image` (AVIF → WebP). TODO(client): replace with their own team/office photos.

Tokens live in `src/app/globals.css` (`@theme`).

## Colour (sampled from client logo files, Nov 7 2026)
| Token | Hex | Source / use |
|---|---|---|
| `orange` | #F77C27 | Logo petals. Keyword highlights, secondary buttons, icon tiles and full bands, always with `fg`/`ink` text (`fg` 6.0:1). |
| `orange-ink` | #A83E08 | Orange text/links on light (5.6:1 on stone). |
| `orange-soft` | #FFA366 | Small orange text on ink (6.5:1), button hover. |
| `graphite` | #414546 | Exact logo X. Secondary text, icons on light. (The logo X is white on dark surfaces.) |
| `ink` | #2F3336 | Logo charcoal, deepened to match the 3D logo. Primary pills, footer, dark bands (12.8:1 with white; solid `orange` 4.8:1). |
| `ink-2` / `ink-line` | #414546 / #5A5F62 | Raised surface on ink / hairlines on ink. Use `orange-soft`, not `orange`, for small text on `ink-2` (`orange` is 3.6:1). |
| `fg` | #1F2224 | Body text on light and on orange. |
| `muted` | #5B6063 | Secondary text on light (5.7:1 on stone). Fails on solid orange: use `fg` there (`SectionHeading tone="orange"`). |
| `on-ink` | #D6D8D9 | Body text on ink (8.9:1). |
| `canvas` | #FFDCBF | Backdrop around the white page frame. |
| `peach` / `peach-2` / `peach-line` | #FFC999 / #FFE7D2 / #FFCFA6 | Icon discs and photo placeholders / soft card fill / hairlines on peach-2. |
| `stone` | #F2F2F0 | Card fill on white (neutral grey). |
| `stone-2` | #E6E6E3 | Chips, hover. |
| `line` | #DCDCD9 | Borders on light. |
| `success` | #A83E08 | Functional only (same value as `orange-ink`; the palette has no green). |

**The palette is the logo: orange and grey only (client direction, Nov 8 2026). No blue, navy, or teal, including in shadows, gradients and status pills.** The one exception is form-error red `#B42318`, kept so errors read as errors.

Proportion (punchy revamp, Nov 8 2026): ~55% white/stone, 25% ink, 20% orange. Full-strength orange and charcoal surfaces carry the page instead of tints. Homepage rhythm: charcoal stats strip, charcoal featured card, one full-bleed orange band (Process), charcoal Why panel, charcoal footer.
Contrast rule: `#F77C27` on white = 2.67:1 → never for text on light, never white text on orange. Focus rings are `ink` on light and `orange` inside `.bg-ink`.

## Type
- One family: **Public Sans** (variable 400–700). Headlines 500 with tight negative tracking; body 400; UI 500. (Source Serif 4 was dropped in v2; its file in `src/fonts/` is unused.) Tabular numbers for stats (`tabular-nums`).
- Scale (desktop → mobile via clamp): Display 56→36, H2 40→30, H3 24→20, Body 18/28 (min 16), Small 15, Eyebrow 13 caps +0.08em.
- Line length ≤ 68ch. Headings `text-wrap: balance`.

## Motion
- Hover and UI: ease `cubic-bezier(.2,.7,.2,1)` (`--ease-out-soft`), 150 ms hover, 250 ms UI. Entrances: `cubic-bezier(.16,1,.3,1)` (`--ease-out-strong`), 850-950 ms; words and pops overshoot slightly with `--ease-back`.
- Patterns: section reveal (rise 40px + fade, service cards 72px), stat count-up, card hover lift (−3px + shadow + orange border), process line draw, header compacts on scroll (CSS scroll-driven animation, no JS), slow specialty marquee (pauses on hover).
- Enima-style additions (Nov 7 2026): headlines reveal word by word (`<Words>` / `<Highlight>` in `primitives.tsx`; 10px rise + fade, 55 ms stagger, capped at 14 words). Hero/page-hero headlines play on load (`.words-load`); section headings play on scroll (`[data-words]` + `MotionObserver`). Header drops in on load (`animate-drop`), the hero visual expands from an inset clip with a slow image settle (`animate-expand`, `animate-settle`).
- Knack-style additions (Nov 8 2026, reference https://knackrcm.com, rebuilt without GSAP): top scroll-progress bar on home; headline words rise from behind a mask (hero adds a 3D `rotateX`); the hero photo pans and zooms continuously (`.ken-burns`, 14 s) and its frame shrinks to 0.9 as it scrolls away; photos wipe up over a colour block, settle from a 1.3 zoom and drift on scroll (image only, ±9%); the Why panel and footer card grow in from 0.9; marquees also skew with scroll velocity; the About inset photo drifts against the main photo; list rows cascade, ticks draw, icon tiles and process nodes pop; hero cards and glows float gently; specialty marquees speed up with scroll velocity; the closing footer card lifts in. Service cards on the homepage have no photos (they stay on `/services`).
- No parallax on text, no spins or hard bounces (the `--ease-back` overshoot is the limit), no autoplay video, no carousels in the hero.
- `prefers-reduced-motion: reduce` → all motion off, content shown immediately.

## Components
Buttons: pill (full radius). Primary = `ink` bg + white text; secondary (`soft`) = `orange` bg + `fg`; on dark = orange or ghost. One primary CTA label site-wide: **"Book a free practice review"**; header uses **"Get in touch"**.
Cards: `stone` fill on white, 20–32px radius, no border, lift + soft shadow on hover.
Pills (status): Approved = solid `orange`, In review = `stone-2` grey, Docs needed = orange tint.
