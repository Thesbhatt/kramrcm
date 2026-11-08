import type { Metadata } from "next";
import Image from "next/image";
import { MotionObserver } from "@/components/ui/motion-observer";
import { ContactForm } from "@/components/sections/contact-form";
import { Faq } from "@/components/sections/faq";
import { PageStage } from "@/components/sections/page-stage";
import { ReviewCard } from "@/components/sections/stage-visuals";
import { Arrow, ButtonLink, Container, Icon, SectionHeading, reveal, stagger, type IconName } from "@/components/ui/primitives";
import { company, contact, contactPage } from "@/content/site";
import doctor from "@/assets/photos/contact-doctor.webp";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Book a free practice review with Kram Healthcare. Call (213) 832-7088 or send a message and our team will get back to you.",
  alternates: { canonical: "/contact-us" },
};

const channels: { icon: IconName; label: string; value: string; href?: string }[] = [
  { icon: "phone", label: "Call us", value: company.phoneDisplay, href: company.phoneHref },
  { icon: "mail", label: "Email", value: company.email, href: `mailto:${company.email}` },
  ...(company.hours ? [{ icon: "clock" as IconName, label: "Hours", value: company.hours }] : []),
];

export default function ContactPage() {
  return (
    <>
      <PageStage
        crumb="Contact Us"
        title="Tell us where revenue is stuck"
        mark="stuck"
        body={contact.body}
        actions={
          <>
            <ButtonLink href={company.phoneHref}>Call {company.phoneDisplay}</ButtonLink>
            <ButtonLink href="#connect-title" variant="white">Send a message <Arrow /></ButtonLink>
          </>
        }
        visual={<ReviewCard />}
      />

      {/* Ways to reach us */}
      <section className="py-16 md:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading title={contactPage.channelsTitle} />
          <div className={`grid grid-cols-1 gap-4 ${channels.length > 2 ? "lg:grid-cols-3" : "sm:grid-cols-2"}`} {...stagger}>
            {channels.map((c, i) => {
              const inner = (
                <>
                  <Icon name={c.icon} className="pointer-events-none absolute -bottom-8 -right-6 h-44 w-44 text-orange/15 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105" />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-orange text-white shadow-[0_14px_30px_-12px_rgb(247_124_39/0.9)]"><Icon name={c.icon} className="h-6 w-6" /></span>
                  <span className="relative mt-10 block min-w-0">
                    <span className="block text-sm text-muted">{c.label}</span>
                    <span className="mt-1 block break-words font-display text-[clamp(1.35rem,2.2vw,1.7rem)] tabular-nums leading-tight">{c.value}</span>
                  </span>
                </>
              );
              const cls = `group spot relative block overflow-hidden rounded-2xl p-7 transition-colors duration-300 ${i === 0 ? "bg-peach-2" : "bg-tint"} hover:bg-peach`;
              return c.href ? (
                <a key={c.label} href={c.href} className={cls}>{inner}</a>
              ) : (
                <div key={c.label} className={cls}>{inner}</div>
              );
            })}
          </div>
          {/* TODO(client): US business address + map once provided */}
        </Container>
      </section>

      {/* What happens next: three steps on a glowing track */}
      <section className="bg-tint py-16 md:py-24" aria-labelledby="next-title">
        <Container className="flex flex-col gap-12">
          <div className="flex flex-col gap-4" {...reveal()}>
            <h2 id="next-title" className="max-w-[18ch]">{contactPage.nextTitle}</h2>
            {contact.responseTime && <p className="text-muted">{contact.responseTime}</p>}
          </div>
          <ol className="relative grid grid-cols-1 gap-4 md:grid-cols-3" {...stagger}>
            {contactPage.steps.map((st, i) => (
              <li key={st.title} className="group spot relative flex flex-col gap-4 overflow-hidden rounded-2xl bg-white p-7 ring-1 ring-line transition-shadow duration-300 hover:shadow-[0_24px_50px_-28px_rgb(247_124_39/0.8)]">
                <span aria-hidden="true" className="absolute -right-2 -top-4 select-none font-display text-[7rem] font-light leading-none text-tint-2 transition-colors duration-300 group-hover:text-peach">{i + 1}</span>
                <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-orange text-white shadow-[0_12px_26px_-10px_rgb(247_124_39/0.8)]">
                  <Icon name={(["phone", "chart", "file"] as IconName[])[i]} className="h-5 w-5" />
                </span>
                <h3 className="relative mt-4 font-display text-xl">{st.title}</h3>
                <p className="relative text-muted">{st.body}</p>
              </li>
            ))}
          </ol>
          {contact.bookingUrl && (
            <div><ButtonLink href={contact.bookingUrl}>{contact.bookingLabel} <Arrow /></ButtonLink></div>
          )}
        </Container>
      </section>

      {/* Orange band: headline and the clinician cutout on the left, the form on the right */}
      <section className="band-glow bg-orange py-14 md:py-20" aria-labelledby="connect-title">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-4" {...reveal()}>
              <h2 id="connect-title" className="max-w-[16ch] font-normal text-white">{contact.band.title}</h2>
              <p className="max-w-[44ch] text-white">{contact.band.body}</p>
            </div>
            {/* Decorative cutout, sits flush on the bottom edge of the band. Hidden on small screens to keep the form first. */}
            <div className="relative -mb-14 mt-auto hidden lg:-mb-20 lg:block" aria-hidden="true">
              <Image src={doctor} alt="" sizes="(min-width: 1024px) 440px, 0px" className="mx-auto h-auto w-full max-w-[440px]" />
            </div>
          </div>

          <div>
            <h3 className="sr-only">{contact.formTitle}</h3>
            <ContactForm />
          </div>
        </Container>
      </section>

      <Faq limit={3} />
      <MotionObserver />
    </>
  );
}
