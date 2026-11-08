"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { Container } from "../ui/primitives";

type Labels = { pause: string; play: string };

// Video plays only when it's welcome: a screen wide enough to show it, motion allowed, and no Data Saver.
// Everyone else keeps the still poster photo (which is also what paints first for everyone).
const WIDE = "(min-width: 768px)";
const CALM = "(prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const queries = [window.matchMedia(WIDE), window.matchMedia(CALM)];
  queries.forEach((q) => q.addEventListener("change", onChange));
  return () => queries.forEach((q) => q.removeEventListener("change", onChange));
}
function videoWelcome() {
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
  return window.matchMedia(WIDE).matches && window.matchMedia(CALM).matches && !saveData;
}
const notOnServer = () => false;

/**
 * Home hero shell: looping background video over a poster photo, the hero copy (`children`), a pause button and the
 * stats bar (`footer`). The poster is server-rendered and is the LCP image; the <video> is mounted after hydration,
 * so it never delays first paint, and fades in once it is actually playing. It pauses when the hero is off screen
 * or the visitor presses Pause (WCAG 2.2.2). The video is built from the hero photos (see docs/design-system.md).
 */
export function HeroVideo({
  poster,
  posterAlt,
  focus,
  videoSrc,
  labels,
  children,
  footer,
}: {
  poster: StaticImageData;
  posterAlt: string;
  focus: string;
  videoSrc: string;
  labels: Labels;
  children: ReactNode;
  footer: ReactNode;
}) {
  const welcome = useSyncExternalStore(subscribe, videoWelcome, notOnServer);
  const [playing, setPlaying] = useState(false); // true once frames are actually moving: drives the fade-in
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView && !userPaused) v.play().catch(() => {}); // autoplay can be refused (e.g. low-power mode): poster stays
    else v.pause();
  }, [inView, userPaused, welcome]);

  return (
    <section ref={rootRef} className="relative isolate flex flex-col overflow-hidden bg-ink text-white lg:min-h-[clamp(680px,calc(100svh-96px),920px)]">
      <div className="absolute inset-0 z-0">
        <Image
          src={poster}
          alt={posterAlt}
          fill
          sizes="100vw"
          quality={70}
          placeholder="blur"
          loading="eager"
          fetchPriority="high"
          className="object-cover"
          style={{ objectPosition: focus }}
        />
        {welcome && (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            onPlaying={() => setPlaying(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${playing ? "opacity-100" : "opacity-0"}`}
            style={{ objectPosition: focus }}
          />
        )}
      </div>
      <div aria-hidden="true" className="hero-scrim absolute inset-0 z-[1]" />

      <Container className="relative z-[4] flex flex-1 items-center py-14 sm:py-20 lg:py-16">{children}</Container>

      {welcome && (
        <Container className="relative z-[4] pb-5 lg:pb-6">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              aria-pressed={userPaused}
              aria-label={userPaused ? labels.play : labels.pause}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-inset ring-white/30 backdrop-blur-sm transition-[background-color,scale] duration-150 hover:bg-white/20 active:scale-95"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                {userPaused ? (
                  <path d="M5 3.5v9l7-4.5-7-4.5Z" fill="currentColor" />
                ) : (
                  <path d="M5 3.5v9M11 3.5v9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </Container>
      )}

      {footer}
    </section>
  );
}
