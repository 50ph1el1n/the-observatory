# 📱 手機發文：翻譯機器人

把備忘錄裡的中文文章貼進 GitHub，機器人自動翻成英文並上線。
原理：發文 = 在 repo 放一個 `.mdx` 檔 → Vercel 自動部署。機器人幫你做翻譯那一步。

---

## 一次性設定（只做一次，5 分鐘）

1. 到 [Anthropic Console](https://console.anthropic.com/) 申請一組 API key（`sk-ant-...`）。
2. 打開 GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**
   - Name：`ANTHROPIC_API_KEY`
   - Secret：貼上剛剛的 key → Add secret
3. 確認 repo 的 **Settings → Actions → General → Workflow permissions** 設為
   **Read and write permissions**（讓機器人能 push 文章）。

完成。之後都不用再碰設定。

---

## 每次發文（手機）

1. 用 **GitHub App** 打開 repo → 進 `drafts` 資料夾
2. 右上 `+` → **Create new file**，檔名隨意（例如 `note.md`）
3. 貼上備忘錄裡的文章 → **Commit**
4. 等約 1 分鐘，機器人會：翻成英文 → 產生文章 → 自動上線 → 清掉草稿

到 **Actions** 分頁可以看翻譯進度；上線後文章會出現在對應的城市分區。

---

## 運作細節

- 草稿放 `drafts/`，成品出現在 `src/content/articles/`，由 `.github/workflows/translate.yml` 觸發。
- 分區、標題、摘要、標籤、閱讀時間都由 Claude 依內容自動決定（分區清單同步自 `src/lib/districts.ts`）。
- 機器人 commit 帶 `[skip-translate]`，不會無限觸發。
- 想換模型：改 workflow 裡的 `TRANSLATE_MODEL`（預設 `claude-sonnet-4-6`）。
- 翻得不滿意：直接在 GitHub 上編輯 `src/content/articles/` 那個 `.mdx` 即可。
