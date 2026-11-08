// Single source of truth for site copy. Edit content here, not in components.
// Items marked TODO(client) need confirmation — see docs/client-checklist.md.

import type { IconName } from "@/components/ui/primitives";

export const company = {
  name: "Kram Healthcare",
  tagline: "Accuracy you can count on",
  copyrightYear: 2026, // static: Cache Components disallows new Date() in prerendered pages
  phoneDisplay: "(213) 832-7088",
  phoneHref: "tel:+12138327088",
  email: "sales@kramhealthcare.com",
  address: null as string | null, // TODO(client): US business address
  hours: null as string | null, // TODO(client): live site lists no hours; add once confirmed
  social: {
    linkedin: "https://www.linkedin.com/company/kram-healthcare",
    facebook: "https://www.facebook.com/people/Kram-Healthcare/61584755162350/",
    instagram: "https://www.instagram.com/p/DUDlsz2kbOz/", // link used on the live site
  },
};

// Existing URLs match the live site (keeps links and search rankings working); /cost-calculator is new.
export const nav: { label: string; href: string; icon: IconName }[] = [
  { label: "Home", href: "/", icon: "home" },
  { label: "About Us", href: "/about-us", icon: "user" },
  { label: "Services", href: "/services", icon: "briefcase" },
  { label: "Specialties", href: "/specialties", icon: "stethoscope" },
  { label: "Calculator", href: "/cost-calculator", icon: "calculator" }, // short on purpose: keeps the header row uncluttered
  { label: "Contact Us", href: "/contact-us", icon: "chat" },
];

export const cta = {
  primary: "Book a free practice review",
  header: "Get in touch",
  href: "/contact-us",
};

export const hero = {
  // Rendered as one headline: {titleStart} [orange marker: {titleHighlight}] {titleEnd}
  titleStart: "Get credentialed faster and",
  titleHighlight: "paid",
  titleEnd: "on the first pass",
  // TODO(client): approve. Replaces the live site's sentence ("KRAM Healthcare simplifies your practice management,
  // with accurate billing, faster credentialing, and compliant revenue cycle solutions built for modern healthcare providers.")
  // TODO(client): confirm before launch
  body: "Provider enrollment, medical billing and multi-state licensing for US practices, run by one accountable team that shows you every status, every week.",
  primaryCta: "Book a free practice review",
  // TODO(client): replace the stock photos with the practice's own photography (src/assets/photos/CREDITS.md).
  // `id` maps to an image in `home/hero.tsx`; `focus` is the object-position crop (keeps the people in frame).
  // Order matters: the first slide is the one painted before JS loads.
  slides: [
    { id: "tablet", alt: "Two doctors in white coats reviewing information together on a tablet", focus: "62% 40%" },
    { id: "team", alt: "A team of healthcare colleagues gathered around a laptop in a bright office", focus: "55% 40%" },
    { id: "phone", alt: "A doctor in a white coat on the phone while working at her laptop", focus: "45% 40%" },
    { id: "huddle", alt: "Colleagues collaborating around a table with laptops and notebooks", focus: "70% 45%" },
    { id: "desk", alt: "Two colleagues talking at a desk, with a dashboard open on a laptop between them", focus: "65% 40%" },
  ] as { id: "tablet" | "team" | "phone" | "huddle" | "desk"; alt: string; focus: string }[],
  // Floating status chips over the hero photo (from the main-branch hero). Each flips from `from` to `to` on every slide. Generic
  // process states, not client claims. Two chips show at once: slide n uses chips[n % 4] and chips[(n + 2) % 4].
  chips: [
    { label: "Provider enrollment", from: "In review", to: "Approved" },
    { label: "Claim", from: "Submitted", to: "Paid" },
    { label: "State license", from: "Renewal filed", to: "Renewed" },
    { label: "Weekly status report", from: "Preparing", to: "Sent to you" },
  ],
  carousel: {
    label: "Photos of healthcare teams at work",
    pause: "Pause photo slideshow",
    play: "Play photo slideshow",
    slide: "Photo",
    of: "of",
  },
  // Shown as one muted line under the button: each item is a sentence.
  reassurance: ["Free practice review.", "Written quote.", "No commitment until you sign."],
};

