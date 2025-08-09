# SOW1: 環境構築 & 初期設定

## 目的/範囲
Next.js 14 (App Router) を使用した企業向けホームページテンプレートの開発環境を構築し、プロジェクトの基盤となる初期設定を完了する。TypeScript、Tailwind CSS、ESLint/Prettier等の開発ツールチェーンを統合し、効率的な開発フローを確立する。

## 成果物
- Next.js 14プロジェクト（App Router構成）
- TypeScript設定ファイル（tsconfig.json）
- Tailwind CSS設定（tailwind.config.ts、グローバルCSS）
- ESLint/Prettier設定（.eslintrc.json、.prettierrc）
- パッケージ管理設定（package.json、pnpm-lock.yaml）
- 環境変数テンプレート（.env.example）
- Git設定（.gitignore）
- ビルド設定（next.config.ts）
- 開発用スクリプト（package.jsonのscripts）

## 依存関係
- Node.js 18.x以上
- pnpm 8.x
- Git

## 変更対象（ファイル/配置）
```
/
├── app/                    # App Router
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # ホームページ
│   └── globals.css        # グローバルスタイル
├── components/            # コンポーネントディレクトリ作成
├── lib/                   # ユーティリティディレクトリ作成
├── public/               # 静的ファイル
├── styles/               # スタイル関連
├── .env.example          # 環境変数テンプレート
├── .eslintrc.json        # ESLint設定
├── .gitignore            # Git除外設定
├── .prettierrc           # Prettier設定
├── next.config.ts        # Next.js設定
├── package.json          # パッケージ定義
├── pnpm-lock.yaml        # 依存関係ロック
├── tailwind.config.ts    # Tailwind設定
└── tsconfig.json         # TypeScript設定
```

## コンポーネント責務/Props契約
初期設定のため、具体的なコンポーネント実装は含まない。基本的なディレクトリ構造のみを準備。

## UI挙動
- 開発サーバー起動時にデフォルトページが表示される
- ホットリロードが正常に動作する
- TypeScriptの型チェックがビルド時に実行される

## A11y配慮
- HTMLの言語属性を日本語（lang="ja"）に設定
- 基本的なメタタグ（viewport、description）を設定
- フォーカス管理の基盤を準備

## 受け入れ基準（DoD）
1. `pnpm dev`で開発サーバーが起動する
2. `pnpm build`でエラーなくビルドが完了する
3. `pnpm lint`でリントエラーが0件
4. TypeScriptの厳格モード（strict: true）が有効
5. Tailwind CSSのユーティリティクラスが使用可能
6. 静的エクスポート（output: "export"）が設定済み
7. 画像最適化が無効化済み（unoptimized: true）
8. React Strict Modeが有効
9. 基本的なSEOメタタグが設定済み
10. ソースマップが開発環境で有効

## 除外項目
- 実際のUIコンポーネント実装
- コンテンツの投入
- 外部サービスとの連携設定
- デプロイ設定
- テスト環境のセットアップ

## Claude Code実装メモ
1. `pnpm create next-app@latest`で初期化（TypeScript、Tailwind CSS、ESLint、App Router選択）
2. next.config.tsに静的エクスポート設定追加（output: "export"、images.unoptimized: true）
3. package.jsonのscriptsに必要なコマンド追加（typecheck、format等）
4. .env.exampleに基本的な環境変数テンプレート作成
5. tsconfig.jsonでpathsエイリアス設定（@/components、@/lib等）
6. tailwind.config.tsでカスタムカラー、フォント、スペーシングの拡張準備
7. app/layout.tsxでhtml要素にlang="ja"追加、基本的なメタタグ設定
8. ESLint設定でNext.js推奨ルール適用、import順序ルール追加
9. Prettierでセミコロンなし、シングルクォート設定
10. .gitignoreに.env.local、.DS_Store等追加