import type { Metadata } from "next";
import { MotionObserver } from "@/components/ui/motion-observer";
import { Arrow, ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";
import { notFound } from "@/content/site";

export const metadata: Metadata = { title: "Page not found" };

// Next.js returns a 404 status and adds noindex for this page on its own.
export default function NotFound() {
  return (
    <>
      <section className="bg-white py-24 md:py-36">
        <Container className="flex flex-col items-start gap-6">
          <div className="animate-rise flex"><Eyebrow>404</Eyebrow></div>
          <h1 className="animate-rise max-w-[18ch] text-[clamp(2.4rem,5.4vw,4.2rem)] leading-[1.04] [animation-delay:120ms]">{notFound.title}</h1>
          <p className="animate-rise max-w-[50ch] text-lg text-muted [animation-delay:240ms]">{notFound.body}</p>
          <div className="animate-rise flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 [animation-delay:360ms]">
            <ButtonLink href="/" variant="dark" size="lg">{notFound.home} <Arrow /></ButtonLink>
            <ButtonLink href="/contact-us" variant="white" size="lg">{notFound.contact}</ButtonLink>
          </div>
        </Container>
      </section>
      <MotionObserver />
    </>
  );
}