// Hero visual: a SAMPLE practice, not a client. Generic labels only; never add real names, payers, amounts or counts.
// `end: "done"` rows move on to the final pill; `end: "review"` rows stop at In review. See globals.css (.board-row).
export const statusBoard = {
  title: "Practice status board",
  sample: "Sample practice, illustrative",
  columns: { item: "Provider or claim batch", progress: ["Submitted", "In review", "Approved or paid"], status: "Status" },
  stages: { submitted: "Submitted", review: "In review" },
  summary: { done: "Approved or paid", review: "In review", replay: "Replay" },
  rows: [
    { name: "Provider A", detail: "Medicare enrollment", end: "done", final: "Approved" },
    { name: "Provider B", detail: "Commercial payer enrollment", end: "review", final: "Approved" },
    { name: "Claim batch", detail: "Primary care", end: "done", final: "Paid" },
    { name: "Claim batch", detail: "Behavioral health", end: "review", final: "Paid" },
    { name: "Provider C", detail: "CAQH re-attestation", end: "done", final: "Approved" },
  ] as { name: string; detail: string; end: "done" | "review"; final: "Approved" | "Paid" }[],
};

// TODO(client): confirm each figure and its "as of" date
export const stats = [
  { value: 10, suffix: "+", label: "Years of combined industry expertise" },
  { value: 5000, suffix: "+", label: "Providers served across all 50 states" },
  { value: 120000, suffix: "+", label: "Insurance applications processed" },
  { value: 99, suffix: "%", label: "First-time submission success rate" },
];

// Item names follow the live site's service lists: short labels only, no per-item explanations.

export const services: {
  id: "credentialing" | "billing" | "licensing";
  eyebrow: string;
  title: string;
  body: string;
  items: string[];
}[] = [
  {
    id: "credentialing",
    eyebrow: "Front of the cycle",
    title: "Provider enrollment & credentialing",
    body: "Get every provider in network and keep them there, with one team tracking every payer and deadline.",
    items: [
      "Commercial & government payer enrollment",
      "CAQH registration & maintenance",
      "NPI registration (Type 1 & Type 2)",
      "Medicare & Medicaid enrollment",
      "Facility & group enrollment",
      "Revalidations & demographic updates",
      "Provider onboarding support",
    ],
  },
  {
    id: "billing",
    eyebrow: "Across the claim cycle",
    title: "Medical billing & revenue cycle",
    // TODO(client): confirm before launch
    body: "Clean claims out the door, denials worked fast, and payments posted and reconciled every day.",
    items: [
      "Insurance verification & eligibility checks",
      "Prior authorization management",
      "Claim submission & follow-up",
      "Denial management & appeals",
      "Accounts receivable (A/R) management",
      "Payment posting & reconciliation",
      "Patient statements & billing support",
      "DME billing",
    ],
  },
  {
    id: "licensing",
    eyebrow: "Around the cycle",
    title: "Licensing & practice support",
    body: "Expand into new states and telehealth, and keep the day-to-day paperwork from slowing your team down.",
    items: [
      "Multi-state & telehealth licensing",
      "Credentialing database management (CAQH, Modio, etc.)",
      "Compliance & audit support",
      "Ongoing payer maintenance",
    ],
  },
];

export const process = [
  { title: "Free practice review", body: "A free consultation. We look at your payers, providers and open A/R and tell you where revenue is stuck.", time: "Day 1" },
  // TODO(client): confirm before launch
  { title: "Onboarding & BAA", body: "We sign a Business Associate Agreement, collect documents once, and set up secure access.", time: "Week 1" },
  { title: "We file and follow up", body: "Applications, claims and appeals go out. We chase every payer until each item is closed.", time: "Ongoing" },
  // TODO(client): confirm before launch
  { title: "You see every status", body: "A weekly report shows each enrollment, claim batch and denial, with the next step and owner.", time: "Every week" },
];

/* ---------------- /cost-calculator: cost-of-delay calculator ---------------- */

