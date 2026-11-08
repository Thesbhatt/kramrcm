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
          <div className="flex"><Eyebrow>404</Eyebrow></div>
          <h1 className="max-w-[18ch]">{notFound.title}</h1>
          <p className="max-w-[50ch] text-lg text-muted">{notFound.body}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
            <ButtonLink href="/" variant="dark" size="lg">{notFound.home} <Arrow /></ButtonLink>
            <ButtonLink href="/contact-us" variant="white" size="lg">{notFound.contact}</ButtonLink>
          </div>
        </Container>
      </section>
      <MotionObserver />
    </>
  );
}
