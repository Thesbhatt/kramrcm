import teamPhoto from "@/assets/photos/hero-slide-team.jpg";
import tabletPhoto from "@/assets/photos/hero-slide-tablet.jpg";
import phonePhoto from "@/assets/photos/hero-slide-phone.jpg";
import huddlePhoto from "@/assets/photos/hero-slide-huddle.jpg";
import deskPhoto from "@/assets/photos/hero-slide-desk.jpg";
import { cta, hero } from "@/content/site";
import { Stats } from "../sections/stats";
import { Arrow, ButtonLink, Check, Eyebrow, Highlight } from "../ui/primitives";
import { HeroCarousel, type HeroSlide } from "./hero-carousel";

const photos = { team: teamPhoto, tablet: tabletPhoto, phone: phonePhoto, huddle: huddlePhoto, desk: deskPhoto };

// TODO(client): replace with the client's own photography (src/assets/photos/CREDITS.md)
const slides: HeroSlide[] = hero.slides.map((s) => ({ ...s, src: photos[s.id] }));

/** Homepage hero. Copy and stats stay Server Components; only the photo carousel and its controls are client code. */
export function HomeHero() {
  return (
    <HeroCarousel slides={slides} labels={hero.carousel} footer={<Stats tone="hero" />}>
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
    </HeroCarousel>
  );
}
