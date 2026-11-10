/**
 * Catalogue data for the MVP.
 *
 * This is a structured starting point based on the website blueprint (§6, §7).
 * Management must approve the final category list, launch SKUs, material
 * specifications and lead times (blueprint §22) before launch. When a database
 * is introduced, these exports become the seed data.
 */

export type ArtKind =
  | "fascia"
  | "letters"
  | "lightbox"
  | "plaque"
  | "neon"
  | "reception"
  | "window"
  | "wayfinding"
  | "rooftop"
  | "pos"
  | "channel"
  | "mirror"
  | "door"
  | "pylon"
  | "relief";

export type PricingMode = "fixed" | "estimate" | "quote";

export type Category = {
  slug: string;
  name: string;
  nameBn: string;
  intro: string;
  applications: string[];
  subcategories: string[];
  art: ArtKind;
};

export type Option = {
  id: string;
  label: string;
  note?: string;
};

export type PresetSize = {
  id: string;
  label: string;
  widthMm: number;
  heightMm: number;
  /** Fixed unit price in BDT. Placeholder until approved (see pricing.ts). */
  price: number;
};

export type Product = {
  slug: string;
  sku: string;
  name: string;
  categorySlug: string;
  summary: string;
  description: string;
  highlights: string[];
  intendedUse: string;
  environment: ("indoor" | "outdoor")[];
  illumination: "none" | "optional" | "included";
  pricingMode: PricingMode;
  /** What width/height refers to — always explained to the customer (§12). */
  dimensionMeaning: "outer" | "letter";
  limits: { minWidthMm: number; maxWidthMm: number; minHeightMm: number; maxHeightMm: number };
  presets?: PresetSize[];
  materials: string[];
  thicknesses: string[];
  lighting: string[];
  mounting: string[];
  finishes: string[];
  leadTime: string;
  art: ArtKind;
  featured?: boolean;
};

export const categories: Category[] = [
  {
    slug: "outdoor-signboards",
    name: "Outdoor Signboards",
    nameBn: "আউটডোর সাইনবোর্ড",
    intro:
      "Shop fascia and storefront signboards built for visibility from the street, with or without illumination.",
    applications: ["Shop fronts", "Showroom fascia", "Branch exteriors", "Market stalls"],
    subcategories: ["ACP base", "Illuminated", "Non-illuminated", "Shop fascia", "Rooftop (subject to engineering)"],
    art: "fascia",
  },
  {
    slug: "3d-letters",
    name: "3D Letters",
    nameBn: "থ্রিডি লেটার",
    intro:
      "Dimensional lettering in acrylic or stainless steel that gives your name depth, presence and a premium finish.",
    applications: ["Storefront names", "Reception walls", "Corporate lobbies", "Building identity"],
    subcategories: ["Acrylic", "Fabricated stainless steel", "Cut stainless steel", "Non-lit or optional lighting"],
    art: "letters",
  },
  {
    slug: "illuminated-letters",
    name: "Illuminated LED Letters",
    nameBn: "লাইটিং লেটার",
    intro:
      "Channel letters lit from the front, back or both — from classic trim-cap to rimless, halo, mini and infinity-mirror styles.",
    applications: ["Storefront names", "Showrooms and flagship stores", "Reception walls", "Feature walls"],
    subcategories: ["Front-lit trim-cap", "Front-lit rimless", "Halo / back-lit", "Front & back-lit", "Acrylic channel", "Mini LED letters", "Infinity mirror"],
    art: "channel",
  },
  {
    slug: "lightboxes",
    name: "Lightboxes",
    nameBn: "লাইটবক্স",
    intro:
      "Evenly lit display boxes for logos, menus and promotions — readable day and night.",
    applications: ["Projecting shop signs", "Menu boards", "Promotional displays", "Mall frontages"],
    subcategories: ["Single-sided printed", "Push-through", "Embedded / inlaid", "Double-sided projecting"],
    art: "lightbox",
  },
  {
    slug: "acrylic-signage",
    name: "Acrylic Signs",
    nameBn: "অ্যাক্রিলিক সাইন",
    intro: "Clean, precise acrylic plaques, logo signs and wayfinding for interiors and entrances.",
    applications: ["Door plaques", "Office logos", "Wayfinding", "Information signs"],
    subcategories: ["Cut letters", "Plaques", "Logo signs"],
    art: "plaque",
  },
  {
    slug: "led-neon-signs",
    name: "LED / Neon-style Signs",
    nameBn: "এলইডি / নিয়ন-স্টাইল সাইন",
    intro: "Flexible neon-style lettering and illuminated logos that add personality to any space.",
    applications: ["Cafés and restaurants", "Feature walls", "Window displays", "Events"],
    subcategories: ["Single-colour flexible neon", "RGB / dimmable neon", "Outdoor flexible neon", "Acrylic faux neon (180° / 360°)", "Large-format neon"],
    art: "neon",
  },
  {
    slug: "indoor-branding",
    name: "Indoor Signs",
    nameBn: "ইনডোর সাইন",
    intro: "Reception signs, wall graphics, directories and directional signs that carry your brand inside.",
    applications: ["Reception areas", "Office interiors", "Directories", "Directional signage"],
    subcategories: ["Reception signs", "Wall graphics", "Directory", "Directional"],
    art: "reception",
  },
  {
    slug: "promotional-graphics",
    name: "Display & Promotional Graphics",
    nameBn: "ডিসপ্লে ও প্রমোশনাল গ্রাফিক্স",
    intro: "Point-of-sale displays, window graphics and printed panels for campaigns and launches.",
    applications: ["Window campaigns", "POS displays", "Seasonal promotions", "Product launches"],
    subcategories: ["POS display", "Window graphics", "Printed promotional panels"],
    art: "window",
  },
  {
    slug: "door-wayfinding-signs",
    name: "Door, Room & Wayfinding Signs",
    nameBn: "ডোর ও দিকনির্দেশনা সাইন",
    intro: "Door plates, room numbers, directories and directional signs that keep visitors oriented and on-brand.",
    applications: ["Offices", "Hospitals and clinics", "Hotels", "Malls and public buildings"],
    subcategories: ["Door & room number signs", "Floor directories", "Directional & information", "Tactile & Braille"],
    art: "door",
  },
  {
    slug: "pylon-monument-signs",
    name: "Pylon & Monument Signs",
    nameBn: "পাইলন ও মনুমেন্ট সাইন",
    intro: "Freestanding pylons, entrance monuments and directory towers — designed per site with structure and foundation.",
    applications: ["Showrooms and dealerships", "Fuel stations", "Factories and campuses", "Malls and commercial buildings"],
    subcategories: ["Brand pylons", "Entrance monuments", "Multi-tenant pylons", "Digital LED pylons"],
    art: "pylon",
  },
  {
    slug: "metal-plaques-relief",
    name: "Metal Plaques & Relief Signs",
    nameBn: "মেটাল প্লাক ও রিলিফ সাইন",
    intro: "Etched and raised-relief plaques, commemorative plaques, relief murals and decorative metal screens.",
    applications: ["Company entrances", "Inaugurations and foundations", "Reception backdrops", "Interiors and façades"],
    subcategories: ["Door plaques", "Commemorative plaques", "Relief murals & logo walls", "Decorative screens"],
    art: "relief",
  },
];

/* ------------------------------------------------------------------ */
/* Option catalogue — labels shown to customers.                       */
/* Rates and compatibility live in pricing.ts.                         */
/* ------------------------------------------------------------------ */

export const materialOptions: Option[] = [
  { id: "acp", label: "ACP (aluminium composite panel)", note: "Rigid, flat panel commonly used for fascia boards" },
  { id: "acrylic", label: "Acrylic", note: "Clean edges, available in many colours, can be lit" },
  { id: "stainless-steel", label: "Stainless steel", note: "Metallic finish for premium lettering" },
  { id: "aluminium-frame", label: "Aluminium frame + printed face", note: "Used for lightboxes" },
  { id: "pvc-foam", label: "PVC foam board", note: "Lightweight, indoor use" },
  { id: "vinyl", label: "Printed vinyl", note: "For window and wall graphics" },
  { id: "neon-flex", label: "Flexible silicone LED neon", note: "Bendable LED tube on acrylic backing" },
  { id: "aluminium", label: "Aluminium", note: "Light, rigid returns for channel letters and frames" },
  { id: "brass", label: "Brass", note: "Warm metallic tone for plaques and luxury letters" },
  { id: "mirror-acrylic", label: "Mirror acrylic + two-way mirror", note: "For infinity-mirror effects" },
];

