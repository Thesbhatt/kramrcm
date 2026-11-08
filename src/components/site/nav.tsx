"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { company, cta, nav } from "@/content/site";

const isActive = (path: string, href: string) => (href === "/" ? path === "/" : path.startsWith(href));

/** Desktop links: plain text, an ink underline marks the current page. No mega-menus. */
export function DesktopNav() {
  const path = usePathname();
  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-8 font-display text-base tracking-[-0.01em]">
        {nav.map((item) => {
          const active = isActive(path, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap border-b border-transparent py-1.5 transition-colors duration-150 ${
                  active ? "border-ink text-fg" : "text-muted hover:text-fg"
                }`}
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
          {nav.map((item) => {
            const active = isActive(path, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  tabIndex={open ? undefined : -1}
                  className={`flex items-center justify-between border-b border-line px-2 py-3.5 font-display text-lg tracking-[-0.01em] ${active ? "text-fg" : "text-muted"}`}
                >
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
