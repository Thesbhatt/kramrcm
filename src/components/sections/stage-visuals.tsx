import { aboutPage, calculatorPage, contactPage, servicesPage, specialties, specialtyGroups, specialtiesPage } from "@/content/site";
import { LogoMark } from "../ui/logo";
import { Check, Icon } from "../ui/primitives";
import { groupIcons } from "./specialties-preview";

/* Three hero visuals, one per page. Decorative illustrations of a SAMPLE claim / revenue cycle / specialty map. */

/** About: a paper claim form that fills itself in, ticks each step, then gets stamped. */
export function ClaimSheet() {
  const s = aboutPage.sheet;
  return (
    <div className="relative mx-auto w-full max-w-[470px] pb-10 pt-2" role="img" aria-label={`${s.title}: ${s.steps.join(", ")}. ${s.stamp}.`}>
      <span aria-hidden="true" className="hero-rim absolute inset-4 rounded-[28px]" />
      <div aria-hidden="true" className="hero-tilt relative rounded-[26px] bg-white p-6 shadow-[0_40px_80px_-40px_rgb(184_74_12/0.55)] ring-1 ring-line sm:p-7">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <span className="flex items-center gap-2 font-display text-lg"><LogoMark className="h-5 w-5" /> {s.title}</span>
          <span className="rounded-full bg-tint px-3 py-1 text-xs text-muted">{s.tag}</span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {s.fields.map((f, i) => (
            <div key={f} className="rounded-lg bg-tint px-3 py-2.5">
              <p className="text-[11px] uppercase tracking-[0.06em] text-muted">{f}</p>
              <span className="sheet-bar mt-2 block h-2 rounded-full bg-line" style={{ ["--i" as string]: i, width: `${[78, 62, 88, 46][i]}%` }} />
            </div>
          ))}
        </div>

        <ol className="mt-6 flex flex-col gap-3">
          {s.steps.map((step, i) => (
            <li key={step} className="sheet-row flex items-center gap-3" style={{ ["--i" as string]: i }}>
              <span className="sheet-dot flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-orange bg-orange text-white" style={{ ["--i" as string]: i }}>
                <Check className="h-3 w-3" />
              </span>
              <span className="text-[0.95rem] font-medium">{step}</span>
              <span className="ml-auto h-px flex-1 bg-line" />
            </li>
          ))}
        </ol>

        <span className="sheet-stamp absolute right-5 top-[44%] rotate-[-8deg] rounded-md border-[3px] border-orange-ink px-3 py-1 font-display text-lg font-semibold uppercase tracking-[0.12em] text-orange-ink">
          {s.stamp}
        </span>
      </div>

      <div aria-hidden="true" className="sheet-chip chip-depth-b absolute -bottom-1 left-2 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_20px_40px_-20px_rgb(47_51_54/0.5)] ring-1 ring-line sm:left-[-18px]">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange text-white"><Icon name="chart" className="h-4 w-4" /></span>
        <span className="text-sm"><span className="block font-semibold">{s.chip}</span><span className="text-muted">{s.chipState}</span></span>
      </div>
    </div>
  );
}

