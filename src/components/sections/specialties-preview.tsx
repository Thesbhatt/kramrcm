import { featuredSpecialties, specialtiesSection } from "@/content/site";
import { ButtonLink, Container, reveal, stagger, type IconName } from "../ui/primitives";

/** Icons for the featured specialties (same order as `featuredSpecialties`) and the category groups. */
export const featuredIcons: IconName[] = ["stethoscope", "chat", "pulse", "home", "box", "pill"];
export const groupIcons: Record<string, IconName> = {
  "Primary & urgent care": "stethoscope",
  "Medical specialties": "pulse",
  "Surgical & procedural": "cross",
  "Behavioral health": "chat",
  "Therapy & rehab": "heart",
  "Post-acute & equipment": "home",
  "Pharmacy & dental": "pill",
};

/** Home teaser: the six featured specialties as hairline cells, linking to the full list on /specialties. */
export function SpecialtiesPreview() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" {...reveal()}>
          <div className="flex max-w-[40rem] flex-col gap-4">
            <h2>{specialtiesSection.title}</h2>
            <p className="text-muted">{specialtiesSection.body}</p>
          </div>
          <div>
            <ButtonLink href="/specialties" variant="white">{specialtiesSection.link}</ButtonLink>
          </div>
        </div>

        <ul className="mt-12 grid border-t border-line sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3 md:mt-16" {...stagger}>
          {featuredSpecialties.map((s) => (
            <li key={s.name} className="border-b border-line py-7">
              <h3 className="font-display text-xl">{s.name}</h3>
              <p className="mt-2 text-sm text-muted">{s.note}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
