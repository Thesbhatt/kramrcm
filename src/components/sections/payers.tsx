import Image from "next/image";
import { payers } from "@/content/site";
import { Container, reveal } from "../ui/primitives";

/**
 * Home: "We work with all major payers" (client request, Nov 12 2026). Headline left, line right, then two rows of payer
 * name cards scrolling in opposite directions (the specialty marquee's `.marquee` pattern: pauses on hover or focus,
 * static under reduced motion). The moving rows are decorative duplicates; screen readers get the plain list.
 */
export function PayerMarquee() {
  return (
    <section className="overflow-hidden bg-tint py-20 md:py-28" aria-labelledby="payers-title">
      <Container className="flex flex-col justify-between gap-6 md:flex-row md:items-end" {...reveal()}>
        <h2 id="payers-title" className="max-w-[14ch]">
          {payers.titleStart} <span className="hl">{payers.titleHighlight}</span> {payers.titleEnd}
        </h2>
        <p className="max-w-[44ch] text-lg text-muted">{payers.body}</p>
      </Container>

      <ul className="sr-only">
        {payers.rows.flat().map(({ name }) => <li key={name}>{name}</li>)}
      </ul>

      <div
        className="marquee relative mt-12 flex flex-col gap-4 overflow-hidden py-2 md:mt-16 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]"
        aria-hidden="true"
      >
        {payers.rows.map((row, r) => (
          <div
            key={r}
            className="marquee-track flex w-max animate-marquee gap-4"
            style={r === 1 ? { animationDirection: "reverse", animationDuration: "55s" } : { animationDuration: "50s" }}
          >
            {[...row, ...row].map(({ name, logo }, i) => (
              <span
                key={`${name}-${i}`}
                className="flex h-20 w-64 shrink-0 whitespace-nowrap cursor-default items-center justify-center rounded-2xl bg-white px-5 text-center font-display text-lg font-semibold tracking-[-0.01em] text-graphite shadow-[0_14px_30px_-22px_rgb(64_64_69/0.6)] ring-1 ring-line transition-[transform,color,box-shadow] duration-200 hover:-translate-y-0.5 hover:text-orange-ink hover:ring-orange/50"
              >
                {logo ? (
                  <Image src={logo.src} alt="" width={logo.w} height={logo.h} unoptimized loading="eager" className={`w-auto object-contain ${logo.w / logo.h < 1.6 ? "max-h-14 max-w-[5rem]" : "max-h-9 max-w-[8.5rem]"}`} />
                ) : (
                  name
                )}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
