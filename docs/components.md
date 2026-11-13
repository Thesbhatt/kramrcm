# Components and routes map

Use this to find the right file without opening the whole `src/` tree.

## Routes (`src/app/`, same URLs as the live site except the new `/cost-calculator`)
| URL | File | Sections it renders |
|---|---|---|
| `/` | `page.tsx` | HomeHero (split copy/photo + floating status chips), SpecialtyMarquee, TrustedBy (renders nothing until `trust.logos` has real logos), Stats, PayerMarquee ("We work with all major payers", client request Nov 12 2026), ServiceList, ClaimAnatomy, CalculatorShowcase (live mini calculator), SpecialtiesPreview, Process (01 to 04), ProductPreview (copy + animated status board), Faq (4). The closing CTA band and footer come from the layout |
| `/about-us` | `about-us/page.tsx` | PageStage + ClaimSheet, mission (lead paragraph + photo collage, inline), Stats, values bento (inline), Leadership (hidden until `trust.leaders` has data), BillingWhy, Why |
| `/services` | `services/page.tsx` | PageStage + CycleRing, ServiceChapters (one full-width chapter per service: sticky intro, sample dashboard, capability grid; anchors `#credentialing #billing #licensing`), Process, Faq |
| `/specialties` | `specialties/page.tsx` | PageStage + SpecialtyDial, featured bento, SpecialtyExplorer (search + category filter, `#explorer`), orange banner |
| `/cost-calculator` | `cost-calculator/page.tsx` | PageStage + AgingChart (A/R-aging bars), DelayCost (sliders + result card with days track, then typical enrollment timelines on a gray band) |
| `/contact-us` | `contact-us/page.tsx` | PageStage + ReviewCard, channel cards (call, email), 3-step "What happens next" on a tint band, orange band (headline + doctor cutout `contact-doctor.webp` left, ContactForm right), Faq |
| `/privacy-policy`, `/terms-of-use` | `privacy-policy/page.tsx`, `terms-of-use/page.tsx` | `LegalPage` (PageHero + sticky contents + numbered sections). Copy: `src/content/legal.ts`; footer links come from `legal` in `site.ts` |
| any unknown URL | `not-found.tsx` | branded 404 on white (copy in `notFound`); Next adds the 404 status and noindex |
| n/a | `layout.tsx` | fonts (Space Grotesk + Inter), metadata template, header, page wrapper, footer |
| n/a | `sitemap.ts`, `icon.png` (K mark), `globals.css`, `actions/contact.ts` | |

Every page ends with `<MotionObserver />`.

