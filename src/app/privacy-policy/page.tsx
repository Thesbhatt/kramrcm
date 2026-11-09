import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { MotionObserver } from "@/components/ui/motion-observer";
import { privacyPolicy } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: privacyPolicy.metaDescription,
  alternates: { canonical: privacyPolicy.href },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <LegalPage doc={privacyPolicy} />
      <MotionObserver />
    </>
  );
}
