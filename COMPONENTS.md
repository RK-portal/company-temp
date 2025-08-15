# コンポーネント仕様書

本ドキュメントは、企業向けホームページテンプレートで使用される全コンポーネントの仕様を記載しています。

## コンポーネント一覧

### UIコンポーネント（`components/ui/`）

- [Button](#button) - ボタンコンポーネント
- [Card](#card) - カードコンポーネント
- [Badge](#badge) - バッジコンポーネント
- [Modal](#modal) - モーダルダイアログ
- [Tabs](#tabs) - タブコンポーネント
- [Accordion](#accordion) - アコーディオン
- [Table](#table) - テーブルコンポーネント
- [Loading](#loading) - ローディング表示
- [Input](#input) - テキスト入力
- [Textarea](#textarea) - 複数行テキスト入力
- [Select](#select) - セレクトボックス
- [Checkbox](#checkbox) - チェックボックス
- [Radio](#radio) - ラジオボタン
- [Pagination](#pagination) - ページネーション
- [FilterTabs](#filtertabs) - フィルタータブ
- [ShareButtons](#sharebuttons) - SNSシェアボタン

### レイアウトコンポーネント（`components/layout/`）

- [Header](#header) - ヘッダー
- [Footer](#footer) - フッター
- [Breadcrumb](#breadcrumb) - パンくずリスト
- [MegaMenu](#megamenu) - メガメニュー
- [MobileMenu](#mobilemenu) - モバイルメニュー

### セクションコンポーネント（`components/sections/`）

- [PageHero](#pagehero) - ページヒーロー
- [FeatureGrid](#featuregrid) - 特徴グリッド
- [CounterStats](#counterstats) - 数値カウンター
- [Timeline](#timeline) - タイムライン
- [FAQ](#faq) - よくある質問
- [CompanyInfo](#companyinfo) - 会社情報
- [ContactForm](#contactform) - お問い合わせフォーム
- [MediaGallery](#mediagallery) - メディアギャラリー
- [ArticleCard](#articlecard) - 記事カード
- [WorksCard](#workscard) - 施工事例カード

---

## UIコンポーネント

### Button

ボタンコンポーネント。様々なバリアントとサイズに対応。

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | ボタンのスタイル |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | ボタンのサイズ |
| `disabled` | `boolean` | `false` | 無効化状態 |
| `loading` | `boolean` | `false` | ローディング状態 |
| `fullWidth` | `boolean` | `false` | 幅100%表示 |
| `onClick` | `() => void` | - | クリックハンドラー |
| `children` | `React.ReactNode` | - | ボタン内容 |
| `className` | `string` | - | 追加のCSSクラス |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | ボタンタイプ |
| `href` | `string` | - | リンク先（指定時はLinkコンポーネントとして動作） |

#### 使用例

```tsx
import { Button } from '@/components/ui/Button'

// 基本的な使用
<Button>デフォルトボタン</Button>

// バリアント
<Button variant="primary">プライマリー</Button>
<Button variant="secondary">セカンダリー</Button>
<Button variant="outline">アウトライン</Button>
<Button variant="ghost">ゴースト</Button>

// サイズ
<Button size="sm">小サイズ</Button>
<Button size="md">中サイズ</Button>
<Button size="lg">大サイズ</Button>

// 状態
<Button disabled>無効化</Button>
<Button loading>読み込み中...</Button>

// フルサイズ
<Button fullWidth>幅100%</Button>

// リンクとして使用
<Button href="/contact">お問い合わせへ</Button>
```

---

### Card

カードコンポーネント。コンテンツをカード形式で表示。

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | カードタイトル |
| `description` | `string` | - | カード説明文 |
| `image` | `string` | - | 画像URL |
| `imageAlt` | `string` | - | 画像の代替テキスト |
| `href` | `string` | - | リンク先URL |
| `onClick` | `() => void` | - | クリックハンドラー |
| `children` | `React.ReactNode` | - | カード内容（カスタムコンテンツ） |
| `className` | `string` | - | 追加のCSSクラス |
| `hoverable` | `boolean` | `true` | ホバーエフェクト有効化 |

#### 使用例

```tsx
import { Card } from '@/components/ui/Card'

// 基本的な使用
<Card
  title="カードタイトル"
  description="カードの説明文です"
  image="/images/sample.jpg"
  href="/detail"
/>

// カスタムコンテンツ
<Card className="p-6">
  <h3 className="text-xl font-bold mb-2">カスタムカード</h3>
  <p className="text-gray-600">自由なレイアウトが可能です</p>
  <Button className="mt-4">詳細を見る</Button>
</Card>

// クリックイベント
<Card
  title="インタラクティブカード"
  onClick={() => console.log('クリックされました')}
/>
```

---

### Badge

ステータスやラベルを表示するバッジコンポーネント。

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | - | バッジテキスト |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error'` | `'primary'` | バッジの色 |
| `size` | `'sm' \| 'md'` | `'md'` | バッジのサイズ |
| `className` | `string` | - | 追加のCSSクラス |

#### 使用例

```tsx
import { Badge } from '@/components/ui/Badge'

// 基本的な使用
<Badge text="新着" />

// カラーバリエーション
<Badge text="新着" color="primary" />
<Badge text="人気" color="secondary" />
<Badge text="完了" color="success" />
<Badge text="注意" color="warning" />
<Badge text="エラー" color="error" />

// サイズ
<Badge text="小" size="sm" />
<Badge text="中" size="md" />
```

---

### Modal

モーダルダイアログコンポーネント。

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | 開閉状態 |
| `onClose` | `() => void` | - | 閉じるコールバック |
| `title` | `string` | - | モーダルタイトル |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | モーダルサイズ |
| `children` | `React.ReactNode` | - | モーダル内容 |
| `closeOnOverlayClick` | `boolean` | `true` | オーバーレイクリックで閉じる |
| `closeOnEsc` | `boolean` | `true` | ESCキーで閉じる |

#### 使用例

```tsx
import { Modal } from '@/components/ui/Modal'
import { useState } from 'react'

function Example() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>モーダルを開く</Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="確認"
        size="md"
      >
        <p className="mb-4">本当に削除しますか？</p>
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            キャンセル
          </Button>
          <Button variant="primary">削除</Button>
        </div>
      </Modal>
    </>
  )
}
```

---

### Tabs

タブ切り替えコンポーネント。

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TabItem[]` | - | タブアイテム配列 |
| `defaultTab` | `string` | - | デフォルトで開くタブID |
| `onChange` | `(tabId: string) => void` | - | タブ変更コールバック |
| `className` | `string` | - | 追加のCSSクラス |

#### TabItem Type

```typescript
interface TabItem {
  id: string
  label: string
  content: React.ReactNode
  disabled?: boolean
}
```

#### 使用例

```tsx
import { Tabs } from '@/components/ui/Tabs'

const tabItems = [
  {
    id: 'overview',
    label: '概要',
    content: <div>概要の内容です</div>
  },
  {
    id: 'features',
    label: '特徴',
    content: <div>特徴の内容です</div>
  },
  {
    id: 'specs',
    label: '仕様',
    content: <div>仕様の内容です</div>
  }
]

<Tabs
  items={tabItems}
  defaultTab="overview"
  onChange={(tabId) => console.log('選択されたタブ:', tabId)}
/>
```

---

### Accordion

アコーディオンコンポーネント。

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `AccordionItem[]` | - | アコーディオンアイテム配列 |
| `allowMultiple` | `boolean` | `false` | 複数開閉可能 |
| `defaultOpen` | `string[]` | `[]` | デフォルトで開くアイテムID |
| `className` | `string` | - | 追加のCSSクラス |

#### AccordionItem Type

```typescript
interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
}
```

#### 使用例

```tsx
import { Accordion } from '@/components/ui/Accordion'

const accordionItems = [
  {
    id: 'item1',
    title: '配送について',
    content: '全国一律送料無料でお届けします。'
  },
  {
    id: 'item2',
    title: '返品・交換について',
    content: '商品到着後7日以内であれば返品・交換が可能です。'
  }
]

<Accordion
  items={accordionItems}
  allowMultiple={true}
  defaultOpen={['item1']}
/>
```

---

### Table

テーブルコンポーネント。

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `TableColumn[]` | - | カラム定義 |
| `rows` | `any[]` | - | 行データ |
| `responsive` | `boolean` | `true` | レスポンシブ対応 |
| `striped` | `boolean` | `false` | ストライプ表示 |
| `className` | `string` | - | 追加のCSSクラス |

#### TableColumn Type

```typescript
interface TableColumn {
  key: string
  label: string
  width?: string
  align?: 'left' | 'center' | 'right'
  render?: (value: any, row: any) => React.ReactNode
}
```

#### 使用例

```tsx
import { Table } from '@/components/ui/Table'

const columns = [
  { key: 'name', label: '商品名' },
  { key: 'price', label: '価格', align: 'right' },
  { key: 'stock', label: '在庫', align: 'center' }
]

const rows = [
  { id: 1, name: '商品A', price: '¥1,000', stock: 10 },
  { id: 2, name: '商品B', price: '¥2,000', stock: 5 }
]

<Table
  columns={columns}
  rows={rows}
  striped={true}
/>
```

---

### Loading

ローディング表示コンポーネント。

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | ローディングサイズ |
| `variant` | `'spinner' \| 'dots' \| 'skeleton'` | `'spinner'` | 表示バリアント |
| `text` | `string` | - | ローディングテキスト |
| `className` | `string` | - | 追加のCSSクラス |

#### 使用例

```tsx
import { Loading } from '@/components/ui/Loading'

// スピナー
<Loading size="md" />

// テキスト付き
<Loading text="読み込み中..." />

// ドットアニメーション
<Loading variant="dots" />

// スケルトンローディング
<Loading variant="skeleton" className="h-20 w-full" />
```

---

### Input

テキスト入力コンポーネント。

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `'text'` | 入力タイプ |
| `label` | `string` | - | ラベルテキスト |
| `placeholder` | `string` | - | プレースホルダー |
| `value` | `string` | - | 入力値 |
| `onChange` | `(e: ChangeEvent) => void` | - | 変更ハンドラー |
| `error` | `string` | - | エラーメッセージ |
| `required` | `boolean` | `false` | 必須項目 |
| `disabled` | `boolean` | `false` | 無効化状態 |
| `className` | `string` | - | 追加のCSSクラス |

#### 使用例

```tsx
import { Input } from '@/components/ui/Input'

<Input
  label="お名前"
  placeholder="山田太郎"
  required
  error={errors.name}
  value={formData.name}
  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
/>
```

---

### Textarea

複数行テキスト入力コンポーネント。

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | ラベルテキスト |
| `placeholder` | `string` | - | プレースホルダー |
| `value` | `string` | - | 入力値 |
| `onChange` | `(e: ChangeEvent) => void` | - | 変更ハンドラー |
| `rows` | `number` | `4` | 行数 |
| `error` | `string` | - | エラーメッセージ |
| `required` | `boolean` | `false` | 必須項目 |
| `disabled` | `boolean` | `false` | 無効化状態 |
| `className` | `string` | - | 追加のCSSクラス |

#### 使用例

```tsx
import { Textarea } from '@/components/ui/Textarea'

<Textarea
  label="お問い合わせ内容"
  placeholder="お問い合わせ内容をご記入ください"
  rows={6}
  required
  value={formData.message}
  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
/>
```

---

### Select

セレクトボックスコンポーネント。

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | ラベルテキスト |
| `options` | `SelectOption[]` | - | 選択肢 |
| `value` | `string` | - | 選択値 |
| `onChange` | `(value: string) => void` | - | 変更ハンドラー |
| `placeholder` | `string` | - | プレースホルダー |
| `error` | `string` | - | エラーメッセージ |
| `required` | `boolean` | `false` | 必須項目 |
| `disabled` | `boolean` | `false` | 無効化状態 |
| `className` | `string` | - | 追加のCSSクラス |

#### SelectOption Type

```typescript
interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}
```

#### 使用例

```tsx
import { Select } from '@/components/ui/Select'

const options = [
  { value: 'tokyo', label: '東京都' },
  { value: 'osaka', label: '大阪府' },
  { value: 'kyoto', label: '京都府' }
]

<Select
  label="都道府県"
  options={options}
  placeholder="選択してください"
  value={formData.prefecture}
  onChange={(value) => setFormData({ ...formData, prefecture: value })}
/>
```

---

### Checkbox

チェックボックスコンポーネント。

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | ラベルテキスト |
| `checked` | `boolean` | - | チェック状態 |
| `onChange` | `(checked: boolean) => void` | - | 変更ハンドラー |
| `disabled` | `boolean` | `false` | 無効化状態 |
| `className` | `string` | - | 追加のCSSクラス |

#### 使用例

```tsx
import { Checkbox } from '@/components/ui/Checkbox'

<Checkbox
  label="利用規約に同意する"
  checked={agreed}
  onChange={setAgreed}
/>
```

---

### Radio

ラジオボタンコンポーネント。

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | - | グループ名 |
| `options` | `RadioOption[]` | - | 選択肢 |
| `value` | `string` | - | 選択値 |
| `onChange` | `(value: string) => void` | - | 変更ハンドラー |
| `label` | `string` | - | グループラベル |
| `disabled` | `boolean` | `false` | 無効化状態 |
| `className` | `string` | - | 追加のCSSクラス |

#### RadioOption Type

```typescript
interface RadioOption {
  value: string
  label: string
  disabled?: boolean
}
```

#### 使用例

```tsx
import { Radio } from '@/components/ui/Radio'

const options = [
  { value: 'new', label: '新築' },
  { value: 'reform', label: 'リフォーム' },
  { value: 'other', label: 'その他' }
]

<Radio
  name="projectType"
  label="プロジェクトタイプ"
  options={options}
  value={formData.projectType}
  onChange={(value) => setFormData({ ...formData, projectType: value })}
/>
```

---

## レイアウトコンポーネント

### Header

サイトヘッダーコンポーネント。

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | 追加のCSSクラス |
| `sticky` | `boolean` | `true` | スティッキーヘッダー有効化 |

#### 機能

- ロゴ表示
- メインナビゲーション
- モバイルメニュートリガー
- CTAボタン（お問い合わせ）
- スクロール時の表示/非表示制御

#### 使用例

```tsx
import { Header } from '@/components/layout/Header'

// app/(site)/layout.tsx内で使用
<Header sticky={true} />
```

---

### Footer

サイトフッターコンポーネント。

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | 追加のCSSクラス |

#### 機能

- サイトマップリンク
- 会社情報表示
- SNSリンク
- コピーライト表示

#### 使用例

```tsx
import { Footer } from '@/components/layout/Footer'

// app/(site)/layout.tsx内で使用
<Footer />
```

---

### Breadcrumb

パンくずリストコンポーネント。

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BreadcrumbItem[]` | - | パンくずアイテム配列 |
| `className` | `string` | - | 追加のCSSクラス |

#### BreadcrumbItem Type

```typescript
interface BreadcrumbItem {
  label: string
  href?: string  // 最後のアイテムは通常hrefなし
}
```

#### 使用例

```tsx
import { Breadcrumb } from '@/components/layout/Breadcrumb'

const breadcrumbItems = [
  { label: 'ホーム', href: '/' },
  { label: '施工事例', href: '/works' },
  { label: 'モダンな二世帯住宅' }
]

<Breadcrumb items={breadcrumbItems} />
```

---

## セクションコンポーネント

### PageHero

ページヒーローセクションコンポーネント。

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | ページタイトル |
| `subtitle` | `string` | - | サブタイトル |
| `image` | `string` | - | 背景画像URL |
| `breadcrumb` | `BreadcrumbItem[]` | - | パンくずリスト |
| `className` | `string` | - | 追加のCSSクラス |

#### 使用例

```tsx
import { PageHero } from '@/components/sections/PageHero'

<PageHero
  title="会社情報"
  subtitle="私たちについて"
  image="/images/company/hero.jpg"
  breadcrumb={[
    { label: 'ホーム', href: '/' },
    { label: '会社情報' }
  ]}
/>
```

---

### ContactForm

お問い合わせフォームコンポーネント。

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSubmit` | `(data: ContactFormData) => Promise<void>` | - | 送信処理 |
| `className` | `string` | - | 追加のCSSクラス |

#### ContactFormData Type

```typescript
interface ContactFormData {
  name: string
  email: string
  tel?: string
  company?: string
  subject: string
  message: string
  privacy: boolean
}
```

#### 使用例

```tsx
import { ContactForm } from '@/components/sections/ContactForm'

<ContactForm
  onSubmit={async (data) => {
    // フォーム送信処理
    await submitContact(data)
  }}
/>
```

---

最終更新: 2025-08-14