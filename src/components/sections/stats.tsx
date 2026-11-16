import { stats } from "@/content/site";
import { Container, Icon, stagger } from "../ui/primitives";

/**
 * Orange trust band: one real figure (years of experience, counted up on view) beside four plain trust points.
 * Client, Nov 16 2026: no volume or success-rate numbers, only what the client can stand behind.
 */
export function Stats() {
  const { lead, points } = stats;
  return (
    <section className="band-glow bg-orange text-white" aria-label="Why practices work with Kram RCM">
      <Container className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)]">
        <div className="flex flex-col justify-center gap-3 border-b border-white/40 py-10 md:py-14 lg:border-b-0 lg:border-r lg:pr-10">
          <p className="font-display text-[clamp(3.25rem,6.5vw,5.5rem)] font-semibold leading-none tracking-[-0.02em] tabular-nums">
            {/* Real number in the HTML; MotionObserver counts up to it when it scrolls into view */}
            <span data-count={lead.value} data-suffix={lead.suffix}>{lead.value}{lead.suffix}</span>
          </p>
          <p className="max-w-[22ch] text-base">{lead.label}</p>
          {/* Glowing fill line, drawn once on view: the status board's progress track, reused */}
          <span aria-hidden="true" className="rule h-[2px] w-16 bg-white shadow-[0_0_10px_rgb(255_255_255/0.8)]" />
        </div>

        <ul className="grid grid-cols-1 gap-x-10 gap-y-8 py-10 sm:grid-cols-2 md:py-14 lg:pl-10" {...stagger}>
          {points.map((p) => (
            <li key={p.title} className="flex gap-4">
              <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/40">
                <Icon name={p.icon} className="h-5 w-5" />
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-xl font-semibold leading-tight tracking-[-0.01em]">
                  {p.title} <span className="block text-base font-medium">{p.subtitle}</span>
                </h3>
                <p className="text-sm">{p.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
