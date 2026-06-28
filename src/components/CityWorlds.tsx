import Link from "next/link";
import type { ReactNode } from "react";
import { districts } from "@/lib/districts";
import { getArticlesByDistrict } from "@/lib/articles";

/* ────────────────────────────────────────────────────────────────
   City-block scenes. Each is a small architectural vignette,
   not a generic icon. All share viewBox 0 0 64 48 with a ground
   line at y=44, so blocks sit on the same horizon.
   ──────────────────────────────────────────────────────────────── */

const svgCommon = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

// 1. Cinema — marquee + projection portal + entrance
const CinemaScene: ReactNode = (
  <svg viewBox="0 0 64 48" {...svgCommon} strokeWidth="1.5">
    <rect x="10" y="13" width="44" height="5" />
    <g fill="currentColor" stroke="none">
      {[14, 21, 28, 35, 42, 49].map((x) => (
        <circle key={x} cx={x} cy="15.5" r="0.7" />
      ))}
    </g>
    <rect x="10" y="18" width="44" height="26" />
    <circle cx="32" cy="26" r="3" strokeWidth="1.2" />
    <rect x="28" y="34" width="8" height="10" strokeWidth="1.2" />
    <line x1="2" y1="44" x2="62" y2="44" />
  </svg>
);

// 2. Library — opened-book roof + shelves + spines
const LibraryScene: ReactNode = (
  <svg viewBox="0 0 64 48" {...svgCommon} strokeWidth="1.5">
    <path d="M 32 8 L 12 13 L 12 16 L 32 11 Z" />
    <path d="M 32 8 L 52 13 L 52 16 L 32 11 Z" />
    <line x1="12" y1="16" x2="12" y2="44" />
    <line x1="52" y1="16" x2="52" y2="44" />
    <line x1="12" y1="44" x2="52" y2="44" />
    <line x1="12" y1="24" x2="52" y2="24" strokeWidth="1.2" />
    <line x1="12" y1="32" x2="52" y2="32" strokeWidth="1.2" />
    <line x1="12" y1="40" x2="52" y2="40" strokeWidth="1.2" />
    {[17, 22, 28, 34, 40, 46].map((x) => (
      <line
        key={`a-${x}`}
        x1={x}
        y1="18"
        x2={x}
        y2="24"
        strokeWidth="1"
      />
    ))}
    {[18, 25, 32, 39, 46].map((x) => (
      <line
        key={`b-${x}`}
        x1={x}
        y1="26"
        x2={x}
        y2="32"
        strokeWidth="1"
        opacity="0.7"
      />
    ))}
    <line x1="2" y1="44" x2="62" y2="44" />
  </svg>
);

// 3. AI Factory — boxy lab + node network on roof + small windows
const AIFactoryScene: ReactNode = (
  <svg viewBox="0 0 64 48" {...svgCommon} strokeWidth="1.5">
    <rect x="14" y="20" width="36" height="24" />
    <rect x="20" y="14" width="3" height="6" strokeWidth="1.2" />
    <rect x="41" y="16" width="3" height="4" strokeWidth="1.2" />
    {/* node network above the roof */}
    <line x1="22" y1="10" x2="32" y2="5" strokeWidth="1" opacity="0.65" />
    <line x1="32" y1="5" x2="42" y2="10" strokeWidth="1" opacity="0.65" />
    <line x1="22" y1="10" x2="42" y2="10" strokeWidth="1" opacity="0.45" />
    <g fill="currentColor" stroke="none">
      <circle cx="22" cy="10" r="1.4" />
      <circle cx="32" cy="5" r="1.4" />
      <circle cx="42" cy="10" r="1.4" />
    </g>
    {/* windows */}
    <rect x="18" y="26" width="5" height="4" strokeWidth="1.1" />
    <rect x="26" y="26" width="5" height="4" strokeWidth="1.1" />
    <rect x="34" y="26" width="5" height="4" strokeWidth="1.1" />
    <rect x="42" y="26" width="4" height="4" strokeWidth="1.1" />
    {/* door */}
    <rect x="29" y="36" width="6" height="8" strokeWidth="1.2" />
    <line x1="2" y1="44" x2="62" y2="44" />
  </svg>
);