// Pure arithmetic on the visitor's own inputs; it makes no claim about Kram's results.
// TODO(client): confirm the default values feel typical for your clients.
export const delayCost = {
  metaTitle: "Credentialing Delay Cost Calculator",
  metaDescription: "Estimate the revenue on hold while providers wait on payer enrollment, based on your providers, monthly collections and days out of network.",
  crumb: "Cost Calculator",
  // Rendered as: {titleStart} <highlight>{titleHighlight}</highlight> {titleEnd}
  titleStart: "What an out-of-network provider",
  titleHighlight: "costs",
  titleEnd: "you",
  body: "Until a provider is credentialed with a payer, their visits with that payer's patients can't be billed. Move the sliders to see the revenue on hold.",
  inputs: {
    providers: { label: "Providers waiting on enrollment", min: 1, max: 20, step: 1, value: 2 },
    monthly: { label: "Expected monthly collections per provider", min: 10000, max: 100000, step: 5000, value: 40000 },
    days: { label: "Days out of network", min: 30, max: 180, step: 15, value: 90 },
  },
  resultLabel: "Revenue on hold",
  perDayLabel: "every day they wait",
  note: "Illustrative estimate from your inputs only. Actual impact depends on payer mix and patient volume.",
  cta: "Get a credentialing plan",
};

/* ---------------- Home: client proof ---------------- */

export type Testimonial = {
  quote: string;
  name: string;
  role: string; // e.g. "Practice Manager"
  practice: string;
  state: string; // US state, e.g. "TX"
  metric?: { value: string; label: string }; // optional before/after result, e.g. { value: "38 days", label: "to full Medicare enrollment" }
};

// TODO(client): 2–3 real quotes with full name, role, practice, state and WRITTEN permission.
// Never fill it with invented quotes.
export const testimonials: Testimonial[] = [];

export const proof = {
  // HIDDEN for now (dev and production). To enable once real quotes are in `testimonials`: set to true.
  // With `enabled: true` and `testimonials` still empty, production renders nothing and
  // `npm run dev` shows the labelled placeholders below for layout review.
  enabled: false,
  eyebrow: "Client results",
  title: "Practices that stopped chasing payers",
  previewNote: "Design preview (development only): add real, approved quotes to `testimonials` in src/content/site.ts to publish this section.",
  placeholders: [
    {
      quote: "[Client quote, two or three sentences, about a specific result: e.g. how fast providers were enrolled, or what happened to denials and A/R.]",
      name: "[Full name]", role: "[Role]", practice: "[Practice name]", state: "[ST]",
      metric: { value: "[##]", label: "[Before/after result]" },
    },
    { quote: "[Shorter client quote, one or two sentences.]", name: "[Full name]", role: "[Role]", practice: "[Practice name]", state: "[ST]" },
    { quote: "[Shorter client quote, one or two sentences.]", name: "[Full name]", role: "[Role]", practice: "[Practice name]", state: "[ST]" },
  ] satisfies Testimonial[],
};

/* ---------------- Trust: stays hidden until the client supplies real, approved data ---------------- */

export type Credential = { label: string; detail?: string };
export type CaseStudy = { practice: string; state: string; problem: string; metric: { value: string; label: string }; summary: string };
export type BillingMetric = { value: string; label: string; definition: string; asOf: string };
export type Leader = { name: string; title: string; bio: string };

