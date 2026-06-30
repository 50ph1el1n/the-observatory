#!/usr/bin/env node
// Translate every note in /drafts into an English Sophie City article.
//
// Flow: you drop a (Chinese or English) note into drafts/ from your phone and
// commit. GitHub Actions runs this script, which asks Claude to translate the
// note into natural English, choose the right district, and write a finished
// .mdx into src/content/articles/. The consumed draft is then deleted so the
// folder acts as an inbox queue (re-runs are idempotent).
//
// Env:
//   ANTHROPIC_API_KEY  required
//   TRANSLATE_MODEL    optional, defaults to claude-sonnet-4-6

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DRAFTS_DIR = path.join(ROOT, "drafts");
const ARTICLES_DIR = path.join(ROOT, "src/content/articles");
const MODEL = process.env.TRANSLATE_MODEL || "claude-sonnet-4-6";
const API_KEY = process.env.ANTHROPIC_API_KEY;

if (!API_KEY) {
  console.error("Missing ANTHROPIC_API_KEY");
  process.exit(1);
}

// Keep in sync with src/lib/districts.ts
const DISTRICTS = [
  { key: "cine", name: "Cinema", about: "films, cinema, TV, animation" },
  { key: "hall", name: "City Hall", about: "civic life, policy, society" },
  { key: "lib", name: "Library", about: "books, reading notes" },
  { key: "ai", name: "AI Factory", about: "AI tools, prompts, workflows" },
  { key: "space", name: "Spaceport", about: "travel, frontiers, remote life" },
  { key: "pod", name: "Broadcast Tower", about: "podcasts, audio" },
  { key: "fin", name: "Finance District", about: "money, markets, investing" },
  { key: "garden", name: "Reflection Park", about: "self, journaling, notes" },
];
const DISTRICT_BY_KEY = new Map(DISTRICTS.map((d) => [d.key, d]));

const SYSTEM = `You are the publishing assistant for "Sophie City", a personal
editorial-zine website. Notes arrive in Traditional Chinese (or English) and you
turn each one into a finished English article.

Translate into natural, warm, first-person editorial English — match the voice of
The Atlantic essays, not a literal word-for-word translation. Keep the author's
meaning and any markdown structure (## headings, lists, > quotes). Do NOT invent
facts that are not in the source note.

Pick exactly one district from this list (use the key):
${DISTRICTS.map((d) => `- ${d.key}: ${d.name} — ${d.about}`).join("\n")}

Return ONLY a JSON object (no markdown fence, no prose) with this shape:
{
  "slug": "kebab-case-from-the-english-title",
  "title": "Short English title (no trailing punctuation)",
  "district": "one of the keys above",
  "read": "N min read",
  "excerpt": "One-sentence English hook, under 160 chars",
  "tags": ["lowercase", "single-word", "max-4"],
  "cover": "cover-1 | cover-2 | cover-3 | cover-4",
  "body": "The full article in markdown, starting at the first paragraph. Do not repeat the title. Use ## for section headings."
}`;

function extractJson(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON object in response");
  return JSON.parse(raw.slice(start, end + 1));
}

async function translate(note) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8000,
      system: SYSTEM,
      messages: [{ role: "user", content: note }],
    }),
  });
  if (!res.ok) {
    throw new Error(`Anthropic API ${res.status}: ${await res.text()}`);
  }
  const data = await res.json();
  const text = data.content.map((b) => b.text || "").join("");
  return extractJson(text);
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function uniqueArticlePath(slug) {
  let candidate = slug || "untitled";
  let n = 2;
  while (fs.existsSync(path.join(ARTICLES_DIR, `${candidate}.mdx`))) {
    candidate = `${slug}-${n++}`;
  }
  return { slug: candidate, file: path.join(ARTICLES_DIR, `${candidate}.mdx`) };
}

function buildMdx(meta) {
  const district = DISTRICT_BY_KEY.get(meta.district) || DISTRICT_BY_KEY.get("garden");
  const cover = /^cover-[1-4]$/.test(meta.cover) ? meta.cover : "cover-1";
  const tags = (Array.isArray(meta.tags) ? meta.tags : [])
    .slice(0, 4)
    .map((t) => slugify(t))
    .filter(Boolean);
  const today = new Date().toISOString().slice(0, 10);
  const fm = [
    "---",
    `title: ${JSON.stringify(meta.title)}`,
    `district: ${district.key}`,
    `cat: ${JSON.stringify(district.name)}`,
    `read: ${JSON.stringify(meta.read || "5 min read")}`,
    `date: ${today}`,
    `excerpt: ${JSON.stringify(meta.excerpt || "")}`,
    `tags: [${tags.join(", ")}]`,
    `cover: ${cover}`,
    "---",
    "",
    String(meta.body || "").trim(),
    "",
  ];
  return fm.join("\n");
}

function listDrafts() {
  if (!fs.existsSync(DRAFTS_DIR)) return [];
  return fs
    .readdirSync(DRAFTS_DIR)
    .filter((f) => /\.(md|mdx|txt)$/i.test(f))
    .filter((f) => f.toLowerCase() !== "readme.md");
}

async function main() {
  const drafts = listDrafts();
  if (drafts.length === 0) {
    console.log("No drafts to translate.");
    return;
  }
  fs.mkdirSync(ARTICLES_DIR, { recursive: true });

  for (const filename of drafts) {
    const draftPath = path.join(DRAFTS_DIR, filename);
    const note = fs.readFileSync(draftPath, "utf-8").trim();
    if (!note) {
      console.log(`Skipping empty draft: ${filename}`);
      continue;
    }
    console.log(`Translating ${filename} with ${MODEL}…`);
    const meta = await translate(note);
    const baseSlug = slugify(meta.slug || meta.title);
    const { slug, file } = uniqueArticlePath(baseSlug);
    fs.writeFileSync(file, buildMdx({ ...meta }), "utf-8");
    fs.rmSync(draftPath);
    console.log(`  → src/content/articles/${slug}.mdx (district: ${meta.district})`);
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
