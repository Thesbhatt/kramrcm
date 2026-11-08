# Components and routes map

Use this to find the right file without opening the whole `src/` tree.

## Routes (`src/app/`, same URLs as the live site except the new `/cost-calculator`)
| URL | File | Sections it renders |
|---|---|---|
| `/` | `page.tsx` | HomeHero, Stats (`tone="strip"`), Statement, AboutIntro, ServiceCards, Process (peach band), BillingWhy, Testimonials (hidden, see below), SpecialtiesPreview, Why, Faq |
| `/about-us` | `about-us/page.tsx` | PageHero, mission (inline), Stats, BillingWhy, values (inline), Why (uses `about` in content) |
| `/services` | `services/page.tsx` | PageHero, one compact card per service (photo + title + one sentence + checklist; anchors `#credentialing #billing #licensing`), Process, Faq |
| `/specialties` | `specialties/page.tsx` | PageHero, featured + grouped specialties |
| `/cost-calculator` | `cost-calculator/page.tsx` | PageHero, DelayCost |
| `/contact-us` | `contact-us/page.tsx` | PageHero, ContactForm, Faq |
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
| `home/hero.tsx` | `HomeHero` (homepage only): server markup for the copy and icon tiles, tile placement in `layout` |
| `home/hero-carousel.tsx` | client: photo slides, caption, service tabs, pause button |
| `home/hero-pointer.tsx` | client: moves the server-rendered `[data-float]` tiles, photo and spotlight with the cursor |
| `sections/page-hero.tsx` | hero for inner pages |
| `sections/statement.tsx` | scroll-darkening statement |
| `sections/stats.tsx` | `tone="strip"` hairline proof bar (home, under hero) or `peach`/`stone` filled panel (About) |
| `sections/process.tsx` | full-width orange band (home + `/services`) with white numbered timeline that plays as a node → card → line sequence (horizontal desktop, vertical phone); `band={false}` for plain white |
| `sections/service-cards.tsx` | 3 image-free service cards with full item lists (home); exports `serviceIcons`, `servicePhotos` (photos are rendered only on `/services`) |
| `sections/process.tsx`, `stats.tsx`, `why.tsx`, `specialties-preview.tsx`, `faq.tsx` | reusable sections; read their data from `src/content/site.ts` |
| `sections/about-intro.tsx` | home "About us": one-sentence story, 3 icon pillars, overlapping client photos (main photo keeps its 19:16 shape so both people stay in frame). Copy in `aboutIntro` |
| `sections/billing-why.tsx` | "Why choose Kram for medical billing?": photo + copy + benefit chips (home + About). Copy in `billingWhy` |
| `sections/delay-cost.tsx` + `delay-calculator.tsx` | "cost of waiting" calculator (`/cost-calculator` only): server wrapper + small client island (sliders, tweened result). Copy in `delayCost` |
| `sections/testimonials.tsx` | client quotes from `testimonials` in `site.ts`. **Currently OFF** (`proof.enabled = false`, renders nothing in dev or prod). Once on: hidden in production while `testimonials` is empty; `npm run dev` shows labelled placeholders (`proof.placeholders`). Never invent quotes |
| `sections/contact-form.tsx` | the only form |

## Styling hooks in `src/app/globals.css`
`@theme` tokens (colours, radii, easing) · `.hl` keyword highlight · `.statement-word` + `word-ink` · `header-compact` · `.hero-slide`, `.hero-scrim`, `.hero-progress-fill`, `.hero-float`, `.hero-chip`, `.hero-spot` (home hero) · `.band-corners-orange` / `.band-corners-ink` (diagonal corner glows on the Process and Why bands) · `hl-sweep` (highlight marker) · `.range` (calculator sliders) · `.menu-panel` · header nav: `.nav-glider`, `.nav-item-in`, `.nav-link` + `.nav-icon`, `.call-pill`, `.cta-shine`, `.logo-link` · motion hooks: `.photo` (on a `[data-reveal]` frame: wipe, zoom, parallax), `.scroll-frame` + `.parallax-img`, `.drift-up`, `.cascade` (needs `--i`), `.tick`, `.pop`, `.bob`, `.closing-card`, `.scroll-progress`, `.flow-step` / `.flow-node` / `.flow-line` / `.flow-fill` / `.flow-card` (process timeline sequence) · reduced-motion block at the end (scroll-linked hooks must be listed there by name).

When adding a section: put copy in `src/content/site.ts` (see `docs/content-guide.md`), build the component in `sections/`, use tokens only, wrap in `reveal()`.