// 4. Broadcast Tower — triangular mast + signal arcs + base shack
const BroadcastScene: ReactNode = (
  <svg viewBox="0 0 64 48" {...svgCommon} strokeWidth="1.5">
    <rect x="27" y="34" width="10" height="10" strokeWidth="1.2" />
    <path d="M 22 34 L 32 8 L 42 34" />
    <line x1="25" y1="26" x2="39" y2="26" strokeWidth="1.1" />
    <line x1="28" y1="18" x2="36" y2="18" strokeWidth="1.1" />
    <circle cx="32" cy="8" r="1" fill="currentColor" stroke="none" />
    {/* signal arcs left */}
    <path
      d="M 32 6 A 12 12 0 0 0 20 14"
      strokeWidth="1"
      opacity="0.7"
    />
    <path
      d="M 32 6 A 18 18 0 0 0 14 18"
      strokeWidth="1"
      opacity="0.45"
    />
    {/* signal arcs right */}
    <path
      d="M 32 6 A 12 12 0 0 1 44 14"
      strokeWidth="1"
      opacity="0.7"
    />
    <path
      d="M 32 6 A 18 18 0 0 1 50 18"
      strokeWidth="1"
      opacity="0.45"
    />
    <line x1="2" y1="44" x2="62" y2="44" />
  </svg>
);

// 5. Finance — columned temple + small ascending chart
const FinanceScene: ReactNode = (
  <svg viewBox="0 0 64 48" {...svgCommon} strokeWidth="1.5">
    {/* chart line trending up */}
    <polyline
      points="44,16 49,12 53,14 59,8"
      strokeWidth="1.1"
      opacity="0.8"
    />
    <circle cx="59" cy="8" r="1" fill="currentColor" stroke="none" opacity="0.8" />
    {/* temple */}
    <path d="M 12 24 L 32 14 L 52 24" />
    <rect x="11" y="24" width="42" height="2.5" />
    {[15, 22, 29, 35, 42, 49].map((x) => (
      <line key={x} x1={x} y1="26.5" x2={x} y2="38" strokeWidth="1.2" />
    ))}
    <rect x="10" y="38" width="44" height="3" strokeWidth="1.3" />
    <rect x="8" y="41" width="48" height="3" strokeWidth="1.2" />
    <line x1="2" y1="44" x2="62" y2="44" />
  </svg>
);

// 6. Reflection Park — moon + tree + small observation deck
const ReflectionScene: ReactNode = (
  <svg viewBox="0 0 64 48" {...svgCommon} strokeWidth="1.5">
    {/* moon */}
    <circle cx="50" cy="14" r="3.5" strokeWidth="1.2" />
    <circle cx="48.5" cy="12.5" r="0.6" fill="currentColor" stroke="none" opacity="0.6" />
    {/* tree */}
    <circle cx="14" cy="22" r="6" strokeWidth="1.2" />
    <line x1="14" y1="28" x2="14" y2="44" strokeWidth="1.3" />
    {/* observation deck */}
    <line x1="28" y1="36" x2="44" y2="36" strokeWidth="1.3" />
    <line x1="30" y1="36" x2="30" y2="40" strokeWidth="1.1" />
    <line x1="36" y1="36" x2="36" y2="40" strokeWidth="1.1" />
    <line x1="42" y1="36" x2="42" y2="40" strokeWidth="1.1" />
    <line x1="28" y1="40" x2="44" y2="40" strokeWidth="1.2" />
    <line x1="30" y1="40" x2="30" y2="44" strokeWidth="1.1" />
    <line x1="42" y1="40" x2="42" y2="44" strokeWidth="1.1" />
    {/* lake reflection — small ripple under deck */}
    <path
      d="M 26 46 Q 36 47 46 46"
      strokeWidth="1"
      opacity="0.5"
    />
    <line x1="2" y1="44" x2="62" y2="44" />
  </svg>
);

// 7. Frontiers — distant horizon + signpost + orbital trace
const FrontiersScene: ReactNode = (
  <svg viewBox="0 0 64 48" {...svgCommon} strokeWidth="1.5">
    {/* far mountain ridge */}
    <path
      d="M 2 28 L 12 18 L 20 24 L 32 14 L 42 22 L 52 18 L 62 26"
      strokeWidth="1.1"
    />
    {/* near mountain ridge */}
    <path
      d="M 2 36 L 12 30 L 22 34 L 32 28 L 42 34 L 52 30 L 62 36"
      strokeWidth="1"
      opacity="0.55"
    />
    {/* signpost */}
    <line x1="14" y1="44" x2="14" y2="36" strokeWidth="1.3" />
    <path d="M 14 36 L 22 36 L 23.5 38 L 22 40 L 14 40 Z" strokeWidth="1.1" />
    {/* orbital trace */}
    <ellipse
      cx="50"
      cy="10"
      rx="6"
      ry="2"
      strokeWidth="1"
      opacity="0.55"
    />
    <circle cx="56" cy="10" r="1" fill="currentColor" stroke="none" opacity="0.85" />
    {/* path heading into distance */}
    <path
      d="M 30 44 L 36 40 L 42 44"
      strokeWidth="1"
      opacity="0.55"
    />
    <line x1="2" y1="44" x2="62" y2="44" />
  </svg>
);

