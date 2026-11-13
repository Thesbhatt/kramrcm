import Link from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

/** Small sentence-case label above a heading. Use sparingly: only where it names something the heading doesn't. */
export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return <span className={`self-start text-sm ${tone === "dark" ? "text-on-ink" : "text-muted"}`}>{children}</span>;
}

type Variant = "dark" | "soft" | "white" | "ghost-dark" | "light";
type ButtonProps = Omit<ComponentProps<"a">, "href"> & { href: string; variant?: Variant; size?: "md" | "lg" | "icon" };

// Buttons: 4px radius, small uppercase label. `dark` and `soft` are both the PRIMARY button, filled logo orange with
// white text (two names kept so older call sites still work); `white` is the 1px gray outline for light surfaces;
// `ghost-dark` is the white outline for gray or orange surfaces; `light` is a white fill with an orange label for orange bands.
const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] text-xs font-semibold uppercase tracking-[0.04em] transition-[color,background-color,transform] duration-150 ease-[var(--ease-out-soft)] active:scale-[0.97] motion-reduce:active:scale-100";

const sizes = { md: "min-h-11 px-[22px] py-[13px]", lg: "min-h-11 px-[22px] py-[13px]", icon: "h-11 w-11" };

const variants: Record<Variant, string> = {
  // Small uppercase labels need 4.5:1, so the primary fill is orange-ink (5.2:1 with white); logo orange stays on bands and marks.
  dark: "bg-orange-ink text-white hover:bg-graphite",
  soft: "bg-orange-ink text-white hover:bg-graphite",
  white: "bg-transparent text-ink ring-1 ring-inset ring-ink hover:bg-orange-ink hover:text-white hover:ring-orange-ink",
  "ghost-dark": "text-white ring-1 ring-inset ring-white/70 hover:bg-white hover:text-ink",
  light: "bg-white text-orange-ink hover:bg-ink hover:text-white",
};

/** Internal hrefs ("/…") use next/link for client navigation + prefetch; others are plain anchors. */
export function ButtonLink({ variant = "dark", size = "md", className = "", href, children, ...rest }: ButtonProps) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  if (href.startsWith("/")) {
    return <Link href={href} className={cls} {...rest}>{children}</Link>;
  }
  return <a href={href} className={cls} {...rest}>{children}</a>;
}

