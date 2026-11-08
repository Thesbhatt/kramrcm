import { trust } from "@/content/site";
import { Container, SectionHeading, reveal } from "../ui/primitives";

/**
 * Named leaders from `trust.leaders`. No photos until the client supplies headshots.
 * Empty list renders nothing in production; `trust.preview` shows labelled placeholders in `npm run dev` only.
 */
export function Leadership() {
  const preview = trust.preview && process.env.NODE_ENV === "development";
  const items = trust.leaders.length ? trust.leaders : preview ? trust.placeholders.leaders : [];
  if (!items.length) return null;
  const showNote = preview && !trust.leaders.length;

  return (
    <section className="pb-20 md:pb-28">
      <Container className="flex flex-col gap-12">
        {showNote && (
          <p className="rounded-2xl bg-stone-2 px-5 py-3 text-sm text-graphite" role="note">{trust.previewNote}</p>
        )}
        <SectionHeading eyebrow={trust.leadersEyebrow} title={trust.leadersTitle} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((l, i) => (
            <div key={`${l.name}-${i}`} className="flex flex-col gap-3 rounded-xl bg-stone p-6 sm:p-7" {...reveal(i * 70)}>
              <h3 className="text-[1.3rem] leading-tight">{l.name}</h3>
              <p className="text-sm font-medium text-orange-ink">{l.title}</p>
              <p className="text-[0.97rem] text-muted">{l.bio}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
