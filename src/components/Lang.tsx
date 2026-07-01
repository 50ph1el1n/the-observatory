"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Lang = "en" | "zh";
const STORAGE_KEY = "sc-article-lang";

const LangCtx = createContext<{
  lang: Lang;
  hasZh: boolean;
  choose: (l: Lang) => void;
}>({ lang: "en", hasZh: false, choose: () => {} });

/**
 * Shares one EN / 中 choice across everything inside it (article body + TOC).
 * Persists to localStorage so the choice carries to the next article.
 * When `hasZh` is false the language is locked to English.
 */
export function LangProvider({
  hasZh,
  children,
}: {
  hasZh: boolean;
  children: ReactNode;
}) {
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

  return (
    <LangCtx.Provider value={{ lang: hasZh ? lang : "en", hasZh, choose }}>
      {children}
    </LangCtx.Provider>
  );
}

export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, hasZh, choose } = useContext(LangCtx);
  if (!hasZh) return null;
  return (
    <div
      className={
        "flex items-center gap-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] " +
        className
      }
    >
      {(["en", "zh"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => choose(l)}
          aria-pressed={lang === l}
          className={
            "rounded-full px-3 py-1 transition-colors " +
            (lang === l
              ? "bg-gold text-night"
              : "text-cream-mute hover:text-cream")
          }
        >
          {l === "en" ? "EN" : "中"}
        </button>
      ))}
    </div>
  );
}

/** Renders its children only when the active language matches `lang`. */
export function LangBlock({
  lang,
  children,
}: {
  lang: Lang;
  children: ReactNode;
}) {
  const { lang: active } = useContext(LangCtx);
  return <div hidden={active !== lang}>{children}</div>;
}
