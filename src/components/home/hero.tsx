import { cta, hero } from "@/content/site";
import { ButtonLink, Container } from "../ui/primitives";
import { StatusBoard } from "./status-board";

/** Centered, calm hero: one outcome headline, one sentence, one button, one muted trust line, then the status board. */
export function HomeHero() {
  return (
    <section className="pb-20 pt-14 md:pb-28 md:pt-20">
      <Container className="flex flex-col items-center text-center">
        <h1 className="max-w-[22ch]">{hero.titleStart} {hero.titleHighlight} {hero.titleEnd}</h1>
        <p className="mt-6 max-w-[52ch] text-[1.0625rem] text-muted">{hero.body}</p>
        <div className="mt-8">
          <ButtonLink href={cta.href} size="lg">{hero.primaryCta}</ButtonLink>
        </div>
        <p className="mt-5 text-sm text-muted">{hero.reassurance.join(" ")}</p>
        <div className="mt-14 w-full max-w-[1040px] md:mt-20">
          <StatusBoard />
        </div>
      </Container>
    </section>
  );
}
