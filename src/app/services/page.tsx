import type { Metadata } from "next";
import { MotionObserver } from "@/components/ui/motion-observer";
import { Faq } from "@/components/sections/faq";
import { PageHero } from "@/components/sections/page-hero";
import { Process } from "@/components/sections/process";
import { serviceIcons } from "@/components/sections/service-cards";
import { Arrow, ButtonLink, Check, Container, Icon, reveal } from "@/components/ui/primitives";
import { cta, serviceDetail, services } from "@/content/site";

export const metadata: Metadata = {
  title: "Services: Credentialing, Medical Billing & Licensing",
  description:
    "Provider enrollment and credentialing, CAQH, Medicare and Medicaid enrollment, medical billing and RCM, denial management, and multi-state licensing for US practices.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumb="Services"
        start="Everything from enrollment to"
        word="payment"
        body="Three services that cover the full revenue cycle. Use one, or hand us all three and work with a single accountable team."
      >
        <ul className="flex flex-col gap-2">
          {services.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="group flex items-center justify-between gap-4 rounded-2xl bg-stone px-5 py-4 transition-colors hover:bg-peach-2">
                <span className="flex items-center gap-3.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-orange-ink"><Icon name={serviceIcons[s.id]} /></span>
                  <span className="font-medium">{s.title}</span>
                </span>
                <Arrow />
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      <div className="flex flex-col gap-4 pb-20 md:pb-28">
        {services.map((s, i) => {
          const d = serviceDetail[s.id];
          const dark = i === 1;
          return (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`}>
              <Container>
                <div
                  className={`grid grid-cols-1 gap-10 rounded-[32px] p-6 sm:p-10 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:p-14 ${dark ? "bg-ink text-white" : "bg-stone"}`}
                  {...reveal()}
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${dark ? "bg-orange text-fg" : "bg-white text-orange-ink"}`}>
                        <Icon name={serviceIcons[s.id]} className="h-6 w-6" />
                      </span>
                      <span className={`text-sm ${dark ? "text-orange-soft" : "text-orange-ink"}`}>0{i + 1} · {s.eyebrow}</span>
                    </div>
                    <h2 id={`${s.id}-title`} className="text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.06]">{s.title}</h2>
                    <p className={`text-lg ${dark ? "text-on-ink" : "text-muted"}`}>{s.body}</p>
                    <dl className={`grid grid-cols-1 gap-4 border-t pt-6 sm:grid-cols-2 ${dark ? "border-ink-line" : "border-line"}`}>
                      <div>
                        <dt className="text-sm font-medium">What changes</dt>
                        <dd className={`mt-1 text-[0.95rem] ${dark ? "text-on-ink" : "text-muted"}`}>{d.outcome}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium">Best for</dt>
                        <dd className={`mt-1 text-[0.95rem] ${dark ? "text-on-ink" : "text-muted"}`}>{d.forWho}</dd>
                      </div>
                    </dl>
                    <div className="pt-2">
                      <ButtonLink href={cta.href} variant={dark ? "white" : "dark"}>{cta.primary} <Arrow /></ButtonLink>
                    </div>
                  </div>

                  <div className={`self-start rounded-[24px] p-3 ${dark ? "bg-ink-2" : "bg-white"}`}>
                    <p className={`px-4 pb-2 pt-3 text-sm ${dark ? "text-on-ink" : "text-muted"}`}>What&apos;s included</p>
                    <ul className="flex flex-col">
                      {s.items.map((it) => (
                        <li key={it} className={`flex items-center gap-3.5 rounded-2xl px-4 py-3.5 text-[1rem] ${dark ? "hover:bg-white/5" : "hover:bg-stone"}`}>
                          <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${dark ? "bg-orange/15 text-orange-soft" : "bg-peach text-orange-ink"}`}>
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Container>
            </section>
          );
        })}
      </div>

      <Process />
      <Faq />
      <MotionObserver />
    </>
  );
}
