import { company, contactEmails as copy, contactPage } from "@/content/site";

// HTML for the two contact-form emails. Email clients are not browsers: table layout, inline styles only,
// no web fonts (Space Grotesk / Inter fall back to Helvetica/Arial), no CSS variables. Colors mirror the
// tokens in globals.css (orange, orange-ink, fg, tint, line, peach-2). Every interpolated value goes through esc().

export const LOGO_CID = "kram-rcm-logo";

const C = {
  orange: "#F77C27",
  orangeInk: "#B84A0C",
  fg: "#26272B",
  muted: "#5C5D62", // about 6.4:1 on white
  ink: "#404045",
  tint: "#F6F4F1",
  line: "#DCDAD6",
  peach: "#FFE7D2",
};
const SANS = "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif";
const DISPLAY = "'Space Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif";

export const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export type Lead = {
  name: string; email: string; phone: string; practice: string;
  providers: string; state: string; needs: string[]; message: string;
};

/** First name for greetings, or "" when it looks like a link or junk (the visitor controls this text). */
export function safeFirstName(full: string) {
  const first = full.trim().split(/\s+/)[0] ?? "";
  return /^[\p{L}][\p{L}'’-]{0,29}$/u.test(first) ? first : "";
}

const digits = (phone: string) => phone.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
const telHref = (phone: string) => `tel:+1${digits(phone)}`;
const prettyPhone = (phone: string) => {
  const d = digits(phone);
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : phone;
};

/* ---------- building blocks ---------- */

const button = (href: string, label: string, variant: "solid" | "outline" = "solid") =>
  `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="display:inline-table;margin:0 8px 8px 0"><tr>
<td style="border-radius:4px;${variant === "solid" ? `background:${C.orange}` : `border:1px solid ${C.ink}`}">
<a href="${esc(href)}" style="display:inline-block;padding:${variant === "solid" ? "13px 22px" : "12px 21px"};font:600 13px/1 ${SANS};letter-spacing:.06em;text-transform:uppercase;text-decoration:none;color:${variant === "solid" ? "#FFFFFF" : C.ink}">${esc(label)}</a>
</td></tr></table>`;

const eyebrow = (text: string) =>
  `<p style="margin:0 0 10px;font:600 12px/1.4 ${SANS};letter-spacing:.08em;text-transform:uppercase;color:${C.orangeInk}">${esc(text)}</p>`;

const sectionTitle = (text: string) =>
  `<p style="margin:0 0 12px;font:600 15px/1.4 ${DISPLAY};color:${C.fg}">${esc(text)}</p>`;

const rows = (items: [string, string][]) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${items
    .map(
      ([k, v], i) => `<tr>
<td style="padding:10px 0;${i ? `border-top:1px solid ${C.line};` : ""}width:120px;vertical-align:top;font:400 14px/1.5 ${SANS};color:${C.muted}">${esc(k)}</td>
<td style="padding:10px 0;${i ? `border-top:1px solid ${C.line};` : ""}vertical-align:top;font:500 15px/1.5 ${SANS};color:${C.fg}">${v}</td>
</tr>`,
    )
    .join("")}</table>`;

const pills = (items: string[]) =>
  items
    .map(
      (n) =>
        `<span style="display:inline-block;white-space:nowrap;margin:0 6px 6px 0;padding:5px 10px;border-radius:999px;background:${C.peach};font:600 12px/1.2 ${SANS};color:${C.orangeInk}">${esc(n)}</span>`,
    )
    .join("");

const link = (href: string, label: string) =>
  `<a href="${esc(href)}" style="color:${C.orangeInk};text-decoration:underline">${esc(label)}</a>`;

/** Page shell: tint background, white card with the orange top rule and the logo, gray footer. */
function layout({ title, preheader, body, footer }: { title: string; preheader: string; body: string; footer: string }) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light">
<title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:${C.tint};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${esc(preheader)}&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.tint}"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#FFFFFF;border:1px solid ${C.line};border-radius:8px;overflow:hidden">
<tr><td style="height:4px;line-height:4px;font-size:0;background:${C.orange}">&nbsp;</td></tr>
<tr><td style="padding:28px 40px 4px"><img src="cid:${LOGO_CID}" width="160" height="38" alt="${esc(company.name)}" style="display:block;border:0;height:38px;width:160px;font:700 20px/38px ${DISPLAY};color:${C.ink}"></td></tr>
<tr><td style="padding:24px 40px 36px;font:400 16px/1.6 ${SANS};color:${C.fg}">${body}</td></tr>
<tr><td style="padding:24px 40px;background:${C.tint};border-top:1px solid ${C.line};font:400 13px/1.6 ${SANS};color:${C.muted}">${footer}</td></tr>
</table>
</td></tr></table>
</body></html>`;
}

