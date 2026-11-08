# Architecture and gotchas

Read this before touching build config, motion, the contact form or anything cache-related.

## Stack
- Next.js 16 App Router, TypeScript, `src/` dir, Turbopack. `cacheComponents` + `partialPrefetching` are on. For any unfamiliar Next API read `node_modules/next/dist/docs/` first (see `AGENTS.md`); do not rely on memory.
- Tailwind CSS v4, CSS-first: tokens live in `src/app/globals.css` under `@theme`. No `tailwind.config.js`.
- Fonts: Space Grotesk variable 300–700 (`src/fonts/SpaceGrotesk-latin-var.woff2`, `--font-space-grotesk`, Tailwind `font-display`) and Inter variable 100–900 (`src/fonts/Inter-latin-var.woff2`, `--font-inter`, `font-sans`). Latin subsets from the `@fontsource-variable/*` packages (OFL; licences next to the files), self-hosted via `next/font/local`. Do NOT switch to `next/font/google` (fails in the sandbox, adds a build-time network dependency).

## Cache Components
- `new Date()` and `Math.random()` are forbidden in prerendered server components. Use constants, e.g. `company.copyrightYear`.
- Server Components by default; `"use client"` only for real interactivity (today: `site/nav.tsx`, `ui/motion-observer.tsx`, `sections/contact-form.tsx`, `sections/delay-calculator.tsx`).

## Motion (no animation library, keep it that way)
- This branch has one moment of motion: the hero **status board** (`home/status-board.tsx`). It is pure CSS (`.board-row`, `.pill`, `.board-fill` in `globals.css`): each row waits `--t1` (set from its `--i`), moves Submitted to In review, and `data-end="done"` rows continue to Approved or Paid at `--t2`. Base styles are the START state; the `prefers-reduced-motion` block at the end of `globals.css` swaps in the END state with no animation.
- No JS needed, but on a phone the board is below the fold, so `ui/motion-observer.tsx` (the only page-level script) adds `data-play` once a third of the board is visible; until then `.js .board:not([data-play]) *` pauses its animations (`!important`, because the `animation` shorthands would otherwise reset `animation-play-state`). Without JS it plays on load.
- Removed on this branch (still on `main`): scroll reveals (`data-reveal`, `data-words`; `reveal()`, `Words` and `Highlight` in `ui/primitives.tsx` are now inert/plain-text shims so old call sites compile), count-up, marquee, parallax, the scroll progress bar, the hero video and carousel.
- Render `<MotionObserver />` at the END of every page, never in the layout (a layout-level one races page hydration). A new page must too.
- Accessibility of the board: the animated pills are `aria-hidden`; an `sr-only` span carries the end-state status.
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
