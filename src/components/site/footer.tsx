import Link from "next/link";
import type { ReactNode } from "react";
import consultantCutout from "@/assets/photos/cutout-consultant.webp";
import { closing, company, cta, footer, legal, nav, services } from "@/content/site";
import { Cutout } from "../ui/cutout";
import { Logo } from "../ui/logo";
import { ButtonLink, Container, Icon, type IconName, reveal, stagger } from "../ui/primitives";

/** Closing CTA band (orange) followed by the gray footer. Rendered on every page via the layout. */
export function Footer() {
  return (
    <footer>
      <section className="band-glow relative bg-orange py-20 md:py-28" aria-labelledby="closing-title">
        {/* Decorative client photo (Nov 12 2026) standing on the band's bottom edge (wide screens only, so it never touches the text) */}
        <Cutout src={consultantCutout} sizes="300px" className="absolute bottom-0 left-[max(1.5rem,calc(50%-37.5rem))] hidden w-[300px] xl:block" />
        <Container className="flex flex-col items-center gap-6 text-center">
          <div className="flex flex-col items-center gap-6" {...reveal()}>
          <h2 id="closing-title" className="max-w-[24ch] font-bold text-white">{closing.titleStart} {closing.titleHighlight}</h2>
          <p className="max-w-[46ch] text-white">{closing.body}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-2" {...reveal(160)}>
            <ButtonLink href={cta.href} variant="light">{cta.primary}</ButtonLink>
            <ButtonLink href={company.phoneHref} variant="ghost-dark">Call {company.phoneDisplay}</ButtonLink>
          </div>
        </Container>
      </section>

      {/* Flat logo gray, no orange wash (client: the footer matches the logo). Depth comes from type and touch:
          a hairline that draws in, contact tiles, and the giant wordmark that light sweeps through once and the cursor lights. */}
      <div className="relative overflow-clip bg-ink-deep text-on-ink">
        <div className="f-dots pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative" {...reveal()} style={{ "--rise": "0px" } as React.CSSProperties}>
          <span className="rule f-rule block h-px w-full" aria-hidden="true" />
        </div>

        <Container className="relative">
          {/* Brand + link columns */}
          <div className="grid grid-cols-1 gap-12 pt-16 pb-12 md:pt-20 lg:grid-cols-12 lg:gap-8">
            <div className="flex flex-col gap-6 lg:col-span-5" {...reveal()}>
              <Logo tone="dark" />
              <p className="font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-white">
                {footer.taglineStart} <span className="whitespace-nowrap text-orange-soft">{footer.taglineHighlight}</span>
              </p>
              <p className="max-w-[40ch] text-sm leading-relaxed">{footer.blurb}</p>
            </div>

            <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-7 lg:pl-8" {...stagger}>
              <FooterCol title={footer.columns.company}>
                {nav.map((n) => <li key={n.href}><Link href={n.href} className="f-link">{n.label}</Link></li>)}
              </FooterCol>
              <FooterCol title={footer.columns.services}>
                {services.map((s) => <li key={s.id}><Link href={`/services#${s.id}`} className="f-link">{s.title}</Link></li>)}
              </FooterCol>
              <FooterCol title={footer.columns.follow}>
                <li>
                  <a href={company.social.linkedin} className="f-link" rel="noopener" target="_blank">
                    <LinkedIn />LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              </FooterCol>
            </nav>
          </div>

          {/* Contact tiles: the three ways to reach a person, as big touch targets */}
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-3" {...stagger}>
            <ContactTile href={company.phoneHref} icon="phone" label={footer.contact.call}>
              <span className="tabular-nums">{company.phoneDisplay}</span>
            </ContactTile>
            <ContactTile href={`mailto:${company.email}`} icon="mail" label={footer.contact.email}>
              {company.email}
            </ContactTile>
            {company.address && (
              <ContactTile href={company.addressMapHref} icon="map" label={footer.contact.visit} external>
                <address className="not-italic">
                  {company.addressLines.map((l) => <span key={l} className="block">{l}</span>)}
                </address>
              </ContactTile>
            )}
          </ul>
          {company.hours && (
            <p className="mt-4 inline-flex items-center gap-2 text-sm"><Icon name="clock" className="h-4 w-4 text-orange-soft" />{company.hours}</p>
          )}
        </Container>

        {/* Giant wordmark. Two identical layers: the outlined base, and an orange fill shown only through a mask
            (a one-time sweep, then a spotlight that follows the cursor via PointerGlow's --mx/--my). */}
        <Container className="relative">
          {/* The reveal sits on a wrapper: on .f-mark itself its transition list would replace PointerGlow's --mx/--my easing */}
          <div className="f-reveal mt-14 md:mt-20" aria-hidden="true" {...reveal()} style={{ "--rise": "0px" } as React.CSSProperties}>
            <div className="f-mark">
              <Wordmark className="f-mark-base" />
              <Wordmark className="f-mark-lit absolute inset-0" />
            </div>
          </div>
        </Container>

        <div className="relative border-t border-ink-line">
          <Container className="flex flex-col gap-2 py-5 text-xs sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p>© {company.copyrightYear} {company.name}. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-x-5">
              <ul className="flex flex-wrap items-center gap-x-5">
                {/* No dead "#" links: an item becomes a link only once its page exists. Spans share the links' box so the row stays on one baseline. */}
                {legal.map((l) => (
                  <li key={l.label}>{l.href ? <Link href={l.href} className="f-link min-h-11">{l.label}</Link> : <span className="inline-flex min-h-11 items-center">{l.label}</span>}</li>
                ))}
              </ul>
              {/* "#top" scrolls to the top of the document per the HTML spec, no element or JS needed */}
              <a href="#top" className="group inline-flex min-h-11 items-center gap-2 font-semibold tracking-[0.04em] text-white uppercase">
                {footer.backToTop}
                <span className="grid h-7 w-7 place-items-center rounded-full ring-1 ring-ink-line transition-[background-color,box-shadow] duration-150 group-hover:bg-orange group-hover:ring-orange">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-250 ease-[var(--ease-out-strong)] group-hover:-translate-y-0.5" aria-hidden="true">
                    <path d="M8 13V3.5M4 7l4-4 4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </div>
          </Container>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold tracking-[0.12em] text-orange-soft uppercase">{title}</h3>
      <ul className="mt-3 flex flex-col text-sm">{children}</ul>
    </div>
  );
}

