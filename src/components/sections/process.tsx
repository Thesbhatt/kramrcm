import { process } from "@/content/site";
import { Container, Icon, SectionHeading, reveal, type IconName } from "../ui/primitives";

const stepIcons: IconName[] = ["phone", "file", "mail", "chart"];

/**
 * Full-width peach band (breaks the run of grey cards on the homepage) with a connected timeline:
 * numbered nodes on a line that draws in, white step cards below. Horizontal on desktop, vertical on phones.
 * `band={false}` renders it on plain white (for pages where the band would sit next to another coloured block).
 */
export function Process({ band = true }: { band?: boolean }) {
  return (
    <section className={band ? "mb-20 bg-peach-2 py-20 md:mb-28 md:py-28" : "pb-20 md:pb-28"}>
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="How it works"
          title="From first call to first payment"
          body="A clear start, one point of contact, and a weekly report you never have to ask for."
        />
        <ol className="relative grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-5" {...reveal()}>
          {/* Connector: horizontal on desktop (draws left → right), vertical on phones */}
          <div aria-hidden="true" className="process-line absolute left-[22px] right-0 top-[22px] hidden h-0.5 rounded-full bg-[linear-gradient(90deg,var(--color-orange),#f7c8a4_70%,transparent)] lg:block" />
          <div aria-hidden="true" className="process-line-y absolute bottom-6 left-[21px] top-6 w-0.5 rounded-full bg-[linear-gradient(180deg,var(--color-orange),#f7c8a4)] lg:hidden" />

          {process.map((step, i) => (
            <li key={step.title} className="relative flex gap-5 lg:flex-col" {...reveal(200 + i * 140)}>
              <span
                className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-medium tabular-nums ring-[6px] ${
                  band ? "ring-peach-2" : "ring-white"
                } ${i === 0 ? "bg-orange text-ink" : "bg-ink text-white"}`}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className={`flex flex-1 flex-col gap-4 rounded-[24px] p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 sm:p-7 ${
                band ? "bg-white shadow-[0_18px_40px_-30px_rgb(169_73_12/0.45)] hover:shadow-[0_26px_50px_-30px_rgb(169_73_12/0.55)]" : "bg-stone"
              }`}>
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-peach-2 text-orange-ink">
                    <Icon name={stepIcons[i]} />
                  </span>
                  <span className="rounded-full bg-stone px-3 py-1 text-xs font-medium text-muted">{step.time}</span>
                </div>
                <h3 className="text-[1.3rem] leading-tight">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="text-[0.97rem] text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
