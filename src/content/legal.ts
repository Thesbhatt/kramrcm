// Legal page copy (Privacy Policy, Terms of Use) for a US medical billing / credentialing company.
// Standard-form text written for a US B2B healthcare services business. It is NOT legal advice:
// the client's attorney must review it before launch (see docs/client-checklist.md).
// Items marked TODO(client) need confirmation.

import { company } from "./site";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  after?: string[]; // paragraphs shown after the bullets
};

export type LegalDoc = {
  slug: "privacy-policy" | "terms-of-use";
  href: string;
  crumb: string;
  heroStart: string;
  heroWord: string;
  heroEnd?: string;
  intro: string;
  metaDescription: string;
  updated: string; // static string: no new Date() in prerendered pages
  sections: LegalSection[];
};

const contactLine = `${company.name}, ${company.address}, email ${company.email}, phone ${company.phoneDisplay}.`;

export const legalMeta = {
  updatedLabel: "Last updated",
  contactsTitle: "Questions about this page?",
  contactsBody: `Email ${company.email} or call ${company.phoneDisplay}.`,
  otherLabel: { "privacy-policy": "Read our Terms of Use", "terms-of-use": "Read our Privacy Policy" },
  onThisPage: "On this page",
};

export const privacyPolicy: LegalDoc = {
  slug: "privacy-policy",
  href: "/privacy-policy",
  crumb: "Privacy Policy",
  heroStart: "Your",
  heroWord: "privacy",
  heroEnd: "matters to us",
  intro: "How Kram RCM collects, uses and protects information when you visit our website or contact us.",
  metaDescription:
    "Privacy Policy for Kram RCM: what we collect on kramhealthcare.com, how we use it, how we protect it, and your privacy choices under US law.",
  updated: "November 9, 2026",
  sections: [
    {
      id: "overview",
      title: "1. Overview",
      paragraphs: [
        `This Privacy Policy explains how ${company.name} ("Kram RCM," "we," "us") handles information collected through kramhealthcare.com (the "Site") and through related communications such as emails and phone calls with prospective clients. We provide provider credentialing, payer enrollment, medical billing (revenue cycle management) and licensing services to healthcare practices in the United States.`,
        "By using the Site you agree to this Policy. If you do not agree, please do not use the Site.",
      ],
    },
    {
      id: "phi",
      title: "2. Patient health information (PHI) is not collected through this Site",
      paragraphs: [
        "Please do not send patient names, diagnoses, insurance IDs, Social Security numbers or any other protected health information (PHI) through our contact form, email, or the cost calculator. The Site is a marketing website and is not designed to receive PHI.",
        "When we provide services to a healthcare client, we may receive PHI from that client. We handle that information as a \"business associate\" under the Health Insurance Portability and Accountability Act of 1996 (HIPAA) and its implementing regulations, under a written Business Associate Agreement (BAA) with the client. That information is governed by the BAA and applicable law, not by this website Policy.",
        "We do not claim that using this Site makes you or your practice HIPAA compliant, and the Site is not a substitute for a BAA.",
      ],
    },
    {
      id: "collect",
      title: "3. Information we collect",
      paragraphs: ["We collect the following categories of information:"],
      bullets: [
        "Information you give us: name, work email, phone number, practice or group name, number of providers, state(s) of practice, the services you are interested in, and any message you choose to write when you submit the contact form, request a practice review, or email or call us.",
        "Calculator inputs: values you enter into the cost calculator are processed in your browser to show an estimate. They are not sent to us unless you also submit the contact form.",
        "Technical information collected automatically: IP address, browser type and version, device type, operating system, referring page, pages viewed and time on page, and similar diagnostic data. This may be collected through server logs and privacy-focused analytics.",
        "Cookies and similar technologies: see Section 6.",
      ],
      after: ["We do not knowingly collect information from anyone under 18. The Site is intended for business users."],
    },
    {
      id: "use",
      title: "4. How we use information",
      bullets: [
        "To respond to your inquiries and schedule or deliver a practice review.",
        "To provide, evaluate and improve our services and the Site.",
        "To contact you by phone or email about your request, and, where permitted by law, about our services. You can opt out of marketing messages at any time.",
        "To protect the security and integrity of the Site, detect fraud and abuse, and enforce our Terms of Use.",
        "To comply with legal obligations and respond to lawful requests.",
      ],
    },
    {
      id: "share",
      title: "5. How we share information",
      paragraphs: ["We do not sell your personal information, and we do not share it for cross-context behavioral advertising. We share information only as follows:"],
      bullets: [
        "Service providers who help us run the Site and our business (for example website hosting, email delivery, analytics, customer relationship management and scheduling tools). They may use the information only to perform services for us and are required to protect it.",
        "Professional advisers such as attorneys, accountants and insurers, under confidentiality obligations.",
        "Legal and safety reasons: when we believe disclosure is required by law, subpoena or court order, or necessary to protect rights, property or safety.",
        "Business transfers: if we are involved in a merger, acquisition, financing or sale of assets, information may be transferred as part of that transaction, subject to this Policy.",
        "With your consent or at your direction.",
      ],
    },
    {
      id: "cookies",
      title: "6. Cookies, analytics and tracking",
      paragraphs: [
        "The Site uses only the cookies and storage that are needed for it to work and, if enabled, privacy-focused analytics that measure aggregate traffic. We do not use advertising pixels or third-party ad trackers, and we do not build advertising profiles.",
        "You can control cookies through your browser settings. We honor the Global Privacy Control (GPC) browser signal as a request to opt out of any sale or sharing of personal information. Because we do not sell or share personal information for advertising, our practices are the same whether or not a signal is sent.",
      ],
    },
    {
      id: "security",
      title: "7. Security",
      paragraphs: [
        "We use reasonable administrative, technical and physical safeguards designed to protect information, including encryption in transit (HTTPS), access controls, and limiting access to those who need it. No method of transmission or storage is completely secure, and we cannot guarantee absolute security. If you believe your information has been compromised, contact us right away.",
      ],
    },
    {
      id: "retention",
      title: "8. Retention",
      paragraphs: [
        "We keep personal information from the Site only as long as needed for the purposes in this Policy, such as responding to your inquiry, maintaining business records, resolving disputes and meeting legal requirements, and then delete or de-identify it.",
      ],
    },
    {
      id: "rights",
      title: "9. Your privacy rights",
      paragraphs: [
        "Depending on where you live (for example California, Colorado, Connecticut, Virginia, Texas and other states with consumer privacy laws), you may have the right to:",
      ],
      bullets: [
        "Know and access the personal information we hold about you, and the categories of sources and recipients.",
        "Correct inaccurate personal information.",
        "Delete personal information, subject to legal exceptions.",
        "Opt out of the sale or sharing of personal information and of targeted advertising (we do neither).",
        "Not be discriminated against for exercising these rights.",
      ],
      after: [
        `To make a request, email ${company.email} or call ${company.phoneDisplay}. We may need to verify your identity before acting on a request. You may use an authorized agent, and if we deny a request you may appeal by replying to our response. These rights apply to personal information collected through the Site; they do not apply to PHI covered by HIPAA, which is handled as described in Section 2.`,
        "California residents: in the past 12 months we have collected the categories of identifiers, contact information, commercial information (services of interest) and internet activity described in Section 3, for the business purposes described in Section 4, and have not sold or shared personal information.",
      ],
    },
    {
      id: "communications",
      title: "10. Calls, texts and email",
      paragraphs: [
        "If you submit the contact form you agree that we may contact you by phone or email about your request. You can opt out of marketing emails with the unsubscribe link, or by contacting us. We do not send marketing text messages without separate, express written consent.",
      ],
    },
    {
      id: "links",
      title: "11. Third-party sites",
      paragraphs: [
        "The Site may link to third-party websites, such as social media profiles or payer and licensing board sites. We are not responsible for their content or privacy practices. Please review their policies.",
      ],
    },
    {
      id: "changes",
      title: "12. Changes to this Policy",
      paragraphs: [
        "We may update this Policy from time to time. The \"Last updated\" date above shows when it last changed. Material changes will be posted on this page. Your continued use of the Site after an update means you accept the revised Policy.",
      ],
    },
    {
      id: "contact",
      title: "13. Contact us",
      paragraphs: [
        `Questions or requests about this Policy: ${contactLine}`,
      ],
    },
  ],
};

