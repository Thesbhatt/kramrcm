"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

type Slide = { src: StaticImageData; alt: string; focus: string };
type Labels = { label: string; pause: string; play: string; slide: string; of: string };

/** Time each photo stays up before the next one fades in (client asked for quick changes). */
const INTERVAL_MS = 1500;

/**
 * Hero photo carousel: a crossfade between stacked photos. The incoming photo fades in (and settles from a slight
 * zoom) over the outgoing one, which stays fully opaque underneath until it is covered, so the frame never dips
 * to the background. Slide 1 is in the server HTML, so the hero is complete without JS.
 *
 * Autoplay stops for `prefers-reduced-motion`, while the tab is hidden, while the hero is off screen, and when the
 * visitor presses Pause (WCAG 2.2.2: moving content that lasts more than 5 s needs a way to stop it).
 */
export function HeroCarousel({ slides, labels, onSlide }: { slides: Slide[]; labels: Labels; onSlide?: (index: number) => void }) {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [canMove, setCanMove] = useState(false); // false until we know motion is allowed (and always without JS)
  const [inView, setInView] = useState(true);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setCanMove(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => { onSlide?.(active); }, [active, onSlide]);

  const playing = canMove && !paused && inView;
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setActive((a) => {
        setPrev(a);
        return (a + 1) % slides.length;
      });
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [playing, slides.length]);

  return (
    <div
      ref={root}
      role="group"
      aria-roledescription="carousel"
      aria-label={labels.label}
      className="absolute inset-0"
    >
      <div className="hero-parallax absolute inset-x-0 -inset-y-[6%]" aria-live={playing ? "off" : "polite"}>
        {slides.map((s, i) => {
          const state = i === active ? "active" : i === prev ? "prev" : "idle";
          return (
            <div
              key={s.src.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${labels.slide} ${i + 1} ${labels.of} ${slides.length}`}
              aria-hidden={i === active ? undefined : true}
              data-state={state}
              className="hero-slide absolute inset-0"
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={i === 0}
                quality={70}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
                style={{ objectPosition: s.focus }}
              />
            </div>
          );
        })}
      </div>

      {/* Position dots (decorative) and the Pause/Play control, only when the slideshow can actually move */}
      {canMove && (
        <div className="absolute inset-x-4 bottom-4 z-30 flex items-center justify-between gap-3">
          <div className="flex gap-1.5 rounded-full bg-white/85 px-3 py-2" aria-hidden="true">
            {slides.map((s, i) => (
              <span key={s.src.src} className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-5 bg-ink" : "w-1.5 bg-ink/30"}`} />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? labels.play : labels.pause}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink transition-colors hover:bg-white"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true" fill="currentColor">
              {paused ? <path d="M4.5 2.8v10.4L13 8z" /> : <path d="M4 2.5h2.8v11H4zm5.2 0H12v11H9.2z" />}
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
