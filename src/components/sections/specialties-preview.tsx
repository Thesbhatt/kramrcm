import { featuredSpecialties, specialties, specialtyGroups } from "@/content/site";
import { Arrow, ButtonLink, Container, Icon, SectionHeading, reveal, type IconName } from "../ui/primitives";

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

/** Home teaser: featured specialty cards + slow two-row marquee of all specialties, linking to /specialties. */
export function SpecialtiesPreview() {
  const half = Math.ceil(specialties.length / 2);
  const rows = [specialties.slice(0, half), specialties.slice(half)];

  return (
    <section className="pb-20 md:pb-28">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Specialties"
            title={<>Know-how across <span className="hl">{specialties.length}</span> specialties</>}
            body="Every specialty has its own payers, codes and paperwork. We know where each one gets stuck."
          />
          <div {...reveal()}>
            <ButtonLink href="/specialties" variant="soft">See all specialties <Arrow /></ButtonLink>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featuredSpecialties.map((s, i) => (
            <div key={s.name} className="group flex items-start gap-4 rounded-[20px] bg-stone p-5 transition-colors duration-300 hover:bg-peach-2" {...reveal(i * 60)}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-orange-ink">
                <Icon name={featuredIcons[i]} />
              </span>
              <div>
                <h3 className="text-[1.08rem] tracking-[-0.01em]">{s.name}</h3>
                <p className="text-sm text-muted">{s.note}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <div className="marquee relative mt-10 flex flex-col gap-3 overflow-hidden py-1 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]" aria-hidden="true">
        {rows.map((row, r) => (
          <div key={r} className="marquee-track flex w-max gap-3 animate-marquee" style={r === 1 ? { animationDirection: "reverse", animationDuration: "70s" } : undefined}>
            {[...row, ...row].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="group/chip flex cursor-default items-center gap-2.5 whitespace-nowrap rounded-full bg-white py-1.5 pl-1.5 pr-5 text-[0.95rem] text-graphite shadow-[0_1px_2px_rgb(47_51_54/0.04)] ring-1 ring-line transition-[transform,background-color,box-shadow,color] duration-250 hover:-translate-y-0.5 hover:bg-peach-2 hover:text-fg hover:shadow-[0_10px_20px_-14px_rgb(169_73_12/0.55)] hover:ring-orange/50"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-stone text-orange-ink transition-colors duration-250 group-hover/chip:bg-orange group-hover/chip:text-white">
                  <Icon name={iconFor.get(name) ?? "cross"} className="h-4 w-4" />
                </span>
                {name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