export const thicknessOptions: Option[] = [
  { id: "3mm", label: "3 mm" },
  { id: "5mm", label: "5 mm" },
  { id: "10mm", label: "10 mm" },
  { id: "20mm", label: "20 mm" },
  { id: "50mm", label: "50 mm (built-up)" },
  { id: "100mm", label: "100 mm (deep return)" },
];

export const lightingOptions: Option[] = [
  { id: "none", label: "No lighting" },
  { id: "front-lit", label: "Front-lit", note: "Light shines through the face" },
  { id: "halo-lit", label: "Halo-lit", note: "Soft glow on the wall behind" },
  { id: "backlit", label: "Backlit LED", note: "Even internal illumination" },
  { id: "neon", label: "Neon-style LED", note: "Line lighting in your chosen colour" },
  { id: "side-lit", label: "Side-lit", note: "Light glows from the letter edges" },
  { id: "front-back-lit", label: "Front & back-lit", note: "Lit face plus halo glow" },
  { id: "front-side-lit", label: "Front & side-lit", note: "Lit face and edges" },
  { id: "rgb", label: "RGB / multi-colour, dimmable", note: "Colour and brightness via controller" },
  { id: "digital", label: "Digital LED display", note: "Programmable screen content" },
];

export const mountingOptions: Option[] = [
  { id: "flush", label: "Flush wall mount" },
  { id: "standoff", label: "Stand-off spacers" },
  { id: "frame", label: "On a frame / structure" },
  { id: "hanging", label: "Hanging / projecting" },
  { id: "freestanding", label: "Freestanding / tabletop" },
  { id: "adhesive", label: "Adhesive application" },
  { id: "ground", label: "Ground / foundation mounted" },
];

export const finishOptions: Option[] = [
  { id: "gloss", label: "Gloss" },
  { id: "matte", label: "Matte" },
  { id: "brushed", label: "Brushed metal" },
  { id: "mirror", label: "Mirror polish" },
  { id: "printed", label: "Printed graphic" },
  { id: "painted", label: "Painted (brand colour)" },
  { id: "etched", label: "Etched / engraved" },
];

export function optionLabel(list: Option[], id: string | undefined) {
  return list.find((o) => o.id === id)?.label ?? id ?? "—";
}

/* ------------------------------------------------------------------ */
/* Products                                                            */
/* ------------------------------------------------------------------ */

const ft = (n: number) => Math.round(n * 304.8);

