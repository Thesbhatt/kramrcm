import Link from "next/link";
import { services, servicesSection } from "@/content/site";
import { Arrow, Container } from "../ui/primitives";

/** Home services as hairline rows with a "Learn more →" link, in Medallion's list rhythm. */
export function ServiceList() {
  return (
    <section id="services" className="py-20 md:py-28">
      <Container>
        <h2 className="max-w-[24ch]">{servicesSection.title}</h2>
        <ul className="mt-12 border-t border-line md:mt-16">
          {services.map((s) => (
            <li key={s.id} className="group relative border-b border-line">
              <div className="grid gap-4 py-8 md:grid-cols-[1fr_1.1fr_auto] md:items-center md:gap-12 md:py-10">
                <h3 className="font-display text-2xl font-light tracking-[-0.02em]">{s.title}</h3>
                <p className="max-w-[52ch] text-muted">{s.body}</p>
                <Link
                  href={`/services#${s.id}`}
                  className="inline-flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.04em] after:absolute after:inset-0 group-hover:underline group-hover:underline-offset-4"
                >
                  {servicesSection.learnMore}<span className="sr-only"> about {s.title}</span> <Arrow />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