## Shared pieces (`src/components/`)
| File | What it is |
|---|---|
| `ui/primitives.tsx` | `Container` (1200px), `Eyebrow` (plain small text), `ButtonLink` (variants `dark`/`soft` = filled ink, `white` = outline, `ghost-dark` = outline on ink; `/…` hrefs use next/link), `SectionHeading`, `Icon` (+ `IconName`), `Arrow`, `Check`. `reveal(delayMs)` (scroll reveal attrs), `stagger` (list stagger attrs), `Words` (masked word rise, hero h1 only) and `Highlight` (plain text, no pill) |
| `ui/pointer-glow.tsx` | client, rendered once in the layout (the footer bands live there): a soft light follows the mouse inside `.hero-diag`, `.band-glow` and `.band-glow-ink` sections via `--mx/--my/--ga`; fine pointers only, off under reduced motion |
| `ui/cutout.tsx` | `Cutout`: a transparent-WebP clinician that rises into place and blooms a soft light behind it once on first view. Used on orange bands: home services (duo, pinned to the screen bottom on desktop), closing CTA (glasses only, `xl` only; the right-hand pair was removed), specialties banner (phone doctor, head pops above the banner), calculator hero (desk). The contact band uses a plain `Image` of `contact-doctor.webp`. Cutouts were lifted from the stock photos with macOS Vision (see CREDITS.md) |
| `ui/logo.tsx` | `LogoMark` (our SVG trace of the client mark; no vector from client yet) |
| `ui/motion-observer.tsx` | client; the only page-level script: scroll reveals (`data-shown`), stagger index, count-up (`data-count`), and holds the status board until visible (`data-play`) |
| `site/header.tsx`, `site/nav.tsx` | white 97px header, centered links, one CTA. `nav.tsx` is client: sliding `.nav-glider` orange bar (no fill) under the current/hovered link, mobile menu with active-row bar |
| `site/footer.tsx` | closing CTA band (orange) + gray footer; on every page |
| `home/hero.tsx` | `HomeHero`: split layout. Left: headline (masked words), sentence, one button, muted trust line. Right: `HeroCarousel` (photos in `hero.slides`). No status board here |
| `home/hero-visual.tsx` | client: the hero photo frame + `HeroCarousel` + two floating light status chips (Provider enrollment In review → Approved, Claim, State license, Weekly status report; `hero.chips`) that flip in-progress → done on every slide. Ported from the main-branch video hero |
| `home/hero-carousel.tsx` | client: crossfading hero photo carousel (every 1.5 s, fade + slight zoom settle). Pause/Play button, decorative position dots, autoplay off for reduced motion / hidden tab / off screen. Slide 1 is server-rendered; labels in `hero.carousel` |
| `home/board-replay.tsx` | client "Replay" button that restarts the status board sequence (`.board-reset`) |
| `home/status-board.tsx` | the framed "Practice status board" of a SAMPLE practice, used in `product-preview.tsx`; CSS-only sequence started by `MotionObserver` when visible (see `docs/architecture.md`). Data: `statusBoard` in `site.ts` |
| `sections/trusted-by.tsx` | "Trusted by" logo strip; renders nothing while `trust.logos` is empty (TODO(client)) |
| `sections/service-list.tsx` | home services: orange band, headline + animated duo cutout left, white card right with the three services (icon, title, sentence, item list, "Learn more"). Was hairline rows: icon tile (`serviceIcons`), title, sentence, the service's full item list (same labels as `/services`, check marks) and "Learn more →" (links to `/services#id`). Copy: `servicesSection` + `services` |
| `sections/claim-anatomy.tsx` | Home, after services: "Anatomy of a clean claim". A sample claim form (illustrative) beside five checks; hovering or focusing a check lights its field via CSS `:has` (`.anat*` in `globals.css`), and fields scan once on first view. Copy: `claimAnatomy` |
| `sections/stats.tsx` | orange stats band (white numerals): 4 cells, real numbers from `stats`, counted up on first view. No props |
| `sections/process.tsx` | tinted cards (icon tile, watermark numeral) under the journey track, numbered 01 to 04 "How we work" (home + `/services`). Copy: `processSection` + `process` |
| `sections/product-preview.tsx` | "Every status, every week, in one report": copy left, the animated `StatusBoard` right. Copy: `productSection` |
| `sections/payers.tsx` | `PayerMarquee` (home, after Stats): "We work with all major payers" headline + two rows of payer-name cards on the `.marquee` pattern, own pause button, sr-only list. Copy and names in `payers` (site.ts); logo cards from `public/payers` (Wikimedia/Wikipedia files, added Nov 13 2026) with a text-wordmark fallback for payers that have no file (Medicaid, Innovation Health, Johns Hopkins EHP, CareFirst) |
| `sections/specialties-preview.tsx` | exports `SpecialtiesPreview` (home, after Services: "Know-how across [50] specialties", orange `.hl` number, six featured cards) and `SpecialtyMarquee` (home, right under the hero: two-row marquee of every specialty + `ui/marquee-toggle.tsx` pause button). Ported from `main`. Also exports `featuredIcons` / `groupIcons` used by the specialties page |
| `sections/faq.tsx` | hairline accordion (`<details>`); copy: `faqSection` + `faqs` |
| `sections/page-stage.tsx`, `stage-visuals.tsx` | `PageStage`: immersive hero for About/Services/Specialties (home hero atmosphere + a visual on the right). Visuals: `AgingChart` (calculator), `ReviewCard` (contact), `ClaimSheet` (claim form fills, ticks, stamped), `CycleRing` (revenue-cycle ring), `SpecialtyDial` (category dial + count-up). CSS one-shots (`.cyc-*`, `.dial-*`, `.sheet-*` in `globals.css`); copy in `aboutPage`/`servicesPage`/`specialtiesPage` |
| `sections/service-chapters.tsx`, `specialty-explorer.tsx` | Services chapters with sample dashboards (generic, labeled illustrative); client search/filter for all 50 specialties (all tiles in server HTML) |
| `sections/page-hero.tsx` | hero for inner pages (left-aligned h1, breadcrumb) |
| `sections/service-cards.tsx` | cards with photos used on `/services`; exports `serviceIcons`, `servicePhotos` |
| `sections/why.tsx`, `billing-why.tsx`, `leadership.tsx` | About-page sections (inherit the new tokens; not redesigned) |
| `sections/delay-cost.tsx` + `delay-calculator.tsx` | "cost of waiting" calculator (`/cost-calculator` only): server wrapper + small client island. Copy: `delayCost` |
| `sections/testimonials.tsx` | client quotes from `testimonials`. **Currently OFF** (`proof.enabled = false`). Never invent quotes |
| `sections/credentials-row.tsx`, `results.tsx`, `systems.tsx` | trust sections reading `trust` in `site.ts`; render nothing while empty. **Not on the home page on this branch** |
| `sections/statement.tsx`, `about-intro.tsx`, `deadlines.tsx`, `calculator-promo.tsx` | **unused on this branch** (home-only sections dropped from the new rhythm; still on `main`). Delete or re-use as needed |
| `sections/contact-form.tsx` | the only form. Consent line links to the Privacy Policy only once `legal` has its `href` |

## Styling hooks in `src/app/globals.css`
`@theme` tokens (colours, fonts, easing) · base layer (body 16px/1.6 Inter, h1 400 / h2 300 Space Grotesk, focus rings) · hero entrance (`.hero-in`, `.w`, `.hero-photo`, `.hero-parallax`, carousel `.hero-slide[data-state]`) · reveals (`.js [data-reveal]`, `.js [data-stagger] > *`, `.rule`, legacy `.cascade` `.pop` `.tick` `.photo`) · status board: `.board`, `.board-row` (`--i`, `data-end`), `.pill` + `.st-1` `.st-2` `.st-3`, `.board-fill`, `.board-dot-2` `.board-dot-3`, `.js .board:not([data-play])` hold · `.nav-glider` / `.nav-item-in` (header nav) · `details.faq` accordion · `.range` (calculator sliders) · `.menu-panel` · reduced-motion block at the end (the board's end state lives there).

When adding a section: put copy in `src/content/site.ts` (see `docs/content-guide.md`), build the component in `sections/`, use tokens only, hairline rows instead of cards.
