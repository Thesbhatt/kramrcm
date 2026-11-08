import Image from "next/image";
import teamPhoto from "@/assets/photos/hero-slide-team.jpg";
import { cta, hero } from "@/content/site";
import { ButtonLink, Container, Words } from "../ui/primitives";
import { StatusBoard } from "./status-board";

const hi = (n: number) => ({ ["--h" as string]: n });

/**
 * Centered hero: headline (words rise from a mask), one sentence, one button, one muted trust line, then a wide team
 * photo with the status board overlapping its lower edge. Everything plays on load with CSS only.
 * TODO(client): replace the stock photo with the practice's own photography.
 */
export function HomeHero() {
  return (
    <section className="pb-20 pt-14 md:pb-28 md:pt-20">
      <Container className="flex flex-col items-center text-center">
        <h1 className="max-w-[22ch]">
          <Words text={`${hero.titleStart} ${hero.titleHighlight} ${hero.titleEnd}`} />
        </h1>
        <p className="hero-in mt-6 max-w-[52ch] text-[1.0625rem] text-muted" style={hi(4)}>{hero.body}</p>
        <div className="hero-in mt-8" style={hi(5)}>
          <ButtonLink href={cta.href} size="lg">{hero.primaryCta}</ButtonLink>
        </div>
        <p className="hero-in mt-5 text-sm text-muted" style={hi(6)}>{hero.reassurance.join(" ")}</p>

        <div className="mt-14 w-full max-w-[1040px] md:mt-20">
          <div className="hero-photo relative aspect-[4/3] overflow-clip rounded-[28px] bg-tint sm:aspect-[16/8]">
            <div className="hero-parallax absolute inset-x-0 -inset-y-[6%]">
              <Image
                src={teamPhoto}
                alt={hero.photo.alt}
                fill
                priority
                quality={70}
                sizes="(min-width: 1120px) 1040px, 100vw"
                className="object-cover"
                style={{ objectPosition: hero.photo.focus }}
              />
            </div>
          </div>
          <div className="relative z-10 -mt-28 px-3 sm:-mt-40 sm:px-8">
            <StatusBoard />
          </div>
        </div>
      </Container>
    </section>
  );
}
