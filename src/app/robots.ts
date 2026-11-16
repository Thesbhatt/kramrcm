import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

// Lets Google fetch every page plus /favicon.ico and /icon.png (it needs them for the search-result logo).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
