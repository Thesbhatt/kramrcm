"use client";

import { useEffect } from "react";

/**
 * Scroll motion (keeps client JS tiny). Entrances ([data-reveal], [data-words]) follow the scroll position in both directions: CSS does that
 * where scroll timelines exist, and this toggles [data-shown] both ways where they don't. [data-count] counts up to the number already in
 * the HTML. Content is readable without JS.
 *
 * Render this at the END of each page (not in the layout). React runs a component's effects only after
 * its own tree has hydrated, so the observer never touches server HTML React hasn't claimed yet
 * (a layout-level observer can win that race and cause hydration-mismatch warnings).
 * Each page mounts its own instance, so client-side navigation re-scans automatically.
 */
export function MotionObserver() {
  useEffect(() => {
    const stopObserving = observe();
    const stopMarquee = reactiveMarquee();
    return () => {
      stopObserving?.();
      stopMarquee();
    };
  }, []);
  return null;
}

/**
 * Scroll speed feeds the marquees: they rush and lean while the page moves, then ease back to cruising speed.
 * Drives the running CSS animations through their playbackRate, so no transforms are computed here.
 * Rate stays positive: a negative rate can run a young animation back past time 0 and end it.
 */
function reactiveMarquee(): () => void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  const animations = [...document.querySelectorAll<HTMLElement>(".marquee-track")].flatMap((el) => el.getAnimations());
  if (!animations.length) return () => {};

  let lastY = window.scrollY;
  let lastT = performance.now();
  let rate = 1;
  let skew = 0;
  let frame = 0;
  const marquee = document.querySelector<HTMLElement>(".marquee");

  const settle = () => {
    rate += (1 - rate) * 0.06;
    if (rate < 1.01) rate = 1;
    skew *= 0.9;
    if (Math.abs(skew) < 0.05) skew = 0;
    animations.forEach((a) => { a.playbackRate = rate; });
    marquee?.style.setProperty("--skew", `${skew.toFixed(2)}deg`);
    frame = rate === 1 && skew === 0 ? 0 : requestAnimationFrame(settle);
  };
  const onScroll = () => {
    const now = performance.now();
    const pxPerSecond = (window.scrollY - lastY) / Math.max(now - lastT, 1) * 1000;
    lastY = window.scrollY;
    lastT = now;
    rate = Math.max(rate, Math.min(1 + Math.abs(pxPerSecond) / 320, 6));
    skew = Math.max(-10, Math.min(10, pxPerSecond / -120));
    if (!frame) frame = requestAnimationFrame(settle);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => {
    window.removeEventListener("scroll", onScroll);
    cancelAnimationFrame(frame);
  };
}

/**
 * Observers for the current page. Returns their cleanup.
 * Stats count up each time they arrive from below. Reveals are only handled here in browsers without scroll
 * timelines: elsewhere CSS ties them to the scroll position, and toggling [data-shown] would start transitions
 * that override those animations (transitions outrank animations in the cascade).
 */
function observe(): (() => void) | undefined {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = document.querySelectorAll<HTMLElement>("[data-reveal], [data-words]");
  const counters = document.querySelectorAll<HTMLElement>("[data-count]");

  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.setAttribute("data-shown", ""));
    return;
  }

  // Each running or finished count-up, by element: calling it restores the real number and re-arms the stat.
  const counts = new Map<HTMLElement, () => void>();

  const countUp = (el: HTMLElement) => {
    const final = el.textContent; // real value rendered on the server
    // Hidden tabs throttle animation frames; never risk leaving a stat stuck at "0".
    if (document.hidden) {
      counts.set(el, () => {});
      return;
    }
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix ?? "";
    const duration = 1600;
    let start: number | null = null;
    let frame = 0;
    const finish = () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(safety);
      el.textContent = final;
    };
    const step = (t: number) => {
      start ??= t;
      const p = Math.min((t - start) / duration, 1);
      if (p === 1) return finish();
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(target * eased).toLocaleString("en-US") + suffix;
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    // Safety net: whatever happens to rAF, show the real number shortly after the animation should end.
    const safety = window.setTimeout(finish, duration + 400);
    counts.set(el, finish);
  };

  const onChange: IntersectionObserverCallback = (entries) => {
    for (const entry of entries) {
      const el = entry.target as HTMLElement;
      const isCounter = el.dataset.count !== undefined;
      if (entry.isIntersecting) {
        if (!isCounter) el.setAttribute("data-shown", "");
        else if (!counts.has(el)) countUp(el);
      } else if (entry.boundingClientRect.top > 0) {
        // Gone back below the fold (scrolling up). Leaving through the top keeps its state, like the footer.
        if (!isCounter) el.removeAttribute("data-shown");
        else {
          counts.get(el)?.();
          counts.delete(el);
        }
      }
    }
  };

  const io = new IntersectionObserver(onChange, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
  // [data-sequence] blocks play a multi-second sequence, so they wait until they are well on screen (top edge past 70% of the viewport).
  const sequences = new IntersectionObserver(onChange, { rootMargin: "0px 0px -30% 0px" });

  counters.forEach((el) => io.observe(el));
  if (!CSS.supports("animation-timeline", "view()")) {
    reveals.forEach((el) => (el.hasAttribute("data-sequence") ? sequences : io).observe(el));
  }
  return () => {
    io.disconnect();
    sequences.disconnect();
    counts.forEach((stop) => stop());
  };
}
