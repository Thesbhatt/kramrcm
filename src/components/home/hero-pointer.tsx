"use client";

import { useEffect, useRef, type ReactNode } from "react";

const REACH = 240; // px around the cursor in which a tile is pulled toward it
const PARALLAX_X = 46;
const PARALLAX_Y = 32;

type Tile = { el: HTMLElement; depth: number; cx: number; cy: number; x: number; y: number; r: number; s: number };

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/**
 * Makes the server-rendered [data-float] tiles react to the cursor: every tile drifts by its own depth,
 * and tiles near the cursor lean toward it, grow, and show their label ([data-near], styled in CSS).
 * Also moves the photo slightly the other way and carries a soft orange spotlight.
 *
 * One rAF loop that runs only while something is still moving, writing transforms directly: no React
 * re-renders. Off for touch devices and reduced motion, where tiles keep their CSS-only idle float.
 */
export function HeroPointerField({ className, children }: { className?: string; children: ReactNode }) {
  const field = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = field.current;
    const hero = root?.closest("section");
    if (!root || !hero) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tiles: Tile[] = [...root.querySelectorAll<HTMLElement>("[data-float]")].map((el) => ({
      el, depth: Number(el.dataset.float) || 0.5, cx: 0, cy: 0, x: 0, y: 0, r: 0, s: 1,
    }));
    const photo = hero.querySelector<HTMLElement>("[data-hero-photo]");
    const spot = root.querySelector<HTMLElement>("[data-spot]");
    const photoPos = { x: 0, y: 0 };
    const spotPos = { x: 0, y: 0 };

    let pointer: { x: number; y: number } | null = null;
    let raf = 0;
    let last = 0;
    let stale = true;

    // Centres are stored relative to the hero with the tile's current offset removed, so re-measuring mid-motion is safe.
    const measure = (rect: DOMRect) => {
      for (const t of tiles) {
        const b = t.el.getBoundingClientRect();
        t.cx = b.left + b.width / 2 - t.x - rect.left;
        t.cy = b.top + b.height / 2 - t.y - rect.top;
      }
      stale = false;
    };

    const frame = (now: number) => {
      raf = 0;
      const rect = hero.getBoundingClientRect();
      if (stale) measure(rect);
      const dt = last ? Math.min(now - last, 50) : 16.67;
      last = now;
      const ease = 1 - Math.pow(0.86, dt / 16.67); // same glide at 60 Hz and 120 Hz

      const px = pointer ? pointer.x - rect.left : 0;
      const py = pointer ? pointer.y - rect.top : 0;
      const nx = pointer ? (px / rect.width - 0.5) * 2 : 0;
      const ny = pointer ? (py / rect.height - 0.5) * 2 : 0;
      let moving = false;

      for (const t of tiles) {
        let tx = nx * t.depth * PARALLAX_X;
        let ty = ny * t.depth * PARALLAX_Y;
        let ts = 1;
        let tr = 0;
        let pull = 0;
        if (pointer) {
          const dx = px - (t.cx + tx);
          const dy = py - (t.cy + ty);
          const near = clamp(1 - Math.hypot(dx, dy) / REACH, 0, 1);
          pull = near * near * (3 - 2 * near);
          tx += dx * pull * 0.34;
          ty += dy * pull * 0.34;
          ts += pull * 0.3;
          tr = clamp(dx * 0.08, -10, 10) * pull;
        }
        t.x += (tx - t.x) * ease;
        t.y += (ty - t.y) * ease;
        t.s += (ts - t.s) * ease;
        t.r += (tr - t.r) * ease;
        if (Math.abs(tx - t.x) + Math.abs(ty - t.y) > 0.08 || Math.abs(ts - t.s) > 0.002 || Math.abs(tr - t.r) > 0.05) moving = true;
        t.el.style.transform = `translate3d(${t.x.toFixed(2)}px,${t.y.toFixed(2)}px,0) rotate(${t.r.toFixed(2)}deg) scale(${t.s.toFixed(3)})`;
        t.el.toggleAttribute("data-near", pull > 0.3);
      }

      if (photo) {
        const gx = nx * -14;
        const gy = ny * -10;
        photoPos.x += (gx - photoPos.x) * ease * 0.6;
        photoPos.y += (gy - photoPos.y) * ease * 0.6;
        if (Math.abs(gx - photoPos.x) + Math.abs(gy - photoPos.y) > 0.08) moving = true;
        photo.style.transform = `translate3d(${photoPos.x.toFixed(2)}px,${photoPos.y.toFixed(2)}px,0)`;
      }

      if (spot && pointer) {
        spotPos.x += (px - spotPos.x) * ease;
        spotPos.y += (py - spotPos.y) * ease;
        if (Math.abs(px - spotPos.x) + Math.abs(py - spotPos.y) > 0.3) moving = true;
        spot.style.transform = `translate3d(${spotPos.x.toFixed(1)}px,${spotPos.y.toFixed(1)}px,0) translate(-50%,-50%)`;
      }

      if (moving) raf = requestAnimationFrame(frame);
      else last = 0;
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      if (!pointer) {
        // Enter: start the spotlight under the cursor rather than gliding in from the corner.
        const rect = hero.getBoundingClientRect();
        spotPos.x = e.clientX - rect.left;
        spotPos.y = e.clientY - rect.top;
        root.setAttribute("data-pointer", "");
      }
      pointer = { x: e.clientX, y: e.clientY };
      wake();
    };
    const onLeave = () => {
      pointer = null;
      root.removeAttribute("data-pointer");
      wake();
    };

    const ro = new ResizeObserver(() => { stale = true; });
    ro.observe(hero);
    hero.addEventListener("pointermove", onMove, { passive: true });
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      ro.disconnect();
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={field} aria-hidden="true" className={className}>
      <div data-spot="" className="hero-spot" />
      {children}
    </div>
  );
}
