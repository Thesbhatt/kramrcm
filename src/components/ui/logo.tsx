// SVG trace of the client's logo mark (design/client-logo/Logo/Simple.png).
// Replace with the client's vector file when it arrives — see docs/client-checklist.md.

const petal = "M50 4.5C61.5 12.5 64 22 50 35.5C36 22 38.5 12.5 50 4.5Z";

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <g fill="#F77C27">
        {[0, 90, 180, 270].map((r) => (
          <path key={r} d={petal} transform={`rotate(${r} 50 50)`} />
        ))}
      </g>
      <g fill="#414546" stroke="#414546" strokeWidth="3" strokeLinejoin="round">
        <path d="M19 19H30L81 70V81H70L19 30Z" />
        <path d="M81 19V30L30 81H19V70L70 19Z" />
      </g>
      <g stroke="#6B7072" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.9">
        <path d="M31 69L69 31" />
        <path d="M30 30L43 43M57 57L70 70" />
      </g>
    </svg>
  );
}

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const sub = tone === "dark" ? "text-on-ink" : "text-graphite";
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="h-10 w-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={`text-[1.3rem] font-bold tracking-[0.16em] ${tone === "dark" ? "text-orange" : "text-orange-ink"}`}>KRAM</span>
        <span className={`mt-1 text-[0.56rem] font-semibold tracking-[0.32em] ${sub}`}>HEALTHCARE</span>
      </span>
    </span>
  );
}
