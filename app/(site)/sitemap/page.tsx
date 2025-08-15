import { Metadata } from 'next'
import Link from 'next/link'
import { 
  HomeIcon, 
  BuildingOfficeIcon, 
  BriefcaseIcon, 
  ShieldCheckIcon,
  WrenchIcon,
  CheckBadgeIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  DocumentIcon,
  ScaleIcon,
  MapIcon
} from '@heroicons/react/24/outline'

import PageHero from '@/components/sections/PageHero'

export const metadata: Metadata = {
  title: 'サイトマップ',
  description: '当社ウェブサイトの全ページ一覧です。',
}

const siteStructure = [
  {
    title: 'ホーム',
    href: '/',
    icon: HomeIcon,
    description: 'トップページ',
  },
  {
    title: '事業紹介',
    href: '/house',
    icon: BriefcaseIcon,
    description: '住宅建築・リフォーム事業の詳細',
  },
  {
    title: '品質・保証',
    href: '/quality',
    icon: ShieldCheckIcon,
    description: '品質管理体制と保証制度',
    children: [
      {
        title: '品質へのこだわり',
        href: '/quality',
        icon: CheckBadgeIcon,
        description: 'ISO9001認証・品質管理体制',
      },
      {
        title: '保証制度',
        href: '/warranty',
        icon: ShieldCheckIcon,
        description: '長期保証・定期点検サービス',
      },
      {
        title: 'メンテナンス',
        href: '/maintenance',
        icon: WrenchIcon,
        description: '24時間対応・年間契約',
      },
    ],
  },
  {
    title: '会社情報',
    href: '/company',
    icon: BuildingOfficeIcon,
    description: '企業概要・アクセス',
  },
  {
    title: 'お問い合わせ',
    href: '/contact',
    icon: EnvelopeIcon,
    description: 'お問い合わせフォーム',
    children: [
      {
        title: 'お問い合わせ完了',
        href: '/contact/thanks',
        icon: EnvelopeIcon,
        description: 'お問い合わせ送信完了ページ',
      },
    ],
  },
  {
    title: '資料請求',
    href: '/documents',
    icon: DocumentTextIcon,
    description: '各種資料のダウンロード・請求',
  },
]

const footerPages = [
  {
    title: 'プライバシーポリシー',
    href: '/privacy',
    icon: DocumentIcon,
    description: '個人情報保護方針',
  },
  {
    title: '利用規約',
    href: '/terms',
    icon: ScaleIcon,
    description: 'ウェブサイト利用規約',
  },
  {
    title: 'サイトマップ',
    href: '/sitemap',
    icon: MapIcon,
    description: '全ページ一覧（このページ）',
  },
]

export default function SitemapPage() {
  return (
    <>
      <PageHero
        title="サイトマップ"
        subtitle="サイト内の全ページ一覧"
        breadcrumb={[
          { id: 'home', label: 'ホーム', href: '/' },
          { id: 'sitemap', label: 'サイトマップ', href: '/sitemap' },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">サイト構成</h2>
              <p className="text-lg text-gray-600">
                お探しのページが見つからない場合は、以下のサイトマップからお探しください。
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="mb-6 text-xl font-semibold text-gray-900 border-b pb-2">
                  メインコンテンツ
                </h3>
                <div className="space-y-6">
                  {siteStructure.map((section) => (
                    <div key={section.href} className="space-y-3">
                      <Link
                        href={section.href}
                        className="group flex items-start gap-3 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <section.icon className="h-6 w-6 text-primary-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                            {section.title}
                          </h4>
                          <p className="text-sm text-gray-600">{section.description}</p>
                        </div>
                      </Link>
                      
                      {section.children && (
                        <div className="ml-12 space-y-2">
                          {section.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="group flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                            >
                              <child.icon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <h5 className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
                                  {child.title}
                                </h5>
                                <p className="text-xs text-gray-500">{child.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-6 text-xl font-semibold text-gray-900 border-b pb-2">
                  その他のページ
                </h3>
                <div className="space-y-3">
                  {footerPages.map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      className="group flex items-start gap-3 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <page.icon className="h-6 w-6 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                          {page.title}
                        </h4>
                        <p className="text-sm text-gray-600">{page.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 rounded-lg bg-gray-50 p-6">
              <h3 className="mb-3 font-semibold text-gray-900">
                ページが見つからない場合
              </h3>
              <p className="mb-4 text-gray-600">
                お探しのページが見つからない場合は、以下の方法でお探しください：
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary-600">•</span>
                  <span>ブラウザの戻るボタンで前のページに戻る</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600">•</span>
                  <span>上記のサイトマップから関連するページを探す</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600">•</span>
                  <span>
                    <Link href="/" className="text-primary-600 hover:underline">
                      トップページ
                    </Link>
                    から探す
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600">•</span>
                  <span>
                    <Link href="/contact" className="text-primary-600 hover:underline">
                      お問い合わせ
                    </Link>
                    からご連絡いただく
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}