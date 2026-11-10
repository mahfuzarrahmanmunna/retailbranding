import type { MetadataRoute } from "next";
import { categories, products, solutions } from "@/lib/catalog";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/products",
    "/customize",
    "/solutions",
    "/projects",
    "/services",
    "/resources",
    "/about",
    "/contact",
    "/quote",
    ...categories.map((c) => `/categories/${c.slug}`),
    ...products.map((p) => `/products/${p.slug}`),
    ...solutions.map((s) => `/solutions/${s.slug}`),
  ];
  return paths.map((p) => ({ url: new URL(p, site.url).toString() }));
}
