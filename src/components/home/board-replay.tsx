"use client";

/**
 * "Replay" button for the status board: restarts its one-time CSS sequence. It adds `.board-reset` (animations off),
 * forces a reflow, then removes it so every pill, track and tally starts again. Hidden without JS and under reduced motion
 * (the board then shows its finished state and has nothing to replay).
 */
export function BoardReplay({ label }: { label: string }) {
  const replay = (e: React.MouseEvent<HTMLButtonElement>) => {
    const board = e.currentTarget.closest<HTMLElement>(".board");
    if (!board) return;
    board.classList.add("board-reset");
    void board.offsetWidth;
    board.classList.remove("board-reset");
  };
  return (
    <button
      type="button"
      onClick={replay}
      className="hidden items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.04em] text-orange-ink ring-1 ring-inset ring-peach-line transition-colors hover:bg-peach-2 motion-reduce:hidden [.js_&]:inline-flex"
    >
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true"><path d="M13 8a5 5 0 1 1-1.8-3.8M13 2.5V5h-2.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      {label}
    </button>
  );
}
