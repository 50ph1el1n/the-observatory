import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { districts, getDistrictByKey } from "@/lib/districts";
import { getArticlesByDistrict } from "@/lib/articles";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return districts.map((d) => ({ key: d.key }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ key: string }>;
}): Promise<Metadata> {
  const { key } = await params;
  const district = getDistrictByKey(key);
  if (!district) return { title: "Not Found" };
  return {
    title: `${district.name} · The Observatory`,
    description: `Essays from the ${district.name} district — ${district.en}.`,
  };
}

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

export default async function DistrictPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  const district = getDistrictByKey(key);
  if (!district) notFound();

  const articles = getArticlesByDistrict(district.key);

  return (
    <div className="min-h-screen bg-night text-cream">
      <SiteHeader />

      <main className="mx-auto max-w-[1240px] px-8 py-20 lg:py-28">
        {/* ───── District Header ───── */}
        <header className="mb-20 text-center">
          <div className="mb-6 text-[3rem] text-gold">{district.mark}</div>
          <div className="mb-3 font-mono text-[0.72rem] uppercase tracking-[0.3em] text-gold">
            — District —
          </div>
          <h1 className="mb-3 font-display text-[clamp(2.8rem,5vw,4rem)] font-medium italic tracking-tight text-cream">
            {district.name}
          </h1>
          <p className="font-mono text-[0.78rem] uppercase tracking-[0.18em] text-cream-mute">
            {district.en}
          </p>
          <div className="mt-8 font-display text-sm italic text-cream-soft">
            {articles.length} {articles.length === 1 ? "essay" : "essays"} in
            this district
          </div>
        </header>

        {/* ───── Articles ───── */}
        {articles.length === 0 ? (
          <div className="border-t border-line py-20 text-center">
            <p className="font-display text-[1.3rem] italic text-cream-mute">
              This district doesn&rsquo;t have any essays yet.
            </p>
            <Link
              href="/#city"
              className="mt-6 inline-block font-sans text-sm text-terra transition-colors hover:text-gold"
            >
              ← Back to the city map
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-16 gap-y-20 border-t border-line pt-16 md:grid-cols-2">
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
                <h3 className="mb-3 font-display text-[1.75rem] font-medium leading-[1.15] tracking-tight text-cream transition-colors group-hover:text-gold">
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
        )}

        {/* ───── Back to all ───── */}
        <div className="mt-20 border-t border-line pt-10 text-center">
          <Link
            href="/#city"
            className="inline-flex items-center gap-2 font-sans text-[0.85rem] font-medium text-cream-soft transition-colors hover:text-gold"
          >
            <span aria-hidden>←</span> Back to the city map
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
