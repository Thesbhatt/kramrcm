import Image, { type StaticImageData } from "next/image";
import { reveal } from "./primitives";

/**
 * A clinician cutout (transparent WebP) that stands on the bottom edge of an orange band. It rises into place and a soft
 * light blooms behind it once, when it scrolls into view (`.cutout` + `.cutout-glow` in globals.css; reduced motion shows
 * it settled). Decorative, so the image has empty alt text. Position it from the parent: pass `absolute …` or `relative` in className (the glow positions against it).
 * `flip` mirrors the photo so the person faces the content; `imgClassName` can add a fade mask where the source photo had a hard crop.
 */
export function Cutout({
  src, className = "", imgClassName = "", sizes, flip = false, delay = 0, glow = true,
}: { src: StaticImageData; className?: string; imgClassName?: string; sizes: string; flip?: boolean; delay?: number; glow?: boolean }) {
  return (
    <div className={`cutout ${className}`} aria-hidden="true" {...reveal(delay)}>
      {glow && (
        <span className="cutout-glow pointer-events-none absolute -inset-x-[12%] bottom-[-8%] top-[8%] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.38),transparent)]" />
      )}
      <Image src={src} alt="" sizes={sizes} className={`relative h-auto w-full ${flip ? "-scale-x-100" : ""} ${imgClassName}`} />
    </div>
  );
}
