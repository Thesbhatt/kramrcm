# Design system

**Direction v2 (Nov 7 2026), replaces the dark-hero/serif v1 board in `design/ui-direction.html`.**
Reference chosen by the client: Dribbble "Healthcare Website Design" (https://dribbble.com/shots/25541388). We borrow its layout grammar, not its content:
- The page runs edge to edge on white with no outer frame or backdrop (client direction, Nov 8 2026); the footer is a full-width dark band below it.
- Big sans headlines (Geist 600, tracking −0.04em) with ONE keyword in a solid `orange` highlight pill (`.hl`, `<Highlight>`).
- Pill buttons: primary = `ink` with white text; secondary = `orange` with white text.
- Hero (rebuilt Nov 8 2026 to put proof on the first screen; a photo carousel the same day, then replaced by a looping background video at the client's request because the carousel still didn't feel live): full-bleed looping video over a poster photo with white copy over a charcoal scrim (at least 72% behind the text column), two buttons (`soft` + `ghost-dark`, because an `ink` pill disappears on the scrim), a row of three reassurance checks, a pause button, and the charcoal stats bar along the bottom. The one memorable element is the status chip inside the video ("Provider enrollment: In review → Approved"). No floating icons.
- Centered statement section whose words darken on scroll (CSS view timeline).
- Cards are flat `stone` fills, 20–32px radius, no borders; one dark card per row for rhythm.
- Real multi-page site matching the live URLs: `/`, `/about-us`, `/services`, `/specialties`, `/contact-us`.
- Photography: the hero copy sits over the left of the photo, so hero slides need their subject in the right half (`flip` mirrors a photo that has it on the left; avoid photos with legible text or name tags). Placeholder Unsplash photos live in `src/assets/photos/` (sources in `CREDITS.md`), loaded via static import + `next/image` (AVIF → WebP). TODO(client): replace with their own team/office photos.

Tokens live in `src/app/globals.css` (`@theme`).

## Colour (sampled from client logo files, Nov 7 2026)
| Token | Hex | Source / use |
|---|---|---|
| `orange` | #F77C27 | Logo petals. Keyword highlights, secondary buttons, icon tiles and full bands, always with white text (client direction, Nov 8 2026; 2.67:1, below WCAG AA). |
| `orange-ink` | #B84A0C | Orange text/links on light (4.66:1 on stone), `soft` button hover. |
| `orange-soft` | #FFA366 | Small orange text on ink (6.5:1). |
| `graphite` | #414546 | Exact logo X. Secondary text, icons on light. (The logo X is white on dark surfaces.) |
| `ink` | #2F3336 | Logo charcoal, deepened to match the 3D logo. Primary pills, footer, dark bands (12.8:1 with white; solid `orange` 4.8:1). |
| `ink-2` / `ink-line` | #414546 / #5A5F62 | Raised surface on ink / hairlines on ink. Use `orange-soft`, not `orange`, for small text on `ink-2` (`orange` is 3.6:1). |
| `fg` | #1F2224 | Body text on light. |
| `muted` | #5B6063 | Secondary text on light (5.7:1 on stone). Not for use on solid orange: text there is white (`SectionHeading tone="orange"`). |
| `on-ink` | #D6D8D9 | Body text on ink (8.9:1). |
| `peach` / `peach-2` / `peach-line` | #FFC999 / #FFE7D2 / #FFCFA6 | Icon discs and photo placeholders / soft card fill / hairlines on peach-2. |
| `stone` | #F2F2F0 | Card fill on white (neutral grey). |
| `stone-2` | #E6E6E3 | Chips, hover. |
| `line` | #DCDCD9 | Borders on light. |
| `success` | #B84A0C | Functional only (same value as `orange-ink`; the palette has no green). |

**The palette is the logo: orange and grey only (client direction, Nov 8 2026). No blue, navy, or teal, including in shadows, gradients and status pills.** The one exception is form-error red `#B42318`, kept so errors read as errors.

Proportion (punchy revamp, Nov 8 2026): ~55% white/stone, 25% ink, 20% orange. Full-strength orange and charcoal surfaces carry the page instead of tints. Homepage rhythm: charcoal stats strip, charcoal featured card, full-bleed orange band (Process), full-bleed charcoal band (Why), charcoal footer. Both bands carry soft glows in two diagonally opposite corners, mirrored against each other (`.band-corners-orange`: deep orange top left, peach bottom right; `.band-corners-ink`: orange top right, soft orange bottom left).
Contrast rule: `#F77C27` on white = 2.67:1 → never for text on light. White text on orange is the client's choice (Nov 8 2026) and is 2.67:1. Focus rings are `ink` on light and `orange` inside `.bg-ink`.

## Type
- One family: **Geist** (variable 100–900, 29 KB; chosen Nov 8 2026 for a sharper, more premium health-tech look; the old live site used Manrope). Headlines and big stat numbers 600 with −0.04em tracking (Geist is narrow, so tight tracking works; 500 looks thin on photos); body 400; UI 500. Geist has real tabular figures, so keep `tabular-nums` on every stat. Competitors seen: Waystar Montserrat, altermedrcm.com and medicalbillersandcoders.com Plus Jakarta Sans, credsagercm.com Instrument Serif + Manrope, knackrcm.com Fraunces + Poppins. Alternatives compared: Manrope, Bricolage Grotesque + Figtree, Fraunces + Plus Jakarta Sans, Newsreader + Instrument Sans (132 KB, heaviest), Red Hat, Wix Madefor, DM Serif Display, Funnel.
- Scale (desktop → mobile via clamp): Display 56→36, H2 40→30, H3 24→20, Body 18/28 (min 16), Small 15, Eyebrow 13 caps +0.08em.
- Line length ≤ 68ch. Headings `text-wrap: balance`.

## Motion
- Hover and UI: ease `cubic-bezier(.2,.7,.2,1)` (`--ease-out-soft`), 150 ms hover, 250 ms UI. Entrances: `cubic-bezier(.16,1,.3,1)` (`--ease-out-strong`), 850-950 ms; words and pops overshoot slightly with `--ease-back`.
- Patterns: section reveal (rise 40px + fade, service cards 72px), stat count-up, card hover lift (−3px + shadow + orange border), process timeline sequence (white nodes and line; each step 900 ms apart on desktop: node pops with one ripple, card rises 40px at +180 ms, line travels to the next node at +420 ms with a soft glowing head; on phones each step plays as it scrolls in), header compacts on scroll (CSS scroll-driven animation, no JS), slow specialty marquee (pauses on hover).
- Enima-style additions (Nov 7 2026): headlines reveal word by word (`<Words>` / `<Highlight>` in `primitives.tsx`; 10px rise + fade, 55 ms stagger, capped at 14 words). Hero/page-hero headlines play on load (`.words-load`); section headings play on scroll (`[data-words]` + `MotionObserver`). Header drops in on load (`animate-drop`), the hero visual expands from an inset clip with a slow image settle (`animate-expand`, `animate-settle`).
- Knack-style additions (Nov 8 2026, reference https://knackrcm.com, rebuilt without GSAP): top scroll-progress bar on home; headline words rise from behind a mask (hero adds a 3D `rotateX`); the hero photo pans and zooms continuously (`.ken-burns`, 14 s) and its frame shrinks to 0.9 as it scrolls away; photos wipe up over a colour block, settle from a 1.3 zoom and drift on scroll (image only, ±9%); the footer card grows in from 0.9; marquees also skew with scroll velocity; the About inset photo drifts against the main photo; list rows cascade, ticks draw, icon tiles and process nodes pop; hero cards and glows float gently; specialty marquees speed up with scroll velocity; the closing footer card lifts in. Service cards on the homepage have no photos (they stay on `/services`).
- Hero video (Nov 8 2026, `home/hero-video.tsx`, asset `public/video/hero-loop.mp4`, how it's built: `design/hero-video/README.md`): an 18 s seamless loop of four photo scenes (slow zoom and pan, 1 s dissolves), each with a status chip that flips from in progress to done. Chips are generic process states: never add client names, amounts or figures to them. The poster photo (slide 1, server-rendered, eager, LCP) paints first; the `<video>` mounts after hydration and fades in (700 ms) once playing, and only on screens of 768 px or wider with motion allowed and Data Saver off (phones and reduced-motion visitors keep the still photo, with no video download). It pauses when the hero is off screen and has a Pause/Play button (WCAG 2.2.2). No scroll parallax on it. Labels are `hero.video` in `site.ts`.
- Hero carousel (superseded by the video above, kept unused: `home/hero-carousel.tsx` and the "Home hero carousel" block of `globals.css`; delete both if the video stays) (Nov 8 2026): every 6.5 s the next photo wipes in from the right over the old one (1.15 s, `--ease-out-strong`, `clip-path`) while it settles from a 1.18 zoom to 1.04 (8 s, from the crop point). Previous wipes in from the left. The photo still drifts on scroll (`.parallax-img`, ±4%) on a wrapper around the slides, because the zoom and the drift both use `scale` and can't share an element. Controls (bottom right, above the stats bar): previous, five progress segments (the active one fills orange and is the autoplay clock: its `animationend` advances the slide), next, pause/play, "01 / 05". Autoplay stops on the Pause button, pointer hover or keyboard focus on the controls, the hero scrolled off screen, and `prefers-reduced-motion` (then slides change instantly and only by button). Slide 1 is the only one in the server HTML (eager, high priority, preloaded, visible without JS); slides 2-5 mount after page load + idle so they never compete with it. Per-slide alt text, crop (`focus`), `flip` and the control labels are in `hero.slides` / `hero.carousel` in `site.ts`.
- Hero stats bar (Nov 8 2026): `<Stats tone="hero" />` sits inside the hero, charcoal with orange numbers. It deliberately has no scroll reveal (a scroll-linked reveal would leave it half faded at the fold); the numbers still count up.
- Header nav (Nov 8 2026): links are plain text at rest and arrive on first load in a 50 ms stagger; each link's line icon shows only on the current, hovered or focused link, in a reserved slot so nothing shifts (client direction: keep the bar uncluttered). One peach pill rests on the current page and glides to the hovered or focused link (350 ms). On hover the icon pops in and redraws its stroke (450-550 ms one-shot). Below `xl`, phone and Get in touch are 44 px icon-only circles with `aria-label` and `title`; from `xl` up the phone circle widens to show the number and the CTA becomes a text pill ("Get in touch"). The phone circle fills with charcoal outward from the handset, which rings; the CTA circle gets a light sweep and its icon exits right and re-enters from the left; the logo mark scales to 1.1. Pointer effects sit behind `@media (hover: hover)`. Mobile menu rows step in at 35 ms.
- Two-way entrances (Nov 8 2026): every section entrance is tied to scroll position like the footer card. Scrolling down plays it forward, scrolling up plays it backward, stopping holds it. A block runs over 16vh of scroll from the moment its top touches the bottom of the viewport; staggers are scroll distance (`--stagger` × `--scrub-unit`, smaller on phones); words 1.2vh apart; the desktop process row 11vh per step. Hero headlines still play on load, and stats count up (replaying each time they arrive from below).
- No parallax on text, no spins or hard bounces (the `--ease-back` overshoot is the limit), no autoplay video.
- `prefers-reduced-motion: reduce` → all motion off, content shown immediately.

## Components
Buttons: pill (full radius). Primary = `ink` bg + white text; secondary (`soft`) = `orange` bg + white; on dark = orange or ghost. One primary CTA label site-wide: **"Book a free practice review"**; the header's orange icon circle is labelled **"Get in touch"** via `aria-label`.
Cards: `stone` fill on white, 20–32px radius, no border, lift + soft shadow on hover.
Pills (status): Approved = solid `orange`, In review = `stone-2` grey, Docs needed = orange tint.
