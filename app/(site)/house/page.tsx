import { Home, Wrench, Building, ShieldCheck } from 'lucide-react'
import { type Metadata } from 'next'

import CounterStats from '@/components/sections/CounterStats'
import FeatureGrid from '@/components/sections/FeatureGrid'
import PageHero from '@/components/sections/PageHero'
import { generatePageMetadata } from '@/lib/metadata'
import { type FeatureItem, type StatItem } from '@/types/pages'

export const metadata: Metadata = generatePageMetadata({
  title: '事業紹介',
  description: '株式会社サンプルの住宅建築・リフォーム事業をご紹介します。確かな技術と豊富な経験で、お客様の理想の住まいを実現します。',
  keywords: ['住宅建築', 'リフォーム', '不動産', 'メンテナンス'],
})

const features: FeatureItem[] = [
  {
    id: 'feature-1',
    title: '新築住宅建築',
    description: '最新の建築技術と伝統的な職人技を融合し、耐震性・断熱性に優れた快適な住まいをご提供します。',
    icon: Home,
  },
  {
    id: 'feature-2',
    title: 'リフォーム・リノベーション',
    description: '既存の住まいを、ライフスタイルの変化に合わせて快適にリニューアル。部分改修から全面改装まで対応します。',
    icon: Wrench,
  },
  {
    id: 'feature-3',
    title: '不動産仲介',
    description: '土地探しから物件選びまで、豊富な経験と地域ネットワークを活かしてお客様の理想の物件探しをサポートします。',
    icon: Building,
  },
  {
    id: 'feature-4',
    title: 'アフターメンテナンス',
    description: '建築後も安心して暮らしていただけるよう、定期点検から緊急対応まで、きめ細やかなサポート体制を整えています。',
    icon: ShieldCheck,
  },
]

const stats: StatItem[] = [
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
  {
    id: 'stat-3',
    value: 15,
    suffix: '年',
    label: '平均勤続年数',
  },
  {
    id: 'stat-4',
    value: 24,
    suffix: '時間',
    label: '緊急対応体制',
  },
]

export default function HousePage() {
  return (
    <>
      <PageHero
        title="事業紹介"
        subtitle="確かな技術と豊富な経験で、理想の住まいを実現します"
        image="/images/hero-house.jpg"
        breadcrumb={[
          { id: 'home', label: 'ホーム', href: '/' },
          { id: 'house', label: '事業紹介', href: '/house' },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
              住まいづくりのトータルサポート
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              株式会社サンプルは、新築住宅の建築からリフォーム、不動産仲介、そしてアフターメンテナンスまで、
              住まいに関するあらゆるサービスを提供しています。創業以来培ってきた確かな技術力と、
              お客様一人ひとりに寄り添う姿勢で、理想の住まいづくりをお手伝いいたします。
            </p>
          </div>
        </div>
      </section>

      <FeatureGrid items={features} columns={2} />

      <CounterStats stats={stats} />

      <section className="bg-primary-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
              私たちの強み
            </h2>
            
            <div className="space-y-8">
              <div className="rounded-lg bg-white p-8 shadow-md">
                <h3 className="mb-4 text-xl font-semibold text-gray-900">
                  地域密着型の事業展開
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  地域の気候や風土を熟知し、その土地に最適な住まいづくりをご提案。
                  地元の協力業者との強固なネットワークにより、迅速かつ丁寧な対応を実現しています。
                </p>
              </div>

              <div className="rounded-lg bg-white p-8 shadow-md">
                <h3 className="mb-4 text-xl font-semibold text-gray-900">
                  ワンストップサービス
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  土地探しから設計・施工、そしてメンテナンスまで、住まいに関するすべてを
                  当社で完結。各部門の専門スタッフが連携し、スムーズなサービス提供を行います。
                </p>
              </div>

              <div className="rounded-lg bg-white p-8 shadow-md">
                <h3 className="mb-4 text-xl font-semibold text-gray-900">
                  最新技術の積極的導入
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  省エネ技術やスマートホーム、耐震・制震技術など、最新の建築技術を
                  積極的に導入。快適性と安全性を両立した住まいをご提供します。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}