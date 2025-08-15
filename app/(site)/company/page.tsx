import { type Metadata } from 'next'
import Script from 'next/script'

import GoogleMap from '@/components/integrations/GoogleMap'
import CompanyInfo from '@/components/sections/CompanyInfo'
import PageHero from '@/components/sections/PageHero'
import Timeline from '@/components/sections/Timeline'
import companyData from '@/data/company.json'
import { generatePageMetadata } from '@/lib/metadata'
import { generateOrganizationSchema, generateLocalBusinessSchema } from '@/lib/structuredData'

export const metadata: Metadata = generatePageMetadata({
  title: '会社情報',
  description: '株式会社サンプルの会社概要、沿革、アクセス情報をご紹介します。2010年の創業以来、地域に根ざした住まいづくりを続けています。',
  keywords: ['会社概要', '企業情報', '沿革', 'アクセス'],
})

export default function CompanyPage() {
  const organizationSchema = generateOrganizationSchema()
  const localBusinessSchema = generateLocalBusinessSchema()

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      <PageHero
        title="会社情報"
        subtitle="確かな技術と信頼で、地域の住まいづくりに貢献します"
        image="/images/hero-company.jpg"
        breadcrumb={[
          { id: 'home', label: 'ホーム', href: '/' },
          { id: 'company', label: '会社情報', href: '/company' },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
              私たちについて
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              株式会社サンプルは、2010年の創業以来、地域に根ざした住宅建築会社として
              お客様の理想の住まいづくりをサポートしてまいりました。
              確かな技術力と豊富な経験、そして何よりお客様との信頼関係を大切に、
              これからも地域の皆様に愛される企業を目指してまいります。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
            会社概要
          </h2>
          <CompanyInfo data={companyData} />
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
            沿革
          </h2>
          <Timeline items={companyData.history} />
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
              経営理念
            </h2>
            
            <div className="space-y-8">
              <div className="rounded-lg bg-white p-8 shadow-md">
                <h3 className="mb-4 text-xl font-semibold text-primary-600">
                  ミッション
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  「住まいを通じて、人々の幸せな暮らしを創造する」
                  <br />
                  私たちは、単に建物を建てるだけでなく、そこに住む人々の
                  生活や夢を形にすることを使命としています。
                </p>
              </div>

              <div className="rounded-lg bg-white p-8 shadow-md">
                <h3 className="mb-4 text-xl font-semibold text-primary-600">
                  ビジョン
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  「地域No.1の信頼される住宅建築パートナー」
                  <br />
                  技術力、サービス、そして何より信頼において、
                  地域で最も選ばれる企業を目指します。
                </p>
              </div>

              <div className="rounded-lg bg-white p-8 shadow-md">
                <h3 className="mb-4 text-xl font-semibold text-primary-600">
                  バリュー
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary-600">■</span>
                    <span>誠実 - お客様との約束を必ず守る</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary-600">■</span>
                    <span>品質 - 妥協のない高品質な住まいづくり</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary-600">■</span>
                    <span>革新 - 新しい技術と価値の創造</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary-600">■</span>
                    <span>共創 - お客様と共に理想を実現</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
              アクセス
            </h2>
            
            <div className="mb-8">
              <GoogleMap
                center={companyData.coordinates}
                height="450px"
                markers={[
                  {
                    position: companyData.coordinates,
                    title: companyData.name,
                    description: companyData.address.prefecture + companyData.address.city + companyData.address.street,
                  },
                ]}
              />
            </div>

            <div className="rounded-lg bg-white p-8 shadow-md">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                交通アクセス
              </h3>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h4 className="font-semibold text-gray-900">電車でお越しの方</h4>
                  <p>東京メトロ丸ノ内線「大手町駅」C1出口より徒歩5分</p>
                  <p>JR各線「東京駅」丸の内北口より徒歩10分</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">お車でお越しの方</h4>
                  <p>首都高速都心環状線「神田橋IC」より5分</p>
                  <p>※お客様用駐車場を3台分ご用意しております</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}