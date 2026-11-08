"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { company, contact, legal } from "@/content/site";

// The consent line links to the Privacy Policy only once that page exists (an href is set in `legal`).
const privacyHref = legal.find((l) => l.label === "Privacy Policy")?.href ?? null;

const input =
  "w-full rounded-xl bg-white px-4 py-3 text-[0.97rem] text-fg ring-1 ring-line transition-[box-shadow] duration-200 placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-orange aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-[#B42318]";

function Field({
  id, label, error, required, children,
}: { id: string; label: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-fg">
        {label} {required && <span className="text-orange-ink" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && <p id={`${id}-error`} className="text-sm text-[#B42318]">{error}</p>}
    </div>
  );
}

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);
  const fe = state.status === "error" ? state.fieldErrors ?? {} : {};
  const err = (k: keyof typeof fe) => ({ "aria-invalid": fe[k] ? true : undefined, "aria-describedby": fe[k] ? `f-${k}-error` : undefined });
  const v = state.status === "error" ? state.values : undefined;
  const formRef = useRef<HTMLFormElement>(null);

  // After a failed submit, bring the first invalid field (in DOM order) into view and focus it.
  // `state` is a new object on every submission, so this runs again for each failed attempt.
  useEffect(() => {
    if (state.status !== "error") return;
    const first = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
    if (!first) return;
    // Scroll behavior (smooth / reduced-motion) comes from the `html` rule in globals.css.
    first.scrollIntoView({ block: "center" });
    first.focus({ preventScroll: true });
  }, [state]);

  if (state.status === "success") {
    return (
      <div role="status" className="flex min-h-[420px] flex-col items-start justify-center gap-4 rounded-2xl bg-stone p-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-peach-2 text-orange-ink">
          <svg viewBox="0 0 16 16" className="h-6 w-6" aria-hidden="true"><path d="M3.5 8.5 6.5 11.5 12.5 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <h3 className="text-2xl">Thanks{state.name ? `, ${state.name}` : ""}. Your message is in.</h3>
        <p className="text-muted">
          Our team will get back to you.{contact.responseTime ? ` ${contact.responseTime}.` : ""} Need us sooner? Call {company.phoneDisplay}.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={action} noValidate className="relative flex flex-col gap-5 rounded-2xl bg-stone p-5 sm:p-8">
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company_website">Website</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id="f-name" label="Full name" required error={fe.name}>
          <input id="f-name" name="name" autoComplete="name" required defaultValue={v?.name} className={input} {...err("name")} />
        </Field>
        <Field id="f-email" label="Work email" required error={fe.email}>
          <input id="f-email" name="email" type="email" autoComplete="email" required defaultValue={v?.email} className={input} {...err("email")} />
        </Field>
        <Field id="f-phone" label="Phone" required error={fe.phone}>
          <input id="f-phone" name="phone" type="tel" autoComplete="tel" placeholder="(555) 555-0123" required defaultValue={v?.phone} className={input} {...err("phone")} />
        </Field>
        <Field id="f-practice" label="Practice name" required error={fe.practice}>
          <input id="f-practice" name="practice" autoComplete="organization" required defaultValue={v?.practice} className={input} {...err("practice")} />
        </Field>
        <Field id="f-providers" label="Number of providers">
          <select key={v?.providers ?? "init"} id="f-providers" name="providers"className={input} defaultValue={v?.providers ?? ""}>
            <option value="" disabled>Select</option>
            {contact.providerOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </Field>
        <Field id="f-state" label="State(s)">
          <input id="f-state" name="state" autoComplete="address-level1" placeholder="e.g. Texas, or multiple" defaultValue={v?.state} className={input} />
        </Field>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1.5 text-sm font-medium">What do you need help with?</legend>
        <div className="flex flex-wrap gap-2">
          {contact.needs.map((n) => (
            <label key={n} className="cursor-pointer">
              <input type="checkbox" name="needs" value={n} defaultChecked={v?.needs.includes(n)} className="peer sr-only" />
              <span className="inline-block rounded-full bg-white px-4 py-2 text-sm font-medium ring-1 ring-line transition-colors duration-200 hover:ring-graphite peer-checked:bg-ink peer-checked:text-white peer-checked:ring-ink peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-orange">
                {n}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field id="f-message" label="Anything else? (optional)">
        <textarea id="f-message" name="message" rows={4} defaultValue={v?.message} className={`${input} resize-y`} placeholder="e.g. Adding two new NPs in January; need Medicare and BCBS enrollment." />
      </Field>

      <p className="rounded-xl bg-peach-2 px-4 py-3 text-sm text-fg ring-1 ring-peach-line">{contact.phiNotice}</p>

      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-3 text-sm text-muted">
          <input type="checkbox" name="consent" defaultChecked={v?.consent} className="mt-0.5 h-4 w-4 shrink-0 accent-orange" {...err("consent")} />
          <span>
            {contact.consent.lead}{" "}
            {privacyHref && (
              <>
                <Link href={privacyHref} className="underline underline-offset-2 hover:text-fg">{contact.consent.privacyLabel}</Link>{" "}
                {contact.consent.join}{" "}
              </>
            )}
            {contact.consent.body}
          </span>
        </label>
        {fe.consent && <p id="f-consent-error" className="text-sm text-[#B42318]">{fe.consent}</p>}
      </div>

      {state.status === "error" && !Object.keys(fe).length && (
        <p role="alert" className="text-sm text-[#B42318]">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group inline-flex items-center justify-center gap-2 self-start rounded-full bg-ink px-7 py-3.5 font-medium text-white transition-[transform,box-shadow,opacity] duration-200 hover:shadow-[0_12px_24px_-12px_rgb(47_51_54/0.7)] disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {pending ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" /> Sending…
          </>
        ) : (
          contact.submit
        )}
      </button>
      <p className="sr-only" aria-live="polite">{state.status === "error" ? state.message : ""}</p>
    </form>
  );
}
