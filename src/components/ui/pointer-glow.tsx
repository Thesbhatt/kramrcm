"use client";

import { useEffect } from "react";

/**
 * Makes the gradient bands follow the mouse. On pointer move it finds the `.hero-diag`, `.band-glow`, `.band-glow-ink`, `.spot` or footer `.f-mark`
 * section under the cursor and writes the cursor's position inside it to `--mx` / `--my` (and fades `--ga` in); CSS paints
 * a soft radial light there (globals.css). Fine pointers only (no touch), off under `prefers-reduced-motion`. Decorative:
 * with no JS the bands keep their static gradients. Rendered once in the layout because the footer bands live there.
 */
const SELECTOR = ".hero-diag, .band-glow, .band-glow-ink, .spot, .f-mark";

export function PointerGlow() {
  useEffect(() => {
    const ok = window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;

    let active: HTMLElement | null = null;
    let frame = 0;
    let x = 0;
    let y = 0;
    let target: HTMLElement | null = null;

    const paint = () => {
      frame = 0;
      const next = target;
      if (active && active !== next) {
        active.style.setProperty("--ga", "0");
        active.style.setProperty("--px", "0");
        active.style.setProperty("--py", "0");
      }
      active = next;
      if (!next) return;
      const r = next.getBoundingClientRect();
      next.style.setProperty("--mx", `${x - r.left}px`);
      next.style.setProperty("--my", `${y - r.top}px`);
      next.style.setProperty("--ga", "1");
      // -1..1 from the element's centre: depth effects (hero orbs, photo tilt) read these
      next.style.setProperty("--px", String(Math.max(-1, Math.min(1, ((x - r.left) / r.width) * 2 - 1))));
      next.style.setProperty("--py", String(Math.max(-1, Math.min(1, ((y - r.top) / r.height) * 2 - 1))));
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      target = (e.target as Element | null)?.closest<HTMLElement>(SELECTOR) ?? null;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      target = null;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