export function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`${className} transition-transform duration-150 group-hover:translate-x-0.5`} aria-hidden="true">
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Check({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      {/* pathLength={1} lets `.tick` draw the stroke in with a plain dash offset */}
      <path pathLength={1} d="M3.5 8.5 6.5 11.5 12.5 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Marks a block for scroll reveal: it rises and fades in once, the first time it is on screen. Visible by default;
 * hidden only after JS has loaded (`.js` class), and shown again by MotionObserver. `delayMs` staggers siblings.
 */
export function reveal(delayMs = 0): { "data-reveal": string; style?: CSSProperties } {
  return delayMs ? { "data-reveal": "", style: { ["--d" as string]: `${delayMs}ms` } } : { "data-reveal": "" };
}

/** Props for a list or grid whose direct children rise in one after another when it arrives. */
export const stagger = { "data-stagger": "" } as const;

/**
 * Splits plain text into words that rise from behind their own mask (hero headline). Words stay real text separated
 * by real spaces. The CSS animation ends visible, so the headline reads fine without JS. `from` continues the index.
 */
export function Words({ text, from = 0, mark }: { text: string; from?: number; mark?: string }) {
  const words = text.split(" ").filter(Boolean);
  return (
    <>
      {words.map((w, i) => {
        // A word that matches `mark` once trailing punctuation is stripped gets the marker; the punctuation stays outside it.
        const core = w.replace(/[.,!?;:]+$/, "");
        const hit = !!mark && (w === mark || core === mark);
        const tail = hit ? w.slice(core.length) : "";
        return (
        <span key={`${w}-${i}`}>
          <span className="w-mask">
            {hit && tail ? (
              <span className="w" style={{ ["--i" as string]: from + i }}><span className="hl">{core}</span>{tail}</span>
            ) : (
              <span className={hit ? "w hl" : "w"} style={{ ["--i" as string]: from + i }}>{w}</span>
            )}
          </span>
          {i < words.length - 1 && " "}
        </span>
        );
      })}
    </>
  );
}

/** Headline pieces with the key word on an orange marker (`.hl`: white text on the logo orange). */
export function Highlight({ start, word, end }: { start?: string; word: string; end?: string }) {
  return (
    <>
      {start && <>{start} </>}
      <span className="hl">{word}</span>
      {end && <> {end}</>}
    </>
  );
}

export function SectionHeading({
  eyebrow, title, body, tone = "light", align = "left", as: H = "h2",
}: {
  eyebrow?: string; title: ReactNode; body?: ReactNode; tone?: "light" | "dark" | "orange"; align?: "left" | "center"; as?: "h1" | "h2";
}) {
  const dark = tone === "dark" || tone === "orange";
  const a = align === "center" ? "mx-auto items-center text-center" : "";
  return (
    <div className={`flex max-w-[46rem] flex-col gap-4 ${a}`} {...reveal()}>
      {eyebrow && <Eyebrow tone={dark ? "dark" : "light"}>{eyebrow}</Eyebrow>}
      <H className={dark ? "text-white" : "text-fg"}>{title}</H>
      {body && <p className={`max-w-[58ch] ${dark ? "text-on-ink" : "text-muted"}`}>{body}</p>}
    </div>
  );
}

/** Line icons (24px grid, 1.6 stroke) for services, contact and features. */
const icons = {
  shield: "M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Zm-3.2 9.2 2.2 2.2 4.4-4.6",
  receipt: "M6 3h12v18l-3-2-3 2-3-2-3 2V3Zm3.5 5h5m-5 4h5m-5 4h3",
  pin: "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 1 1 13 0c0 5.4-6.5 11-6.5 11Zm0-8.2a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6Z",
  map: "M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6 9 4Zm0 0v14m6-12v14",
  phone: "M5 4h3.5l1.7 4.3-2.2 1.4a11 11 0 0 0 6.3 6.3l1.4-2.2L20 15.5V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z",
  mail: "M3.5 6h17v12h-17V6Zm0 0 8.5 7 8.5-7",
  clock: "M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm0 4V12l3 2",
  chart: "M4 19.5h16M7 16v-4m5 4V8m5 8v-6",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8.5c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5",
  file: "M7 3h7l4 4v14H7V3Zm7 0v4h4M10 12h5m-5 4h5",
  globe: "M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm-8.5 8.5h17M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5s1.1-6.1 3.4-8.5Z",
  stethoscope: "M6 3.5v5a4 4 0 0 0 8 0v-5M10 12.5v2a5 5 0 0 0 10 0v-1.5m0 0a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z",
  pulse: "M3 12h4l2.5-6 4 12 2.5-6H21",
  chat: "M4 5h16v11H9.5L4 20.5V5Zm4 4.5h8m-8 3h5",
  home: "M4 11 12 4l8 7v9H4v-9Zm6 9v-5h4v5",
  box: "M12 3 4 7v10l8 4 8-4V7l-8-4Zm0 9L4 7m8 5 8-5m-8 5v9",
  pill: "M9.6 20.4a4.6 4.6 0 0 1-3.2-7.9l6.1-6.1a4.6 4.6 0 0 1 6.5 6.5l-6.1 6.1a4.6 4.6 0 0 1-3.3 1.4ZM9 9l6 6",
  cross: "M9 4h6v5h5v6h-5v5H9v-5H4V9h5V4Z",
  heart: "M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20Z",
  heartPulse: "M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20ZM7 12.2h2.6l1.3-2.5 2.1 4.6 1.3-2.1H17",
  brain: "M12 6.5A2.5 2.5 0 0 0 9.5 4 2.5 2.5 0 0 0 7 6.6a3 3 0 0 0-2 2.9c0 .9.4 1.7 1 2.2a3 3 0 0 0 .6 4.8A3 3 0 0 0 12 18V6.5Zm0 0A2.5 2.5 0 0 1 14.5 4 2.5 2.5 0 0 1 17 6.6a3 3 0 0 1 2 2.9c0 .9-.4 1.7-1 2.2a3 3 0 0 1-.6 4.8A3 3 0 0 1 12 18M6 11.7c1.5.4 2.8-.2 3.5-1.5m8.5 1.5c-1.5.4-2.8-.2-3.5-1.5",
  bone: "M17 10c.7-.7 1.7 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .8.7 1.8 0 2.5l-7 7c-.7.7-1.7 0-2.5 0a2.5 2.5 0 0 0 0 5c.3 0 .5.2.5.5a2.5 2.5 0 1 0 5 0c0-.8-.7-1.8 0-2.5l7-7Z",
  video: "M3.5 7h11.5v10H3.5V7Zm11.5 3.8 5.5-3.3v9l-5.5-3.3",
  eye: "M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Zm9.5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  target: "M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm0 4.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 3.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Z",
  briefcase: "M4 8h16v11.5H4V8Zm5 0V5h6v3M4 13.5h16",
  calculator: "M6 3h12v18H6V3Zm3 3.5h6v3H9v-3ZM9.5 13.5h.01m2.49 0h.01m2.49 0h.01m-5.01 3.5h.01m2.49 0h.01m2.49 0h.01",
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {/* pathLength={1} lets the header nav redraw the stroke on hover with a plain dash offset */}
      <path pathLength={1} d={icons[name]} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
