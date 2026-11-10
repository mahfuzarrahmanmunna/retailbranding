/**
 * Site-wide business configuration.
 *
 * Every value marked VERIFY must be approved by management before launch
 * (blueprint §18, §22). Contact channels left as `null` are hidden in the UI,
 * so nothing unverified is ever shown to customers.
 */
export const site = {
  name: "Retail Branding",
  legalName: "Retail Solutions Limited",
  tagline: "Your Brand, Built to Stand Out.",
  taglineBn: "আপনার ব্র্যান্ডের পরিচয়, আমাদের নির্মাণে।",
  url: process.env.SITE_URL ?? "http://localhost:3000",
  parentSite: "https://retailsolutionsltd.com",

  contact: {
    // VERIFY: Retail Branding's own numbers. Do not reuse Retail Soft contacts.
    phone: null as string | null, // e.g. "+8801XXXXXXXXX"
    whatsapp: null as string | null, // digits only, e.g. "8801XXXXXXXXX"
    email: null as string | null,
    // VERIFY before publishing (blueprint §11).
    address: [
      "Retail Solutions Limited",
      "1st Floor, House 13, H.P. Bhabon",
      "Merul Khula Madani Avenue, Satarkul",
      "North Badda, Dhaka-1212",
    ],
  },

  // Only switch to true once nationwide delivery/installation is verified.
  nationwideCoverageVerified: false,
} as const;

export const announcement = site.nationwideCoverageVerified
  ? "Custom signage, design & installation solutions across Bangladesh"
  : "Custom signage, design & installation — service availability varies by location";

export type NavItem = { label: string; href: string; children?: NavItem[] };

export const mainNav: NavItem[] = [
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Sign Builder", href: "/customize" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function whatsappLink(message?: string) {
  if (!site.contact.whatsapp) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${site.contact.whatsapp}${text}`;
}

export function phoneLink() {
  return site.contact.phone ? `tel:${site.contact.phone}` : null;
}
