# SOW2: デザイントークン & 基本テーマ

## 目的/範囲
企業向けホームページテンプレートの視覚的一貫性を保証するデザイントークンシステムを構築し、Tailwind CSSと統合する。カラー、タイポグラフィ、スペーシング、シャドウ等の基本テーマを定義し、ブランド差し替えを容易にする設計を実現する。

## 成果物
- デザイントークン定義ファイル（tokens/brand.json）
- Tailwind CSS拡張設定（tailwind.config.ts）
- CSS変数定義（styles/tokens.css）
- テーマプロバイダーコンポーネント（components/theme/ThemeProvider.tsx）
- デザイントークン型定義（types/tokens.ts）
- カラーパレット確認ページ（app/design-system/page.tsx）
- トークン変換ユーティリティ（lib/tokens.ts）

## 依存関係
- SOW1の完了（Next.js環境構築）
- Tailwind CSS 3.x
- TypeScript 5.x

## 変更対象（ファイル/配置）
```
/
├── tokens/
│   └── brand.json         # デザイントークン定義
├── styles/
│   ├── tokens.css        # CSS変数定義
│   └── globals.css       # グローバルスタイル更新
├── lib/
│   └── tokens.ts         # トークン変換ユーティリティ
├── types/
│   └── tokens.ts         # TypeScript型定義
├── components/
│   └── theme/
│       └── ThemeProvider.tsx  # テーマプロバイダー
├── app/
│   ├── layout.tsx        # ThemeProvider適用
│   └── design-system/    # デザインシステム確認用
│       └── page.tsx
└── tailwind.config.ts    # Tailwind設定拡張
```

## コンポーネント責務/Props契約

### ThemeProvider
- **責務**: アプリケーション全体にテーマコンテキストを提供
- **Props**: 
  - `children: React.ReactNode` - 子要素
  - `theme?: 'default' | 'custom'` - テーマ選択（将来拡張用）

## UI挙動
- CSS変数によるリアルタイムテーマ反映
- Tailwind CSSクラスでトークン値を参照可能
- ダークモード対応の基盤（将来実装用）
- システムカラースキーム検出準備

## A11y配慮
- 色コントラスト比の確保（WCAG AA準拠）
  - 通常テキスト: 4.5:1以上
  - 大きいテキスト: 3:1以上
- フォーカス状態の明示的な視覚表現
- prefers-reduced-motionへの対応準備
- 色だけに依存しない情報伝達

## 受け入れ基準（DoD）
1. brand.jsonでトークンが定義されている
2. Tailwind CSSでカスタムトークンが使用可能
3. CSS変数が:rootに定義されている
4. TypeScriptで型安全にトークンを参照可能
5. デザインシステムページでカラーパレット確認可能
6. 色コントラスト比がWCAG AA準拠
7. トークン変更が全体に自動反映される
8. Tailwindのユーティリティクラスが拡張されている
9. フォント（Noto Sans JP）が適用されている
10. レスポンシブなスペーシングスケールが定義済み

## 除外項目
- ダークモードの実装
- 複数テーマの切り替え機能
- アニメーショントークンの定義
- コンポーネント固有のトークン
- 動的なテーマ生成機能

## Claude Code実装メモ
1. tokens/brand.jsonを要件定義書の仕様通り作成
2. lib/tokens.tsでJSON→CSS変数/Tailwind設定変換関数実装
3. types/tokens.tsでトークンの型定義（colors、typography、spacing、borderRadius）
4. tailwind.config.tsでextend内にトークン値を適用
5. styles/tokens.cssでCSS変数定義（--color-primary等）
6. app/globals.cssで@import './tokens.css'追加、Noto Sans JPフォント読み込み
7. components/theme/ThemeProvider.tsxでReact Context実装（将来拡張用）
8. app/layout.tsxのbody要素にThemeProvider適用
9. app/design-system/page.tsxでカラーパレット、タイポグラフィ、スペーシング表示
10. 各トークン値がTailwindクラス（text-primary、bg-secondary等）として使用可能か確認