import Image from "next/image";
import { trust } from "@/content/site";
import { Container } from "../ui/primitives";

/** "Trusted by" logo strip. TODO(client): renders nothing until `trust.logos` holds real logos with written permission. */
export function TrustedBy() {
  if (!trust.logos.length) return null;
  return (
    <section aria-label={trust.logosLabel} className="border-y border-line py-10">
      <Container className="flex flex-col items-center gap-6">
        <p className="text-sm text-muted">{trust.logosLabel}</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {trust.logos.map((l) => (
            <li key={l.name}>
              <Image src={l.src} alt={l.name} width={l.width} height={l.height} className="h-8 w-auto opacity-70" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
