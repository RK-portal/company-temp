import { SiteConfig } from '@/types/navigation'
import React from 'react'

// Temporary icon placeholder component
const IconPlaceholder: React.ComponentType<{ className?: string }> = ({ className }) =>
  React.createElement(
    'svg',
    {
      className,
      fill: 'currentColor',
      viewBox: '0 0 24 24',
    },
    React.createElement('circle', { cx: '12', cy: '12', r: '10' })
  )

export const siteConfig: SiteConfig = {
  name: 'コーポレートサイト',
  description: '株式会社サンプルの企業情報をお届けします',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  locale: 'ja',
  logo: {
    src: '/images/logo.svg',
    alt: '株式会社サンプル',
    width: 180,
    height: 40,
  },
  company: {
    name: '株式会社サンプル',
    description: '私たちは、革新的なソリューションで社会に貢献する企業です。',
    address: '〒100-0001 東京都千代田区千代田1-1-1',
    tel: '03-1234-5678',
    email: 'info@example.com',
    businessHours: '平日 9:00-18:00',
  },
  social: [
    {
      name: 'Twitter',
      href: 'https://twitter.com/example',
      icon: IconPlaceholder,
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com/example',
      icon: IconPlaceholder,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/example',
      icon: IconPlaceholder,
    },
  ],
  footer: {
    copyright: `© ${new Date().getFullYear()} 株式会社サンプル All rights reserved.`,
    links: [
      {
        id: 'privacy',
        label: 'プライバシーポリシー',
        href: '/privacy',
      },
      {
        id: 'terms',
        label: '利用規約',
        href: '/terms',
      },
      {
        id: 'sitemap',
        label: 'サイトマップ',
        href: '/sitemap',
      },
    ],
  },
}
