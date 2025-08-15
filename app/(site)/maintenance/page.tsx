import { Wrench, Phone, Calendar, JapaneseYen } from 'lucide-react'
import { type Metadata } from 'next'

import CounterStats from '@/components/sections/CounterStats'
import FAQ from '@/components/sections/FAQ'
import FeatureGrid from '@/components/sections/FeatureGrid'
import PageHero from '@/components/sections/PageHero'
import faqData from '@/data/faq.json'
import { generatePageMetadata } from '@/lib/metadata'
import { type FeatureItem, type StatItem } from '@/types/pages'

export const metadata: Metadata = generatePageMetadata({
  title: 'メンテナンスサービス',
  description: '24時間365日の緊急対応から定期メンテナンスまで、住まいの健康を守る充実のサービスをご提供します。',
  keywords: ['住宅メンテナンス', '定期点検', '緊急対応', 'リフォーム'],
})

const maintenanceFeatures: FeatureItem[] = [
  {
    id: 'maintenance-feature-1',
    title: '定期メンテナンス',
    description: '年1回の基本メンテナンスで、住まいの劣化を早期発見。適切な時期での修繕により、建物の長寿命化を実現します。',
    icon: Wrench,
  },
  {
    id: 'maintenance-feature-2',
    title: '24時間緊急対応',
    description: '水漏れや設備故障など、緊急時には24時間365日対応。専門スタッフが迅速に駆けつけ、トラブルを解決します。',
    icon: Phone,
  },
  {
    id: 'maintenance-feature-3',
    title: 'メンテナンス計画',
    description: '建物の状態に応じた長期メンテナンス計画をご提案。計画的な修繕により、突発的な出費を抑えます。',
    icon: Calendar,
  },
  {
    id: 'maintenance-feature-4',
    title: 'お得な年間契約',
    description: '年間メンテナンス契約で、通常料金より最大20%OFF。部品交換時の割引や優先対応などの特典も充実。',
    icon: JapaneseYen,
  },
]

const maintenanceStats: StatItem[] = [
  {
    id: 'maint-stat-1',
    value: 365,
    suffix: '日',
    label: '年中無休対応',
  },
  {
    id: 'maint-stat-2',
    value: 30,
    suffix: '分',
    label: '平均到着時間',
  },
  {
    id: 'maint-stat-3',
    value: 95,
    suffix: '%',
    label: '即日解決率',
  },
  {
    id: 'maint-stat-4',
    value: 850,
    suffix: '件',
    label: '年間対応実績',
  },
]

export default function MaintenancePage() {
  return (
    <>
      <PageHero
        title="メンテナンスサービス"
        subtitle="住まいの健康を守り、快適な暮らしを永く続けるために"
        image="/images/hero-maintenance.jpg"
        breadcrumb={[
          { id: 'home', label: 'ホーム', href: '/' },
          { id: 'maintenance', label: 'メンテナンスサービス', href: '/maintenance' },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
              住まいの価値を維持するために
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              建物は適切なメンテナンスによって、その価値と快適性を長く保つことができます。
              私たちは専門知識と経験を活かし、お客様の大切な住まいを守るための
              最適なメンテナンスサービスをご提供します。
            </p>
          </div>
        </div>
      </section>

      <FeatureGrid items={maintenanceFeatures} columns={2} />

      <CounterStats stats={maintenanceStats} />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
              メンテナンスメニュー
            </h2>
            
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-4 text-xl font-semibold text-gray-900">
                  基本メンテナンス
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary-600">✓</span>
                    外壁・屋根の目視点検
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary-600">✓</span>
                    給排水設備の動作確認
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary-600">✓</span>
                    電気設備の安全点検
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary-600">✓</span>
                    建具の調整・注油
                  </li>
                </ul>
                <div className="mt-4 text-lg font-semibold text-primary-600">
                  年額 50,000円〜
                </div>
              </div>

              <div className="rounded-lg border border-primary-500 bg-primary-50 p-6">
                <div className="mb-2 inline-block rounded-full bg-primary-600 px-3 py-1 text-sm text-white">
                  おすすめ
                </div>
                <h3 className="mb-4 text-xl font-semibold text-gray-900">
                  プレミアムメンテナンス
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary-600">✓</span>
                    基本メンテナンスの全項目
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary-600">✓</span>
                    床下・天井裏の詳細点検
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary-600">✓</span>
                    防蟻・防腐処理の確認
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary-600">✓</span>
                    緊急時の優先対応
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary-600">✓</span>
                    部品交換20%割引
                  </li>
                </ul>
                <div className="mt-4 text-lg font-semibold text-primary-600">
                  年額 80,000円〜
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-lg bg-gray-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                スポットメンテナンスも承ります
              </h3>
              <p className="text-gray-600">
                年間契約以外でも、必要な時に必要な箇所だけのメンテナンスも可能です。
                お見積りは無料ですので、お気軽にご相談ください。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
            メンテナンスに関するよくあるご質問
          </h2>
          <FAQ items={faqData.maintenance} />
        </div>
      </section>

      <section className="bg-primary-600 py-16 text-white lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
            メンテナンスのご相談・お申し込み
          </h2>
          <p className="mb-8 text-lg">
            お電話またはお問い合わせフォームからお気軽にご連絡ください
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="tel:03-1234-5678"
              className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-primary-600 font-medium transition-colors hover:bg-gray-100"
            >
              <Phone className="mr-2 h-5 w-5" />
              03-1234-5678
            </a>
            <a
              href="/contact"
              className="inline-flex items-center rounded-lg border-2 border-white px-6 py-3 font-medium transition-colors hover:bg-white hover:text-primary-600"
            >
              お問い合わせフォーム
            </a>
          </div>
        </div>
      </section>
    </>
  )
}