// TODO(client): every list below stays empty until the client supplies real, approved data. Never invent entries.
export const trust = {
  preview: false, // true shows labelled placeholders in `npm run dev` only, never in production
  previewNote: "Design preview (development only): add real, approved data to `trust` in src/content/site.ts to publish this section.",
  // TODO(client): logos of real clients, ONLY with written permission. The "Trusted by" strip renders nothing while this is empty.
  logos: [] as { name: string; src: string; width: number; height: number }[],
  logosLabel: "Trusted by practices across the US",
  credentials: [] as Credential[], // only what is TRUE today, e.g. a real SOC 2 report or AAPC-certified staff
  credentialsLabel: "Security and credentials",
  metrics: [] as BillingMetric[],
  caseStudies: [] as CaseStudy[],
  resultsEyebrow: "Results",
  resultsTitle: "Measured, dated and defined",
  systems: [] as string[], // EHR and practice-management names the client confirms
  systemsEyebrow: "Systems",
  systemsTitle: "We work inside the systems you already use",
  leaders: [] as Leader[],
  leadersEyebrow: "Leadership",
  leadersTitle: "The people accountable for your account",
  placeholders: {
    credentials: [{ label: "[Credential]" }, { label: "[Credential]" }, { label: "[Credential]" }] as Credential[],
    metrics: [{ value: "[##%]", label: "[Net collection rate]", definition: "[How it is measured]", asOf: "[Date]" }, { value: "[## days]", label: "[Days in A/R]", definition: "[How it is measured]", asOf: "[Date]" }, { value: "[##%]", label: "[Denial rate]", definition: "[How it is measured]", asOf: "[Date]" }] as BillingMetric[],
    caseStudies: [{ practice: "[Practice type]", state: "[ST]", problem: "[The problem]", metric: { value: "[##]", label: "[Before/after result]" }, summary: "[What changed]" }] as CaseStudy[],
    systems: ["[EHR name]", "[PM system]", "[EHR name]"],
    leaders: [{ name: "[Full name]", title: "[Title]", bio: "[One-sentence background]" }] as Leader[],
  },
};

// Deadlines are public CMS / CAQH rules, not Kram claims, so this section needs no client data.
export const deadlines = {
  eyebrow: "What we track",
  titleStart: "The deadlines that quietly",
  titleHighlight: "stop payment",
  body: "Miss one and applications stall or billing privileges can lapse. We keep them on the calendar for you.",
  items: [
    { value: "120 days", title: "CAQH re-attestation", body: "Most commercial payers rely on your CAQH ProView profile. If it lapses, applications stall." },
    { value: "5 years", title: "Medicare revalidation", body: "Most providers revalidate on a set cycle. Miss it and you risk a payment hold or deactivation." },
    { value: "3 years", title: "DMEPOS revalidation", body: "DME suppliers revalidate on a shorter cycle than other Medicare providers." },
  ],
  note: "Medicare revalidation cycles per CMS.",
};

export const calculatorPromo = {
  title: "What is a delayed enrollment costing you?",
  body: "Enter your providers, collections and days out of network to see the revenue on hold.",
  cta: "Try the calculator",
};

export const notFound = {
  title: "We can't find that page",
  body: "The link may be old or mistyped. Head back to the homepage, or tell us what you were looking for.",
  home: "Back to the homepage",
  contact: "Contact us",
};

export const legal = [
  // TODO(client): legal pages (lawyer's text). Items render as plain text until an href is set.
  { label: "Privacy Policy", href: null as string | null },
  { label: "Terms of Use", href: null as string | null },
  { label: "HIPAA Notice", href: null as string | null },
  { label: "Accessibility", href: null as string | null },
];

export const specialties = [
  "Family Medicine", "Internal Medicine", "Primary Care", "Cardiology", "Dermatology", "Pediatrics",
  "Orthopedics", "Neurology", "Psychiatry & Behavioral Health", "Gastroenterology", "Endocrinology", "Pulmonology",
  "Nephrology", "Rheumatology", "Oncology", "Pain Management", "Physical Therapy", "OB/GYN",
  "Urology", "ENT (Otolaryngology)", "Ophthalmology", "Podiatry", "General Surgery", "Plastic Surgery",
  "Anesthesiology", "Radiology", "Home Health", "Hospice Care", "Skilled Nursing Facilities (SNF)", "Mental Health Clinics",
  "Telehealth Providers", "Urgent Care", "Durable Medical Equipment (DME)", "Speech Therapy", "Occupational Therapy", "Chiropractic Care",
  "Dental Billing Support", "Addiction Treatment Centers", "Sleep Medicine", "Infectious Disease", "Multi-Specialty Practices", "PRTF Enrollment",
  "Pharmacy", "Retail Pharmacy", "Specialty Pharmacy", "Pharmacist Enrollment Services", "Behavioral Health & Mental Health Facilities",
  "Angioplasty", "Eye Care", "RMI",
];

