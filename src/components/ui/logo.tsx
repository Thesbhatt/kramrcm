import Image from "next/image";
import lockup from "@/assets/brand/logo-lockup.webp";
import lockupWhite from "@/assets/brand/logo-lockup-white.webp";
import mark from "@/assets/brand/logo-mark.webp";

// Client's Kram RCM logo (Nov 10 2026), cut from design/client-logo/2026-11/kram-rcm-logo-transparent.webp.
// Logo gray is set to #4C4C4C (the on-white file) to match the footer; the transparent file used a darker #2E2F2F.
// The tagline is dropped from the lockup: at header size it would be ~5px tall. The white variant recolors
// the logo gray to white for the dark footer. Served unoptimized: they are already small, sharp WebPs (~28 KB)
// and the site-wide quality 70 would soften the letter edges. Swap for the client's vector file when it arrives.

/** The K mark alone, for small decorative use. */
export function LogoMark({ className = "h-9 w-9" }: { className?: string; reversed?: boolean }) {
  return <Image src={mark} alt="" unoptimized className={`object-contain ${className}`} aria-hidden="true" />;
}

export function Logo({ tone = "light", size = "md" }: { tone?: "light" | "dark"; size?: "md" | "sm" }) {
  return (
    <Image
      src={tone === "dark" ? lockupWhite : lockup}
      alt="Kram RCM"
      unoptimized
      loading={tone === "light" ? "eager" : "lazy"}
      // self-start + shrink-0: inside a flex column (footer) the default align-items: stretch widened the logo to the column (6:1 instead of 4.24:1)
      className={`${size === "sm" ? "h-9 lg:h-10" : "h-11 sm:h-12"} w-auto max-w-none shrink-0 self-start object-contain`}
    />
  );
}
