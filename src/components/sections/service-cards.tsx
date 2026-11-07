import Link from "next/link";
import { services } from "@/content/site";
import { Arrow, Check, Container, Icon, SectionHeading, reveal, type IconName } from "../ui/primitives";

export const serviceIcons: Record<string, IconName> = { credentialing: "shield", billing: "receipt", licensing: "map" };

/** Three service cards linking into /services. The middle one is the dark "featured" card. */
export function ServiceCards({ heading = true }: { heading?: boolean }) {
  return (
    <section className="pb-20 md:pb-28">
      <Container className="flex flex-col gap-12">
        {heading && (
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Services" title="Three services, one accountable team" />
            <Link href="/services" className="group inline-flex items-center gap-2 self-start font-medium md:self-auto" {...reveal()}>
              All services <Arrow />
            </Link>
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const dark = i === 1;
            return (
              <Link
                key={s.id}
                href={`/services#${s.id}`}
                className={`group flex flex-col gap-6 rounded-[24px] p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 sm:p-8 ${
                  dark ? "bg-ink text-white hover:shadow-[0_30px_60px_-30px_rgb(29_33_36/0.8)] md:col-span-2 lg:col-span-1" : "bg-stone hover:shadow-[0_30px_60px_-36px_rgb(29_33_36/0.45)]"
                }`}
                {...reveal(i * 80)}
              >
                <div className="flex items-start justify-between">
                  <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${dark ? "bg-orange text-fg" : "bg-white text-orange-ink"}`}>
                    <Icon name={serviceIcons[s.id]} className="h-6 w-6" />
                  </span>
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${dark ? "bg-white/10 group-hover:bg-white group-hover:text-fg" : "bg-white group-hover:bg-ink group-hover:text-white"}`}>
                    <Arrow />
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <p className={`text-sm ${dark ? "text-orange-soft" : "text-orange-ink"}`}>{s.eyebrow}</p>
                  <h3 className="text-[1.6rem] leading-tight">{s.title}</h3>
                  <p className={dark ? "text-on-ink" : "text-muted"}>{s.body}</p>
                </div>
                <ul className={`mt-auto flex flex-col gap-2.5 border-t pt-5 text-[0.95rem] ${dark ? "border-ink-line" : "border-line"}`}>
                  {s.items.slice(0, 4).map((it) => (
                    <li key={it} className="flex items-start gap-2.5">
                      <Check className={`mt-1 h-4 w-4 shrink-0 ${dark ? "text-orange-soft" : "text-orange-ink"}`} /> {it}
                    </li>
                  ))}
                </ul>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
