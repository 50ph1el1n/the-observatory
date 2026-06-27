import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { getHotspotDistricts, type DistrictKey } from "@/lib/districts";
import { getArticlesByDistrict } from "@/lib/articles";

const navItems = [
  { label: "About me", href: "/#about" },
  { label: "Article", href: "/#articles" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/#contact" },
];

const BUILDINGS_DIR = path.join(process.cwd(), "public/buildings");

function hasBuildingImage(key: DistrictKey): boolean {
  if (!fs.existsSync(BUILDINGS_DIR)) return false;
  return fs.existsSync(path.join(BUILDINGS_DIR, `${key}.png`));
}

export default function Hero() {
  const hotspots = getHotspotDistricts();

  return (
    <section
      className="relative h-screen min-h-[680px] overflow-hidden bg-night bg-cover bg-bottom bg-no-repeat"
      style={{ backgroundImage: "url(/hero.png)" }}
    >
      {/* Top fade for header readability */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-40 bg-gradient-to-b from-[rgba(20,10,40,0.55)] to-transparent" />

      {/* Header */}
      <header className="relative z-30 flex items-center justify-between px-12 py-7">
        <div className="flex items-center gap-12">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-[1.4rem] font-medium italic tracking-tight text-cream"
          >
            <span className="not-italic text-gold text-[1.1rem]">✦</span>
            The Observatory
          </Link>
          <nav className="flex gap-7">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-sans text-[0.85rem] font-medium tracking-wide text-cream opacity-85 transition hover:text-gold hover:opacity-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <button className="rounded-sm border border-cream bg-transparent px-5 py-2.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.08em] text-cream transition hover:border-gold hover:bg-gold hover:text-night-deep">
          Start Exploring
        </button>
      </header>

      {/* ───── Building hotspots ───── */}
      {hotspots.map((d) => {
        const count = getArticlesByDistrict(d.key).length;
        const hasImage = hasBuildingImage(d.key);

        return (
          <Link
            key={d.key}
            href={`/districts/${d.key}`}
            aria-label={`Enter ${d.name}`}
            className="group absolute z-20"
            style={d.hotspot}
          >
            {hasImage ? (
              // Real building overlay — floats + outline glows on hover
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`/buildings/${d.key}.png`}
                alt={d.name}
                className="building-float pointer-events-none h-full w-full object-contain object-bottom"
              />
            ) : (
              // Fallback: invisible click area with diffuse glow on hover
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(244,185,66,0.55) 0%, rgba(244,185,66,0.15) 40%, transparent 70%)",
                  filter: "blur(16px)",
                  transform: "scale(1.4)",
                }}
              />
            )}

            {/* Floating label — always present */}
            <div className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[140%] opacity-0 transition-all duration-300 group-hover:-translate-y-[180%] group-hover:opacity-100">
              <div className="whitespace-nowrap rounded border border-gold/60 bg-night-deep/95 px-3 py-2 shadow-lg backdrop-blur-sm">
                <div className="font-display text-[0.95rem] font-medium italic leading-tight text-cream">
                  {d.name}
                </div>
                <div className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-gold">
                  {count} {count === 1 ? "essay" : "essays"} →
                </div>
              </div>
            </div>
          </Link>
        );
      })}

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 z-10 h-[50px] w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-cream-mute opacity-60">
        <span
          className="absolute -bottom-1 -left-[3px] block h-[7px] w-[7px] rotate-45 border-b border-r border-cream-mute"
          aria-hidden
        />
      </div>
    </section>
  );
}
