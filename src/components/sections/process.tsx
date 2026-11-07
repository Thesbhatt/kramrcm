import { process } from "@/content/site";
import { Container, Icon, SectionHeading, reveal, type IconName } from "../ui/primitives";

const stepIcons: IconName[] = ["phone", "file", "mail", "chart"];

export function Process() {
  return (
    <section className="pb-20 md:pb-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="How it works"
          title="From first call to first payment"
          body="A clear start, one point of contact, and a weekly report you never have to ask for."
        />
        <ol className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" {...reveal()}>
          <div aria-hidden="true" className="process-line absolute left-8 right-8 top-[2.1rem] hidden h-px bg-[linear-gradient(90deg,var(--color-orange),var(--color-line))] lg:block" />
          {process.map((step, i) => (
            <li key={step.title} className="relative flex flex-col gap-4 rounded-[24px] bg-stone p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white text-orange-ink ring-1 ring-line">
                  <Icon name={stepIcons[i]} />
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-muted ring-1 ring-line">{step.time}</span>
              </div>
              <h3 className="text-[1.3rem] leading-tight">{step.title}</h3>
              <p className="text-[0.97rem] text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
