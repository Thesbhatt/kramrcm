import Link from "next/link";
import { company, cta } from "@/content/site";
import { Logo } from "../ui/logo";
import { Arrow, ButtonLink, Icon } from "../ui/primitives";
import { DesktopNav, MobileMenu } from "./nav";

export function Header() {
  return (
    <header className="sticky top-0 z-40">
      <div className="site-header-bar relative bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-4 px-5 py-3.5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-8 xl:gap-12">
            <Link href="/" aria-label="Kram Healthcare home" className="rounded-lg">
              <Logo />
            </Link>
            <DesktopNav />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={company.phoneHref}
              aria-label={`Call ${company.phoneDisplay}`}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-stone ring-1 ring-line transition-colors hover:bg-stone-2 xl:w-auto xl:gap-2 xl:px-4"
            >
              <Icon name="phone" className="h-[18px] w-[18px]" />
              <span className="hidden text-[0.95rem] font-medium tabular-nums xl:inline">{company.phoneDisplay}</span>
            </a>
            {/* Wrapper owns visibility: `hidden` on the link itself would lose to its own `inline-flex` */}
            <span className="hidden sm:block">
              <ButtonLink href={cta.href} variant="soft">
                {cta.header} <Arrow />
              </ButtonLink>
            </span>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
