# 📱 手機發文（手動）

發文 = 在 repo 放一個 `.mdx` 檔 → Vercel 自動部署。不需要後台、不需要 API。

兩種方式：
- **自己翻好**：照下面範本，用 GitHub App 直接新增檔案。
- **請 Claude 翻**：把中文原文貼給 Claude，我翻成英文並直接 commit / push。

---

## 方式 A：自己翻，手機直接發

1. 用 **GitHub App** 打開 repo → 進 `src/content/articles/`
2. 右上 `+` → **Create new file**，檔名 = 英文 slug，例如 `my-article.mdx`
3. 貼上下面範本、填好內容 → **Commit**
4. 約 1 分鐘後 Vercel 自動上線

### frontmatter 範本
```mdx
---
title: "文章英文標題"
district: ai
cat: "AI Factory"
read: 5 min read
date: 2026-07-01
excerpt: "一句英文開場鉤子，160 字以內。"
tags: [tag1, tag2, tag3]
cover: cover-1
---

第一段內文…

## 小標題

段落內容，可用 **粗體**、清單、> 引言。
```

### 分區對照（`district` / `cat` 要成對）
| district | cat（照填） | 主題 |
|---|---|---|
| `cine` | Cinema | 電影、動畫、影集 |
| `hall` | City Hall | 公共、政策、社會 |
| `lib` | Library | 書、讀書筆記 |
| `ai` | AI Factory | AI 工具、prompt、工作流 |
| `space` | Spaceport | 旅行、遠端、邊界 |
| `pod` | Broadcast Tower | Podcast、音頻 |
| `fin` | Finance District | 金錢、市場、投資 |
| `garden` | Reflection Park | 自我、日記、隨筆 |

- `cover`：`cover-1` ~ `cover-4`（封面樣式，隨意選）
- `date`：`YYYY-MM-DD`，決定文章排序（新的在前）
- `read`：閱讀時間，例如 `3 min read`

### 想要「一鍵中英切換」？加中文版即可
同一個檔加上中文欄位與 `<!--zh-->` 分隔線，文章頁右上就會出現 `EN / 中` 切換鈕；
沒加就純英文、不顯示切換鈕。

```mdx
---
title: "English Title"
title_zh: "中文標題"
excerpt: "English hook…"
excerpt_zh: "中文摘要…"
district: cine
...
---

English body…

<!--zh-->

中文本文…
```

`<!--zh-->` 之前為英文、之後為中文。切換選擇會記住，套用到之後開的文章。

---

## 方式 B：請 Claude 翻

把備忘錄的中文原文貼進對話，說「翻譯發布」即可。我會：
翻成英文 → 選好分區與 frontmatter → 產生 `.mdx` → commit / push → Vercel 上線。
你只要在手機把原文貼過來就好。
