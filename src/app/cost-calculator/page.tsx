import type { Metadata } from "next";
import { DelayCost } from "@/components/sections/delay-cost";
import deskCutout from "@/assets/photos/cutout-desk.webp";
import { PageHero } from "@/components/sections/page-hero";
import { Cutout } from "@/components/ui/cutout";
import { MotionObserver } from "@/components/ui/motion-observer";
import { delayCost } from "@/content/site";

export const metadata: Metadata = {
  title: delayCost.metaTitle,
  description: delayCost.metaDescription,
  alternates: { canonical: "/cost-calculator" },
};

export default function CostCalculatorPage() {
  return (
    <>
      <PageHero
        crumb={delayCost.crumb}
        start={delayCost.titleStart}
        word={delayCost.titleHighlight}
        end={delayCost.titleEnd}
        body={delayCost.body}
      >
        {/* Orange panel; the clinician rises from its bottom edge. Hidden on phones to keep the sliders close to the headline. */}
        <div className="band-glow relative hidden min-h-[300px] overflow-hidden rounded-2xl bg-orange md:block">
          <Cutout src={deskCutout} sizes="(min-width: 1024px) 420px, 60vw" className="absolute bottom-0 left-1/2 w-[min(86%,440px)] -translate-x-1/2" />
        </div>
      </PageHero>
      <DelayCost />
      <MotionObserver />
    </>
  );
}
