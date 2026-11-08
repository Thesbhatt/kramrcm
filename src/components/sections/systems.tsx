import { trust } from "@/content/site";
import { Container, SectionHeading, reveal } from "../ui/primitives";

/**
 * EHR and practice-management systems the client confirms they work in (`trust.systems`).
 * Empty list renders nothing in production; `trust.preview` shows labelled placeholders in `npm run dev` only.
 */
export function Systems() {
  const preview = trust.preview && process.env.NODE_ENV === "development";
  const items = trust.systems.length ? trust.systems : preview ? trust.placeholders.systems : [];
  if (!items.length) return null;
  const showNote = preview && !trust.systems.length;

  return (
    <section className="pb-20 md:pb-28">
      <Container className="flex flex-col gap-10">
        {showNote && (
          <p className="rounded-2xl bg-stone-2 px-5 py-3 text-sm text-graphite" role="note">{trust.previewNote}</p>
        )}
        <SectionHeading eyebrow={trust.systemsEyebrow} title={trust.systemsTitle} />
        <ul className="flex flex-wrap gap-3" {...reveal()}>
          {items.map((name, i) => (
            <li key={`${name}-${i}`} className="rounded-full bg-stone px-5 py-2.5 text-[0.97rem] font-medium text-graphite">{name}</li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
