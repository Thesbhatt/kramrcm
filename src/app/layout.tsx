import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import "./globals.css";

// Self-hosted (src/fonts, Latin subset, OFL licence): no build-time or runtime call to Google.
const sans = localFont({
  src: "../fonts/PublicSans-latin-var.woff2", // Public Sans variable, weights 400–700
  weight: "400 700",
  variable: "--font-public-sans",
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

export const viewport: Viewport = { themeColor: "#F6ECE2" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={sans.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only when JS runs, so no-JS visitors and crawlers see everything. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        {/* The page sits as a rounded white canvas on a warm backdrop */}
        <div className="p-2 sm:p-3">
          <div className="rounded-[28px] bg-white [overflow:clip]">
            <Header />
            <main id="main">{children}</main>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
