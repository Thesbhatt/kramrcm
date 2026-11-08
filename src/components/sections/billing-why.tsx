import Image from "next/image";
import teamPhoto from "@/assets/photos/billing-team.jpg";
import { billingWhy } from "@/content/site";
import { Arrow, ButtonLink, Check, Container, Highlight, SectionHeading, reveal } from "../ui/primitives";

/** "Why choose Kram for medical billing?" (live site copy, shortened): photo left, copy and benefits right. Home + About. */
export function BillingWhy() {
  return (
    <section className="pb-20 md:pb-28">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-stretch lg:gap-16">
        <div className="photo relative order-2 aspect-[804/701] overflow-hidden lg:aspect-auto lg:min-h-[440px] rounded-[28px] bg-peach lg:order-1" {...reveal()}>
          <Image
            src={teamPhoto}
            alt={billingWhy.photoAlt}
            fill
            sizes="(min-width: 1024px) 540px, 100vw"
            quality={70}
            placeholder="blur"
            className="object-cover"
          />
        </div>

        <div className="order-1 flex flex-col justify-center gap-8 lg:order-2">
          <SectionHeading
            eyebrow={billingWhy.eyebrow}
            title={<Highlight start={billingWhy.titleStart} word={billingWhy.titleHighlight} />}
          />
          <div className="flex max-w-[60ch] flex-col gap-4 text-lg text-muted" {...reveal(120)}>
            {billingWhy.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>
          <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2" {...reveal(200)}>
            {billingWhy.benefits.map((b, i) => (
              <li key={b} className="cascade flex items-center gap-3 rounded-2xl bg-peach-2 px-4 py-3 font-medium" style={{ ["--i" as string]: i }}>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange text-white">
                  <Check className="tick h-3.5 w-3.5" />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <div {...reveal(260)}>
            <ButtonLink href="/services#billing" variant="soft">{billingWhy.link} <Arrow /></ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
