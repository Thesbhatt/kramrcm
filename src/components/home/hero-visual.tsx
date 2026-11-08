"use client";

import type { StaticImageData } from "next/image";
import { useState } from "react";
import { HeroCarousel } from "./hero-carousel";

type Slide = { src: StaticImageData; alt: string; focus: string };
type Labels = { label: string; pause: string; play: string; slide: string; of: string };
type ChipData = { label: string; from: string; to: string };

/**
 * One floating status chip (ported from the main-branch hero, restyled light so nothing dark sits on the page's orange/white).
 * It mounts "in progress" (orange ring) and flips to "done" (orange disc with a check) about half a second later; the chip
 * re-keys its inner content on every slide so the flip replays. Pure CSS (`.chip-*` in globals.css); reduced motion shows the done state.
 * Decorative: the same states are described in the page copy, so it is hidden from assistive tech.
 */
function Chip({ chip, slide, className }: { chip: ChipData; slide: number; className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`chip absolute z-20 rounded-full bg-white py-2.5 pl-2.5 pr-6 shadow-[0_18px_40px_-18px_rgb(64_64_69/0.55)] ring-1 ring-line ${className}`}
    >
      {/* Keyed by slide: the chip itself stays put, only its in-progress → done flip replays */}
      <div key={slide} className="flex items-center gap-3">
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center">
        <span className="chip-a absolute inset-0 flex items-center justify-center rounded-full ring-[3px] ring-inset ring-orange/70">
          <span className="h-2.5 w-2.5 rounded-full bg-orange" />
        </span>
        <span className="chip-b absolute inset-0 flex items-center justify-center rounded-full bg-orange text-white">
          <svg viewBox="0 0 16 16" className="h-5 w-5"><path d="M3.5 8.5 6.5 11.5 12.5 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-xs text-muted">{chip.label}</span>
        <span className="grid font-display text-[1.05rem] text-fg">
          <span className="chip-a col-start-1 row-start-1 whitespace-nowrap">{chip.from}</span>
          <span className="chip-b col-start-1 row-start-1 whitespace-nowrap">{chip.to}</span>
        </span>
      </span>
      </div>
    </div>
  );
}

/** The hero photo frame with its carousel, plus two status chips that overlap the frame's edges and change with the slide. */
export function HeroVisual({ slides, labels, chips }: { slides: Slide[]; labels: Labels; chips: ChipData[] }) {
  const [active, setActive] = useState(0);
  const n = chips.length;
  return (
    <div className="relative">
      <div className="hero-photo relative aspect-[4/3] overflow-clip rounded-[28px] bg-tint sm:aspect-[16/10] lg:aspect-[1/1.04]">
        <HeroCarousel slides={slides} labels={labels} onSlide={setActive} />
      </div>
      <Chip slide={active} chip={chips[active % n]} className="bottom-20 left-3 sm:-left-6" />
      <Chip slide={active} chip={chips[(active + 2) % n]} className="right-3 top-6 sm:-right-4 sm:top-8" />
    </div>
  );
}
