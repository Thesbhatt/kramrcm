# Components and routes map

Use this to find the right file without opening the whole `src/` tree.

## Routes (`src/app/`, same URLs as the live site except the new `/cost-calculator`)
| URL | File | Sections it renders |
|---|---|---|
| `/` | `page.tsx` | HomeHero (centered copy + StatusBoard), TrustedBy (renders nothing until `trust.logos` has real logos), ServiceList, Stats, Process (01 to 04), ProductPreview (weekly report), SpecialtiesPreview, Faq (4). The closing CTA band and footer come from the layout |
| `/about-us` | `about-us/page.tsx` | PageHero, mission (inline), Leadership (hidden until `trust.leaders` has data), Stats, BillingWhy, values (inline), Why |
| `/services` | `services/page.tsx` | PageHero, one compact card per service (photo + title + one sentence + checklist; anchors `#credentialing #billing #licensing`), Process, Faq |
| `/specialties` | `specialties/page.tsx` | PageHero, featured + grouped specialties |
| `/cost-calculator` | `cost-calculator/page.tsx` | PageHero, DelayCost |
| `/contact-us` | `contact-us/page.tsx` | PageHero, ContactForm, Faq |
| any unknown URL | `not-found.tsx` | branded 404 on white (copy in `notFound`); Next adds the 404 status and noindex |
| n/a | `layout.tsx` | fonts (Space Grotesk + Inter), metadata template, header, page wrapper, footer |
| n/a | `sitemap.ts`, `icon.svg`, `globals.css`, `actions/contact.ts` | |

Every page ends with `<MotionObserver />`.

## Shared pieces (`src/components/`)
| File | What it is |
|---|---|
| `ui/primitives.tsx` | `Container` (1200px), `Eyebrow` (plain small text), `ButtonLink` (variants `dark`/`soft` = filled ink, `white` = outline, `ghost-dark` = outline on ink; `/…` hrefs use next/link), `SectionHeading`, `Icon` (+ `IconName`), `Arrow`, `Check`. `reveal(delayMs)` (scroll reveal attrs), `stagger` (list stagger attrs), `Words` (masked word rise, hero h1 only) and `Highlight` (plain text, no pill) |
| `ui/logo.tsx` | `LogoMark` (our SVG trace of the client mark; no vector from client yet) |
| `ui/motion-observer.tsx` | client; the only page-level script: scroll reveals (`data-shown`), stagger index, count-up (`data-count`), and holds the status board until visible (`data-play`) |
| `site/header.tsx`, `site/nav.tsx` | white 97px header, centered links with underline on the current page, one CTA. `nav.tsx` is client (active link, mobile menu) |
| `site/footer.tsx` | closing CTA band (pale tint) + ink footer; on every page |
| `home/hero.tsx` | `HomeHero`: centered headline (masked words), sentence, one button, muted trust line, team photo (`hero.photo`, parallax + settle) with `StatusBoard` overlapping its lower edge |
| `home/status-board.tsx` | the framed "Practice status board" of a SAMPLE practice; CSS-only sequence (see `docs/architecture.md`). Data: `statusBoard` in `site.ts` |
| `home/status-pill.tsx` | static `StatusPill` (Submitted / In review / Approved / Paid) used by the weekly report |
| `sections/trusted-by.tsx` | "Trusted by" logo strip; renders nothing while `trust.logos` is empty (TODO(client)) |
| `sections/service-list.tsx` | home services as hairline rows with "Learn more →" (links to `/services#id`). Copy: `servicesSection` + `services` |
| `sections/stats.tsx` | stats band: 4 hairline-separated cells, real numbers from `stats`, counted up on first view. No props |
| `sections/process.tsx` | numbered 01 to 04 "How we work" (home + `/services`). Copy: `processSection` + `process` |
| `sections/product-preview.tsx` | framed weekly status report for a SAMPLE practice (real `<table>`). Copy: `productSection` |
| `sections/specialties-preview.tsx` | home: six featured specialties in hairline cells + link to `/specialties`. Also exports `featuredIcons` / `groupIcons` used by the specialties page |
| `sections/faq.tsx` | hairline accordion (`<details>`); copy: `faqSection` + `faqs` |
| `sections/page-hero.tsx` | hero for inner pages (left-aligned h1, breadcrumb) |
| `sections/service-cards.tsx` | cards with photos used on `/services`; exports `serviceIcons`, `servicePhotos` |
| `sections/why.tsx`, `billing-why.tsx`, `leadership.tsx` | About-page sections (inherit the new tokens; not redesigned) |
| `sections/delay-cost.tsx` + `delay-calculator.tsx` | "cost of waiting" calculator (`/cost-calculator` only): server wrapper + small client island. Copy: `delayCost` |
| `sections/testimonials.tsx` | client quotes from `testimonials`. **Currently OFF** (`proof.enabled = false`). Never invent quotes |
| `sections/credentials-row.tsx`, `results.tsx`, `systems.tsx` | trust sections reading `trust` in `site.ts`; render nothing while empty. **Not on the home page on this branch** |
| `sections/statement.tsx`, `about-intro.tsx`, `deadlines.tsx`, `calculator-promo.tsx` | **unused on this branch** (home-only sections dropped from the new rhythm; still on `main`). Delete or re-use as needed |
| `sections/contact-form.tsx` | the only form. Consent line links to the Privacy Policy only once `legal` has its `href` |

## Styling hooks in `src/app/globals.css`
`@theme` tokens (colours, fonts, easing) · base layer (body 16px/1.6 Inter, h1 400 / h2 300 Space Grotesk, focus rings) · hero entrance (`.hero-in`, `.w`, `.hero-photo`, `.hero-parallax`) · reveals (`.js [data-reveal]`, `.js [data-stagger] > *`, `.rule`, legacy `.cascade` `.pop` `.tick` `.photo`) · status board: `.board`, `.board-row` (`--i`, `data-end`), `.pill` + `.st-1` `.st-2` `.st-3`, `.board-fill`, `.board-dot-2` `.board-dot-3`, `.js .board:not([data-play])` hold · `details.faq` accordion · `.range` (calculator sliders) · `.menu-panel` · reduced-motion block at the end (the board's end state lives there).

When adding a section: put copy in `src/content/site.ts` (see `docs/content-guide.md`), build the component in `sections/`, use tokens only, hairline rows instead of cards.
