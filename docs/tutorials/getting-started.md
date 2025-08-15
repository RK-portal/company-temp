# はじめに - 15分でセットアップ

このチュートリアルでは、企業向けホームページテンプレートを使用して、15分でサイトを立ち上げる方法を説明します。

## 前提条件

始める前に、以下がインストールされていることを確認してください：

- Node.js 18.17.0以上
- Git
- テキストエディタ（VS Code推奨）

## ステップ1: プロジェクトの準備（3分）

### 1.1 プロジェクトをダウンロード

```bash
# GitHubからクローン（リポジトリがある場合）
git clone https://github.com/your-repo/company-template.git my-company-site
cd my-company-site

# または、ZIPファイルをダウンロードして解凍
```

### 1.2 依存関係のインストール

```bash
# pnpmを使用（推奨）
npm install -g pnpm
pnpm install

# またはnpmを使用
npm install
```

## ステップ2: 基本設定（5分）

### 2.1 環境変数の設定

```bash
# .env.localファイルを作成
cp .env.example .env.local
```

`.env.local`を編集：

```env
# 最小限の設定
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_FORMSPREE_ID=your-formspree-id  # 後で設定可能
```

### 2.2 会社情報の設定

`config/site.ts`を編集：

```typescript
export const siteConfig = {
  name: '株式会社あなたの会社',
  nameEn: 'Your Company Inc.',
  description: 'あなたの会社のキャッチフレーズ',
  
  contact: {
    tel: '03-1234-5678',
    email: 'info@your-company.com',
    hours: {
      weekday: '9:00-18:00',
      weekend: '10:00-17:00',
      holiday: '定休日：日曜日',
    },
  },
  
  address: {
    postal: '100-0001',
    prefecture: '東京都',
    city: '千代田区',
    street: '千代田1-1-1',
  },
}
```

### 2.3 ブランドカラーの設定

`tokens/brand.json`を編集：

```json
{
  "colors": {
    "primary": "#0066CC",      // あなたのメインカラー
    "secondary": "#00A0B0",    // サブカラー
    "accent": "#F5A623"        // アクセントカラー
  }
}
```

## ステップ3: コンテンツの追加（5分）

### 3.1 ロゴの設定

1. あなたの会社のロゴを準備（推奨: SVGまたはPNG、幅200-300px）
2. `public/images/logo.svg`として保存

### 3.2 トップページの編集

`app/(site)/page.tsx`の主要部分を編集：

```typescript
// ヒーローセクションのテキストを変更
const heroContent = {
  title: 'あなたの会社のメッセージ',
  subtitle: 'サブメッセージやキャッチコピー',
  ctaText: 'お問い合わせ',
  ctaLink: '/contact'
}
```

### 3.3 初期コンテンツの作成

施工事例を1つ追加：

`content/works/first-project.md`を作成：

```markdown
---
title: '最初のプロジェクト'
date: '2025-08-14'
category: '新築'
description: 'プロジェクトの説明'
thumbnail: '/images/placeholder.svg'
---

プロジェクトの詳細をここに記載します。
```

## ステップ4: 動作確認（2分）

### 4.1 開発サーバーの起動

```bash
pnpm dev
# または
npm run dev
```

### 4.2 ブラウザで確認

1. http://localhost:3000 を開く
2. 以下を確認：
   - [ ] ロゴが表示される
   - [ ] 会社名が正しい
   - [ ] ブランドカラーが反映されている
   - [ ] ナビゲーションが動作する
   - [ ] お問い合わせページにアクセスできる

## 次のステップ

基本的なセットアップが完了しました！次は以下を行いましょう：

### 1. コンテンツの充実

- **会社情報の追加**: `/company`ページの編集
- **事業内容の記載**: `/house`ページの編集
- **施工事例の追加**: `content/works/`にMarkdownファイルを追加

### 2. フォーム設定

[Formspree](https://formspree.io)でアカウントを作成し、フォームIDを取得：

```env
NEXT_PUBLIC_FORMSPREE_ID=your-actual-formspree-id
```

### 3. デプロイ

Vercelへの簡単デプロイ：

```bash
# Vercel CLIをインストール
npm i -g vercel

# デプロイ
vercel
```

## トラブルシューティング

### エラー: "Module not found"

```bash
# node_modulesを削除して再インストール
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### ポート3000が使用中

```bash
# 別のポートで起動
PORT=3001 pnpm dev
```

### スタイルが反映されない

1. ブラウザのキャッシュをクリア（Cmd/Ctrl + Shift + R）
2. 開発サーバーを再起動

## よくある質問

**Q: モバイル表示を確認したい**
A: ブラウザの開発者ツール（F12）でモバイルビューを確認できます。

**Q: 画像が表示されない**
A: 画像は`public/images/`に配置し、パスは`/images/`で始めてください。

**Q: ページを追加したい**
A: `app/(site)/`に新しいフォルダとpage.tsxを作成してください。

---

お疲れさまでした！これで基本的なサイトが動作するようになりました。

詳しいカスタマイズ方法は[カスタマイズガイド](/CUSTOMIZE.md)を参照してください。