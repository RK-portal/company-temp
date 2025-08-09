# 企業向けホームページテンプレート

不動産・ハウジング業界向けの再利用可能な企業サイトテンプレート。Next.js 14 (App Router) とTypeScriptで構築され、短時間でブランド差し替えが可能な設計。

## 🚀 特徴

- **高速なSSG対応** - Next.js 14のStatic Site Generationで高速表示
- **完全レスポンシブ** - モバイルファーストの設計
- **カスタマイズ容易** - デザイントークンによる一括ブランド変更
- **アクセシビリティ対応** - WCAG 2.1 AA準拠
- **SEO最適化** - 構造化データ、OGP対応
- **高パフォーマンス** - Lighthouse Score 90+

## 📋 要件

### システム要件

- Node.js 18.17.0 以上
- pnpm 8.x 以上（推奨）またはnpm 9.x以上
- Git

### 推奨開発環境

- VS Code（推奨エディタ）
- 以下のVS Code拡張機能：
  - ESLint
  - Prettier - Code formatter
  - Tailwind CSS IntelliSense
  - TypeScript Vue Plugin (Volar)

## 🛠️ セットアップ

### 1. プロジェクトの初期化

#### 新規プロジェクトとして開始する場合

```bash
# Next.jsプロジェクトを作成
npx create-next-app@latest my-company-site --typescript --tailwind --app --no-src-dir --import-alias "@/*"

# プロジェクトディレクトリに移動
cd my-company-site

# pnpmを使用する場合（推奨）
corepack enable
corepack prepare pnpm@latest --activate
```

#### 既存テンプレートを使用する場合

```bash
# テンプレートをクローン（GitHubリポジトリがある場合）
git clone <repository-url> my-company-site
cd my-company-site

# Gitの履歴を削除して新規プロジェクトとして開始
rm -rf .git
git init
```

### 2. 依存関係のインストール

```bash
# pnpmを使用（推奨）
pnpm install

# またはnpmを使用
npm install
```

### 3. 環境変数の設定

プロジェクトルートに `.env.local` ファイルを作成：

```bash
cp .env.example .env.local
```

`.env.local` を編集して必要な値を設定：

```env
# サイトのURL（開発環境）
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# フォーム送信（Formspree）
NEXT_PUBLIC_FORMSPREE_ID=your-formspree-id

# Google Maps API（会社情報ページで使用）
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# Google Analytics（オプション）
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Cloudflare Turnstile（Bot対策、オプション）
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-turnstile-site-key
```

### 4. 開発サーバーの起動

```bash
pnpm dev
# または
npm run dev
```

