# drafts/ — 發文收件匣

把一篇筆記（中文或英文）放成這裡的一個檔案，commit 之後機器人就會：

1. 用 Claude 翻成英文、選好城市分區、補好標題 / 摘要 / 標籤
2. 在 `src/content/articles/` 產生完成的文章
3. 自動 commit，Vercel 自動上線
4. 刪掉這裡的草稿（收件匣清空）

## 在手機上發文

1. 用 GitHub App 打開這個 repo → `drafts` 資料夾
2. `Add file` → `Create new file`，檔名隨意，例如 `my-note.md`
3. 貼上你備忘錄裡的文章，`Commit`
4. 等約 1 分鐘 → 文章自動上線 ✨

> 檔名不重要，機器人會依內容重新產生英文 slug。
> 這個 README 不會被翻譯。
