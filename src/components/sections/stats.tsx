import { stats } from "@/content/site";
import { Container, reveal } from "../ui/primitives";

// Full numbers like "120,000+" overflow narrow cells; show 1,000 and above as "5K+" / "120K+" (as the live site does).
function display(value: number, suffixIn: string) {
  const compact = value >= 1000;
  const n = compact ? Math.round(value / 1000) : value;
  return { n, suffix: (compact ? "K" : "") + suffixIn };
}

/**
 * Real numbers in the HTML; [data-count] only animates toward them. TODO(client): confirm figures.
 * `hero`: charcoal proof bar at the bottom of the home hero (no scroll reveal, so it is never half faded at the fold).
 * `strip`: standalone charcoal proof bar with orange numbers (currently unused).
 * `peach` / `stone`: filled rounded panel (About page).
 */
export function Stats({ tone = "peach" }: { tone?: "peach" | "stone" | "strip" | "hero" }) {
  // Bottom of the home hero. No reveal(): a scroll-linked reveal would leave it half faded at the fold.
  if (tone === "hero") {
    return (
      <section className="relative z-[4] bg-ink" aria-label="Kram Healthcare in numbers">
        <Container>
          <dl className="grid grid-cols-2 gap-y-6 border-t border-white/15 py-6 lg:grid-cols-4 lg:py-7">
            {stats.map((s, i) => {
              const { n, suffix } = display(s.value, s.suffix);
              return (
                <div key={s.label} className={`flex flex-col gap-1 pr-4 lg:px-8 lg:first:pl-0 ${i > 0 ? "lg:border-l lg:border-ink-line" : ""} ${i % 2 === 1 ? "border-l border-ink-line pl-5 lg:pl-8" : ""}`}>
                  <dt className="order-2 max-w-[26ch] text-[0.9rem] leading-snug text-on-ink">{s.label}</dt>
                  <dd className="order-1 whitespace-nowrap text-[clamp(1.75rem,3vw,2.3rem)] font-medium leading-none tracking-[-0.04em] tabular-nums text-orange">
                    <span data-count={n} data-suffix={suffix}>{n.toLocaleString("en-US")}{suffix}</span>
                  </dd>
                </div>
              );
            })}
          </dl>
        </Container>
      </section>
    );
  }

  if (tone === "strip") {
    return (
      <section className="py-6 md:py-8" aria-label="Kram Healthcare in numbers">
        <Container>
          <dl className="grid grid-cols-2 gap-y-7 rounded-[28px] bg-ink px-6 py-8 md:px-10 md:py-11 lg:grid-cols-4">
            {stats.map((s, i) => {
              const { n, suffix } = display(s.value, s.suffix);
              return (
                <div
                  key={s.label}
                  className={`flex flex-col gap-1.5 pr-4 lg:px-8 lg:first:pl-0 ${i > 0 ? "lg:border-l lg:border-ink-line" : ""} ${i % 2 === 1 ? "border-l border-ink-line pl-5 lg:pl-8" : ""}`}
                  {...reveal(i * 70)}
                >
                  <dt className="order-2 max-w-[24ch] text-[0.92rem] leading-snug text-on-ink">{s.label}</dt>
                  <dd className="order-1 whitespace-nowrap text-[clamp(1.9rem,3.4vw,2.6rem)] font-medium leading-none tracking-[-0.04em] tabular-nums text-orange">
                    <span data-count={n} data-suffix={suffix}>{n.toLocaleString("en-US")}{suffix}</span>
                  </dd>
                </div>
              );
            })}
          </dl>
        </Container>
      </section>
    );
  }

  return (
    <section className="pb-20 md:pb-28">
      <Container>
        {/* clip, not hidden: a hidden ancestor would capture the cells' scroll-linked reveal */}
        <div className={`grid grid-cols-2 gap-px overflow-clip rounded-[28px] lg:grid-cols-4 ${tone === "peach" ? "bg-orange" : "bg-line"}`}>
          {stats.map((s, i) => {
            const { n, suffix } = display(s.value, s.suffix);
            return (
              <div key={s.label} className={`flex flex-col gap-2 p-5 sm:p-9 ${tone === "peach" ? "bg-orange text-white" : "bg-stone"}`} {...reveal(i * 70)}>
                <span
                  className="whitespace-nowrap text-[clamp(1.75rem,9vw,2.2rem)] sm:text-[clamp(2.2rem,4.6vw,3.4rem)] font-medium leading-none tracking-[-0.04em] tabular-nums"
                  data-count={n}
                  data-suffix={suffix}
                >
                  {n.toLocaleString("en-US")}{suffix}
                </span>
                <span className={`max-w-[22ch] text-[0.95rem] ${tone === "peach" ? "text-white" : "text-muted"}`}>{s.label}</span>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
