import Link from "next/link";
import { featuredSpecialties, specialties, specialtiesPage, specialtiesSection, specialtyGroups } from "@/content/site";
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

/**
 * One featured specialty card, shared by the home preview and the /specialties bento. All six look the same at rest (one
 * orange card read as "the only thing we do"); on hover/focus the `.spec-fill` layer fades in orange and the text eases to
 * white. Links to the explorer on /specialties, which filters to that specialty (see `featuredSpecialties`).
 */
export function SpecialtyCard({ specialty, icon, href, compact = false, large = false }: {
  specialty: (typeof featuredSpecialties)[number];
  icon: IconName;
  href: string;
  /** Home grid: smaller padding, icons and title */
  compact?: boolean;
  /** The big first tile in the /specialties bento */
  large?: boolean;
}) {
  const ease = "duration-500 ease-[cubic-bezier(.2,.7,.2,1)]";
  return (
    <Link
      href={href}
      className={`spec-card spot group relative flex w-full flex-col justify-between overflow-hidden rounded-2xl bg-tint ${compact ? "min-h-[200px] gap-8 p-6" : "min-h-[220px] gap-10 p-7"}`}
    >
      <span className="spec-fill pointer-events-none absolute inset-0" aria-hidden="true" />
      <Icon name={icon} className={`pointer-events-none absolute right-5 top-5 text-orange/15 transition-[color,transform] ${ease} group-hover:-rotate-6 group-hover:scale-105 group-hover:text-white/25 group-focus-visible:text-white/25 ${compact ? "h-20 w-20" : "h-24 w-24"}`} />
      <span className={`relative flex items-center justify-center bg-white text-orange-ink shadow-[0_12px_28px_-14px_rgb(47_51_54/0.5)] ${compact ? "h-11 w-11 rounded-xl" : "h-12 w-12 rounded-2xl"}`}>
        <Icon name={icon} className={compact ? "h-5 w-5" : "h-6 w-6"} />
      </span>
      <div className="relative">
        <h3 className={`leading-tight text-fg transition-colors ${ease} group-hover:text-white group-focus-visible:text-white ${compact ? "font-display text-xl" : large ? "text-[clamp(1.75rem,3vw,2.4rem)]" : "text-[1.5rem]"}`}>
          {specialty.name}
        </h3>
        <p className={`max-w-[34ch] text-muted transition-colors ${ease} group-hover:text-white group-focus-visible:text-white ${compact ? "mt-1 text-sm" : "mt-2"}`}>{specialty.note}</p>
        <span className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-ink transition-colors ${ease} group-hover:text-white group-focus-visible:text-white`}>
          {specialtiesPage.featured.cardLink} <Arrow />
        </span>
      </div>
    </Link>
  );
}

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

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" {...stagger}>
          {featuredSpecialties.map((s, i) => (
            <li key={s.name} className="flex">
              <SpecialtyCard specialty={s} icon={featuredIcons[i]} href={`/specialties#${s.anchor}`} compact />
            </li>
          ))}
        </ul>
      </Container>

    </section>
  );
}

/**
 * Slow two-row marquee of every specialty (ported from the main-branch design), shown right under the hero. It is decorative
 * (aria-hidden), pauses on hover/focus (no pause button: client, Nov 15 2026), and stops entirely under prefers-reduced-motion.
 */
export function SpecialtyMarquee() {
  const half = Math.ceil(specialties.length / 2);
  const rows = [specialties.slice(0, half), specialties.slice(half)];

  // Equal space above and below the chips (client, Nov 16 2026): the hero's tint ends right above this section.
  return (
    <section className="py-12 md:py-16" aria-label="Specialties we support">
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
    </section>
  );
}
