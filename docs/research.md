# Research summary (done Nov 7 2026, do not redo)

## Current site (kramhealthcare.com)
Manrope only; colours #F3872C / #14457B / #363738. Stats only on About (10+ yrs, 5K+ providers, 120K+ applications, 99% first-time success). Problems: header `tel:9876543210` placeholder, no address / privacy policy / HIPAA statement, no testimonials, typos ("What Choose Us", "(AR)Management"), "Orthopaedics" spelling, logo alt "medicate", homepage specialties ≠ specialties page.

## References
| Site | Fonts | Colours | Take | Avoid |
|---|---|---|---|---|
| credsagercm.com | Instrument Serif + Manrope | navy #071A3D, blue #1F6FE5 | serif+sans pairing, premium dark | client-rendered: HTML is empty for SEO |
| knackrcm.com | Fraunces + Poppins | violet #4E35DF, teal #18D7CF | specialty-first IA, named case studies, ROI calculator, PHI warning on form, "reply within one business day" | stats render "0" without JS, ~18 sections, 6 CTA labels, 9 required fields |
| altermedrcm.com | Plus Jakarta Sans | indigo #2B2B5E, cyan #00CDE5 | precise credentialing facts (CAQH 120 days, PECOS 3–5 yrs, 60–180+ day cycle), Billing/Credentialing split | half the homepage sells their app, broken social links, unsourced stats |

All three are blue family → orange + graphite is differentiated.

## Inspiration patterns (Abridge, Commure, Waystar, Blend roundup)
1. Stat strip directly under hero. 2. Lifecycle stage cards (front / mid / back cycle). 3. Real product-like UI card in hero instead of stock doctor photo. 4. Greyscale compliance badge row. 5. Metric case-study cards (big number + one outcome line). 6. One primary CTA, contact/demo link in header. 7. Restrained motion: count-ups + subtle reveals only.

## US compliance & conventions
- WCAG 2.1 AA (HHS Section 504 rule; deadline May 11 2027 for HHS-funded orgs ≥15 staff). Clients expect vendors to meet it; ADA demand-letter risk.
- No "HIPAA certified" (doesn't exist). Use "HIPAA-compliant processes", "We sign a BAA" only if true.
- No Meta Pixel / ad trackers on forms (pixel class actions ongoing even after OCR guidance was vacated). Use privacy-friendly analytics.
- Forms: "Please don't include patient information" notice; consent checkbox not pre-checked in production; SMS needs separate explicit TCPA consent.
- Footer: Privacy Policy, Terms, HIPAA/Security statement, Accessibility statement, physical US address.

Sources: feldesman.com (HHS deadline extension), accessible.org (WCAG 2.1 AA rule), hipaajournal.com + govinfosecurity.com (tracking ruling), hfma.org (consent).
