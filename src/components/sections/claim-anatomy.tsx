import { claimAnatomy as c } from "@/content/site";
import { Arrow, ButtonLink, Check, Container, reveal, stagger } from "../ui/primitives";

/**
 * Home: a sample claim form beside the five checks we run before submitting. Hovering or focusing a check lights the matching
 * field (CSS :has, no JS); on first view the fields scan once, in order. Illustrative only.
 */
export function ClaimAnatomy() {
  return (
    <section className="bg-tint py-20 md:py-28" aria-labelledby="anatomy-title">
      <Container className="flex flex-col gap-12">
        <div className="flex max-w-[44rem] flex-col gap-4" {...reveal()}>
          <h2 id="anatomy-title">{c.title}</h2>
          <p className="text-muted">{c.body}</p>
        </div>

        <div className="anat grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div
            className="relative self-start rounded-2xl bg-white p-6 shadow-[0_40px_90px_-50px_rgb(247_124_39/0.7)] ring-1 ring-line sm:p-8"
            role="img"
            aria-label={`${c.formTitle}: ${c.fields.map((f) => f.label).join(", ")}`}
            {...reveal(60)}
          >
            <div aria-hidden="true" className="flex items-center justify-between gap-3 border-b border-line pb-4">
              <p className="font-display text-xl">{c.formTitle}</p>
              <span className="rounded-full bg-tint px-3 py-1 text-xs text-muted">{c.sample}</span>
            </div>
            <div aria-hidden="true" className="mt-5 grid grid-cols-2 gap-3">
              {c.fields.map((f, i) => (
                <div
                  key={f.label}
                  data-f={f.k || undefined}
                  className="anat-field rounded-lg bg-tint px-3.5 py-3"
                  style={{ ["--i" as string]: i }}
                >
                  <p className="text-[11px] uppercase tracking-[0.06em] text-muted">{f.label}</p>
                  <span className="mt-2.5 block h-2 rounded-full bg-line" style={{ width: `${f.w}%` }} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <ol className="flex flex-col gap-3" {...stagger}>
              {c.checks.map((k, i) => (
                <li
                  key={k.title}
                  data-k={i + 1}
                  tabIndex={0}
                  className="anat-check flex items-start gap-4 rounded-xl border border-line bg-white p-4 sm:p-5"
                >
                  <span className="anat-tick mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange text-white"><Check className="h-3.5 w-3.5" /></span>
                  <span>
                    <span className="block font-display text-lg leading-snug">{k.title}</span>
                    <span className="mt-1 block text-[0.95rem] text-muted">{k.body}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="text-sm text-muted">{c.hint}</p>
            <div><ButtonLink href={c.href}>{c.link} <Arrow /></ButtonLink></div>
          </div>
        </div>
      </Container>
    </section>
  );
}
