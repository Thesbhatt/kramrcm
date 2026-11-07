import type { Metadata } from "next";
import { MotionObserver } from "@/components/ui/motion-observer";
import { PageHero } from "@/components/sections/page-hero";
import { featuredIcons, groupIcons } from "@/components/sections/specialties-preview";
import { Arrow, ButtonLink, Container, Icon, SectionHeading, reveal } from "@/components/ui/primitives";
import { company, cta, featuredSpecialties, specialties, specialtyGroups } from "@/content/site";

export const metadata: Metadata = {
  title: "Specialties We Support",
  description:
    "Credentialing and billing for 50 specialties, including primary care, behavioral health, cardiology, home health, hospice, DME and pharmacy.",
  alternates: { canonical: "/specialties" },
};

export default function SpecialtiesPage() {
  return (
    <>
      <PageHero
        crumb="Specialties"
        start="Credentialing and billing for"
        word={`${specialties.length} specialties`}
        body="Each specialty has its own payers, prior authorization rules and enrollment paperwork. We already know where each one gets stuck."
      >
        <div className="grid grid-cols-2 gap-3">
          {[
            [String(specialties.length), "specialties supported"],
            [String(specialtyGroups.length), "practice categories"],
            ["50", "states, plus telehealth"],
            ["1", "team for credentialing and billing"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-[20px] bg-stone p-5">
              <p className="text-[2.2rem] font-medium leading-none tracking-[-0.04em] tabular-nums">{n}</p>
              <p className="mt-2 text-sm text-muted">{l}</p>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Featured */}
      <section className="pb-20 md:pb-28">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Where we go deepest" title="Specialties we see most" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredSpecialties.map((s, i) => (
              <div key={s.name} className={`flex flex-col gap-10 rounded-[24px] p-7 ${i === 0 ? "bg-ink text-white" : "bg-stone"}`} {...reveal(i * 60)}>
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${i === 0 ? "bg-white/10 text-orange-soft" : "bg-white text-orange-ink"}`}>
                  <Icon name={featuredIcons[i]} className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-[1.5rem] leading-tight">{s.name}</h3>
                  <p className={`mt-2 ${i === 0 ? "text-on-ink" : "text-muted"}`}>{s.note}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Full list by category */}
      <section className="pb-20 md:pb-28">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Full list" title="Every specialty, by category" />
          <div className="columns-1 gap-4 md:columns-2 xl:columns-3">
            {specialtyGroups.map((g, i) => (
              <div key={g.name} className="mb-4 break-inside-avoid rounded-[24px] bg-stone p-6 sm:p-7" {...reveal(i * 50)}>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-orange-ink">
                    <Icon name={groupIcons[g.name] ?? "stethoscope"} />
                  </span>
                  <h3 className="text-[1.2rem]">{g.name}</h3>
                  <span className="ml-auto text-sm tabular-nums text-muted">{g.items.length}</span>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li key={it} className="rounded-full bg-white px-3.5 py-1.5 text-[0.92rem] ring-1 ring-line">{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start justify-between gap-6 rounded-[24px] bg-peach-2 p-7 ring-1 ring-[#f7d9c2] sm:flex-row sm:items-center sm:p-9" {...reveal()}>
            <div>
              <h3 className="text-[1.5rem]">Don&apos;t see your specialty?</h3>
              <p className="mt-1 text-muted">Ask us. If it bills to US payers, we can most likely enroll and bill for it.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={cta.href}>Ask about your specialty <Arrow /></ButtonLink>
              <ButtonLink href={company.phoneHref} variant="white">{company.phoneDisplay}</ButtonLink>
            </div>
          </div>
        </Container>
      </section>
      <MotionObserver />
    </>
  );
}