export const featuredSpecialties = [
  { name: "Primary & Family Care", note: "High-volume visits and fast panel growth" },
  { name: "Behavioral Health", note: "Telehealth, multi-state licensing, and carve-out payers" },
  { name: "Cardiology", note: "Prior auths for imaging and procedures" },
  { name: "Home Health & Hospice", note: "Medicare enrollment and revalidations" },
  { name: "DME", note: "Supplier enrollment and documentation" },
  { name: "Pharmacy", note: "Pharmacy and pharmacist enrollment" },
];

export const reasons = [
  // TODO(client): confirm before launch
  { title: "One owner for your account", body: "A named account manager who knows your providers, payers and deadlines, not a ticket queue." },
  // TODO(client): confirm before launch
  { title: "Status you can see", body: "Weekly reports on every application and claim batch. No chasing us for updates." },
  { title: "All 50 states and telehealth", body: "Multi-state licensing and payer enrollment for practices growing across state lines." },
  // TODO(client): confirm before launch
  { title: "Built around compliance", body: "Minimum-necessary access, signed BAAs and audit-ready records for every engagement." },
];

export const timelines = [
  { label: "CAQH profile set up", days: 7, max: 120 },
  { label: "Medicare (PECOS) enrollment", days: 45, max: 120 },
  { label: "Commercial payer enrollment", days: 90, max: 120 },
];
// TODO(client): confirm typical timelines before launch

// Home shows the first 4; /services and /contact-us show all.
export const faqs = [
  { q: "How long does provider credentialing take?", a: "Most commercial payers take 60 to 120 days from a complete application. Medicare usually takes 30 to 60 days. We start with the slowest payers first and send you a status report every week." },
  { q: "What's the difference between credentialing and enrollment?", a: "Credentialing verifies a provider's education, licenses, training and work history. Enrollment is the application that adds the provider to a payer's network so claims can be paid. A payer needs both before it will reimburse you, and we handle both." },
  { q: "Can you take over from our current biller?", a: "Yes. We audit your open A/R and pending applications, then run a planned handover so no claims or deadlines are dropped." },
  { q: "Which specialties do you work with?", a: "We work with 50 specialties, from primary care and behavioral health to DME, pharmacy and skilled nursing. If yours isn't listed, ask us." },
  { q: "What is CAQH, and why does it matter?", a: "CAQH ProView is the shared database most commercial payers use to check a provider's credentials. The profile must be complete and re-attested every 120 days, or applications stall. We set it up and keep it current for you." },
  { q: "Do you handle DME billing?", a: "Yes. DME billing is one of our specialties, from supplier enrollment and revalidation to claims with the documentation and modifiers durable medical equipment requires." },
  { q: "How often does Medicare enrollment need to be revalidated?", a: "Most providers revalidate every 5 years, and DME suppliers every 3 years. Medicare posts due dates in advance; we track them so billing privileges don't lapse." },
  // TODO(client): confirm before launch
  { q: "Do you sign a Business Associate Agreement (BAA)?", a: "Yes. Every engagement that involves protected health information starts with a signed BAA, and access is limited to what the work requires." },
  { q: "How is pricing structured?", a: "Credentialing is priced per provider and payer. Billing is usually a percentage of collections. You get a written quote after the free review." },
  { q: "Do you work with practices in every state?", a: "Yes. We enroll and license providers in all 50 states, including telehealth providers who see patients across state lines." },
];