const contactFooter = (extra: string) => `<p style="margin:0 0 8px;font:600 14px/1.5 ${SANS};color:${C.ink}">${esc(company.name)}</p>
<p style="margin:0 0 12px">${company.addressLines.map(esc).join("<br>")}<br>
${link(company.phoneHref, company.phoneDisplay)} &nbsp;·&nbsp; ${link(`mailto:${company.email}`, company.email)} &nbsp;·&nbsp; ${link(copy.website.href, copy.website.label)}</p>
<p style="margin:0">${extra}</p>`;

/* ---------- 1. Confirmation to the visitor ---------- */

export function confirmationEmail(lead: Lead, submitted: string) {
  const c = copy.confirmation;
  const first = safeFirstName(lead.name);
  const heading = first ? c.heading.replace("{name}", first) : c.headingNoName;

  // Only values the visitor picked from fixed lists, never free text (see the note on contactEmails).
  const summary: [string, string][] = [];
  if (lead.needs.length) summary.push([c.summaryRows.needs, pills(lead.needs)]);
  if (lead.providers) summary.push([c.summaryRows.providers, esc(lead.providers)]);
  summary.push([c.summaryRows.submitted, esc(submitted)]);

  const steps = contactPage.steps
    .map(
      (s, i) => `<tr>
<td width="40" style="padding:0 0 16px;vertical-align:top"><div style="width:28px;height:28px;border-radius:999px;background:${i ? "#FFFFFF" : C.orange};border:1px solid ${i ? C.line : C.orange};text-align:center;font:600 13px/28px ${SANS};color:${i ? C.ink : "#FFFFFF"}">${i + 1}</div></td>
<td style="padding:3px 0 16px;vertical-align:top"><p style="margin:0;font:600 15px/1.4 ${SANS};color:${C.fg}">${esc(s.title)}</p><p style="margin:2px 0 0;font:400 14px/1.55 ${SANS};color:${C.muted}">${esc(s.body)}</p></td>
</tr>`,
    )
    .join("");

  const body = `${eyebrow(c.eyebrow)}
<h1 style="margin:0 0 14px;font:700 28px/1.2 ${DISPLAY};letter-spacing:-.01em;color:${C.fg}">${esc(heading)}</h1>
<p style="margin:0 0 28px">${esc(c.body)}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px;background:${C.tint};border-radius:6px"><tr><td style="padding:18px 22px 10px">
${sectionTitle(c.summaryTitle)}${rows(summary)}</td></tr></table>
${sectionTitle(c.stepsTitle)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 20px">${steps}</table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${C.line}"><tr><td style="padding:24px 0 0">
<p style="margin:0 0 4px;font:600 16px/1.4 ${DISPLAY};color:${C.fg}">${esc(c.sooner)}</p>
<p style="margin:0 0 16px;font:400 15px/1.55 ${SANS};color:${C.muted}">${esc(c.soonerBody)}</p>
${button(company.phoneHref, `${c.callLabel} ${company.phoneDisplay}`)}
<p style="margin:16px 0 0;padding:12px 14px;border-radius:6px;background:${C.peach};font:400 13px/1.5 ${SANS};color:${C.fg}">${esc(c.privacy)}</p>
</td></tr></table>`;

  const text = [
    heading, "", c.body, "",
    `${c.summaryTitle}:`,
    ...(lead.needs.length ? [`- ${c.summaryRows.needs}: ${lead.needs.join(", ")}`] : []),
    ...(lead.providers ? [`- ${c.summaryRows.providers}: ${lead.providers}`] : []),
    `- ${c.summaryRows.submitted}: ${submitted}`, "",
    `${c.stepsTitle}:`,
    ...contactPage.steps.map((s, i) => `${i + 1}. ${s.title}. ${s.body}`), "",
    `${c.sooner} ${c.soonerBody} ${company.phoneDisplay}`, "",
    c.privacy, "", "--",
    company.name, ...company.addressLines, `${company.phoneDisplay} · ${company.email} · ${copy.website.label}`, "",
    c.footerWhy,
  ].join("\n");

  return {
    subject: c.subject,
    html: layout({ title: c.subject, preheader: c.preheader, body, footer: contactFooter(esc(c.footerWhy)) }),
    text,
  };
}

