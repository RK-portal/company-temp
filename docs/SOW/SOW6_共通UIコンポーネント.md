# SOW6: 共通UIコンポーネント

## 目的/範囲

企業向けホームページテンプレート全体で使用される汎用的なUIコンポーネントライブラリを構築する。統一されたデザインシステムに基づき、再利用性が高く、アクセシブルなコンポーネント群を実装する。

## 成果物

- Buttonコンポーネント（components/ui/Button.tsx）
- Cardコンポーネント（components/ui/Card.tsx）
- Badgeコンポーネント（components/ui/Badge.tsx）
- Modalコンポーネント（components/ui/Modal.tsx）
- Tabsコンポーネント（components/ui/Tabs.tsx）
- Accordionコンポーネント（components/ui/Accordion.tsx）
- Tableコンポーネント（components/ui/Table.tsx）
- Loadingコンポーネント（components/ui/Loading.tsx）
- Inputコンポーネント（components/ui/Input.tsx）
- Textareaコンポーネント（components/ui/Textarea.tsx）
- Selectコンポーネント（components/ui/Select.tsx）
- Checkboxコンポーネント（components/ui/Checkbox.tsx）
- Radioコンポーネント（components/ui/Radio.tsx）
- コンポーネント共通ユーティリティ（lib/cn.ts）
- Storybook設定（.storybook/）

## 依存関係

- SOW1～2の完了
- React 18.x
- Tailwind CSS 3.x
- clsx（クラス名結合）
- @radix-ui/react-\*（アクセシブルなプリミティブ）
- Storybook 7.x（コンポーネントカタログ）

## 変更対象（ファイル/配置）

```
/
├── components/
│   └── ui/
│       ├── Button.tsx           # ボタンコンポーネント
│       ├── Card.tsx             # カードコンポーネント
│       ├── Badge.tsx            # バッジコンポーネント
│       ├── Modal.tsx            # モーダルコンポーネント
│       ├── Tabs.tsx             # タブコンポーネント
│       ├── Accordion.tsx        # アコーディオンコンポーネント
│       ├── Table.tsx            # テーブルコンポーネント
│       ├── Loading.tsx          # ローディング表示
│       ├── Input.tsx            # テキスト入力
│       ├── Textarea.tsx         # 複数行テキスト入力
│       ├── Select.tsx           # セレクトボックス
│       ├── Checkbox.tsx         # チェックボックス
│       ├── Radio.tsx            # ラジオボタン
│       └── index.ts             # エクスポート統合
├── lib/
│   └── cn.ts                    # クラス名結合ユーティリティ
├── .storybook/
│   ├── main.ts                  # Storybook設定
│   └── preview.ts               # プレビュー設定
└── stories/
    └── ui/                      # 各コンポーネントのStory
```

## コンポーネント責務/Props契約

### Button

- **責務**: クリック可能なボタン表示
- **Props**:
  - `variant?: 'primary' | 'secondary' | 'outline' | 'ghost'`
  - `size?: 'sm' | 'md' | 'lg'`
  - `disabled?: boolean`
  - `loading?: boolean`
  - `fullWidth?: boolean`
  - `onClick?: () => void`
  - `children: React.ReactNode`
  - `className?: string`

### Card

- **責務**: コンテンツをカード形式で表示
- **Props**:
  - `title?: string`
  - `description?: string`
  - `image?: string`
  - `href?: string`
  - `onClick?: () => void`
  - `children?: React.ReactNode`
  - `className?: string`

### Badge

- **責務**: ステータスやラベル表示
- **Props**:
  - `text: string`
  - `color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'`
  - `size?: 'sm' | 'md'`
  - `className?: string`

### Modal

- **責務**: オーバーレイ付きダイアログ表示
- **Props**:
  - `isOpen: boolean`
  - `onClose: () => void`
  - `title?: string`
  - `size?: 'sm' | 'md' | 'lg' | 'xl'`
  - `children: React.ReactNode`

### Tabs

- **責務**: タブ切り替えインターフェース
- **Props**:
  - `items: TabItem[]`
  - `defaultTab?: string`
  - `onChange?: (tab: string) => void`
  - `className?: string`

### Accordion

- **責務**: 開閉可能なコンテンツパネル
- **Props**:
  - `items: AccordionItem[]`
  - `allowMultiple?: boolean`
  - `defaultOpen?: string[]`
  - `className?: string`

### Table

- **責務**: データの表形式表示
- **Props**:
  - `columns: TableColumn[]`
  - `rows: any[]`
  - `responsive?: boolean`
  - `striped?: boolean`
  - `className?: string`

## UI挙動

- ボタン: ホバー・フォーカス・アクティブ状態の視覚フィードバック
- モーダル: ESCキーで閉じる、背景クリックで閉じる
- タブ: キーボードの矢印キーでナビゲーション
- アコーディオン: スムーズな開閉アニメーション
- フォーム要素: フォーカス時のアウトライン表示
- ローディング: スピナーアニメーション表示

## A11y配慮

- 全コンポーネントでキーボード操作サポート
- 適切なARIA属性（role、aria-label、aria-expanded等）
- フォーカス管理（フォーカストラップ、フォーカスリング）
- 色に依存しない情報伝達
- スクリーンリーダーでの読み上げ最適化
- モーション設定の尊重（prefers-reduced-motion）

## 受け入れ基準（DoD）

1. 全コンポーネントがTypeScriptで型安全に実装
2. デザイントークンを使用したスタイリング
3. レスポンシブデザイン対応
4. Storybookで全バリエーション確認可能
5. キーボード操作が完全に機能
6. WCAG 2.1 AA準拠
7. 各コンポーネントのユニットテスト作成
8. READMEにコンポーネント使用例記載
9. バンドルサイズが最適化済み
10. 全ブラウザで動作確認済み

## 除外項目

- 複雑なデータグリッド機能
- ドラッグ&ドロップ機能
- リッチテキストエディター
- 日付ピッカー
- カラーピッカー

## Claude Code実装メモ

1. lib/cn.tsでclsxとtailwind-mergeを組み合わせたユーティリティ実装
2. @radix-uiのプリミティブを基盤として使用（Modal、Tabs、Accordion等）
3. Button.tsxは全バリアント×サイズの組み合わせをサポート
4. Card.tsxはNext.js Linkと統合、外部リンクは自動でtarget="\_blank"
5. Modal.tsxでcreatePortal使用、フォーカストラップ実装
6. Table.tsxはモバイルで横スクロール対応
7. フォーム要素は全てforwardRef対応でreact-hook-formと統合可能
8. Loading.tsxはサイズ別スピナー、スケルトンローディングオプション
9. 各コンポーネントに対応するStoryファイル作成（\*.stories.tsx）
10. コンポーネントのdata-testid属性でテスト可能性確保
