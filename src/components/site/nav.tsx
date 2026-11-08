"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type SyntheticEvent, useEffect, useRef, useState } from "react";
import { company, cta, nav } from "@/content/site";

const isActive = (path: string, href: string) => (href === "/" ? path === "/" : path.startsWith(href));

/** Moves the highlight onto a list item (or hides it). Written straight to the DOM so hovering never re-renders the nav. */
function place(glider: HTMLElement | null, item: HTMLElement | null) {
  if (!glider) return;
  if (!item) {
    glider.style.opacity = "0";
    return;
  }
  // offsetLeft/offsetWidth are layout values, so the links' entrance transforms can't skew them
  glider.style.opacity = "1";
  glider.style.width = `${item.offsetWidth}px`;
  glider.style.transform = `translateX(${item.offsetLeft}px)`;
}

const current = (list: HTMLElement | null) => list?.querySelector<HTMLElement>('li:has([aria-current="page"])') ?? null;

/**
 * Desktop links. One tint pill with an orange base bar rests behind the current page and glides to whichever link
 * is hovered or focused, then returns. The current page is also marked with aria-current and full-ink text.
 * No mega-menus.
 */
export function DesktopNav() {
  const path = usePathname();
  const listRef = useRef<HTMLUListElement>(null);
  const gliderRef = useRef<HTMLSpanElement>(null);

  // ResizeObserver reports once on observe, then again if fonts or the viewport change the link widths
  useEffect(() => {
    const list = listRef.current;
    const glider = gliderRef.current;
    if (!list || !glider) return;
    const observer = new ResizeObserver(() => {
      place(glider, current(list));
      // Transitions switch on a frame later, so the pill fades in where it belongs instead of sliding in from the left
      requestAnimationFrame(() => glider.setAttribute("data-ready", ""));
    });
    observer.observe(list);
    return () => observer.disconnect();
  }, [path]);

  const toTarget = (e: SyntheticEvent<HTMLUListElement>) => {
    const item = (e.target as Element).closest("li");
    if (item) place(gliderRef.current, item);
  };
  const home = () => place(gliderRef.current, current(listRef.current));

  return (
    <nav aria-label="Main" className="relative hidden lg:block">
      <span ref={gliderRef} className="nav-glider" aria-hidden="true" />
      <ul
        ref={listRef}
        onPointerOver={toTarget}
        onPointerLeave={home}
        onFocus={toTarget}
        onBlur={home}
        className="relative flex items-center gap-1 font-display text-base tracking-[-0.01em]"
      >
        {nav.map((item, i) => {
          const active = isActive(path, item.href);
          return (
            <li key={item.href} className="nav-item-in" style={{ ["--i" as string]: i }}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`block whitespace-nowrap px-4 py-2.5 transition-colors duration-150 ${active ? "text-fg" : "text-muted hover:text-fg focus-visible:text-fg"}`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Mobile/tablet menu: closes on route change, Escape, or outside click. */
export function MobileMenu() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close whenever the route changes (adjusting state during render, not in an effect).
  const [lastPath, setLastPath] = useState(path);
  if (path !== lastPath) {
    setLastPath(path);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div ref={ref} className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 w-11 items-center justify-center rounded-[4px] ring-1 ring-inset ring-line transition-colors hover:bg-tint"
      >
        <span className="relative block h-3 w-[18px]" aria-hidden="true">
          <span className={`absolute inset-x-0 top-0 h-[1.6px] rounded bg-fg transition-transform duration-200 ${open ? "translate-y-[5px] rotate-45" : ""}`} />
          <span className={`absolute inset-x-0 bottom-0 h-[1.6px] rounded bg-fg transition-transform duration-200 ${open ? "-translate-y-[5.4px] -rotate-45" : ""}`} />
        </span>
      </button>

      <div
        id="mobile-menu"
        data-open={open}
        className="menu-panel absolute inset-x-0 top-full border-b border-line bg-white px-5 pb-5 pt-2 sm:left-auto sm:right-8 sm:w-[340px] sm:border sm:px-3 sm:pb-3"
      >
        <ul className="flex flex-col">
          {nav.map((item, i) => {
            const active = isActive(path, item.href);
            return (
              <li key={item.href} style={{ ["--i" as string]: i }}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  tabIndex={open ? undefined : -1}
                  className={`relative flex items-center justify-between border-b border-line px-3 py-3.5 font-display text-lg tracking-[-0.01em] transition-colors duration-150 ${active ? "bg-tint text-fg" : "text-muted hover:bg-tint/60 hover:text-fg"}`}
                >
                  {active && <span className="absolute inset-y-0 left-0 w-[3px] bg-orange" aria-hidden="true" />}
                  {item.label}
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden="true" />}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-3 flex flex-col gap-3">
          <a href={company.phoneHref} tabIndex={open ? undefined : -1} className="px-2 py-1 text-base font-medium tabular-nums">
            Call {company.phoneDisplay}
          </a>
          <Link href={cta.href} tabIndex={open ? undefined : -1} className="rounded-[4px] bg-ink px-[22px] py-[13px] text-center text-[0.6875rem] font-semibold uppercase tracking-[0.04em] text-white">
            {cta.primary}
          </Link>
        </div>
      </div>
    </div>
  );
}
