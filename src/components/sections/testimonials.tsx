import { proof, testimonials, type Testimonial } from "@/content/site";
import { LogoMark } from "../ui/logo";
import { Container, SectionHeading, reveal } from "../ui/primitives";

/**
 * Client proof: one featured quote (with optional result metric) + up to two smaller quotes.
 * Currently switched OFF via `proof.enabled` in site.ts (renders nothing anywhere).
 * When enabled: renders nothing in production until `testimonials` has real, approved entries;
 * in development it shows labelled placeholders so the layout can be reviewed.
 */
export function Testimonials() {
  if (!proof.enabled) return null;
  const preview = testimonials.length === 0 && process.env.NODE_ENV === "development";
  const items: Testimonial[] = testimonials.length ? testimonials : preview ? proof.placeholders : [];
  if (!items.length) return null;
  const [featured, ...rest] = items;

  return (
    <section className="pb-20 md:pb-28">
      <Container className="flex flex-col gap-12">
        {preview && (
          <p className="rounded-2xl bg-[#E3ECF7] px-5 py-3 text-sm text-[#1F4A80]" role="note">{proof.previewNote}</p>
        )}
        <SectionHeading eyebrow={proof.eyebrow} title={proof.title} />

        <div className={`grid grid-cols-1 gap-4 ${rest.length ? "lg:grid-cols-[1.35fr_1fr]" : ""}`}>
          <figure className="relative flex flex-col justify-between gap-10 overflow-hidden rounded-[32px] bg-peach-2 p-7 sm:p-10" {...reveal()}>
            <LogoMark className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 opacity-[0.07]" />
            <QuoteMark />
            <blockquote className="relative max-w-[34ch] text-[clamp(1.4rem,2.4vw,1.9rem)] font-medium leading-[1.3] tracking-[-0.02em]">
              {featured.quote}
            </blockquote>
            <div className="relative flex flex-wrap items-end justify-between gap-6 border-t border-[#f3d6c0] pt-6">
              <Person t={featured} />
              {featured.metric && (
                <p className="flex flex-col text-right">
                  <span className="text-[clamp(2rem,3.6vw,2.8rem)] font-medium leading-none tracking-[-0.04em] tabular-nums text-orange-ink">{featured.metric.value}</span>
                  <span className="mt-1 text-sm text-muted">{featured.metric.label}</span>
                </p>
              )}
            </div>
          </figure>

          {rest.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {rest.slice(0, 2).map((t, i) => (
                <figure key={`${t.name}-${i}`} className="flex flex-col justify-between gap-8 rounded-[28px] bg-stone p-7" {...reveal(120 + i * 100)}>
                  <blockquote className="text-[1.08rem] leading-relaxed">{t.quote}</blockquote>
                  <Person t={t} />
                </figure>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

function Person({ t }: { t: Testimonial }) {
  const initials = t.name.replace(/[^A-Za-z ]/g, "").split(" ").filter(Boolean).map((w) => w[0]).slice(0, 2).join("") || "•";
  return (
    <figcaption className="flex items-center gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-medium text-white" aria-hidden="true">
        {initials}
      </span>
      <span className="leading-tight">
        <span className="block font-medium">{t.name}</span>
        <span className="text-sm text-muted">{t.role}, {t.practice} · {t.state}</span>
      </span>
    </figcaption>
  );
}

function QuoteMark() {
  return (
    <svg viewBox="0 0 48 36" className="relative h-9 w-12 text-orange" aria-hidden="true">
      <path fill="currentColor" d="M0 36V22.4C0 9.9 6.2 2.4 18.7 0l2 4.6C14.1 6.6 10.8 10.6 10.6 17H19v19H0Zm27 0V22.4C27 9.9 33.2 2.4 45.7 0l2 4.6C41.1 6.6 37.8 10.6 37.6 17H46v19H27Z" />
    </svg>
  );
}
