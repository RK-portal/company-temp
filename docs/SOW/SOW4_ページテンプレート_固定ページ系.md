# SOW4: ページテンプレート（固定ページ系）

## 目的/範囲
企業向けホームページテンプレートの固定ページ（事業紹介、品質・保証関連、会社情報、お問い合わせ）を実装する。各ページで再利用可能なセクションコンポーネントを作成し、統一されたデザインと高い保守性を実現する。

## 成果物
- 事業紹介ページ（app/(site)/house/page.tsx）
- 品質ページ（app/(site)/quality/page.tsx）
- 保証ページ（app/(site)/warranty/page.tsx）
- メンテナンスページ（app/(site)/maintenance/page.tsx）
- 会社情報ページ（app/(site)/company/page.tsx）
- お問い合わせページ（app/(site)/contact/page.tsx）
- お問い合わせ完了ページ（app/(site)/contact/thanks/page.tsx）
- セクションコンポーネント群（components/sections/）
- ページメタデータ設定（lib/metadata.ts）
- データファイル（data/company.json、data/faq.json）

## 依存関係
- SOW1～3の完了
- React Hook Form（フォーム処理）
- zod（バリデーション）
- @googlemaps/react-wrapper（地図表示）
- react-intersection-observer（スクロールアニメーション）

## 変更対象（ファイル/配置）
```
/
├── app/
│   └── (site)/
│       ├── house/
│       │   └── page.tsx         # 事業紹介ページ
│       ├── quality/
│       │   └── page.tsx         # 品質ページ
│       ├── warranty/
│       │   └── page.tsx         # 保証ページ
│       ├── maintenance/
│       │   └── page.tsx         # メンテナンスページ
│       ├── company/
│       │   └── page.tsx         # 会社情報ページ
│       └── contact/
│           ├── page.tsx         # お問い合わせページ
│           └── thanks/
│               └── page.tsx     # サンクスページ
├── components/
│   └── sections/
│       ├── PageHero.tsx         # ページヒーローセクション
│       ├── FeatureGrid.tsx      # 特徴グリッド
│       ├── CounterStats.tsx     # 実績数値カウンター
│       ├── Timeline.tsx         # タイムライン（沿革）
│       ├── FAQ.tsx              # よくある質問
│       ├── CompanyInfo.tsx      # 会社概要テーブル
│       ├── ContactForm.tsx      # お問い合わせフォーム
│       └── GoogleMap.tsx        # Googleマップ
├── data/
│   ├── company.json             # 会社情報データ
│   └── faq.json                # FAQ データ
├── lib/
│   ├── metadata.ts              # メタデータ生成
│   └── validation.ts            # フォームバリデーション
└── types/
    └── pages.ts                 # ページ関連型定義
```

## コンポーネント責務/Props契約

### PageHero
- **責務**: 各ページのメインビジュアル表示
- **Props**:
  - `title: string` - ページタイトル
  - `subtitle?: string` - サブタイトル
  - `image: string` - 背景画像URL
  - `breadcrumb: BreadcrumbItem[]` - パンくずリスト

### FeatureGrid
- **責務**: アイコン付き特徴グリッド表示
- **Props**:
  - `items: FeatureItem[]` - 特徴アイテム配列
  - `columns?: 2 | 3 | 4` - カラム数（デフォルト: 3）

### CounterStats
- **責務**: スクロール連動の数値カウンターアニメーション
- **Props**:
  - `stats: StatItem[]` - 統計データ配列
  - `duration?: number` - アニメーション時間（ms）

### Timeline
- **責務**: 縦型タイムライン表示（沿革用）
- **Props**:
  - `items: TimelineItem[]` - タイムラインアイテム
  - `alternating?: boolean` - 左右交互配置

### FAQ
- **責務**: アコーディオン式FAQ表示
- **Props**:
  - `items: FAQItem[]` - FAQ項目
  - `allowMultiple?: boolean` - 複数開閉可能

### ContactForm
- **責務**: お問い合わせフォーム、バリデーション、送信処理
- **Props**:
  - `onSubmit: (data: ContactFormData) => Promise<void>` - 送信処理
  - `className?: string` - 追加スタイル

## UI挙動
- ページ遷移時にスムーススクロールでトップへ
- 実績数値は画面内に入ったらカウントアップ開始
- FAQアコーディオンはスムーズな開閉アニメーション
- フォーム送信中はローディング表示
- 地図はユーザー操作で拡大縮小可能
- タイムラインは順次フェードイン

## A11y配慮
- 各ページに適切なh1見出し設定
- フォームラベルとエラーメッセージの関連付け
- アコーディオンにaria-expanded属性
- 地図に代替テキスト提供
- フォーカス順序の論理的な設定
- エラー時の音声読み上げ対応

## 受け入れ基準（DoD）
1. 全固定ページが正常に表示される
2. 各ページのメタデータ（title、description、OGP）が適切
3. パンくずリストが正しい階層で表示
4. フォームバリデーションが機能する
5. フォーム送信が成功し、サンクスページへ遷移
6. 地図が正しい位置を表示
7. カウンターアニメーションが動作
8. FAQの開閉が正常動作
9. レスポンシブデザインが適用済み
10. 構造化データ（Organization、LocalBusiness）出力

## 除外項目
- 実際のメール送信機能（ダミー処理のみ）
- 地図のカスタムマーカー
- フォームの確認画面
- ファイルアップロード機能
- reCAPTCHA実装

## Claude Code実装メモ
1. lib/metadata.tsで各ページのgenerateMetadata関数実装
2. data/company.jsonに会社概要、沿革データ作成
3. data/faq.jsonに品質・保証・メンテナンス別のFAQデータ作成
4. components/sections/PageHero.tsxで共通ヒーローセクション実装
5. components/sections/FeatureGrid.tsxでアイコングリッド（heroiconsを使用）
6. components/sections/CounterStats.tsxでIntersection Observer使用のカウンター
7. components/sections/ContactForm.tsxでreact-hook-form + zod実装
8. 各ページでセクションコンポーネントを組み合わせて構成
9. お問い合わせはFormspree等のダミーエンドポイントへPOST
10. 会社情報ページにJSON-LD構造化データ（Organization、LocalBusiness）埋め込み