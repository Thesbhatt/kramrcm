"use client";

import { useState } from "react";

/**
 * Pause / play for a marquee (specialties, payers), so keyboard and touch users can stop the motion (hover alone can't).
 * It sets `data-paused` on the `.marquee` inside its own <section>; globals.css pauses the tracks. Hidden without JS (it would do
 * nothing) and under reduced motion (the marquee is already static there). Labels come from `marquee` in site.ts.
 */
export function MarqueeToggle({ pauseLabel, playLabel }: { pauseLabel: string; playLabel: string }) {
  const [paused, setPaused] = useState(false);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = !paused;
    setPaused(next);
    const scope = e.currentTarget.closest("section") ?? document;
    scope.querySelectorAll<HTMLElement>(".marquee").forEach((el) => {
      if (next) el.setAttribute("data-paused", "");
      else el.removeAttribute("data-paused");
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      aria-label={paused ? playLabel : pauseLabel}
      className="hidden h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-fg ring-1 ring-inset ring-line transition-colors duration-150 hover:bg-stone motion-reduce:hidden [.js_&]:flex"
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
        {paused ? <path d="M5 3.2v9.6L13 8 5 3.2Z" fill="currentColor" /> : <path d="M5 3.5v9M11 3.5v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}
      </svg>
    </button>
  );
}
