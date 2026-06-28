import { getAllArticles, type ArticleMeta } from "./articles";

export type TagSummary = {
  tag: string;
  count: number;
};

export function getAllTags(): TagSummary[] {
  const counts = new Map<string, number>();
  for (const a of getAllArticles()) {
    for (const t of a.tags) {
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getArticlesByTag(tag: string): ArticleMeta[] {
  return getAllArticles().filter((a) => a.tags.includes(tag));
}
