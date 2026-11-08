import Link from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

/** Small rounded label above headings: "● Services" */
export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  const c = tone === "dark" ? "bg-white/8 text-on-ink ring-white/15" : "bg-white text-graphite ring-line";
  return (
    <span className={`inline-flex items-center gap-2 self-start rounded-full px-3.5 py-1.5 text-[0.82rem] font-medium ring-1 ${c}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden="true" />
      {children}
    </span>
  );
}

type Variant = "dark" | "soft" | "white" | "ghost-dark";
type ButtonProps = Omit<ComponentProps<"a">, "href"> & { href: string; variant?: Variant; size?: "md" | "lg" };

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[transform,box-shadow,background-color,color] duration-200 ease-[var(--ease-out-soft)] active:translate-y-0";

const sizes = { md: "px-5 py-2.5 text-[0.95rem]", lg: "px-6 py-3.5 text-base" };

const variants: Record<Variant, string> = {
  dark: "bg-ink text-white hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-12px_rgb(29_33_36/0.7)]",
  soft: "bg-peach text-fg hover:bg-[#fcd9bd]",
  white: "bg-white text-fg ring-1 ring-line hover:ring-graphite/40",
  "ghost-dark": "text-white ring-1 ring-inset ring-white/25 hover:bg-white/8 hover:ring-white/60",
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
    <svg viewBox="0 0 16 16" className={`${className} transition-transform duration-200 group-hover:translate-x-0.5`} aria-hidden="true">
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Check({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <path d="M3.5 8.5 6.5 11.5 12.5 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Marks an element for scroll reveal. Visible by default; hidden only once JS has loaded. */
export function reveal(delayMs = 0): { "data-reveal": true; style?: CSSProperties } {
  return delayMs
    ? { "data-reveal": true, style: { ["--reveal-delay" as string]: `${delayMs}ms` } }
    : { "data-reveal": true };
}

/**
 * Splits plain text into per-word spans so CSS can stagger them in (Enima-style headline reveal).
 * Words are inline-block spans separated by real spaces, so copy, selection and screen readers
 * behave as normal text. `from` continues the stagger index across several calls in one headline.
 */
export function Words({ text, from = 0 }: { text: string; from?: number }) {
  const words = text.split(" ").filter(Boolean);
  return (
    <>
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          <span className="w" style={{ ["--i" as string]: from + i }}>{w}</span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </>
  );
}

const wordCount = (t?: string) => (t ? t.split(" ").filter(Boolean).length : 0);

/** Headline with one highlighted keyword, the signature type treatment of the site. Words stagger in. */
export function Highlight({ start, word, end }: { start?: string; word: string; end?: string }) {
  const a = wordCount(start);
  const b = wordCount(word);
  return (
    <>
      {start && <><Words text={start} /> </>}
      {/* --i lets the peach marker sweep in right after its own word lands (see .hl in globals.css) */}
      <span className="hl" style={{ ["--i" as string]: a + b }}><Words text={word} from={a} /></span>
      {end && <> <Words text={end} from={a + b} /></>}
    </>
  );
}

export function SectionHeading({
  eyebrow, title, body, tone = "light", align = "left", as: H = "h2",
}: {
  eyebrow?: string; title: ReactNode; body?: ReactNode; tone?: "light" | "dark"; align?: "left" | "center"; as?: "h1" | "h2";
}) {
  const titleColor = tone === "dark" ? "text-white" : "text-fg";
  const bodyColor = tone === "dark" ? "text-on-ink" : "text-muted";
  const a = align === "center" ? "mx-auto items-center text-center" : "";
  return (
    <div className={`flex max-w-[46rem] flex-col gap-5 ${a}`}>
      {eyebrow && <div {...reveal()}><Eyebrow tone={tone}>{eyebrow}</Eyebrow></div>}
      <H data-words="" className={`text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.06] ${titleColor} ${align === "center" ? "self-center" : ""}`}>
        {typeof title === "string" ? <Words text={title} /> : title}
      </H>
      {body && <p className={`max-w-[58ch] text-lg ${bodyColor}`} {...reveal(260)}>{body}</p>}
    </div>
  );
}

/** Line icons (24px grid, 1.6 stroke) for services, contact and features. */
const icons = {
  shield: "M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Zm-3.2 9.2 2.2 2.2 4.4-4.6",
  receipt: "M6 3h12v18l-3-2-3 2-3-2-3 2V3Zm3.5 5h5m-5 4h5m-5 4h3",
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
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d={icons[name]} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
