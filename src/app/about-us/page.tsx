import type { Metadata } from "next";
import Image from "next/image";
import patientPhoto from "@/assets/photos/clinician-patient.jpg";
import teamPhoto from "@/assets/photos/practice-team.jpg";
import { MotionObserver } from "@/components/ui/motion-observer";
import { BillingWhy } from "@/components/sections/billing-why";
import { PageHero } from "@/components/sections/page-hero";
import { Stats } from "@/components/sections/stats";
import { Why } from "@/components/sections/why";
import { LogoMark } from "@/components/ui/logo";
import { Container, Icon, SectionHeading, reveal, type IconName } from "@/components/ui/primitives";
import { about, company } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Kram Healthcare is a credentialing and revenue cycle partner for US practices: provider enrollment, credentialing, medical billing, denial management and DME billing.",
  alternates: { canonical: "/about-us" },
};

const valueIcons: IconName[] = ["file", "chart", "shield", "user"];

export default function AboutPage() {
  return (
    <>
      <PageHero crumb="About Us" start={about.titleStart} word={about.titleHighlight} end={about.titleEnd} body={about.body}>
        <div className="relative min-h-[380px] overflow-hidden rounded-[28px] bg-peach sm:min-h-[440px]">
          {/* TODO(client): replace with the client's own photography (src/assets/photos/CREDITS.md) */}
          <Image
            src={patientPhoto}
            alt="A physician talking with a patient in an exam room"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            quality={70}
            placeholder="blur"
            loading="eager"
            className="object-cover object-[40%_center]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgb(47_51_54/0.35))]" />
          <div className="absolute inset-x-3 bottom-3 rounded-[20px] bg-white/95 p-5 backdrop-blur sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-[320px]">
            <p className="flex items-center gap-2 text-sm text-muted"><LogoMark className="h-4 w-4" /> Our promise</p>
            <p className="mt-1.5 text-[1.45rem] font-medium leading-tight tracking-[-0.03em]">{company.tagline}.</p>
            <p className="mt-2 text-sm text-muted">Every application and claim is checked before it goes out, and every status is reported back to you.</p>
          </div>
        </div>
      </PageHero>

      {/* Mission */}
      <section className="pb-20 md:pb-28">
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start"><SectionHeading eyebrow="Our mission" title={about.mission.title} /></div>
          <div className="flex flex-col gap-5 text-lg text-muted lg:pt-14" {...reveal(100)}>
            {about.mission.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-[28px] bg-stone lg:col-span-2 lg:aspect-[21/9]" {...reveal()}>
            <Image
              src={teamPhoto}
              alt="Two colleagues celebrating at a desk covered with reports and a laptop"
              fill
              sizes="(min-width: 1240px) 1160px, 100vw"
              quality={70}
              placeholder="blur"
              className="object-cover object-[center_40%]"
            />
          </div>
        </Container>
      </section>

      <Stats />

      <BillingWhy />

      {/* Values */}
      <section className="pb-20 md:pb-28">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="How we work" title="Four commitments on every account" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v, i) => (
              <div key={v.title} className="flex flex-col gap-4 rounded-[24px] bg-stone p-6 sm:p-7" {...reveal(i * 70)}>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-orange-ink">
                  <Icon name={valueIcons[i]} className="h-6 w-6" />
                </span>
                <h3 className="text-[1.3rem] leading-tight">{v.title}</h3>
                <p className="text-[0.97rem] text-muted">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* TODO(client): leadership section (names, titles, headshots) once provided */}
      <Why />
      <MotionObserver />
    </>
  );
}
