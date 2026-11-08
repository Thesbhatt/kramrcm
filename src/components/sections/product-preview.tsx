import { productSection } from "@/content/site";
import { StatusPill, type Status } from "../home/status-pill";
import { ButtonLink, Container, reveal } from "../ui/primitives";

/** Framed product section: the weekly status report a client receives, shown for a SAMPLE practice. */
export function ProductPreview() {
  const { report } = productSection;
  return (
    <section className="py-20 md:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="flex flex-col items-start gap-6" {...reveal()}>
          <h2>{productSection.title}</h2>
          <p className="max-w-[44ch] text-muted">{productSection.body}</p>
          <ButtonLink href={productSection.linkHref} variant="white">{productSection.link}</ButtonLink>
        </div>

        <figure className="rounded-[28px] bg-tint p-3 sm:p-5" {...reveal(150)} aria-label={`${report.title}. ${report.sample}.`}>
          <div className="overflow-clip rounded-2xl border border-line bg-white">
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-line px-5 py-4 sm:px-7">
              <p className="font-medium">{report.title}</p>
              <p className="flex items-center gap-2 text-sm text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden="true" />
                {report.sample}
              </p>
            </div>
            <table className="w-full text-left text-sm">
              <caption className="sr-only">{report.title}</caption>
              <thead>
                <tr className="text-xs text-muted">
                  <th scope="col" className="px-5 pb-2 pt-4 font-normal sm:px-7">{report.columns.item}</th>
                  <th scope="col" className="px-2 pb-2 pt-4 font-normal">{report.columns.status}</th>
                  <th scope="col" className="hidden px-2 pb-2 pt-4 font-normal md:table-cell">{report.columns.next}</th>
                  <th scope="col" className="hidden px-5 pb-2 pt-4 font-normal md:table-cell sm:pr-7">{report.columns.owner}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line border-t border-line" data-stagger="">
                {report.rows.map((r) => (
                  <tr key={r.item}>
                    <th scope="row" className="px-5 py-4 align-middle font-medium sm:px-7">
                      {r.item}
                      <span className="mt-0.5 block text-sm font-normal text-muted md:hidden">{r.next}. Owner: {r.owner}</span>
                    </th>
                    <td className="px-2 py-4 align-middle"><StatusPill status={r.status as Status} /></td>
                    <td className="hidden px-2 py-4 align-middle text-muted md:table-cell">{r.next}</td>
                    <td className="hidden px-5 py-4 align-middle text-muted md:table-cell sm:pr-7">{r.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </figure>
      </Container>
    </section>
  );
}
