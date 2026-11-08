import { cta, delayCost } from "@/content/site";
import { Arrow, ButtonLink, Container, SectionHeading, reveal } from "../ui/primitives";
import { DelayCalculator } from "./delay-calculator";

/** "Cost of waiting" calculator. Heading and CTA stay server-rendered; only the sliders ship JS. */
export function DelayCost() {
  return (
    <section className="pb-20 md:pb-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow={delayCost.eyebrow} title={delayCost.title} body={delayCost.body} />
        <div {...reveal(120)}>
          <DelayCalculator>
            <ButtonLink href={cta.href} variant="white" size="lg" className="self-start ring-0">
              {delayCost.cta} <Arrow />
            </ButtonLink>
          </DelayCalculator>
        </div>
      </Container>
    </section>
  );
}
