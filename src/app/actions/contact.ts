"use server";

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

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const str = (fd: FormData, key: string, max = 200) => String(fd.get(key) ?? "").trim().slice(0, max);

/**
 * Contact form handler. Sends through the Resend REST API (no SDK, keeps the bundle small).
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
    needs: fd.getAll("needs").map(String).slice(0, 6).join(", "),
    message: str(fd, "message", 2000),
    consent: fd.get("consent") === "on",
  };

  const values: ContactValues = {
    name: data.name, email: data.email, phone: data.phone, practice: data.practice,
    providers: data.providers, state: data.state, message: data.message,
    needs: fd.getAll("needs").map(String).slice(0, 6), consent: data.consent,
  };

  const fieldErrors: Partial<Record<Field, string>> = {};
  if (data.name.length < 2) fieldErrors.name = "Enter your full name.";
  if (!EMAIL_RE.test(data.email)) fieldErrors.email = "Enter a valid work email, like name@practice.com.";
  if (data.phone.replace(/\D/g, "").length < 10) fieldErrors.phone = "Enter a 10-digit phone number.";
  if (data.practice.length < 2) fieldErrors.practice = "Enter your practice or organization name.";
  if (!data.consent) fieldErrors.consent = "Please agree so we can contact you about this request.";
  if (Object.keys(fieldErrors).length) {
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors, values };
  }

  const rows = [
    ["Name", data.name], ["Email", data.email], ["Phone", data.phone], ["Practice", data.practice],
    ["Providers", data.providers], ["State", data.state], ["Needs", data.needs], ["Message", data.message],
  ];

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info("[contact] RESEND_API_KEY not set — lead logged only:", Object.fromEntries(rows));
    return { status: "success", name: data.name.split(" ")[0] };
  }

  const html = `<h2>New website inquiry</h2><table cellpadding="6">${rows
    .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(v || "—")}</td></tr>`)
    .join("")}</table>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Kram RCM <website@kramhealthcare.com>",
        to: (process.env.CONTACT_TO_EMAIL ?? "info@kramrcm.com").split(","),
        reply_to: data.email,
        subject: `New inquiry: ${data.practice} (${data.needs || "general"})`,
        html,
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
  } catch (err) {
    console.error("[contact] send failed", err);
    return { status: "error", message: "We couldn't send your message. Please call us or email info@kramrcm.com.", values };
  }

  return { status: "success", name: data.name.split(" ")[0] };
}
