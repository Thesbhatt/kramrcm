import { reasons, timelines } from "@/content/site";
import { Container, Icon, SectionHeading, reveal, type IconName } from "../ui/primitives";

const reasonIcons: IconName[] = ["user", "chart", "globe", "shield"];

/** Dark rounded panel inside the white canvas: reasons on the left, typical timelines on the right. */
export function Why() {
  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] bg-ink px-6 py-14 text-white sm:px-10 md:py-20 lg:px-14">
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-32 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgb(247_124_39/0.2),transparent_65%)]" />
          <div className="relative grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="flex flex-col gap-12">
              <SectionHeading
                tone="dark"
                eyebrow="Why Kram"
                title="Accuracy you can count on"
                body="Most delays come from missing documents and unanswered payer follow-ups. We stay on both, so they don't slow your revenue."
              />
              <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
                {reasons.map((r, i) => (
                  <div key={r.title} className="flex flex-col gap-2 border-t border-ink-line pt-5" {...reveal(i * 80)}>
                    <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white/8 text-orange-soft ring-1 ring-white/10">
                      <Icon name={reasonIcons[i]} />
                    </span>
                    <h3 className="text-lg tracking-[-0.01em] text-white">{r.title}</h3>
                    <p className="text-[0.97rem] text-on-ink">{r.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="self-center rounded-[24px] bg-ink-2 p-7 ring-1 ring-ink-line sm:p-9" {...reveal(150)}>
              <p className="text-sm text-orange-soft">Typical timelines</p>
              <h3 className="mt-2 text-2xl">What to expect after a complete application</h3>
              <ul className="mt-8 flex flex-col gap-6">
                {timelines.map((t, i) => (
                  <li key={t.label} className="flex flex-col gap-2">
                    <div className="flex items-baseline justify-between gap-4 text-sm">
                      <span className="text-white">{t.label}</span>
                      <span className="font-medium tabular-nums text-orange-soft">~{t.days} days</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-ink-line">
                      <div
                        className="bar-fill h-full rounded-full bg-gradient-to-r from-orange to-orange-soft"
                        style={{ width: `${(t.days / t.max) * 100}%`, ["--reveal-delay" as string]: `${200 + i * 180}ms` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-ink-line pt-5 text-sm text-on-ink">
                Payer processing times vary by state and plan. We send a status report every week until each one is approved.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
