import Image from "next/image";
import Link from "next/link";
import heroPhoto from "@/assets/photos/clinician-workstation.jpg";
import { cta, enrollmentSample, hero } from "@/content/site";
import { LogoMark } from "../ui/logo";
import { Arrow, ButtonLink, Check, Container, Highlight, Icon } from "../ui/primitives";

export const statusTone = {
  ok: "bg-orange text-fg",
  progress: "bg-stone-2 text-graphite",
  wait: "bg-[#FDEBDC] text-[#8A3D12]",
} as const;

export function HomeHero() {
  return (
    <section className="relative overflow-clip pt-4 pb-10 md:pt-8 md:pb-14">
      {/* Soft drifting glows behind the copy (decorative depth, CSS only) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="orb absolute -left-32 -top-24 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgb(255_201_153/0.9),transparent_68%)]" />
        <span className="orb absolute bottom-[-140px] left-[30%] h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgb(230_230_227/0.95),transparent_68%)] [--orb-d:-5s]" />
      </div>
      <Container className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.02fr] lg:gap-10">
        {/* Copy column */}
        <div className="flex flex-col justify-between gap-12 py-2 lg:py-10">
          <div className="flex flex-col gap-6">
            <p className="animate-rise text-[0.9rem] font-medium text-muted">{hero.kicker}</p>
            <h1 className="words-load text-[clamp(2.6rem,6.2vw,4.6rem)] leading-[1.02]">
              <Highlight start={hero.titleStart} word={hero.titleHighlight} end={hero.titleEnd} />
            </h1>
            <p className="animate-rise max-w-[44ch] text-lg text-muted [animation-delay:300ms]">{hero.body}</p>
            <ul className="animate-rise flex flex-col gap-2 [animation-delay:340ms]">
              {hero.trust.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[1rem]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange text-fg">
                    <Check className="h-3 w-3" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="animate-rise flex flex-wrap gap-3 pt-1 [animation-delay:420ms]">
              <ButtonLink href={cta.href} size="lg">{hero.primaryCta} <Arrow /></ButtonLink>
              <ButtonLink href="/services" variant="soft" size="lg">{hero.secondaryCta}</ButtonLink>
            </div>
          </div>

          {/* Partner prompt (the stats now sit in a strip right under the hero) */}
          <div className="animate-rise [animation-delay:460ms]">
            <Link
              href={cta.href}
              className="group flex max-w-[400px] items-center justify-between gap-3 rounded-full bg-stone py-1.5 pl-5 pr-1.5 text-[0.98rem] ring-1 ring-line transition-colors hover:bg-stone-2"
            >
              {hero.partnerPrompt}
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange text-fg transition-colors group-hover:bg-ink group-hover:text-white">
                <Arrow />
              </span>
            </Link>
          </div>
        </div>

        {/* Visual column: rounded canvas with floating cards (product UI instead of stock photography) */}
        <HeroVisual />
      </Container>
    </section>
  );
}

function HeroVisual() {
  const rows = enrollmentSample.filter((r) => r.payer !== "CAQH re-attestation"); // 3 rows keep the card compact
  return (
    <div className="scroll-frame hero-shrink relative min-h-[460px] overflow-hidden rounded-[28px] bg-peach sm:min-h-[640px] animate-expand">
      {/* TODO(client): replace with the client's own photography (src/assets/photos/CREDITS.md) */}
      {/* Wrapper carries the always-on pan and zoom; the image itself is busy with the load-in settle and scroll parallax */}
      <div className="ken-burns absolute inset-0">
        <Image
          src={heroPhoto}
          alt="A clinician reviewing patient imaging with a colleague at a workstation"
          fill
          sizes="(min-width: 1240px) 610px, (min-width: 1024px) 50vw, 100vw"
          quality={70}
          placeholder="blur"
          loading="eager"
          fetchPriority="high"
          className="parallax-img animate-settle object-cover object-[74%_center]"
        />
      </div>
      {/* Warm tint + bottom shade so the floating cards read cleanly over the photo */}
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(247_124_39/0.14),transparent_40%,rgb(47_51_54/0.38))]" />

      <span className="float-in absolute right-4 top-4 rounded-full bg-white/90 px-3.5 py-1.5 text-sm font-medium backdrop-blur sm:right-6 sm:top-6 [--d:250ms]">
        All 50 states · Telehealth
      </span>

      {/* Floating cards, bottom-right as in the reference */}
      <div className="absolute inset-x-3 bottom-3 flex flex-col gap-2.5 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[330px]">
        <div className="bob">
        <div className="float-in rounded-[20px] bg-white p-4 shadow-[0_24px_50px_-24px_rgb(0_0_0/0.5)] [--d:350ms]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-peach"><LogoMark className="h-5 w-5" /></span>
              <div className="leading-tight">
                <p className="text-sm font-medium">Enrollment tracker</p>
                <p className="text-xs text-muted">Dr. A. Patel, MD · Family Medicine</p>
              </div>
            </div>
            <span className="relative inline-flex items-center gap-1.5 text-xs font-medium text-success">
              <span className="pulse-dot relative h-2 w-2 rounded-full bg-orange" aria-hidden="true" /> Live
            </span>
          </div>
          <ul className="mt-2.5 divide-y divide-line">
            {rows.map((row, i) => (
              <li
                key={row.payer}
                className={`tracker-row relative isolate flex items-center justify-between gap-3 py-2 text-[0.9rem] ${"then" in row ? "row-flash" : ""}`}
                style={{ ["--i" as string]: i }}
              >
                <span>{row.payer}</span>
                {"then" in row ? (
                  // The status updates a few seconds after load, so the card reads as a live product (CSS only).
                  <span className="status-flip">
                    <span aria-hidden="true" className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${statusTone[row.tone]}`}>{row.status}</span>
                    <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full py-0.5 pl-1.5 pr-2.5 text-xs font-medium ${statusTone[row.then.tone]}`}>
                      <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden="true"><path d="M3.5 8.5 6.5 11.5 12.5 4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {row.then.status}
                    </span>
                  </span>
                ) : (
                  <span className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${statusTone[row.tone]}`}>{row.status}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        </div>
        <div className="bob [--bob-d:-3.5s]">
        <div className="float-in flex items-center gap-3 rounded-[20px] bg-white p-3 shadow-[0_24px_50px_-24px_rgb(0_0_0/0.5)] [--d:650ms]">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink text-white"><Icon name="chart" /></span>
          <div className="leading-snug">
            <p className="text-[0.95rem] font-medium">Weekly status report</p>
            <p className="text-sm text-muted">Every enrollment &amp; claim batch</p>
          </div>
        </div>
        </div>
      </div>
      <p className="sr-only">Enrollment tracker shows sample data for illustration.</p>
    </div>
  );
}
