import Link from "next/link";
import { cta } from "@/content/site";
import { Logo } from "../ui/logo";
import { ButtonLink } from "../ui/primitives";
import { DesktopNav, MobileMenu } from "./nav";

/** White bar, about 97px tall on desktop, 1px bottom border, centered links and one small CTA at the right. */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="relative mx-auto grid h-[72px] w-full max-w-[1200px] grid-cols-[1fr_auto] items-center gap-4 px-5 sm:px-8 lg:h-[97px] lg:grid-cols-[1fr_auto_1fr] lg:px-10">
        <Link href="/" aria-label="Kram Healthcare home" className="justify-self-start">
          <Logo size="sm" />
        </Link>
        <DesktopNav />
        <div className="flex items-center justify-self-end gap-3">
          <span className="hidden sm:block">
            <ButtonLink href={cta.href}>{cta.header}</ButtonLink>
          </span>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
