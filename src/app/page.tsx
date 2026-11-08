import { MotionObserver } from "@/components/ui/motion-observer";
import { HomeHero } from "@/components/home/hero";
import { DelayCost } from "@/components/sections/delay-cost";
import { Faq } from "@/components/sections/faq";
import { Process } from "@/components/sections/process";
import { ServiceCards } from "@/components/sections/service-cards";
import { SpecialtiesPreview } from "@/components/sections/specialties-preview";
import { Statement } from "@/components/sections/statement";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { Why } from "@/components/sections/why";

export default function Home() {
  return (
    <>
      <HomeHero />
      <Stats tone="strip" />
      <Statement />
      <ServiceCards />
      <Process />
      <DelayCost />
      {/* Hidden until real quotes arrive: toggle `proof.enabled` in site.ts */}
      <Testimonials />
      <SpecialtiesPreview />
      <Why />
      <Faq limit={4} />
      <MotionObserver />
    </>
  );
}