export const contact = {
  title: "Tell us where revenue is stuck.",
  body: "Share a few details and a member of our team will get back to you.",
  phiNotice: "Please don't include patient names or other health information in this form.",
  providerOptions: ["1", "2–5", "6–20", "21–50", "50+"],
  needs: ["Credentialing", "Medical billing", "Licensing", "Not sure yet"],
  // Example text shown inside the empty fields. Generic on purpose: no real names, domains or practices.
  placeholders: {
    name: "First and last name",
    email: "name@yourpractice.com",
    phone: "(555) 555-0123",
    practice: "Your practice or group name",
    providers: "Select a range",
    state: "e.g. Texas, or multiple",
    message: "e.g. Adding two new NPs in January; need Medicare and BCBS enrollment.",
  },
  consent: { lead: "I agree to", privacyLabel: "the Privacy Policy", join: "and to", body: "Kram Healthcare contacting me about this request by phone or email." },
  // Orange band around the form (wording follows the live site's "Feel free to connect with us")
  band: {
    title: "Feel free to connect with us",
    body: "Contact us today for all your provider credentialing and enrollment needs. We're here to make onboarding seamless and efficient.",
  },
  formTitle: "Request your free practice review",
  submit: "Request my free review",
  responseTime: null as string | null, // TODO(client): e.g. "We reply within one business day"
  bookingUrl: null as string | null, // TODO(client): calendar link
  bookingLabel: "Pick a time",
};

/* ---------------- Home ---------------- */

export const statement = {
  muted: "One partner for everything between a new provider and a",
  strong: "paid claim.",
};

// "What about us" block from the live homepage, tightened for scanning. Full mission stays on /about-us.
export const aboutIntro = {
  eyebrow: "About us",
  // Rendered as: {titleStart} <highlight>{titleHighlight}</highlight> {titleEnd}
  titleStart: "Your",
  titleHighlight: "trusted partner",
  titleEnd: "in revenue cycle",
  body: "Credentialing, enrollment, medical billing and denial management, handled by one team so yours can stay with patients.",
  // From the live site: "Through transparency, dedication, and innovation…"
  pillars: [
    { title: "Transparency", body: "Weekly status updates" },
    { title: "Dedication", body: "One accountable team" },
    { title: "Accuracy", body: "Checked before sending" },
  ],
  link: "More about Kram",
  photoMainAlt: "A physician reviewing a patient file with a smiling colleague",
  photoInsetAlt: "A smiling clinician in a white coat with arms crossed",
};

// "Why choose KRAM for medical billing?" from the live About page, shortened. Used on home and /about-us.
export const billingWhy = {
  eyebrow: "Why choose us",
  titleStart: "Why choose Kram for",
  titleHighlight: "medical billing?",
  paragraphs: [
    "Accurate, on-time billing is the backbone of a healthy practice. Our team works to maximize your revenue, reduce claim denials and speed up reimbursements, across medical billing, denial management and DME billing.",
    "We pair industry knowledge and modern tools with a client-first approach: transparent reporting, compliant processes and a focus on results, held to high standards of integrity and professionalism.",
  ],
  benefits: [
    "Maximize collections",
    "Fewer claim denials",
    "Faster reimbursements",
    "DME billing expertise",
  ],
  link: "See billing services",
  photoAlt: "A billing team working on laptops at a shared desk",
  // Floating card on the photo: an illustration of a claim moving through billing, no figures.
  tracker: {
    title: "Claim status",
    note: "Tracked from submission to payment",
    steps: ["Submitted", "Scrubbed", "Paid"],
  },
};

// Closing CTA in the footer. Body is the live site's "Feel free to connect with us" line.
export const closing = {
  titleStart: "Ready to get your providers enrolled and",
  titleHighlight: "paid?",
  body: "Talk to us about credentialing, enrollment or billing. We'll make onboarding simple and efficient.",
};

/* ---------------- About page ---------------- */

