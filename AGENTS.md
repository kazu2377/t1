# AGENTS.md（Next.js + MCPミニマム）

> **目的**: Codex CLI で Next.js プロジェクトを安全・高速に実装するための “MCP（Model Context Protocol）相当” の最小セット指示。ツール（fs/git/shell/http/npm 等）の利用範囲、作業フロー、レビュー基準を明文化。

---

## 1. プロジェクト情報

* **スタック**: Next.js 14/15（App Router）, TypeScript, ESLint/Prettier
* **Node**: 18.x 以上（LTS 推奨）
* **パッケージマネージャ**: npm or pnpm（本書は `npm` 表記）
* **実行**: `npm run dev` / `npm run build` / `npm start`

```
# 期待ディレクトリ
.
├─ app/            # App Router ページ・レイアウト
├─ components/     # 再利用 UI
├─ lib/            # 共通ユーティリティ
├─ public/         # 静的ファイル
├─ styles/         # グローバル CSS
├─ scripts/        # Node スクリプト（マイグレーション等）
├─ .env.example    # 必須環境変数のサンプル
├─ package.json
└─ next.config.js
```

---

## 2. 使用ツール（MCP 相当）

エージェントは次の「安全ガード付きツール」だけを使うこと。

* **fs（読み書き）**: 既存ファイルの差分編集・新規作成（`/app`, `/components`, `/lib`, `/styles`, `/public`, `next.config.js`, `tsconfig.json`, `.eslintrc.*`, `.prettierrc*`, `package.json`）。

  * 禁止: `.git`, `.env*`, `node_modules`, バイナリ直編集（画像等は `public/` に追加）。
* **git**: `git status`, `git add -p`, `git commit`, `git restore --staged`, `git checkout -b`, `git rebase -i`（必要最小）。
* **shell**: `npm i`, `npm run dev/build/lint/test`, `npx` 実行。
* **http/fetch**: 公開ドキュメント参照のみ（コード貼付はライセンスに配慮）。
* **openapi（任意）**: 既存の OpenAPI 仕様が repo にある場合のみ参照。

> **秘密情報**: `.env*` は**絶対に開かない・送信しない・出力しない**。必要なら `.env.example` にキーを追記し、使い方を README に説明。

---

## 3. コーディング規約（要点）

* **TypeScript 厳格**: `"strict": true` を維持。`any` は禁止（例外は TODO コメントで理由を明記）。
* **App Router**: `app/` を採用。`generateMetadata` / ルートレイアウト活用。API は `app/api/*/route.ts`。
* **スタイル**: `globals.css` + Tailwind（導入済みなら）。未導入プロジェクトでは CSS Modules 可。
* **UX**: エラー境界・ローディング UI（`loading.tsx`, `error.tsx`）を用意。
* **アクセシビリティ**: 画像 `alt` 必須、フォーム要素は `label` と関連付け。
* **ログ**: `console.*` は開発のみ。不要なログはコミット前に削除。
* **命名**: PascalCase（コンポーネント）、camelCase（関数/変数）。
* **インポート順**: 標準→外部→内部。未使用 import 禁止。

---

## 4. Git/PR ルール

* **ブランチ**: `feat/*`, `fix/*`, `chore/*`, `docs/*`, `refactor/*`。
* **コミット**: Conventional Commits（例: `feat: add /todos page`）。
* **PR テンプレ**（要約/背景/変更点/テスト/スクショ/影響範囲/リスク/ロールバック）。
* **レビュー観点**: 仕様準拠・副作用・アクセシビリティ・型安全・テスト有無・パフォーマンス（`dynamic = "force-dynamic"` の乱用禁止）。

---

## 5. 作業フロー（Codex CLI 想定）

1. **/init**: リポジトリをスキャンし、未設定なら `eslint`, `prettier`, `tsconfig`, `next.config.js` の雛形を提案。
2. **設計提案**: 変更概要（ファイル一覧・ルーティング・型定義）を **Plan** として提示。
3. **/diff**: ファイル毎のパッチを提示（追加/変更/削除）。
4. **/approve**: レビュワー承認後に適用→ `npm run lint && npm run build` を実行。
5. **/test**: E2E/UT がある場合は実行（なければ雛形を生成）。

> **禁止**: 大規模リライト、フォーマッタ一括変更、暗黙の依存追加。段階的小 PR を原則とする。

---

## 6. 代表タスク（MCP 最小セット）

### T1: ページの追加（`/todos`）

**目標**: サーバーアクションでダミー Todo を取得し、一覧を表示。ローディング/エラー UI 付き。

**Plan**

* `app/todos/page.tsx`: 一覧ページ（サーバーコンポーネント）。
* `app/todos/loading.tsx`, `app/todos/error.tsx`: 状態 UI。
* `lib/todos.ts`: データ取得（サーバー専用）。
* 必要なら `app/layout.tsx` にナビを追加。

