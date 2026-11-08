import Image from "next/image";
import heroPhoto from "@/assets/photos/hero-credentialing.jpg";
import { cta, hero } from "@/content/site";
import { Stats } from "../sections/stats";
import { Arrow, ButtonLink, Check, Container, Eyebrow, Highlight } from "../ui/primitives";

// TODO(client): replace with the client's own photography (src/assets/photos/CREDITS.md)
export function HomeHero() {
  return (
    <section className="scroll-frame relative isolate flex flex-col overflow-hidden bg-ink text-white lg:min-h-[clamp(680px,calc(100svh-96px),920px)]">
      <div className="absolute inset-0 z-0">
        <div className="parallax-img absolute inset-0 [--drift:4%]">
          <Image src={heroPhoto} alt={hero.photoAlt} fill sizes="100vw" quality={70} placeholder="blur" loading="eager" fetchPriority="high" className="object-cover" style={{ objectPosition: hero.photoFocus }} />
        </div>
      </div>
      <div aria-hidden="true" className="hero-scrim absolute inset-0 z-[1]" />

      <Container className="relative z-[4] flex flex-1 items-center py-14 sm:py-20 lg:py-16">
        <div className="flex max-w-[640px] flex-col gap-6 xl:max-w-[680px]">
          <div className="animate-rise flex"><Eyebrow tone="dark">{hero.kicker}</Eyebrow></div>
          <h1 className="words-load text-[clamp(2.75rem,6vw,5rem)] leading-[1.02]">
            <Highlight start={hero.titleStart} word={hero.titleHighlight} end={hero.titleEnd} />
          </h1>
          <p className="animate-rise max-w-[50ch] text-lg text-white/90 [animation-delay:300ms]">{hero.body}</p>
          <div className="animate-rise flex flex-wrap gap-3 pt-1 [animation-delay:420ms]">
            <ButtonLink href={cta.href} variant="soft" size="lg">{hero.primaryCta} <Arrow /></ButtonLink>
            <ButtonLink href="/services" variant="ghost-dark" size="lg">{hero.secondaryCta}</ButtonLink>
          </div>
          <ul className="animate-rise flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem] text-white/90 [animation-delay:520ms]">
            {hero.reassurance.map((item) => (
              <li key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-orange-soft" />{item}</li>
            ))}
          </ul>
        </div>
      </Container>

      <Stats tone="hero" />
    </section>
  );
}
