import type { Metadata } from "next";
import { MotionObserver } from "@/components/ui/motion-observer";
import { PageStage } from "@/components/sections/page-stage";
import { SpecialtyExplorer } from "@/components/sections/specialty-explorer";
import { SpecialtyDial } from "@/components/sections/stage-visuals";
import { SpecialtyCard, featuredIcons, groupIcons } from "@/components/sections/specialties-preview";
import { Arrow, ButtonLink, Container, SectionHeading, reveal } from "@/components/ui/primitives";
import { company, cta, featuredSpecialties, specialties, specialtiesPage, specialtyGroups } from "@/content/site";

export const metadata: Metadata = {
  title: "Specialties We Support",
  description:
    "Credentialing and billing for 50 specialties, including primary care, behavioral health, cardiology, home health, hospice, DME and pharmacy.",
  alternates: { canonical: "/specialties" },
};

// Bento placement for the six featured cards on wide screens (6-column grid).
const span = ["lg:col-span-3 lg:row-span-2", "lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];

export default function SpecialtiesPage() {
  const groups = specialtyGroups.map((g) => ({ name: g.name, items: g.items, icon: groupIcons[g.name] ?? "stethoscope" as const }));
  const jumps = featuredSpecialties.map(({ anchor, group, match }) => ({ anchor, group, match }));
  return (
    <>
      <PageStage
        crumb="Specialties"
        title={`Credentialing and billing for ${specialties.length} specialties`}
        mark={String(specialties.length)}
        body={specialtiesPage.body}
        actions={
          <>
            <ButtonLink href={cta.href}>{cta.primary}</ButtonLink>
            <ButtonLink href="#explorer" variant="white">Find your specialty <Arrow /></ButtonLink>
          </>
        }
        visual={<SpecialtyDial />}
      />

      {/* Featured: a bento of the six we see most */}
      <section className="py-20 md:py-28">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow={specialtiesPage.featured.label} title={specialtiesPage.featured.title} />
          {/* All six cards look the same at rest (one orange card read as "the only thing we do"); each turns orange on
              hover/focus and links down to the explorer, filtered to that specialty. */}
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {featuredSpecialties.map((s, i) => (
              <li key={s.name} className={`flex ${span[i]}`} {...reveal(i * 70)}>
                <SpecialtyCard specialty={s} icon={featuredIcons[i]} href={`#${s.anchor}`} large={i === 0} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Every specialty: searchable, filterable */}
      <section id="explorer" className="relative scroll-mt-24 bg-white pb-20 md:pb-28">
        {/* Jump targets for the featured cards: the browser scrolls here even without JS; the explorer reads the hash to filter. */}
        {featuredSpecialties.map((s) => (
          <span key={s.anchor} id={s.anchor} className="absolute top-0" aria-hidden="true" />
        ))}
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow={specialtiesPage.explorer.label} title={specialtiesPage.explorer.title} />
          <SpecialtyExplorer groups={groups} jumps={jumps} copy={specialtiesPage.explorer} ctaHref={cta.href} ctaLabel={cta.primary} />

          {/* Orange banner, text only (client asked to remove the photo, Nov 12 2026) */}
          <div className="band-glow relative mt-10 rounded-2xl bg-orange px-7 py-9 sm:px-9" {...reveal()}>
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <h3 className="text-[1.75rem] font-bold text-white">Don&apos;t see your specialty?</h3>
                <p className="mt-1 max-w-[40ch] text-white">Ask us. If it bills to US payers, we can most likely enroll and bill for it.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={cta.href} variant="light">Ask about your specialty <Arrow /></ButtonLink>
                <ButtonLink href={company.phoneHref} variant="ghost-dark">{company.phoneDisplay}</ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <MotionObserver />
    </>
  );
}
