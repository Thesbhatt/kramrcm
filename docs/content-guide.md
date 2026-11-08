# Content guide (`src/content/site.ts`)

All copy lives in this one file (about 220 lines). Components read from it; never hard-code copy in a component. Use `grep -n "^export" src/content/site.ts` to jump.

| Export | Holds | Used by |
|---|---|---|
| `company` | name, tagline, `copyrightYear`, phone, email, `address` (null, TODO), hours (TODO), social links | header, footer, contact, about, specialties |
| `nav` | header/footer links | `site/nav.tsx`, footer |
| `cta` | the one primary CTA label and header label | buttons everywhere |
| `hero` | homepage hero copy, CTAs, reassurance checks, carousel slides (alt text, crop `focus`, `flip`) and control labels (`slides`, `carousel`) | `home/hero.tsx`, `home/hero-carousel.tsx` |
| `stats` | the 4 headline numbers (client must confirm, see checklist) | `sections/stats.tsx` |
| `services` | the 3 services; `items` are short labels only (matches the live site; no per-item explanations) | service cards, `/services` |
| `aboutIntro` | home "About us" block (live-site copy, tightened) | `sections/about-intro.tsx` |
| `billingWhy` | "Why choose Kram for medical billing?" (live-site copy, tightened) | `sections/billing-why.tsx` (home + About) |
| `closing` | footer closing CTA headline + line | `site/footer.tsx` |
| `process` | step list | `sections/process.tsx` |
| `specialties`, `featuredSpecialties`, `specialtyGroups` | the 50 specialties, featured subset, groups | specialties preview and page |
| `reasons`, `timelines` | "why choose us" cards; timeline bars (CAQH, PECOS, commercial; TODO(client)) | `sections/why.tsx` (home + about) |
| `faqs` | FAQ items | `sections/faq.tsx` |
| `contact` | contact page copy, form labels, consent line, `formTitle`/`submit`, optional `responseTime` and `bookingUrl` (both `null` until the client confirms) | contact page, `sections/contact-form.tsx` |
| `statement` | scroll-darkening statement | `sections/statement.tsx` |
| `about` | about page copy | `/about-us` |
| `trust` | credentials, billing metrics, case studies, EHR/PM systems, leaders: **all empty until the client supplies real, approved data**; `preview` flag (dev only) and `placeholders` | `sections/credentials-row.tsx`, `results.tsx`, `systems.tsx`, `leadership.tsx` |
| `deadlines` | CAQH / Medicare / DMEPOS renewal cards (public CMS and CAQH rules) | `sections/deadlines.tsx` |
| `calculatorPromo` | home band that links to the calculator | `sections/calculator-promo.tsx` |
| `notFound` | 404 page copy | `app/not-found.tsx` |
| `marquee` | pause/play labels for the specialty marquee | `ui/marquee-toggle.tsx` |
| `testimonials`, `proof` | client quotes (empty, TODO(client)); section copy, placeholders and the `enabled` switch (currently `false`, section hidden) | `sections/testimonials.tsx` (home) |

## Rules for content
- Never invent stats, testimonials, certifications, addresses or client names. Leave `TODO(client)` and add the item to `docs/client-checklist.md`.
- US English and US formats: "Orthopedics", "(213) 832-7088".
- One primary CTA label site-wide: "Book a free practice review". Header uses "Get in touch".
- Never say "HIPAA certified". Say "HIPAA-compliant processes"; "we sign a BAA" only once the client confirms it.
- Unconfirmed claims (BAA, weekly reports, named account manager, "reconciled every day") carry a `// TODO(client): confirm before launch` comment in `site.ts`. Keep the comment until the client confirms.
- Trust data (`trust`): fill a list only with real, approved items. An empty list renders nothing in production. Set `trust.preview = true` to see placeholders in `npm run dev`, then set it back to `false`.
- Known open item: the FAQ answer says "Yes" to signing a BAA. This is unconfirmed by the client (see `docs/client-checklist.md`).
- Specialty names must match between the preview and the full page (the live site had a mismatch; do not reintroduce it).