export const about = {
  kicker: "About Kram Healthcare",
  titleStart: "Your",
  titleHighlight: "partner",
  titleEnd: "in credentialing and revenue cycle",
  body: "We take the administrative load of enrollment, credentialing and billing off your team, so providers can focus on patients and the practice gets paid on time.",
  mission: {
    title: "Why we exist",
    // Client copy from kramhealthcare.com/about-us
    paragraphs: [
      "At KRAM Healthcare, our mission is to empower healthcare providers and organizations by delivering reliable, efficient, and compliant revenue cycle management solutions. We specialize in provider enrollment, credentialing, medical billing, denial management, and DME billing, ensuring that every step of the process is handled with accuracy and care.",
      "We understand the challenges healthcare professionals face, from navigating complex payer requirements to resolving claim denials and maintaining steady cash flow. That's why we are committed to removing administrative burdens so providers can focus on what truly matters: delivering quality care to patients.",
      "Through transparency, dedication, and innovation, we strive to become a trusted partner to providers and healthcare organizations. Our goal is not just to manage billing and credentialing, but to optimize revenue cycles, minimize errors, and build long-term success for every client we serve.",
    ],
  },
  values: [
    { title: "Accuracy first", body: "Applications and claims are checked before they go out, because a clean first submission is the fastest path to approval and payment." },
    { title: "Open status", body: "You always know where each enrollment and claim batch stands, who owns the next step, and when it is due." },
    // TODO(client): confirm before launch
    { title: "Compliance by default", body: "Signed BAAs, minimum-necessary access and audit-ready records on every engagement." },
    { title: "Long-term partnership", body: "We stay after go-live: re-attestations, revalidations and payer changes are tracked for as long as you work with us." },
  ],
  // TODO(client): founding year, leadership names + headshots, where the team works
};

/* ---------------- Specialties page ---------------- */

export const specialtyGroups = [
  { name: "Primary & urgent care", items: ["Family Medicine", "Internal Medicine", "Primary Care", "Pediatrics", "Urgent Care", "Multi-Specialty Practices", "Telehealth Providers"] },
  { name: "Medical specialties", items: ["Cardiology", "Dermatology", "Neurology", "Gastroenterology", "Endocrinology", "Pulmonology", "Nephrology", "Rheumatology", "Oncology", "Infectious Disease", "Sleep Medicine", "Radiology", "Anesthesiology", "Angioplasty", "RMI"] },
  { name: "Surgical & procedural", items: ["Orthopedics", "General Surgery", "Plastic Surgery", "Urology", "ENT (Otolaryngology)", "Ophthalmology", "Eye Care", "OB/GYN", "Podiatry", "Pain Management"] },
  { name: "Behavioral health", items: ["Psychiatry & Behavioral Health", "Mental Health Clinics", "Behavioral Health & Mental Health Facilities", "Addiction Treatment Centers", "PRTF Enrollment"] },
  { name: "Therapy & rehab", items: ["Physical Therapy", "Occupational Therapy", "Speech Therapy", "Chiropractic Care"] },
  { name: "Post-acute & equipment", items: ["Home Health", "Hospice Care", "Skilled Nursing Facilities (SNF)", "Durable Medical Equipment (DME)"] },
  { name: "Pharmacy & dental", items: ["Pharmacy", "Retail Pharmacy", "Specialty Pharmacy", "Pharmacist Enrollment Services", "Dental Billing Support"] },
];

/* ---------------- Home: Medallion-style section copy ---------------- */

export const servicesSection = {
  title: "One partner for everything between a new provider and a paid claim",
  body: "Use one service or all three. Either way you work with a single accountable team.",
  learnMore: "Learn more",
};

export const processSection = {
  title: "How we work",
  body: "What happens after you reach out, from the first review to a status report every week.",
};

// TODO(client): confirm before launch (weekly report, named owner per item)
export const productSection = {
  title: "Every status, every week, in one report",
  body: "Every enrollment, claim batch and denial has a status you can see, from submitted to approved or paid. A weekly report adds the next step and who owns it, so you never have to ask where something stands.",
  link: "See how we work",
  linkHref: "/services",
};

export const specialtiesSection = {
  // Rendered as: {titleStart} [orange {specialties.length}] {titleEnd}
  titleStart: "Know-how across",
  titleEnd: "specialties",
  body: "Every specialty has its own payers, codes and paperwork. We know where each one gets stuck.",
  link: "See all specialties",
};

export const marquee = { pause: "Pause scrolling specialties", play: "Play scrolling specialties" };

export const faqSection = {
  title: "Questions practices ask us first",
  // Rendered after the title: "Can't find your answer? Call {phone} and we'll walk you through it."
  bodyLead: "Can't find your answer? Call",
  bodyTail: "and we'll walk you through it.",
};
