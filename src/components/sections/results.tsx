import { trust } from "@/content/site";
import { Container, SectionHeading, reveal } from "../ui/primitives";

const metricCols: Record<number, string> = { 1: "", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" };

/**
 * Measured results: dated, defined billing metrics and case studies from `trust`.
 * Renders whichever list has items; nothing in production while both are empty.
 * `trust.preview` shows labelled placeholders in `npm run dev` only. Never invent figures.
 */
export function Results() {
  const preview = trust.preview && process.env.NODE_ENV === "development";
  const real = trust.metrics.length > 0 || trust.caseStudies.length > 0;
  const metrics = real ? trust.metrics : preview ? trust.placeholders.metrics : [];
  const caseStudies = real ? trust.caseStudies : preview ? trust.placeholders.caseStudies : [];
  if (!metrics.length && !caseStudies.length) return null;

  return (
    <section className="pb-20 md:pb-28">
      <Container className="flex flex-col gap-12">
        {preview && !real && (
          <p className="rounded-2xl bg-stone-2 px-5 py-3 text-sm text-graphite" role="note">{trust.previewNote}</p>
        )}
        <SectionHeading eyebrow={trust.resultsEyebrow} title={trust.resultsTitle} />

        {metrics.length > 0 && (
          <dl className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${metricCols[Math.min(metrics.length, 4)]}`}>
            {metrics.map((m, i) => (
              <div key={`${m.label}-${i}`} className="flex flex-col gap-2 rounded-[24px] bg-stone p-6 sm:p-7" {...reveal(i * 70)}>
                {/* dt first in the DOM (valid dl), big number shown above it */}
                <dt className="order-2 font-medium">{m.label}</dt>
                <dd className="order-1 text-[clamp(2.2rem,4vw,3.2rem)] font-medium leading-none tracking-[-0.04em] tabular-nums text-orange-ink">{m.value}</dd>
                <dd className="order-3 text-sm text-muted">{m.definition}</dd>
                <dd className="order-4 text-sm font-medium text-graphite">As of {m.asOf}</dd>
              </div>
            ))}
          </dl>
        )}

        {caseStudies.length > 0 && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {caseStudies.map((c, i) => (
              <article key={`${c.practice}-${i}`} className="flex flex-col gap-5 rounded-[28px] bg-stone p-7 sm:p-9" {...reveal(i * 90)}>
                <p className="flex flex-col">
                  <span className="text-[clamp(2.4rem,4.6vw,3.6rem)] font-medium leading-none tracking-[-0.04em] tabular-nums text-orange-ink">{c.metric.value}</span>
                  <span className="mt-2 text-sm text-muted">{c.metric.label}</span>
                </p>
                <p className="text-lg font-medium leading-snug">{c.problem}</p>
                <p className="text-muted">{c.summary}</p>
                <p className="mt-auto border-t border-line pt-4 text-sm font-medium text-graphite">{c.practice} · {c.state}</p>
              </article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
