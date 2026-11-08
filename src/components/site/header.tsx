import Link from "next/link";
import { company, cta } from "@/content/site";
import { Logo } from "../ui/logo";
import { ButtonLink, Icon } from "../ui/primitives";
import { DesktopNav, MobileMenu } from "./nav";

export function Header() {
  return (
    <header className="animate-drop sticky top-0 z-40">
      <div className="site-header-bar relative bg-white/70 backdrop-blur-md">
        {/* Three children + justify-between keeps the links centred between logo and actions */}
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-10">
          <Link href="/" aria-label="Kram Healthcare home" className="logo-link rounded-lg">
            <Logo size="sm" />
          </Link>
          <DesktopNav />

          <div className="flex items-center gap-2">
            <a
              href={company.phoneHref}
              aria-label={`Call ${company.phoneDisplay}`}
              title={company.phoneDisplay}
              className="call-pill flex h-11 w-11 items-center justify-center rounded-full bg-stone ring-1 ring-line"
            >
              <Icon name="phone" className="h-[18px] w-[18px]" />
            </a>
            {/* Wrapper owns visibility: `hidden` on the link itself would lose to its own `inline-flex` */}
            <span className="hidden sm:block">
              <ButtonLink href={cta.href} variant="soft" size="icon" className="cta-shine" aria-label={cta.header} title={cta.header}>
                <Icon name="mail" className="h-[18px] w-[18px]" />
              </ButtonLink>
            </span>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
