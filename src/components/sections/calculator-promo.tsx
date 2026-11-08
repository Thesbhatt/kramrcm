import { calculatorPromo } from "@/content/site";
import { Arrow, ButtonLink, Container, reveal } from "../ui/primitives";

/** Slim band that sends visitors to /cost-calculator. */
export function CalculatorPromo() {
  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <div className="flex flex-col gap-6 rounded-2xl bg-stone p-7 sm:p-10 md:flex-row md:items-center md:justify-between md:gap-10" {...reveal()}>
          <div className="flex max-w-[44rem] flex-col gap-2">
            <h2 className="text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.15]">{calculatorPromo.title}</h2>
            <p className="text-lg text-muted">{calculatorPromo.body}</p>
          </div>
          <div className="shrink-0">
            <ButtonLink href="/cost-calculator" variant="dark" size="lg">{calculatorPromo.cta} <Arrow /></ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
