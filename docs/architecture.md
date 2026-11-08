# Architecture and gotchas

Read this before touching build config, motion, the contact form or anything cache-related.

## Stack
- Next.js 16 App Router, TypeScript, `src/` dir, Turbopack. `cacheComponents` + `partialPrefetching` are on. For any unfamiliar Next API read `node_modules/next/dist/docs/` first (see `AGENTS.md`); do not rely on memory.
- Tailwind CSS v4, CSS-first: tokens live in `src/app/globals.css` under `@theme`. No `tailwind.config.js`.
- Font: Public Sans variable 400–700, self-hosted via `next/font/local` from `src/fonts/`. Do NOT switch to `next/font/google` (fails in the sandbox, adds a build-time network dependency). `SourceSerif4-600-display.woff2` is unused since Direction v2.

## Cache Components
- `new Date()` and `Math.random()` are forbidden in prerendered server components. Use constants, e.g. `company.copyrightYear`.
- Server Components by default; `"use client"` only for real interactivity (today: `site/nav.tsx`, `ui/motion-observer.tsx`, `sections/contact-form.tsx`, `sections/delay-calculator.tsx`, `ui/marquee-toggle.tsx`).

## Motion (no animation library, keep it that way)
- CSS plus one tiny client component, `src/components/ui/motion-observer.tsx`:
  - two-way scroll reveal via `data-reveal` (helper `reveal()` in `ui/primitives.tsx` builds the attributes). Entrances follow the scroll position in both directions, like the footer card: pure CSS scroll timelines where supported ("Two-way entrances" in `globals.css`), and where they aren't (Firefox today) the observer toggles `[data-shown]` both ways. Add `data-sequence` for a multi-second sequence; it only matters in that fallback, where it waits until the block's top is past 70% of the viewport
  - count-up via `data-count` (stats are real numbers in the HTML; JS only animates toward them). Time-based on purpose, so a stat never rests on a wrong number: it replays each time it arrives from below
- Gotcha: never wrap a `[data-reveal]` / `[data-words]` in an `overflow-hidden` or `overflow-auto` ancestor. That ancestor becomes the block's scroll container and the block stays invisible. Use `overflow-clip`. The block itself may be `overflow-hidden`.
- Gotcha: `MotionObserver` must not set `[data-shown]` where scroll timelines exist. Transitions outrank animations in the cascade, so the base-style change would override the scrub.
- Render `<MotionObserver />` at the END of every page, never in the layout (a layout-level one races page hydration). Each page already does this; a new page must too.
- Header surface compaction and the statement word-darkening are CSS scroll-driven animations (`header-compact`, `word-ink` in `globals.css`). No JS.
- `MotionObserver` also feeds scroll velocity into the `.marquee-track` CSS animations via `playbackRate` (positive only; a negative rate can end a young animation).
- Gotcha: `overflow: hidden` makes an element a scroll container, so a plain `view()` on anything inside it never progresses. Clipped frames publish a named timeline (`.scroll-frame`, `.photo` → `--frame`; `.closing-card` → `--closing`) and children read that. Parallax uses the individual `translate`/`scale` properties so it composes with `transform` reveals.
- Reveal starts visible if JS is off. Everything honours `prefers-reduced-motion` (rules at the bottom of `globals.css`).
- Numbers and easing: see "Motion" in `docs/design-system.md`.

## Contact form
- Server Action `src/app/actions/contact.ts` posts to the Resend REST API with plain `fetch` (no SDK).
- Without `RESEND_API_KEY` it logs the lead to the server console, so local dev works with no setup.
- Env vars (`.env.example`): `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
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
