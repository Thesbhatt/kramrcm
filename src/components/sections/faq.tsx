import { company, faqs } from "@/content/site";
import { Container, SectionHeading, reveal } from "../ui/primitives";

export function Faq({ limit }: { limit?: number }) {
  const list = limit ? faqs.slice(0, limit) : faqs;
  return (
    <section id="faq" className="pb-20 md:pb-28">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        {/* Sticky on desktop: the heading rides alongside a long (or expanding) question list instead of leaving a gap under it. */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions practices ask us first"
            body={<>Can&apos;t find your answer? Call <a href={company.phoneHref} className="font-medium text-fg underline decoration-orange underline-offset-4">{company.phoneDisplay}</a> and we&apos;ll walk you through it.</>}
          />
        </div>
        <div className="flex flex-col gap-3" {...reveal(100)}>
          {list.map((f) => (
            <details key={f.q} className="faq group rounded-[20px] bg-stone px-5 transition-colors open:bg-peach-2 sm:px-7">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-left text-[1.08rem] font-medium">
                {f.q}
                <span className="faq-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-fg group-open:bg-ink group-open:text-white" aria-hidden="true">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                </span>
              </summary>
              <p className="max-w-[62ch] pb-6 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