[http://localhost:3000](http://localhost:3000) でサイトが表示されます。

## 🏗️ ビルドとデプロイ

### ローカルビルド

```bash
# プロダクションビルド
pnpm build
# または
npm run build

# ビルド結果の確認
pnpm preview
# または
npm run preview
```

ビルド成果物は `out/` ディレクトリに生成されます。

### Vercel へのデプロイ

#### 方法1: Vercel CLI を使用（クイックデプロイ）

```bash
# Vercel CLIをインストール（初回のみ）
npm i -g vercel

# Vercelにログイン（初回のみ）
vercel login

# デプロイ（開発環境）
vercel

# プロダクション環境へデプロイ
vercel --prod
```

#### 方法2: GitHubと連携（推奨）

1. **GitHubリポジトリの準備**
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Vercelでのプロジェクト作成**
   - [Vercel](https://vercel.com)にログイン
   - "New Project"をクリック
   - GitHubアカウントを連携
   - リポジトリを選択してインポート

3. **ビルド設定**
   - Framework Preset: `Next.js`
   - Build Command: `pnpm build` または `npm run build`
   - Output Directory: `out`
   - Install Command: `pnpm install` または `npm install`

4. **環境変数の設定**
   - Settings → Environment Variables から設定
   - `.env.local` と同じ変数を設定（NEXT_PUBLIC_SITE_URLは本番URLに変更）

5. **カスタムドメインの設定**（オプション）
   - Settings → Domains から設定
   - DNSレコードを追加

## 📁 プロジェクト構造

```
company-demo-site/
├── app/                    # Next.js App Router
│   ├── (site)/            # メインサイトのルートグループ
│   │   ├── layout.tsx     # 共通レイアウト
│   │   ├── page.tsx       # トップページ
│   │   ├── house/         # 事業紹介
│   │   ├── works/         # 施工事例
│   │   ├── company/       # 会社情報
│   │   ├── news/          # ニュース
│   │   ├── contact/       # お問い合わせ
│   │   └── ...           # その他のページ
│   ├── globals.css        # グローバルCSS
│   └── layout.tsx         # ルートレイアウト
├── components/            # Reactコンポーネント
│   ├── ui/               # 基本UIコンポーネント
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── sections/         # ページセクション
│   │   ├── hero.tsx
│   │   ├── features.tsx
│   │   └── ...
│   └── layout/           # レイアウトコンポーネント
│       ├── header.tsx
│       ├── footer.tsx
│       └── ...
├── content/              # Markdownコンテンツ
│   ├── works/           # 施工事例
│   ├── news/            # ニュース
│   └── topics/          # トピックス
├── data/                # JSONデータ
│   ├── properties/      # 物件情報（デモ）
│   └── company.json     # 会社情報
├── lib/                 # ユーティリティ関数
│   ├── content.ts       # コンテンツ読み込み
│   └── utils.ts         # 汎用ユーティリティ
├── public/              # 静的ファイル
│   ├── images/         # 画像ファイル
│   └── fonts/          # フォントファイル
├── styles/             # スタイル関連
│   └── tokens.css      # CSSカスタムプロパティ
├── tokens/             # デザイントークン
│   └── brand.json      # ブランド設定
├── config/             # 設定ファイル
│   ├── site.ts         # サイト基本情報
│   └── navigation.ts   # ナビゲーション設定
├── types/              # TypeScript型定義
├── .env.example        # 環境変数サンプル
├── .gitignore
├── next.config.ts      # Next.js設定
├── package.json
├── tailwind.config.ts  # Tailwind CSS設定
├── tsconfig.json       # TypeScript設定
└── vercel.json         # Vercel設定（オプション）
```

## 🎨 カスタマイズガイド

### 1. ブランドカラーの変更

`tokens/brand.json` を編集：

```json
{
  "colors": {
    "primary": "#1B4E9B",      // メインカラー
    "primary-dark": "#164080",  // メインカラー（濃）
    "primary-light": "#2563EB", // メインカラー（淡）
    "secondary": "#00A0B0",    // サブカラー
    "accent": "#F5A623",       // アクセントカラー
    "text": {
      "primary": "#1F2937",    // 主要テキスト
      "secondary": "#6B7280",  // 補助テキスト
      "inverse": "#FFFFFF"     // 反転テキスト
    },
    "background": {
      "primary": "#FFFFFF",    // 主要背景
      "secondary": "#F9FAFB",  // 補助背景
      "tertiary": "#F3F4F6"    // 第三背景
    },
    "border": "#E5E7EB"        // ボーダー色
  },
  "typography": {
    "fontFamily": {
      "sans": "'Noto Sans JP', sans-serif",
      "display": "'Noto Sans JP', sans-serif"
    }
  }
}
```

### 2. サイト基本情報の設定

`config/site.ts` を編集：

```typescript
export const siteConfig = {
  name: "株式会社サンプル住宅",
  nameEn: "Sample Housing Inc.",
  description: "快適な住まいづくりをお手伝いする総合住宅メーカー",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  logo: "/images/logo.png",
  ogImage: "/images/og-image.jpg",
  contact: {
    tel: "0120-XXX-XXX",
    telDisplay: "0120-XXX-XXX",
    fax: "03-XXXX-XXXX",
    email: "info@example.com",
    hours: {
      weekday: "9:00-18:00",
      weekend: "10:00-17:00",
      holiday: "定休日：水曜日"
    }
  },
  address: {
    postal: "100-0001",
    prefecture: "東京都",
    city: "千代田区",
    street: "千代田1-1-1",
    building: "サンプルビル10F",
    googleMapUrl: "https://maps.google.com/..."
  },
  social: {
    twitter: "https://twitter.com/example",
    facebook: "https://facebook.com/example",
    instagram: "https://instagram.com/example",
    youtube: "https://youtube.com/example",
    line: "https://line.me/example"
  }
}
```

### 3. ナビゲーションメニューの編集

`config/navigation.ts` を編集：

```typescript
export const navigation = {
  main: [
    { 
      label: "ホーム", 
      href: "/" 
    },
    { 
      label: "あさひの家づくり", 
      href: "/house",
      children: [
        { label: "こだわり", href: "/house#features" },
        { label: "施工の流れ", href: "/house#flow" },
        { label: "よくある質問", href: "/house#faq" }
      ]
    },
    { 
      label: "施工事例", 
      href: "/works" 
    },
    { 
      label: "品質・保証",
      children: [
        { label: "品質検査", href: "/quality" },
        { label: "保証制度", href: "/warranty" },
        { label: "アフターメンテナンス", href: "/maintenance" }
      ]
    },
    { 
      label: "会社情報", 
      href: "/company",
      children: [
        { label: "会社概要", href: "/company" },
        { label: "SDGsへの取り組み", href: "/sdgs" },
        { label: "CSR活動", href: "/csr" }
      ]
    },
    { 
      label: "お知らせ",
      children: [
        { label: "ニュース", href: "/news" },
        { label: "トピックス", href: "/topics" }
      ]
    },
    { 
      label: "お問い合わせ", 
      href: "/contact",
      highlight: true  // ボタンとして強調表示
    }
  ],
  footer: {
    // フッター用のナビゲーション設定
  }
}
```

### 4. 画像の管理

#### 画像の配置

```
public/
└── images/
    ├── logo.png              # ロゴ
    ├── og-image.jpg          # OGP画像
    ├── hero/                 # ヒーロー画像
    │   ├── slide-1.jpg
    │   └── slide-2.jpg
    ├── works/                # 施工事例
    │   ├── work-001/
    │   │   ├── main.jpg
    │   │   └── sub-1.jpg
    │   └── ...
    └── company/              # 会社関連
        └── office.jpg
```

#### 画像の最適化

```bash
# 画像最適化スクリプト（要imagemagick）
pnpm optimize-images
```

### 5. コンテンツの管理

#### 施工事例の追加

`content/works/新しい事例.md`:

```markdown
---
title: "モダンな二世帯住宅"
date: "2025-08-08"
category: "二世帯住宅"
tags: ["モダン", "省エネ", "バリアフリー"]
thumbnail: "/images/works/work-001/main.jpg"
images:
  - src: "/images/works/work-001/main.jpg"
    alt: "外観"
  - src: "/images/works/work-001/sub-1.jpg"
    alt: "リビング"
specs:
  structure: "木造在来工法"
  area: "延床面積 165.5㎡"
  completion: "2025年7月"
  location: "東京都世田谷区"
---

## お客様のご要望

二世帯が快適に暮らせる、プライバシーに配慮した住まいを...

## こだわりポイント

### 1. 完全分離型の間取り

各世帯の生活時間の違いに配慮し...
```

#### ニュース記事の追加

`content/news/2025-08-summer-campaign.md`:

```markdown
---
title: "夏の新築キャンペーン開催中"
date: "2025-08-01"
category: "キャンペーン"
tags: ["キャンペーン", "新築"]
excerpt: "8月31日までの期間限定で、新築をご検討の方に特別プランをご用意しました。"
---

この夏、新築をご検討の皆様に朗報です。

## キャンペーン内容

1. **設計料無料**
   - 通常30万円の設計料が無料に

2. **オプション工事割引**
   - 太陽光発電システム20%OFF
   - 床暖房工事15%OFF
```

## 🧪 開発コマンド

```bash
# 開発サーバー起動
pnpm dev

# プロダクションビルド
pnpm build

# ビルド結果のプレビュー
pnpm preview

# コード品質チェック
pnpm lint              # ESLint実行
pnpm lint:fix          # ESLint自動修正
pnpm type-check        # TypeScriptの型チェック
pnpm format            # Prettierでフォーマット

# テスト実行
pnpm test              # ユニットテスト
pnpm test:watch        # ウォッチモード
pnpm test:coverage     # カバレッジレポート
pnpm test:e2e          # E2Eテスト（Playwright）

# その他
pnpm analyze           # バンドルサイズ分析
pnpm clean             # ビルドキャッシュクリア
```

## 🔧 トラブルシューティング

### よくある問題と解決方法

#### 1. `pnpm install`でエラーが発生する

```bash
# node_modulesとlockファイルを削除
rm -rf node_modules pnpm-lock.yaml
# キャッシュをクリア
pnpm store prune
# 再インストール
pnpm install
```

#### 2. ビルドエラー: "out of memory"

```bash
# Node.jsのメモリ上限を増やす
NODE_OPTIONS="--max-old-space-size=4096" pnpm build
```

#### 3. 画像が表示されない

- 画像パスが正しいか確認（`/images/`で始まる）
- publicディレクトリに画像が存在するか確認
- 画像ファイル名に日本語や特殊文字が含まれていないか確認

#### 4. Vercelデプロイエラー

- 環境変数がすべて設定されているか確認
- ビルドコマンドとアウトプットディレクトリが正しいか確認
- `vercel.json`の設定を確認

#### 5. TypeScriptエラー

```bash
# 型定義の再生成
pnpm type-check

# VSCodeの場合、TypeScriptサーバーを再起動
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

### デバッグモード

開発時の詳細なログ出力：

```bash
# 詳細なログを有効化
DEBUG=* pnpm dev
```

## 📊 パフォーマンス最適化

### Lighthouseスコア目標

- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

### 最適化のポイント

1. **画像の最適化**
   - WebP形式の使用
   - 適切なサイズでの配信
   - 遅延読み込みの実装

2. **フォントの最適化**
   - `font-display: swap`の使用
   - サブセット化

3. **JavaScriptの最適化**
   - 不要なライブラリの削除
   - Tree Shakingの活用
   - Code Splittingの実装

## 🤝 貢献ガイドライン

### コーディング規約

- ESLintルールに従う
- コミットメッセージは[Conventional Commits](https://www.conventionalcommits.org/)形式
- プルリクエスト前にテストを実行

### コミットメッセージの例

```
feat: お問い合わせフォームにreCAPTCHA追加
fix: モバイルメニューの表示不具合を修正
docs: READMEにトラブルシューティング追加
style: ヘッダーのレイアウト調整
refactor: コンテンツ取得関数の最適化
test: お問い合わせフォームのテスト追加
```

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 🙏 クレジット

- 画像素材: [Unsplash](https://unsplash.com), [Pexels](https://pexels.com)
- アイコン: [Heroicons](https://heroicons.com)
- フォント: [Google Fonts - Noto Sans JP](https://fonts.google.com/specimen/Noto+Sans+JP)

---

最終更新: 2025-08-08