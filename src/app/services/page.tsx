import type { Metadata } from "next";
import { MotionObserver } from "@/components/ui/motion-observer";
import { Faq } from "@/components/sections/faq";
import { PageStage } from "@/components/sections/page-stage";
import { Process } from "@/components/sections/process";
import { ServiceChapters } from "@/components/sections/service-chapters";
import { CycleRing } from "@/components/sections/stage-visuals";
import { Arrow, ButtonLink } from "@/components/ui/primitives";
import { cta, servicesPage } from "@/content/site";

export const metadata: Metadata = {
  title: "Services: Credentialing, Medical Billing & Licensing",
  description:
    "Provider enrollment and credentialing, CAQH, Medicare and Medicaid enrollment, medical billing and RCM, denial management, and multi-state licensing for US practices.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageStage
        crumb="Services"
        title={`${servicesPage.titleStart} ${servicesPage.titleMark}`}
        mark={servicesPage.titleMark}
        body={servicesPage.body}
        actions={
          <>
            <ButtonLink href={cta.href}>{cta.primary}</ButtonLink>
            <ButtonLink href="#credentialing" variant="white">See what we handle <Arrow /></ButtonLink>
          </>
        }
        visual={<CycleRing />}
      />
      <ServiceChapters />
      <Process />
      <Faq />
      <MotionObserver />
    </>
  );
}
