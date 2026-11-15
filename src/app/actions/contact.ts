"use server";

import { after } from "next/server";
import { company, contact as contactCopy } from "@/content/site";
import { confirmationEmail, leadEmail, LOGO_CID, type Lead } from "@/emails/contact";
import { logoPngBase64 } from "@/emails/logo";

export type ContactState =
  | { status: "idle" }
  | { status: "success"; name: string }
  | { status: "error"; message: string; fieldErrors?: Partial<Record<Field, string>>; values?: ContactValues };

/** Echoed back on error so the form can repopulate (React resets uncontrolled fields after an action). */
export type ContactValues = {
  name: string; email: string; phone: string; practice: string;
  providers: string; state: string; message: string; needs: string[]; consent: boolean;
};

type Field = "name" | "email" | "phone" | "practice" | "consent";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const str = (fd: FormData, key: string, max = 200) => String(fd.get(key) ?? "").trim().slice(0, max);

/** Env value with spaces and wrapping quotes removed: the Vercel dashboard keeps quotes that .env strips. */
const env = (k: string) => process.env[k]?.trim().replace(/^(["'])(.*)\1$/, "$2").trim() || undefined;

/** The logo, embedded in both emails and shown via <img src="cid:…">. */
const LOGO = { filename: "kram-rcm-logo.png", content: logoPngBase64, content_id: LOGO_CID };

class ResendError extends Error {}

/** One Resend send. Retries once on network errors, 429 and 5xx; the idempotency key stops a retry from duplicating. */
async function send(key: string, idempotencyKey: string, body: Record<string, unknown>) {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": idempotencyKey },
        body: JSON.stringify(body),
      });
      if (res.ok) return;
      // Resend explains failures in the body (e.g. 403 "domain is not verified", 422 "Invalid `from` field").
      const err = new ResendError(`Resend responded ${res.status}: ${await res.text().catch(() => "")}`);
      if (attempt >= 2 || (res.status !== 429 && res.status < 500)) throw err;
    } catch (err) {
      if (attempt >= 2 || err instanceof ResendError) throw err;
    }
    await new Promise((r) => setTimeout(r, 700));
  }
}

/**
 * Contact form handler. Sends through the Resend REST API (no SDK, keeps the bundle small): the lead to the team
 * (must succeed) and then a confirmation to the visitor (best effort, after the response).
 * Env: RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL (a sender on a Resend-verified domain).
 * Without RESEND_API_KEY (local dev) the lead is logged to the server console instead.
 */
export async function submitContact(_prev: ContactState, fd: FormData): Promise<ContactState> {
  // Honeypot: real people never fill this hidden field.
  if (str(fd, "company_website")) return { status: "success", name: "" };

  const data = {
    name: str(fd, "name", 120),
    email: str(fd, "email", 160),
    phone: str(fd, "phone", 40),
    practice: str(fd, "practice", 160),
    providers: str(fd, "providers", 20),
    state: str(fd, "state", 60),
    message: str(fd, "message", 2000),
    consent: fd.get("consent") === "on",
  };

  const values: ContactValues = { ...data, needs: fd.getAll("needs").map(String).slice(0, 6) };

  const fieldErrors: Partial<Record<Field, string>> = {};
  if (data.name.length < 2) fieldErrors.name = "Enter your full name.";
  if (!EMAIL_RE.test(data.email)) fieldErrors.email = "Enter a valid work email, like name@practice.com.";
  if (data.phone.replace(/\D/g, "").length < 10) fieldErrors.phone = "Enter a 10-digit phone number.";
  if (data.practice.length < 2) fieldErrors.practice = "Enter your practice or organization name.";
  if (!data.consent) fieldErrors.consent = "Please agree so we can contact you about this request.";
  if (Object.keys(fieldErrors).length) {
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors, values };
  }

  // Option fields keep only values from the form's own lists.
  const lead: Lead = {
    name: data.name, email: data.email, phone: data.phone, practice: data.practice, state: data.state, message: data.message,
    providers: contactCopy.providerOptions.includes(data.providers) ? data.providers : "",
    needs: values.needs.filter((n) => contactCopy.needs.includes(n)),
  };
  const submitted = `${new Date().toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "long", timeStyle: "short" })} ET`;
  const leadMail = leadEmail(lead, submitted);
  const confirmation = confirmationEmail(lead, submitted);
  const firstName = data.name.split(" ")[0];

  const key = env("RESEND_API_KEY");
  if (!key) {
    console.info(`[contact] RESEND_API_KEY not set: lead logged only, no emails sent.\n${leadMail.text}`);
    return { status: "success", name: firstName };
  }

  const from = env("CONTACT_FROM_EMAIL") ?? `${company.name} <noreply@kramrcm.com>`;
  const to = (env("CONTACT_TO_EMAIL") ?? company.email).split(",").map((s) => s.trim()).filter(Boolean);
  const id = crypto.randomUUID();

  // 1. The lead to the team. It must arrive, so the visitor sees an error if it fails.
  try {
    await send(key, `lead-${id}`, {
      from, to, reply_to: data.email,
      subject: leadMail.subject, html: leadMail.html, text: leadMail.text, attachments: [LOGO],
    });
  } catch (err) {
    console.error("[contact] lead email failed", err);
    return { status: "error", message: "We couldn't send your message. Please call us or email info@kramrcm.com.", values };
  }

  // 2. The confirmation to the visitor, after the response so it never slows or fails the form. Replies reach the team.
  after(() =>
    send(key, `confirm-${id}`, {
      from, to: [data.email], reply_to: company.email,
      subject: confirmation.subject, html: confirmation.html, text: confirmation.text, attachments: [LOGO],
    }).catch((err) => console.error("[contact] confirmation email failed (the lead was delivered)", err)),
  );

  return { status: "success", name: firstName };
}
