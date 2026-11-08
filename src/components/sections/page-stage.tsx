import Link from "next/link";
import type { ReactNode } from "react";
import { Container, Words } from "../ui/primitives";

const hi = (n: number) => ({ ["--h" as string]: n });

/**
 * Immersive hero for About, Services and Specialties: the home hero's atmosphere (diagonal peach sweep, pointer-lit dot grid,
 * drifting orbs) with a bespoke billing visual on the right. The h1 words rise from a mask; the visual plays once.
 */
export function PageStage({
  crumb, title, mark, body, actions, visual,
}: { crumb: string; title: string; mark?: string; body: string; actions?: ReactNode; visual: ReactNode }) {
  return (
    <section className="hero-diag hero-stage relative pb-16 pt-8 md:pb-24 md:pt-12">
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />
      <span aria-hidden="true" className="hero-orb hero-orb-a pointer-events-none absolute -right-32 -top-24 h-[520px] w-[520px] rounded-full" />
      <span aria-hidden="true" className="hero-orb hero-orb-b pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full" />
      <Container className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-12">
        <div className="flex flex-col items-start gap-6">
          <nav aria-label="Breadcrumb" className="hero-in" style={hi(0)}>
            <ol className="flex items-center gap-2 text-sm text-muted">
              <li><Link href="/" className="hover:text-fg">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-fg">{crumb}</li>
            </ol>
          </nav>
          <h1 className="max-w-[17ch]"><Words text={title} mark={mark} /></h1>
          <p className="hero-in max-w-[50ch] text-lg text-muted" style={hi(4)}>{body}</p>
          {actions && <div className="hero-in flex flex-wrap gap-3" style={hi(5)}>{actions}</div>}
        </div>
        <div className="hero-in" style={hi(3)}>{visual}</div>
      </Container>
    </section>
  );
}
