import { MotionObserver } from "@/components/ui/motion-observer";
import { HomeHero } from "@/components/home/hero";
import { AboutIntro } from "@/components/sections/about-intro";
import { BillingWhy } from "@/components/sections/billing-why";
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
      <div aria-hidden="true" className="scroll-progress" />
      <HomeHero />
      <Stats tone="strip" />
      <Statement />
      <AboutIntro />
      <ServiceCards />
      <Process />
      <BillingWhy />
      {/* Hidden until real quotes arrive: toggle `proof.enabled` in site.ts */}
      <Testimonials />
      <SpecialtiesPreview />
      <Why />
      <Faq limit={4} />
      <MotionObserver />
    </>
  );
}
