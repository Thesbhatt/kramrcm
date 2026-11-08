import Image from "next/image";
import Link from "next/link";
import insetPhoto from "@/assets/photos/about-clinician.jpg";
import mainPhoto from "@/assets/photos/about-review.jpg";
import { aboutIntro } from "@/content/site";
import { Arrow, Container, Highlight, SectionHeading, reveal } from "../ui/primitives";

/** Home "About us" block (live site's "What about us"): short story, three pillars, overlapping client photos. */
export function AboutIntro() {
  return (
    <section className="pb-20 md:pb-28">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-stretch lg:gap-16">
        <div className="flex flex-col justify-center gap-8">
          <SectionHeading
            eyebrow={aboutIntro.eyebrow}
            title={<Highlight start={aboutIntro.titleStart} word={aboutIntro.titleHighlight} end={aboutIntro.titleEnd} />}
          />
          <div className="flex max-w-[60ch] flex-col gap-4 text-lg text-muted" {...reveal(120)}>
            {aboutIntro.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {aboutIntro.pillars.map((p, i) => (
              <li key={p.title} className="rounded-[20px] bg-stone p-5" {...reveal(180 + i * 70)}>
                <p className="flex items-center gap-2 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden="true" />
                  {p.title}
                </p>
                <p className="mt-1.5 text-[0.95rem] text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
          <Link href="/about-us" className="group inline-flex items-center gap-2 self-start font-medium" {...reveal(300)}>
            {aboutIntro.link} <Arrow />
          </Link>
        </div>

        {/* Main photo with an inset photo overlapping its bottom-right corner (as on the live site) */}
        <div className="relative pb-16 pr-6 sm:pb-20 sm:pr-10" {...reveal(100)}>
          <div className="relative aspect-[19/16] overflow-hidden rounded-[28px] bg-stone lg:aspect-auto lg:h-full lg:min-h-[420px]">
            <Image
              src={mainPhoto}
              alt={aboutIntro.photoMainAlt}
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              quality={70}
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-[42%] overflow-hidden rounded-[22px] bg-white p-1.5 shadow-[0_24px_48px_-24px_rgb(29_33_36/0.45)]">
            <div className="relative aspect-[517/542] overflow-hidden rounded-[17px]">
              <Image
                src={insetPhoto}
                alt={aboutIntro.photoInsetAlt}
                fill
                sizes="(min-width: 1024px) 220px, 42vw"
                quality={70}
                placeholder="blur"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
