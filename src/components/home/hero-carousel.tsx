"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FocusEvent, type ReactNode } from "react";
import { Arrow, Container } from "../ui/primitives";

export type HeroSlide = {
  id: string;
  tab: string;
  title: string;
  body: string;
  href: string;
  alt: string;
  focus: string;
  photo: StaticImageData;
};

type Labels = { group: string; pause: string; play: string };

/**
 * Full-bleed photo carousel behind the hero copy, with service tabs along the bottom.
 * The active tab's CSS progress animation is the only clock: its `animationend` advances the slide,
 * so pausing is just `animation-play-state`, and reduced motion (animation: none) never auto-advances.
 * The first slide and its caption are server-rendered, so the hero is complete without JS.
 */
export function HeroCarousel({ slides, labels, children }: { slides: HeroSlide[]; labels: Labels; children: ReactNode }) {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [inView, setInView] = useState(true);
  const controls = useRef<HTMLDivElement>(null);

  // The mouse is deliberately not a pause trigger: visitors play with the floating icons over this same area.
  const playing = !userPaused && !keyboardFocus && inView;

  useEffect(() => {
    const hero = controls.current?.closest("section");
    if (!hero || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  const go = (next: number) => {
    if (next === active) return;
    setPrevious(active);
    setActive(next);
  };

  const onFocus = (e: FocusEvent<HTMLDivElement>) => {
    if (e.target.matches(":focus-visible")) setKeyboardFocus(true);
  };

  const slide = slides[active];

  return (
    <>
      {/* Photo layer. data-hero-photo drifts with the cursor (hero-pointer.tsx); .parallax-img drifts on scroll. */}
      <div data-hero-photo="" className="absolute inset-0 z-0 will-change-transform">
        <div className="parallax-img absolute inset-0 [--drift:4%]">
          {slides.map((s, i) => (
            <div
              key={s.id}
              className="hero-slide absolute inset-0"
              data-active={i === active ? "" : undefined}
              data-leaving={i === previous ? "" : undefined}
              data-wipe={i === active && previous !== null ? "" : undefined}
            >
              <Image
                src={s.photo}
                alt={i === active ? s.alt : ""}
                fill
                sizes="100vw"
                quality={70}
                placeholder="blur"
                {...(i === 0 ? { loading: "eager" as const, fetchPriority: "high" as const } : { loading: "lazy" as const })}
                className="hero-slide-img object-cover"
                style={{ objectPosition: s.focus }}
              />
            </div>
          ))}
        </div>
      </div>
      <div aria-hidden="true" className="hero-scrim absolute inset-0 z-[1]" />

      {children}

      <div
        ref={controls}
        role="group"
        aria-roledescription="carousel"
        aria-label={labels.group}
        onFocus={onFocus}
        onBlur={() => setKeyboardFocus(false)}
        className="relative z-[4] border-t border-white/15"
      >
        <Container className="grid grid-cols-1 gap-3 py-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center lg:gap-12 lg:py-6">
          <div aria-live={playing ? "off" : "polite"}>
            <Link key={slide.id} href={slide.href} className="animate-rise group flex items-center justify-between gap-4 rounded-2xl">
              <span className="min-w-0">
                <span className="block font-medium leading-snug">{slide.title}</span>
                <span className="mt-0.5 block text-[0.95rem] leading-snug text-on-ink">{slide.body}</span>
              </span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange text-white transition-colors duration-150 group-hover:bg-white group-hover:text-fg">
                <Arrow />
              </span>
            </Link>
          </div>

          {/* Controls do nothing without JS, so they only appear with it */}
          <div className="hidden items-center gap-2 lg:gap-4 [.js_&]:flex">
            <div className="flex min-w-0 flex-1 gap-2 lg:gap-4">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-current={i === active ? "true" : undefined}
                  className="hero-tab group min-h-11 min-w-0 flex-1 cursor-pointer rounded-lg py-2 text-left"
                >
                  <span className="block h-[3px] overflow-hidden rounded-full bg-white/25 transition-colors duration-150 group-hover:bg-white/45">
                    <span
                      className="hero-progress-fill block h-full rounded-full bg-orange"
                      style={{ animationPlayState: playing ? "running" : "paused" }}
                      onAnimationEnd={() => go((active + 1) % slides.length)}
                    />
                  </span>
                  <span className={`mt-2 block truncate text-[0.92rem] font-medium transition-colors duration-150 max-lg:sr-only ${i === active ? "text-white" : "text-on-ink group-hover:text-white"}`}>
                    {s.tab}
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? labels.play : labels.pause}
              className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-white ring-1 ring-inset ring-white/30 transition-colors duration-150 hover:bg-white/10 motion-reduce:hidden"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                {userPaused ? <path d="M5 3.2v9.6L13 8 5 3.2Z" fill="currentColor" /> : <path d="M5 3.5v9M11 3.5v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}
              </svg>
            </button>
          </div>
        </Container>
      </div>
    </>
  );
}
