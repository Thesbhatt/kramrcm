import type { Metadata } from "next";
import Image from "next/image";
import patientPhoto from "@/assets/photos/clinician-patient.jpg";
import teamPhoto from "@/assets/photos/practice-team.jpg";
import { MotionObserver } from "@/components/ui/motion-observer";
import { BillingWhy } from "@/components/sections/billing-why";
import { Leadership } from "@/components/sections/leadership";
import { PageStage } from "@/components/sections/page-stage";
import { Stats } from "@/components/sections/stats";
import { ClaimSheet } from "@/components/sections/stage-visuals";
import { Why } from "@/components/sections/why";
import { Arrow, ButtonLink, Container, Icon, SectionHeading, reveal, stagger, type IconName } from "@/components/ui/primitives";
import { about, aboutPage, cta, stats } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Kram Healthcare is a credentialing and revenue cycle partner for US practices: provider enrollment, credentialing, medical billing, denial management and DME billing.",
  alternates: { canonical: "/about-us" },
};

const valueIcons: IconName[] = ["file", "chart", "shield", "user"];
// Bento placement on wide screens (12-column grid): one wide feature card, then three.
const valueSpan = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export default function AboutPage() {
  const [lead, ...rest] = about.mission.paragraphs;
  const accuracy = stats[stats.length - 1];
  return (
    <>
      <PageStage
        crumb="About Us"
        title={`${about.titleStart} ${about.titleHighlight} ${about.titleEnd}`}
        mark={about.titleHighlight}
        body={about.body}
        actions={
          <>
            <ButtonLink href={cta.href}>{cta.primary}</ButtonLink>
            <ButtonLink href="/services" variant="white">Our services <Arrow /></ButtonLink>
          </>
        }
        visual={<ClaimSheet />}
      />

      {/* Mission: a big lead paragraph beside an overlapping photo collage */}
      <section className="py-20 md:py-28">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
          <div className="flex flex-col gap-8">
            <SectionHeading eyebrow={aboutPage.missionLabel} title={about.mission.title} />
            <p className="font-display text-[clamp(1.25rem,2.1vw,1.6rem)] font-medium leading-[1.4] tracking-[-0.01em]" {...reveal(80)}>{lead}</p>
            <div className="flex flex-col gap-4 border-l-2 border-orange pl-6 text-muted" {...reveal(160)}>
              {rest.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px] pb-16 pr-8 lg:mx-0" {...reveal(120)}>
            <span aria-hidden="true" className="absolute -left-4 -top-4 h-full w-full rounded-[28px] border-2 border-orange/40" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-tint">
              <Image
                src={patientPhoto}
                alt="A physician talking with a patient in an exam room"
                fill
                sizes="(min-width: 1024px) 890px, min(192vw, 1020px)" /* 4:5 frame over a 3:2 photo: object-cover paints it ~1.9x the frame width */
                quality={80}
                placeholder="blur"
                className="object-cover object-[40%_center]"
              />
            </div>
            <div className="absolute -bottom-0 right-0 w-[56%] overflow-hidden rounded-2xl bg-tint shadow-[0_30px_60px_-30px_rgb(47_51_54/0.6)] ring-4 ring-white">
              <div className="relative aspect-[4/3]">
                <Image
                  src={teamPhoto}
                  alt="Two colleagues celebrating at a desk covered with reports and a laptop"
                  fill
                  sizes="320px"
                  quality={80}
                  placeholder="blur"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="band-glow absolute -left-3 bottom-6 rounded-2xl bg-orange px-5 py-4 text-white shadow-[0_24px_50px_-20px_rgb(247_124_39/0.9)] sm:-left-8">
              <p className="font-display text-4xl font-light leading-none tabular-nums"><span data-count={accuracy.value} data-suffix={accuracy.suffix}>{accuracy.value}{accuracy.suffix}</span></p>
              <p className="mt-1 max-w-[16ch] text-xs">{aboutPage.missionBadge}</p>
            </div>
          </div>
        </Container>
      </section>

      <Stats />

      {/* Values: a bento, not four identical cards */}
      <section className="py-20 md:py-28">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow={aboutPage.valuesLabel} title={aboutPage.valuesTitle} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12" {...stagger}>
            {about.values.map((v, i) => {
              const feature = i === 0;
              return (
                <div
                  key={v.title}
                  className={`spot relative flex min-h-[250px] flex-col justify-between gap-12 overflow-hidden rounded-2xl p-7 sm:p-8 ${valueSpan[i]} ${feature ? "band-glow-ink bg-ink text-white" : "bg-tint"}`}
                >
                  <Icon name={valueIcons[i]} className={`pointer-events-none absolute right-6 top-6 h-24 w-24 ${feature ? "text-white/10" : "text-orange/12"}`} />
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-orange text-white shadow-[0_12px_28px_-10px_rgb(247_124_39/0.9)]">
                    <Icon name={valueIcons[i]} className="h-6 w-6" />
                  </span>
                  <div className="relative">
                    <h3 className="text-[1.5rem] leading-tight">{v.title}</h3>
                    <p className={`mt-2 max-w-[46ch] ${feature ? "text-on-ink" : "text-muted"}`}>{v.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <Leadership />
      <BillingWhy />
      {/* TODO(client): leadership section (names, titles, headshots) once provided */}
      <Why />
      <MotionObserver />
    </>
  );
}
