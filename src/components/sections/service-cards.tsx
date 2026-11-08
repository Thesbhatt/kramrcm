import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import billingPhoto from "@/assets/photos/service-billing.jpg";
import credentialingPhoto from "@/assets/photos/service-credentialing.jpg";
import supportPhoto from "@/assets/photos/service-support.jpg";
import { services } from "@/content/site";
import { Arrow, Check, Container, Icon, SectionHeading, reveal, type IconName } from "../ui/primitives";

export const serviceIcons: Record<string, IconName> = { credentialing: "shield", billing: "receipt", licensing: "map" };

/** Client photos from the live site (src/assets/photos/CREDITS.md), keyed by services[].id */
export const servicePhotos: Record<string, { src: StaticImageData; alt: string }> = {
  credentialing: { src: credentialingPhoto, alt: "A credentialing specialist filling in paperwork next to a laptop" },
  billing: { src: billingPhoto, alt: "A medical claim form and a checklist on a clipboard" },
  licensing: { src: supportPhoto, alt: "Clinicians and an administrator reviewing documents together" },
};

/** Three service cards linking into /services, each with its photo and full list. The middle one is the dark "featured" card. */
export function ServiceCards({ heading = true }: { heading?: boolean }) {
  return (
    <section className="pb-20 md:pb-28">
      <Container className="flex flex-col gap-12">
        {heading && (
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Core services"
              title="Smart solutions for modern practices"
              body="Three services that cover the full revenue cycle. Use one, or hand us all three and work with a single accountable team."
            />
            <Link href="/services" className="group inline-flex items-center gap-2 self-start font-medium md:self-auto" {...reveal()}>
              All services <Arrow />
            </Link>
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {services.map((s, i) => {
            const dark = i === 1;
            const photo = servicePhotos[s.id];
            return (
              <Link
                key={s.id}
                href={`/services#${s.id}`}
                className={`group flex flex-col overflow-hidden rounded-[24px] ring-1 ring-inset transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-1 ${
                  dark
                    ? "bg-ink text-white ring-transparent hover:shadow-[0_30px_60px_-30px_rgb(29_33_36/0.8)] hover:ring-orange/40"
                    : "bg-stone ring-transparent hover:bg-white hover:shadow-[0_30px_60px_-36px_rgb(29_33_36/0.45)] hover:ring-orange/45"
                }`}
                {...reveal(i * 80)}
              >
                <div className="relative aspect-[3/2] overflow-hidden md:aspect-[21/9] lg:aspect-[3/2]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 380px, 100vw"
                    quality={70}
                    placeholder="blur"
                    className="object-cover transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
                  />
                  <span className={`absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-2xl ${dark ? "bg-orange text-fg" : "bg-white text-orange-ink"}`}>
                    <Icon name={serviceIcons[s.id]} className="h-6 w-6" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-6 p-7 sm:p-8">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-4">
                      <p className={`text-sm ${dark ? "text-orange-soft" : "text-orange-ink"}`}>{s.eyebrow}</p>
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${dark ? "bg-white/10 group-hover:bg-white group-hover:text-fg" : "bg-white group-hover:bg-ink group-hover:text-white"}`}>
                        <Arrow />
                      </span>
                    </div>
                    <h3 className="text-[1.6rem] leading-tight">{s.title}</h3>
                    <p className={dark ? "text-on-ink" : "text-muted"}>{s.body}</p>
                  </div>
                  <ul className={`mt-auto flex flex-col border-t text-[0.95rem] ${dark ? "border-ink-line" : "border-line"}`}>
                    {s.items.map((it) => (
                      <li key={it.name} className={`flex items-start gap-2.5 border-b py-2.5 last:border-b-0 last:pb-0 ${dark ? "border-ink-line" : "border-line"}`}>
                        <Check className={`mt-1 h-4 w-4 shrink-0 ${dark ? "text-orange-soft" : "text-orange-ink"}`} /> {it.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
