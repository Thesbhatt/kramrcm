import Image from "next/image";
import Link from "next/link";
import insetPhoto from "@/assets/photos/about-clinician.jpg";
import mainPhoto from "@/assets/photos/about-review.jpg";
import { aboutIntro } from "@/content/site";
import { Arrow, Container, Highlight, Icon, SectionHeading, reveal, type IconName } from "../ui/primitives";

const pillarIcons: IconName[] = ["eye", "heart", "target"];

/** Home "About us" block (live site's "What about us"): one-line story, three icon pillars, overlapping client photos. */
export function AboutIntro() {
  return (
    <section className="pb-20 md:pb-28">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow={aboutIntro.eyebrow}
            title={<Highlight start={aboutIntro.titleStart} word={aboutIntro.titleHighlight} end={aboutIntro.titleEnd} />}
          />
          <p className="max-w-[52ch] text-lg text-muted" {...reveal(120)}>{aboutIntro.body}</p>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-4">
            {aboutIntro.pillars.map((p, i) => (
              <li key={p.title} className="flex items-center gap-3 sm:flex-col sm:items-start" {...reveal(180 + i * 70)}>
                <span className="pop flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-peach-2 text-orange-ink">
                  <Icon name={pillarIcons[i]} />
                </span>
                <div>
                  <p className="font-medium">{p.title}</p>
                  <p className="text-[0.95rem] text-muted">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/about-us" className="group inline-flex items-center gap-2 self-start font-medium" {...reveal(300)}>
            {aboutIntro.link} <Arrow />
          </Link>
        </div>

        {/* Main photo with an inset photo overlapping its bottom-right corner (as on the live site) */}
        <div className="relative pb-12 pr-6 sm:pb-14 sm:pr-8">
          {/* Keep the photo's own 19:16 shape: stretching it to the column height crops one of the two people out. */}
          <div className="photo relative aspect-[19/16] overflow-hidden rounded-2xl bg-peach" {...reveal(100)}>
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
          {/* Outer div drifts against the main photo on scroll; inner div is the delayed entrance. */}
          <div className="drift-up absolute bottom-0 right-0 w-[32%]">
            <div className="photo overflow-hidden rounded-xl bg-white p-1.5 shadow-[0_24px_48px_-24px_rgb(47_51_54/0.45)]" {...reveal(420)}>
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
        </div>
      </Container>
    </section>
  );
}
