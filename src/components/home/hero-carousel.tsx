"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";
import { Container } from "../ui/primitives";

export type HeroSlide = { id: string; src: StaticImageData; alt: string; focus: string; flip?: boolean };

type Labels = { label: string; controls: string; slide: string; prev: string; next: string; pause: string; play: string; goTo: string };

/** How long each photo stays before the next wipe (ms). The progress bar's CSS animation is the clock. */
const INTERVAL_MS = 6500;

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
const reducedNow = () => window.matchMedia(REDUCED).matches;
const reducedOnServer = () => false;

type View = { index: number; leaving: number | null; dir: "fwd" | "back"; moved: boolean };

/**
 * Home hero shell: background photo carousel + the hero copy (`children`) + controls + stats bar (`footer`).
 *
 * - Slide 0 is in the server HTML and visible with no JS; nothing moves until the first change (`data-moved`).
 * - Each change wipes the new photo in over the old one while the image settles from a zoom (CSS, globals.css).
 * - The progress bar's CSS animation is the autoplay clock (`animationend` -> next), so pausing it pauses the timer.
 * - Autoplay stops for: the Pause button, pointer or keyboard focus on the controls, the hero off screen,
 *   and `prefers-reduced-motion` (then the slides only change when the visitor presses a control).
 * Copy for the controls lives in `hero.carousel` in site.ts.
 */
export function HeroCarousel({ slides, labels, children, footer }: { slides: HeroSlide[]; labels: Labels; children: ReactNode; footer: ReactNode }) {
  const [view, setView] = useState<View>({ index: 0, leaving: null, dir: "fwd", moved: false });
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(true);
  // Slides 2+ stay out of the DOM until the page has loaded and the browser is idle, so they never compete with
  // the first photo (the LCP image) for bandwidth. Pressing a control before then loads them straight away.
  const [ready, setReady] = useState(false);
  const reduced = useSyncExternalStore(subscribeReduced, reducedNow, reducedOnServer);
  const rootRef = useRef<HTMLElement>(null);
  const count = slides.length;

  useEffect(() => {
    let idle = 0;
    let timer = 0;
    const whenIdle = () => {
      if (typeof window.requestIdleCallback === "function") idle = window.requestIdleCallback(() => setReady(true), { timeout: 2500 });
      else timer = window.setTimeout(() => setReady(true), 800);
    };
    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle, { once: true });
    return () => {
      window.removeEventListener("load", whenIdle);
      if (idle) window.cancelIdleCallback(idle);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const step = (delta: number) => {
    setReady(true);
    setView((v) => ({ index: (v.index + delta + count) % count, leaving: v.index, dir: delta > 0 ? "fwd" : "back", moved: true }));
  };
  const jump = (to: number) => {
    setReady(true);
    setView((v) => (to === v.index ? v : { index: to, leaving: v.index, dir: to > v.index ? "fwd" : "back", moved: true }));
  };

  const playing = !userPaused && !reduced;
  // The clock only starts once the other photos are in the DOM (otherwise the first wipe could reveal nothing)
  const running = playing && ready && !hovered && !focused && inView;

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
  };

  const iconBtn =
    "flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-inset ring-white/30 backdrop-blur-sm transition-[background-color,scale] duration-150 hover:bg-white/20 active:scale-95";

  return (
    <section
      ref={rootRef}
      data-moved={view.moved}
      data-dir={view.dir}
      className="hero-carousel scroll-frame relative isolate flex flex-col overflow-hidden bg-ink text-white lg:min-h-[clamp(680px,calc(100svh-96px),920px)]"
    >
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label={labels.label}
        aria-live={playing ? "off" : "polite"}
        className="absolute inset-0 z-0"
      >
        <div className="parallax-img absolute inset-0 [--drift:4%]">
          {slides.map((s, i) => {
            if (i > 0 && !ready) return null;
            const state = i === view.index ? "active" : i === view.leaving ? "leaving" : "rest";
            return (
              <div
                key={s.id}
                className="hero-slide"
                data-state={state}
                role="group"
                aria-roledescription="slide"
                aria-label={`${labels.slide} ${i + 1} / ${count}`}
                aria-hidden={state !== "active"}
              >
                <div className="hero-slide-img absolute inset-0" style={{ transformOrigin: s.focus }}>
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="100vw"
                    quality={70}
                    placeholder="blur"
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "auto"}
                    className={`object-cover ${s.flip ? "[transform:scaleX(-1)]" : ""}`}
                    style={{ objectPosition: s.flip ? `${100 - parseFloat(s.focus)}% ${s.focus.split(" ")[1]}` : s.focus }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div aria-hidden="true" className="hero-scrim absolute inset-0 z-[1]" />

      <Container className="relative z-[4] flex flex-1 items-center py-14 sm:py-20 lg:py-16">{children}</Container>

      <Container className="relative z-[4] pb-5 lg:pb-6">
        <div
          role="group"
          aria-label={labels.controls}
          onKeyDown={onKeyDown}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={(e) => setFocused(e.target.matches(":focus-visible"))}
          onBlur={() => setFocused(false)}
          className="hidden items-center gap-2 [.js_&]:flex lg:justify-end lg:gap-3"
        >
          <button type="button" onClick={() => step(-1)} aria-label={labels.prev} className={iconBtn}>
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
              <path d="M13 8H4M7.5 4.5 4 8l3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex items-center">
            {slides.map((s, i) => {
              const active = i === view.index;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => jump(i)}
                  aria-label={`${labels.goTo} ${i + 1} / ${count}`}
                  aria-current={active ? "true" : undefined}
                  className="group/seg flex h-11 w-8 cursor-pointer items-center sm:w-11"
                >
                  <span className={`relative block h-[3px] w-full overflow-hidden rounded-full transition-colors duration-150 ${active ? "bg-white/30" : "bg-white/30 group-hover/seg:bg-white/60"}`}>
                    {active && !playing && <span className="absolute inset-0 bg-white" />}
                    {active && playing && (
                      <span
                        className="hero-progress-fill bg-orange"
                        style={{ animationDuration: `${INTERVAL_MS}ms`, animationPlayState: running ? "running" : "paused" }}
                        onAnimationEnd={(e) => { if (e.animationName === "hero-progress") step(1); }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <button type="button" onClick={() => step(1)} aria-label={labels.next} className={iconBtn}>
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
              <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {!reduced && (
            <button type="button" onClick={() => setUserPaused((p) => !p)} aria-pressed={userPaused} aria-label={userPaused ? labels.play : labels.pause} className={iconBtn}>
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                {userPaused ? (
                  <path d="M5 3.5v9l7-4.5-7-4.5Z" fill="currentColor" />
                ) : (
                  <path d="M5 3.5v9M11 3.5v9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          )}

          <span className="ml-1 hidden min-w-[4.5ch] text-[0.85rem] tabular-nums text-white/80 sm:inline" aria-hidden="true">
            {String(view.index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        </div>
      </Container>

      {footer}
    </section>
  );
}
