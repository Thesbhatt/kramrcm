import type { MetadataRoute } from "next";
import { nav } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return nav.map((n) => ({ url: `https://kramhealthcare.com${n.href === "/" ? "" : n.href}` }));
}
