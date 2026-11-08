import Link from "next/link";
import { closing, company, cta, legal, nav, services } from "@/content/site";
import { Logo } from "../ui/logo";
import { ButtonLink, Container } from "../ui/primitives";

/** Closing CTA band (the page's pale tint) followed by the ink footer. Rendered on every page via the layout. */
export function Footer() {
  return (
    <footer>
      <section className="bg-tint py-20 md:py-28" aria-labelledby="closing-title">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 id="closing-title" className="max-w-[20ch]">{closing.titleStart} {closing.titleHighlight}</h2>
          <p className="max-w-[46ch] text-muted">{closing.body}</p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <ButtonLink href={cta.href}>{cta.primary}</ButtonLink>
            <ButtonLink href={company.phoneHref} variant="white">Call {company.phoneDisplay}</ButtonLink>
          </div>
        </Container>
      </section>

      <div className="bg-ink text-on-ink">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.5fr_1fr_1.2fr_1.2fr] lg:px-10">
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
        </div>

        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 border-t border-ink-line px-5 py-6 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>© {company.copyrightYear} Kram Healthcare. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {/* No dead "#" links: an item becomes a link only once its page exists */}
            {legal.map((l) => (
              <li key={l.label}>{l.href ? <Link href={l.href} className="hover:text-white">{l.label}</Link> : <span>{l.label}</span>}</li>
            ))}
          </ul>
        </div>
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
