import { MotionObserver } from "@/components/ui/motion-observer";
import { HomeHero } from "@/components/home/hero";
import { Faq } from "@/components/sections/faq";
import { ProductPreview } from "@/components/sections/product-preview";
import { Process } from "@/components/sections/process";
import { ServiceList } from "@/components/sections/service-list";
import { SpecialtiesPreview } from "@/components/sections/specialties-preview";
import { Stats } from "@/components/sections/stats";
import { TrustedBy } from "@/components/sections/trusted-by";

// Closing CTA band + footer come from the layout's <Footer />.
export default function Home() {
  return (
    <>
      <HomeHero />
      <TrustedBy />
      <Stats />
      <ServiceList />
      <Process />
      <ProductPreview />
      <SpecialtiesPreview />
      <Faq limit={4} />
      <MotionObserver />
    </>
  );
}
