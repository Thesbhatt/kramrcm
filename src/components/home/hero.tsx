import type { CSSProperties } from "react";
import billingPhoto from "@/assets/photos/hero-billing.jpg";
import credentialingPhoto from "@/assets/photos/hero-credentialing.jpg";
import licensingPhoto from "@/assets/photos/hero-licensing.jpg";
import specialtiesPhoto from "@/assets/photos/hero-specialties.jpg";
import { cta, hero, heroIcons, heroSlides } from "@/content/site";
import { Arrow, ButtonLink, Container, Eyebrow, Highlight, Icon } from "../ui/primitives";
import { HeroCarousel } from "./hero-carousel";
import { HeroPointerField } from "./hero-pointer";

// TODO(client): replace with the client's own photography (src/assets/photos/CREDITS.md)
const photos = {
  credentialing: credentialingPhoto,
  billing: billingPhoto,
  licensing: licensingPhoto,
  specialties: specialtiesPhoto,
};

/** Where each heroIcons entry floats (same order, % of the hero). `depth` is how strongly it follows the cursor. */
const layout = [
  { x: 72, y: 17, size: 104, depth: 1 },
  { x: 88, y: 12, size: 72, depth: 0.45 },
  { x: 61, y: 27, size: 68, depth: 0.6 },
  { x: 83, y: 34, size: 84, depth: 0.85 },
  { x: 94, y: 37, size: 64, depth: 0.5 },
  { x: 67, y: 49, size: 80, depth: 0.75 },
  { x: 79, y: 60, size: 64, depth: 0.4 },
  { x: 91, y: 62, size: 88, depth: 0.95 },
  { x: 58, y: 66, size: 60, depth: 0.5 },
];

export function HomeHero() {
  const slides = heroSlides.map((s) => ({ ...s, photo: photos[s.id] }));

  return (
    <section className="scroll-frame relative isolate flex flex-col overflow-hidden bg-ink text-white lg:min-h-[clamp(680px,calc(100svh-96px),920px)]">
      <HeroCarousel slides={slides} labels={hero.carousel}>
        {/* Decorative: the same services and specialties are listed in text further down the page */}
        <HeroPointerField className="pointer-events-none absolute inset-0 z-[3] hidden xl:block">
          {heroIcons.map((item, i) => (
            <div
              key={item.label}
              data-float={layout[i].depth}
              className="hero-float"
              style={{ left: `${layout[i].x}%`, top: `${layout[i].y}%`, "--s": `${layout[i].size}px` } as CSSProperties}
            >
              <div className="bob h-full w-full" style={{ "--bob-d": `${-i * 1.3}s` } as CSSProperties}>
                <div className="hero-chip" data-tone={item.tone} style={{ "--d": `${500 + i * 70}ms` } as CSSProperties}>
                  <Icon name={item.icon} className="h-[46%] w-[46%]" />
                  <span className="hero-chip-label">{item.label}</span>
                </div>
              </div>
            </div>
          ))}
        </HeroPointerField>

        <Container className="relative z-[4] flex flex-1 items-center py-14 sm:py-20 lg:py-16">
          <div className="flex max-w-[640px] flex-col gap-6 xl:max-w-[680px]">
            <div className="animate-rise flex">
              <Eyebrow tone="dark">{hero.kicker}</Eyebrow>
            </div>
            <h1 className="words-load text-[clamp(2.75rem,6vw,5rem)] leading-[1.02]">
              <Highlight start={hero.titleStart} word={hero.titleHighlight} end={hero.titleEnd} />
            </h1>
            <p className="animate-rise max-w-[50ch] text-lg text-white/90 [animation-delay:300ms]">{hero.body}</p>
            <div className="animate-rise flex flex-wrap gap-3 pt-1 [animation-delay:420ms]">
              <ButtonLink href={cta.href} variant="soft" size="lg">{hero.primaryCta} <Arrow /></ButtonLink>
              <ButtonLink href="/services" variant="ghost-dark" size="lg">{hero.secondaryCta}</ButtonLink>
            </div>

            {/* Below xl there is no room beside the headline (and touch has no cursor): the icons sit in a row with their idle float */}
            <ul aria-hidden="true" className="flex flex-wrap gap-2.5 pt-2 xl:hidden">
              {heroIcons.slice(0, 5).map((item, i) => (
                <li key={item.label} className="bob h-12 w-12" style={{ "--bob-d": `${-i * 1.3}s` } as CSSProperties}>
                  <div className="hero-chip" data-tone={item.tone} style={{ "--d": `${500 + i * 70}ms` } as CSSProperties}>
                    <Icon name={item.icon} className="h-6 w-6" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </HeroCarousel>
    </section>
  );
}
