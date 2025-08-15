import { News, Topic, Work } from '@/types/content'
import { FAQItem, FeatureItem, TimelineItem } from '@/types/pages'
import React from 'react'

// ニュースのモックデータ
export const mockNews: News[] = [
  {
    slug: 'test-news-1',
    title: 'テストニュース1',
    description: 'これはテスト用のニュース記事です。',
    date: '2024-01-01',
    category: 'news',
    content: '# テストニュース1\n\nこれはテスト用のニュース記事の本文です。',
    thumbnail: '/images/placeholder.svg',
  },
  {
    slug: 'test-news-2',
    title: 'テストニュース2',
    description: 'これはテスト用のニュース記事です。',
    date: '2024-01-02',
    category: 'event',
    content: '# テストニュース2\n\nこれはテスト用のニュース記事の本文です。',
    thumbnail: '/images/placeholder.svg',
  },
]

// トピックのモックデータ
export const mockTopics: Topic[] = [
  {
    slug: 'test-topic-1',
    title: 'テストトピック1',
    description: 'これはテスト用のトピック記事です。',
    date: '2024-01-01',
    category: 'technology',
    content: '# テストトピック1\n\nこれはテスト用のトピック記事の本文です。',
    thumbnail: '/images/placeholder.svg',
    author: 'テスト著者',
    tags: ['テスト', 'サンプル'],
  },
]

// 施工事例のモックデータ
export const mockWorks: Work[] = [
  {
    slug: 'test-work-1',
    title: 'テスト施工事例1',
    description: 'これはテスト用の施工事例です。',
    date: '2024-01-01',
    category: 'renovation',
    structure: '木造',
    images: ['/images/placeholder.svg'],
    content: '# テスト施工事例1\n\nこれはテスト用の施工事例の本文です。',
    area: '120㎡',
    completionDate: '2024-03-01',
    thumbnail: '/images/placeholder.svg',
  },
]

// FAQのモックデータ
export const mockFAQ: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'テスト質問1',
    answer: 'テスト回答1です。',
  },
  {
    id: 'faq-2',
    question: 'テスト質問2',
    answer: 'テスト回答2です。',
  },
]

// 機能アイテムのモックデータ
const MockIcon: React.FC<{ className?: string }> = ({ className }) => 
  React.createElement('div', { className }, 'Icon')

export const mockFeatureItems: FeatureItem[] = [
  {
    id: 'feature-1',
    title: 'テスト機能1',
    description: 'これはテスト用の機能説明です。',
    icon: MockIcon,
  },
  {
    id: 'feature-2',
    title: 'テスト機能2',
    description: 'これはテスト用の機能説明です。',
    icon: MockIcon,
  },
]

// タイムラインのモックデータ
export const mockTimeline: TimelineItem[] = [
  {
    id: 'timeline-1',
    date: '2020年4月',
    title: '創業',
    description: '株式会社サンプルを設立',
  },
  {
    id: 'timeline-2',
    date: '2021年10月',
    title: '新社屋完成',
    description: '本社を移転',
  },
]

// コンタクトフォームのモックデータ
export const mockContactFormData = {
  company: 'テスト会社',
  name: 'テスト太郎',
  email: 'test@example.com',
  phone: '03-1234-5678',
  subject: 'お問い合わせ',
  message: 'これはテストメッセージです。',
  privacy: true,
}

// 会社情報のモックデータ
export const mockCompanyData = {
  name: '株式会社サンプル',
  established: '2020年4月1日',
  capital: '1,000万円',
  employees: '50名',
  president: '山田太郎',
  business: ['住宅建築', 'リフォーム', '不動産仲介'],
  address: {
    postal: '100-0001',
    prefecture: '東京都',
    city: '千代田区',
    street: '千代田1-1-1',
    building: 'サンプルビル',
  },
  phone: '03-1234-5678',
  fax: '03-1234-5679',
  email: 'info@example.com',
  coordinates: {
    lat: 35.6812,
    lng: 139.7671,
  },
  history: mockTimeline,
}

// ページメタデータのモックデータ
export const mockPageMetadata = {
  title: 'テストページ',
  description: 'これはテストページの説明です。',
  keywords: ['テスト', 'サンプル'],
  ogImage: '/images/og-image.jpg',
}

// ナビゲーションアイテムのモックデータ
export const mockNavigationItems = [
  {
    id: 'home',
    label: 'ホーム',
    href: '/',
  },
  {
    id: 'company',
    label: '会社案内',
    href: '/company',
  },
  {
    id: 'services',
    label: 'サービス',
    href: '/services',
    children: [
      {
        id: 'service-1',
        label: 'サービス1',
        href: '/services/1',
      },
    ],
  },
]

// 統計データのモックデータ
export const mockStats = [
  {
    id: 'stat-1',
    value: 1200,
    suffix: '棟',
    label: '累計施工実績',
  },
  {
    id: 'stat-2',
    value: 98,
    suffix: '%',
    label: '顧客満足度',
  },
]