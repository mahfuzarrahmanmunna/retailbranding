import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { ArtKind, Category, PricingMode } from "@/lib/catalog";
import { IconArrowRight } from "./icons";

/*
 * Signboard-style category cards for the home page.
 * Every card renders a small "scene" — a wall with a real-looking sign mounted
 * on it — built purely from HTML/CSS (no images), so it stays crisp and light.
 * Sizes inside a scene use container-query units (cqw) so signs scale with the card.
 * Styles live in globals.css under "Signboard category cards".
 */

type Scene = { accent: string; wall: string; sign: ReactNode };

const scenes: Partial<Record<ArtKind, Scene>> = {
  /* Outdoor signboard — red ACP fascia with spot lamps over a shop shutter */
  fascia: {
    accent: "#e63946",
    wall: "sb-wall-brick",
    sign: (
      <>
        <div className="absolute inset-x-[30%] top-[11%] flex justify-between">
          <span className="sb-lamp" />
          <span className="sb-lamp" />
          <span className="sb-lamp" />
        </div>
        <div className="sb-fascia absolute inset-x-[6%] top-[21%] h-[38%]">
          <Bolts />
          <span className="sb-fascia-text">YOUR SHOP</span>
          <span className="sb-fascia-sub">FASHION · LIFESTYLE</span>
        </div>
        <div className="sb-shutter absolute inset-x-[10%] bottom-0 top-[66%]" />
      </>
    ),
  },

  /* 3D letters — extruded gold letters on a concrete wall */
  letters: {
    accent: "#f4a300",
    wall: "sb-wall-concrete",
    sign: (
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="sb-3d">BRAND</span>
        <span className="sb-3d-sub">&amp; CO.</span>
      </div>
    ),
  },

  /* Illuminated LED letters — halo-lit channel letters at night */
  channel: {
    accent: "#4361ee",
    wall: "sb-wall-night",
    sign: (
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex items-center gap-[3cqw]">
          <span className="sb-halo-mark" />
          <span className="sb-halo">LOGO</span>
        </div>
        <span className="sb-raceway" />
      </div>
    ),
  },

  /* Lightbox — projecting pharmacy box with an "OPEN 24/7" strip */
  lightbox: {
    accent: "#10b981",
    wall: "sb-wall-slate",
    sign: (
      <>
        <span className="sb-bracket absolute left-0 top-[30%]" />
        <div className="sb-lightbox absolute left-[16%] right-[10%] top-[22%]">
          <div className="flex items-center justify-center gap-[2.5cqw] px-[3cqw] py-[4cqw]">
            <span className="sb-cross" />
            <span className="sb-lightbox-text">PHARMACY</span>
          </div>
          <div className="sb-lightbox-strip">OPEN 24/7</div>
        </div>
      </>
    ),
  },

  /* Acrylic sign — frosted plaque on standoffs over wood panelling */
  plaque: {
    accent: "#0ea5e9",
    wall: "sb-wall-wood",
    sign: (
      <div className="sb-acrylic absolute inset-x-[12%] top-[22%] bottom-[22%]">
        <span className="sb-standoff left-[4%] top-[8%]" />
        <span className="sb-standoff right-[4%] top-[8%]" />
        <span className="sb-standoff bottom-[8%] left-[4%]" />
        <span className="sb-standoff bottom-[8%] right-[4%]" />
        <span className="sb-acrylic-text">WELCOME</span>
        <span className="sb-acrylic-sub">RECEPTION · LEVEL 2</span>
      </div>
    ),
  },

  /* LED / neon — the classic glowing "OPEN" */
  neon: {
    accent: "#ff2d95",
    wall: "sb-wall-brick-dark",
    sign: (
      <>
        <span className="sb-chain left-[28%]" />
        <span className="sb-chain right-[28%]" />
        <div className="sb-neon-frame absolute inset-x-[17%] top-[24%] bottom-[18%]">
          <span className="sb-neon">
            <span className="sb-flicker">O</span>PEN
          </span>
        </div>
      </>
    ),
  },

  /* Indoor — reception wall with logo mark and lettering */
  reception: {
    accent: "#7c3aed",
    wall: "sb-wall-office",
    sign: (
      <>
        <div className="sb-feature-panel absolute inset-x-[14%] top-[10%] bottom-[30%] flex flex-col items-center justify-center gap-[2cqw]">
          <span className="sb-logo-mark" />
          <span className="sb-reception-text">RECEPTION</span>
        </div>
        <div className="sb-desk absolute inset-x-[20%] bottom-0 h-[24%]" />
      </>
    ),
  },

  /* Display & promo — window glass with a sale starburst */
  window: {
    accent: "#f97316",
    wall: "sb-wall-glass",
    sign: (
      <>
        <span className="sb-mullion left-1/2 top-0 h-full w-[1.6cqw] -translate-x-1/2" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="sb-burst">
            <span className="sb-burst-big">50%</span>
            <span className="sb-burst-small">OFF</span>
          </div>
        </div>
        <span className="sb-promo-strip absolute inset-x-0 bottom-[10%]">MEGA SALE · NEW ARRIVALS · MEGA SALE</span>
      </>
    ),
  },

  /* Door & wayfinding — room plate and directional signs */
  door: {
    accent: "#16a34a",
    wall: "sb-wall-corridor",
    sign: (
      <>
        <div className="absolute left-[7%] top-[18%] flex w-[44%] flex-col gap-[2.5cqw]">
          <span className="sb-way sb-way-green">← EXIT</span>
          <span className="sb-way sb-way-blue">WC →</span>
          <span className="sb-way sb-way-navy">LIFT ↑</span>
        </div>
        <div className="sb-door absolute bottom-0 right-[8%] top-[10%] w-[34%]">
          <span className="sb-door-plate">
            ROOM
            <b>101</b>
          </span>
          <span className="sb-door-handle" />
        </div>
      </>
    ),
  },

  /* Pylon — freestanding brand tower at dusk */
  pylon: {
    accent: "#2563eb",
    wall: "sb-wall-sky",
    sign: (
      <>
        <span className="sb-ground absolute inset-x-0 bottom-0 h-[10%]" />
        <div className="sb-pylon absolute bottom-[6%] left-1/2 top-[7%] w-[30%] -translate-x-1/2">
          <span className="sb-pylon-head">BRAND</span>
          <span className="sb-pylon-row bg-[#ef4444]">CAFÉ</span>
          <span className="sb-pylon-row bg-[#10b981]">BANK</span>
          <span className="sb-pylon-row bg-[#f59e0b] text-[#1b1f4a]">FUEL</span>
        </div>
      </>
    ),
  },

  /* Metal plaque — engraved brass on marble */
  relief: {
    accent: "#b8862b",
    wall: "sb-wall-marble",
    sign: (
      <div className="sb-brass absolute inset-x-[16%] top-[16%] bottom-[16%]">
        <Bolts />
        <span className="sb-brass-small">FOUNDATION STONE</span>
        <span className="sb-brass-rule" />
        <span className="sb-brass-text">EST. 2026</span>
        <span className="sb-brass-rule" />
        <span className="sb-brass-small">DHAKA · BANGLADESH</span>
      </div>
    ),
  },
};

