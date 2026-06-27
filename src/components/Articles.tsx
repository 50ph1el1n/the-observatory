import Link from "next/link";
import { articles } from "@/lib/articles";

const coverStyles: Record<string, React.CSSProperties> = {
  "cover-1": {
    background: `
      radial-gradient(circle at 70% 30%, #f4b942 0%, transparent 35%),
      radial-gradient(circle at 30% 70%, #d17b4a 0%, transparent 40%),
      linear-gradient(135deg, #382057 0%, #1e1138 100%)
    `,
  },
  "cover-2": {
    background: `
      radial-gradient(circle at 50% 50%, #a85a35 0%, transparent 30%),
      linear-gradient(180deg, #382057, #1e1138)
    `,
  },
  "cover-3": {
    background: `conic-gradient(from 45deg at 60% 40%, #8ba888, #f4b942, #d17b4a, #382057)`,
    opacity: 0.85,
  },
  "cover-4": {
    background: `
      radial-gradient(ellipse at top, #d4941e 0%, transparent 50%),
      linear-gradient(180deg, #1e1138, #382057)
    `,
  },
};

export default function Articles() {
  return (
    <div id="articles" className="mx-auto max-w-[1240px]">
      <div className="mb-5 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-gold">
        — Recent Writings —
      </div>
      <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-medium leading-[1.1] tracking-tight text-cream">
        Latest from <em className="font-normal italic text-gold">the city</em>.
      </h2>

      <div className="mt-14 grid grid-cols-1 gap-x-16 gap-y-20 md:grid-cols-2">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/articles/${a.slug}`}
            className="group block cursor-pointer transition-transform duration-300 hover:-translate-y-[3px]"
          >
            <div
              className="relative mb-6 aspect-[16/10] overflow-hidden rounded-sm border border-line"
              style={coverStyles[a.cover]}
            >
              <span className="absolute bottom-2.5 right-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-cream/30">
                Illustration
              </span>
            </div>
            <div className="mb-2.5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-cream-mute">
              {a.cat} <span className="mx-2 text-gold">·</span> {a.read}
            </div>
            <h3 className="mb-3 font-display text-[1.9rem] font-medium leading-[1.15] tracking-tight text-cream transition-colors group-hover:text-gold">
              {a.title}
            </h3>
            <p className="mb-4 font-display text-[1.05rem] leading-[1.65] text-cream-soft">
              {a.excerpt}
            </p>
            <span className="font-mono text-[0.7rem] tracking-wide text-terra">
              {a.tags.map((t) => `#${t}`).join(" · ")}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
