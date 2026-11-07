"use client";

import { useEffect } from "react";

/**
 * Scroll motion (keeps client JS tiny): [data-reveal] and [data-words] (staggered headline words) get [data-shown] when it scrolls into view;
 * [data-count] counts up to the number already in the HTML. Content is readable without JS.
 *
 * Render this at the END of each page (not in the layout). React runs a component's effects only after
 * its own tree has hydrated, so the observer never touches server HTML React hasn't claimed yet
 * (a layout-level observer can win that race and cause hydration-mismatch warnings).
 * Each page mounts its own instance, so client-side navigation re-scans automatically.
 */
export function MotionObserver() {
  useEffect(() => {
    const io = observe();
    return () => io?.disconnect();
  }, []);
  return null;
}

/** One observer for the current page: reveal on scroll, count stats up. */
function observe(): IntersectionObserver | undefined {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown]), [data-words]:not([data-shown])");
  const counters = document.querySelectorAll<HTMLElement>("[data-count]:not([data-counted])");

  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.setAttribute("data-shown", ""));
    return;
  }

  const countUp = (el: HTMLElement) => {
    el.setAttribute("data-counted", "");
    const final = el.textContent; // real value rendered on the server
    // Hidden tabs throttle animation frames; never risk leaving a stat stuck at "0".
    if (document.hidden) return;
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix ?? "";
    const duration = 1600;
    let start: number | null = null;
    let done = false;
    const step = (t: number) => {
      if (done) return;
      start ??= t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(target * eased).toLocaleString("en-US") + suffix;
      if (p < 1) requestAnimationFrame(step);
      else done = true;
    };
    requestAnimationFrame(step);
    // Safety net: whatever happens to rAF, show the real number shortly after the animation should end.
    window.setTimeout(() => { done = true; el.textContent = final; }, duration + 400);
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        if (el.dataset.count) countUp(el);
        else el.setAttribute("data-shown", "");
        io.unobserve(el);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );

  reveals.forEach((el) => io.observe(el));
  counters.forEach((el) => io.observe(el));
  return io;
}
