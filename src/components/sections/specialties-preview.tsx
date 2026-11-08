import { featuredSpecialties, marquee, specialties, specialtiesSection, specialtyGroups } from "@/content/site";
import { MarqueeToggle } from "../ui/marquee-toggle";
import { Arrow, ButtonLink, Container, Icon, reveal, stagger, type IconName } from "../ui/primitives";

/** Icons for the featured specialties (same order as `featuredSpecialties`) and the category groups. */
export const featuredIcons: IconName[] = ["stethoscope", "chat", "pulse", "home", "box", "pill"];
export const groupIcons: Record<string, IconName> = {
  "Primary & urgent care": "stethoscope",
  "Medical specialties": "pulse",
  "Surgical & procedural": "cross",
  "Behavioral health": "chat",
  "Therapy & rehab": "heart",
  "Post-acute & equipment": "home",
  "Pharmacy & dental": "pill",
};

/** specialty name -> its category icon, so each marquee chip carries a meaningful glyph. */
const iconFor = new Map<string, IconName>(
  specialtyGroups.flatMap((g) => g.items.map((item) => [item, groupIcons[g.name]] as const)),
);

/** Home: headline with an orange "50" and six featured specialty cards (ported from the main-branch design). Full list lives on /specialties. */
export function SpecialtiesPreview() {
  return (
    <section className="py-20 md:py-28">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" {...reveal()}>
          <div className="flex max-w-[40rem] flex-col gap-4">
            <h2>
              {specialtiesSection.titleStart} <span className="hl">{specialties.length}</span> {specialtiesSection.titleEnd}
            </h2>
            <p className="text-muted">{specialtiesSection.body}</p>
          </div>
          <div>
            <ButtonLink href="/specialties">{specialtiesSection.link} <Arrow /></ButtonLink>
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" {...stagger}>
          {featuredSpecialties.map((s, i) => (
            <li key={s.name} className="group flex items-start gap-4 rounded-xl bg-tint p-5 transition-colors duration-300 hover:bg-peach-2">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-orange-ink transition-colors duration-200 group-hover:bg-orange group-hover:text-white">
                <Icon name={featuredIcons[i]} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-xl">{s.name}</h3>
                <p className="mt-1 text-sm text-muted">{s.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>

    </section>
  );
}

/**
 * Slow two-row marquee of every specialty (ported from the main-branch design), shown right under the hero. It is decorative
 * (aria-hidden), pauses on hover/focus, has a visible pause button, and stops entirely under prefers-reduced-motion.
 */
export function SpecialtyMarquee() {
  const half = Math.ceil(specialties.length / 2);
  const rows = [specialties.slice(0, half), specialties.slice(half)];

  return (
    <section className="pb-12 md:pb-16" aria-label="Specialties we support">
      <div
        className="marquee relative flex flex-col gap-3 overflow-hidden py-1 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]"
        aria-hidden="true"
      >
        {rows.map((row, r) => (
          <div
            key={r}
            className="marquee-track flex w-max animate-marquee gap-3"
            style={r === 1 ? { animationDirection: "reverse", animationDuration: "70s" } : undefined}
          >
            {[...row, ...row].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="group/chip flex cursor-default items-center gap-2.5 whitespace-nowrap rounded-full bg-white py-1.5 pl-1.5 pr-5 text-[0.95rem] text-graphite ring-1 ring-line transition-[transform,background-color,box-shadow,color] duration-200 hover:-translate-y-0.5 hover:bg-peach-2 hover:text-fg hover:ring-orange/50"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-tint text-orange-ink transition-colors duration-200 group-hover/chip:bg-orange group-hover/chip:text-white">
                  <Icon name={iconFor.get(name) ?? "cross"} className="h-4 w-4" />
                </span>
                {name}
              </span>
            ))}
          </div>
        ))}
      </div>
      {/* Outside the aria-hidden marquee so assistive tech and keyboards can reach it */}
      <Container className="mt-3 flex justify-end">
        <MarqueeToggle pauseLabel={marquee.pause} playLabel={marquee.play} />
      </Container>
    </section>
  );
}
