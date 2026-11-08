import { MotionObserver } from "@/components/ui/motion-observer";
import { HomeHero } from "@/components/home/hero";
import { AboutIntro } from "@/components/sections/about-intro";
import { BillingWhy } from "@/components/sections/billing-why";
import { CalculatorPromo } from "@/components/sections/calculator-promo";
import { CredentialsRow } from "@/components/sections/credentials-row";
import { Deadlines } from "@/components/sections/deadlines";
import { Faq } from "@/components/sections/faq";
import { Process } from "@/components/sections/process";
import { Results } from "@/components/sections/results";
import { ServiceCards } from "@/components/sections/service-cards";
import { SpecialtiesPreview } from "@/components/sections/specialties-preview";
import { Statement } from "@/components/sections/statement";
import { Systems } from "@/components/sections/systems";
import { Testimonials } from "@/components/sections/testimonials";
import { Why } from "@/components/sections/why";

export default function Home() {
  return (
    <>
      <div aria-hidden="true" className="scroll-progress" />
      <HomeHero />
      <CredentialsRow />
      <Statement />
      <AboutIntro />
      <ServiceCards />
      <Results />
      {/* Hidden until real quotes arrive: toggle `proof.enabled` in site.ts */}
      <Testimonials />
      <Process />
      <Deadlines />
      <CalculatorPromo />
      <BillingWhy />
      <Systems />
      <SpecialtiesPreview />
      <Why />
      <Faq limit={4} />
      <MotionObserver />
    </>
  );
}
