# カスタマイズガイド

このガイドでは、企業向けホームページテンプレートをあなたのブランドや要件に合わせてカスタマイズする方法を説明します。

## 目次

1. [ブランド設定](#ブランド設定)
2. [コンテンツ管理](#コンテンツ管理)
3. [ページの追加・編集](#ページの追加編集)
4. [コンポーネントのカスタマイズ](#コンポーネントのカスタマイズ)
5. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
6. [機能の追加](#機能の追加)

## ブランド設定

### 1. デザイントークンの変更

`tokens/brand.json`を編集して、ブランドカラーやフォントを変更します：

```json
{
  "colors": {
    "primary": "#1B4E9B",        // メインカラー
    "primary-dark": "#164080",    // メインカラー（濃）
    "primary-light": "#2563EB",   // メインカラー（淡）
    "secondary": "#00A0B0",       // サブカラー
    "accent": "#F5A623",          // アクセントカラー
    "success": "#10B981",         // 成功
    "warning": "#F59E0B",         // 警告
    "error": "#EF4444",           // エラー
    "text": {
      "primary": "#1F2937",       // 主要テキスト
      "secondary": "#6B7280",     // 補助テキスト
      "tertiary": "#9CA3AF",      // 第三テキスト
      "inverse": "#FFFFFF"        // 反転テキスト
    },
    "background": {
      "primary": "#FFFFFF",       // 主要背景
      "secondary": "#F9FAFB",     // 補助背景
      "tertiary": "#F3F4F6",      // 第三背景
      "inverse": "#1F2937"        // 反転背景
    },
    "border": "#E5E7EB"           // ボーダー色
  },
  "typography": {
    "fontFamily": {
      "sans": "'Noto Sans JP', sans-serif",
      "display": "'Noto Sans JP', sans-serif",
      "mono": "'JetBrains Mono', monospace"
    },
    "fontSize": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem"
    }
  },
  "spacing": {
    "0": "0",
    "1": "0.25rem",
    "2": "0.5rem",
    "3": "0.75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "8": "2rem",
    "10": "2.5rem",
    "12": "3rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "32": "8rem"
  },
  "borderRadius": {
    "none": "0",
    "sm": "0.125rem",
    "base": "0.25rem",
    "md": "0.375rem",
    "lg": "0.5rem",
    "xl": "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    "full": "9999px"
  }
}
```

変更後、開発サーバーを再起動すると新しいトークンが反映されます。

### 2. サイト基本情報の設定

`config/site.ts`を編集：

```typescript
export const siteConfig = {
  // 基本情報
  name: '株式会社サンプル住宅',
  nameEn: 'Sample Housing Inc.',
  description: '快適な住まいづくりをお手伝いする総合住宅メーカー',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  
  // ロゴとOGP画像
  logo: '/images/logo.svg',
  ogImage: '/images/og-image.jpg',
  favicon: '/favicon.ico',
  
  // 連絡先情報
  contact: {
    tel: '0120-XXX-XXX',
    telDisplay: '0120-XXX-XXX',
    fax: '03-XXXX-XXXX',
    email: 'info@example.com',
    hours: {
      weekday: '9:00-18:00',
      weekend: '10:00-17:00',
      holiday: '定休日：水曜日',
    },
  },
  
  // 住所情報
  address: {
    postal: '100-0001',
    prefecture: '東京都',
    city: '千代田区',
    street: '千代田1-1-1',
    building: 'サンプルビル10F',
    lat: 35.681236,
    lng: 139.767125,
    googleMapUrl: 'https://maps.google.com/...',
  },
  
  // SNSリンク
  social: {
    twitter: 'https://twitter.com/example',
    facebook: 'https://facebook.com/example',
    instagram: 'https://instagram.com/example',
    youtube: 'https://youtube.com/example',
    line: 'https://line.me/example',
  },
}
```

### 3. ロゴの変更

1. 新しいロゴファイルを`public/images/logo.svg`（または.png）に配置
2. `config/site.ts`のlogoパスを更新
3. 推奨サイズ：横幅200-300px、高さ40-60px

## コンテンツ管理

### 施工事例の追加

`content/works/`ディレクトリに新しいMarkdownファイルを作成：

```markdown
---
title: 'モダンな二世帯住宅'
slug: 'modern-two-family-house'
date: '2025-08-01'
category: '二世帯住宅'
tags: ['モダン', '省エネ', 'バリアフリー']
description: '二世帯が快適に暮らせる、プライバシーに配慮した住まい'
thumbnail: '/images/works/modern-two-family/main.jpg'
images:
  - src: '/images/works/modern-two-family/main.jpg'
    alt: '外観'
  - src: '/images/works/modern-two-family/living.jpg'
    alt: 'リビング'
  - src: '/images/works/modern-two-family/kitchen.jpg'
    alt: 'キッチン'
specs:
  structure: '木造在来工法'
  area: '延床面積 165.5㎡'
  completion: '2025年7月'
  location: '東京都世田谷区'
  family: '5人家族（二世帯）'
---

## お客様のご要望

二世帯が快適に暮らせる、プライバシーに配慮した住まいを実現したいとのご要望でした。

## こだわりポイント

### 1. 完全分離型の間取り

各世帯の生活時間の違いに配慮し、玄関・水回り・リビングを完全に分離。音の問題も解決しました。

### 2. 共用スペースの設計

必要な時だけ一緒に過ごせる中庭を設置。家族の絆を保ちながら、適度な距離感を実現。

### 3. バリアフリー設計

将来を見据えて、1階部分は完全バリアフリー。車椅子でも快適に生活できる設計です。
```

画像は`public/images/works/modern-two-family/`に配置します。

### ニュース記事の追加

`content/news/`ディレクトリに新しいMarkdownファイルを作成：

```markdown
---
title: '夏の新築キャンペーン開催中'
slug: 'summer-campaign-2025'
date: '2025-08-01'
category: 'キャンペーン'
tags: ['キャンペーン', '新築', '期間限定']
excerpt: '8月31日までの期間限定で、新築をご検討の方に特別プランをご用意しました。'
thumbnail: '/images/news/summer-campaign.jpg'
---

この夏、新築をご検討の皆様に朗報です。

## キャンペーン内容

### 1. 設計料無料

通常30万円の設計料が無料になります。プロの建築士があなたの理想の住まいを設計します。

### 2. オプション工事割引

- 太陽光発電システム：20%OFF
- 床暖房工事：15%OFF
- オール電化工事：10%OFF

### 3. 特別金利プラン

提携金融機関の住宅ローンが特別金利でご利用いただけます。

## 適用条件

- 2025年8月31日までにご契約の方
- 新築住宅をご検討の方
- 当社指定プランでの建築

詳しくは、お気軽にお問い合わせください。
```

### コンテンツの一括管理

Markdownファイルのfrontmatter（メタデータ）フォーマット：

```yaml
# 必須項目
title: '記事タイトル'
date: 'YYYY-MM-DD'
slug: 'url-slug'

# 推奨項目
category: 'カテゴリー名'
tags: ['タグ1', 'タグ2']
description: '概要説明文'
excerpt: '抜粋文'
thumbnail: '/images/path/to/thumbnail.jpg'

# オプション項目
author: '著者名'
featured: true  # おすすめ記事
draft: false    # 下書き状態
```

## ページの追加・編集

### 新しい固定ページの追加

1. `app/(site)/`ディレクトリに新しいフォルダを作成
2. `page.tsx`ファイルを作成

例：SDGsページの追加

```typescript
// app/(site)/sdgs/page.tsx
import { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { FeatureGrid } from '@/components/sections/FeatureGrid'

export const metadata: Metadata = {
  title: 'SDGsへの取り組み | 株式会社サンプル住宅',
  description: '持続可能な社会の実現に向けた当社の取り組みをご紹介します。',
}

export default function SDGsPage() {
  const breadcrumb = [
    { label: 'ホーム', href: '/' },
    { label: '会社情報', href: '/company' },
    { label: 'SDGsへの取り組み', href: '/sdgs' },
  ]

  const sdgsItems = [
    {
      icon: '🏠',
      title: '住み続けられるまちづくりを',
      description: '耐震性・耐久性に優れた住宅で、安全で住みやすいまちづくりに貢献します。',
    },
    {
      icon: '🌱',
      title: 'エネルギーをみんなに、そしてクリーンに',
      description: '太陽光発電システムや高断熱設計で、エネルギー効率の高い住宅を提供します。',
    },
    // 他の項目...
  ]

  return (
    <>
      <PageHero
        title="SDGsへの取り組み"
        subtitle="持続可能な社会の実現に向けて"
        image="/images/sdgs/hero.jpg"
        breadcrumb={breadcrumb}
      />
      
      <section className="py-16">
        <div className="container">
          <FeatureGrid
            items={sdgsItems}
            columns={3}
          />
        </div>
      </section>
    </>
  )
}
```

### ナビゲーションへの追加

`config/navigation.ts`を編集：

```typescript
export const navigation = {
  main: [
    // 既存のメニュー項目...
    {
      label: '会社情報',
      href: '/company',
      children: [
        { label: '会社概要', href: '/company' },
        { label: 'SDGsへの取り組み', href: '/sdgs' }, // 新規追加
        { label: 'CSR活動', href: '/csr' },
      ],
    },
  ],
}
```

## コンポーネントのカスタマイズ

### 既存コンポーネントの拡張

例：Buttonコンポーネントに新しいバリアントを追加

```typescript
// components/ui/Button.tsx
const buttonVariants = cva(
  'base-styles...',
  {
    variants: {
      variant: {
        primary: 'primary-styles...',
        secondary: 'secondary-styles...',
        outline: 'outline-styles...',
        ghost: 'ghost-styles...',
        // 新しいバリアントを追加
        gradient: 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90',
      },
    },
  }
)

// 使用例
<Button variant="gradient">グラデーションボタン</Button>
```

### カスタムコンポーネントの作成

```typescript
// components/sections/Testimonials.tsx
interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  content: string
  avatar?: string
  rating?: number
}

interface TestimonialsProps {
  items: Testimonial[]
  title?: string
  subtitle?: string
}

export function Testimonials({ items, title, subtitle }: TestimonialsProps) {
  return (
    <section className="py-16 bg-background-secondary">
      <div className="container">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
            {subtitle && <p className="text-lg text-text-secondary">{subtitle}</p>}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

## スタイルのカスタマイズ

### グローバルスタイルの追加

`app/globals.css`または`styles/globals.css`に追加：

```css
/* カスタムユーティリティクラス */
@layer utilities {
  /* テキストグラデーション */
  .text-gradient {
    @apply bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent;
  }
  
  /* カスタムシャドウ */
  .shadow-brand {
    box-shadow: 0 10px 30px -5px rgba(var(--color-primary-rgb), 0.3);
  }
  
  /* アニメーション */
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
}

/* カスタムコンポーネントスタイル */
@layer components {
  .section-padding {
    @apply py-16 md:py-20 lg:py-24;
  }
  
  .container-narrow {
    @apply container max-w-4xl;
  }
}
```

### Tailwind設定の拡張

`tailwind.config.ts`を編集：

```typescript
import { brandTokens } from './tokens/brand.json'

export default {
  // ...
  theme: {
    extend: {
      // カスタムアニメーション
      animation: {
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      // カスタムグリッドテンプレート
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(250px, 1fr))',
      },
    },
  },
}
```

## 機能の追加

### 検索機能の実装

```typescript
// lib/search.ts
export async function searchContent(query: string) {
  const [works, news, topics] = await Promise.all([
    getWorks(),
    getNews(),
    getTopics(),
  ])
  
  const allContent = [
    ...works.map(item => ({ ...item, type: 'works' })),
    ...news.map(item => ({ ...item, type: 'news' })),
    ...topics.map(item => ({ ...item, type: 'topics' })),
  ]
  
  return allContent.filter(item => {
    const searchableText = `${item.title} ${item.description} ${item.content}`.toLowerCase()
    return searchableText.includes(query.toLowerCase())
  })
}
```

### 多言語対応の追加

```typescript
// lib/i18n.ts
export const translations = {
  ja: {
    common: {
      readMore: '続きを読む',
      contact: 'お問い合わせ',
      // ...
    },
  },
  en: {
    common: {
      readMore: 'Read more',
      contact: 'Contact',
      // ...
    },
  },
}

// hooks/useTranslation.ts
export function useTranslation(lang: 'ja' | 'en' = 'ja') {
  return translations[lang]
}
```

### APIエンドポイントの追加

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const data = await request.json()
  
  // バリデーション
  if (!data.name || !data.email || !data.message) {
    return NextResponse.json(
      { error: '必須項目が入力されていません' },
      { status: 400 }
    )
  }
  
  // メール送信やデータベース保存の処理
  // ...
  
  return NextResponse.json({ success: true })
}
```

## 高度なカスタマイズ

### パフォーマンスチューニング

```typescript
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizeCss: true,
  },
}
```

### ヘッドレスCMSとの連携

```typescript
// lib/cms.ts
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true,
})

export async function getWorksFromCMS() {
  return client.fetch(`
    *[_type == "works"] | order(date desc) {
      title,
      slug,
      description,
      "thumbnail": thumbnail.asset->url,
      // ...
    }
  `)
}
```

---

詳細な実装例は`docs/examples/`ディレクトリを参照してください。

最終更新: 2025-08-14