import Link from "next/link";
import duoCutout from "@/assets/photos/cutout-duo.webp";
import { services, servicesSection } from "@/content/site";
import { Cutout } from "../ui/cutout";
import { Arrow, Check, Container, Icon, reveal } from "../ui/primitives";
import { serviceIcons } from "./service-cards";

/**
 * Home services, styled like the contact band: an orange band with the headline and an animated clinician cutout on the
 * left (the cutout stays pinned to the bottom of the screen while the long list scrolls) and the three services in a white
 * card on the right. Each row: icon, title, one sentence, the service's own item list (same labels as /services) and a
 * "Learn more" link. Each row reveals in turn (ticks draw in, the icon sends out a ring once) and has a light that follows the pointer.
 */
export function ServiceList() {
  return (
    <section id="services" className="band-glow bg-orange py-20 md:py-28">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4" {...reveal()}>
            <h2 className="max-w-[15ch] font-bold text-white">{servicesSection.title}</h2>
            <p className="max-w-[38ch] text-white">{servicesSection.body}</p>
          </div>
          {/* Decorative cutout: hidden on small screens, pinned to the viewport bottom on desktop, flush with the band's bottom edge at the end */}
          <div className="mt-auto hidden lg:-mb-28 lg:sticky lg:bottom-0 lg:block">
            <Cutout src={duoCutout} sizes="(min-width: 1024px) 440px, 0px" className="relative mx-auto w-full max-w-[460px]" delay={150} />
          </div>
        </div>

        <ul className="rounded-2xl bg-white p-2 shadow-[0_30px_70px_-34px_rgb(64_64_69/0.6)] sm:p-3">
          {services.map((s, n) => (
            <li key={s.id} className="group row-link spot relative rounded-xl border-b border-line px-5 py-7 last:border-b-0 hover:bg-tint sm:px-7" {...reveal(n * 140)}>
              {/* Orange bar grows down the left edge on hover; the big number warms up with it */}
              <span aria-hidden="true" className="svc-bar absolute bottom-7 left-0 top-7 w-[3px] rounded-full bg-orange" />
              <div className="flex items-start gap-4">
                <span className="svc-icon relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange text-white">
                  <Icon name={serviceIcons[s.id]} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">{s.title}</h3>
                  <p className="mt-1.5 max-w-[48ch] text-muted">{s.body}</p>
                </div>
              </div>
              <ul className="mt-5 grid gap-x-6 gap-y-2.5 text-sm sm:grid-cols-2 sm:pl-[3.75rem]">
                {s.items.map((item, i) => (
                  <li key={item} className="flex items-start gap-2.5" style={{ ["--i" as string]: i }}>
                    <Check className="tick mt-[3px] h-3.5 w-3.5 shrink-0 text-orange-ink" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-end justify-between gap-4 sm:pl-[3.75rem]">
              <Link
                href={`/services#${s.id}`}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.04em] text-orange-ink after:absolute after:inset-0 group-hover:underline group-hover:underline-offset-4 "
              >
                {servicesSection.learnMore}<span className="sr-only"> about {s.title}</span> <span className="row-arrow inline-flex"><Arrow /></span>
              </Link>
                <span aria-hidden="true" className="svc-num hidden font-display text-6xl font-light leading-none tracking-[-0.04em] sm:block">
                  {String(n + 1).padStart(2, "0")}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
