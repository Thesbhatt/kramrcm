import type { CSSProperties } from "react";
import { process } from "@/content/site";
import { Container, Icon, SectionHeading, reveal, type IconName } from "../ui/primitives";

const stepIcons: IconName[] = ["phone", "file", "mail", "chart"];

/**
 * Full-width solid orange band (the loudest moment on the homepage) with a connected timeline.
 * Plays as one sequence: node pops, its card rises, the line travels to the next node, repeat (`.flow-*` in globals.css).
 * Horizontal on desktop, vertical on phones (where each step plays as it scrolls in).
 * `band={false}` renders it on plain white (for pages where the band would sit next to another coloured block).
 */
export function Process({ band = true }: { band?: boolean }) {
  return (
    <section className={band ? "band-corners-orange mb-20 bg-orange py-20 md:mb-28 md:py-28" : "pb-20 md:pb-28"}>
      <Container className="flex flex-col gap-14">
        <SectionHeading
          tone={band ? "orange" : "light"}
          eyebrow="How it works"
          title="From first call to first payment"
          body="A clear start, one point of contact, and a weekly report you never have to ask for."
        />
        <ol className="relative grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-5">
          {process.map((step, i) => {
            const last = i === process.length - 1;
            return (
              <li
                key={step.title}
                className="flow-step relative flex gap-5 lg:flex-col"
                {...reveal()}
                data-sequence
                style={{ "--step": i } as CSSProperties}
              >
                {/* Connector to the next node: its own segment so each step can draw in turn. The last one trails off (desktop only). */}
                <div
                  aria-hidden="true"
                  className={`flow-line absolute left-2 top-11 w-7 lg:left-11 lg:top-2 lg:h-7 lg:w-auto ${band ? "text-white" : "text-orange"} ${
                    last ? "flow-line-end hidden lg:block lg:right-0" : "-bottom-6 lg:bottom-auto lg:-right-5"
                  }`}
                >
                  <div className="flow-fill" />
                </div>
                <span
                  className={`flow-node pop relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-medium tabular-nums ring-[6px] ${
                    band ? "bg-white text-ink ring-orange" : `ring-white text-white ${i === 0 ? "bg-orange" : "bg-ink"}`
                  }`}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={`flow-card flex flex-1 flex-col gap-4 rounded-[24px] p-6 hover:-translate-y-1 sm:p-7 ${
                  band ? "bg-white shadow-[0_18px_40px_-30px_rgb(47_51_54/0.55)] hover:shadow-[0_26px_50px_-30px_rgb(47_51_54/0.65)]" : "bg-stone"
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="pop flex h-10 w-10 items-center justify-center rounded-xl bg-orange text-white">
                      <Icon name={stepIcons[i]} />
                    </span>
                    <span className="cascade rounded-full bg-stone px-3 py-1 text-xs font-medium text-muted" style={{ "--i": 0 } as CSSProperties}>{step.time}</span>
                  </div>
                  <h3 className="cascade text-[1.3rem] leading-tight" style={{ "--i": 1 } as CSSProperties}>
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="cascade text-[0.97rem] text-muted" style={{ "--i": 2 } as CSSProperties}>{step.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
