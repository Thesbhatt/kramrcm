import { company, faqSection, faqs } from "@/content/site";
import { Container, reveal, stagger } from "../ui/primitives";

export function Faq({ limit }: { limit?: number }) {
  const list = limit ? faqs.slice(0, limit) : faqs;
  return (
    <section id="faq" className="border-t border-line py-20 md:py-28">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        {/* Sticky on desktop: the heading rides alongside a long (or expanding) question list. */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-32 lg:self-start" {...reveal()}>
          <h2>{faqSection.title}</h2>
          <p className="max-w-[40ch] text-muted">
            {faqSection.bodyLead}{" "}
            <a href={company.phoneHref} className="font-medium text-fg underline decoration-orange underline-offset-4">{company.phoneDisplay}</a>{" "}
            {faqSection.bodyTail}
          </p>
        </div>
        <div className="border-t border-line" {...stagger}>
          {list.map((f) => (
            <details key={f.q} className="faq group border-b border-line">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-left text-base font-medium">
                {f.q}
                <span className="faq-icon flex h-6 w-6 shrink-0 items-center justify-center" aria-hidden="true">
                  <svg viewBox="0 0 16 16" className="h-4 w-4"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
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
