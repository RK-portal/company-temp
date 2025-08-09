# SOW3: 共通レイアウト & ナビゲーション

## 目的/範囲
企業向けホームページテンプレートの全ページで共通利用されるヘッダー、フッター、パンくずリスト、およびナビゲーションシステムを実装する。レスポンシブ対応のメガメニューとモバイルハンバーガーメニューを含む、統一されたユーザー体験を提供する。

## 成果物
- ヘッダーコンポーネント（components/layout/Header.tsx）
- フッターコンポーネント（components/layout/Footer.tsx）
- パンくずリストコンポーネント（components/layout/Breadcrumb.tsx）
- ナビゲーション設定（config/navigation.ts）
- サイト設定（config/site.ts）
- メガメニューコンポーネント（components/layout/MegaMenu.tsx）
- モバイルメニューコンポーネント（components/layout/MobileMenu.tsx）
- レイアウトラッパー（app/(site)/layout.tsx）
- ナビゲーション型定義（types/navigation.ts）
- フック（hooks/useNavigation.ts、hooks/useScrollDirection.ts）

## 依存関係
- SOW1の完了（Next.js環境構築）
- SOW2の完了（デザイントークン）
- React 18.x
- Tailwind CSS 3.x
- @heroicons/react（アイコン用）

## 変更対象（ファイル/配置）
```
/
├── components/
│   └── layout/
│       ├── Header.tsx           # ヘッダーコンポーネント
│       ├── Footer.tsx           # フッターコンポーネント
│       ├── Breadcrumb.tsx      # パンくずリスト
│       ├── MegaMenu.tsx         # メガメニュー
│       └── MobileMenu.tsx       # モバイルメニュー
├── config/
│   ├── navigation.ts            # ナビゲーション設定
│   └── site.ts                  # サイト基本情報
├── hooks/
│   ├── useNavigation.ts         # ナビゲーションフック
│   └── useScrollDirection.ts    # スクロール方向検知
├── types/
│   └── navigation.ts            # ナビゲーション型定義
├── app/
│   └── (site)/
│       └── layout.tsx           # 共通レイアウト適用
└── public/
    └── images/
        └── logo.png             # ロゴ画像（仮）
```

## コンポーネント責務/Props契約

### Header
- **責務**: サイトヘッダー表示、ナビゲーション提供、スクロール時の表示制御
- **Props**: 
  - `className?: string` - 追加スタイルクラス
  - `sticky?: boolean` - スティッキーヘッダー有効化（デフォルト: true）

### Footer
- **責務**: サイトフッター表示、サイトマップ、企業情報、SNSリンク提供
- **Props**: 
  - `className?: string` - 追加スタイルクラス

### Breadcrumb
- **責務**: パンくずリスト表示、構造化データ出力
- **Props**: 
  - `items: BreadcrumbItem[]` - パンくずアイテム配列
  - `className?: string` - 追加スタイルクラス

### MegaMenu
- **責務**: デスクトップ向けドロップダウンメガメニュー表示
- **Props**: 
  - `items: NavigationItem[]` - ナビゲーションアイテム
  - `isOpen: boolean` - 開閉状態
  - `onClose: () => void` - 閉じるコールバック

### MobileMenu
- **責務**: モバイル向けスライドメニュー表示
- **Props**: 
  - `isOpen: boolean` - 開閉状態
  - `onClose: () => void` - 閉じるコールバック

## UI挙動
- ヘッダー: スクロールダウンで非表示、スクロールアップで表示
- メガメニュー: ホバーで展開、フォーカスでキーボード操作可能
- モバイルメニュー: ハンバーガーアイコンタップで右からスライドイン
- パンくずリスト: 現在ページは非リンク、親階層はリンク
- フッター: 常に最下部に配置（sticky footer）

## A11y配慮
- ナビゲーションにaria-label="メインナビゲーション"設定
- メガメニューにaria-expanded属性
- モバイルメニューのフォーカストラップ実装
- キーボードナビゲーション（Tab、Shift+Tab、Escape）
- スキップリンク実装（ヘッダー直後に配置）
- 適切な見出しレベル（h1-h6）の使用
- リンクの明確なラベル付け

## 受け入れ基準（DoD）
1. 全ページでヘッダー・フッターが表示される
2. メガメニューがデスクトップで正常動作
3. モバイルメニューがスマートフォンで正常動作
4. パンくずリストが適切な階層で表示
5. スクロール時のヘッダー表示/非表示が動作
6. 構造化データ（JSON-LD）が出力される
7. キーボード操作で全てのリンクにアクセス可能
8. レスポンシブブレークポイントで適切に切り替わる
9. ロゴクリックでトップページへ遷移
10. お問い合わせボタンが目立つ位置に配置

## 除外項目
- 検索機能
- 言語切り替え機能
- ログイン/会員メニュー
- 通知機能
- ダークモード切り替え

## Claude Code実装メモ
1. config/navigation.tsでメニュー構造定義（階層構造、アイコン、説明文含む）
2. config/site.tsで企業情報、SNSリンク等を要件定義書通り実装
3. types/navigation.tsでNavigationItem、BreadcrumbItem型定義
4. hooks/useScrollDirection.tsでスクロール方向検知（throttle処理含む）
5. components/layout/Header.tsxでロゴ、ナビゲーション、CTAボタン配置
6. components/layout/MegaMenu.tsxで2階層メニュー、説明文付きリンク実装
7. components/layout/MobileMenu.tsxでスライドメニュー、オーバーレイ実装
8. components/layout/Footer.tsxで3カラムレイアウト（サイトマップ、企業情報、SNS）
9. components/layout/Breadcrumb.tsxで構造化データ含むパンくずリスト実装
10. app/(site)/layout.tsxで全ページに共通レイアウト適用、メタデータ設定