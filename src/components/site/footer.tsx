import Link from "next/link";
import glassesCutout from "@/assets/photos/cutout-glasses.webp";
import { closing, company, cta, legal, nav, services } from "@/content/site";
import { Cutout } from "../ui/cutout";
import { Logo } from "../ui/logo";
import { ButtonLink, Container, Icon, reveal } from "../ui/primitives";

/** Closing CTA band (the page's pale tint) followed by the ink footer. Rendered on every page via the layout. */
export function Footer() {
  return (
    <footer>
      <section className="band-glow relative bg-orange py-20 md:py-28" aria-labelledby="closing-title">
        {/* Decorative clinician standing on the band's bottom edge (wide screens only, so it never touches the text) */}
        <Cutout src={glassesCutout} sizes="300px" className="absolute bottom-0 left-[max(1.5rem,calc(50%-37.5rem))] hidden w-[300px] xl:block" />
        <Container className="flex flex-col items-center gap-6 text-center">
          <div className="flex flex-col items-center gap-6" {...reveal()}>
          <h2 id="closing-title" className="max-w-[22ch] font-bold text-white">{closing.titleStart} {closing.titleHighlight}</h2>
          <p className="max-w-[46ch] text-white">{closing.body}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-2" {...reveal(160)}>
            <ButtonLink href={cta.href} variant="light">{cta.primary}</ButtonLink>
            <ButtonLink href={company.phoneHref} variant="ghost-dark">Call {company.phoneDisplay}</ButtonLink>
          </div>
        </Container>
      </section>

      <div className="band-glow-ink bg-ink text-on-ink">
        <Container className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1.2fr]">
          <div className="flex flex-col gap-5">
            <Logo tone="dark" />
            <p className="max-w-[34ch] text-sm">
              Credentialing, medical billing and licensing for US healthcare practices. {company.tagline}.
            </p>
          </div>
          <FooterCol title="Company">
            {nav.map((n) => <li key={n.href}><Link href={n.href} className="inline-flex min-h-11 items-center hover:text-white">{n.label}</Link></li>)}
          </FooterCol>
          <FooterCol title="Services">
            {services.map((s) => <li key={s.id}><Link href={`/services#${s.id}`} className="inline-flex min-h-11 items-center hover:text-white">{s.title}</Link></li>)}
          </FooterCol>
          <FooterCol title="Contact">
            <li><a href={company.phoneHref} className="inline-flex min-h-11 items-center gap-3 tabular-nums hover:text-white"><Icon name="phone" className="h-4 w-4 shrink-0 text-orange" />{company.phoneDisplay}</a></li>
            <li><a href={`mailto:${company.email}`} className="inline-flex min-h-11 items-center gap-3 hover:text-white"><Icon name="mail" className="h-4 w-4 shrink-0 text-orange" />{company.email}</a></li>
            {company.hours && <li className="inline-flex min-h-11 items-center gap-3"><Icon name="clock" className="h-4 w-4 shrink-0 text-orange" />{company.hours}</li>}
            {company.address && (
              <li>
                <a href={company.addressMapHref} className="inline-flex min-h-11 items-center gap-3 py-2 hover:text-white" rel="noopener" target="_blank">
                  <Icon name="map" className="h-4 w-4 shrink-0 text-orange" />
                  <address className="not-italic">
                    {company.addressLines.map((l) => <span key={l} className="block">{l}</span>)}
                  </address>
                </a>
              </li>
            )}
            <li className="flex flex-wrap gap-x-5">
              <a href={company.social.linkedin} className="inline-flex min-h-11 items-center hover:text-white" rel="noopener" target="_blank">LinkedIn</a>
              <a href={company.social.facebook} className="inline-flex min-h-11 items-center hover:text-white" rel="noopener" target="_blank">Facebook</a>
              <a href={company.social.instagram} className="inline-flex min-h-11 items-center hover:text-white" rel="noopener" target="_blank">Instagram</a>
            </li>
          </FooterCol>
        </Container>

        <Container className="flex flex-col gap-4 border-t border-ink-line py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {company.copyrightYear} Kram Healthcare. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-x-5">
            {/* No dead "#" links: an item becomes a link only once its page exists. Spans share the links' box so the row stays on one baseline. */}
            {legal.map((l) => (
              <li key={l.label}>{l.href ? <Link href={l.href} className="inline-flex min-h-11 items-center hover:text-white">{l.label}</Link> : <span className="inline-flex min-h-11 items-center">{l.label}</span>}</li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-base font-semibold tracking-[-0.01em] text-white">{title}</h3>
      <ul className="mt-2 flex flex-col text-sm">{children}</ul>
    </div>
  );
}
