"use client";

import { useEffect } from "react";

/**
 * The only page-level script. The hero status board is pure CSS, but on a phone it sits below the fold, so its
 * one-time sequence would finish before anyone saw it. This holds the board (`.js .board:not([data-play])` pauses
 * its animations in globals.css) until about a third of it is on screen, then lets it play. Without JS the board
 * simply plays on load. There are no scroll reveals, count-ups or parallax in this design.
 *
 * Render this at the END of each page (not in the layout), as CLAUDE.md requires: React runs a component's
 * effects only after its own tree has hydrated.
 */
export function MotionObserver() {
  useEffect(() => {
    const boards = document.querySelectorAll<HTMLElement>(".board");
    if (!boards.length) return;
    const play = (el: Element) => el.setAttribute("data-play", "");
    if (!("IntersectionObserver" in window)) {
      boards.forEach(play);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            play(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.35 },
    );
    boards.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);
  return null;
}
