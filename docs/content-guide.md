# Content guide (`src/content/site.ts`)

All copy lives in this one file (about 220 lines). Components read from it; never hard-code copy in a component. Use `grep -n "^export" src/content/site.ts` to jump.

| Export | Holds | Used by |
|---|---|---|
| `company` | name, tagline, `copyrightYear`, phone, email, `address` (null, TODO), hours (TODO), social links | header, footer, contact, about, specialties |
| `nav` | header/footer links | `site/nav.tsx`, footer |
| `cta` | the one primary CTA label and header label | buttons everywhere |
| `hero` | homepage hero copy, CTAs, `trust` claims (TODO(client)) | `home/hero.tsx` |
| `stats` | the 4 headline numbers (client must confirm, see checklist) | `sections/stats.tsx` |
| `services`, `serviceDetail` | the 3 services; per-service outcome and "for who" | service cards, `/services` |
| `process` | step list | `sections/process.tsx` |
| `enrollmentSample` | sample enrollment-tracker rows in the hero card | `home/hero.tsx` |
| `specialties`, `featuredSpecialties`, `specialtyGroups` | the 50 specialties, featured subset, groups | specialties preview and page |
| `reasons`, `timelines` | "why choose us" cards; timeline bars (CAQH, PECOS, commercial; TODO(client)) | `sections/why.tsx` (home + about) |
| `faqs` | FAQ items | `sections/faq.tsx` |
| `contact` | contact page copy and form labels | contact page |
| `statement` | scroll-darkening statement | `sections/statement.tsx` |
| `about` | about page copy | `/about-us` |

## Rules for content
- Never invent stats, testimonials, certifications, addresses or client names. Leave `TODO(client)` and add the item to `docs/client-checklist.md`.
- US English and US formats: "Orthopedics", "(213) 832-7088".
- One primary CTA label site-wide: "Book a free practice review". Header uses "Get in touch".
- Never say "HIPAA certified". Say "HIPAA-compliant processes"; "we sign a BAA" only once the client confirms it.
- Known open item: the FAQ answer says "Yes" to signing a BAA, and `hero.trust` lists "Business Associate Agreement available". Both are unconfirmed by the client (see `docs/client-checklist.md`).
- Specialty names must match between the preview and the full page (the live site had a mismatch; do not reintroduce it).
