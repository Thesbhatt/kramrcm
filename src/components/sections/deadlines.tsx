import { deadlines } from "@/content/site";
import { Container, SectionHeading, reveal } from "../ui/primitives";

/** Public CMS / CAQH renewal deadlines we track for clients. Needs no client data. */
export function Deadlines() {
  return (
    <section className="pb-20 md:pb-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow={deadlines.eyebrow}
          title={<>{deadlines.titleStart} <span className="hl">{deadlines.titleHighlight}</span></>}
          body={deadlines.body}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {deadlines.items.map((d, i) => (
            <div key={d.title} className="flex flex-col gap-3 rounded-[28px] bg-stone p-7 sm:p-8" {...reveal(i * 80)}>
              <p className="text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-none tracking-[-0.04em] tabular-nums text-orange-ink">{d.value}</p>
              <h3 className="text-[1.3rem] leading-tight">{d.title}</h3>
              <p className="text-[0.97rem] text-muted">{d.body}</p>
            </div>
          ))}
        </div>
        <p className="-mt-6 text-sm text-muted">{deadlines.note}</p>
      </Container>
    </section>
  );
}
