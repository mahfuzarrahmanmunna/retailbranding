import Image from "next/image";
import type { ArtKind } from "@/lib/catalog";
import logo from "../../public/logo/retailbranding.jpeg";

/**
 * Official Retail Branding badge (supplied JPEG, used unmodified per blueprint
 * §17). Swap the import for a vector master (SVG) when the brand owner
 * provides one. The text beside it is a readable site title, since the
 * badge's own lettering is too small to read at header size.
 */
export function Logo({ inverted = false, className = "", eager = false }: { inverted?: boolean; className?: string; eager?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src={logo}
        alt=""
        width={44}
        height={44}
        sizes="44px"
        loading={eager ? "eager" : "lazy"}
        className="size-11 rounded-full bg-white"
      />
      <span className="flex flex-col leading-none">
        <span className={`text-lg font-black tracking-tight ${inverted ? "text-white" : "text-navy"}`}>RETAIL</span>
        <span className={`text-[10px] font-bold tracking-[0.42em] ${inverted ? "text-yellow" : "text-yellow-600"}`}>
          BRANDING
        </span>
      </span>
    </span>
  );
}

/**
 * Lightweight illustrative artwork used until genuine product photography is
 * supplied (blueprint §17). These are clearly drawings, not mock "photos",
 * so they cannot be mistaken for completed work.
 */
