import { process, processSection } from "@/content/site";
import { Container } from "../ui/primitives";

/** "How we work": a numbered 01 to 04 sequence (it really is one, so the numbers carry information). */
export function Process() {
  return (
    <section id="process" className="py-20 md:py-28">
      <Container>
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-20">
          <h2>{processSection.title}</h2>
          <p className="max-w-[48ch] text-muted lg:self-end">{processSection.body}</p>
        </div>
        <ol className="mt-12 grid border-t border-line md:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => (
            <li
              key={step.title}
              className="flex flex-col gap-4 border-b border-line py-8 md:pr-8 lg:border-b-0 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
            >
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
