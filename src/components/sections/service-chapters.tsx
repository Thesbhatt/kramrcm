import { servicesPage, services, cta } from "@/content/site";
import { ButtonLink, Arrow, Check, Container, Icon, reveal, stagger } from "../ui/primitives";
import { serviceIcons } from "./service-cards";

type Service = (typeof services)[number];

const pill = {
  done: "bg-orange-ink text-white",
  review: "bg-tint-2 text-ink",
  sent: "bg-white text-muted ring-1 ring-inset ring-line",
} as const;

/** A small "sample dashboard" per service. Illustrative only: generic labels, no real payers or numbers. */
function ServiceVisual({ id }: { id: Service["id"] }) {
  const sp = servicesPage;
  const shell = "rounded-2xl bg-white p-5 text-fg shadow-[0_30px_70px_-40px_rgb(247_124_39/0.7)] ring-1 ring-line sm:p-6";
  const head = (title: string) => (
    <div className="flex items-center justify-between gap-3 border-b border-line pb-3.5">
      <p className="font-display text-lg">{title}</p>
      <span className="rounded-full bg-tint px-3 py-1 text-xs text-muted">{sp.sample}</span>
    </div>
  );

  if (id === "credentialing") {
    return (
      <div className={shell} {...reveal()}>
        {head(sp.tracker.title)}
        <ul className="mt-2 divide-y divide-line">
          {sp.tracker.rows.map((r, i) => (
            <li key={r.label} className="flex flex-col gap-2 py-3.5">
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium">{r.label}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${pill[r.tone]}`}>{r.status}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-tint-2">
                <div className="bar-fill h-full rounded-full bg-gradient-to-r from-orange to-orange-soft" style={{ width: `${r.pct}%`, ["--reveal-delay" as string]: `${250 + i * 160}ms` }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (id === "billing") {
    const l = sp.claimLane;
    return (
      <div className={shell} {...reveal()}>
        {head(l.title)}
        <div className="relative mt-6">
          <span aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-3 h-0.5 rounded-full bg-tint-2" />
          <span aria-hidden="true" className="bar-fill absolute left-[12.5%] right-[12.5%] top-3 h-0.5 rounded-full bg-orange shadow-[0_0_10px_rgb(247_124_39/0.7)]" style={{ ["--reveal-delay" as string]: "300ms" }} />
          <ol className="relative grid grid-cols-4">
            {l.steps.map((s) => (
              <li key={s} className="flex flex-col items-center gap-2 text-center">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange text-white ring-4 ring-white"><Check className="h-3 w-3" /></span>
                <span className="text-xs font-medium sm:text-sm">{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-6 rounded-xl bg-tint p-4">
          <p className="text-xs text-muted">{l.denialLabel}</p>
          <ol className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm font-medium">
            {l.denial.map((d, i) => (
              <li key={d} className="flex items-center gap-2">
                <span className={`rounded-full px-3 py-1 ${i === l.denial.length - 1 ? "bg-orange-ink text-white" : "bg-white ring-1 ring-line"}`}>{d}</span>
                {i < l.denial.length - 1 && <Arrow className="h-3.5 w-3.5 text-orange-ink" />}
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  const l = sp.licenseLane;
  return (
    <div className={shell} {...reveal()}>
      {head(l.title)}
      <ol className="relative mt-5 flex flex-col gap-5 pl-9">
        <span aria-hidden="true" className="absolute bottom-3 left-[11px] top-3 w-0.5 rounded-full bg-tint-2" />
        <span aria-hidden="true" className="absolute bottom-3 left-[11px] top-3 w-0.5 rounded-full bg-orange" />
        {l.steps.map((s) => (
          <li key={s} className="relative font-medium">
            <span className="absolute -left-9 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-orange text-white ring-4 ring-white"><Check className="h-3 w-3" /></span>
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Each service as a full-width chapter: sticky intro on the left, a sample dashboard and a capability grid on the right. */
export function ServiceChapters() {
  return (
    <>
      {services.map((s, i) => {
        const dark = s.id === "billing";
        return (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className={`scroll-mt-24 py-20 md:py-28 ${dark ? "band-glow-ink bg-ink text-white" : i % 2 ? "bg-tint" : ""}`}
          >
            <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
              <div className="flex flex-col items-start gap-6 lg:sticky lg:top-28 lg:self-start" {...reveal()}>
                <span className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange text-white shadow-[0_12px_28px_-10px_rgb(247_124_39/0.9)]">
                    <Icon name={serviceIcons[s.id]} className="h-6 w-6" />
                  </span>
                  <span className={`text-sm ${dark ? "text-orange-soft" : "text-orange-ink"}`}>{s.eyebrow}</span>
                </span>
                <h2 id={`${s.id}-title`} className={dark ? "text-white" : ""}>{s.title}</h2>
                <p className={`max-w-[46ch] text-lg ${dark ? "text-on-ink" : "text-muted"}`}>{s.body}</p>
                <p className={`flex items-baseline gap-3 border-t pt-5 ${dark ? "border-ink-line" : "border-line"}`}>
                  <span className="font-display text-5xl font-light leading-none tabular-nums"><span data-count={s.items.length}>{s.items.length}</span></span>
                  <span className={`text-sm ${dark ? "text-on-ink" : "text-muted"}`}>{servicesPage.capabilities}</span>
                </p>
                <ButtonLink href={cta.href} variant={dark ? "light" : "dark"}>{cta.primary} <Arrow /></ButtonLink>
              </div>

              <div className="flex flex-col gap-6">
                <ServiceVisual id={s.id} />
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2" {...stagger}>
                  {s.items.map((it) => (
                    <li
                      key={it}
                      className={`cap-card flex items-start gap-3 rounded-xl border p-4 ${dark ? "border-ink-line bg-ink-2" : "border-line bg-white"}`}
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange text-white"><Check className="h-3 w-3" /></span>
                      <span className="font-medium">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Container>
          </section>
        );
      })}
    </>
  );
}
