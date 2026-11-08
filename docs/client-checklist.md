# What we need from the client

Send this list to the client. Anything unchecked stays as `TODO(client)` in `src/content/site.ts`. Do not invent any of it.

## Brand
- [x] Logo mark (PNG, 1024px): received Nov 7 2026 → `design/client-logo/`
- [ ] Logo as **vector** (SVG / AI / PDF), mark + "KRAM HEALTHCARE" wordmark + tagline. We currently use our own SVG trace of the mark.
- [ ] Confirm tagline: "Accuracy you can count on"
- [ ] Approval of colours (orange #F77C27, graphite #414546) and font (Public Sans)

## Proof and claims
- [ ] Confirm stats and how each is measured, with an "as of" date: 10+ years, 5,000+ providers, 120,000+ applications, 99% first-time submission success
- [ ] Compliance facts that are TRUE today: sign BAAs with clients? SOC 2 / ISO 27001 / HITRUST? AAPC- or AHIMA-certified staff? Cyber insurance?
- [ ] 2–3 testimonials: quote, full name, title, practice, state, written permission. On receipt: add to `testimonials` in `site.ts` and set `proof.enabled = true` (section is hidden until then)
- [ ] Client or payer logos we may show (written permission)
- [ ] 1–2 short case studies: before/after numbers (e.g. days to enroll, denial rate, A/R days)

## Company
- [ ] US business address (shown in footer and contact page, used for Google Business)
- [ ] Business hours + time zone
- [ ] Main phone (confirm (213) 832-7088) and lead email (sales@kramhealthcare.com)
- [ ] Where the team works (US / offshore / mixed); how they want it described
- [ ] Founding year, founder/leadership names, headshots (for About page)
- [ ] Real photos (team at work, office, or partner clinics) to replace the 3 Unsplash placeholders in `src/assets/photos/` (home hero, About hero, About mission). Landscape, 1600px+ wide.
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
- [ ] Privacy Policy, Terms, HIPAA statement: their lawyer's text, or we draft for their lawyer to review
