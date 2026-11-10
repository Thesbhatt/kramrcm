import { stats } from "@/content/site";
import { Container, stagger } from "../ui/primitives";

// Full numbers like "120,000+" overflow narrow cells; show 1,000 and above as "5K+" / "120K+" (as the live site does).
function display(value: number, suffixIn: string) {
  const compact = value >= 1000;
  const n = compact ? Math.round(value / 1000) : value;
  const suffix = `${compact ? "K" : ""}${suffixIn}`;
  return { n, suffix, text: `${n.toLocaleString("en-US")}${suffix}` };
}

/** Stats band: real numbers from `stats` in site.ts, static in the HTML. TODO(client): confirm figures. */
export function Stats() {
  return (
    <section className="band-glow bg-orange" aria-label="Kram RCM in numbers">
      <Container>
        <dl className="grid grid-cols-2 lg:grid-cols-4" {...stagger}>
          {stats.map((s, i) => {
            const d = display(s.value, s.suffix);
            return (
            <div
              key={s.label}
              className={`flex flex-col gap-3 py-10 md:py-14 ${i % 2 === 0 ? "pl-0 pr-5" : "px-5"} ${i < 2 ? "border-b border-white/40 lg:border-b-0" : ""} ${i % 2 === 1 ? "border-l border-white/40" : ""} lg:border-l lg:border-white/40 lg:first:border-l-0 lg:px-8 lg:first:pl-0 sm:px-8 sm:first:pl-0`}
            >
              <dd className="order-1 whitespace-nowrap font-display text-[clamp(2.25rem,4.4vw,3.5rem)] font-semibold text-white leading-none tracking-[-0.02em] tabular-nums">
                {/* Real number in the HTML; MotionObserver counts up to it when it scrolls into view */}
                <span data-count={d.n} data-suffix={d.suffix}>{d.text}</span>
              </dd>
              {/* Glowing fill line, drawn once on view: the status board's progress track, reused */}
              <span aria-hidden="true" className="rule order-3 h-[2px] w-16 bg-white shadow-[0_0_10px_rgb(255_255_255/0.8)]" />
              <dt className="order-2 max-w-[22ch] text-sm text-white">{s.label}</dt>
            </div>
            );
          })}
        </dl>
      </Container>
    </section>
  );
}
