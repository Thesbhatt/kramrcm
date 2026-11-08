import { process, processSection } from "@/content/site";
import { Container, Icon, reveal, stagger, type IconName } from "../ui/primitives";

const stepIcons: IconName[] = ["stethoscope", "shield", "file", "chart"];

/** "How we work": a numbered 01 to 04 sequence (it really is one, so the numbers carry information). `flush` drops the top padding when the section below a white one already supplies the gap (home). */
export function Process({ flush = false }: { flush?: boolean }) {
  return (
    <section id="process" className={flush ? "pb-20 md:pb-28" : "py-20 md:py-28"}>
      <Container>
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-20" {...reveal()}>
          <h2>{processSection.title}</h2>
          <p className="max-w-[48ch] text-muted lg:self-end">{processSection.body}</p>
        </div>
        {/* Journey track (the status board's dots and glowing fill): lights up step by step when it scrolls in, large screens only */}
        <div className="journey mt-12 hidden gap-4 lg:grid md:mt-16" data-reveal aria-hidden="true">
          {process.map((step, i) => (
            <div key={step.title} className="flex items-center pl-7" style={{ ["--i" as string]: i }}>
              <span className="journey-dot h-3 w-3 shrink-0 rounded-full border" />
              {i < process.length - 1 && (
                <span className="relative mx-2 h-[2px] flex-1 bg-line"><span className="journey-fill absolute inset-0 origin-left bg-orange" /></span>
              )}
            </div>
          ))}
        </div>
        <ol className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 lg:mt-3 lg:grid-cols-4" {...stagger}>
          {process.map((step, i) => (
            <li key={step.title} className="group spot relative flex flex-col gap-4 overflow-hidden rounded-2xl bg-tint p-7 transition-colors duration-300 hover:bg-peach-2">
              <span aria-hidden="true" className="absolute -right-2 -top-4 select-none font-display text-[7rem] font-light leading-none text-white transition-colors duration-300 group-hover:text-peach/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-orange text-white shadow-[0_12px_26px_-10px_rgb(247_124_39/0.8)]">
                <Icon name={stepIcons[i]} className="h-5 w-5" />
              </span>
              <span className="sr-only">Step {i + 1}: </span>
              <h3 className="relative mt-4 font-display text-xl">{step.title}</h3>
              <p className="relative text-muted">{step.body}</p>
              <p className="relative mt-auto pt-2 text-sm font-semibold text-orange-ink">{step.time}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
