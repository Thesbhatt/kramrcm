import Image from "next/image";
import doctorsPhoto from "@/assets/photos/hero-slide-tablet.jpg";
import { cta, hero } from "@/content/site";
import { ButtonLink, Container, Words } from "../ui/primitives";
import { StatusBoard } from "./status-board";

const hi = (n: number) => ({ ["--h" as string]: n });

/**
 * Split hero: headline, one sentence, one button and one muted trust line on the left, a team photo on the right,
 * and the status board of a SAMPLE practice overlapping the photo's lower edge and running full width beneath.
 * Everything plays on load with CSS only. TODO(client): replace the stock photo with the practice's own photography.
 */
export function HomeHero() {
  return (
    <section className="pb-20 pt-10 md:pb-28 md:pt-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-16">
          {/* Top-aligned on desktop so the board that overlaps the photo never reaches the trust line */}
          <div className="flex flex-col items-start lg:pt-14">
            <h1 className="max-w-[16ch]">
              <Words text={`${hero.titleStart} ${hero.titleHighlight} ${hero.titleEnd}`} />
            </h1>
            <p className="hero-in mt-6 max-w-[46ch] text-[1.0625rem] text-muted" style={hi(4)}>{hero.body}</p>
            <div className="hero-in mt-8" style={hi(5)}>
              <ButtonLink href={cta.href} size="lg">{hero.primaryCta}</ButtonLink>
            </div>
            <p className="hero-in mt-5 text-sm text-muted" style={hi(6)}>{hero.reassurance.join(" ")}</p>
          </div>

          <div className="hero-photo relative aspect-[4/3] overflow-clip rounded-[28px] bg-tint sm:aspect-[16/10] lg:aspect-[1/1.04]">
            <div className="hero-parallax absolute inset-x-0 -inset-y-[6%]">
              <Image
                src={doctorsPhoto}
                alt={hero.photo.alt}
                fill
                priority
                quality={70}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
                style={{ objectPosition: hero.photo.focus }}
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto -mt-28 w-full max-w-[1040px] px-3 sm:px-8 lg:-mt-24 lg:px-0">
          <StatusBoard />
        </div>
      </Container>
    </section>
  );
}
