import { ShieldCheck, Clock, FileText, Users } from 'lucide-react'
import { type Metadata } from 'next'

import FAQ from '@/components/sections/FAQ'
import FeatureGrid from '@/components/sections/FeatureGrid'
import PageHero from '@/components/sections/PageHero'
import faqData from '@/data/faq.json'
import { generatePageMetadata } from '@/lib/metadata'
import { type FeatureItem } from '@/types/pages'

export const metadata: Metadata = generatePageMetadata({
  title: '保証制度',
  description: '構造躯体10年保証、防水5年保証をはじめ、充実した保証制度で建築後も安心をお約束します。',
  keywords: ['住宅保証', '瑕疵保証', '定期点検', 'アフターサービス'],
})

const warrantyFeatures: FeatureItem[] = [
  {
    id: 'warranty-feature-1',
    title: '長期構造保証',
    description: '基礎・柱・梁などの構造耐力上主要な部分について、10年間の瑕疵保証をご提供。延長保証制度もご用意しています。',
    icon: ShieldCheck,
  },
  {
    id: 'warranty-feature-2',
    title: '定期点検サービス',
    description: '3ヶ月、1年、2年、5年、10年の定期点検を無料で実施。住まいの状態を継続的にチェックします。',
    icon: Clock,
  },
  {
    id: 'warranty-feature-3',
    title: '保証書の発行',
    description: '保証内容を明記した保証書を発行。保証期間・保証範囲・免責事項などを明確にお示しします。',
    icon: FileText,
  },
  {
    id: 'warranty-feature-4',
    title: '専門スタッフ対応',
    description: '保証に関するご相談は専門スタッフが対応。迅速かつ適切なアフターサービスをご提供します。',
    icon: Users,
  },
]

export default function WarrantyPage() {
  return (
    <>
      <PageHero
        title="保証制度"
        subtitle="建築後も続く安心。充実の保証制度でお客様の暮らしを守ります"
        image="/images/hero-warranty.jpg"
        breadcrumb={[
          { id: 'home', label: 'ホーム', href: '/' },
          { id: 'warranty', label: '保証制度', href: '/warranty' },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
              建てた後も、ずっと安心
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              住まいは建てて終わりではありません。私たちは充実した保証制度と
              定期的な点検サービスにより、お客様が安心して長く暮らせる環境を
              サポートします。万が一の不具合にも迅速に対応いたします。
            </p>
          </div>
        </div>
      </section>

      <FeatureGrid items={warrantyFeatures} columns={2} />

      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
              保証内容の詳細
            </h2>
            
            <div className="overflow-hidden rounded-lg bg-white shadow-lg">
              <table className="w-full">
                <thead className="bg-primary-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">保証対象</th>
                    <th className="px-6 py-4 text-center">保証期間</th>
                    <th className="px-6 py-4 text-left">保証内容</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">構造躯体</td>
                    <td className="px-6 py-4 text-center text-primary-600 font-bold">10年</td>
                    <td className="px-6 py-4 text-gray-600">
                      基礎、柱、梁、耐力壁などの構造耐力上主要な部分
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">防水</td>
                    <td className="px-6 py-4 text-center text-primary-600 font-bold">5年</td>
                    <td className="px-6 py-4 text-gray-600">
                      屋根、外壁、バルコニーなどの雨水浸入防止部分
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">設備機器</td>
                    <td className="px-6 py-4 text-center text-primary-600 font-bold">2年</td>
                    <td className="px-6 py-4 text-gray-600">
                      給排水設備、電気設備、換気設備などの住宅設備
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">内装仕上げ</td>
                    <td className="px-6 py-4 text-center text-primary-600 font-bold">2年</td>
                    <td className="px-6 py-4 text-gray-600">
                      クロス、フローリング、建具などの内装仕上げ材
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 rounded-lg bg-primary-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                延長保証制度について
              </h3>
              <p className="text-gray-600">
                基本保証期間終了後も、有償にて保証期間を延長できる制度をご用意しています。
                最長20年まで延長可能で、より長期的な安心をご提供します。
                詳細は担当スタッフまでお問い合わせください。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
              定期点検スケジュール
            </h2>
            
            <div className="relative">
              <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-300 md:left-1/2 md:-translate-x-1/2" />
              
              <div className="space-y-8">
                {[
                  { period: '3ヶ月', content: '初期不具合の確認、設備の使用状況チェック' },
                  { period: '1年', content: '季節を通じた住まいの状態確認、メンテナンス指導' },
                  { period: '2年', content: '設備機器・内装仕上げの保証期限前総点検' },
                  { period: '5年', content: '防水性能の確認、外装の劣化状況チェック' },
                  { period: '10年', content: '構造躯体の総点検、今後のメンテナンス計画提案' },
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <div className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      <div className="w-full md:w-5/12">
                        <div className="rounded-lg bg-white p-6 shadow-md">
                          <div className="mb-2 text-lg font-semibold text-primary-600">
                            {item.period}点検
                          </div>
                          <p className="text-gray-600">{item.content}</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute left-8 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-600 ring-4 ring-white md:left-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
            保証に関するよくあるご質問
          </h2>
          <FAQ items={faqData.warranty} />
        </div>
      </section>
    </>
  )
}