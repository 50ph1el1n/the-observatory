import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import type { MDXComponents } from "mdx/types";
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
  getHeadings,
  slugify,
} from "@/lib/articles";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { LangProvider, LangToggle, LangBlock } from "@/components/Lang";

const TITLE_CLS =
  "mb-6 font-display text-[clamp(2.4rem,4.5vw,3.6rem)] font-medium leading-[1.08] tracking-tight text-cream";
const LEDE_CLS =
  "mb-10 font-display text-[1.25rem] italic leading-[1.55] text-cream-soft";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
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

/* ============================================
   MDX styling — applies to all .mdx body content
   ============================================ */
const mdxComponents: MDXComponents = {
  p: (props) => (
    <p
      className="my-6 font-display text-[1.125rem] leading-[1.78] text-cream"
      {...props}
    />
  ),
  h2: ({ children, ...props }) => {
    const text = typeof children === "string" ? children : "";
    const id = slugify(text);
    return (
      <h2
        id={id}
        className="mt-16 mb-3 scroll-mt-28 font-display text-[1.75rem] font-medium leading-[1.2] tracking-tight text-cream"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: (props) => (
    <h3
      className="mt-12 mb-2 font-display text-[1.3rem] font-medium tracking-tight text-cream"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-12 border-l-2 border-gold pl-6 font-display text-[1.35rem] italic leading-[1.5] text-cream"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="my-6 list-disc space-y-2 pl-6 font-display text-[1.125rem] leading-[1.78] text-cream"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="my-6 list-decimal space-y-2 pl-6 font-display text-[1.125rem] leading-[1.78] text-cream"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="text-terra underline-offset-4 transition-colors hover:text-gold hover:underline"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="font-semibold text-cream" {...props} />
  ),
  em: (props) => <em className="italic text-cream-soft" {...props} />,
  code: (props) => (
    <code
      className="rounded bg-night-deep px-1.5 py-0.5 font-mono text-[0.85em] text-cream-soft"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 h-px w-12 border-0 bg-gold" />,
};

function Toc({
  headings,
  label,
}: {
  headings: { text: string; id: string }[];
  label: string;
}) {
  return (
    <>
      <h4 className="mb-5 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-cream-mute">
        {label}
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
  );
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
  const headingsZh = article.bodyZh ? getHeadings(article.bodyZh) : [];

  return (
    <div className="min-h-screen bg-night text-cream">
      <SiteHeader />

      <main className="mx-auto max-w-[1280px] px-6 py-16 lg:py-24">
        <LangProvider hasZh={Boolean(article.bodyZh)}>
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

            {/* EN / 中 toggle (only shown when a zh version exists) */}
            <LangToggle className="mb-8" />

            {/* Title + lede + body, per language */}
            <LangBlock lang="en">
              <h1 className={TITLE_CLS}>{article.title}</h1>
              <p className={LEDE_CLS}>{article.excerpt}</p>
              <div className="mb-12 h-px w-12 bg-gold" />
              <MDXRemote source={article.body} components={mdxComponents} />
            </LangBlock>
            {article.bodyZh && (
              <LangBlock lang="zh">
                <h1 className={TITLE_CLS}>{article.titleZh ?? article.title}</h1>
                {article.excerptZh && (
                  <p className={LEDE_CLS}>{article.excerptZh}</p>
                )}
                <div className="mb-12 h-px w-12 bg-gold" />
                <MDXRemote source={article.bodyZh} components={mdxComponents} />
              </LangBlock>
            )}

            {/* Tags */}
            <div className="mt-16 flex flex-wrap gap-3 border-t border-line pt-8">
              {article.tags.map((t) => (
                <Link
                  key={t}
                  href={`/tags/${encodeURIComponent(t)}`}
                  className="font-mono text-[0.75rem] tracking-wide text-terra transition-colors hover:text-gold"
                >
                  #{t}
                </Link>
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

          {/* ───── Right sidebar: TOC (switches with language) ───── */}
          <aside className="order-3 lg:sticky lg:top-28 lg:self-start">
            {headings.length > 0 && (
              <LangBlock lang="en">
                <Toc headings={headings} label="On this page" />
              </LangBlock>
            )}
            {headingsZh.length > 0 && (
              <LangBlock lang="zh">
                <Toc headings={headingsZh} label="本頁目錄" />
              </LangBlock>
            )}
          </aside>
        </div>
        </LangProvider>
      </main>

      <Footer />
    </div>
  );
}
