import { statusBoard } from "@/content/site";

/**
 * Hero visual: a live-style status board for a SAMPLE practice. Pure CSS motion (see .board-row in globals.css):
 * pills and the progress track update once on load, then hold. The accessible text is the end state, so the
 * animated pieces are aria-hidden. Server Component, no JS.
 */
export function StatusBoard() {
  const { title, sample, columns, stages, rows } = statusBoard;
  return (
    <figure className="board w-full rounded-[28px] bg-tint p-3 text-left sm:p-5" aria-label={`${title}. ${sample}.`}>
      <div className="overflow-clip rounded-2xl border border-line bg-white">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-line px-5 py-4 sm:px-7">
          <p className="font-medium">{title}</p>
          <p className="flex items-center gap-2 text-sm text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden="true" />
            {sample}
          </p>
        </div>

        <div className="hidden grid-cols-[minmax(0,1.2fr)_minmax(0,1.3fr)_6.25rem] gap-x-8 px-7 pb-2 pt-4 text-xs text-muted sm:grid" aria-hidden="true">
          <span>{columns.item}</span>
          <span className="grid grid-cols-3">
            <span>{columns.progress[0]}</span>
            <span className="text-center">{columns.progress[1]}</span>
            <span className="text-right">{columns.progress[2]}</span>
          </span>
          <span className="text-center">{columns.status}</span>
        </div>

        <ul className="divide-y divide-line">
          {rows.map((r, i) => (
            <li
              key={`${r.name}-${r.detail}`}
              data-end={r.end}
              style={{ ["--i" as string]: i }}
              className="board-row grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-4 px-5 py-4 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1.3fr)_6.25rem] sm:gap-x-8 sm:px-7"
            >
              <div className="order-1">
                <p className="font-medium leading-snug">{r.name}</p>
                <p className="text-sm text-muted">{r.detail}</p>
              </div>

              <div className="relative order-3 col-span-2 flex h-3 items-center sm:order-2 sm:col-span-1" aria-hidden="true">
                <span className="absolute inset-x-1.5 h-px bg-line" />
                <span className="board-fill absolute inset-x-1.5 h-[2px] bg-orange" />
                <span className="relative flex w-full justify-between">
                  <span className="h-3 w-3 rounded-full border border-orange bg-orange" />
                  <span className="board-dot-2 h-3 w-3 rounded-full border border-line bg-white" />
                  <span className="board-dot-3 h-3 w-3 rounded-full border border-line bg-white" />
                </span>
              </div>

              <div className="order-2 justify-self-end sm:order-3 sm:justify-self-center">
                <span className="sr-only">{r.end === "done" ? r.final : stages.review}</span>
                <span className="pill" aria-hidden="true">
                  <span className="st-1">{stages.submitted}</span>
                  <span className="st-2">{stages.review}</span>
                  <span className="st-3">{r.final}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