// 8. Civic & Policy — speech bubbles + central dais + posted notice
const CivicScene: ReactNode = (
  <svg viewBox="0 0 64 48" {...svgCommon} strokeWidth="1.5">
    {/* speech bubble left */}
    <rect x="5" y="8" width="13" height="6" rx="1" strokeWidth="1.1" />
    <path d="M 9 14 L 8 16 L 12 14" strokeWidth="1.1" />
    {/* speech bubble right */}
    <rect x="46" y="12" width="13" height="6" rx="1" strokeWidth="1.1" />
    <path d="M 50 18 L 49 20 L 53 18" strokeWidth="1.1" />
    {/* posted notice on platform */}
    <rect x="29" y="22" width="6" height="8" strokeWidth="1.1" />
    <line x1="30.5" y1="24.5" x2="33.5" y2="24.5" strokeWidth="0.7" opacity="0.7" />
    <line x1="30.5" y1="26.5" x2="33.5" y2="26.5" strokeWidth="0.7" opacity="0.7" />
    <line x1="30.5" y1="28.5" x2="33.5" y2="28.5" strokeWidth="0.7" opacity="0.7" />
    {/* dais */}
    <rect x="22" y="30" width="20" height="4" strokeWidth="1.3" />
    {/* steps */}
    <rect x="20" y="34" width="24" height="2.5" strokeWidth="1.1" />
    <rect x="17" y="36.5" width="30" height="2.5" strokeWidth="1.1" />
    <rect x="14" y="39" width="36" height="5" strokeWidth="1.1" />
    <line x1="2" y1="44" x2="62" y2="44" />
  </svg>
);

const scenes: Record<string, ReactNode> = {
  cine: CinemaScene,
  lib: LibraryScene,
  ai: AIFactoryScene,
  pod: BroadcastScene,
  fin: FinanceScene,
  garden: ReflectionScene,
  space: FrontiersScene,
  hall: CivicScene,
};

export default function CityWorlds() {
  return (
    <section
      id="city"
      className="bg-night-deep px-6 py-32 sm:px-8 sm:py-36"
    >
      <div className="mx-auto mb-20 max-w-[640px] text-center">
        <div className="mb-5 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold">
          — A Map —
        </div>
        <h2 className="mb-5 font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.1] tracking-tight text-cream">
          A Map of{" "}
          <em className="font-normal italic text-gold">My Inner City</em>.
        </h2>
        <p className="font-display text-[1.05rem] italic leading-relaxed text-cream-soft">
          Eight districts — each one a different way of paying attention.
        </p>
      </div>

      {/* Grid of city blocks. The 1px gap between cells shows the dark
          road color (bg-night) bleeding through; cells sit on top in
          bg-night-deep, so the blocks visually rise from the streets. */}
      <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-px bg-night md:grid-cols-4">
        {districts.map((d) => {
          const count = getArticlesByDistrict(d.key).length;
          const dormant = count === 0;
          return (
            <Link
              key={d.key}
              href={`/districts/${d.key}`}
              className="group relative block bg-night-deep px-6 py-12 text-center transition-[background-color,box-shadow] duration-300 hover:bg-[#181016] hover:shadow-[0_0_0_1px_rgba(230,191,161,0.42),0_0_38px_rgba(230,191,161,0.10)]"
            >
              <div
                className={`mx-auto mb-6 block h-12 w-16 transition-all duration-500 group-hover:scale-[1.04] group-hover:text-gold ${
                  dormant
                    ? "text-cream-soft opacity-45 group-hover:opacity-95"
                    : "text-cream-soft"
                }`}
              >
                {scenes[d.key]}
              </div>
              <div className="mb-1.5 font-display text-[1.1rem] font-medium italic tracking-tight text-cream">
                {d.name}
              </div>
              <div className="mb-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-cream-mute">
                {d.en}
              </div>
              <div className="font-mono text-[0.7rem] text-cream-soft transition-colors duration-300 group-hover:text-gold">
                {dormant ? "dormant" : `${count} ${count === 1 ? "essay" : "essays"}`}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
