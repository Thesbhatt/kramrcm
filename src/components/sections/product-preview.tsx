import { productSection } from "@/content/site";
import { StatusBoard } from "../home/status-board";
import { Arrow, ButtonLink, Container, reveal } from "../ui/primitives";

/**
 * "Every status, every week, in one report": copy on the left, the animated status board of a SAMPLE practice on the
 * right. The board's one-time sequence starts when it scrolls into view (MotionObserver sets data-play).
 */
export function ProductPreview() {
  return (
    <section className="band-glow-ink bg-ink py-20 text-white md:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="flex flex-col items-start gap-6" {...reveal()}>
          <h2 className="font-normal">{productSection.title}</h2>
          <p className="max-w-[44ch] text-on-ink">{productSection.body}</p>
          <ButtonLink href={productSection.linkHref}>{productSection.link} <Arrow /></ButtonLink>
        </div>
        <div {...reveal(150)}>
          <StatusBoard />
        </div>
      </Container>
    </section>
  );
}
