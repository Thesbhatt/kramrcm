import type { Metadata } from "next";
import { MotionObserver } from "@/components/ui/motion-observer";
import phoneCutout from "@/assets/photos/cutout-phone.webp";
import { PageStage } from "@/components/sections/page-stage";
import { SpecialtyExplorer } from "@/components/sections/specialty-explorer";
import { SpecialtyDial } from "@/components/sections/stage-visuals";
import { featuredIcons, groupIcons } from "@/components/sections/specialties-preview";
import { Cutout } from "@/components/ui/cutout";
import { Arrow, ButtonLink, Container, Icon, SectionHeading, reveal } from "@/components/ui/primitives";
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {featuredSpecialties.map((s, i) => {
              const hero = i === 0;
              return (
                <div
                  key={s.name}
                  className={`spot relative flex min-h-[220px] flex-col justify-between gap-10 overflow-hidden rounded-2xl p-7 ${span[i]} ${hero ? "band-glow bg-orange text-white" : "bg-tint"}`}
                  {...reveal(i * 70)}
                >
                  <Icon name={featuredIcons[i]} className={`pointer-events-none absolute right-5 top-5 h-24 w-24 ${hero ? "text-white/20" : "text-orange/15"}`} />
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-orange-ink shadow-[0_12px_28px_-14px_rgb(47_51_54/0.5)]">
                    <Icon name={featuredIcons[i]} className="h-6 w-6" />
                  </span>
                  <div className="relative">
                    <h3 className={`leading-tight ${hero ? "text-[clamp(1.75rem,3vw,2.4rem)]" : "text-[1.5rem]"}`}>{s.name}</h3>
                    <p className={`mt-2 max-w-[34ch] ${hero ? "text-white" : "text-muted"}`}>{s.note}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Every specialty: searchable, filterable */}
      <section id="explorer" className="scroll-mt-24 bg-white pb-20 md:pb-28">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow={specialtiesPage.explorer.label} title={specialtiesPage.explorer.title} />
          <SpecialtyExplorer groups={groups} copy={specialtiesPage.explorer} ctaHref={cta.href} ctaLabel={cta.primary} />

          {/* Orange banner; on wide screens the clinician stands on its bottom edge and her head rises above the top */}
          <div className="band-glow relative mt-10 rounded-2xl bg-orange px-7 py-9 sm:px-9 md:pl-[300px]" {...reveal()}>
            <Cutout src={phoneCutout} sizes="260px" className="absolute bottom-0 left-8 hidden w-[250px] md:block" delay={200} />
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