/** Services: the revenue cycle as a ring; a glowing arc draws around it and each stage lights in turn. */
export function CycleRing() {
  const { cycle, cycleCenter, cycleAria } = servicesPage;
  const n = cycle.length;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[480px]" role="img" aria-label={cycleAria}>
      <span aria-hidden="true" className="cyc-halo absolute inset-[6%] rounded-full" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <circle cx="50" cy="50" r="38" fill="none" stroke="var(--color-line)" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="28" fill="none" stroke="var(--color-line)" strokeWidth="0.35" className="mark-orbit" />
        <circle pathLength={1} cx="50" cy="50" r="38" fill="none" stroke="var(--color-orange)" strokeWidth="1.3" strokeLinecap="round" transform="rotate(-90 50 50)" className="cyc-arc" />
      </svg>
      <div aria-hidden="true" className="absolute inset-[29%] flex flex-col items-center justify-center rounded-full bg-white text-center shadow-[0_30px_60px_-30px_rgb(247_124_39/0.6)] ring-1 ring-line">
        <span className="text-xs text-muted">{cycleCenter.top}</span>
        <span className="font-display text-[clamp(1.4rem,3.6vw,2rem)] font-normal leading-none">{cycleCenter.main}</span>
        <span className="mt-1 text-xs text-muted">{cycleCenter.sub}</span>
      </div>
      {cycle.map((c, i) => {
        const a = ((-90 + (360 / n) * i) * Math.PI) / 180;
        return (
          <div
            key={c.label}
            aria-hidden="true"
            className="cyc-node absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
            style={{ left: `${50 + 38 * Math.cos(a)}%`, top: `${50 + 38 * Math.sin(a)}%`, ["--i" as string]: i }}
          >
            <span className="cyc-tile flex h-[clamp(2.75rem,9vw,3.5rem)] w-[clamp(2.75rem,9vw,3.5rem)] items-center justify-center rounded-2xl bg-orange text-white ring-4 ring-white">
              <Icon name={c.icon} className="h-6 w-6" />
            </span>
            <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium shadow-sm ring-1 ring-line">{c.label}</span>
          </div>
        );
      })}
    </div>
  );
}

/** Specialties: a dial of the seven categories around a counted-up total. */
export function SpecialtyDial() {
  const n = specialtyGroups.length;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[480px]" role="img" aria-label={`${specialties.length} specialties in ${n} categories`}>
      <span aria-hidden="true" className="cyc-halo absolute inset-[6%] rounded-full" />
      <svg viewBox="0 0 100 100" className="dial-rings absolute inset-0 h-full w-full" aria-hidden="true">
        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-orange)" strokeWidth="0.5" className="mark-orbit" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="var(--color-line)" strokeWidth="0.4" />
        <circle cx="50" cy="50" r="20" fill="none" stroke="var(--color-orange)" strokeWidth="0.35" className="mark-orbit" />
      </svg>
      <div aria-hidden="true" className="absolute inset-[34%] flex flex-col items-center justify-center rounded-full bg-orange text-center text-white shadow-[0_30px_60px_-24px_rgb(247_124_39/0.8)]">
        <span className="font-display text-[clamp(2.2rem,7vw,3.4rem)] font-light leading-none tabular-nums"><span data-count={specialties.length}>{specialties.length}</span></span>
        <span className="mt-1 text-xs">{specialtiesPage.dialCenter}</span>
      </div>
      {specialtyGroups.map((g, i) => {
        const a = ((-90 + (360 / n) * i) * Math.PI) / 180;
        return (
          <div
            key={g.name}
            aria-hidden="true"
            className="dial-node absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
            style={{ left: `${50 + 40 * Math.cos(a)}%`, top: `${50 + 40 * Math.sin(a)}%`, ["--i" as string]: i }}
          >
            <span className="flex h-[clamp(2.5rem,8.5vw,3.25rem)] w-[clamp(2.5rem,8.5vw,3.25rem)] items-center justify-center rounded-2xl bg-white text-orange-ink shadow-[0_14px_30px_-14px_rgb(47_51_54/0.5)] ring-1 ring-line">
              <Icon name={groupIcons[g.name] ?? "stethoscope"} className="h-6 w-6" />
            </span>
            <span className="hidden max-w-[10ch] rounded-full bg-white/90 px-2 py-0.5 text-center text-[11px] leading-tight shadow-sm ring-1 ring-line sm:block">{g.items.length}</span>
          </div>
        );
      })}
    </div>
  );
}

