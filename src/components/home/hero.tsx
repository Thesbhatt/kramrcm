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
    <section className="hero-diag hero-stage relative pb-20 pt-10 md:pb-28 md:pt-16">
      {/* Atmosphere: a dot grid that lights up under the pointer, and two soft orbs that drift with it (decorative) */}
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />
      <span aria-hidden="true" className="hero-orb hero-orb-a pointer-events-none absolute -right-32 -top-24 h-[520px] w-[520px] rounded-full" />
      <span aria-hidden="true" className="hero-orb hero-orb-b pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full" />
      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div className="flex flex-col items-start">
            {/* Sized from the viewport so each sentence keeps to one line (about 11.2em wide) in the hero column at every width */}
            <h1 className="text-[clamp(1.75rem,8.4vw-0.3rem,3rem)] lg:text-[clamp(2.25rem,4.3vw-0.5rem,2.85rem)]">
              {hero.titleLines.map((line, i) => (
                <span key={line} className="block">
                  <Words text={line} mark={hero.titleHighlight} from={hero.titleLines.slice(0, i).join(" ").split(" ").filter(Boolean).length} />
                </span>
              ))}
            </h1>
            <p className="hero-in mt-6 max-w-[46ch] text-[1.0625rem] text-muted" style={hi(4)}>{hero.body}</p>
            <div className="hero-in mt-8" style={hi(5)}>
              <ButtonLink href={cta.href} size="lg">{hero.primaryCta}</ButtonLink>
            </div>
            <p className="hero-in mt-5 text-sm text-muted" style={hi(6)}>{hero.reassurance.join(" ")}</p>

            {/* Pipeline: the four stages light up in turn on load (the same dot-and-glow track as the status board) */}
            <ol className="hero-in mt-10 flex w-full max-w-[30rem] items-start" style={hi(8)} aria-label="From enrollment to payment">
              {hero.pipeline.map((label, i) => (
                <li key={label} className={`flex items-start ${i < hero.pipeline.length - 1 ? "flex-1" : ""}`} style={{ ["--i" as string]: i }}>
                  <span className="flex flex-col items-start gap-2">
                    <span className="pipe-dot h-3.5 w-3.5 rounded-full border-2 border-orange bg-orange" />
                    <span className="text-xs font-medium text-fg">{label}</span>
                  </span>
                  {i < hero.pipeline.length - 1 && (
                    <span className="relative mx-2 mt-[6px] h-[2px] flex-1 bg-line">
                      <span className="pipe-fill absolute inset-0 origin-left bg-orange" />
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>

          <HeroVisual slides={slides} labels={hero.carousel} chips={hero.chips} />
        </div>
      </Container>
    </section>
  );
}