**Diff（概略）**

```ts
// lib/todos.ts
export type Todo = { id: number; title: string; done: boolean };
export async function fetchTodos(): Promise<Todo[]> {
  // 疑似 I/O
  await new Promise(r => setTimeout(r, 300));
  return [
    { id: 1, title: "Buy milk", done: false },
    { id: 2, title: "Write docs", done: true },
  ];
}
```

```tsx
// app/todos/page.tsx
import { fetchTodos } from "@/lib/todos";

export const dynamic = "force-static"; // SSG 相当（デモ用）

export default async function TodosPage() {
  const todos = await fetchTodos();
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Todos</h1>
      <ul className="space-y-2">
        {todos.map(t => (
          <li key={t.id} className="border p-3 rounded-xl">
            <span>{t.title}</span>
            {t.done ? <span className="ml-2">✅</span> : null}
          </li>
        ))}
      </ul>
    </main>
  );
}
```

```tsx
// app/todos/loading.tsx
export default function Loading() {
  return <p className="p-6">Loading todos...</p>;
}
```

```tsx
// app/todos/error.tsx
'use client';

export default function Error({ error }: { error: Error }) {
  return <p className="p-6 text-red-600">Error: {error.message}</p>;
}
```

**検証**

```
npm run lint
npm run dev
# http://localhost:3000/todos を手動確認
```

---

### T2: API Route の追加（`/api/ping`）

**目的**: 最小の GET エンドポイントを追加し、クライアントから fetch。

```ts
// app/api/ping/route.ts
import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({ ok: true, at: new Date().toISOString() });
}
```

```tsx
// app/page.tsx（一例）
async function Ping() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/ping`, { cache: 'no-store' });
  const data = await res.json();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Home</h1>
      {/* @ts-expect-error Async Server Component */}
      <Ping />
    </main>
  );
}
```

---

## 7. テスト & 品質

* **Lint**: `npm run lint`（エラー 0 であること）。
* **型**: `tsc --noEmit`（型エラー 0）。
* **Unit**: Vitest/Jest（導入されていなければ雛形 PR を先行）。
* **E2E**: Playwright（任意）。
* **パフォーマンス**: 不要な `cache: 'no-store'` を避け、RSC と Cache の基本を順守。

---

## 8. セキュリティ & 秘匿情報

* `.env*` の直接参照・出力禁止。必要なキーは **.env.example** にコメント付きで追加（例: `NEXT_PUBLIC_BASE_URL`）。
* ライセンス遵守（コピー&ペースト時は出典を明記し、ライセンス互換性を確認）。
* 依存追加は理由とサイズ/リスクの説明を PR に記載。

---

## 9. 失敗しやすいポイント（チェックリスト）

* [ ] `app/` と `pages/` の混在を避けたか。
* [ ] サーバーコンポーネントでブラウザ専用 API を使っていないか。
* [ ] `use client` の付け忘れ/付けすぎはないか。
* [ ] 画像に `alt` が設定されているか。
* [ ] fetch の `cache` 指定は妥当か（SSR/SSG/ISR の方針と一致）。
* [ ] 未使用コード/デッドコードを削除したか。
* [ ] 依存追加時にバンドルサイズや Node 互換を確認したか。

---

## 10. スクリプト雛形（追記提案）

```jsonc
// package.json 抜粋
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  }
}
```

```jsonc
// tsconfig.json 抜粋
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM"],
    "jsx": "preserve",
    "moduleResolution": "bundler",
    "module": "ESNext",
    "strict": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  }
}
```

```js
// next.config.js（最小）
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { serverActions: { allowedOrigins: ["*"] } },
};
module.exports = nextConfig;
```

---

## 11. 運用メモ（Codex CLI）

* 大きな変更は **Plan → 小さな diff → 承認 → 実行** を徹底。
* 依存追加・設定変更は必ず **理由/影響/ロールバック手順** を PR に記載。
* 生成系のコードでも **著作権/ライセンス** を意識し、出典があれば明記。

---

## 12. 付録：PR テンプレ（例）

```
## 概要
- この PR の目的と背景

## 変更点
- 何をどう変えたか（ファイル/ルーティング/型）

## 動作確認
- 手順と期待結果（URL/スクショ）

## 影響範囲
- 既存機能への影響/互換性/パフォーマンス

## リスクと対策
- 既知の懸念点・ロールバック方法

## 補足
- 関連 Issue/ドキュメント/出典
```

---

### これで “MCP 程度の Next.js AGENTS.md” は完成です

* 必要に応じて、API スキーマや DB（Prisma, Drizzle 等）の章を追加してください。
* Tailwind/Playwright/Vitest を使う場合は、別 PR で雛形導入→最小テスト作成を推奨。
