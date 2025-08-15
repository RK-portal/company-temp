# デプロイメントガイド

本ガイドでは、企業向けホームページテンプレートを様々な環境にデプロイする方法を説明します。

## 目次

1. [事前準備](#事前準備)
2. [Vercel へのデプロイ](#vercel-へのデプロイ)
3. [Netlify へのデプロイ](#netlify-へのデプロイ)
4. [AWS S3 + CloudFront へのデプロイ](#aws-s3--cloudfront-へのデプロイ)
5. [GitHub Pages へのデプロイ](#github-pages-へのデプロイ)
6. [自社サーバーへのデプロイ](#自社サーバーへのデプロイ)
7. [環境変数の管理](#環境変数の管理)
8. [デプロイ後の確認](#デプロイ後の確認)
9. [トラブルシューティング](#トラブルシューティング)

## 事前準備

### 1. ビルドの確認

デプロイ前に、ローカル環境でビルドが正常に完了することを確認します。

```bash
# ビルドの実行
pnpm build

# ビルド結果の確認
pnpm preview
```

### 2. 環境変数の準備

本番環境用の環境変数を準備します。

```env
# .env.production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_FORMSPREE_ID=your-production-formspree-id
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-production-api-key
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-production-site-key
```

### 3. ドメインの準備

カスタムドメインを使用する場合は、事前にドメインを取得し、DNSの設定準備をします。

## Vercel へのデプロイ

### 方法1: Vercel CLI を使用

#### 1. Vercel CLI のインストール

```bash
npm i -g vercel
```

#### 2. Vercelにログイン

```bash
vercel login
```

#### 3. プロジェクトのデプロイ

```bash
# 開発環境へデプロイ
vercel

# プロダクション環境へデプロイ
vercel --prod
```

### 方法2: GitHub 連携（推奨）

#### 1. GitHubリポジトリの準備

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

#### 2. Vercelでプロジェクト作成

1. [Vercel](https://vercel.com)にログイン
2. "New Project"をクリック
3. GitHubアカウントを連携
4. リポジトリを選択してインポート

#### 3. ビルド設定

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "out",
  "installCommand": "pnpm install",
  "framework": "nextjs"
}
```

#### 4. 環境変数の設定

Vercelダッシュボード → Settings → Environment Variables

```
NEXT_PUBLIC_SITE_URL = https://your-domain.vercel.app
NEXT_PUBLIC_FORMSPREE_ID = your-formspree-id
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = your-api-key
NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX
NEXT_PUBLIC_TURNSTILE_SITE_KEY = your-site-key
```

#### 5. カスタムドメインの設定

1. Settings → Domains
2. "Add Domain"をクリック
3. ドメインを入力
4. DNSレコードを設定

```
# Aレコード
A @ 76.76.21.21

# CNAMEレコード
CNAME www cname.vercel-dns.com
```

### Vercel設定ファイル（オプション）

`vercel.json`を作成してカスタマイズ：

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "out",
  "framework": "nextjs",
  "regions": ["hnd1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        }
      ]
    }
  ]
}
```

## Netlify へのデプロイ

### 方法1: Netlify CLI を使用

#### 1. Netlify CLI のインストール

```bash
npm i -g netlify-cli
```

#### 2. Netlifyにログイン

```bash
netlify login
```

#### 3. プロジェクトの初期化

```bash
netlify init
```

#### 4. デプロイ

```bash
# ビルドしてデプロイ
netlify deploy --prod --build
```

### 方法2: GitHub 連携

#### 1. Netlifyダッシュボードでサイト作成

1. [Netlify](https://www.netlify.com)にログイン
2. "Add new site" → "Import an existing project"
3. GitHubと連携
4. リポジトリを選択

#### 2. ビルド設定

```
Build command: pnpm build
Publish directory: out
```

#### 3. 環境変数の設定

Site settings → Environment variables

### Netlify設定ファイル

`netlify.toml`を作成：

```toml
[build]
  command = "pnpm build"
  publish = "out"

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

## AWS S3 + CloudFront へのデプロイ

### 1. AWS CLI のセットアップ

```bash
# AWS CLI のインストール
brew install awscli  # macOS
# または
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"

# 認証情報の設定
aws configure
```

### 2. S3バケットの作成

```bash
# バケットの作成
aws s3 mb s3://your-website-bucket

# 静的ウェブサイトホスティングの有効化
aws s3 website s3://your-website-bucket \
  --index-document index.html \
  --error-document 404.html
```

### 3. バケットポリシーの設定

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-website-bucket/*"
    }
  ]
}
```

### 4. ビルドとアップロード

```bash
# ビルド
pnpm build

# S3へアップロード
aws s3 sync out/ s3://your-website-bucket \
  --delete \
  --cache-control "public, max-age=31536000" \
  --exclude "*.html" \
  --exclude "*.json"

aws s3 sync out/ s3://your-website-bucket \
  --delete \
  --cache-control "public, max-age=0, must-revalidate" \
  --include "*.html" \
  --include "*.json"
```

### 5. CloudFrontの設定

#### CloudFrontディストリビューションの作成

```bash
aws cloudfront create-distribution \
  --origin-domain-name your-website-bucket.s3-website-region.amazonaws.com \
  --default-root-object index.html
```

#### カスタムエラーページの設定

```json
{
  "ErrorCode": 404,
  "ResponsePagePath": "/404.html",
  "ResponseCode": "404",
  "ErrorCachingMinTTL": 300
}
```

### デプロイスクリプト

`scripts/deploy-aws.sh`を作成：

```bash
#!/bin/bash

# ビルド
echo "Building the project..."
pnpm build

# S3へアップロード
echo "Uploading to S3..."
aws s3 sync out/ s3://$S3_BUCKET \
  --delete \
  --cache-control "public, max-age=31536000" \
  --exclude "*.html" \
  --exclude "*.json"

aws s3 sync out/ s3://$S3_BUCKET \
  --delete \
  --cache-control "public, max-age=0, must-revalidate" \
  --include "*.html" \
  --include "*.json"

# CloudFrontのキャッシュ無効化
echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
  --paths "/*"

echo "Deployment complete!"
```

## GitHub Pages へのデプロイ

### 1. リポジトリの設定

```bash
# package.jsonに追加
{
  "homepage": "https://your-username.github.io/your-repo-name"
}
```

### 2. GitHub Actions の設定

`.github/workflows/deploy.yml`を作成：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build
        env:
          NEXT_PUBLIC_SITE_URL: ${{ vars.SITE_URL }}
          NEXT_PUBLIC_FORMSPREE_ID: ${{ secrets.FORMSPREE_ID }}
          NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: ${{ secrets.GOOGLE_MAPS_API_KEY }}

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v3
```

### 3. リポジトリ設定

1. Settings → Pages
2. Source: "GitHub Actions"を選択

## 自社サーバーへのデプロイ

### 1. サーバー要件

- Node.js 18以上（静的ホスティングの場合は不要）
- Nginx または Apache
- SSL証明書（Let's Encrypt推奨）

### 2. Nginx設定例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    root /var/www/your-site/out;
    index index.html;

    # セキュリティヘッダー
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # 静的ファイルのキャッシュ
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # HTMLファイルはキャッシュしない
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # SPAフォールバック
    location / {
        try_files $uri $uri.html $uri/ /index.html;
    }

    # gzip圧縮
    gzip on;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json;
    gzip_min_length 1000;
}
```

### 3. デプロイスクリプト

```bash
#!/bin/bash

# ビルド
echo "Building the project..."
pnpm build

# サーバーへアップロード
echo "Uploading to server..."
rsync -avz --delete out/ user@your-server:/var/www/your-site/out/

# Nginxリロード
echo "Reloading Nginx..."
ssh user@your-server "sudo nginx -s reload"

echo "Deployment complete!"
```

## 環境変数の管理

### 開発環境と本番環境の分離

```bash
# .env.local（開発環境）
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# .env.production（本番環境）
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 環境別ビルド

```bash
# 本番環境用ビルド
NODE_ENV=production pnpm build

# ステージング環境用ビルド
NODE_ENV=staging pnpm build
```

### 機密情報の管理

- APIキーやトークンは環境変数で管理
- `.env.local`はGitにコミットしない
- 各デプロイサービスの環境変数機能を使用

## デプロイ後の確認

### 1. 基本チェックリスト

- [ ] トップページが正しく表示される
- [ ] 全てのページにアクセスできる
- [ ] 画像が正しく表示される
- [ ] フォーム送信が機能する
- [ ] 外部リンクが正しく動作する
- [ ] 404ページが表示される
- [ ] モバイル表示が正常
- [ ] SSL証明書が有効

### 2. パフォーマンステスト

```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun --upload.target=temporary-public-storage
```

### 3. SEOチェック

- robots.txtが配信される
- sitemap.xmlが生成される
- メタタグが正しく設定される
- 構造化データが出力される

## トラブルシューティング

### よくある問題と解決方法

#### 1. ビルドエラー

```bash
# キャッシュクリア
rm -rf .next node_modules
pnpm install
pnpm build
```

#### 2. 画像が表示されない

- 画像パスが正しいか確認（`/images/`で始まる）
- public/imagesに画像が存在するか確認
- next.config.jsの設定確認

#### 3. フォームが動作しない

- 環境変数が正しく設定されているか確認
- Formspree IDが本番用か確認
- CORSエラーがないか確認

#### 4. ページが見つからない

- out/ディレクトリに全ページが生成されているか確認
- 動的ルートが正しく生成されているか確認
- サーバー設定でフォールバックが有効か確認

### デバッグ方法

```bash
# ビルドログの詳細表示
DEBUG=* pnpm build

# 生成されたファイルの確認
find out -name "*.html" | head -20

# 環境変数の確認
pnpm build && grep -r "NEXT_PUBLIC" out/
```

---

サポートが必要な場合は、[GitHub Issues](https://github.com/your-repo/issues)でお問い合わせください。

最終更新: 2025-08-14