export function SignArt({ kind, label, className = "" }: { kind: ArtKind; label: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label={`Illustration: ${label}`}
      className={`h-auto w-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="300" fill="#eef0fa" />
      <rect y="232" width="400" height="68" fill="#dfe3f1" />
      {ART[kind]}
    </svg>
  );
}

const navy = "#303577";
const yellow = "#FFCC00";

const ART: Record<ArtKind, React.ReactNode> = {
  fascia: (
    <g>
      <rect x="40" y="70" width="320" height="170" fill="#fff" stroke="#c9ceda" />
      <rect x="40" y="70" width="320" height="62" fill={navy} />
      <text x="200" y="111" textAnchor="middle" fontSize="28" fontWeight="800" fill={yellow} fontFamily="sans-serif">YOUR SHOP</text>
      <rect x="70" y="150" width="110" height="90" fill="#cfd6ea" />
      <rect x="220" y="150" width="110" height="90" fill="#cfd6ea" />
      <rect x="185" y="150" width="30" height="90" fill="#b8c0da" />
    </g>
  ),
  letters: (
    <g fontFamily="sans-serif" fontWeight="900" fontSize="64" textAnchor="middle">
      <rect x="40" y="60" width="320" height="170" fill="#f9fafc" stroke="#e4e7ee" />
      <text x="206" y="172" fill="#b8c0da">BRAND</text>
      <text x="200" y="166" fill={navy}>BRAND</text>
      <rect x="120" y="186" width="160" height="6" rx="3" fill={yellow} />
    </g>
  ),
  lightbox: (
    <g>
      <rect x="80" y="55" width="240" height="160" rx="10" fill="#fff" stroke={navy} strokeWidth="10" />
      <rect x="95" y="70" width="210" height="130" fill={yellow} opacity="0.35" />
      <circle cx="200" cy="120" r="34" fill={navy} />
      <text x="200" y="128" textAnchor="middle" fontSize="22" fontWeight="800" fill={yellow} fontFamily="sans-serif">RB</text>
      <text x="200" y="185" textAnchor="middle" fontSize="16" fontWeight="700" fill={navy} fontFamily="sans-serif">OPEN DAILY</text>
    </g>
  ),
  plaque: (
    <g>
      <rect x="100" y="80" width="200" height="130" rx="6" fill="#ffffff" stroke="#c9ceda" strokeWidth="3" />
      {[112, 288].flatMap((x) => [92, 198].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="#9aa3bd" />))}
      <text x="200" y="145" textAnchor="middle" fontSize="26" fontWeight="800" fill={navy} fontFamily="sans-serif">LOGO</text>
      <rect x="150" y="160" width="100" height="5" rx="2.5" fill={yellow} />
    </g>
  ),
  neon: (
    <g>
      <rect x="0" y="0" width="400" height="232" fill="#1b1f4a" />
      <rect x="0" y="232" width="400" height="68" fill="#161a3d" />
      <text x="200" y="150" textAnchor="middle" fontSize="58" fontStyle="italic" fontWeight="700" fill="none" stroke={yellow} strokeWidth="3" fontFamily="cursive, sans-serif">hello</text>
      <text x="200" y="150" textAnchor="middle" fontSize="58" fontStyle="italic" fontWeight="700" fill="none" stroke={yellow} strokeWidth="10" opacity="0.18" fontFamily="cursive, sans-serif">hello</text>
    </g>
  ),
  reception: (
    <g>
      <rect x="40" y="40" width="320" height="192" fill="#f3f4f8" />
      <text x="200" y="110" textAnchor="middle" fontSize="38" fontWeight="900" fill={navy} fontFamily="sans-serif">COMPANY</text>
      <rect x="70" y="160" width="260" height="72" rx="6" fill={navy} />
      <rect x="70" y="160" width="260" height="10" fill={yellow} />
    </g>
  ),
  window: (
    <g>
      <rect x="50" y="40" width="300" height="192" fill="#d9e6f5" stroke="#9aa3bd" strokeWidth="6" />
      <line x1="200" y1="40" x2="200" y2="232" stroke="#9aa3bd" strokeWidth="6" />
      <circle cx="125" cy="130" r="48" fill={yellow} />
      <text x="125" y="125" textAnchor="middle" fontSize="20" fontWeight="900" fill={navy} fontFamily="sans-serif">NEW</text>
      <text x="125" y="148" textAnchor="middle" fontSize="14" fontWeight="700" fill={navy} fontFamily="sans-serif">ARRIVALS</text>
      <rect x="225" y="95" width="100" height="14" rx="7" fill={navy} />
      <rect x="225" y="120" width="70" height="10" rx="5" fill={navy} opacity="0.6" />
    </g>
  ),
  wayfinding: (
    <g fontFamily="sans-serif" fontWeight="700" fontSize="18">
      <rect x="90" y="60" width="220" height="44" rx="6" fill={navy} />
      <text x="110" y="89" fill="#fff">Reception</text>
      <text x="285" y="90" fill={yellow} textAnchor="middle">→</text>
      <rect x="90" y="116" width="220" height="44" rx="6" fill={navy} />
      <text x="110" y="145" fill="#fff">Meeting Room</text>
      <text x="285" y="146" fill={yellow} textAnchor="middle">↑</text>
      <rect x="90" y="172" width="220" height="44" rx="6" fill={navy} />
      <text x="110" y="201" fill="#fff">Exit</text>
      <text x="285" y="202" fill={yellow} textAnchor="middle">←</text>
    </g>
  ),
  rooftop: (
    <g>
      <rect x="110" y="140" width="180" height="92" fill="#c3cae0" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={130 + i * 55} y="160" width="30" height="24" fill="#e8ebf5" />
      ))}
      <line x1="140" y1="140" x2="140" y2="110" stroke="#677084" strokeWidth="4" />
      <line x1="260" y1="140" x2="260" y2="110" stroke="#677084" strokeWidth="4" />
      <rect x="80" y="50" width="240" height="62" fill={navy} />
      <text x="200" y="92" textAnchor="middle" fontSize="28" fontWeight="900" fill={yellow} fontFamily="sans-serif">BRAND</text>
    </g>
  ),
  channel: (
    <g fontFamily="sans-serif" fontWeight="900" fontSize="66" textAnchor="middle">
      <rect x="0" y="0" width="400" height="232" fill="#252a63" />
      <rect x="0" y="232" width="400" height="68" fill="#1b1f4a" />
      <text x="200" y="152" fill={yellow} opacity="0.25" stroke={yellow} strokeWidth="14">OPEN</text>
      <text x="200" y="152" fill="#fff6c2" stroke={yellow} strokeWidth="3">OPEN</text>
    </g>
  ),
  mirror: (
    <g>
      <rect x="0" y="0" width="400" height="232" fill="#161a3d" />
      <rect x="0" y="232" width="400" height="68" fill="#10132e" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={90 + i * 14}
          y={46 + i * 10}
          width={220 - i * 28}
          height={140 - i * 20}
          rx="10"
          fill="none"
          stroke={yellow}
          strokeWidth="3"
          opacity={1 - i * 0.18}
        />
      ))}
    </g>
  ),
  door: (
    <g fontFamily="sans-serif" fontWeight="800">
      <rect x="130" y="30" width="140" height="202" fill="#c3cae0" stroke="#9aa3bd" strokeWidth="4" />
      <circle cx="252" cy="140" r="6" fill="#677084" />
      <rect x="150" y="58" width="100" height="56" rx="4" fill="#fff" stroke={navy} strokeWidth="3" />
      <text x="200" y="88" textAnchor="middle" fontSize="22" fill={navy}>204</text>
      <rect x="166" y="96" width="68" height="6" rx="3" fill={yellow} />
    </g>
  ),
  pylon: (
    <g fontFamily="sans-serif" fontWeight="900" textAnchor="middle">
      <rect x="170" y="200" width="60" height="40" fill="#9aa3bd" />
      <rect x="150" y="20" width="100" height="190" rx="6" fill={navy} />
      <circle cx="200" cy="70" r="30" fill={yellow} />
      <text x="200" y="78" fontSize="22" fill={navy}>RB</text>
      <rect x="164" y="118" width="72" height="18" rx="3" fill="#fff" opacity="0.9" />
      <rect x="164" y="144" width="72" height="18" rx="3" fill="#fff" opacity="0.7" />
      <rect x="164" y="170" width="72" height="18" rx="3" fill="#fff" opacity="0.5" />
    </g>
  ),
  relief: (
    <g fontFamily="serif" fontWeight="700" textAnchor="middle">
      <rect x="0" y="0" width="400" height="232" fill="#e8e3d6" />
      <rect x="95" y="50" width="210" height="140" rx="4" fill="#c9a24a" stroke="#9c7a2c" strokeWidth="5" />
      <rect x="108" y="63" width="184" height="114" fill="none" stroke="#9c7a2c" strokeWidth="2" />
      <text x="200" y="108" fontSize="22" fill="#5c4614">ESTABLISHED</text>
      <text x="200" y="146" fontSize="30" fill="#5c4614">2026</text>
    </g>
  ),
  pos: (
    <g>
      <rect x="140" y="40" width="120" height="180" rx="4" fill="#fff" stroke="#c9ceda" strokeWidth="3" />
      <rect x="140" y="40" width="120" height="70" fill={navy} />
      <text x="200" y="84" textAnchor="middle" fontSize="22" fontWeight="900" fill={yellow} fontFamily="sans-serif">OFFER</text>
      <rect x="160" y="128" width="80" height="10" rx="5" fill={navy} opacity="0.7" />
      <rect x="160" y="148" width="60" height="10" rx="5" fill={navy} opacity="0.4" />
      <path d="M180 220l-20 12h80l-20-12" fill="#9aa3bd" />
    </g>
  ),
};
