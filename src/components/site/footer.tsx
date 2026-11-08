import Link from "next/link";
import { closing, company, cta, legal, nav, services } from "@/content/site";
import { Logo } from "../ui/logo";
import { ButtonLink, Container, reveal } from "../ui/primitives";

/** Closing CTA band (the page's pale tint) followed by the ink footer. Rendered on every page via the layout. */
export function Footer() {
  return (
    <footer>
      <section className="bg-tint py-20 md:py-28" aria-labelledby="closing-title">
        <Container className="flex flex-col items-center gap-6 text-center">
          <div className="flex flex-col items-center gap-6" {...reveal()}>
          <h2 id="closing-title" className="max-w-[26ch]">{closing.titleStart} {closing.titleHighlight}</h2>
          <p className="max-w-[46ch] text-muted">{closing.body}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-2" {...reveal(160)}>
            <ButtonLink href={cta.href}>{cta.primary}</ButtonLink>
            <ButtonLink href={company.phoneHref} variant="white">Call {company.phoneDisplay}</ButtonLink>
          </div>
        </Container>
      </section>

      <div className="bg-ink text-on-ink">
        <Container className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1.2fr]">
          <div className="flex flex-col gap-5">
            <Logo tone="dark" />
            <p className="max-w-[34ch] text-sm">
              Credentialing, medical billing and licensing for US healthcare practices. {company.tagline}.
            </p>
          </div>
          <FooterCol title="Company">
            {nav.map((n) => <li key={n.href}><Link href={n.href} className="hover:text-white">{n.label}</Link></li>)}
          </FooterCol>
          <FooterCol title="Services">
            {services.map((s) => <li key={s.id}><Link href={`/services#${s.id}`} className="hover:text-white">{s.title}</Link></li>)}
          </FooterCol>
          <FooterCol title="Contact">
            <li><a href={company.phoneHref} className="tabular-nums hover:text-white">{company.phoneDisplay}</a></li>
            <li><a href={`mailto:${company.email}`} className="hover:text-white">{company.email}</a></li>
            {company.hours && <li>{company.hours}</li>}
            {company.address && <li>{company.address}</li>}
            <li className="flex gap-4 pt-1">
              <a href={company.social.linkedin} className="hover:text-white" rel="noopener" target="_blank">LinkedIn</a>
              <a href={company.social.facebook} className="hover:text-white" rel="noopener" target="_blank">Facebook</a>
              <a href={company.social.instagram} className="hover:text-white" rel="noopener" target="_blank">Instagram</a>
            </li>
          </FooterCol>
        </Container>

        <Container className="flex flex-col gap-4 border-t border-ink-line py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {company.copyrightYear} Kram Healthcare. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {/* No dead "#" links: an item becomes a link only once its page exists */}
            {legal.map((l) => (
              <li key={l.label}>{l.href ? <Link href={l.href} className="hover:text-white">{l.label}</Link> : <span>{l.label}</span>}</li>
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
      <h3 className="font-sans text-sm font-medium tracking-normal text-white">{title}</h3>
      <ul className="mt-4 flex flex-col gap-2.5 text-sm">{children}</ul>
    </div>
  );
}
