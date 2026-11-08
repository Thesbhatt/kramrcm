import { cta, delayCost } from "@/content/site";
import { Arrow, ButtonLink, Container, reveal } from "../ui/primitives";
import { DelayCalculator } from "./delay-calculator";

/** Calculator block for /cost-calculator (the page's PageHero holds the heading). The CTA stays server-rendered; only the sliders ship JS. */
export function DelayCost() {
  return (
    <section className="pb-20 md:pb-28">
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
  );
}
