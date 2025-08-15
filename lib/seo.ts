import { Metadata } from 'next'

import { siteConfig } from '@/config/site'

import type { SEOMetadata } from '@/types/integrations'

const defaultMetadata: SEOMetadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@company',
    creator: '@company',
  },
  robots: 'index, follow',
}

export function generateMetadata(overrides: Partial<SEOMetadata> = {}): Metadata {
  const metadata: SEOMetadata = {
    ...defaultMetadata,
    ...overrides,
    openGraph: {
      ...defaultMetadata.openGraph,
      ...overrides.openGraph,
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...overrides.twitter,
    },
  }

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      type: (metadata.openGraph?.type || 'website') as 'website' | 'article',
      url: metadata.openGraph?.url || siteConfig.url,
      title: metadata.openGraph?.title || metadata.title,
      description: metadata.openGraph?.description || metadata.description,
      images: metadata.openGraph?.images,
      siteName: siteConfig.name,
      locale: 'ja_JP',
    },
    twitter: {
      card: metadata.twitter?.card || 'summary_large_image',
      site: metadata.twitter?.site,
      creator: metadata.twitter?.creator,
      title: metadata.title,
      description: metadata.description,
    },
    robots: metadata.robots,
    alternates: metadata.alternates,
    metadataBase: new URL(siteConfig.url),
  }
}

export function generatePageMetadata(
  page: string,
  customMetadata?: Partial<SEOMetadata>
): Metadata {
  const pageMetadata: Record<string, Partial<SEOMetadata>> = {
    home: {
      title: `${siteConfig.name} - 信頼と実績の住宅建築`,
      description: '創業50年の信頼と実績。お客様の理想の住まいを実現します。新築・リフォーム・メンテナンスまで、住まいのことなら何でもご相談ください。',
    },
    company: {
      title: `会社案内 | ${siteConfig.name}`,
      description: '創業から50年、地域に根ざした住宅建築会社として、お客様の理想の住まいづくりをサポートしています。会社概要、沿革、アクセスをご紹介します。',
    },
    works: {
      title: `施工事例 | ${siteConfig.name}`,
      description: 'これまでに手がけた住宅の施工事例をご紹介。新築住宅、リフォーム、外構工事など、多様なニーズにお応えした実績をご覧ください。',
    },
    quality: {
      title: `品質・技術 | ${siteConfig.name}`,
      description: '確かな技術力と品質管理体制で、安心・安全な住まいづくりを実現。施工プロセス、品質基準、保証制度について詳しくご説明します。',
    },
    warranty: {
      title: `保証・アフターサービス | ${siteConfig.name}`,
      description: '建築後も安心の充実した保証制度とアフターサービス。定期点検、メンテナンス、リフォームまで、長期にわたってサポートいたします。',
    },
    house: {
      title: `注文住宅 | ${siteConfig.name}`,
      description: 'お客様の理想を形にする注文住宅。設計から施工まで、一貫したサービスで、世界に一つだけの住まいを実現します。',
    },
    maintenance: {
      title: `メンテナンス・リフォーム | ${siteConfig.name}`,
      description: '住まいの価値を維持・向上させるメンテナンスとリフォーム。定期点検から大規模改修まで、幅広く対応いたします。',
    },
    news: {
      title: `お知らせ | ${siteConfig.name}`,
      description: '会社からの最新のお知らせ、イベント情報、メディア掲載情報などをお届けします。',
    },
    topics: {
      title: `住まいのトピックス | ${siteConfig.name}`,
      description: '住まいづくりに役立つ情報、建築トレンド、リフォームのポイントなど、専門家による有益な情報をお届けします。',
    },
    contact: {
      title: `お問い合わせ | ${siteConfig.name}`,
      description: '新築・リフォーム・メンテナンスのご相談、資料請求など、お気軽にお問い合わせください。専門スタッフが丁寧に対応いたします。',
    },
  }

  const baseMetadata = pageMetadata[page] || {}
  
  return generateMetadata({
    ...baseMetadata,
    ...customMetadata,
  })
}

export function generateArticleMetadata(
  title: string,
  description: string,
  publishedDate: string,
  modifiedDate?: string,
  imagePath?: string
): Metadata {
  return generateMetadata({
    title: `${title} | ${siteConfig.name}`,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      images: imagePath
        ? [
            {
              url: `${siteConfig.url}${imagePath}`,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },
  })
}

export function generateCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${siteConfig.url}${cleanPath}`
}