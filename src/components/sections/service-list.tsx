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
    <section id="services" className="bg-white py-20 md:py-28">
      <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-10">
        {/* Orange panel (not a full-width band) holds the headline and the cutout inside it, so the figure can never cover the text.
            On desktop it sticks while the list scrolls; the cutout sits at its bottom edge. */}
        <div className="band-glow relative flex flex-col gap-8 overflow-hidden rounded-3xl bg-orange px-7 pt-9 sm:px-9 sm:pt-11 lg:sticky lg:top-28 lg:self-start lg:min-h-[min(640px,calc(100svh-8rem))]">
          <div className="flex flex-col gap-4 pb-8 lg:pb-0" {...reveal()}>
            <h2 className="max-w-[15ch] font-bold text-white">{servicesSection.title}</h2>
            <p className="max-w-[38ch] text-white">{servicesSection.body}</p>
          </div>
          {/* Decorative cutout: desktop only, standing on the panel's bottom edge */}
          <div className="mt-auto hidden lg:block">
            <Cutout src={duoCutout} sizes="(min-width: 1024px) 400px, 0px" className="relative mx-auto w-full max-w-[380px]" delay={150} />
          </div>
        </div>

        <ul className="rounded-2xl border border-line bg-white p-2 sm:p-3">
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
