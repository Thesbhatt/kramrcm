import Link from "next/link";
import { services, servicesSection } from "@/content/site";
import { Arrow, Check, Container, Icon, reveal, stagger } from "../ui/primitives";
import { serviceIcons } from "./service-cards";

/**
 * Home services as hairline rows: icon, title, one sentence, the service's own item list (same labels as /services)
 * and a "Learn more →" link, in Medallion's list rhythm.
 */
export function ServiceList() {
  return (
    <section id="services" className="py-20 md:py-28">
      <Container>
        <h2 className="max-w-[24ch]" {...reveal()}>{servicesSection.title}</h2>
        <ul className="mt-12 border-t border-line md:mt-16" {...stagger}>
          {services.map((s) => (
            <li key={s.id} className="group row-link relative border-b border-line hover:bg-tint">
              <div className="grid gap-6 py-8 md:grid-cols-[1.05fr_1fr_auto] md:items-start md:gap-12 md:py-10 md:group-hover:px-4 md:[transition:padding_0.3s_var(--ease-out-soft)]">
                <div className="flex flex-col items-start gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[4px] bg-tint text-orange-ink ring-1 ring-inset ring-line transition-colors group-hover:bg-white">
                    <Icon name={serviceIcons[s.id]} className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-2xl font-light tracking-[-0.02em]">{s.title}</h3>
                  <p className="max-w-[48ch] text-muted">{s.body}</p>
                </div>
                <ul className="flex flex-col gap-2.5 text-sm md:pt-1">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-orange-ink" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services#${s.id}`}
                  className="inline-flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.04em] after:absolute after:inset-0 group-hover:underline group-hover:underline-offset-4 md:pt-3"
                >
                  {servicesSection.learnMore}<span className="sr-only"> about {s.title}</span> <span className="row-arrow inline-flex"><Arrow /></span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
