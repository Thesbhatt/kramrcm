import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { PointerGlow } from "@/components/ui/pointer-glow";
import "./globals.css";

// Self-hosted (src/fonts, Latin subset, both OFL): no build-time or runtime call to Google.
const sans = localFont({
  src: "../fonts/Inter-latin-var.woff2", // Inter variable, weights 100–900
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Arial", "sans-serif"],
});

const display = localFont({
  src: "../fonts/SpaceGrotesk-latin-var.woff2", // Space Grotesk variable, weights 300–700
  weight: "300 700",
  variable: "--font-space-grotesk",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kramhealthcare.com"),
  title: {
    default: "Kram Healthcare | Provider Credentialing & Medical Billing Services",
    template: "%s | Kram Healthcare",
  },
  description:
    "Provider enrollment, credentialing, medical billing and multi-state licensing for US practices. Faster payer approvals and cleaner claims, with weekly status reports.",
  openGraph: {
    title: "Kram Healthcare | Credentialing & Medical Billing",
    description: "Get credentialed faster and paid on the first pass.",
    url: "https://kramhealthcare.com",
    siteName: "Kram Healthcare",
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#FFFFFF" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        {/* clip, not hidden: keeps the sticky header working */}
        <div className="[overflow:clip]">
          <Header />
          <main id="main">{children}</main>
        </div>
        <Footer />
        <PointerGlow />
      </body>
    </html>
  );
}
