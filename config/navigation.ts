import { NavigationItem } from '@/types/navigation'
import {
  HomeIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  NewspaperIcon,
  UserGroupIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  ChartBarIcon,
  CogIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  AcademicCapIcon,
  GlobeAltIcon,
  HandRaisedIcon,
  ChatBubbleLeftRightIcon,
  CheckBadgeIcon,
  WrenchIcon,
} from '@heroicons/react/24/outline'

export const mainNavigation: NavigationItem[] = [
  {
    id: 'home',
    label: 'ホーム',
    href: '/',
    icon: HomeIcon,
  },
  {
    id: 'house',
    label: '事業紹介',
    href: '/house',
    icon: BriefcaseIcon,
    description: '住宅建築・リフォーム事業',
  },
  {
    id: 'quality',
    label: '品質・保証',
    href: '/quality',
    icon: ShieldCheckIcon,
    description: '品質管理と保証制度',
    children: [
      {
        id: 'quality-management',
        label: '品質へのこだわり',
        href: '/quality',
        icon: CheckBadgeIcon,
        description: 'ISO9001認証・品質管理体制',
      },
      {
        id: 'warranty',
        label: '保証制度',
        href: '/warranty',
        icon: ShieldCheckIcon,
        description: '長期保証・定期点検サービス',
      },
      {
        id: 'maintenance',
        label: 'メンテナンス',
        href: '/maintenance',
        icon: WrenchIcon,
        description: '24時間対応・年間契約',
      },
    ],
  },
  {
    id: 'company',
    label: '会社情報',
    href: '/company',
    icon: BuildingOfficeIcon,
    description: '企業概要・アクセス',
  },
]

export const utilityNavigation: NavigationItem[] = [
  {
    id: 'contact',
    label: 'お問い合わせ',
    href: '/contact',
    icon: EnvelopeIcon,
  },
  {
    id: 'documents',
    label: '資料請求',
    href: '/documents',
    icon: DocumentTextIcon,
  },
]

export const footerNavigation = {
  company: [
    { id: 'company', label: '会社概要', href: '/company' },
    { id: 'house', label: '事業紹介', href: '/house' },
  ],
  business: [
    { id: 'quality', label: '品質へのこだわり', href: '/quality' },
    { id: 'warranty', label: '保証制度', href: '/warranty' },
    { id: 'maintenance', label: 'メンテナンス', href: '/maintenance' },
  ],
  support: [
    { id: 'contact', label: 'お問い合わせ', href: '/contact' },
    { id: 'faq-quality', label: '品質FAQ', href: '/quality#faq' },
    { id: 'faq-warranty', label: '保証FAQ', href: '/warranty#faq' },
    { id: 'faq-maintenance', label: 'メンテナンスFAQ', href: '/maintenance#faq' },
  ],
  legal: [
    { id: 'privacy', label: 'プライバシーポリシー', href: '/privacy' },
    { id: 'terms', label: '利用規約', href: '/terms' },
    { id: 'sitemap', label: 'サイトマップ', href: '/sitemap' },
  ],
}
