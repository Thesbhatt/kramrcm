# Architecture and gotchas

Read this before touching build config, motion, the contact form or anything cache-related.

## Stack
- Next.js 16 App Router, TypeScript, `src/` dir, Turbopack. `cacheComponents` + `partialPrefetching` are on. For any unfamiliar Next API read `node_modules/next/dist/docs/` first (see `AGENTS.md`); do not rely on memory.
- Tailwind CSS v4, CSS-first: tokens live in `src/app/globals.css` under `@theme`. No `tailwind.config.js`.
- Fonts: Space Grotesk variable 300–700 (`src/fonts/SpaceGrotesk-latin-var.woff2`, `--font-space-grotesk`, Tailwind `font-display`) and Inter variable 100–900 (`src/fonts/Inter-latin-var.woff2`, `--font-inter`, `font-sans`). Latin subsets from the `@fontsource-variable/*` packages (OFL; licences next to the files), self-hosted via `next/font/local`. Do NOT switch to `next/font/google` (fails in the sandbox, adds a build-time network dependency).

## Cache Components
- `new Date()` and `Math.random()` are forbidden in prerendered server components. Use constants, e.g. `company.copyrightYear`.
- Server Components by default; `"use client"` only for real interactivity (today: `site/nav.tsx`, `ui/motion-observer.tsx`, `home/hero-carousel.tsx`, `sections/contact-form.tsx`, `sections/delay-calculator.tsx`).

## Motion (no animation library, keep it that way)
- Motion on this branch: hero load sequence (CSS), the hero photo carousel (client component, `setInterval` 1.5 s; CSS crossfade on `.hero-slide[data-state]`), one-time scroll reveals, count-up, and the hero **status board**. Details of the board: (`home/status-board.tsx`). It is pure CSS (`.board-row`, `.pill`, `.board-fill` in `globals.css`): each row waits `--t1` (set from its `--i`), moves Submitted to In review, and `data-end="done"` rows continue to Approved or Paid at `--t2`. Base styles are the START state; the `prefers-reduced-motion` block at the end of `globals.css` swaps in the END state with no animation.
- `ui/motion-observer.tsx` (the only page-level script, one `IntersectionObserver`) also sets `data-shown` on `[data-reveal]` blocks and `[data-stagger]` lists, numbers the stagger children (`--i`), and counts up `[data-count]` elements: they hold the real number in the HTML, are parked at 0 when JS starts, and are restored to the real value when done (`data-final`; `??=` because React Strict Mode runs the effect twice in dev). For the board it adds `data-play` once a third of the board is visible; until then `.js .board:not([data-play]) *` pauses its animations (`!important`, because the `animation` shorthands would otherwise reset `animation-play-state`). Without JS it plays on load.
- Reveal CSS is hidden-state-only under `.js` (set by an inline script in `layout.tsx`), so no-JS and crawlers see everything. Hover properties are listed (undelayed) in the reveal `transition` so revealed elements still ease on hover. Reduced motion shows everything immediately.
- Removed on this branch (still on `main`): two-way scroll-scrubbed entrances, marquee, scroll progress bar, hero video and carousel. `Highlight` is plain text (no pill).
- Render `<MotionObserver />` at the END of every page, never in the layout (a layout-level one races page hydration). A new page must too.
- Accessibility of the board: the animated pills are `aria-hidden`; an `sr-only` span carries the end-state status.
- Numbers and easing: see "Motion" in `docs/design-system.md`.

## Contact form
- Server Action `src/app/actions/contact.ts` posts to the Resend REST API with plain `fetch` (no SDK). Each submission sends two emails:
  1. **Lead** to `CONTACT_TO_EMAIL` (reply-to = the visitor). Must succeed: retried once on network errors, 429 and 5xx with an `Idempotency-Key`, and the form shows an error if it still fails.
  2. **Confirmation** to the visitor (reply-to = `company.email`), sent in `after()` so it never slows or fails the form; a failure is only logged. It never echoes free text the visitor typed (anti-abuse: the form must not relay arbitrary text to arbitrary addresses).
- Templates: `src/emails/contact.ts` (table layout, inline styles, web-safe fonts, colours mirror the tokens); copy in `contactEmails` in `site.ts`. The logo is embedded inline (`src/emails/logo.ts`, PNG via Resend `content_id`), so it shows before launch and in clients that block remote images.
- Without `RESEND_API_KEY` it logs the lead to the server console, so local dev works with no setup.
- Env vars (`.env.example`): `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (must be on a domain verified in Resend: `kramrcm.com`). Values are trimmed and wrapping quotes stripped, because the Vercel dashboard keeps quotes that `.env` drops (a quoted sender gets Resend 422). Server logs include Resend's error body.
- UI is `src/components/sections/contact-form.tsx` (client). It is the only form on the site and must keep the "no patient information" notice.

## Images
- `next/image` with static imports from `src/assets/photos/` (AVIF then WebP). Photo sources are in `src/assets/photos/CREDITS.md`. They are placeholders: `TODO(client)` for real photos.
- Compression is configured in `next.config.ts`: AVIF then WebP, `qualities: [70]` (every `<Image>` sets `quality={70}`; Next 16 coerces anything not in the allowlist), `deviceSizes` trimmed to 640–1920, and a 1-year `minimumCacheTTL` (static imports are content-hashed, so this is safe). Every `<Image>` must set an accurate `sizes` so phones download the small variant (measured: 640w AVIF ≈ 11 KB vs 193 KB source). Add `placeholder="blur"` (automatic for static imports), `loading="eager"` + `fetchPriority="high"` only for the above-the-fold image.
- New photo: drop a ≤1600 px-wide JPG in `src/assets/photos/` (1920 px for full-bleed home hero slides); do not commit multi-MB originals.

## Performance budget
- Keep homepage first-load JS small. After any large change run `npm run build` and compare the route table sizes.

## Commands
- `npm run dev` → http://localhost:3000
- `npm run build && npm start` → production check
- `npm run lint`
- In the Claude sandbox npm needs `npm_config_cache=$TMPDIR/npm-cache` (default `~/.npm` is not writable).
