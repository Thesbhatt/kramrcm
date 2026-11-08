"use client";

/**
 * Reserved hook for page-level motion. In this design the only motion is the hero status board, which is pure CSS
 * (see globals.css), so there is nothing to observe: no reveals, no count-ups, no marquee, no parallax.
 *
 * Still render this at the END of each page (not in the layout), as CLAUDE.md requires, so any future page-level
 * effect lands in one place and mounts only after the page it belongs to has hydrated.
 */
export function MotionObserver() {
  return null;
}
