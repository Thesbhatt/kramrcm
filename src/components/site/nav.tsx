"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { company, cta, nav } from "@/content/site";

const isActive = (path: string, href: string) => (href === "/" ? path === "/" : path.startsWith(href));

/** Desktop links with an active-page dot. All routes are static, so usePathname resolves at build time. */
export function DesktopNav() {
  const path = usePathname();
  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-1 text-[0.95rem]">
        {nav.map((item) => {
          const active = isActive(path, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 transition-colors duration-150 ${
                  active ? "font-medium text-fg" : "text-muted hover:text-fg"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full bg-orange transition-opacity ${active ? "opacity-100" : "opacity-0"}`} aria-hidden="true" />
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
        className="flex h-11 w-11 items-center justify-center rounded-full bg-stone ring-1 ring-line transition-colors hover:bg-stone-2"
      >
        <span className="relative block h-3 w-[18px]" aria-hidden="true">
          <span className={`absolute inset-x-0 top-0 h-[1.6px] rounded bg-fg transition-transform duration-200 ${open ? "translate-y-[5px] rotate-45" : ""}`} />
          <span className={`absolute inset-x-0 bottom-0 h-[1.6px] rounded bg-fg transition-transform duration-200 ${open ? "-translate-y-[5.4px] -rotate-45" : ""}`} />
        </span>
      </button>

      <div
        id="mobile-menu"
        data-open={open}
        className="menu-panel absolute inset-x-3 top-[calc(100%+6px)] rounded-3xl bg-white p-3 shadow-[0_30px_60px_-24px_rgb(29_33_36/0.35)] ring-1 ring-line sm:left-auto sm:right-4 sm:w-[340px]"
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
                  className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-[1.05rem] ${active ? "bg-peach-2 font-medium" : "hover:bg-stone"}`}
                >
                  {item.label}
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden="true" />}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-2 flex flex-col gap-2 border-t border-line p-2 pt-4">
          <a href={company.phoneHref} tabIndex={open ? undefined : -1} className="px-2 py-1 font-medium tabular-nums">
            Call {company.phoneDisplay}
          </a>
          <Link href={cta.href} tabIndex={open ? undefined : -1} className="rounded-full bg-ink px-5 py-3 text-center font-medium text-white">
            {cta.primary}
          </Link>
        </div>
      </div>
    </div>
  );
}
