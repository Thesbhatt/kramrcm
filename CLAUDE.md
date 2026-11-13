@AGENTS.md

# Kram Healthcare website

Marketing site for **Kram RCM** (renamed from Kram Healthcare, Nov 10 2026; the domain stays kramhealthcare.com; public email is info@kramrcm.com since Nov 12 2026), a US provider-credentialing, medical-billing (RCM) and licensing company. Audience: US practice owners, practice managers, billing leads. Revamp of https://kramhealthcare.com. Goal: a top-tier US health-tech look (calm, fast, sparse motion); also a portfolio piece. **This branch (`design/medallion-style`) is the Medallion-style revamp; `main` keeps the video-hero / Geist version as the fallback.**

Stack in one line: Next.js 16 App Router + TypeScript + Tailwind v4 (CSS-first) + Cache Components, no animation library.

## Where to look (load only what the task needs)
Research is DONE. Do not re-fetch competitor sites or redo font/colour research unless asked.

| If the task is about… | Read | Do NOT bulk-read |
|---|---|---|
| Copy, FAQ, stats, specialties, nav, contact info | `docs/content-guide.md`, then `src/content/site.ts` | components |
| Colours, type, spacing, buttons, cards, motion values | `docs/design-system.md` | `design/ui-direction.html` (v1, superseded, 74 KB) |
| Finding a component, page or CSS hook | `docs/components.md` | the whole `src/` tree |
| Build config, motion JS, contact form, Cache Components, images, commands | `docs/architecture.md` | |
| Compliance, competitor findings, what to include or avoid | `docs/research.md` | |
| What we still need from the client / `TODO(client)` | `docs/client-checklist.md` | |
| Logo files | `design/client-logo/Logo/*.png` (mark only, no vector yet) | |
| Any unfamiliar Next.js API | `node_modules/next/dist/docs/` | memory |

Task shortcuts:
- New page: copy a route in `components.md`, add to `nav` and `sitemap.ts`, end it with `<MotionObserver />`.
- New section: copy in `site.ts`, component in `src/components/sections/`, tokens only.
- Contact form change: `src/app/actions/contact.ts` + `sections/contact-form.tsx`.
- Testimonials: section is **hidden on purpose** (`proof.enabled = false` in `site.ts`) until the client sends real, approved quotes. Do not re-enable or delete it unless asked; to enable, fill `testimonials` and flip the flag.

## Hard rules (always apply)
- Server Components by default; `"use client"` only for real interactivity.
- Colours only via tokens (`bg-ink`, `text-orange-ink`, …). Logo orange `#F77C27` is 2.67:1 on light, so orange text on light uses `orange-ink`. Text on orange surfaces is white (client decision, Nov 8 2026: keep the logo orange despite 2.67:1). Primary buttons are filled logo orange with white text, 4px radius, small uppercase labels; secondary is a 1px gray (`ink`) outline; on orange bands use `light` (white) and `ghost-dark`. `ink` is now the logo's gray `#404045`, not near-black (client: the site felt too dark; palette is orange plus the logo gray). All text on orange surfaces is white (client dislikes black on orange); the `light` button is white with an orange label.
- Copy lives in `src/content/site.ts`, not in components. Never invent stats, testimonials, certifications or addresses: leave `TODO(client)`.
- Content must render without JS (stats are real numbers in HTML; reveals are hidden only once the `.js` class exists; the hero and status board play without JS).
- Respect `prefers-reduced-motion`. Motion (client asked for animation across the site, Nov 8 2026): hero load sequence, one-time scroll reveals (`reveal()` / `stagger` in `ui/primitives.tsx`, driven by `MotionObserver`), count-up on every numeric stat (`data-count`), and the hero status board. 150 ms hover, 250 ms UI, entrances 0.85-1.1 s with `cubic-bezier(.16,1,.3,1)`. No parallax on text, no looping motion, except the home specialties and payers marquees (client-requested: pausable, off under reduced motion). Details in `docs/design-system.md`.
- No animation library. `<MotionObserver />` goes at the END of every page, never in the layout.
- No `new Date()` / `Math.random()` in prerendered server components (use constants like `company.copyrightYear`).
- Fonts: Space Grotesk (headlines) + Inter (everything else), both self-hosted woff2 in `src/fonts` via `next/font/local` (OFL); never `next/font/google`. No Geist on this branch.
- WCAG 2.1 AA: visible focus rings, labels on every input, alt text, 16px+ body.
- US English and US formats ("Orthopedics", "(213) 832-7088").
- Never say "HIPAA certified". No Meta Pixel or ad trackers. Every form shows the "no patient information" notice.
- Images via `next/image` (AVIF/WebP). Keep homepage first-load JS small; check `npm run build` output after big changes.

## Commands
`npm run dev` (localhost:3000) · `npm run build && npm start` · `npm run lint`. In the Claude sandbox prefix npm with `npm_config_cache=$TMPDIR/npm-cache`.
