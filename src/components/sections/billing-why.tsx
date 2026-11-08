import Image from "next/image";
import teamPhoto from "@/assets/photos/billing-team.jpg";
import { billingWhy } from "@/content/site";
import { Arrow, ButtonLink, Check, Container, Highlight, SectionHeading, reveal } from "../ui/primitives";

/** "Why choose Kram for medical billing?" (live site copy, shortened): photo left, copy and benefits right. Home + About. */
export function BillingWhy() {
  const { tracker } = billingWhy;
  return (
    <section className="pb-20 md:pb-28">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-stretch lg:gap-16">
        {/* The wrapper is not clipped, so the offset ring and the floating card can hang outside the photo frame */}
        <div className="relative order-2 mb-8 lg:order-1 lg:mb-0 lg:min-h-[440px]">
          <span
            aria-hidden="true"
            className="bob pointer-events-none absolute inset-0 -translate-x-3 -translate-y-3 rounded-[28px] border-2 border-orange/45"
            style={{ ["--bob-d" as string]: "-2s" }}
          />
          <div className="photo relative aspect-[804/701] overflow-hidden rounded-[28px] bg-peach lg:aspect-auto lg:h-full" {...reveal()}>
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

          {/* Illustration of a claim moving through billing: the line fills, each step lights up, then it resets */}
          <div className="absolute -bottom-7 right-3 z-10 w-[17.5rem] lg:-right-8" {...reveal(420)}>
            <div className="bob rounded-2xl bg-white p-4 shadow-[0_24px_48px_-20px_rgb(47_51_54/0.45)] ring-1 ring-line" style={{ ["--bob-d" as string]: "-4s" }}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">{tracker.title}</p>
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange" />
                </span>
              </div>

              <div className="relative mt-4" aria-hidden="true">
                <span className="absolute left-[16.667%] right-[16.667%] top-[11px] h-0.5 rounded-full bg-stone-2" />
                <span className="claim-line absolute left-[16.667%] right-[16.667%] top-[11px] h-0.5 origin-left rounded-full bg-orange" />
                <ol className="relative grid grid-cols-3">
                  {tracker.steps.map((step, i) => (
                    <li key={step} className="flex flex-col items-center gap-1.5">
                      <span className={`claim-node claim-node-${i + 1} flex h-6 w-6 items-center justify-center rounded-full bg-orange text-white ring-4 ring-white`}>
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-xs font-semibold text-fg">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <p className="mt-3 border-t border-line pt-3 text-xs text-muted">{tracker.note}</p>
            </div>
          </div>
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
              <li key={b} className="cascade benefit flex items-center gap-3 rounded-2xl bg-peach-2 px-4 py-3 font-medium" style={{ ["--i" as string]: i }}>
                <span className="benefit-dot flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange text-white">
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
