import { stats } from "@/content/site";
import { Container, reveal } from "../ui/primitives";

/** Real numbers in the HTML; [data-count] only animates toward them. TODO(client): confirm figures. */
export function Stats({ tone = "peach" }: { tone?: "peach" | "stone" }) {
  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <div className={`grid grid-cols-2 gap-px overflow-hidden rounded-[28px] lg:grid-cols-4 ${tone === "peach" ? "bg-[#f7d9c2]" : "bg-line"}`}>
          {stats.map((s, i) => {
            // Full numbers like "120,000+" overflow narrow cells; show 1,000 and above as "5K+" / "120K+" (as the live site does).
            const compact = s.value >= 1000;
            const n = compact ? Math.round(s.value / 1000) : s.value;
            const suffix = (compact ? "K" : "") + s.suffix;
            return (
            <div key={s.label} className={`flex flex-col gap-2 p-5 sm:p-9 ${tone === "peach" ? "bg-peach-2" : "bg-stone"}`} {...reveal(i * 70)}>
              <span
                className="whitespace-nowrap text-[clamp(1.75rem,9vw,2.2rem)] sm:text-[clamp(2.2rem,4.6vw,3.4rem)] font-medium leading-none tracking-[-0.04em] tabular-nums"
                data-count={n}
                data-suffix={suffix}
              >
                {n.toLocaleString("en-US")}{suffix}
              </span>
              <span className="max-w-[22ch] text-[0.95rem] text-muted">{s.label}</span>
            </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
