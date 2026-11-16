import { company, siteUrl } from "@/content/site";

/**
 * JSON-LD for Google: WebSite sets the site name shown above search results ("Kram RCM", not "kramrcm.com");
 * Organization gives the logo, contact and address. Homepage only, as Google recommends. Facts come from `company`.
 */
export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: company.name,
        alternateName: ["KRAM RCM", "Kram Healthcare"],
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: company.name,
        alternateName: "Kram Healthcare",
        url: siteUrl,
        // Square, 256px, served at a stable URL (Google needs 112px+ and a crawlable image)
        logo: { "@type": "ImageObject", url: `${siteUrl}/icon.png`, width: 256, height: 256 },
        description:
          "Provider enrollment, credentialing, medical billing and multi-state licensing for US healthcare practices.",
        email: company.email,
        telephone: company.phoneHref.replace("tel:", ""),
        address: {
          "@type": "PostalAddress",
          streetAddress: company.addressLines[0],
          addressLocality: "St. Petersburg",
          addressRegion: "FL",
          postalCode: "33702",
          addressCountry: "US",
        },
        areaServed: { "@type": "Country", name: "United States" },
        sameAs: [company.social.linkedin, company.social.facebook],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: company.phoneHref.replace("tel:", ""),
          email: company.email,
          areaServed: "US",
          availableLanguage: "English",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can never close the script tag early
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
