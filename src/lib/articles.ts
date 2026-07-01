import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ARTICLES_DIR = path.join(process.cwd(), "src/content/articles");

export type ArticleMeta = {
  slug: string;
  title: string;
  district: string;
  cat: string;
  read: string;
  date: string; // human-readable, e.g. "June 2025"
  excerpt: string;
  tags: string[];
  cover: "cover-1" | "cover-2" | "cover-3" | "cover-4";
};

export type Article = ArticleMeta & {
  body: string;
  /** Chinese counterparts — present only when the .mdx provides them. */
  titleZh?: string;
  excerptZh?: string;
  bodyZh?: string;
  /** Full-precision viewing/reading date (e.g. "2022.08.10"), for diary entries. */
  watched?: string;
};

type ArticleInternal = Article & { _timestamp: number };

function readArticleFile(filename: string): ArticleInternal {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  const meta = data as Record<string, unknown>;

  // YAML auto-parses ISO dates to Date objects — normalize both Date and string.
  const dateObj =
    meta.date instanceof Date ? meta.date : new Date(String(meta.date));

  // Body may hold both languages, split by a `<!--zh-->` marker:
  // English above the marker, Chinese below. No marker → English only.
  const [bodyEn, ...zhParts] = content.split(/<!--\s*zh\s*-->/i);
  const bodyZh = zhParts.length > 0 ? zhParts.join("").trim() : undefined;
  const titleZh = meta.title_zh ? String(meta.title_zh) : undefined;
  const excerptZh = meta.excerpt_zh ? String(meta.excerpt_zh) : undefined;

  // Optional viewing/reading date — full precision, formatted "YYYY.MM.DD".
  let watched: string | undefined;
  if (meta.watched) {
    const w =
      meta.watched instanceof Date ? meta.watched : new Date(String(meta.watched));
    const mm = String(w.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(w.getUTCDate()).padStart(2, "0");
    watched = `${w.getUTCFullYear()}.${mm}.${dd}`;
  }

  return {
    slug,
    title: String(meta.title ?? ""),
    district: String(meta.district ?? ""),
    cat: String(meta.cat ?? ""),
    read: String(meta.read ?? ""),
    excerpt: String(meta.excerpt ?? ""),
    tags: Array.isArray(meta.tags) ? (meta.tags as string[]) : [],
    cover: (meta.cover ?? "cover-1") as ArticleMeta["cover"],
    date: dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    }),
    _timestamp: dateObj.getTime(),
    body: bodyEn.trim(),
    titleZh,
    excerptZh,
    bodyZh,
    watched,
  };
}

function readAll(): ArticleInternal[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(readArticleFile)
    .sort((a, b) => b._timestamp - a._timestamp); // newest first
}

function stripInternal(a: ArticleInternal): ArticleMeta {
  const { _timestamp: _t, body: _b, ...meta } = a;
  void _t;
  void _b;
  return meta;
}

export function getAllArticles(): ArticleMeta[] {
  return readAll().map(stripInternal);
}

export function getArticleBySlug(slug: string): Article | undefined {
  const filepath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return undefined;
  const a = readArticleFile(`${slug}.mdx`);
  const { _timestamp: _t, ...article } = a;
  void _t;
  return article;
}

export function getRelatedArticles(
  district: string,
  excludeSlug: string,
  limit = 4,
): ArticleMeta[] {
  return getAllArticles()
    .filter((a) => a.district === district && a.slug !== excludeSlug)
    .slice(0, limit);
}

export function getArticlesByDistrict(district: string): ArticleMeta[] {
  return getAllArticles().filter((a) => a.district === district);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "") // keep unicode letters so 中文 headings get ids
    .replace(/\s+/g, "-")
    .trim();
}

export function getHeadings(body: string): { text: string; id: string }[] {
  // Extract ## headings (level 2)
  const matches = [...body.matchAll(/^##\s+(.+)$/gm)];
  return matches.map((m) => ({
    text: m[1].trim(),
    id: slugify(m[1].trim()),
  }));
}
