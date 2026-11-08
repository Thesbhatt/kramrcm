import { calculatorPage, cta, delayCost, timelines } from "@/content/site";
import { Arrow, ButtonLink, Container, SectionHeading, reveal } from "../ui/primitives";
import { DelayCalculator } from "./delay-calculator";

/** Calculator block for /cost-calculator: the live sliders, then typical enrollment timelines. The CTA stays server-rendered; only the sliders ship JS. */
export function DelayCost() {
  return (
    <>
      <section id="calculator" className="scroll-mt-24 py-20 md:py-28">
        <Container>
          <div {...reveal(120)}>
            <DelayCalculator>
              <ButtonLink href={cta.href} variant="dark" size="lg" className="self-start">
                {delayCost.cta} <Arrow />
              </ButtonLink>
            </DelayCalculator>
          </div>
        </Container>
      </section>

      <section className="band-glow-ink bg-ink py-20 text-white md:py-28">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <SectionHeading tone="dark" title={calculatorPage.timelinesTitle} body={calculatorPage.timelinesBody} />
          <div className="flex flex-col gap-7 rounded-2xl bg-ink-2 p-7 ring-1 ring-ink-line sm:p-9" {...reveal(100)}>
            <ul className="flex flex-col gap-6">
              {timelines.map((t, i) => (
                <li key={t.label} className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between gap-4 text-sm">
                    <span className="text-white">{t.label}</span>
                    <span className="font-medium tabular-nums text-orange-soft">~<span data-count={t.days}>{t.days}</span> days</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-ink-line">
                    <div
                      className="bar-fill h-full rounded-full bg-gradient-to-r from-orange to-orange-soft"
                      style={{ width: `${(t.days / t.max) * 100}%`, ["--reveal-delay" as string]: `${200 + i * 180}ms` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <p className="border-t border-ink-line pt-5 text-sm text-on-ink">{calculatorPage.timelinesNote}</p>
          </div>
        </Container>
      </section>
    </>
  );
}