function ContactTile({ href, icon, label, external = false, children }: { href: string; icon: IconName; label: string; external?: boolean; children: ReactNode }) {
  return (
    <li>
      <a
        href={href}
        className="f-tile group relative flex h-full items-start gap-4 rounded-xl bg-white/[0.04] p-5 ring-1 ring-ink-line ring-inset md:p-6"
        {...(external ? { target: "_blank", rel: "noopener" } : {})}
      >
        <span className="f-tile-icon grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-orange text-white">
          <Icon name={icon} className="h-5 w-5" />
        </span>
        <span className="flex min-w-0 flex-col gap-1">
          <span className="text-xs font-semibold tracking-[0.12em] uppercase">{label}</span>
          <span className="font-display text-lg leading-snug font-medium break-words text-white">{children}</span>
          {external && <span className="sr-only"> (opens map in a new tab)</span>}
        </span>
        <svg viewBox="0 0 16 16" className="f-tile-arrow absolute top-5 right-5 h-4 w-4 text-on-ink" aria-hidden="true">
          <path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="f-tile-bar absolute inset-x-5 bottom-0 h-0.5 rounded-full bg-orange" aria-hidden="true" />
      </a>
    </li>
  );
}

/** One layer of the giant wordmark: each letter in its own span so it can rise from the mask (--i staggers it). */
function Wordmark({ className }: { className: string }) {
  return (
    <p className={`f-word ${className}`}>
      {Array.from(footer.wordmark).map((ch, i) => (
        <span key={i} className="f-l" style={{ "--i": i } as React.CSSProperties}>{ch === " " ? "\u00a0" : ch}</span>
      ))}
    </p>
  );
}

function LinkedIn() {
  return (
    <svg viewBox="0 0 24 24" className="mr-2.5 h-4 w-4 shrink-0 text-orange-soft" aria-hidden="true">
      <path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}
