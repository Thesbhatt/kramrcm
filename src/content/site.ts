// Single source of truth for site copy. Edit content here, not in components.
// Items marked TODO(client) need confirmation — see docs/client-checklist.md.

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

// Same page structure and URLs as the live site (keeps existing links and search rankings working).
export const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Specialties", href: "/specialties" },
  { label: "Contact Us", href: "/contact-us" },
];

export const cta = {
  primary: "Book a free practice review",
  header: "Get in touch",
  href: "/contact-us",
};

export const hero = {
  kicker: "Credentialing · Medical billing · Licensing",
  // Rendered as: {titleStart} <highlight>{titleHighlight}</highlight> {titleEnd}
  titleStart: "Get credentialed faster and",
  titleHighlight: "paid",
  titleEnd: "on the first pass",
  // TODO(client): approve. Replaces the live site's sentence ("KRAM Healthcare simplifies your practice management,
  // with accurate billing, faster credentialing, and compliant revenue cycle solutions built for modern healthcare providers.")
  body: "Provider enrollment, medical billing and multi-state licensing for US practices, run by one accountable team that shows you every status, every week.",
  primaryCta: "Book a free practice review",
  secondaryCta: "Explore services",
  partnerPrompt: "Adding providers or switching billers?",
  // TODO(client): keep only claims that are true today
  // The three bullets from the live site hero
  trust: [
    "Comprehensive credentialing & enrollment across all specialties",
    "Efficient revenue cycle management tailored to your needs",
    "Multi-state licensing and telehealth licensing support",
  ],
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
    eyebrow: "Middle and back of the cycle",
    title: "Medical billing & revenue cycle",
    body: "Clean claims out the door, denials worked fast, and payments posted and reconciled every day.",
    items: [
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
      "Insurance verification & eligibility checks",
      "Prior authorization management",
      "Credentialing database management (CAQH, Modio, etc.)",
      "Compliance & audit support",
      "Ongoing payer maintenance",
    ],
  },
];

export const process = [
  { title: "Free practice review", body: "A free consultation. We look at your payers, providers and open A/R and tell you where revenue is stuck.", time: "Day 1" },
  { title: "Onboarding & BAA", body: "We sign a Business Associate Agreement, collect documents once, and set up secure access.", time: "Week 1" },
  { title: "We file and follow up", body: "Applications, claims and appeals go out. We chase every payer until each item is closed.", time: "Ongoing" },
  { title: "You see every status", body: "A weekly report shows each enrollment, claim batch and denial, with the next step and owner.", time: "Every week" },
];

export const enrollmentSample = [
  { payer: "Medicare (PECOS)", status: "Approved", tone: "ok" },
  { payer: "CAQH re-attestation", status: "Current", tone: "ok" },
  // `then`: the hero tracker flips this row to its next status a few seconds after load (sample data, CSS only)
  { payer: "Aetna · Group", status: "In review", tone: "progress", then: { status: "Approved", tone: "ok" } },
  { payer: "BCBS · Individual", status: "Docs needed", tone: "wait" },
] as const;

/* ---------------- Home: cost-of-delay calculator ---------------- */

// Pure arithmetic on the visitor's own inputs; it makes no claim about Kram's results.
// TODO(client): confirm the default values feel typical for your clients.
export const delayCost = {
  eyebrow: "The cost of waiting",
  title: "What an out-of-network provider costs you",
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
  { name: "Primary & Family Care", note: "High-volume E/M coding and fast panel growth" },
  { name: "Behavioral Health", note: "Telehealth, multi-state licensing, and carve-out payers" },
  { name: "Cardiology", note: "Prior auths for imaging and procedures" },
  { name: "Home Health & Hospice", note: "Medicare enrollment and revalidations" },
  { name: "DME", note: "Supplier enrollment and documentation" },
  { name: "Pharmacy", note: "Pharmacy and pharmacist enrollment" },
];

export const reasons = [
  { title: "One owner for your account", body: "A named account manager who knows your providers, payers and deadlines, not a ticket queue." },
  { title: "Status you can see", body: "Weekly reports on every application and claim batch. No chasing us for updates." },
  { title: "All 50 states and telehealth", body: "Multi-state licensing and payer enrollment for practices growing across state lines." },
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
  { q: "Which specialties do you work with?", a: "More than 45, from primary care and behavioral health to DME, pharmacy and skilled nursing. If yours isn't listed, ask us." },
  { q: "What is CAQH, and why does it matter?", a: "CAQH ProView is the shared database most commercial payers use to check a provider's credentials. The profile must be complete and re-attested every 120 days, or applications stall. We set it up and keep it current for you." },
  { q: "Do you handle DME billing?", a: "Yes. DME billing is one of our specialties, from supplier enrollment and revalidation to claims with the documentation and modifiers durable medical equipment requires." },
  { q: "How often does Medicare enrollment need to be revalidated?", a: "Most providers revalidate every 5 years, and DME suppliers every 3 years. Medicare posts due dates in advance; we track them so billing privileges don't lapse." },
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
  titleEnd: "in revenue cycle & provider solutions",
  paragraphs: [
    "Kram Healthcare helps providers and healthcare organizations run a reliable, compliant revenue cycle. We specialize in provider enrollment, credentialing, medical billing, denial management and DME billing, and we handle every step with accuracy and care.",
    "Complex payer rules, denied claims and uneven cash flow pull your team away from patients. We take that administrative work off your plate and stay with you for the long term, to cut errors and keep revenue steady.",
  ],
  // From the live site: "Through transparency, dedication, and innovation…"
  pillars: [
    { title: "Transparency", body: "A weekly status on every application, claim and denial." },
    { title: "Dedication", body: "One accountable team that knows your providers and payers." },
    { title: "Accuracy", body: "Every application and claim checked before it goes out." },
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
