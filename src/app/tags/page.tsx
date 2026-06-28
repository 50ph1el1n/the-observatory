import Link from "next/link";
import type { Metadata } from "next";
import { getAllTags } from "@/lib/tags";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Tags · The Observatory",
  description: "All tags across The Observatory.",
};

export default function TagsIndexPage() {
  const tags = getAllTags();

  return (
    <div className="min-h-screen bg-night text-cream">
      <SiteHeader />

      <main className="mx-auto max-w-[960px] px-8 py-20 lg:py-28">
        <header className="mb-16 text-center">
          <div className="mb-3 font-mono text-[0.72rem] uppercase tracking-[0.3em] text-gold">
            — Index —
          </div>
          <h1 className="mb-3 font-display text-[clamp(2.8rem,5vw,4rem)] font-medium italic tracking-tight text-cream">
            Tags
          </h1>
          <p className="font-mono text-[0.78rem] uppercase tracking-[0.18em] text-cream-mute">
            {tags.length} {tags.length === 1 ? "tag" : "tags"} across the city
          </p>
        </header>

        {tags.length === 0 ? (
          <p className="border-t border-line py-20 text-center font-display text-[1.3rem] italic text-cream-mute">
            No tags yet.
          </p>
        ) : (
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-4 border-t border-line pt-12">
            {tags.map((t) => (
              <li key={t.tag}>
                <Link
                  href={`/tags/${encodeURIComponent(t.tag)}`}
                  className="group inline-flex items-baseline gap-1.5 font-mono text-terra transition-colors hover:text-gold"
                >
                  <span className="text-[1rem] tracking-wide">#{t.tag}</span>
                  <span className="font-mono text-[0.7rem] text-cream-mute group-hover:text-gold/70">
                    {t.count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-20 border-t border-line pt-10 text-center">
          <Link
            href="/#articles"
            className="inline-flex items-center gap-2 font-sans text-[0.85rem] font-medium text-cream-soft transition-colors hover:text-gold"
          >
            <span aria-hidden>←</span> Back to writings
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
