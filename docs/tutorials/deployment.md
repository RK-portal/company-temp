# デプロイ手順チュートリアル

このチュートリアルでは、完成したサイトを実際に公開する手順を詳しく説明します。

## 目次

1. [デプロイ前の準備](#デプロイ前の準備)
2. [Vercelへの簡単デプロイ](#vercelへの簡単デプロイ)
3. [カスタムドメインの設定](#カスタムドメインの設定)
4. [環境変数の本番設定](#環境変数の本番設定)
5. [デプロイ後の確認](#デプロイ後の確認)
6. [継続的デプロイの設定](#継続的デプロイの設定)

## デプロイ前の準備

### ステップ1: ビルドテスト

本番環境と同じ条件でビルドが成功することを確認：

```bash
# 環境変数をクリア
unset NODE_ENV

# 本番ビルド
pnpm build

# ビルド成功を確認
✓ Generating static pages (XX/XX)
✓ Collecting build traces
✓ Finalizing page optimization
✓ Collecting build traces

# ビルド結果をプレビュー
pnpm preview
```

### ステップ2: チェックリスト

デプロイ前に以下を確認：

- [ ] すべてのページが正しく表示される
- [ ] 画像がすべて表示される
- [ ] フォームが動作する（ローカルでテスト可能な範囲で）
- [ ] リンク切れがない
- [ ] 404ページが機能する
- [ ] メタデータ（title、description）が設定されている
- [ ] ファビコンが設定されている
- [ ] robots.txtとsitemap.xmlが生成される

### ステップ3: Gitリポジトリの準備

```bash
# Gitリポジトリを初期化（まだの場合）
git init

# .gitignoreの確認
cat .gitignore
# 以下が含まれていることを確認:
# node_modules
# .next
# out
# .env*.local

# すべてのファイルをコミット
git add .
git commit -m "Initial commit - ready for deployment"

# GitHubにリポジトリを作成してプッシュ
git remote add origin https://github.com/your-username/your-repo.git
git branch -M main
git push -u origin main
```

## Vercelへの簡単デプロイ

### ステップ1: Vercelアカウントの作成

1. [Vercel](https://vercel.com)にアクセス
2. "Sign Up"をクリック
3. GitHubアカウントで登録（推奨）

### ステップ2: プロジェクトのインポート

1. Vercelダッシュボードで"New Project"をクリック
2. GitHubリポジトリを選択
3. "Import"をクリック

### ステップ3: プロジェクト設定

```
Project Name: my-company-site
Framework Preset: Next.js
Root Directory: ./
Build Command: pnpm build
Output Directory: out
Install Command: pnpm install
```

### ステップ4: 環境変数の設定

Environment Variablesセクションで以下を設定：

```
NEXT_PUBLIC_SITE_URL = https://my-company-site.vercel.app
NEXT_PUBLIC_FORMSPREE_ID = your-formspree-id
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = your-google-maps-key
NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX
NEXT_PUBLIC_TURNSTILE_SITE_KEY = your-turnstile-key
```

**注意**: 本番用の値を設定してください

### ステップ5: デプロイ

"Deploy"ボタンをクリックして、デプロイを開始。

```
Building...
Installing dependencies...
Running "pnpm build"...
Generating static pages...
Uploading static files...
Deployment completed!
```

## カスタムドメインの設定

### ステップ1: ドメインの準備

ドメインをお持ちでない場合：
- [お名前.com](https://www.onamae.com/)
- [ムームードメイン](https://muumuu-domain.com/)
- [Google Domains](https://domains.google/)

### ステップ2: Vercelでドメイン追加

1. プロジェクトのSettingsページへ
2. "Domains"セクションを選択
3. "Add Domain"をクリック
4. ドメイン名を入力（例: `example.com`）

### ステップ3: DNS設定

#### Aレコード（ルートドメイン用）

```
Type: A
Name: @
Value: 76.76.21.21
```

#### CNAMEレコード（サブドメイン用）

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### 設定例（お名前.com）

1. DNS設定画面にログイン
2. "DNSレコード設定"を選択
3. 以下を追加：

```
ホスト名: （空欄）
TYPE: A
VALUE: 76.76.21.21

ホスト名: www
TYPE: CNAME
VALUE: cname.vercel-dns.com
```

### ステップ4: SSL証明書

Vercelが自動的にLet's EncryptのSSL証明書を設定します。

確認方法：
```bash
# HTTPSでアクセス可能か確認
curl -I https://your-domain.com

# レスポンスヘッダーを確認
HTTP/2 200
strict-transport-security: max-age=63072000; includeSubDomains; preload
```

## 環境変数の本番設定

### Formspreeの設定

1. [Formspree](https://formspree.io)でアカウント作成
2. 新しいフォームを作成
3. フォームIDをコピー
4. Vercelの環境変数に設定

### Google Maps APIの設定

1. [Google Cloud Console](https://console.cloud.google.com)
2. 新しいプロジェクトを作成
3. Maps JavaScript APIを有効化
4. APIキーを作成
5. HTTPリファラー制限を設定：
   ```
   https://your-domain.com/*
   https://www.your-domain.com/*
   ```

### Google Analyticsの設定

1. [Google Analytics](https://analytics.google.com)
2. プロパティを作成
3. 測定IDをコピー（G-XXXXXXXXXX）
4. Vercelに設定

### 環境変数の更新方法

```bash
# Vercel CLIを使用
vercel env add NEXT_PUBLIC_SITE_URL production

# または、Vercelダッシュボードで
Settings → Environment Variables → Edit
```

## デプロイ後の確認

### ステップ1: 基本動作確認

チェックリスト：

```markdown
## ページ表示
- [ ] トップページ: https://your-domain.com
- [ ] 会社情報: https://your-domain.com/company
- [ ] 施工事例一覧: https://your-domain.com/works
- [ ] 施工事例詳細: https://your-domain.com/works/[slug]
- [ ] お問い合わせ: https://your-domain.com/contact

## 機能確認
- [ ] ナビゲーションメニュー
- [ ] モバイルメニュー
- [ ] フォーム送信
- [ ] 画像表示
- [ ] 外部リンク

## SEO確認
- [ ] robots.txt: https://your-domain.com/robots.txt
- [ ] sitemap.xml: https://your-domain.com/sitemap.xml
- [ ] OGP画像（SNSシェアテスト）
```

### ステップ2: パフォーマンステスト

[PageSpeed Insights](https://pagespeed.web.dev/)でテスト：

```
URL: https://your-domain.com

期待される結果:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+
```

### ステップ3: セキュリティヘッダー確認

[Security Headers](https://securityheaders.com/)でチェック：

```
期待されるヘッダー:
✓ X-Content-Type-Options: nosniff
✓ X-Frame-Options: SAMEORIGIN
✓ Strict-Transport-Security
✓ Referrer-Policy
```

## 継続的デプロイの設定

### GitHubとの連携

プッシュするだけで自動デプロイ：

```bash
# 変更をコミット
git add .
git commit -m "Update: 新しい施工事例を追加"

# mainブランチにプッシュ
git push origin main

# Vercelが自動的にデプロイを開始
```

### ブランチプレビュー

開発ブランチで事前確認：

```bash
# 新しいブランチを作成
git checkout -b feature/new-page

# 変更をコミット＆プッシュ
git add .
git commit -m "Add: 新しいページ"
git push origin feature/new-page

# VercelがプレビューURLを生成
# https://my-site-git-feature-new-page.vercel.app
```

### デプロイ通知の設定

1. Vercel → Settings → Notifications
2. 以下を設定：
   - Deployment Started
   - Deployment Succeeded
   - Deployment Failed

## トラブルシューティング

### ビルドエラー

```bash
# エラー: Cannot find module
解決: 
- package.jsonを確認
- node_modulesを削除して再インストール
- pnpm install

# エラー: Image Optimization Error
解決:
- next.config.jsでunoptimized: true を確認
```

### 404エラー

```bash
# 原因: 静的生成されていないページ
解決:
- generateStaticParamsを確認
- ビルドログでページ生成を確認
```

### 環境変数が反映されない

```bash
# 確認方法
console.log(process.env.NEXT_PUBLIC_SITE_URL)

# 解決:
- NEXT_PUBLIC_プレフィックスを確認
- Vercelで再デプロイ
- キャッシュクリア
```

## デプロイ後のメンテナンス

### 定期的な更新

```bash
# 依存関係の更新（月1回程度）
pnpm update
pnpm audit fix

# ビルドテスト
pnpm build
```

### バックアップ

```bash
# データベースを使用していない場合
# Gitがバックアップとして機能

# コンテンツのバックアップ
tar -czf backup-content-$(date +%Y%m%d).tar.gz content/
```

### モニタリング

1. **Vercel Analytics**（有料）
   - リアルタイムアクセス
   - パフォーマンス指標

2. **Google Analytics**
   - ユーザー行動分析
   - コンバージョン追跡

3. **Uptime監視**
   - [UptimeRobot](https://uptimerobot.com/)（無料）
   - 5分間隔でチェック

---

お疲れさまでした！サイトが正常に公開されました。

継続的な改善については[運用マニュアル](../OPERATION.md)を参照してください。