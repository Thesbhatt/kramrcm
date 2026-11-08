"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { calculatorPage, delayCost } from "@/content/site";

type Key = keyof typeof delayCost.inputs;
const keys = Object.keys(delayCost.inputs) as Key[];

export const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const fmt = (k: Key, v: number) => (k === "monthly" ? usd.format(v) : k === "days" ? `${v} days` : `${v}`);

/** Tweens a displayed number toward `target` (~350 ms). Jumps straight there with reduced motion. */
export function useTween(target: number) {
  const [shown, setShown] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = from.current;
    if (start === target) return;
    // Reduced motion: a zero-length tween lands on the target in the first frame.
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 350;
    let raf = 0;
    let t0: number | null = null;
    const step = (t: number) => {
      t0 ??= t;
      const p = duration ? Math.min((t - t0) / duration, 1) : 1;
      const v = start + (target - start) * (1 - Math.pow(1 - p, 3));
      from.current = v;
      setShown(v);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return shown;
}

/** Sliders + live result. Server-rendered with the default values, so it reads fine before hydration. */
export function DelayCalculator({ children }: { children: ReactNode }) {
  const [vals, setVals] = useState<Record<Key, number>>(
    () => Object.fromEntries(keys.map((k) => [k, delayCost.inputs[k].value])) as Record<Key, number>,
  );
  const perDay = (vals.providers * vals.monthly * 12) / 365;
  const total = useTween(perDay * vals.days);
  const daily = useTween(perDay);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.1fr_1fr]">
      <div className="spot flex flex-col justify-between gap-8 rounded-2xl bg-stone p-6 sm:p-9">
        {keys.map((k) => {
          const f = delayCost.inputs[k];
          const pct = ((vals[k] - f.min) / (f.max - f.min)) * 100;
          return (
            <div key={k} className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor={`calc-${k}`} className="text-[0.97rem] font-medium">{f.label}</label>
                <output htmlFor={`calc-${k}`} className="shrink-0 rounded-full bg-white px-3 py-1 text-sm font-medium tabular-nums ring-1 ring-line">
                  {fmt(k, vals[k])}
                </output>
              </div>
              <input
                id={`calc-${k}`}
                type="range"
                min={f.min}
                max={f.max}
                step={f.step}
                value={vals[k]}
                aria-valuetext={fmt(k, vals[k])}
                onChange={(e) => setVals((v) => ({ ...v, [k]: Number(e.target.value) }))}
                className="range"
                style={{ ["--p" as string]: `${pct}%` }}
              />
              <div className="flex justify-between text-xs text-muted tabular-nums" aria-hidden="true">
                <span>{fmt(k, f.min)}</span>
                <span>{fmt(k, f.max)}</span>
              </div>
            </div>
          );
        })}
        {/* Phones: the result card sits below, so keep a live total in view while dragging */}
        <p className="flex items-baseline justify-between gap-4 border-t border-line pt-5 lg:hidden" aria-hidden="true">
          <span className="text-sm text-muted">{delayCost.resultLabel}</span>
          <span className="font-display text-2xl tabular-nums">{usd.format(Math.round(total))}</span>
        </p>
      </div>

      <div className="band-glow-ink calc-card relative flex flex-col justify-between gap-10 overflow-hidden rounded-2xl bg-ink p-7 text-white sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-28 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgb(247_124_39/0.45),transparent_65%)]" />
        {/* Screen readers get the final figures once; the tweening numbers below are visual only */}
        <p className="sr-only" aria-live="polite">
          {delayCost.resultLabel}: {usd.format(Math.round(perDay * vals.days))}, {usd.format(Math.round(perDay))} {delayCost.perDayLabel}.
        </p>
        <div className="relative flex flex-col gap-3" aria-hidden="true">
          <p className="text-sm text-orange-soft">{delayCost.resultLabel}</p>
          <p className="font-display text-[clamp(2.6rem,6vw,4.4rem)] font-normal leading-none tracking-[-0.02em] tabular-nums">
            {usd.format(Math.round(total))}
          </p>
          <p className="text-on-ink">
            <span className="font-medium text-white tabular-nums">{usd.format(Math.round(daily))}</span> {delayCost.perDayLabel}
          </p>
          <p className="mt-3 text-sm text-on-ink tabular-nums">
            {vals.providers} {vals.providers === 1 ? "provider" : "providers"} × {usd.format(vals.monthly)}/mo × {vals.days} days
          </p>
          <div className="mt-2">
            <p className="mb-2 text-xs text-on-ink">{calculatorPage.daysTrack.title}</p>
            <div className="h-2 overflow-hidden rounded-full bg-ink-line">
              <div className="day-track h-full rounded-full bg-gradient-to-r from-orange to-orange-soft shadow-[0_0_12px_rgb(247_124_39/0.8)]" style={{ width: `${(vals.days / delayCost.inputs.days.max) * 100}%` }} />
            </div>
            <div className="mt-1.5 flex justify-between text-[11px] text-on-ink tabular-nums">
              {calculatorPage.daysTrack.marks.map((m) => <span key={m}>{m}</span>)}
            </div>
          </div>
        </div>
        <div className="relative flex flex-col gap-5">
          {children}
          <p className="border-t border-ink-line pt-5 text-xs text-on-ink">{delayCost.note}</p>
        </div>
      </div>
    </div>
  );
}
