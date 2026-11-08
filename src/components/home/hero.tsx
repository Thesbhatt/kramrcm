import deskPhoto from "@/assets/photos/hero-slide-desk.jpg";
import huddlePhoto from "@/assets/photos/hero-slide-huddle.jpg";
import phonePhoto from "@/assets/photos/hero-slide-phone.jpg";
import teamPhoto from "@/assets/photos/hero-slide-team.jpg";
import tabletPhoto from "@/assets/photos/hero-slide-tablet.jpg";
import { cta, hero } from "@/content/site";
import { ButtonLink, Container, Words } from "../ui/primitives";
import { HeroVisual } from "./hero-visual";

const hi = (n: number) => ({ ["--h" as string]: n });

// TODO(client): replace these stock photos with the practice's own photography (src/assets/photos/CREDITS.md)
const photos = { tablet: tabletPhoto, team: teamPhoto, phone: phonePhoto, huddle: huddlePhoto, desk: deskPhoto };

/**
 * Split hero: headline, one sentence, one button and one muted trust line on the left, a crossfading photo carousel
 * on the right. Copy and layout are a Server Component; only the carousel is client code.
 */
export function HomeHero() {
  const slides = hero.slides.map((s) => ({ src: photos[s.id], alt: s.alt, focus: s.focus }));
  return (
    <section className="pb-20 pt-10 md:pb-28 md:pt-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div className="flex flex-col items-start">
            <h1 className="max-w-[16ch]">
              <Words text={`${hero.titleStart} ${hero.titleHighlight} ${hero.titleEnd}`} mark={hero.titleHighlight} />
            </h1>
            <p className="hero-in mt-6 max-w-[46ch] text-[1.0625rem] text-muted" style={hi(4)}>{hero.body}</p>
            <div className="hero-in mt-8" style={hi(5)}>
              <ButtonLink href={cta.href} size="lg">{hero.primaryCta}</ButtonLink>
            </div>
            <p className="hero-in mt-5 text-sm text-muted" style={hi(6)}>{hero.reassurance.join(" ")}</p>
          </div>

          <HeroVisual slides={slides} labels={hero.carousel} chips={hero.chips} />
        </div>
      </Container>
    </section>
  );
}
