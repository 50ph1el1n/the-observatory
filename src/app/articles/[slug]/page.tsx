import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  articles,
  getArticleBySlug,
  getRelatedArticles,
  getHeadings,
  slugify,
} from "@/lib/articles";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Not Found" };
  return {
    title: `${article.title} · The Observatory`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article.district, article.slug);
  const headings = getHeadings(article.body);

  return (
    <div className="min-h-screen bg-night text-cream">
      <SiteHeader />

      <main className="mx-auto max-w-[1280px] px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[200px_minmax(0,680px)_200px] lg:justify-center">
          {/* ───── Left sidebar: related ───── */}
          <aside className="order-2 lg:order-1 lg:sticky lg:top-28 lg:self-start">
            <h4 className="mb-5 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-cream-mute">
              More in {article.cat}
            </h4>
            {related.length > 0 ? (
              <ul className="space-y-5">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/articles/${r.slug}`}
                      className="block font-display text-[0.95rem] leading-snug text-cream-soft transition-colors hover:text-gold"
                    >
                      {r.title}
                    </Link>
                    <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-cream-mute">
                      {r.read}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-display text-sm italic text-cream-mute">
                No other essays here yet.
              </p>
            )}
          </aside>

          {/* ───── Center: article body ───── */}
          <article className="order-1 lg:order-2">
            {/* Category bar */}
            <div className="mb-6 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-gold">
              <Link href="/#city" className="transition-colors hover:text-cream">
                {article.cat}
              </Link>
              <span className="mx-2 text-cream-mute">·</span>
              <span className="text-cream-mute">{article.read}</span>
              <span className="mx-2 text-cream-mute">·</span>
              <span className="text-cream-mute">{article.date}</span>
            </div>

            {/* Title */}
            <h1 className="mb-6 font-display text-[clamp(2.4rem,4.5vw,3.6rem)] font-medium leading-[1.08] tracking-tight text-cream">
              {article.title}
            </h1>

            {/* Lede */}
            <p className="mb-10 font-display text-[1.25rem] italic leading-[1.55] text-cream-soft">
              {article.excerpt}
            </p>

            {/* Divider */}
            <div className="mb-12 h-px w-12 bg-gold" />

            {/* Body */}
            <div className="space-y-7">
              {article.body.map((block, i) => {
                if (block.type === "paragraph") {
                  return (
                    <p
                      key={i}
                      className="font-display text-[1.125rem] leading-[1.78] text-cream"
                    >
                      {block.text}
                    </p>
                  );
                }
                if (block.type === "heading") {
                  const id = slugify(block.text);
                  return (
                    <h2
                      key={i}
                      id={id}
                      className="mt-16 mb-3 scroll-mt-28 font-display text-[1.65rem] font-medium leading-[1.2] tracking-tight text-cream"
                    >
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === "quote") {
                  return (
                    <blockquote
                      key={i}
                      className="my-12 border-l-2 border-gold pl-6 font-display text-[1.35rem] italic leading-[1.5] text-cream"
                    >
                      &ldquo;{block.text}&rdquo;
                    </blockquote>
                  );
                }
                return null;
              })}
            </div>

            {/* Tags */}
            <div className="mt-16 flex flex-wrap gap-3 border-t border-line pt-8">
              {article.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[0.75rem] tracking-wide text-terra"
                >
                  #{t}
                </span>
              ))}
            </div>

            {/* Back to all */}
            <div className="mt-12">
              <Link
                href="/#articles"
                className="inline-flex items-center gap-2 font-sans text-[0.85rem] font-medium text-cream-soft transition-colors hover:text-gold"
              >
                <span aria-hidden>←</span> Back to all writings
              </Link>
            </div>
          </article>

          {/* ───── Right sidebar: TOC ───── */}
          <aside className="order-3 lg:sticky lg:top-28 lg:self-start">
            {headings.length > 0 && (
              <>
                <h4 className="mb-5 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-cream-mute">
                  On this page
                </h4>
                <ul className="space-y-1 border-l border-line">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 font-display text-[0.92rem] leading-snug text-cream-soft transition-colors hover:border-gold hover:text-gold"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
