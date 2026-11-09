"use client";

import { useEffect } from "react";

/**
 * The only page-level script (no animation library). It does four small jobs, all with one IntersectionObserver:
 *  1. Scroll reveals: `[data-reveal]` blocks and `[data-stagger]` lists get `data-shown` whenever they scroll into
 *     view, and lose it once fully off-screen so the animation replays on the next pass; CSS (globals.css) does the rising and fading. Content is hidden only once JS runs (`.js`), so no-JS
 *     visitors and crawlers see everything.
 *  2. Stagger order: children of `[data-stagger]` get an `--i` index for the CSS delay.
 *  3. Count-up: `[data-count]` elements hold the REAL number in the HTML; each time they scroll into view they count from 0 to it.
 *  4. The hero status board is held (`.js .board:not([data-play])` pauses it) until a third of it is on screen.
 * `prefers-reduced-motion`: everything is shown immediately and nothing counts.
 *
 * Render this at the END of each page (not in the layout), as CLAUDE.md requires: React runs a component's effects
 * only after its own tree has hydrated, so the observer never touches server HTML React hasn't claimed yet.
 */
export function MotionObserver() {
  useEffect(() => observe(), []);
  return null;
}

const easeOutQuart = (p: number) => 1 - Math.pow(1 - p, 4);

function countUp(el: HTMLElement): () => void {
  const final = el.dataset.final ?? el.textContent ?? "";
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target) || document.hidden) {
    el.textContent = final; // a hidden tab throttles frames: keep the real number
    return () => {};
  }
  const suffix = el.dataset.suffix ?? "";
  const duration = 1700;
  let start: number | null = null;
  let frame = 0;
  const done = () => {
    cancelAnimationFrame(frame);
    window.clearTimeout(safety);
    el.textContent = final;
  };
  const step = (t: number) => {
    start ??= t;
    const p = Math.min((t - start) / duration, 1);
    if (p === 1) return done();
    el.textContent = `${Math.round(target * easeOutQuart(p)).toLocaleString("en-US")}${suffix}`;
    frame = requestAnimationFrame(step);
  };
  // Safety net: whatever happens to rAF, the real number is back shortly after the animation should end.
  const safety = window.setTimeout(done, duration + 500);
  frame = requestAnimationFrame(step);
  return () => {
    cancelAnimationFrame(frame);
    window.clearTimeout(safety);
  };
}

function observe(): (() => void) | undefined {
  const reveals = document.querySelectorAll<HTMLElement>("[data-reveal], [data-stagger]");
  const counters = document.querySelectorAll<HTMLElement>("[data-count]");
  const boards = document.querySelectorAll<HTMLElement>(".board");

  document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((list) => {
    Array.from(list.children).forEach((child, i) => (child as HTMLElement).style.setProperty("--i", String(i)));
  });

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.setAttribute("data-shown", ""));
    boards.forEach((el) => el.setAttribute("data-play", ""));
    return;
  }

  // Park counters at 0 now (JS is running, so the real number is restored when each one is seen), so an
  // above-the-fold stat never flashes its final value before counting.
  counters.forEach((el) => {
    el.dataset.final ??= el.textContent ?? ""; // `??=`: React Strict Mode runs this effect twice in dev
    el.textContent = `0${el.dataset.suffix ?? ""}`;
  });

  // Running count-ups, so leaving the viewport can cancel them before resetting to 0.
  const running = new Map<HTMLElement, () => void>();
  const resetCounter = (el: HTMLElement) => {
    running.get(el)?.();
    running.delete(el);
    el.textContent = `0${el.dataset.suffix ?? ""}`;
  };

  // "In": play (or replay) once a block is comfortably on screen.
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        if (el.hasAttribute("data-count")) {
          if (!running.has(el)) running.set(el, countUp(el));
        } else el.setAttribute("data-shown", "");
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  // "Out": reset only when the block is completely off-screen, so the reset is never seen.
  const ioOut = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) continue;
      const el = e.target as HTMLElement;
      if (el.hasAttribute("data-count")) resetCounter(el);
      else el.removeAttribute("data-shown");
    }
  });
  // The board is tall, so it needs a lower bar than a short block. It restarts via `.board-reset` (animation: none).
  const boardIo = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const el = e.target as HTMLElement;
        if (e.intersectionRatio >= 0.35) {
          if (el.hasAttribute("data-play")) continue;
          el.classList.remove("board-reset");
          void el.offsetWidth; // flush so the animations restart from 0 before un-pausing
          el.setAttribute("data-play", "");
        } else if (!e.isIntersecting) {
          el.classList.add("board-reset");
          el.removeAttribute("data-play");
        }
      }
    },
    { threshold: [0, 0.35] },
  );

  reveals.forEach((el) => (io.observe(el), ioOut.observe(el)));
  counters.forEach((el) => (io.observe(el), ioOut.observe(el)));
  boards.forEach((el) => boardIo.observe(el));
  return () => {
    io.disconnect();
    ioOut.disconnect();
    running.forEach((cancel) => cancel());
    boardIo.disconnect();
  };
}
