import type { Metadata } from "next";
import Image from "next/image";
import { MotionObserver } from "@/components/ui/motion-observer";
import { Faq } from "@/components/sections/faq";
import { PageHero } from "@/components/sections/page-hero";
import { Process } from "@/components/sections/process";
import { serviceIcons, servicePhotos } from "@/components/sections/service-cards";
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
                  className={`flex flex-col gap-10 rounded-[32px] p-6 sm:p-10 lg:gap-12 lg:p-14 ${dark ? "bg-ink text-white" : "bg-stone"}`}
                  {...reveal()}
                >
                  {/* Row 1: overview + photo. The photo stretches to the copy's height on desktop, so neither side leaves a gap. */}
                  <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
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

                    <div className="relative aspect-[3/2] overflow-hidden rounded-[24px] lg:aspect-auto lg:min-h-[360px]">
                      <Image
                        src={servicePhotos[s.id].src}
                        alt={servicePhotos[s.id].alt}
                        fill
                        sizes="(min-width: 1024px) 520px, 100vw"
                        quality={70}
                        placeholder="blur"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Row 2: the long list gets the full width and flows into columns instead of stretching one side down. */}
                  <div className={`rounded-[24px] p-3 sm:p-4 ${dark ? "bg-ink-2" : "bg-white"}`}>
                    <h3 className={`px-4 pb-2 pt-3 text-sm font-normal ${dark ? "text-on-ink" : "text-muted"}`}>What&apos;s included</h3>
                    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {s.items.map((it) => (
                        <li key={it.name} className={`flex items-start gap-3.5 rounded-2xl px-4 py-3.5 transition-colors duration-150 ${dark ? "bg-white/5 hover:bg-white/10" : "bg-stone hover:bg-peach-2"}`}>
                          <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${dark ? "bg-orange/15 text-orange-soft" : "bg-peach text-orange-ink"}`}>
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          <span>
                            <span className="block text-[1rem] font-medium">{it.name}</span>
                            <span className={`mt-0.5 block text-[0.93rem] ${dark ? "text-on-ink" : "text-muted"}`}>{it.detail}</span>
                          </span>
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
