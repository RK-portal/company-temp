# API仕様書

本ドキュメントは、企業向けホームページテンプレートの内部API仕様を記載しています。

## 目次

1. [コンテンツAPI](#コンテンツapi)
2. [フォームAPI](#フォームapi)
3. [SEO・メタデータAPI](#seoメタデータapi)
4. [ユーティリティAPI](#ユーティリティapi)
5. [型定義](#型定義)

## コンテンツAPI

### `lib/content.ts`

Markdownベースのコンテンツ管理システムのAPIです。

#### `getWorks()`

施工事例一覧を取得します。

```typescript
export async function getWorks(): Promise<Work[]>

// 戻り値の例
[
  {
    slug: 'modern-house-tokyo',
    title: 'モダンな都市型住宅',
    date: '2025-01-15',
    category: '新築',
    tags: ['モダン', '3階建て', '狭小地'],
    description: '都心の限られた敷地を最大限活用した3階建て住宅',
    thumbnail: '/images/works/modern-house/main.jpg',
    images: [
      { src: '/images/works/modern-house/main.jpg', alt: '外観' },
      { src: '/images/works/modern-house/living.jpg', alt: 'リビング' }
    ],
    specs: {
      structure: '鉄骨造',
      area: '延床面積 120.5㎡',
      completion: '2024年12月',
      location: '東京都渋谷区'
    },
    content: '...' // Markdown本文
  }
]
```

#### `getWorkBySlug(slug: string)`

指定されたslugの施工事例詳細を取得します。

```typescript
export async function getWorkBySlug(slug: string): Promise<Work | null>

// 使用例
const work = await getWorkBySlug('modern-house-tokyo')
```

#### `getNews()`

ニュース一覧を取得します。

```typescript
export async function getNews(): Promise<NewsItem[]>

// 戻り値の例
[
  {
    slug: 'summer-campaign-2025',
    title: '夏の新築キャンペーン開催中',
    date: '2025-08-01',
    category: 'キャンペーン',
    tags: ['キャンペーン', '新築', '期間限定'],
    excerpt: '8月31日までの期間限定で、新築をご検討の方に特別プランをご用意しました。',
    thumbnail: '/images/news/summer-campaign.jpg',
    content: '...' // Markdown本文
  }
]
```

#### `getNewsBySlug(slug: string)`

指定されたslugのニュース詳細を取得します。

```typescript
export async function getNewsBySlug(slug: string): Promise<NewsItem | null>
```

#### `getTopics()`

トピックス一覧を取得します。

```typescript
export async function getTopics(): Promise<Topic[]>
```

#### `getTopicBySlug(slug: string)`

指定されたslugのトピックス詳細を取得します。

```typescript
export async function getTopicBySlug(slug: string): Promise<Topic | null>
```

#### `getContentByCategory(category: string, type: ContentType)`

カテゴリーでフィルタリングされたコンテンツを取得します。

```typescript
export async function getContentByCategory(
  category: string,
  type: 'works' | 'news' | 'topics'
): Promise<Content[]>

// 使用例
const newsItems = await getContentByCategory('キャンペーン', 'news')
```

#### `getRelatedContent(currentSlug: string, type: ContentType, limit?: number)`

関連コンテンツを取得します。

```typescript
export async function getRelatedContent(
  currentSlug: string,
  type: 'works' | 'news' | 'topics',
  limit: number = 3
): Promise<Content[]>
```

## フォームAPI

### `lib/formSubmit.ts`

フォーム送信処理のAPIです。

#### `submitContactForm(data: ContactFormData)`

お問い合わせフォームを送信します。

```typescript
export async function submitContactForm(data: ContactFormData): Promise<FormResponse>

interface ContactFormData {
  name: string
  email: string
  tel?: string
  company?: string
  subject: string
  message: string
  privacy: boolean
}

interface FormResponse {
  success: boolean
  message?: string
  error?: string
}

// 使用例
try {
  const response = await submitContactForm({
    name: '山田太郎',
    email: 'yamada@example.com',
    subject: '新築について',
    message: '新築住宅の相談をしたいです。',
    privacy: true
  })
  
  if (response.success) {
    // 成功処理
  }
} catch (error) {
  // エラー処理
}
```

#### `validateFormData(data: ContactFormData)`

フォームデータのバリデーションを行います。

```typescript
export function validateFormData(data: ContactFormData): ValidationResult

interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}
```

## SEO・メタデータAPI

### `lib/seo.ts`

SEO関連の機能を提供するAPIです。

#### `generateMetadata(params: MetadataParams)`

ページのメタデータを生成します。

```typescript
export function generateMetadata(params: MetadataParams): Metadata

interface MetadataParams {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  ogType?: 'website' | 'article'
  noindex?: boolean
  canonical?: string
}

// 使用例
export const metadata = generateMetadata({
  title: '会社情報',
  description: '株式会社サンプル住宅の会社概要、沿革、アクセス情報をご紹介します。',
  keywords: ['会社情報', '企業情報', 'アクセス'],
  ogType: 'website'
})
```

#### `generateJsonLd(type: SchemaType, data: any)`

構造化データ（JSON-LD）を生成します。

```typescript
export function generateJsonLd(
  type: 'Organization' | 'LocalBusiness' | 'Article' | 'BreadcrumbList',
  data: any
): string

// 使用例
const jsonLd = generateJsonLd('Organization', {
  name: '株式会社サンプル住宅',
  url: 'https://example.com',
  logo: 'https://example.com/images/logo.png',
  contactPoint: {
    telephone: '+81-3-1234-5678',
    contactType: 'customer service'
  }
})
```

### `lib/structuredData.ts`

構造化データ生成の詳細APIです。

#### `generateOrganizationSchema()`

組織の構造化データを生成します。

```typescript
export function generateOrganizationSchema(): WithContext<Organization>
```

#### `generateLocalBusinessSchema()`

ローカルビジネスの構造化データを生成します。

```typescript
export function generateLocalBusinessSchema(): WithContext<LocalBusiness>
```

#### `generateArticleSchema(article: ArticleData)`

記事の構造化データを生成します。

```typescript
export function generateArticleSchema(article: ArticleData): WithContext<Article>

interface ArticleData {
  title: string
  description: string
  datePublished: string
  dateModified?: string
  author?: string
  image?: string
}
```

#### `generateBreadcrumbSchema(items: BreadcrumbItem[])`

パンくずリストの構造化データを生成します。

```typescript
export function generateBreadcrumbSchema(
  items: BreadcrumbItem[]
): WithContext<BreadcrumbList>
```

## ユーティリティAPI

### `lib/utils.ts`

汎用ユーティリティ関数です。

#### `cn(...inputs: ClassValue[])`

クラス名を結合します（clsxとtailwind-mergeのラッパー）。

```typescript
export function cn(...inputs: ClassValue[]): string

// 使用例
<div className={cn(
  'base-class',
  isActive && 'active-class',
  className
)} />
```

#### `formatDate(date: string | Date, format?: string)`

日付をフォーマットします。

```typescript
export function formatDate(
  date: string | Date,
  format: string = 'yyyy年MM月dd日'
): string

// 使用例
formatDate('2025-08-14') // '2025年08月14日'
formatDate(new Date(), 'yyyy/MM/dd') // '2025/08/14'
```

#### `truncate(text: string, length: number, suffix?: string)`

テキストを指定文字数で切り詰めます。

```typescript
export function truncate(
  text: string,
  length: number,
  suffix: string = '...'
): string

// 使用例
truncate('長いテキストをここで切り詰めます', 10) // '長いテキストをここで...'
```

### `lib/validation.ts`

バリデーション関連のAPIです。

#### `validateEmail(email: string)`

メールアドレスの形式を検証します。

```typescript
export function validateEmail(email: string): boolean
```

#### `validatePhone(phone: string)`

電話番号の形式を検証します（日本国内）。

```typescript
export function validatePhone(phone: string): boolean
```

#### `validateRequired(value: any, fieldName: string)`

必須項目の検証を行います。

```typescript
export function validateRequired(value: any, fieldName: string): string | null

// 戻り値: エラーメッセージまたはnull
```

### `lib/performance.ts`

パフォーマンス最適化関連のAPIです。

#### `optimizeImage(src: string, options?: ImageOptions)`

画像URLを最適化します。

```typescript
export function optimizeImage(
  src: string,
  options?: {
    width?: number
    height?: number
    quality?: number
    format?: 'webp' | 'avif'
  }
): string
```

#### `preloadResources(resources: Resource[])`

重要なリソースをプリロードします。

```typescript
export function preloadResources(resources: Resource[]): void

interface Resource {
  href: string
  as: 'image' | 'script' | 'style' | 'font'
  type?: string
  crossOrigin?: 'anonymous' | 'use-credentials'
}
```

## 型定義

### コンテンツ型

```typescript
// types/content.ts

export interface Work {
  slug: string
  title: string
  date: string
  category: string
  tags: string[]
  description: string
  thumbnail: string
  images: ImageItem[]
  specs: WorkSpecs
  content: string
}

export interface WorkSpecs {
  structure: string
  area: string
  completion: string
  location: string
  family?: string
}

export interface NewsItem {
  slug: string
  title: string
  date: string
  category: string
  tags: string[]
  excerpt: string
  thumbnail?: string
  content: string
}

export interface Topic {
  slug: string
  title: string
  date: string
  category: string
  tags: string[]
  description: string
  thumbnail?: string
  content: string
}

export interface ImageItem {
  src: string
  alt: string
  caption?: string
}
```

### ナビゲーション型

```typescript
// types/navigation.ts

export interface NavigationItem {
  label: string
  href?: string
  children?: NavigationItem[]
  highlight?: boolean
  icon?: React.ComponentType
}

export interface BreadcrumbItem {
  label: string
  href?: string
}
```

### ページ型

```typescript
// types/pages.ts

export interface PageMetadata {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  noindex?: boolean
}

export interface PageProps {
  params: { [key: string]: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
```

### 統合サービス型

```typescript
// types/integrations.ts

export interface GoogleMapsConfig {
  apiKey: string
  center: { lat: number; lng: number }
  zoom: number
  markers?: MapMarker[]
}

export interface MapMarker {
  position: { lat: number; lng: number }
  title?: string
  info?: string
}

export interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
}
```

## エラーハンドリング

すべてのAPI関数は適切なエラーハンドリングを実装しています。

```typescript
// エラーレスポンスの型
export interface ApiError {
  code: string
  message: string
  details?: any
}

// エラーハンドリングの例
try {
  const data = await getWorks()
} catch (error) {
  if (error instanceof ApiError) {
    console.error(`API Error ${error.code}: ${error.message}`)
  } else {
    console.error('Unexpected error:', error)
  }
}
```

---

詳細な実装は各ソースファイルを参照してください。

最終更新: 2025-08-14