import Link from "next/link";
import { districts } from "@/lib/districts";
import { getArticlesByDistrict } from "@/lib/articles";

// SVG icons per district, keyed by district key
const icons: Record<string, React.ReactNode> = {
  ai: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="4" />
      <path d="M16 3 V7 M16 25 V29 M3 16 H7 M25 16 H29 M7 7 L10 10 M22 22 L25 25 M25 7 L22 10 M7 25 L10 22" />
    </svg>
  ),
  pod: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="12" y="4" width="8" height="14" rx="4" />
      <path d="M8 15 Q8 23, 16 23 Q24 23, 24 15" />
      <line x1="16" y1="23" x2="16" y2="29" />
      <line x1="10" y1="29" x2="22" y2="29" />
    </svg>
  ),
  hall: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3,11 16,4 29,11" />
      <line x1="6" y1="11" x2="6" y2="26" />
      <line x1="12" y1="11" x2="12" y2="26" />
      <line x1="20" y1="11" x2="20" y2="26" />
      <line x1="26" y1="11" x2="26" y2="26" />
      <line x1="3" y1="26" x2="29" y2="26" />
    </svg>
  ),
  lib: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M3 7 Q16 3, 16 7 L16 27 Q16 22, 3 27 Z" />
      <path d="M29 7 Q16 3, 16 7 L16 27 Q16 22, 29 27 Z" />
    </svg>
  ),
  cine: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="16" cy="16" r="12" />
      <circle cx="16" cy="16" r="3" fill="currentColor" />
      <circle cx="16" cy="8" r="2" fill="currentColor" />
      <circle cx="16" cy="24" r="2" fill="currentColor" />
      <circle cx="8" cy="16" r="2" fill="currentColor" />
      <circle cx="24" cy="16" r="2" fill="currentColor" />
    </svg>
  ),
  fin: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4,24 11,15 17,19 25,7 28,11" />
      <polyline points="22,7 28,7 28,13" />
    </svg>
  ),
  space: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="16" cy="16" r="8" />
      <ellipse cx="16" cy="16" rx="14" ry="4" transform="rotate(-20 16 16)" />
    </svg>
  ),
  garden: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="16" y1="29" x2="16" y2="18" />
      <circle cx="16" cy="12" r="8" />
      <path d="M12 10 Q14 8, 16 9 Q18 8, 20 10" />
    </svg>
  ),
};

export default function CityWorlds() {
  return (
    <section className="bg-night px-8 py-36" id="city">
      <div className="mx-auto mb-16 max-w-[600px] text-center">
        <h2 className="mb-3 font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-medium italic tracking-tight text-cream">
          These are my{" "}
          <em className="text-gold not-italic">world</em>.
        </h2>
        <p className="font-display text-[1.15rem] italic leading-relaxed text-cream-soft">
          Eight districts of thought — each one a way of being curious.
        </p>
      </div>

      <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
        {districts.map((d) => {
          const count = getArticlesByDistrict(d.key).length;
          return (
            <Link
              key={d.key}
              href={`/districts/${d.key}`}
              className="group block bg-night px-6 py-10 text-center transition-colors hover:bg-night-soft"
            >
              <div className="mx-auto mb-5 block h-9 w-9 text-cream-soft transition-all duration-500 group-hover:scale-110 group-hover:text-sage">
                {icons[d.key]}
              </div>
              <div className="mb-1 font-display text-[1.05rem] font-medium italic text-cream transition-colors group-hover:text-gold">
                {d.name}
              </div>
              <div className="mb-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-cream-mute">
                {d.en}
              </div>
              <div className="font-mono text-[0.7rem] text-cream-soft">
                {count} {count === 1 ? "essay" : "essays"}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
