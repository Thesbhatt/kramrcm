import { statement } from "@/content/site";
import { LogoMark } from "../ui/logo";
import { Container } from "../ui/primitives";

/** Big centered statement. Words darken line by line as they scroll in (CSS view timeline, no JS). */
export function Statement() {
  const words = statement.muted.split(" ");
  return (
    <section className="py-16 md:py-24">
      <Container>
        <p className="mx-auto max-w-[22ch] text-center text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.12] tracking-[-0.035em] text-balance">
          {words.map((w, i) => (
            <span key={i} className="statement-word">{w} </span>
          ))}
          {/* Full mark (orange petals + graphite X) on the page background: an orange disc would hide the petals */}
          <span className="mx-1 inline-flex h-[0.95em] w-[0.95em] translate-y-[0.1em] items-center justify-center align-baseline" aria-hidden="true">
            <LogoMark className="h-full w-full" />
          </span>{" "}
          <span className="text-fg">{statement.strong}</span>
        </p>
      </Container>
    </section>
  );
}