function Bolts() {
  return (
    <>
      <span className="sb-bolt left-[2.5%] top-[8%]" />
      <span className="sb-bolt right-[2.5%] top-[8%]" />
      <span className="sb-bolt bottom-[8%] left-[2.5%]" />
      <span className="sb-bolt bottom-[8%] right-[2.5%]" />
    </>
  );
}

const pricingChips: Record<PricingMode, { label: string; className: string }> = {
  fixed: { label: "Fixed price", className: "bg-[#e7f4ed] text-success" },
  estimate: { label: "Instant estimate", className: "bg-yellow-50 text-[#8a6100]" },
  quote: { label: "Quotation", className: "bg-navy-50 text-navy" },
};
const pricingOrder: PricingMode[] = ["fixed", "estimate", "quote"];

export function PricingChip({ mode }: { mode: PricingMode }) {
  const chip = pricingChips[mode];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-bold ${chip.className}`}>
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {chip.label}
    </span>
  );
}

export function SignboardCategoryCard({
  category,
  count,
  modes,
}: {
  category: Category;
  count: number;
  modes: PricingMode[];
}) {
  const scene = scenes[category.art] ?? scenes.fascia!;
  const sortedModes = pricingOrder.filter((m) => modes.includes(m));

  return (
    <Link
      href="#"
      className="sb-card group"
      style={{ "--sb-accent": scene.accent } as CSSProperties}
    >
      <div className={`sb-scene ${scene.wall}`} aria-hidden="true">
        <div className="sb-sign">{scene.sign}</div>
        <span className="sb-count">
          {count} {count === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="sb-info">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base leading-snug sm:text-lg">{category.name}</h3>
            <p lang="bn" className="mt-0.5 text-sm text-muted">
              {category.nameBn}
            </p>
          </div>
          <span className="sb-arrow max-sm:hidden">
            <IconArrowRight width={18} height={18} />
          </span>
        </div>
        {sortedModes.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
            <span className="sr-only">Pricing: </span>
            {sortedModes.map((m) => (
              <PricingChip key={m} mode={m} />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

/** Final tile: a hanging chalkboard inviting visitors to ask an expert. */
export function SignboardHelpCard() {
  return (
    <Link href="#" className="sb-card group" style={{ "--sb-accent": "#ffcc00" } as CSSProperties}>
      <div className="sb-scene sb-wall-yellow" aria-hidden="true">
        <div className="sb-sign">
          <span className="sb-nail" />
          <div className="sb-swing absolute inset-x-[16%] top-[8%] bottom-[12%]">
            <svg className="absolute inset-0 size-full overflow-visible">
              <line x1="50%" y1="0" x2="10%" y2="31%" stroke="#3f2a14" strokeWidth="2" />
              <line x1="50%" y1="0" x2="90%" y2="31%" stroke="#3f2a14" strokeWidth="2" />
            </svg>
            <div className="sb-chalkboard absolute inset-x-0 bottom-0 top-[30%]">
              <span className="sb-chalk-big">NEED HELP?</span>
              <span className="sb-chalk-small">we&apos;ll suggest the right sign</span>
            </div>
          </div>
        </div>
      </div>
      <div className="sb-info">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base leading-snug sm:text-lg">Unsure what you need?</h3>
            <p className="mt-0.5 text-sm text-muted">Describe your space and we&apos;ll recommend options.</p>
          </div>
          <span className="sb-arrow max-sm:hidden">
            <IconArrowRight width={18} height={18} />
          </span>
        </div>
        <span className="mt-auto pt-3 text-sm font-bold text-navy">Ask an expert — free advice</span>
      </div>
    </Link>
  );
}
