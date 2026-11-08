import { process, processSection } from "@/content/site";
import { Container, reveal, stagger } from "../ui/primitives";

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
        <div className="journey mt-12 hidden lg:grid md:mt-16" data-reveal aria-hidden="true">
          {process.map((step, i) => (
            <div key={step.title} className="flex items-center" style={{ ["--i" as string]: i }}>
              <span className="journey-dot h-3 w-3 shrink-0 rounded-full border" />
              {i < process.length - 1 && (
                <span className="relative mx-2 h-[2px] flex-1 bg-line"><span className="journey-fill absolute inset-0 origin-left bg-orange" /></span>
              )}
            </div>
          ))}
        </div>
        <ol className="mt-12 grid border-b border-line md:mt-16 lg:mt-3 md:grid-cols-2 lg:grid-cols-4" {...stagger}>
          {process.map((step, i) => (
            <li
              key={step.title}
              className="relative flex flex-col gap-4 py-8 md:pr-8 lg:border-b-0 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
            >
              <span aria-hidden="true" className="rule absolute inset-x-0 top-0 h-px origin-left bg-ink" />
              <span className="font-display text-5xl font-light leading-none tracking-[-0.02em] text-orange-ink tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl">{step.title}</h3>
              <p className="text-muted">{step.body}</p>
              <p className="mt-auto pt-2 text-sm font-medium">{step.time}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