/** Calculator: an A/R-aging style chart whose last bar glows, because unbilled revenue piles up the longer a provider waits. */
export function AgingChart() {
  const c = calculatorPage.chart;
  return (
    <div className="relative mx-auto w-full max-w-[470px] pb-4 pt-2" role="img" aria-label={`${c.title}. ${c.caption}`}>
      <span aria-hidden="true" className="hero-rim absolute inset-4 rounded-[28px]" />
      <div aria-hidden="true" className="hero-tilt relative rounded-[26px] bg-white p-6 shadow-[0_40px_80px_-40px_rgb(184_74_12/0.55)] ring-1 ring-line sm:p-7">
        <div className="flex items-start justify-between gap-3 border-b border-line pb-4">
          <p className="font-display text-lg leading-tight">{c.title}</p>
          <span className="shrink-0 rounded-full bg-tint px-3 py-1 text-xs text-muted">{c.tag}</span>
        </div>
        <div className="relative mt-6 flex h-52 items-end gap-3 border-b border-line">
          {[25, 50, 75].map((g) => <span key={g} className="absolute inset-x-0 border-t border-dashed border-line" style={{ bottom: `${g}%` }} />)}
          {c.bars.map((b, i) => {
            const hot = i === c.bars.length - 1;
            return (
              <div key={b.label} className="relative flex h-full flex-1 items-end">
                <span
                  className={`age-bar block w-full rounded-t-lg ${hot ? "age-hot bg-gradient-to-t from-orange to-orange-soft" : "bg-gradient-to-t from-tint-2 to-peach-2"}`}
                  style={{ height: `${b.h}%`, ["--i" as string]: i }}
                />
              </div>
            );
          })}
        </div>
        <div className="mt-2 flex gap-3 text-center text-xs text-muted">
          {c.bars.map((b) => <span key={b.label} className="flex-1">{b.label}</span>)}
        </div>
        <p className="mt-5 text-sm text-muted">{c.caption}</p>
      </div>
      <div aria-hidden="true" className="age-call chip-depth-b absolute right-2 top-[26%] flex items-center gap-2.5 rounded-2xl bg-white px-4 py-2.5 shadow-[0_20px_40px_-20px_rgb(47_51_54/0.5)] ring-1 ring-line sm:-right-4">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange text-white"><Icon name="clock" className="h-4 w-4" /></span>
        <span className="text-sm font-medium">{c.callout}</span>
      </div>
    </div>
  );
}

/** Contact: the free practice review as a checklist card that ticks through what we look at, then names the result. */
export function ReviewCard() {
  const c = contactPage.card;
  return (
    <div className="relative mx-auto w-full max-w-[440px] pb-6 pt-2" role="img" aria-label={`${c.title}: ${c.rows.join(", ")}. ${c.result}. ${c.footer}`}>
      <span aria-hidden="true" className="hero-rim absolute inset-4 rounded-[28px]" />
      <div aria-hidden="true" className="hero-tilt relative rounded-[26px] bg-white p-6 shadow-[0_40px_80px_-40px_rgb(184_74_12/0.55)] ring-1 ring-line sm:p-8">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <span className="flex items-center gap-2 font-display text-lg"><LogoMark className="h-5 w-5" /> {c.title}</span>
          <span className="rounded-full bg-tint px-3 py-1 text-xs text-muted">{c.tag}</span>
        </div>
        <ol className="mt-6 flex flex-col gap-4">
          {c.rows.map((r, i) => (
            <li key={r} className="sheet-row flex items-center gap-3" style={{ ["--i" as string]: i }}>
              <span className="sheet-dot flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-orange bg-orange text-white" style={{ ["--i" as string]: i }}>
                <Check className="h-3.5 w-3.5" />
              </span>
              <span className="font-medium">{r}</span>
              <span className="ml-auto h-px flex-1 bg-line" />
            </li>
          ))}
        </ol>
        <div className="sheet-row band-glow mt-7 rounded-2xl bg-orange p-5 text-white" style={{ ["--i" as string]: 3 }}>
          <p className="text-xs">Result</p>
          <p className="font-display text-xl leading-tight">{c.result}</p>
        </div>
        <p className="mt-4 text-sm text-muted">{c.footer}</p>
      </div>
    </div>
  );
}
