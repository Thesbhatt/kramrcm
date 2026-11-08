import type { Metadata } from "next";
import { DelayCost } from "@/components/sections/delay-cost";
import { PageStage } from "@/components/sections/page-stage";
import { AgingChart } from "@/components/sections/stage-visuals";
import { ButtonLink } from "@/components/ui/primitives";
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
      <PageStage
        crumb={delayCost.crumb}
        title={`${delayCost.titleStart} ${delayCost.titleHighlight} ${delayCost.titleEnd}`}
        mark={delayCost.titleHighlight}
        body={delayCost.body}
        actions={<ButtonLink href="#calculator">Try the calculator</ButtonLink>}
        visual={<AgingChart />}
      />
      <DelayCost />
      <MotionObserver />
    </>
  );
}
