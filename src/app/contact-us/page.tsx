import type { Metadata } from "next";
import { MotionObserver } from "@/components/ui/motion-observer";
import { ContactForm } from "@/components/sections/contact-form";
import { Faq } from "@/components/sections/faq";
import { PageHero } from "@/components/sections/page-hero";
import { Arrow, ButtonLink, Container, Icon, type IconName } from "@/components/ui/primitives";
import { company, contact } from "@/content/site";

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
      <PageHero crumb="Contact Us" start="Tell us where revenue is" word="stuck" body={contact.body} />

      <section className="pb-20 md:pb-28">
        <Container className="grid grid-cols-1 gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-8">
          <div className="flex flex-col gap-3">
            {channels.map((c) => {
              const inner = (
                <>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-orange-ink"><Icon name={c.icon} /></span>
                  <span className="min-w-0">
                    <span className="block text-sm text-muted">{c.label}</span>
                    <span className="block break-words text-[1.08rem] font-medium tabular-nums">{c.value}</span>
                  </span>
                </>
              );
              return c.href ? (
                <a key={c.label} href={c.href} className="flex items-center gap-4 rounded-xl bg-stone p-5 transition-colors hover:bg-peach-2">{inner}</a>
              ) : (
                <div key={c.label} className="flex items-center gap-4 rounded-xl bg-stone p-5">{inner}</div>
              );
            })}

            <div className="mt-1 rounded-xl bg-ink p-6 text-white sm:p-7">
              <p className="text-sm text-orange-soft">What happens next</p>
              <ol className="mt-4 flex flex-col gap-4 text-[0.97rem] text-on-ink">
                {[
                  "We get back to you to set up a free consultation.",
                  "We look at your payers, providers and open A/R, and show you where revenue is stuck.",
                  "You get a written quote. No commitment until you sign.",
                ].map((t, i) => (
                  <li key={t} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs tabular-nums text-white">{i + 1}</span>
                    {t}
                  </li>
                ))}
              </ol>
              {contact.responseTime && <p className="mt-5 border-t border-ink-line pt-4 text-[0.97rem] text-white">{contact.responseTime}</p>}
              {contact.bookingUrl && (
                <div className="mt-5">
                  <ButtonLink href={contact.bookingUrl} variant="soft">{contact.bookingLabel} <Arrow /></ButtonLink>
                </div>
              )}
            </div>
            {/* TODO(client): US business address + map once provided */}
          </div>

          <div>
            <h2 className="sr-only">{contact.formTitle}</h2>
            <ContactForm />
          </div>
        </Container>
      </section>

      <Faq limit={3} />
      <MotionObserver />
    </>
  );
}
