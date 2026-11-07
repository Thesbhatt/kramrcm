import Link from "next/link";
import type { ReactNode } from "react";
import { Container, Highlight } from "../ui/primitives";

/** Inner-page header: breadcrumb pill, big headline with highlighted keyword, intro, optional aside. */
export function PageHero({
  crumb, start, word, end, body, children,
}: { crumb: string; start?: string; word: string; end?: string; body: string; children?: ReactNode }) {
  return (
    <section className="pb-14 pt-6 md:pb-20 md:pt-12">
      <Container className={`grid grid-cols-1 gap-10 ${children ? "lg:grid-cols-[1.25fr_1fr] lg:items-end" : ""}`}>
        <div className="flex flex-col gap-6">
          <nav aria-label="Breadcrumb" className="animate-rise">
            <ol className="flex items-center gap-2 text-sm text-muted">
              <li><Link href="/" className="hover:text-fg">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-fg">{crumb}</li>
            </ol>
          </nav>
          <h1 className="words-load max-w-[18ch] text-[clamp(2.5rem,6vw,4.4rem)] leading-[1.03]">
            <Highlight start={start} word={word} end={end} />
          </h1>
          <p className="animate-rise max-w-[54ch] text-lg text-muted [animation-delay:520ms]">{body}</p>
        </div>
        {children && <div className="animate-rise [animation-delay:640ms]">{children}</div>}
      </Container>
    </section>
  );
}