export const termsOfUse: LegalDoc = {
  slug: "terms-of-use",
  href: "/terms-of-use",
  crumb: "Terms of Use",
  heroStart: "Terms of",
  heroWord: "use",
  intro: "The rules for using the Kram RCM website and how it relates to our services.",
  metaDescription:
    "Terms of Use for kramhealthcare.com: acceptable use, no PHI through the Site, service disclaimers, limitation of liability and governing law.",
  updated: "November 9, 2026",
  sections: [
    {
      id: "acceptance",
      title: "1. Acceptance of these Terms",
      paragraphs: [
        `These Terms of Use ("Terms") govern your access to and use of kramhealthcare.com (the "Site"), operated by ${company.name} ("Kram RCM," "we," "us"). By using the Site you agree to these Terms and to our Privacy Policy. If you use the Site on behalf of a practice or other organization, you confirm that you have authority to bind it. If you do not agree, do not use the Site.`,
      ],
    },
    {
      id: "services",
      title: "2. The Site and our services",
      paragraphs: [
        "The Site describes our provider credentialing, payer enrollment, medical billing (revenue cycle management) and licensing services. Information on the Site is general and for informational purposes only.",
        "Our services are provided only under a separate written agreement between you and Kram RCM (a \"Services Agreement\"), which may include a Business Associate Agreement. If these Terms conflict with a signed Services Agreement, the Services Agreement controls for those services.",
      ],
    },
    {
      id: "phi",
      title: "3. No patient information through the Site",
      paragraphs: [
        "Do not submit patient names, medical record details, claims data, Social Security numbers or any other protected health information (PHI) through the contact form, email or any other part of the Site. The Site is not a secure channel for PHI. If you do submit PHI, you do so at your own risk and we may delete it. We will exchange PHI with you only after a BAA is in place and through the secure methods we specify.",
      ],
    },
    {
      id: "not-advice",
      title: "4. No legal, medical, billing or compliance advice",
      paragraphs: [
        "Content on the Site, including articles, FAQs, specialty pages and the cost calculator, is general information. It is not legal, tax, medical, coding or compliance advice, and it does not create a professional relationship. Coding rules, payer policies, Medicare and Medicaid requirements and state licensing rules change often and vary by payer and state. Confirm requirements with the relevant payer, licensing board or your own advisers.",
      ],
    },
    {
      id: "estimates",
      title: "5. Estimates, timelines and results",
      paragraphs: [
        "The cost calculator, sample dashboards, timelines and examples on the Site are illustrative only. Actual results depend on your practice, payers, documentation and other factors outside our control. Credentialing, enrollment and licensing decisions and timelines are made by payers and licensing boards, not by Kram RCM, and we do not guarantee approval, effective dates, payment amounts or reimbursement outcomes.",
      ],
    },
    {
      id: "use",
      title: "6. Acceptable use",
      paragraphs: ["You agree not to:"],
      bullets: [
        "Use the Site in violation of any law or regulation, including healthcare fraud, abuse and privacy laws.",
        "Submit false, misleading or another person's information, or impersonate anyone.",
        "Attempt to gain unauthorized access to the Site, our systems or other users' data, or probe, scan or test their security.",
        "Interfere with or disrupt the Site, including by sending malware, spam or automated bulk requests.",
        "Scrape, copy or reproduce the Site or its content at scale, or use it to build a competing service, without our written permission.",
      ],
    },
    {
      id: "ip",
      title: "7. Intellectual property",
      paragraphs: [
        "The Site and its content, including text, graphics, logos, layout and software, are owned by Kram RCM or its licensors and are protected by US and international intellectual property laws. \"Kram RCM\" and our logo are our marks. We grant you a limited, revocable, non-exclusive, non-transferable license to view the Site for your own business use. No other rights are granted.",
      ],
    },
    {
      id: "submissions",
      title: "8. Information you send us",
      paragraphs: [
        "You are responsible for the accuracy of the information you submit. You grant us permission to use it to respond to you and to evaluate and provide our services, as described in our Privacy Policy. Feedback or suggestions you send about the Site or our services may be used by us without obligation to you.",
      ],
    },
    {
      id: "links",
      title: "9. Third-party links",
      paragraphs: [
        "The Site may link to websites we do not control. We do not endorse them and are not responsible for their content, availability or practices. Your use of them is at your own risk.",
      ],
    },
    {
      id: "disclaimer",
      title: "10. Disclaimer of warranties",
      paragraphs: [
        "THE SITE AND ITS CONTENT ARE PROVIDED \"AS IS\" AND \"AS AVAILABLE\" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, ACCURACY AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE OR SECURE. This section applies to the Site only; warranties (if any) for our services are in your Services Agreement.",
      ],
    },
    {
      id: "liability",
      title: "11. Limitation of liability",
      paragraphs: [
        "TO THE FULLEST EXTENT PERMITTED BY LAW, KRAM RCM AND ITS OWNERS, OFFICERS, EMPLOYEES AND CONTRACTORS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, REIMBURSEMENT OR DATA, ARISING FROM YOUR USE OF OR INABILITY TO USE THE SITE, EVEN IF ADVISED OF THE POSSIBILITY. OUR TOTAL LIABILITY FOR ANY CLAIM RELATING TO THE SITE WILL NOT EXCEED ONE HUNDRED US DOLLARS ($100). Some states do not allow certain limitations, so parts of this section may not apply to you.",
      ],
    },
    {
      id: "indemnity",
      title: "12. Indemnification",
      paragraphs: [
        "You agree to indemnify and hold harmless Kram RCM and its owners, officers, employees and contractors from claims, damages and expenses (including reasonable attorneys' fees) arising from your violation of these Terms or applicable law, or your misuse of the Site.",
      ],
    },
    {
      id: "law",
      title: "13. Governing law and disputes",
      paragraphs: [
        // TODO(client): confirm the state of incorporation / principal place of business for governing law and venue.
        "These Terms are governed by the laws of the State of [TODO(client): state], United States, without regard to conflict-of-law rules. You agree that any dispute arising from these Terms or the Site will be brought in the state or federal courts located in [TODO(client): county, state], and you consent to their jurisdiction. Disputes under a Services Agreement are resolved as that agreement provides.",
      ],
    },
    {
      id: "changes",
      title: "14. Changes and termination",
      paragraphs: [
        "We may update these Terms or change, suspend or discontinue the Site at any time. The \"Last updated\" date shows the latest version, and your continued use of the Site means you accept the update. We may restrict access to the Site at our discretion, including for violations of these Terms.",
      ],
    },
    {
      id: "general",
      title: "15. General",
      paragraphs: [
        "These Terms, together with the Privacy Policy, are the entire agreement between you and us about the Site. If any provision is found unenforceable, the rest remains in effect. Our failure to enforce a provision is not a waiver. You may not assign these Terms without our consent; we may assign them in a merger, acquisition or sale of assets.",
      ],
    },
    {
      id: "contact",
      title: "16. Contact us",
      paragraphs: [`Questions about these Terms: ${contactLine}`],
    },
  ],
};

export const legalDocs = { "privacy-policy": privacyPolicy, "terms-of-use": termsOfUse } as const;
