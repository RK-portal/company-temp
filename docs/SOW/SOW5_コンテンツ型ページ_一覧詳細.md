# SOW5: コンテンツ型ページ（一覧/詳細）

## 目的/範囲
企業向けホームページテンプレートのコンテンツ型ページ（施工事例、ニュース、トピックス）の一覧・詳細ページを実装する。Markdownベースのコンテンツ管理システムを構築し、静的サイト生成時に動的ルーティングでページを生成する。

## 成果物
- 施工事例一覧ページ（app/(site)/works/page.tsx）
- 施工事例詳細ページ（app/(site)/works/[slug]/page.tsx）
- ニュース一覧ページ（app/(site)/news/page.tsx）
- ニュース詳細ページ（app/(site)/news/[slug]/page.tsx）
- トピックス一覧ページ（app/(site)/topics/page.tsx）
- トピックス詳細ページ（app/(site)/topics/[slug]/page.tsx）
- コンテンツ管理ユーティリティ（lib/content.ts）
- ページネーションコンポーネント（components/ui/Pagination.tsx）
- フィルターコンポーネント（components/ui/FilterTabs.tsx）
- 画像ギャラリーコンポーネント（components/sections/MediaGallery.tsx）
- SNSシェアボタン（components/ui/ShareButtons.tsx）
- Markdownコンテンツファイル（content/works/、content/news/、content/topics/）

## 依存関係
- SOW1～4の完了
- gray-matter（frontmatter解析）
- remark/rehype（Markdown処理）
- next-mdx-remote（MDXサポート）
- photoswipe（画像ギャラリー）
- date-fns（日付処理）

## 変更対象（ファイル/配置）
```
/
├── app/
│   └── (site)/
│       ├── works/
│       │   ├── page.tsx         # 施工事例一覧
│       │   └── [slug]/
│       │       └── page.tsx     # 施工事例詳細
│       ├── news/
│       │   ├── page.tsx         # ニュース一覧
│       │   └── [slug]/
│       │       └── page.tsx     # ニュース詳細
│       └── topics/
│           ├── page.tsx         # トピックス一覧
│           └── [slug]/
│               └── page.tsx     # トピックス詳細
├── components/
│   ├── ui/
│   │   ├── Pagination.tsx      # ページネーション
│   │   ├── FilterTabs.tsx      # フィルタータブ
│   │   └── ShareButtons.tsx    # SNSシェア
│   └── sections/
│       ├── MediaGallery.tsx    # 画像ギャラリー
│       ├── ArticleCard.tsx     # 記事カード
│       └── WorksCard.tsx       # 施工事例カード
├── content/
│   ├── works/                  # 施工事例コンテンツ
│   │   ├── sample-house-1.md
│   │   └── ...
│   ├── news/                   # ニュースコンテンツ
│   │   ├── 2025-01-01-news.md
│   │   └── ...
│   └── topics/                 # トピックスコンテンツ
│       ├── 2025-01-01-topic.md
│       └── ...
├── lib/
│   ├── content.ts              # コンテンツ管理
│   ├── markdown.ts             # Markdown処理
│   └── constants.ts            # 定数定義
├── types/
│   └── content.ts              # コンテンツ型定義
└── public/
    └── images/
        ├── works/              # 施工事例画像
        ├── news/               # ニュース画像
        └── topics/             # トピックス画像
```

## コンポーネント責務/Props契約

### ArticleCard
- **責務**: ニュース・トピックス用カード表示
- **Props**:
  - `title: string` - 記事タイトル
  - `description: string` - 概要文
  - `date: string` - 公開日
  - `category?: string` - カテゴリー
  - `href: string` - 詳細ページURL
  - `image?: string` - サムネイル画像

### WorksCard
- **責務**: 施工事例用カード表示
- **Props**:
  - `title: string` - 物件名
  - `description: string` - 概要
  - `category: string` - カテゴリー（新築/リフォーム等）
  - `area?: string` - 延床面積
  - `href: string` - 詳細ページURL
  - `thumbnail: string` - サムネイル画像

### Pagination
- **責務**: ページネーション表示・制御
- **Props**:
  - `currentPage: number` - 現在のページ
  - `totalPages: number` - 総ページ数
  - `basePath: string` - ベースURL
  - `className?: string` - 追加スタイル

### FilterTabs
- **責務**: カテゴリーフィルター表示
- **Props**:
  - `categories: Category[]` - カテゴリー配列
  - `activeCategory?: string` - 選択中カテゴリー
  - `onSelect: (category: string) => void` - 選択コールバック

### MediaGallery
- **責務**: ライトボックス機能付き画像ギャラリー
- **Props**:
  - `images: GalleryImage[]` - 画像配列
  - `layout?: 'grid' | 'masonry'` - レイアウト形式
  - `columns?: number` - カラム数

## UI挙動
- 一覧ページは12件/ページでページネーション
- カテゴリーフィルターは即座に絞り込み反映
- カードホバー時にシャドウ強調とスケール微増
- 画像ギャラリーはサムネイルクリックでライトボックス表示
- 詳細ページでは前後の記事へのナビゲーション表示
- スクロール位置を記憶し、戻るボタンで復元

## A11y配慮
- 記事リストはセマンティックな`<article>`要素使用
- 画像には適切なalt属性設定
- 日付は`<time>`要素でマークアップ
- ページネーションにaria-label設定
- キーボードでギャラリー操作可能
- 読み上げ順序の最適化

## 受け入れ基準（DoD）
1. Markdownファイルから一覧・詳細ページが生成される
2. frontmatterのメタデータが正しく表示される
3. カテゴリーフィルターが機能する
4. ページネーションが正常動作
5. 画像ギャラリーのライトボックスが動作
6. SNSシェアボタンが機能する（Twitter、Facebook、LINE）
7. 構造化データ（Article）が出力される
8. 関連記事/事例が表示される
9. レスポンシブデザインが適用済み
10. 静的生成時に全ページが生成される

## 除外項目
- コンテンツの検索機能
- タグによる絞り込み
- コメント機能
- いいね/お気に入り機能
- 印刷用スタイル

## Claude Code実装メモ
1. lib/content.tsでMarkdownファイル読み込み、frontmatter解析、ソート処理実装
2. content/配下に各カテゴリ5件以上のサンプルMarkdownファイル作成
3. frontmatter: title、description、date、category、thumbnail、images配列等定義
4. generateStaticParamsで全slugの静的パス生成
5. components/ui/Pagination.tsxでページ番号計算、URL生成ロジック実装
6. components/sections/MediaGallery.tsxでPhotoSwipe統合
7. 施工事例は物件情報（構造、延床面積、竣工年月等）をfrontmatterに含める
8. ニュース/トピックスは本文にMDX対応（コンポーネント埋め込み可能）
9. 詳細ページでJSON-LD構造化データ（Article）生成
10. date-fnsで日付フォーマット統一（YYYY年MM月DD日形式）