import Link from "next/link";
import { Arrow, ButtonLink, Container } from "../ui/primitives";
import { legalDocs, legalMeta, type LegalDoc } from "@/content/legal";
import { PageHero } from "./page-hero";

/** Shared layout for the Privacy Policy and Terms of Use: hero, sticky contents list, numbered sections. Server component, no JS needed. */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  const other = doc.slug === "privacy-policy" ? legalDocs["terms-of-use"] : legalDocs["privacy-policy"];
  return (
    <>
      <PageHero crumb={doc.crumb} start={doc.heroStart} word={doc.heroWord} end={doc.heroEnd} body={doc.intro} />
      <section className="pb-20 md:pb-28">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm text-muted">{legalMeta.updatedLabel}: <time>{doc.updated}</time></p>
            <nav aria-label={legalMeta.onThisPage} className="mt-6">
              <h2 className="font-display text-base font-semibold">{legalMeta.onThisPage}</h2>
              <ol className="mt-3 flex flex-col gap-2 border-l border-line pl-4 text-sm">
                {doc.sections.map((s) => (
                  <li key={s.id}><a href={`#${s.id}`} className="text-muted hover:text-orange-ink">{s.title}</a></li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="max-w-[72ch]">
            {doc.sections.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-28 border-t border-line py-8 first:border-t-0 first:pt-0">
                <h2 id={`${s.id}-h`} className="text-2xl">{s.title}</h2>
                <div className="mt-4 flex flex-col gap-4 text-base text-muted">
                  {s.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
                  {s.bullets && (
                    <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-orange">
                      {s.bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  )}
                  {s.after?.map((p, i) => <p key={`a${i}`}>{p}</p>)}
                </div>
              </section>
            ))}

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl bg-tint p-6 ring-1 ring-line">
              <div className="flex-1">
                <h2 className="text-lg">{legalMeta.contactsTitle}</h2>
                <p className="mt-1 text-muted">{legalMeta.contactsBody}</p>
              </div>
              <Link href={other.href} className="group inline-flex items-center gap-2 text-sm font-semibold text-orange-ink hover:underline">
                {legalMeta.otherLabel[doc.slug]} <Arrow />
              </Link>
              <ButtonLink href="/contact-us" variant="white">Contact us</ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
