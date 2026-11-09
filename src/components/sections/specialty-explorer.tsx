"use client";

import { useMemo, useState } from "react";
import { Icon, type IconName } from "../ui/primitives";

type Group = { name: string; icon: IconName; items: string[] };
type Copy = { search: string; placeholder: string; all: string; showing: string; of: string; empty: string; emptyHelp: string };

/** Search + category filter over every specialty. All tiles are in the server HTML; the filter only hides tiles. */
export function SpecialtyExplorer({ groups, copy, ctaHref, ctaLabel }: { groups: Group[]; copy: Copy; ctaHref: string; ctaLabel: string }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");

  const all = useMemo(() => groups.flatMap((g) => g.items.map((name) => ({ name, group: g.name, icon: g.icon }))), [groups]);
  const needle = q.trim().toLowerCase();
  const shown = all.filter((s) => (cat === "all" || s.group === cat) && (!needle || s.name.toLowerCase().includes(needle)));

  const chip = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 ${active ? "bg-orange text-white" : "bg-white text-fg ring-1 ring-inset ring-line hover:ring-orange"}`;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-5 rounded-2xl bg-tint p-5 sm:p-6">
        <div>
          <label htmlFor="specialty-search" className="mb-2 block text-sm font-medium">{copy.search}</label>
          <div className="relative">
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true">
              <path d="m20 20-4.2-4.2M10.5 17a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              id="specialty-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={copy.placeholder}
              className="w-full rounded-lg border border-line bg-white py-3.5 pl-12 pr-4 text-base placeholder:text-muted focus-visible:border-orange"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Category">
          <button type="button" aria-pressed={cat === "all"} onClick={() => setCat("all")} className={chip(cat === "all")}>{copy.all}</button>
          {groups.map((g) => (
            <button key={g.name} type="button" aria-pressed={cat === g.name} onClick={() => setCat(g.name)} className={chip(cat === g.name)}>{g.name}</button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted" aria-live="polite">{copy.showing} <span className="font-semibold tabular-nums text-fg">{shown.length}</span> {copy.of} {all.length}</p>

      {shown.length > 0 ? (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((s) => (
            <li key={s.name} className="tile-in cap-card flex items-center gap-3.5 rounded-xl border border-line bg-white p-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tint text-orange-ink"><Icon name={s.icon} className="h-5 w-5" /></span>
              <span className="min-w-0">
                <span className="block font-display text-[1.05rem] leading-snug font-semibold">{s.name}</span>
                <span className="block text-xs text-muted">{s.group}</span>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl border border-dashed border-line p-8 text-center">
          <p className="font-display text-xl">{copy.empty}</p>
          <p className="mx-auto mt-2 max-w-[44ch] text-muted">{copy.emptyHelp}</p>
          <a href={ctaHref} className="mt-4 inline-block text-sm font-semibold text-orange-ink underline underline-offset-4">{ctaLabel}</a>
        </div>
      )}
    </div>
  );
}
