import { trust } from "@/content/site";
import { Container } from "../ui/primitives";

/**
 * Quiet row of credentials directly under the hero. Shows only what the client has confirmed in `trust.credentials`.
 * Empty list renders nothing in production; `trust.preview` shows labelled placeholders in `npm run dev` only.
 */
export function CredentialsRow() {
  const preview = trust.preview && process.env.NODE_ENV === "development";
  const items = trust.credentials.length ? trust.credentials : preview ? trust.placeholders.credentials : [];
  if (!items.length) return null;
  const showNote = preview && !trust.credentials.length;

  return (
    <section className="py-6 md:py-8" aria-label={trust.credentialsLabel}>
      <Container className="flex flex-col gap-4">
        {showNote && (
          <p className="rounded-2xl bg-stone-2 px-5 py-3 text-sm text-graphite" role="note">{trust.previewNote}</p>
        )}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <p className="text-sm font-medium text-muted">{trust.credentialsLabel}</p>
          <ul className="flex flex-wrap gap-2">
            {items.map((c, i) => (
              <li key={`${c.label}-${i}`} className="rounded-full bg-stone px-3.5 py-1.5 text-sm text-graphite">
                {c.label}
                {c.detail && <span className="text-muted"> · {c.detail}</span>}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
