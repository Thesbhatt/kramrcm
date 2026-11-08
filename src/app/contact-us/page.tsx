import type { Metadata } from "next";
import Image from "next/image";
import { MotionObserver } from "@/components/ui/motion-observer";
import { ContactForm } from "@/components/sections/contact-form";
import { Faq } from "@/components/sections/faq";
import { PageHero } from "@/components/sections/page-hero";
import { Arrow, ButtonLink, Container, Icon, reveal, type IconName } from "@/components/ui/primitives";
import { company, contact } from "@/content/site";
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

const steps = [
  "We get back to you to set up a free consultation.",
  "We look at your payers, providers and open A/R, and show you where revenue is stuck.",
  "You get a written quote. No commitment until you sign.",
];

export default function ContactPage() {
  return (
    <>
      <PageHero crumb="Contact Us" start="Tell us where revenue is" word="stuck" body={contact.body} />

      {/* Ways to reach us + what happens next */}
      <section className="pb-14 md:pb-20">
        <Container className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1fr_1.7fr]">
          {channels.map((c) => {
            const inner = (
              <>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange text-white"><Icon name={c.icon} /></span>
                <span className="min-w-0">
                  <span className="block text-sm text-muted">{c.label}</span>
                  <span className="block break-words text-[1.08rem] font-medium tabular-nums">{c.value}</span>
                </span>
              </>
            );
            return c.href ? (
              <a key={c.label} href={c.href} className="flex items-center gap-4 rounded-xl bg-tint p-5 transition-colors hover:bg-peach-2" {...reveal()}>{inner}</a>
            ) : (
              <div key={c.label} className="flex items-center gap-4 rounded-xl bg-tint p-5" {...reveal()}>{inner}</div>
            );
          })}

          <div className="rounded-xl bg-peach-2 p-6 sm:p-7 lg:row-span-1" {...reveal(80)}>
            <p className="text-sm font-medium text-orange-ink">What happens next</p>
            <ol className="mt-4 flex flex-col gap-3 text-[0.97rem]">
              {steps.map((t, i) => (
                <li key={t} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange text-xs font-semibold tabular-nums text-white">{i + 1}</span>
                  {t}
                </li>
              ))}
            </ol>
            {contact.responseTime && <p className="mt-4 border-t border-peach-line pt-3 text-[0.97rem]">{contact.responseTime}</p>}
            {contact.bookingUrl && (
              <div className="mt-4">
                <ButtonLink href={contact.bookingUrl}>{contact.bookingLabel} <Arrow /></ButtonLink>
              </div>
            )}
          </div>
          {/* TODO(client): US business address + map once provided */}
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
