import type { StaticImageData } from "next/image";
import Link from "next/link";
import billingPhoto from "@/assets/photos/service-billing.jpg";
import credentialingPhoto from "@/assets/photos/service-credentialing.jpg";
import supportPhoto from "@/assets/photos/service-support.jpg";
import { services } from "@/content/site";
import { Arrow, Container, Icon, SectionHeading, reveal, type IconName } from "../ui/primitives";

export const serviceIcons: Record<string, IconName> = { credentialing: "shield", billing: "receipt", licensing: "map" };

/** Client photos from the live site (src/assets/photos/CREDITS.md), keyed by services[].id */
export const servicePhotos: Record<string, { src: StaticImageData; alt: string }> = {
  credentialing: { src: credentialingPhoto, alt: "A credentialing specialist filling in paperwork next to a laptop" },
  billing: { src: billingPhoto, alt: "A medical claim form and a checklist on a clipboard" },
  licensing: { src: supportPhoto, alt: "Clinicians and an administrator reviewing documents together" },
};

/** Three image-free summary cards linking into /services (photos and each service's full list live on that page). The middle one is the dark "featured" card. */
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
            return (
              <Link
                key={s.id}
                href={`/services#${s.id}`}
                className={`rise-lg group flex flex-col gap-6 rounded-[24px] p-7 ring-1 ring-inset transition-[translate,box-shadow,background-color] duration-300 hover:-translate-y-1 sm:p-8 ${
                  dark
                    ? "bg-ink text-white ring-transparent hover:shadow-[0_30px_60px_-30px_rgb(47_51_54/0.8)] hover:ring-orange/40"
                    : "bg-stone ring-transparent hover:bg-white hover:shadow-[0_30px_60px_-36px_rgb(47_51_54/0.45)] hover:ring-orange/45"
                }`}
                {...reveal(i * 130)}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className={`pop flex h-12 w-12 items-center justify-center rounded-2xl ${"bg-orange text-white"}`}>
                    <Icon name={serviceIcons[s.id]} className="h-6 w-6" />
                  </span>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${dark ? "bg-white/10 group-hover:bg-white group-hover:text-fg" : "bg-white group-hover:bg-ink group-hover:text-white"}`}>
                    <Arrow />
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <p className={`text-sm ${dark ? "text-orange-soft" : "text-orange-ink"}`}>{s.eyebrow}</p>
                  <h3 className="text-[1.6rem] leading-tight">{s.title}</h3>
                  <p className={dark ? "text-on-ink" : "text-muted"}>{s.body}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
