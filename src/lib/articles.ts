export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string };

export type Article = {
  slug: string;
  district: string;
  cat: string;
  read: string;
  date: string;
  title: string;
  excerpt: string;
  tags: string[];
  cover: "cover-1" | "cover-2" | "cover-3" | "cover-4";
  body: ArticleBlock[];
};

export const articles: Article[] = [
  {
    slug: "prompt-engineering",
    district: "ai",
    cat: "AI Factory",
    read: "12 min read",
    date: "June 2025",
    title: "Prompt Engineering: from instruction to context",
    excerpt:
      "Writing prompts is less about commanding a model and more about setting the stage. Roles, goals, and constraints matter more than clever wording.",
    tags: ["prompt", "llm", "workflow"],
    cover: "cover-1",
    body: [
      {
        type: "paragraph",
        text: "When I first started working with large language models, I thought prompts were simple. State the question, get an answer. After a year of trial and error, I now think of prompts the way a director thinks of a scene: every word frames what the model is about to perform.",
      },
      {
        type: "paragraph",
        text: "The shift happened slowly. I'd write a prompt, get something almost-right, edit it, get something else almost-right. Eventually I noticed a pattern: the prompts that worked weren't the cleverest ones. They were the ones that told the model who it was, who it was speaking to, and what success looked like.",
      },
      { type: "heading", text: "From instruction to context" },
      {
        type: "paragraph",
        text: "An instruction tells the model what to do. A context tells the model who it is and what the world around the task looks like. The difference sounds small but compounds quickly.",
      },
      {
        type: "paragraph",
        text: "My habit now: write three lines of context before the task itself. Who the assistant is. Who it's helping. What kind of answer counts as good. Then I write the task. Then I show one ideal example. The prompt is longer, but it doesn't need rewriting.",
      },
      {
        type: "quote",
        text: "You're not commanding the model — you're shrinking its possibility space.",
      },
      { type: "heading", text: "The hidden cost of being clever" },
      {
        type: "paragraph",
        text: "Clever prompts feel impressive when they work and embarrassing when they don't. They tend to rely on tricks: jailbreaks, role-play hacks, exotic phrasings. The trouble is that tricks are brittle. The next model update breaks them. The next user with a slightly different question breaks them.",
      },
      {
        type: "paragraph",
        text: "Context, by contrast, ages well. A clear description of the task survives model upgrades because it's not exploiting any particular model's quirks — it's describing the problem.",
      },
      { type: "heading", text: "What I would tell myself a year ago" },
      {
        type: "paragraph",
        text: "Stop optimizing the verb. Don't agonize over whether to write \"summarize\", \"distill\", or \"compress\". The model knows what you mean. What it doesn't know is who the summary is for, how long it should be, and what level of detail to keep. Tell it those things.",
      },
      {
        type: "quote",
        text: "Write the prompt you wish someone had given you on your first day at the job.",
      },
      {
        type: "paragraph",
        text: "I'm still learning. Some weeks I revert to one-liners and remember why I stopped. But the pattern keeps coming back: when in doubt, give the model more context, not more cleverness.",
      },
    ],
  },
  {
    slug: "psychology-of-money",
    district: "lib",
    cat: "Library",
    read: "8 min read",
    date: "June 2025",
    title: "The Psychology of Money — notes",
    excerpt:
      "Most financial outcomes aren't about knowledge — they're about behavior. A few lines from the book that rewired how I think about saving.",
    tags: ["finance", "books", "behavior"],
    cover: "cover-2",
    body: [
      {
        type: "paragraph",
        text: "Morgan Housel's book is short, plain, and quietly devastating. Most personal finance books treat money as a math problem. He treats it as a behavior problem — and then proceeds to prove, story after story, that the behavior is the whole game.",
      },
      { type: "heading", text: "Lasting matters more than winning" },
      {
        type: "paragraph",
        text: "The investors who do best over decades are rarely the smartest in any given year. They're the ones who don't get knocked out. Compounding rewards survival, not brilliance.",
      },
      {
        type: "quote",
        text: "The hardest financial skill is getting the goalpost to stop moving.",
      },
      { type: "heading", text: "Two definitions of freedom" },
      {
        type: "paragraph",
        text: "Housel makes a distinction I keep returning to: money buys things, but more importantly it buys control over your time. The biggest dividend of financial independence isn't lifestyle — it's the ability to say \"not today\" to anyone, for any reason.",
      },
    ],
  },
  {
    slug: "self-inquiry",
    district: "garden",
    cat: "Reflection Park",
    read: "7 min read",
    date: "June 2025",
    title: "A 30-day self-inquiry practice",
    excerpt:
      "One small question a day, answered by gut. After thirty days the answers drift — and that drift is the point.",
    tags: ["self", "habit", "writing"],
    cover: "cover-3",
    body: [
      {
        type: "paragraph",
        text: "The rules are simple: every morning, answer one question about yourself. Two minutes, no editing, no overthinking. Then close the notebook.",
      },
      { type: "heading", text: "Why the answers change" },
      {
        type: "paragraph",
        text: "The same question on day 1 and day 30 produces different answers. The gap is the data — it's the record of who you were becoming while you weren't looking.",
      },
      {
        type: "quote",
        text: "Knowing yourself is a permanent construction site.",
      },
    ],
  },
  {
    slug: "one-way-ticket",
    district: "space",
    cat: "Spaceport",
    read: "15 min read",
    date: "June 2025",
    title: "Why I bought a one-way ticket out",
    excerpt:
      "Travel notes from the year I stopped planning return flights — and what that did to how I work.",
    tags: ["travel", "life", "remote"],
    cover: "cover-4",
    body: [
      {
        type: "paragraph",
        text: "The first one-way ticket felt reckless. By the fifth, it felt obvious. Removing the return date forced me to design days, not just trips.",
      },
      { type: "heading", text: "Work changes when home is portable" },
      {
        type: "paragraph",
        text: "Without a return flight, you stop treating the trip as an interruption. You start protecting your mornings, finding quiet rooms, choosing places by their wifi and not their landmarks.",
      },
    ],
  },
];

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelatedArticles(
  district: string,
  excludeSlug: string,
  limit = 4,
): Article[] {
  return articles
    .filter((a) => a.district === district && a.slug !== excludeSlug)
    .slice(0, limit);
}

export function getHeadings(body: ArticleBlock[]): { text: string; id: string }[] {
  return body
    .filter((b): b is { type: "heading"; text: string } => b.type === "heading")
    .map((b) => ({ text: b.text, id: slugify(b.text) }));
}
