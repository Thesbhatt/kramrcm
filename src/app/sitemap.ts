import type { MetadataRoute } from "next";
import { legal, nav } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const hrefs = [...nav.map((n) => n.href), ...legal.flatMap((l) => (l.href ? [l.href] : []))];
  return hrefs.map((href) => ({ url: `https://kramhealthcare.com${href === "/" ? "" : href}` }));
}
