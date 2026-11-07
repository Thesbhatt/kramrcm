import Link from "next/link";
import { company, cta, nav, services } from "@/content/site";
import { Logo } from "../ui/logo";
import { Arrow, ButtonLink, Words } from "../ui/primitives";

const legal = ["Privacy Policy", "Terms of Use", "HIPAA Notice", "Accessibility"]; // TODO(client): legal pages

export function Footer() {
  return (
    <footer className="px-2 pb-2 sm:px-3 sm:pb-3">
      <div className="overflow-hidden rounded-[28px] bg-ink text-on-ink">
        {/* Closing CTA */}
        <div className="relative mx-auto flex max-w-[1240px] flex-col gap-8 px-6 py-16 sm:px-10 md:flex-row md:items-end md:justify-between md:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgb(247_124_39/0.22),transparent_65%)]" />
          <h2 className="words-view relative max-w-[18ch] text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] text-white">
            <Words text="Ready to get your providers enrolled and" />{" "}
            <span className="text-orange-soft"><Words text="paid?" from={7} /></span>
          </h2>
          <div className="relative flex flex-wrap gap-3">
            <ButtonLink href={cta.href} variant="white" size="lg" className="ring-0">
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
            {legal.map((l) => <li key={l}><a href="#" className="hover:text-white">{l}</a></li>)}
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