/* ---------- 2. Lead notification to the team ---------- */

export function leadEmail(lead: Lead, submitted: string) {
  const l = copy.lead;
  const first = safeFirstName(lead.name) || lead.name;
  const subject = `New inquiry: ${lead.practice} (${lead.needs.join(", ") || "general"})`;
  const replyHref = `mailto:${lead.email}?subject=${encodeURIComponent(`Your free practice review with ${company.name}`)}`;

  const details: [string, string][] = [
    [l.rows.email, link(`mailto:${lead.email}`, lead.email)],
    [l.rows.phone, link(telHref(lead.phone), prettyPhone(lead.phone))],
    [l.rows.practice, esc(lead.practice)],
    [l.rows.providers, esc(lead.providers || "—")],
    [l.rows.state, esc(lead.state || "—")],
    [l.rows.needs, lead.needs.length ? pills(lead.needs) : "—"],
  ];

  const message = lead.message
    ? esc(lead.message).replace(/\r?\n/g, "<br>")
    : `<span style="color:${C.muted}">${esc(l.noMessage)}</span>`;

  const body = `${eyebrow(l.eyebrow)}
<h1 style="margin:0 0 4px;font:700 28px/1.2 ${DISPLAY};letter-spacing:-.01em;color:${C.fg}">${esc(lead.name)}</h1>
<p style="margin:0 0 14px;font:400 17px/1.5 ${SANS};color:${C.muted}">${esc(lead.practice)}</p>
${lead.needs.length ? `<div style="margin:0 0 20px">${pills(lead.needs)}</div>` : ""}
<div style="margin:0 0 28px">${button(replyHref, `${l.replyLabel} ${first}`)}${button(telHref(lead.phone), `${l.callLabel} ${prettyPhone(lead.phone)}`, "outline")}</div>
${sectionTitle(l.messageTitle)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px"><tr>
<td style="padding:16px 20px;background:${C.tint};border-left:3px solid ${C.orange};border-radius:0 6px 6px 0;font:400 15px/1.6 ${SANS};color:${C.fg}">${message}</td></tr></table>
${sectionTitle(l.detailsTitle)}${rows(details)}`;

  const text = [
    `${l.eyebrow}: ${lead.name}, ${lead.practice}`, "",
    ...Object.entries({
      [l.rows.email]: lead.email, [l.rows.phone]: prettyPhone(lead.phone), [l.rows.practice]: lead.practice,
      [l.rows.providers]: lead.providers || "—", [l.rows.state]: lead.state || "—", [l.rows.needs]: lead.needs.join(", ") || "—",
    }).map(([k, v]) => `${k}: ${v}`),
    "", `${l.messageTitle}:`, lead.message || l.noMessage, "", `Submitted ${submitted}`,
  ].join("\n");

  return {
    subject,
    html: layout({
      title: subject,
      preheader: `${lead.name}, ${lead.practice}: ${lead.needs.join(", ") || "general inquiry"}`,
      body,
      footer: `${esc(l.footer.replace("{name}", first))}<br>${esc(submitted)}`,
    }),
    text,
  };
}
