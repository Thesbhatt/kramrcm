# Components and routes map

Use this to find the right file without opening the whole `src/` tree.

## Routes (`src/app/`, same URLs as the live site)
| URL | File | Sections it renders |
|---|---|---|
| `/` | `page.tsx` | HomeHero, Stats (`tone="strip"`), Statement, AboutIntro, ServiceCards, Process (peach band), BillingWhy, DelayCost, Testimonials (hidden, see below), SpecialtiesPreview, Why, Faq |
| `/about-us` | `about-us/page.tsx` | PageHero, mission (inline), Stats, BillingWhy, values (inline), Why (uses `about` in content) |
| `/services` | `services/page.tsx` | PageHero, one compact card per service (photo + title + one sentence + checklist; anchors `#credentialing #billing #licensing`), Process, Faq |
| `/specialties` | `specialties/page.tsx` | PageHero, featured + grouped specialties |
| `/contact-us` | `contact-us/page.tsx` | PageHero, ContactForm, Faq |
| n/a | `layout.tsx` | font, metadata template, white page frame, header, footer |
| n/a | `sitemap.ts`, `icon.svg`, `globals.css`, `actions/contact.ts` | |

Every page ends with `<MotionObserver />`.

## Shared pieces (`src/components/`)
| File | What it is |
|---|---|
| `ui/primitives.tsx` | `Container`, `Eyebrow`, `ButtonLink` (variants `dark` `soft` `white` `ghost-dark`; `/…` hrefs use next/link), `Highlight`, `SectionHeading`, `Icon` (+ `IconName`), `Arrow`, `Check`, `reveal()` |
| `ui/logo.tsx` | `LogoMark` (our SVG trace of the client mark; no vector from client yet) |
| `ui/motion-observer.tsx` | the only motion JS (reveal + count-up) |
| `site/header.tsx`, `site/nav.tsx` | header; nav is client (active link, mobile menu) |
| `site/footer.tsx` | footer with the closing CTA |
| `home/hero.tsx` | `HomeHero` (homepage only) |
| `sections/page-hero.tsx` | hero for inner pages |
| `sections/statement.tsx` | scroll-darkening statement |
| `sections/stats.tsx` | `tone="strip"` hairline proof bar (home, under hero) or `peach`/`stone` filled panel (About) |
| `sections/process.tsx` | full-width peach band with numbered timeline (horizontal desktop, vertical phone); `band={false}` for plain white |
| `sections/service-cards.tsx` | 3 service cards with client photos and full item lists; exports `serviceIcons`, `servicePhotos` (also used by `/services`) |
| `sections/process.tsx`, `stats.tsx`, `why.tsx`, `specialties-preview.tsx`, `faq.tsx` | reusable sections; read their data from `src/content/site.ts` |
| `sections/about-intro.tsx` | home "About us": short story, 3 pillars, overlapping client photos. Copy in `aboutIntro` |
| `sections/billing-why.tsx` | "Why choose Kram for medical billing?": photo + copy + benefit chips (home + About). Copy in `billingWhy` |
| `sections/delay-cost.tsx` + `delay-calculator.tsx` | "cost of waiting" calculator: server wrapper + small client island (sliders, tweened result). Copy in `delayCost` |
| `sections/testimonials.tsx` | client quotes from `testimonials` in `site.ts`. **Currently OFF** (`proof.enabled = false`, renders nothing in dev or prod). Once on: hidden in production while `testimonials` is empty; `npm run dev` shows labelled placeholders (`proof.placeholders`). Never invent quotes |
| `sections/contact-form.tsx` | the only form |

## Styling hooks in `src/app/globals.css`
`@theme` tokens (colours, radii, easing) · `.hl` keyword highlight · `.statement-word` + `word-ink` · `header-compact` · `.float-in`, `.tracker-row`, `ping`, `.status-flip` + `.row-flash` (hero cards) · `hl-sweep` (highlight marker) · `.range` (calculator sliders) · `.menu-panel` · reduced-motion block at the end.

When adding a section: put copy in `src/content/site.ts` (see `docs/content-guide.md`), build the component in `sections/`, use tokens only, wrap in `reveal()`.
