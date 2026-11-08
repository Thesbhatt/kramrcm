import Link from "next/link";
import { closing, company, cta, legal, nav, services } from "@/content/site";
import { Logo } from "../ui/logo";
import { Arrow, ButtonLink, Words } from "../ui/primitives";

export function Footer() {
  return (
    <footer>
      <div className="closing-card overflow-hidden bg-ink text-on-ink">
        {/* Closing CTA */}
        <div className="relative mx-auto flex max-w-[1240px] flex-col gap-8 px-6 py-16 sm:px-10 md:flex-row md:items-end md:justify-between md:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgb(247_124_39/0.45),transparent_65%)]" />
          <div className="relative flex flex-col gap-4">
            <h2 className="words-view max-w-[18ch] text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] text-white">
              <Words text={closing.titleStart} />{" "}
              <span className="text-orange"><Words text={closing.titleHighlight} from={closing.titleStart.split(" ").length} /></span>
            </h2>
            <p className="max-w-[46ch] text-lg">{closing.body}</p>
          </div>
          <div className="relative flex flex-wrap gap-3">
            <ButtonLink href={cta.href} variant="soft" size="lg">
              {cta.primary} <Arrow />
            </ButtonLink>
            <ButtonLink href={company.phoneHref} variant="ghost-dark" size="lg">
              Call {company.phoneDisplay}
            </ButtonLink>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 border-t border-ink-line px-6 py-14 sm:grid-cols-2 sm:px-10 lg:grid-cols-[1.5fr_1fr_1.2fr_1.2fr]">
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

        <div className="mx-auto flex max-w-[1240px] flex-col gap-4 border-t border-ink-line px-6 py-6 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-10">
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
      <h3 className="text-sm font-medium tracking-normal text-white">{title}</h3>
      <ul className="mt-4 flex flex-col gap-2.5 text-sm">{children}</ul>
    </div>
  );
}
