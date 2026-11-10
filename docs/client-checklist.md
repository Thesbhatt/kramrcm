# What we need from the client

## LAUNCH BLOCKERS
- [ ] Privacy Policy, Terms of Use, HIPAA Notice and Accessibility pages (lawyer's text). The footer and the contact form consent line link to them once `legal` has an `href`
- [x] US business address (received Nov 9 2026: 7901 4th St N, Ste 300, St. Petersburg, FL 33702)
- [ ] BAA confirmation: do they sign Business Associate Agreements with clients? (stated as fact in the process steps, reasons, FAQ and About values)

Send this list to the client. Anything unchecked stays as `TODO(client)` in `src/content/site.ts`. Do not invent any of it.

## Brand
- [x] Logo mark (PNG, 1024px): received Nov 7 2026 → `design/client-logo/`
- [x] New "Kram RCM" logo (transparent raster): received Nov 10 2026 → `design/client-logo/2026-11/`; cut into `src/assets/brand/` (lockup, white lockup for the footer, K mark, favicon)
- [ ] Logo as **vector** (SVG / AI / PDF) of the Kram RCM logo, so the header and footer can use crisp SVG instead of WebP. Also confirm the brand name: the logo says "Kram RCM" while site copy says "Kram Healthcare".
- [ ] Confirm tagline: "Accuracy you can count on"
- [ ] Approval of colours (orange #F77C27, graphite #414546) and font (Space Grotesk + Inter on the Medallion-style branch, Geist on `main`; the current live site uses Manrope, so mention the change)

## Proof and claims
- [ ] Confirm stats and how each is measured, with an "as of" date: 10+ years, 5,000+ providers, 120,000+ applications, 99% first-time submission success
- [ ] Confirm the weekly-report promise and the named account manager, both stated as fact on the site
- [ ] Say what the 99% "first-time submission success" measures, and whether "combined" years can be replaced with years in business
- [ ] Billing metrics with definitions and an as-of date: net collection rate, days in A/R, denial rate, clean claim rate (goes in `trust.metrics`)
- [ ] Does the team offer medical coding? If yes, add it to the services list
- [ ] Reply-time promise, and a calendar link for booking (`contact.responseTime`, `contact.bookingUrl`)
- [ ] Medicare moratoriums: CMS froze new enrollment for certain DME medical supply companies from Feb 27 2026 and for hospices from May 13 2026. Confirm current status at cms.gov and whether the DME and hospice wording needs a qualifier
- [ ] Explain "RMI" and confirm "Angioplasty" and "Eye Care" belong on the specialties list
- [ ] Compliance facts that are TRUE today: sign BAAs with clients? SOC 2 / ISO 27001 / HITRUST? AAPC- or AHIMA-certified staff? Cyber insurance?
- [ ] 2–3 testimonials: quote, full name, title, practice, state, written permission. On receipt: add to `testimonials` in `site.ts` and set `proof.enabled = true` (section is hidden until then)
- [ ] Client or payer logos we may show (written permission). On receipt: add to `trust.logos` in `site.ts`; the "Trusted by" strip on the home page appears automatically
- [ ] 1–2 short case studies: before/after numbers (e.g. days to enroll, denial rate, A/R days)

## Company
- [x] US business address (received Nov 9 2026; shown in footer, contact page and legal pages)
- [ ] Business hours + time zone
- [ ] Main phone (confirm (213) 832-7088) and lead email (sales@kramhealthcare.com)
- [ ] Where the team works (US / offshore / mixed); how they want it described
- [ ] Founding year, founder/leadership names, headshots (for About page)
- [ ] Real photos (team at work, office, or partner clinics) to replace the Unsplash placeholders in `src/assets/photos/` (4 home hero slides, About hero, About mission). Landscape, 1600px+ wide.
- [ ] Confirm rights to the 6 photos reused from the live site (`about-*`, `billing-team`, `service-*` in `src/assets/photos/CREDITS.md`)
- [ ] Approve the tightened versions of the live-site copy (`aboutIntro`, `billingWhy`, service item explanations, new FAQs on CAQH, DME and revalidation)
- [ ] Correct social URLs (current Instagram link points to a single post)

## Content decisions
- [ ] Top 8 specialties for dedicated pages
- [ ] Pricing approach: show "starting at", % of collections, or "custom quote"
- [ ] Typical timelines they are comfortable publishing (payer enrollment, CAQH, Medicare)
- [ ] Which payers/EHRs/PM systems they work with (names only)

## Technical
- [ ] Domain DNS access (for Vercel + Resend SPF/DKIM/DMARC records)
- [ ] Resend account (or permission for us to create one) → `RESEND_API_KEY`
- [ ] Where leads go: email list; CRM (HubSpot / Zoho / none)?
- [ ] Analytics preference (we recommend Plausible or Vercel Analytics, no ad pixels)
- [ ] Privacy Policy and Terms of Use are live as a standard US draft (`src/content/legal.ts`); their attorney must review and fill the `TODO(client)` governing-law state/county and the business address. HIPAA statement and Accessibility page are still missing
