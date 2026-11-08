import type { Metadata } from "next";
import Image from "next/image";
import { MotionObserver } from "@/components/ui/motion-observer";
import { Faq } from "@/components/sections/faq";
import { PageHero } from "@/components/sections/page-hero";
import { Process } from "@/components/sections/process";
import { serviceIcons, servicePhotos } from "@/components/sections/service-cards";
import { Arrow, Check, Container, Icon, reveal } from "@/components/ui/primitives";
import { services } from "@/content/site";

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

      {/* One compact card per service: photo beside title, one sentence and a short checklist (like the live site). */}
      <div className="flex flex-col gap-4 pb-20 md:pb-28">
        {services.map((s, i) => {
          const dark = i === 1;
          const flip = i % 2 === 1;
          return (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`}>
              <Container>
                <div
                  className={`grid grid-cols-1 gap-8 rounded-2xl p-4 sm:p-6 lg:grid-cols-[5fr_7fr] lg:items-stretch lg:gap-12 lg:p-6 ${dark ? "bg-ink text-white" : "bg-stone"}`}
                  {...reveal()}
                >
                  <div className={`relative aspect-[3/2] overflow-hidden rounded-xl lg:aspect-auto lg:min-h-[320px] ${flip ? "lg:order-last" : ""}`}>
                    <Image
                      src={servicePhotos[s.id].src}
                      alt={servicePhotos[s.id].alt}
                      fill
                      sizes="(min-width: 1024px) 460px, 100vw"
                      quality={70}
                      placeholder="blur"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-5 px-2 pb-4 sm:px-2 lg:py-6 lg:pr-6">
                    <div className="flex items-center gap-3">
                      <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${"bg-orange text-white"}`}>
                        <Icon name={serviceIcons[s.id]} className="h-5 w-5" />
                      </span>
                      <span className={`text-sm ${dark ? "text-orange-soft" : "text-orange-ink"}`}>0{i + 1} · {s.eyebrow}</span>
                    </div>
                    <h2 id={`${s.id}-title`} className="text-[clamp(1.75rem,3vw,2.4rem)] leading-[1.08]">{s.title}</h2>
                    <p className={`text-lg ${dark ? "text-on-ink" : "text-muted"}`}>{s.body}</p>
                    <ul className={`grid grid-cols-1 gap-x-8 border-t pt-5 sm:grid-cols-2 ${dark ? "border-ink-line" : "border-line"}`}>
                      {s.items.map((it) => (
                        <li key={it} className="flex items-start gap-2.5 py-2">
                          <Check className={`mt-1 h-4 w-4 shrink-0 ${dark ? "text-orange-soft" : "text-orange-ink"}`} />
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
