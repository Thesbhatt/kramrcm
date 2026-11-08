# Components and routes map

Use this to find the right file without opening the whole `src/` tree.

## Routes (`src/app/`, same URLs as the live site except the new `/cost-calculator`)
| URL | File | Sections it renders |
|---|---|---|
| `/` | `page.tsx` | HomeHero (static photo + stats bar), CredentialsRow, Statement, AboutIntro, ServiceCards, Results, Testimonials (hidden, see below), Process (orange band), Deadlines, CalculatorPromo, BillingWhy, Systems, SpecialtiesPreview, Why, Faq (4). CredentialsRow, Results and Systems render nothing until `trust` has real data |
| `/about-us` | `about-us/page.tsx` | PageHero, mission (inline), Leadership (hidden until `trust.leaders` has data), Stats, BillingWhy, values (inline), Why (uses `about` in content) |
| `/services` | `services/page.tsx` | PageHero, one compact card per service (photo + title + one sentence + checklist; anchors `#credentialing #billing #licensing`), Process, Faq |
| `/specialties` | `specialties/page.tsx` | PageHero, featured + grouped specialties |
| `/cost-calculator` | `cost-calculator/page.tsx` | PageHero, DelayCost |
| `/contact-us` | `contact-us/page.tsx` | PageHero, ContactForm, Faq |
| any unknown URL | `not-found.tsx` | branded 404 on white (copy in `notFound`); Next adds the 404 status and noindex |
| n/a | `layout.tsx` | font, metadata template, full-bleed page wrapper, header, footer |
| n/a | `sitemap.ts`, `icon.svg`, `globals.css`, `actions/contact.ts` | |

Every page ends with `<MotionObserver />`.

## Shared pieces (`src/components/`)
| File | What it is |
|---|---|
| `ui/primitives.tsx` | `Container`, `Eyebrow`, `ButtonLink` (variants `dark` `soft` `white` `ghost-dark`; `/…` hrefs use next/link), `Highlight`, `SectionHeading`, `Icon` (+ `IconName`), `Arrow`, `Check`, `reveal()` |
| `ui/logo.tsx` | `LogoMark` (our SVG trace of the client mark; no vector from client yet) |
| `ui/motion-observer.tsx` | the only motion JS (count-up, marquee speed, and two-way reveal for browsers without scroll timelines) |
| `site/header.tsx`, `site/nav.tsx` | header; nav is client (active link, gliding pill, mobile menu). Nav icons are set per item in `nav` in `site.ts` |
| `site/footer.tsx` | footer with the closing CTA |
| `home/hero.tsx` | `HomeHero` (homepage only), a Server Component: one static photo (`hero.photoFocus` sets the crop) under `.hero-scrim`, copy, two buttons, reassurance checks, and `<Stats tone="hero" />` along the bottom |
| `ui/marquee-toggle.tsx` | client: pause/play button for the specialty marquee (sets `data-paused` on every `.marquee`); shown only with JS and not under reduced motion. Labels in `marquee` |
| `sections/page-hero.tsx` | hero for inner pages |
| `sections/statement.tsx` | scroll-darkening statement |
| `sections/stats.tsx` | `tone="hero"` charcoal bar at the bottom of the home hero (no reveal, so it is never half faded at the fold); `peach`/`stone` filled panel (About); `strip` standalone bar (currently unused) |
| `sections/process.tsx` | full-width orange band (home + `/services`) with white numbered timeline that plays as a node → card → line sequence (horizontal desktop, vertical phone); `band={false}` for plain white |
| `sections/service-cards.tsx` | 3 image-free service cards with full item lists (home); exports `serviceIcons`, `servicePhotos` (photos are rendered only on `/services`) |
| `sections/process.tsx`, `stats.tsx`, `why.tsx`, `specialties-preview.tsx`, `faq.tsx` | reusable sections; read their data from `src/content/site.ts` |
| `sections/about-intro.tsx` | home "About us": one-sentence story, 3 icon pillars, overlapping client photos (main photo keeps its 19:16 shape so both people stay in frame). Copy in `aboutIntro` |
| `sections/billing-why.tsx` | "Why choose Kram for medical billing?": photo + copy + benefit chips (home + About). Copy in `billingWhy` |
| `sections/delay-cost.tsx` + `delay-calculator.tsx` | "cost of waiting" calculator (`/cost-calculator` only): server wrapper + small client island (sliders, tweened result). Copy in `delayCost` |
| `sections/testimonials.tsx` | client quotes from `testimonials` in `site.ts`. **Currently OFF** (`proof.enabled = false`, renders nothing in dev or prod). Once on: hidden in production while `testimonials` is empty; `npm run dev` shows labelled placeholders (`proof.placeholders`). Never invent quotes |
| `sections/credentials-row.tsx`, `results.tsx`, `systems.tsx`, `leadership.tsx` | trust sections, all read `trust` in `site.ts`. Each renders nothing while its list is empty. `trust.preview = true` shows labelled placeholders in `npm run dev` only. Never invent entries |
| `sections/deadlines.tsx` | CAQH / Medicare / DMEPOS renewal cards (public rules; no client data needed). Copy in `deadlines` |
| `sections/calculator-promo.tsx` | stone band linking to `/cost-calculator`. Copy in `calculatorPromo` |
| `sections/contact-form.tsx` | the only form. Consent line links to the Privacy Policy only once `legal` has its `href` |

## Styling hooks in `src/app/globals.css`
`@theme` tokens (colours, radii, easing) · `.hl` keyword highlight · `.statement-word` + `word-ink` · `header-compact` · `.hero-scrim` (home hero) · `.band-corners-orange` / `.band-corners-ink` (diagonal corner glows on the Process and Why bands) · `hl-sweep` (highlight marker) · `.range` (calculator sliders) · `.menu-panel` · header nav: `.nav-glider`, `.nav-item-in`, `.nav-link` + `.nav-icon`, `.call-pill`, `.cta-shine`, `.logo-link` · motion hooks: `.photo` (on a `[data-reveal]` frame: wipe, zoom, parallax), `.scroll-frame` + `.parallax-img`, `.drift-up`, `.cascade` (needs `--i`), `.tick`, `.pop`, `.bob` (unused, kept), `.marquee[data-paused]`, `.closing-card`, `.scroll-progress`, `.flow-step` / `.flow-node` / `.flow-line` / `.flow-fill` / `.flow-card` (process timeline sequence) · reduced-motion block at the end (scroll-linked hooks must be listed there by name).

When adding a section: put copy in `src/content/site.ts` (see `docs/content-guide.md`), build the component in `sections/`, use tokens only, wrap in `reveal()`.
