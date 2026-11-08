import type { Metadata } from "next";
import { DelayCost } from "@/components/sections/delay-cost";
import { PageHero } from "@/components/sections/page-hero";
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
      />
      <DelayCost />
      <MotionObserver />
    </>
  );
}
