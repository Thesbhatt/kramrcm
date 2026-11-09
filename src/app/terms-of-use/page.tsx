import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { MotionObserver } from "@/components/ui/motion-observer";
import { termsOfUse } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: termsOfUse.metaDescription,
  alternates: { canonical: termsOfUse.href },
};

export default function TermsOfUsePage() {
  return (
    <>
      <LegalPage doc={termsOfUse} />
      <MotionObserver />
    </>
  );
}
