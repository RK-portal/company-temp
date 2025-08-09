# SOW7: 機能 & 外部連携

## 目的/範囲
企業向けホームページテンプレートに必要な外部サービス連携機能と、SEO・アクセシビリティ・パフォーマンス最適化機能を実装する。フォーム送信、地図表示、アクセス解析、Bot対策等の外部サービスとの統合を行う。

## 成果物
- フォーム送信機能（lib/formSubmit.ts）
- Google Maps統合（components/integrations/GoogleMap.tsx）
- Google Analytics設定（components/integrations/GoogleAnalytics.tsx）
- Cloudflare Turnstile統合（components/integrations/Turnstile.tsx）
- SEOメタデータ管理（lib/seo.ts）
- 構造化データ生成（lib/structuredData.ts）
- サイトマップ生成（app/sitemap.xml/route.ts）
- robots.txt（app/robots.txt/route.ts）
- 404エラーページ（app/not-found.tsx）
- 環境変数設定（.env.example更新）
- パフォーマンス最適化設定（lib/performance.ts）

## 依存関係
- SOW1～6の完了
- @googlemaps/react-wrapper
- @cloudflare/turnstile-react
- next-sitemap（サイトマップ生成）
- schema-dts（構造化データ型定義）

## 変更対象（ファイル/配置）
```
/
├── app/
│   ├── sitemap.xml/
│   │   └── route.ts            # 動的サイトマップ生成
│   ├── robots.txt/
│   │   └── route.ts            # robots.txt生成
│   └── not-found.tsx           # 404エラーページ
├── components/
│   └── integrations/
│       ├── GoogleAnalytics.tsx # GA統合コンポーネント
│       ├── GoogleMap.tsx       # 地図表示（更新）
│       └── Turnstile.tsx       # Bot対策ウィジェット
├── lib/
│   ├── formSubmit.ts           # フォーム送信処理
│   ├── seo.ts                  # SEOメタデータ管理
│   ├── structuredData.ts       # 構造化データ生成
│   └── performance.ts          # パフォーマンス最適化
├── hooks/
│   └── useAnalytics.ts         # アナリティクスフック
├── types/
│   └── integrations.ts         # 外部連携型定義
├── public/
│   └── manifest.json           # PWAマニフェスト
└── .env.example                # 環境変数テンプレート更新
```

## コンポーネント責務/Props契約

### GoogleAnalytics
- **責務**: Google Analytics 4の初期化とページビュー追跡
- **Props**:
  - `measurementId: string` - GA4測定ID

### GoogleMap（更新）
- **責務**: Google Maps埋め込みとマーカー表示
- **Props**:
  - `apiKey: string` - Google Maps APIキー
  - `center: {lat: number, lng: number}` - 中心座標
  - `zoom?: number` - ズームレベル
  - `height?: string` - 地図の高さ
  - `markers?: MapMarker[]` - マーカー配列

### Turnstile
- **責務**: Cloudflare TurnstileによるBot対策
- **Props**:
  - `siteKey: string` - Turnstileサイトキー
  - `onVerify: (token: string) => void` - 検証成功コールバック
  - `theme?: 'light' | 'dark' | 'auto'` - テーマ

## UI挙動
- フォーム送信時にローディング状態表示
- 送信エラー時にユーザーフレンドリーなエラーメッセージ
- 地図はレスポンシブに高さ調整
- Turnstileは必要時のみ表示（プログレッシブエンハンスメント）
- 404ページから適切なナビゲーション提供

## A11y配慮
- フォームエラーの音声読み上げ対応
- 地図に代替テキスト情報提供
- Bot対策ウィジェットのアクセシブルな実装
- 構造化データによる検索エンジン理解向上
- スキップリンクの適切な実装

## 受け入れ基準（DoD）
1. フォーム送信が成功し、サンクスページへ遷移
2. Google Mapsが正しい位置を表示
3. Google Analyticsでページビューが記録される
4. Turnstileによるbot検証が機能する
5. 全ページに適切なメタタグが設定される
6. 構造化データ（Organization、LocalBusiness、Article）が出力
7. sitemap.xmlが全ページを含んで生成される
8. robots.txtが適切に設定される
9. 404ページが表示され、ホームへの導線がある
10. 環境変数による設定が機能する

## 除外項目
- 実際のメール送信サーバー構築
- Google Maps APIの有料機能
- 高度なアナリティクス設定
- A/Bテスト機能
- リアルタイム通知機能

## Claude Code実装メモ
1. .env.exampleに必要な環境変数追加（GA_MEASUREMENT_ID、NEXT_PUBLIC_GOOGLE_MAPS_API_KEY等）
2. lib/formSubmit.tsでFormspreeまたはNetlify Forms向けPOST実装
3. lib/seo.tsでdefaultMetadata定義、各ページ用メタデータ生成関数
4. lib/structuredData.tsでOrganization、LocalBusiness、Article等のJSON-LD生成
5. app/sitemap.xml/route.tsで動的にコンテンツ一覧からサイトマップ生成
6. app/robots.txt/route.tsでSitemap URLを含むrobots.txt生成
7. components/integrations/GoogleAnalytics.tsxでgtag初期化、usePathnameでルート変更追跡
8. components/integrations/Turnstile.tsxでチャレンジウィジェット表示、トークン取得
9. app/not-found.tsxで404ページ実装、関連ページへのリンク提供
10. lib/performance.tsで画像最適化、リソースヒント、prefetch設定等のヘルパー実装