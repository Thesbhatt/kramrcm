# Components and routes map

Use this to find the right file without opening the whole `src/` tree.

## Routes (`src/app/`, same URLs as the live site)
| URL | File | Sections it renders |
|---|---|---|
| `/` | `page.tsx` | HomeHero, Statement, ServiceCards, Stats, Process, Why, SpecialtiesPreview, Faq (see the file for order) |
| `/about-us` | `about-us/page.tsx` | PageHero, Stats, Why, plus inline mission/values (uses `about` in content) |
| `/services` | `services/page.tsx` | PageHero, per-service blocks (anchors `#credentialing #billing #licensing`), Process, Faq |
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
| `sections/service-cards.tsx`, `process.tsx`, `stats.tsx`, `why.tsx`, `specialties-preview.tsx`, `faq.tsx` | reusable sections; read their data from `src/content/site.ts` |
| `sections/contact-form.tsx` | the only form |

## Styling hooks in `src/app/globals.css`
`@theme` tokens (colours, radii, easing) · `.hl` keyword highlight · `.statement-word` + `word-ink` · `header-compact` · `.float-in`, `.tracker-row`, `ping` (hero cards) · `.menu-panel` · reduced-motion block at the end.

When adding a section: put copy in `src/content/site.ts` (see `docs/content-guide.md`), build the component in `sections/`, use tokens only, wrap in `reveal()`.
