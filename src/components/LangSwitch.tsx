"use client";

import { useEffect, useState, type ReactNode } from "react";

type Lang = "en" | "zh";
const STORAGE_KEY = "sc-article-lang";

/**
 * Per-article EN / 中 toggle. Both languages render into the DOM (good for SEO);
 * the button just flips which one is visible. Choice persists across articles
 * via localStorage. If `zh` is absent, no toggle is shown and English stays.
 */
export default function LangSwitch({
  en,
  zh,
}: {
  en: ReactNode;
  zh?: ReactNode;
}) {
  const hasZh = Boolean(zh);
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    if (!hasZh) return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "zh" || saved === "en") setLang(saved);
  }, [hasZh]);

  function choose(next: Lang) {
    setLang(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  const shown: Lang = hasZh ? lang : "en";

  return (
    <>
      {hasZh && (
        <div className="mb-8 flex items-center gap-1 font-mono text-[0.7rem] uppercase tracking-[0.18em]">
          {(["en", "zh"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => choose(l)}
              aria-pressed={shown === l}
              className={
                "rounded-full px-3 py-1 transition-colors " +
                (shown === l
                  ? "bg-gold text-night"
                  : "text-cream-mute hover:text-cream")
              }
            >
              {l === "en" ? "EN" : "中"}
            </button>
          ))}
        </div>
      )}

      <div hidden={shown !== "en"}>{en}</div>
      {hasZh && <div hidden={shown !== "zh"}>{zh}</div>}
    </>
  );
}