export const products: Product[] = [
  {
    slug: "acp-shop-fascia-signboard",
    sku: "RB-OUT-ACP",
    name: "ACP Shop Fascia Signboard",
    categorySlug: "outdoor-signboards",
    summary:
      "A clean, flat shop-front signboard on ACP — the most common way to put your name above the door.",
    description:
      "Your shop name and logo on a rigid ACP panel, sized to your frontage. Choose cut-vinyl or printed graphics, add 3D letters on top for depth, and decide whether you need illumination. Final structure depends on your wall and site conditions.",
    highlights: [
      "Sized to your frontage",
      "Optional illumination if supported for your site",
      "Artwork review before production",
      "Installation quotation available",
    ],
    intendedUse: "Storefront / shop fascia",
    environment: ["outdoor"],
    illumination: "optional",
    pricingMode: "estimate",
    dimensionMeaning: "outer",
    limits: { minWidthMm: ft(2), maxWidthMm: ft(60), minHeightMm: ft(1), maxHeightMm: ft(10) },
    materials: ["acp"],
    thicknesses: ["3mm", "5mm"],
    lighting: ["none", "front-lit", "backlit"],
    mounting: ["frame", "flush"],
    finishes: ["printed", "gloss", "matte"],
    leadTime: "Confirmed after artwork approval and site details",
    art: "fascia",
    featured: true,
  },
  {
    slug: "illuminated-acp-signboard",
    sku: "RB-OUT-ILLUM",
    name: "Illuminated Signboard with 3D Letters",
    categorySlug: "outdoor-signboards",
    summary:
      "ACP base with raised acrylic letters, lit so your shop is visible after dark.",
    description:
      "Combines an ACP fascia with dimensional acrylic letters and LED lighting. Choose front-lit or backlit letters. Power availability and wall structure are checked before production.",
    highlights: [
      "Raised acrylic letters on ACP base",
      "Front-lit or backlit options",
      "Power and site checks before production",
      "Installation quotation available",
    ],
    intendedUse: "Storefront visibility day and night",
    environment: ["outdoor"],
    illumination: "included",
    pricingMode: "estimate",
    dimensionMeaning: "outer",
    limits: { minWidthMm: ft(4), maxWidthMm: ft(60), minHeightMm: ft(1.5), maxHeightMm: ft(10) },
    materials: ["acp"],
    thicknesses: ["10mm", "20mm"],
    lighting: ["front-lit", "backlit", "halo-lit"],
    mounting: ["frame"],
    finishes: ["gloss", "matte"],
    leadTime: "Confirmed after artwork approval and site details",
    art: "fascia",
    featured: true,
  },
  {
    slug: "custom-3d-acrylic-letter-sign",
    sku: "RB-3D-ACR",
    name: "Custom 3D Acrylic Letter Sign",
    categorySlug: "3d-letters",
    summary:
      "Give your storefront or reception a clean, dimensional identity with acrylic lettering made to match your brand.",
    description:
      "Choose your size, colour, finish and mounting preference, then share your logo for review. Letters can be non-lit or illuminated where supported. Indoor/outdoor suitability depends on the final specification.",
    highlights: [
      "Custom sizing",
      "Indoor/outdoor suitability subject to specification",
      "Optional illumination if supported",
      "Artwork review before production",
      "Installation quotation available",
    ],
    intendedUse: "Storefront name, reception wall, lobby",
    environment: ["indoor", "outdoor"],
    illumination: "optional",
    pricingMode: "estimate",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 300, maxWidthMm: ft(40), minHeightMm: 100, maxHeightMm: ft(6) },
    materials: ["acrylic"],
    thicknesses: ["5mm", "10mm", "20mm", "50mm"],
    lighting: ["none", "front-lit", "halo-lit"],
    mounting: ["flush", "standoff", "frame"],
    finishes: ["gloss", "matte"],
    leadTime: "Confirmed after artwork approval",
    art: "letters",
    featured: true,
  },
  {
    slug: "stainless-steel-3d-letters",
    sku: "RB-3D-SS",
    name: "Fabricated Stainless Steel 3D Letters",
    categorySlug: "3d-letters",
    summary: "Metallic dimensional letters for corporate entrances and premium storefronts.",
    description:
      "Fabricated stainless-steel letters in brushed or mirror finish, non-lit or halo-lit. Because fabrication varies with font, size and finish, these are priced by formal quotation.",
    highlights: [
      "Brushed or mirror finish",
      "Non-lit or halo-lit",
      "Priced by formal quotation",
      "Site visit available on request",
    ],
    intendedUse: "Corporate entrances, premium storefronts",
    environment: ["indoor", "outdoor"],
    illumination: "optional",
    pricingMode: "quote",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 300, maxWidthMm: ft(40), minHeightMm: 100, maxHeightMm: ft(6) },
    materials: ["stainless-steel"],
    thicknesses: ["20mm", "50mm"],
    lighting: ["none", "halo-lit"],
    mounting: ["standoff", "flush"],
    finishes: ["brushed", "mirror"],
    leadTime: "Confirmed with quotation",
    art: "letters",
  },
  {
    slug: "slim-led-lightbox",
    sku: "RB-LB-SLIM",
    name: "Slim LED Lightbox (Single-sided)",
    categorySlug: "lightboxes",
    summary: "A slim, wall-mounted lightbox in standard sizes for logos, menus and promotions.",
    description:
      "Aluminium frame with an evenly lit printed face. Standard sizes have a fixed price; for other sizes, request a quote. Graphic print from your artwork is included after review.",
    highlights: [
      "Standard sizes with fixed price",
      "Printed face from your artwork",
      "Wall-mounted",
      "Installation quotation available",
    ],
    intendedUse: "Menus, promotions, indoor logo display",
    environment: ["indoor"],
    illumination: "included",
    pricingMode: "fixed",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 400, maxWidthMm: 1500, minHeightMm: 300, maxHeightMm: 1000 },
    presets: [
      { id: "a2", label: "600 × 400 mm", widthMm: 600, heightMm: 400, price: 6500 },
      { id: "a1", label: "900 × 600 mm", widthMm: 900, heightMm: 600, price: 9800 },
      { id: "a0", label: "1200 × 800 mm", widthMm: 1200, heightMm: 800, price: 14500 },
    ],
    materials: ["aluminium-frame"],
    thicknesses: [],
    lighting: ["backlit"],
    mounting: ["flush"],
    finishes: ["printed"],
    leadTime: "Typically confirmed at order review",
    art: "lightbox",
    featured: true,
  },
  {
    slug: "double-sided-hanging-lightbox",
    sku: "RB-LB-DBL",
    name: "Double-sided Projecting Lightbox",
    categorySlug: "lightboxes",
    summary: "A projecting lightbox visible from both directions along the street.",
    description:
      "Double-sided lightbox mounted at a right angle to the wall so passers-by see it from both directions. Bracket and wall suitability are checked before production.",
    highlights: [
      "Visible from both directions",
      "Printed faces from your artwork",
      "Bracket and wall checks before production",
    ],
    intendedUse: "Street-facing shops, pharmacies, cafés",
    environment: ["outdoor"],
    illumination: "included",
    pricingMode: "estimate",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 400, maxWidthMm: 1500, minHeightMm: 400, maxHeightMm: 1500 },
    materials: ["aluminium-frame", "acrylic"],
    thicknesses: [],
    lighting: ["backlit"],
    mounting: ["hanging"],
    finishes: ["printed"],
    leadTime: "Confirmed after artwork approval and site details",
    art: "lightbox",
  },
  {
    slug: "acrylic-logo-plaque",
    sku: "RB-ACR-PLQ",
    name: "Acrylic Logo Plaque",
    categorySlug: "acrylic-signage",
    summary: "A crisp acrylic plaque with your logo for doors, receptions and entrances.",
    description:
      "Clear or coloured acrylic with your logo applied, mounted on stand-off spacers. Standard sizes have a fixed price.",
    highlights: ["Standard sizes with fixed price", "Stand-off mounting", "Artwork review before production"],
    intendedUse: "Office doors, receptions, entrances",
    environment: ["indoor"],
    illumination: "none",
    pricingMode: "fixed",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 200, maxWidthMm: 900, minHeightMm: 150, maxHeightMm: 600 },
    presets: [
      { id: "s", label: "300 × 200 mm", widthMm: 300, heightMm: 200, price: 2200 },
      { id: "m", label: "450 × 300 mm", widthMm: 450, heightMm: 300, price: 3600 },
      { id: "l", label: "600 × 400 mm", widthMm: 600, heightMm: 400, price: 5400 },
    ],
    materials: ["acrylic"],
    thicknesses: ["5mm", "10mm"],
    lighting: ["none"],
    mounting: ["standoff"],
    finishes: ["gloss", "matte"],
    leadTime: "Typically confirmed at order review",
    art: "plaque",
    featured: true,
  },
  {
    slug: "acrylic-wayfinding-sign",
    sku: "RB-ACR-WAY",
    name: "Directional & Information Signs",
    categorySlug: "door-wayfinding-signs",
    summary: "Directional and room signs that keep visitors oriented and on-brand.",
    description:
      "Acrylic room, floor and directional signs made in a consistent style. Order a set; we review the text list and layout before production.",
    highlights: ["Consistent set styling", "Text list reviewed before production", "Indoor use"],
    intendedUse: "Offices, clinics, malls",
    environment: ["indoor"],
    illumination: "none",
    pricingMode: "fixed",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 150, maxWidthMm: 600, minHeightMm: 100, maxHeightMm: 400 },
    presets: [
      { id: "door", label: "200 × 100 mm (door sign)", widthMm: 200, heightMm: 100, price: 900 },
      { id: "dir", label: "400 × 150 mm (directional)", widthMm: 400, heightMm: 150, price: 1600 },
    ],
    materials: ["acrylic"],
    thicknesses: ["3mm", "5mm"],
    lighting: ["none"],
    mounting: ["flush", "standoff"],
    finishes: ["gloss", "matte"],
    leadTime: "Typically confirmed at order review",
    art: "wayfinding",
  },
  {
    slug: "neon-style-flex-sign",
    sku: "RB-LED-NEON",
    name: "Custom Single-colour LED Neon Sign",
    categorySlug: "led-neon-signs",
    summary: "Your logo or phrase in flexible neon-style LED on an acrylic backing.",
    description:
      "Bendable LED tube shaped to your artwork and mounted on clear or coloured acrylic. Ideal for feature walls and window displays. Complex scripts may need simplification — we will advise after reviewing your file.",
    highlights: [
      "Shaped to your artwork",
      "Choice of light colour",
      "Artwork simplification advice if needed",
    ],
    intendedUse: "Cafés, feature walls, window displays",
    environment: ["indoor"],
    illumination: "included",
    pricingMode: "estimate",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 300, maxWidthMm: 2400, minHeightMm: 150, maxHeightMm: 1200 },
    materials: ["neon-flex"],
    thicknesses: ["5mm", "10mm"],
    lighting: ["neon"],
    mounting: ["standoff", "hanging"],
    finishes: ["gloss"],
    leadTime: "Confirmed after artwork approval",
    art: "neon",
    featured: true,
  },
  {
    slug: "reception-logo-sign",
    sku: "RB-IN-REC",
    name: "Reception Logo Sign",
    categorySlug: "indoor-branding",
    summary: "A dimensional logo for your reception or lobby wall.",
    description:
      "Acrylic or metal-finish logo and name for reception walls, with optional halo lighting. Wall type and power position are confirmed before installation.",
    highlights: ["Acrylic or metal-finish options", "Optional halo lighting", "Wall and power checks"],
    intendedUse: "Reception and lobby walls",
    environment: ["indoor"],
    illumination: "optional",
    pricingMode: "estimate",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 400, maxWidthMm: ft(16), minHeightMm: 150, maxHeightMm: ft(5) },
    materials: ["acrylic", "stainless-steel"],
    thicknesses: ["10mm", "20mm"],
    lighting: ["none", "halo-lit"],
    mounting: ["standoff", "flush"],
    finishes: ["gloss", "matte", "brushed"],
    leadTime: "Confirmed after artwork approval",
    art: "reception",
  },
  {
    slug: "window-graphics",
    sku: "RB-PRO-WIN",
    name: "Window Graphics",
    categorySlug: "promotional-graphics",
    summary: "Printed or cut vinyl graphics for shop windows and glass partitions.",
    description:
      "Campaign, branding or privacy graphics applied to glass. Measure your glass panels and we'll prepare a layout for approval.",
    highlights: ["Printed or cut vinyl", "Layout proof for approval", "Application available on request"],
    intendedUse: "Shop windows, glass partitions",
    environment: ["indoor", "outdoor"],
    illumination: "none",
    pricingMode: "estimate",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 300, maxWidthMm: ft(30), minHeightMm: 300, maxHeightMm: ft(12) },
    materials: ["vinyl"],
    thicknesses: [],
    lighting: ["none"],
    mounting: ["adhesive"],
    finishes: ["printed", "matte", "gloss"],
    leadTime: "Confirmed after artwork approval",
    art: "window",
  },
  {
    slug: "pos-display-panel",
    sku: "RB-PRO-POS",
    name: "POS Display Panel",
    categorySlug: "promotional-graphics",
    summary: "A freestanding printed panel for counters and in-store promotions.",
    description:
      "Printed PVC foam board panel with stand, in standard sizes. Ideal for launches, offers and counter displays.",
    highlights: ["Standard sizes with fixed price", "Printed from your artwork", "Freestanding"],
    intendedUse: "Counters, in-store promotions",
    environment: ["indoor"],
    illumination: "none",
    pricingMode: "fixed",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 200, maxWidthMm: 900, minHeightMm: 300, maxHeightMm: 1800 },
    presets: [
      { id: "counter", label: "300 × 420 mm (counter)", widthMm: 300, heightMm: 420, price: 1200 },
      { id: "floor", label: "600 × 1500 mm (floor stand)", widthMm: 600, heightMm: 1500, price: 4200 },
    ],
    materials: ["pvc-foam"],
    thicknesses: ["5mm"],
    lighting: ["none"],
    mounting: ["freestanding"],
    finishes: ["printed"],
    leadTime: "Typically confirmed at order review",
    art: "pos",
  },
  {
    slug: "rooftop-signboard",
    sku: "RB-OUT-ROOF",
    name: "Rooftop Signboard",
    categorySlug: "outdoor-signboards",
    summary: "Large-format rooftop signage — subject to structural engineering and site survey.",
    description:
      "Rooftop signs require a site survey, structural assessment and any necessary permissions before a quotation can be issued. Share your location and approximate size to start.",
    highlights: ["Site survey required", "Structural assessment before quotation", "Priced by formal quotation"],
    intendedUse: "Building identity, high-visibility locations",
    environment: ["outdoor"],
    illumination: "optional",
    pricingMode: "quote",
    dimensionMeaning: "outer",
    limits: { minWidthMm: ft(8), maxWidthMm: ft(100), minHeightMm: ft(3), maxHeightMm: ft(20) },
    materials: ["acp", "acrylic"],
    thicknesses: ["20mm", "50mm"],
    lighting: ["none", "front-lit", "backlit"],
    mounting: ["frame"],
    finishes: ["gloss", "matte"],
    leadTime: "Confirmed after site survey",
    art: "rooftop",
  },

  /* ---------------- Illuminated (LED) letters ---------------- */
  {
    slug: "front-lit-trim-cap-channel-letters",
    sku: "RB-LIT-TCAP",
    name: "Front-lit Trim-cap Channel Letters",
    categorySlug: "illuminated-letters",
    summary: "Classic illuminated channel letters with an acrylic face held by a trim-cap edge — bright, readable storefront lettering.",
    description:
      "Each letter is built as an individual channel with metal returns, LED modules inside and a translucent acrylic face framed by a trim cap. A dependable choice for shop fronts and building fascias. Wall structure and power position are confirmed before production.",
    highlights: ["Individually built letters", "Face colour to match your brand", "Indoor or outdoor (subject to specification)", "Installation quotation available"],
    intendedUse: "Storefronts, building fascia, mall frontages",
    environment: ["indoor", "outdoor"],
    illumination: "included",
    pricingMode: "estimate",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 600, maxWidthMm: ft(60), minHeightMm: 200, maxHeightMm: ft(8) },
    materials: ["aluminium"],
    thicknesses: ["50mm", "100mm"],
    lighting: ["front-lit"],
    mounting: ["flush", "frame"],
    finishes: ["painted", "gloss"],
    leadTime: "Confirmed after artwork approval and site details",
    art: "channel",
    featured: true,
  },
  {
    slug: "front-lit-rimless-letters",
    sku: "RB-LIT-RIM",
    name: "Front-lit Rimless Letters",
    categorySlug: "illuminated-letters",
    summary: "Illuminated letters with a clean, frameless acrylic face for a modern, minimal look.",
    description:
      "The acrylic face sits flush without a visible trim edge, so letters look crisp both day and night. Well suited to modern brands and premium interiors or fascias.",
    highlights: ["No visible trim edge", "Even face illumination", "Indoor or outdoor (subject to specification)", "Artwork review before production"],
    intendedUse: "Modern storefronts, showrooms, lobbies",
    environment: ["indoor", "outdoor"],
    illumination: "included",
    pricingMode: "estimate",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 500, maxWidthMm: ft(50), minHeightMm: 150, maxHeightMm: ft(6) },
    materials: ["acrylic"],
    thicknesses: ["50mm", "100mm"],
    lighting: ["front-lit"],
    mounting: ["flush", "standoff", "frame"],
    finishes: ["gloss", "matte"],
    leadTime: "Confirmed after artwork approval and site details",
    art: "channel",
  },
  {
    slug: "luxury-halo-lit-letters",
    sku: "RB-LIT-HALO-LX",
    name: "Luxury Halo-lit (Back-lit) Letters",
    categorySlug: "illuminated-letters",
    summary: "Solid metal-faced letters that glow softly onto the wall behind — an elegant, high-end look.",
    description:
      "Letters with an opaque metal face (brushed, mirror or painted) and LEDs behind, mounted on spacers so light washes the wall to create a halo. Popular for luxury retail, hotels and corporate receptions.",
    highlights: ["Soft halo glow on the wall", "Brushed, mirror or painted metal faces", "Stand-off mounting", "Priced after artwork review"],
    intendedUse: "Luxury retail, hotels, corporate receptions",
    environment: ["indoor", "outdoor"],
    illumination: "included",
    pricingMode: "estimate",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 500, maxWidthMm: ft(40), minHeightMm: 150, maxHeightMm: ft(6) },
    materials: ["stainless-steel", "brass"],
    thicknesses: ["50mm", "100mm"],
    lighting: ["halo-lit"],
    mounting: ["standoff"],
    finishes: ["brushed", "mirror", "painted"],
    leadTime: "Confirmed after artwork approval",
    art: "letters",
    featured: true,
  },
  {
    slug: "halo-lit-letters",
    sku: "RB-LIT-HALO",
    name: "Halo-lit (Back-lit) Letters — Standard",
    categorySlug: "illuminated-letters",
    summary: "Back-lit letters with a painted aluminium face — the halo effect at a more accessible specification.",
    description:
      "Aluminium letters with a painted face and LEDs on the back, mounted off the wall so the light creates a soft outline. A practical choice for offices, cafés and clinics.",
    highlights: ["Soft halo outline", "Painted face in your brand colour", "Stand-off mounting", "Installation quotation available"],
    intendedUse: "Offices, cafés, clinics",
    environment: ["indoor", "outdoor"],
    illumination: "included",
    pricingMode: "estimate",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 500, maxWidthMm: ft(40), minHeightMm: 150, maxHeightMm: ft(6) },
    materials: ["aluminium"],
    thicknesses: ["50mm", "100mm"],
    lighting: ["halo-lit"],
    mounting: ["standoff"],
    finishes: ["painted"],
    leadTime: "Confirmed after artwork approval",
    art: "letters",
  },
  {
    slug: "front-and-back-lit-letters",
    sku: "RB-LIT-DUAL",
    name: "Front & Back-lit Letters",
    categorySlug: "illuminated-letters",
    summary: "Letters that light up on the face and glow behind at the same time — maximum presence after dark.",
    description:
      "Combines a lit acrylic face with a halo glow on the wall behind. A striking option for flagship stores and main entrances where night visibility matters.",
    highlights: ["Lit face plus halo glow", "Rimless acrylic face", "Stand-off mounting", "Power and site checks before production"],
    intendedUse: "Flagship stores, main entrances",
    environment: ["indoor", "outdoor"],
    illumination: "included",
    pricingMode: "estimate",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 600, maxWidthMm: ft(50), minHeightMm: 200, maxHeightMm: ft(6) },
    materials: ["acrylic", "aluminium"],
    thicknesses: ["50mm", "100mm"],
    lighting: ["front-back-lit"],
    mounting: ["standoff"],
    finishes: ["gloss", "painted"],
    leadTime: "Confirmed after artwork approval and site details",
    art: "channel",
  },
  {
    slug: "acrylic-channel-letters",
    sku: "RB-LIT-ACR",
    name: "LED Acrylic Channel Letters",
    categorySlug: "illuminated-letters",
    summary: "Fully acrylic illuminated letters — the whole letter glows, not just the face.",
    description:
      "Letters built from acrylic sides and face with LEDs inside, so the light shows through the returns as well as the front. A bright, cost-conscious illuminated option for shops and kiosks.",
    highlights: ["Whole letter glows", "Many acrylic colours", "Cost-conscious illuminated option", "Artwork review before production"],
    intendedUse: "Shops, kiosks, food courts",
    environment: ["indoor", "outdoor"],
    illumination: "included",
    pricingMode: "estimate",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 400, maxWidthMm: ft(40), minHeightMm: 150, maxHeightMm: ft(5) },
    materials: ["acrylic"],
    thicknesses: ["50mm", "100mm"],
    lighting: ["front-lit"],
    mounting: ["flush", "frame"],
    finishes: ["gloss"],
    leadTime: "Confirmed after artwork approval",
    art: "channel",
  },
  {
    slug: "mini-led-acrylic-letters",
    sku: "RB-LIT-MINI",
    name: "Mini LED Acrylic Letters",
    categorySlug: "illuminated-letters",
    summary: "Slim, small-format illuminated letters for interiors — front, side, back or combined lighting.",
    description:
      "Compact acrylic letters with thin LED modules, designed for small text and logos indoors: reception desks, shelving headers, counters and display walls. Choose front-lit, side-lit, back-lit, front-and-back or front-and-side lighting.",
    highlights: ["Slim profile for small text", "Five lighting styles", "Indoor use", "Artwork review before production"],
    intendedUse: "Reception desks, counters, display walls",
    environment: ["indoor"],
    illumination: "included",
    pricingMode: "estimate",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 200, maxWidthMm: 3000, minHeightMm: 50, maxHeightMm: 600 },
    materials: ["acrylic"],
    thicknesses: ["10mm", "20mm"],
    lighting: ["front-lit", "side-lit", "halo-lit", "front-back-lit", "front-side-lit"],
    mounting: ["flush", "standoff"],
    finishes: ["gloss", "matte"],
    leadTime: "Confirmed after artwork approval",
    art: "letters",
  },
  {
    slug: "infinity-mirror-letters",
    sku: "RB-LIT-INF",
    name: "Infinity Mirror Letters & Signs",
    categorySlug: "illuminated-letters",
    summary: "Letters with an infinity-mirror effect — LED lines that appear to repeat endlessly into the sign.",
    description:
      "A two-way mirror face and LED track inside create a tunnel-like depth effect. An eye-catching feature for interiors, events and photo spots. Because construction varies with each design, these are priced by quotation.",
    highlights: ["Infinity depth effect", "Feature-wall centrepiece", "Indoor use", "Priced by formal quotation"],
    intendedUse: "Feature walls, events, photo spots",
    environment: ["indoor"],
    illumination: "included",
    pricingMode: "quote",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 400, maxWidthMm: 4000, minHeightMm: 150, maxHeightMm: 1500 },
    materials: ["mirror-acrylic"],
    thicknesses: ["50mm", "100mm"],
    lighting: ["front-lit"],
    mounting: ["flush", "standoff"],
    finishes: ["mirror"],
    leadTime: "Confirmed with quotation",
    art: "mirror",
  },

  /* ---------------- Non-illuminated letters ---------------- */
  {
    slug: "cut-stainless-steel-letters",
    sku: "RB-3D-SSCUT",
    name: "Cut Stainless Steel Letters",
    categorySlug: "3d-letters",
    summary: "Flat letters precision-cut from solid stainless steel sheet — crisp, durable and understated.",
    description:
      "Letters and logos cut from stainless sheet in brushed, mirror or painted finish, mounted flush or on spacers. Ideal for reception walls, name plates and building identity where fabricated depth isn't needed.",
    highlights: ["Precision-cut from sheet", "Brushed, mirror or painted", "Flush or stand-off mounting", "Artwork review before production"],
    intendedUse: "Reception walls, building identity",
    environment: ["indoor", "outdoor"],
    illumination: "none",
    pricingMode: "estimate",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 200, maxWidthMm: ft(30), minHeightMm: 50, maxHeightMm: ft(4) },
    materials: ["stainless-steel"],
    thicknesses: ["3mm", "5mm", "10mm"],
    lighting: ["none"],
    mounting: ["flush", "standoff"],
    finishes: ["brushed", "mirror", "painted"],
    leadTime: "Confirmed after artwork approval",
    art: "letters",
  },

  /* ---------------- Lightboxes ---------------- */
  {
    slug: "push-through-lightbox",
    sku: "RB-LB-PUSH",
    name: "Push-through Acrylic Lightbox",
    categorySlug: "lightboxes",
    summary: "A lightbox where thick acrylic letters push through the face and glow — premium depth on a lit panel.",
    description:
      "Cut acrylic letters and logo pass through a routed aluminium face so only the graphics light up. Cleaner and more premium than a printed lightbox face.",
    highlights: ["Only the graphics glow", "Routed aluminium face", "Wall-mounted", "Installation quotation available"],
    intendedUse: "Storefronts, receptions, mall outlets",
    environment: ["indoor", "outdoor"],
    illumination: "included",
    pricingMode: "estimate",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 600, maxWidthMm: ft(30), minHeightMm: 300, maxHeightMm: ft(6) },
    materials: ["aluminium-frame"],
    thicknesses: [],
    lighting: ["backlit"],
    mounting: ["flush", "frame"],
    finishes: ["painted"],
    leadTime: "Confirmed after artwork approval and site details",
    art: "lightbox",
  },
  {
    slug: "embedded-lightbox",
    sku: "RB-LB-EMB",
    name: "Embedded (Inlaid) Acrylic Lightbox",
    categorySlug: "lightboxes",
    summary: "Acrylic graphics inlaid flush into the lightbox face for a smooth, seamless finish.",
    description:
      "Graphics are inlaid level with the face rather than projecting, giving a smooth surface that is easy to clean and looks refined indoors and out.",
    highlights: ["Flush, seamless face", "Lit graphics only", "Easy-clean surface", "Installation quotation available"],
    intendedUse: "Storefronts, clinics, offices",
    environment: ["indoor", "outdoor"],
    illumination: "included",
    pricingMode: "estimate",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 600, maxWidthMm: ft(30), minHeightMm: 300, maxHeightMm: ft(6) },
    materials: ["aluminium-frame"],
    thicknesses: [],
    lighting: ["backlit"],
    mounting: ["flush", "frame"],
    finishes: ["painted"],
    leadTime: "Confirmed after artwork approval and site details",
    art: "lightbox",
  },
  {
    slug: "double-sided-push-through-lightbox",
    sku: "RB-LB-DBL-PUSH",
    name: "Double-sided Push-through Lightbox",
    categorySlug: "lightboxes",
    summary: "A projecting lightbox with push-through acrylic graphics on both faces.",
    description:
      "Mounted at right angles to the wall so passers-by see your lit logo from both directions, with premium push-through graphics on each face. Bracket and wall suitability are checked first.",
    highlights: ["Visible from both directions", "Push-through graphics both sides", "Bracket and wall checks before production"],
    intendedUse: "Street-facing shops, pharmacies, cafés",
    environment: ["outdoor", "indoor"],
    illumination: "included",
    pricingMode: "estimate",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 400, maxWidthMm: 1500, minHeightMm: 400, maxHeightMm: 1500 },
    materials: ["aluminium-frame"],
    thicknesses: [],
    lighting: ["backlit"],
    mounting: ["hanging"],
    finishes: ["painted"],
    leadTime: "Confirmed after artwork approval and site details",
    art: "lightbox",
  },
  {
    slug: "double-sided-embedded-lightbox",
    sku: "RB-LB-DBL-EMB",
    name: "Double-sided Embedded Lightbox",
    categorySlug: "lightboxes",
    summary: "A projecting lightbox with flush, inlaid acrylic graphics on both faces.",
    description:
      "Seamless inlaid graphics on both sides of a projecting box — refined, easy to clean and readable from either direction along the street.",
    highlights: ["Visible from both directions", "Flush inlaid graphics", "Bracket and wall checks before production"],
    intendedUse: "Street-facing shops, malls",
    environment: ["outdoor", "indoor"],
    illumination: "included",
    pricingMode: "estimate",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 400, maxWidthMm: 1500, minHeightMm: 400, maxHeightMm: 1500 },
    materials: ["aluminium-frame"],
    thicknesses: [],
    lighting: ["backlit"],
    mounting: ["hanging"],
    finishes: ["painted"],
    leadTime: "Confirmed after artwork approval and site details",
    art: "lightbox",
  },

  /* ---------------- Neon ---------------- */
  {
    slug: "acrylic-faux-neon-180",
    sku: "RB-NEON-AC180",
    name: "Acrylic Faux-neon Sign (180° glow)",
    categorySlug: "led-neon-signs",
    summary: "The look of neon from shaped acrylic and LEDs, glowing towards the front.",
    description:
      "Neon-look lettering made from cut acrylic with LED illumination, designed to be viewed from the front. Lightweight and well suited to walls and windows.",
    highlights: ["Neon look without glass tubes", "Front-facing glow", "Lightweight", "Choice of light colour"],
    intendedUse: "Feature walls, cafés, salons",
    environment: ["indoor"],
    illumination: "included",
    pricingMode: "estimate",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 300, maxWidthMm: 2400, minHeightMm: 150, maxHeightMm: 1200 },
    materials: ["acrylic"],
    thicknesses: ["10mm", "20mm"],
    lighting: ["neon"],
    mounting: ["standoff", "hanging"],
    finishes: ["gloss"],
    leadTime: "Confirmed after artwork approval",
    art: "neon",
  },
  {
    slug: "acrylic-faux-neon-360",
    sku: "RB-NEON-AC360",
    name: "Acrylic Faux-neon Sign (360° glow)",
    categorySlug: "led-neon-signs",
    summary: "Neon-look acrylic that glows all the way around — made to hang in windows or open spaces.",
    description:
      "All-round illuminated acrylic neon-look lettering that reads from both front and back. Ideal for window displays and suspended signs.",
    highlights: ["Glows on all sides", "Readable from front and back", "Hanging or window display", "Choice of light colour"],
    intendedUse: "Shop windows, suspended signs",
    environment: ["indoor"],
    illumination: "included",
    pricingMode: "estimate",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 300, maxWidthMm: 2400, minHeightMm: 150, maxHeightMm: 1200 },
    materials: ["acrylic"],
    thicknesses: ["10mm", "20mm"],
    lighting: ["neon"],
    mounting: ["hanging", "standoff"],
    finishes: ["gloss"],
    leadTime: "Confirmed after artwork approval",
    art: "neon",
  },
  {
    slug: "rgb-dimmable-led-neon",
    sku: "RB-NEON-RGB",
    name: "Multi-colour / RGB Dimmable LED Neon",
    categorySlug: "led-neon-signs",
    summary: "Flexible LED neon that changes colour and brightness with a controller.",
    description:
      "Silicone LED neon with RGB or multi-colour LEDs and a dimmer/controller, so you can change colours for moods, events or promotions.",
    highlights: ["Colour-changing", "Dimmable with controller", "Shaped to your artwork", "Indoor use"],
    intendedUse: "Restaurants, bars, events, retail displays",
    environment: ["indoor"],
    illumination: "included",
    pricingMode: "estimate",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 300, maxWidthMm: 2400, minHeightMm: 150, maxHeightMm: 1200 },
    materials: ["neon-flex"],
    thicknesses: ["5mm", "10mm"],
    lighting: ["rgb"],
    mounting: ["standoff", "hanging"],
    finishes: ["gloss"],
    leadTime: "Confirmed after artwork approval",
    art: "neon",
  },
  {
    slug: "outdoor-flexible-led-neon",
    sku: "RB-NEON-OUT",
    name: "Outdoor Flexible LED Neon Sign",
    categorySlug: "led-neon-signs",
    summary: "Flexible LED neon specified for exterior use on shop fronts and terraces.",
    description:
      "Silicone LED neon mounted on an exterior-grade backing with outdoor-rated components. Exact outdoor suitability, power supply location and protection are confirmed for your site before production.",
    highlights: ["Exterior specification", "Shaped to your artwork", "Site and power checks first", "Installation quotation available"],
    intendedUse: "Shop fronts, terraces, outdoor seating",
    environment: ["outdoor"],
    illumination: "included",
    pricingMode: "estimate",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 500, maxWidthMm: 4000, minHeightMm: 200, maxHeightMm: 2000 },
    materials: ["neon-flex"],
    thicknesses: ["10mm", "20mm"],
    lighting: ["neon"],
    mounting: ["standoff", "frame"],
    finishes: ["gloss"],
    leadTime: "Confirmed after artwork approval and site details",
    art: "neon",
  },
  {
    slug: "large-format-neon-sign",
    sku: "RB-NEON-XL",
    name: "Large-format Neon Sign",
    categorySlug: "led-neon-signs",
    summary: "Big, bold LED neon for storefronts, building walls and brand installations.",
    description:
      "Large neon artworks built in sections on a structural backing. Size, structure, power and access all affect the build, so these are priced by formal quotation after review.",
    highlights: ["Large storefront or wall scale", "Built in sections", "Site survey recommended", "Priced by formal quotation"],
    intendedUse: "Storefronts, building walls, brand installations",
    environment: ["indoor", "outdoor"],
    illumination: "included",
    pricingMode: "quote",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 1500, maxWidthMm: ft(40), minHeightMm: 500, maxHeightMm: ft(12) },
    materials: ["neon-flex"],
    thicknesses: ["10mm", "20mm"],
    lighting: ["neon", "rgb"],
    mounting: ["frame", "standoff"],
    finishes: ["gloss"],
    leadTime: "Confirmed after site survey",
    art: "neon",
  },

  /* ---------------- Door, room & wayfinding ---------------- */
  {
    slug: "office-door-room-number-signs",
    sku: "RB-WAY-DOOR",
    name: "Office Door & Room Number Signs",
    categorySlug: "door-wayfinding-signs",
    summary: "Consistent door name plates and room numbers for offices, clinics and hotels.",
    description:
      "Acrylic or metal-look door signs with names, room numbers and icons in your brand style. Order a set; we review the text list and layout before production.",
    highlights: ["Standard sizes with fixed price", "Consistent set styling", "Text list reviewed before production"],
    intendedUse: "Offices, clinics, hotels, schools",
    environment: ["indoor"],
    illumination: "none",
    pricingMode: "fixed",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 100, maxWidthMm: 400, minHeightMm: 80, maxHeightMm: 300 },
    presets: [
      { id: "num", label: "150 × 100 mm (room number)", widthMm: 150, heightMm: 100, price: 750 },
      { id: "name", label: "250 × 100 mm (name plate)", widthMm: 250, heightMm: 100, price: 1100 },
      { id: "dept", label: "300 × 150 mm (department)", widthMm: 300, heightMm: 150, price: 1500 },
    ],
    materials: ["acrylic"],
    thicknesses: ["3mm", "5mm"],
    lighting: ["none"],
    mounting: ["flush", "standoff"],
    finishes: ["gloss", "matte", "brushed"],
    leadTime: "Typically confirmed at order review",
    art: "door",
  },
  {
    slug: "floor-directory-lobby-signs",
    sku: "RB-WAY-DIR",
    name: "Floor Directory & Lobby Signs",
    categorySlug: "door-wayfinding-signs",
    summary: "Building and floor directories that help visitors find the right tenant or department.",
    description:
      "Wall-mounted or freestanding directories listing floors, tenants or departments, designed so entries can be updated. We review your directory list and layout before production.",
    highlights: ["Updatable entries", "Wall or freestanding", "Layout proof before production"],
    intendedUse: "Office buildings, hospitals, malls",
    environment: ["indoor"],
    illumination: "optional",
    pricingMode: "estimate",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 400, maxWidthMm: 3000, minHeightMm: 400, maxHeightMm: 2400 },
    materials: ["acrylic", "aluminium-frame"],
    thicknesses: ["5mm", "10mm"],
    lighting: ["none", "backlit"],
    mounting: ["flush", "freestanding"],
    finishes: ["printed", "brushed"],
    leadTime: "Confirmed after layout approval",
    art: "wayfinding",
  },
  {
    slug: "tactile-braille-room-signs",
    sku: "RB-WAY-TAC",
    name: "Tactile & Braille Room Signs",
    categorySlug: "door-wayfinding-signs",
    summary: "Room signs with raised characters and Braille for more inclusive buildings.",
    description:
      "Signs with raised lettering, Braille and high-contrast colours. If your project must meet a specific accessibility standard, share it with us and we will confirm what can be met in the quotation.",
    highlights: ["Raised characters and Braille", "High-contrast design", "Standard requirements confirmed in quotation"],
    intendedUse: "Hospitals, offices, public buildings",
    environment: ["indoor"],
    illumination: "none",
    pricingMode: "quote",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 100, maxWidthMm: 400, minHeightMm: 100, maxHeightMm: 400 },
    materials: ["acrylic"],
    thicknesses: ["3mm", "5mm"],
    lighting: ["none"],
    mounting: ["flush"],
    finishes: ["matte"],
    leadTime: "Confirmed with quotation",
    art: "door",
  },

  /* ---------------- Pylons & monuments ---------------- */
  {
    slug: "brand-pylon-sign",
    sku: "RB-PYL-BRAND",
    name: "Brand Pylon Sign",
    categorySlug: "pylon-monument-signs",
    summary: "A tall, freestanding sign that shows your brand from the road and the car park.",
    description:
      "Freestanding pylon with illuminated logo panels on a structural frame and foundation. Requires a site survey, structural design and any necessary permissions before quotation.",
    highlights: ["Visible from distance", "Illuminated logo panels", "Structure and foundation designed per site", "Priced by formal quotation"],
    intendedUse: "Showrooms, fuel stations, car dealerships, hospitals",
    environment: ["outdoor"],
    illumination: "optional",
    pricingMode: "quote",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 600, maxWidthMm: 4000, minHeightMm: 2000, maxHeightMm: ft(40) },
    materials: ["acp", "aluminium-frame"],
    thicknesses: [],
    lighting: ["none", "backlit"],
    mounting: ["ground"],
    finishes: ["painted"],
    leadTime: "Confirmed after site survey",
    art: "pylon",
    featured: true,
  },
  {
    slug: "entrance-monument-sign",
    sku: "RB-PYL-MON",
    name: "Entrance Monument Sign",
    categorySlug: "pylon-monument-signs",
    summary: "A low, solid landmark sign at your gate or entrance.",
    description:
      "Ground-mounted entrance sign in metal, ACP or stone-effect cladding with fabricated or lit letters. Ideal for factories, campuses, housing projects and corporate sites.",
    highlights: ["Landmark at your entrance", "Fabricated or illuminated letters", "Site survey required", "Priced by formal quotation"],
    intendedUse: "Factories, campuses, housing projects",
    environment: ["outdoor"],
    illumination: "optional",
    pricingMode: "quote",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 1000, maxWidthMm: ft(40), minHeightMm: 500, maxHeightMm: 3000 },
    materials: ["acp", "stainless-steel"],
    thicknesses: [],
    lighting: ["none", "front-lit", "halo-lit"],
    mounting: ["ground"],
    finishes: ["painted", "brushed"],
    leadTime: "Confirmed after site survey",
    art: "pylon",
  },
  {
    slug: "multi-tenant-pylon-sign",
    sku: "RB-PYL-MULTI",
    name: "Multi-tenant Directory Pylon",
    categorySlug: "pylon-monument-signs",
    summary: "One pylon listing every tenant in a mall, market or commercial building, with changeable panels.",
    description:
      "Freestanding pylon with separate, replaceable tenant panels so the directory can be updated as tenants change. Structure is designed for the site.",
    highlights: ["Replaceable tenant panels", "Optional illumination", "Site survey required", "Priced by formal quotation"],
    intendedUse: "Shopping malls, markets, commercial buildings",
    environment: ["outdoor"],
    illumination: "optional",
    pricingMode: "quote",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 800, maxWidthMm: 4000, minHeightMm: 2000, maxHeightMm: ft(40) },
    materials: ["aluminium-frame", "acp"],
    thicknesses: [],
    lighting: ["none", "backlit"],
    mounting: ["ground"],
    finishes: ["painted", "printed"],
    leadTime: "Confirmed after site survey",
    art: "pylon",
  },
  {
    slug: "digital-led-display-pylon",
    sku: "RB-PYL-LED",
    name: "Pylon with Digital LED Display",
    categorySlug: "pylon-monument-signs",
    summary: "A pylon sign with a built-in LED screen for prices, offers or messages.",
    description:
      "Combines a branded pylon with a digital LED display module for changing content. Screen size, pixel pitch, power and content control are specified during the quotation.",
    highlights: ["Changeable digital content", "Branded pylon structure", "Screen specification in quotation", "Priced by formal quotation"],
    intendedUse: "Fuel stations, retail parks, hospitals",
    environment: ["outdoor"],
    illumination: "included",
    pricingMode: "quote",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 800, maxWidthMm: 4000, minHeightMm: 2000, maxHeightMm: ft(40) },
    materials: ["aluminium-frame", "acp"],
    thicknesses: [],
    lighting: ["digital"],
    mounting: ["ground"],
    finishes: ["painted"],
    leadTime: "Confirmed after site survey",
    art: "pylon",
  },

  /* ---------------- Metal plaques & relief ---------------- */
  {
    slug: "metal-relief-door-plaque",
    sku: "RB-MTL-PLQ",
    name: "Etched or Relief Metal Door Plaque",
    categorySlug: "metal-plaques-relief",
    summary: "A brass or stainless plaque with etched or raised lettering for entrances and offices.",
    description:
      "Metal plaques with etched (engraved) or raised relief lettering and logo, filled with colour where needed. A lasting, formal sign for company entrances, chambers and offices.",
    highlights: ["Brass or stainless steel", "Etched or raised lettering", "Artwork proof before production"],
    intendedUse: "Company entrances, chambers, offices",
    environment: ["indoor", "outdoor"],
    illumination: "none",
    pricingMode: "estimate",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 150, maxWidthMm: 1200, minHeightMm: 100, maxHeightMm: 900 },
    materials: ["brass", "stainless-steel"],
    thicknesses: ["3mm", "5mm"],
    lighting: ["none"],
    mounting: ["flush", "standoff"],
    finishes: ["etched", "brushed", "mirror"],
    leadTime: "Confirmed after artwork approval",
    art: "relief",
  },
  {
    slug: "commemorative-plaque",
    sku: "RB-MTL-MEM",
    name: "Commemorative & Foundation Plaque",
    categorySlug: "metal-plaques-relief",
    summary: "Inauguration, foundation-stone and memorial plaques in etched or cast-look metal.",
    description:
      "Formal plaques recording an inauguration, foundation, donation or memorial. Text, logos and seals are laid out for your approval before production.",
    highlights: ["Inauguration and foundation plaques", "Text layout approved by you", "Priced by formal quotation"],
    intendedUse: "Buildings, institutions, monuments",
    environment: ["indoor", "outdoor"],
    illumination: "none",
    pricingMode: "quote",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 200, maxWidthMm: 2000, minHeightMm: 150, maxHeightMm: 1500 },
    materials: ["brass", "stainless-steel"],
    thicknesses: ["3mm", "5mm"],
    lighting: ["none"],
    mounting: ["flush", "standoff"],
    finishes: ["etched", "brushed"],
    leadTime: "Confirmed with quotation",
    art: "relief",
  },
  {
    slug: "relief-wall-mural-logo-backdrop",
    sku: "RB-MTL-MURAL",
    name: "Relief Wall Mural & Logo Backdrop",
    categorySlug: "metal-plaques-relief",
    summary: "A dimensional metal relief of your logo or artwork as a reception or lobby backdrop.",
    description:
      "Large raised-relief artwork in metal finishes, built as a feature wall behind a reception desk or in a lobby. Designed and priced per project.",
    highlights: ["Dimensional relief artwork", "Feature-wall scale", "Design support available", "Priced by formal quotation"],
    intendedUse: "Receptions, lobbies, showrooms",
    environment: ["indoor"],
    illumination: "optional",
    pricingMode: "quote",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 800, maxWidthMm: ft(30), minHeightMm: 500, maxHeightMm: ft(12) },
    materials: ["stainless-steel", "brass"],
    thicknesses: ["5mm", "10mm"],
    lighting: ["none", "halo-lit"],
    mounting: ["standoff", "frame"],
    finishes: ["brushed", "mirror", "painted"],
    leadTime: "Confirmed with quotation",
    art: "relief",
  },
  {
    slug: "decorative-relief-screen",
    sku: "RB-MTL-SCR",
    name: "Decorative Metal Screen & Art Relief",
    categorySlug: "metal-plaques-relief",
    summary: "Laser-cut decorative screens and art reliefs for partitions, façades and interiors.",
    description:
      "Patterned or artistic metal panels used as room dividers, façade features or wall art, with optional backlighting. Pattern, size and fixing are developed with you.",
    highlights: ["Custom patterns or artwork", "Partitions, façades or wall art", "Optional backlighting", "Priced by formal quotation"],
    intendedUse: "Interiors, façades, hospitality",
    environment: ["indoor", "outdoor"],
    illumination: "optional",
    pricingMode: "quote",
    dimensionMeaning: "outer",
    limits: { minWidthMm: 500, maxWidthMm: ft(30), minHeightMm: 500, maxHeightMm: ft(12) },
    materials: ["stainless-steel", "aluminium"],
    thicknesses: ["3mm", "5mm"],
    lighting: ["none", "backlit"],
    mounting: ["frame", "standoff"],
    finishes: ["painted", "brushed"],
    leadTime: "Confirmed with quotation",
    art: "relief",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function productsInCategory(slug: string) {
  return products.filter((p) => p.categorySlug === slug);
}

/* ------------------------------------------------------------------ */
/* Solutions, services, materials, FAQ                                 */
/* ------------------------------------------------------------------ */

export type Solution = {
  slug: string;
  name: string;
  headline: string;
  intro: string;
  considerations: string[];
  productSlugs: string[];
};

export const solutions: Solution[] = [
  {
    slug: "fashion",
    name: "Fashion",
    headline: "Signage that matches your collection",
    intro:
      "Fashion showrooms rely on a refined, consistent look — from the fascia to the fitting rooms.",
    considerations: ["Premium finishes that suit the brand", "Window graphics for seasonal campaigns", "Reception and cash-counter branding"],
    productSlugs: ["luxury-halo-lit-letters", "front-lit-rimless-letters", "window-graphics", "acrylic-faux-neon-180"],
  },
  {
    slug: "grocery-super-shop",
    name: "Grocery & Super Shop",
    headline: "Clear signage for busy shoppers",
    intro: "Super shops need strong street visibility and clear in-store navigation for many product sections.",
    considerations: ["Large, readable fascia", "Aisle and section wayfinding", "Promotional panels for offers"],
    productSlugs: ["illuminated-acp-signboard", "acrylic-wayfinding-sign", "pos-display-panel"],
  },
  {
    slug: "pharmacy",
    name: "Pharmacy",
    headline: "Recognisable day and night",
    intro: "Pharmacies are often searched for after dark — illumination and a projecting sign help customers find you.",
    considerations: ["Illuminated fascia", "Projecting double-sided lightbox", "Clean interior information signs"],
    productSlugs: ["illuminated-acp-signboard", "double-sided-push-through-lightbox", "acrylic-logo-plaque"],
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    headline: "Atmosphere that starts at the door",
    intro: "Restaurants and cafés use signage to set the mood — from the street sign to the feature wall.",
    considerations: ["Neon-style feature signs", "Menu lightboxes", "Window graphics for offers"],
    productSlugs: ["neon-style-flex-sign", "rgb-dimmable-led-neon", "acrylic-faux-neon-360", "slim-led-lightbox", "halo-lit-letters"],
  },
  {
    slug: "corporate",
    name: "Corporate",
    headline: "A professional first impression",
    intro: "Offices need consistent identity across entrance, reception and interior wayfinding.",
    considerations: ["Reception logo walls", "Stainless-steel entrance letters", "Door plaques and wayfinding"],
    productSlugs: ["reception-logo-sign", "luxury-halo-lit-letters", "entrance-monument-sign", "office-door-room-number-signs", "metal-relief-door-plaque", "floor-directory-lobby-signs"],
  },
  {
    slug: "shopping-mall",
    name: "Shopping Mall",
    headline: "Stand out in a crowded corridor",
    intro: "Mall outlets must meet mall guidelines while still standing out among neighbouring brands.",
    considerations: ["Compliance with mall fit-out guidelines", "Slim lightboxes and 3D letters", "Window graphics"],
    productSlugs: ["front-lit-rimless-letters", "push-through-lightbox", "multi-tenant-pylon-sign", "window-graphics"],
  },
  {
    slug: "multi-branch",
    name: "Multi-branch",
    headline: "One brand, every location",
    intro:
      "Rolling out to multiple outlets? Keep signage consistent with saved specifications and a single consolidated proposal.",
    considerations: ["Repeatable specifications", "Consolidated multi-location quotations", "Phased production and installation"],
    productSlugs: ["front-lit-trim-cap-channel-letters", "brand-pylon-sign", "double-sided-hanging-lightbox", "office-door-room-number-signs"],
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}

export type Service = { slug: string; name: string; summary: string; offered: boolean };

// VERIFY: set `offered` to match the real in-house scope (blueprint §11).
export const services: Service[] = [
  { slug: "design", name: "Design support", summary: "Adapt your logo and brand into a production-ready sign layout, or prepare a design from your brief.", offered: true },
  { slug: "site-survey", name: "Site survey", summary: "Measure the site, check the wall, access and power, and recommend what will work.", offered: true },
  { slug: "manufacturing", name: "Manufacturing", summary: "Produce your sign to the approved specification and artwork proof.", offered: true },
  { slug: "installation", name: "Installation", summary: "Install according to the agreed quotation. Availability and charges depend on location and site conditions.", offered: true },
  { slug: "maintenance", name: "Maintenance", summary: "Cleaning, lighting checks and repairs.", offered: false },
];

export const materialsGuide = [
  {
    name: "Acrylic",
    bestFor: "3D letters, plaques, logo signs",
    look: "Clean, crisp edges in clear or coloured sheets; can be lit.",
    consider: "Thickness affects depth and price; outdoor use depends on specification.",
  },
  {
    name: "ACP",
    bestFor: "Shop fascia and large flat boards",
    look: "Flat, rigid panel with a smooth finish.",
    consider: "Usually needs a supporting frame; letters or graphics are added on top.",
  },
  {
    name: "Stainless steel",
    bestFor: "Premium and corporate lettering",
    look: "Brushed or mirror metallic finish.",
    consider: "Higher fabrication effort; usually priced by quotation.",
  },
  {
    name: "LED lighting",
    bestFor: "Night visibility",
    look: "Front-lit, halo-lit or backlit glow.",
    consider: "Needs a power point near the sign; confirmed during site details.",
  },
];

export const faqs = [
  {
    q: "Can I order a signboard in a custom size?",
    a: "Yes, you can submit your required dimensions and specifications for review. Availability and final pricing depend on material, design and installation requirements.",
  },
  {
    q: "Can I upload my existing logo?",
    a: "Yes. Upload your logo or artwork during customization. Our team may request a production-ready vector file before manufacturing.",
  },
  {
    q: "Will I see the final price immediately?",
    a: "Standard products may show a confirmed price. Custom projects may show an estimate or require a formal quotation after technical review.",
  },
  {
    q: "Do you provide installation?",
    a: "Installation can be requested during checkout or quotation. Availability and charges depend on the project location and site conditions.",
  },
  {
    q: "How long will production take?",
    a: "The expected timeline will be communicated after your specification and artwork are approved. Complex projects may require additional time.",
  },
  {
    q: "Can I order branding for multiple outlets?",
    a: "Yes. Submit a multi-location project request with outlet details, quantities and brand guidelines for a consolidated proposal.",
  },
];

/** Bangladesh's 64 districts, used for delivery/installation location. */
export const districts = [
  "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura", "Brahmanbaria", "Chandpur",
  "Chapainawabganj", "Chattogram", "Chuadanga", "Cox's Bazar", "Cumilla", "Dhaka", "Dinajpur", "Faridpur",
  "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore", "Jhalokati",
  "Jhenaidah", "Joypurhat", "Khagrachhari", "Khulna", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur",
  "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh",
  "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore", "Netrokona", "Nilphamari", "Noakhali",
  "Pabna", "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur",
  "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon",
];
