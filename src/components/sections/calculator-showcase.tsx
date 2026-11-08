"use client";

import { useEffect, useRef, useState } from "react";
import { calculatorShowcase as copy, delayCost } from "@/content/site";
import { Arrow, ButtonLink, Check, Container, Icon, reveal } from "../ui/primitives";
import { usd, useTween } from "./delay-calculator";

type Key = keyof typeof delayCost.inputs;
const keys = Object.keys(delayCost.inputs) as Key[];
const defaults = Object.fromEntries(keys.map((k) => [k, delayCost.inputs[k].value])) as Record<Key, number>;
const mins = Object.fromEntries(keys.map((k) => [k, delayCost.inputs[k].min])) as Record<Key, number>;
const fmt = (k: Key, v: number) => (k === "monthly" ? usd.format(v) : k === "days" ? `${v} days` : `${v}`);

const R = 100;
const C = 2 * Math.PI * R;

/**
 * Home showcase of the cost-of-delay calculator: copy on the left, a live mini calculator on the right (a glowing ring
 * for days out of network, a big ticking total, three real sliders). Server-rendered at the default values, so it reads
 * fine without JS. With JS and motion allowed, the sliders start at their minimums and sweep to the defaults once when the
 * card scrolls into view (a one-time demo, no looping); after that it is fully interactive.
 */
export function CalculatorShowcase() {
  const [vals, setVals] = useState<Record<Key, number>>(defaults);
  const [lit, setLit] = useState(true);
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = card.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    let raf = 0;
    setVals(mins);
    setLit(false);
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        setLit(true);
        let t0: number | null = null;
        const step = (t: number) => {
          t0 ??= t;
          const p = Math.min((t - t0) / 2200, 1);
          const e = 1 - Math.pow(1 - p, 4);
          setVals(
            Object.fromEntries(
              keys.map((k) => {
                const f = delayCost.inputs[k];
                const raw = f.min + (f.value - f.min) * e;
                return [k, p === 1 ? f.value : Math.round(raw / f.step) * f.step];
              }),
            ) as Record<Key, number>,
          );
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const perDay = (vals.providers * vals.monthly * 12) / 365;
  const total = useTween(perDay * vals.days);
  const frac = (vals.days - delayCost.inputs.days.min + 30) / (delayCost.inputs.days.max - delayCost.inputs.days.min + 30);

  return (
    <section className="band-glow-ink relative overflow-hidden bg-ink py-20 text-white md:py-28" aria-labelledby="calc-showcase-title">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="flex flex-col items-start gap-6" {...reveal()}>
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange text-white shadow-[0_0_30px_rgb(247_124_39/0.55)]">
            <Icon name="calculator" className="h-6 w-6" />
          </span>
          <h2 id="calc-showcase-title" className="max-w-[16ch] font-normal">{copy.title}</h2>
          <p className="max-w-[44ch] text-on-ink">{copy.body}</p>
          <ul className="flex flex-col gap-2.5 text-sm">
            {copy.points.map((p) => (
              <li key={p} className="flex items-center gap-2.5"><Check className="h-4 w-4 text-orange-soft" />{p}</li>
            ))}
          </ul>
          <ButtonLink href="/cost-calculator">{copy.cta} <Arrow /></ButtonLink>
        </div>

        <div ref={card} {...reveal(150)}>
          <div className="calc-card relative rounded-[28px] bg-white/10 p-3 sm:p-4">
            <div className="grid gap-6 rounded-2xl bg-white p-6 text-fg sm:p-8 md:grid-cols-[auto_1fr] md:items-center md:gap-10">
              {/* Ring + total */}
              <div className="relative mx-auto h-[220px] w-[220px] shrink-0 sm:h-[240px] sm:w-[240px]" aria-hidden="true">
                <span className="calc-halo absolute inset-3 rounded-full" data-lit={lit} />
                <svg viewBox="0 0 240 240" className="relative h-full w-full -rotate-90">
                  <circle cx="120" cy="120" r={R} fill="none" stroke="var(--color-tint-2)" strokeWidth="12" />
                  <circle
                    cx="120" cy="120" r={R} fill="none" stroke="var(--color-orange)" strokeWidth="12" strokeLinecap="round"
                    strokeDasharray={C} strokeDashoffset={C * (1 - Math.min(frac, 1))}
                    className="calc-ring"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xs text-muted">{delayCost.resultLabel}</span>
                  <span className="font-display text-[clamp(1.7rem,3.4vw,2.2rem)] font-normal leading-tight tracking-[-0.03em] tabular-nums">{usd.format(Math.round(total))}</span>
                  <span className="mt-1 text-xs text-orange-ink tabular-nums">{vals.days} {copy.ringLabel}</span>
                </div>
              </div>

              {/* Sliders */}
              <div className="flex flex-col gap-6">
                <p className="text-sm font-medium text-orange-ink">{copy.tryLabel}</p>
                {keys.map((k) => {
                  const f = delayCost.inputs[k];
                  const pct = ((vals[k] - f.min) / (f.max - f.min)) * 100;
                  return (
                    <div key={k} className="flex flex-col gap-2.5">
                      <div className="flex items-baseline justify-between gap-3">
                        <label htmlFor={`showcase-${k}`} className="text-sm">{f.label}</label>
                        <output htmlFor={`showcase-${k}`} className="shrink-0 rounded-full bg-tint px-2.5 py-0.5 text-sm font-medium tabular-nums">{fmt(k, vals[k])}</output>
                      </div>
                      <input
                        id={`showcase-${k}`} type="range" min={f.min} max={f.max} step={f.step} value={vals[k]}
                        aria-valuetext={fmt(k, vals[k])}
                        onChange={(e) => setVals((v) => ({ ...v, [k]: Number(e.target.value) }))}
                        className="range" style={{ ["--p" as string]: `${pct}%` }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <p className="sr-only" aria-live="polite">{delayCost.resultLabel}: {usd.format(Math.round(perDay * vals.days))}.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
