import { CheckCircle, FileCheck, GraduationCap, Beaker } from 'lucide-react'
import { type Metadata } from 'next'

import FAQ from '@/components/sections/FAQ'
import FeatureGrid from '@/components/sections/FeatureGrid'
import PageHero from '@/components/sections/PageHero'
import faqData from '@/data/faq.json'
import { generatePageMetadata } from '@/lib/metadata'
import { type FeatureItem } from '@/types/pages'

export const metadata: Metadata = generatePageMetadata({
  title: '品質へのこだわり',
  description: 'ISO9001認証取得。確かな品質管理体制と熟練の技術で、安心・安全な住まいづくりを実現します。',
  keywords: ['品質管理', 'ISO9001', '建築技術', '検査体制'],
})

const qualityFeatures: FeatureItem[] = [
  {
    id: 'quality-feature-1',
    title: 'ISO9001認証取得',
    description: '国際標準の品質マネジメントシステムを導入し、設計から施工、アフターサービスまで一貫した品質管理を実施しています。',
    icon: CheckCircle,
  },
  {
    id: 'quality-feature-2',
    title: '厳格な検査体制',
    description: '各工程での自主検査に加え、第三者機関による検査も実施。二重三重のチェック体制で品質を保証します。',
    icon: FileCheck,
  },
  {
    id: 'quality-feature-3',
    title: '技術者の育成',
    description: '定期的な技術研修と資格取得支援により、スタッフの技術力向上に努めています。マイスター制度も導入。',
    icon: GraduationCap,
  },
  {
    id: 'quality-feature-4',
    title: '最新技術の研究',
    description: '建築技術の進化に対応するため、新工法や新素材の研究・導入を積極的に行っています。',
    icon: Beaker,
  },
]

export default function QualityPage() {
  return (
    <>
      <PageHero
        title="品質へのこだわり"
        subtitle="確かな技術と厳格な管理で、最高品質の住まいをお届けします"
        image="/images/hero-quality.jpg"
        breadcrumb={[
          { id: 'home', label: 'ホーム', href: '/' },
          { id: 'quality', label: '品質へのこだわり', href: '/quality' },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
              品質管理の基本理念
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              私たちは「品質は信頼の証」という理念のもと、お客様に安心して長く住んでいただける
              住まいづくりを追求しています。ISO9001認証を取得し、国際標準に基づいた
              品質管理体制を構築。全社一丸となって品質向上に取り組んでいます。
            </p>
          </div>
        </div>
      </section>

      <FeatureGrid items={qualityFeatures} columns={2} />

      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
              品質管理プロセス
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">設計段階</h3>
                  <p className="text-gray-600">
                    建築基準法の遵守はもちろん、耐震性・断熱性・省エネ性能など、
                    高い性能基準を満たす設計を行います。複数の設計者によるクロスチェックも実施。
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">施工段階</h3>
                  <p className="text-gray-600">
                    各工程ごとに品質チェックリストに基づいた検査を実施。
                    基礎・構造・防水など重要工程では、写真記録による品質管理も行います。
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">完成検査</h3>
                  <p className="text-gray-600">
                    社内検査に加え、第三者機関による完成検査を実施。
                    お客様立会いのもと、仕上がりの確認と設備の使用説明を丁寧に行います。
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-white font-bold">
                  4
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">アフターサービス</h3>
                  <p className="text-gray-600">
                    定期的な点検により、住まいの状態を継続的に管理。
                    不具合の早期発見・早期対応により、住まいの長寿命化を実現します。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
            品質に関するよくあるご質問
          </h2>
          <FAQ items={faqData.quality} />
        </div>
      </section>
    </>
  )
}