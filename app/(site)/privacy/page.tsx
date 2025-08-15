import { Metadata } from 'next'

import PageHero from '@/components/sections/PageHero'
import companyData from '@/data/company.json'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: '当社のプライバシーポリシーについてご説明します。',
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="プライバシーポリシー"
        subtitle="個人情報保護方針"
        breadcrumb={[
          { id: 'home', label: 'ホーム', href: '/' },
          { id: 'privacy', label: 'プライバシーポリシー', href: '/privacy' },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <p className="lead text-lg text-gray-600 mb-8">
                {companyData.name}（以下「当社」といいます）は、お客様の個人情報の重要性を認識し、
                その保護の徹底を図ることを目的として、以下のプライバシーポリシーを定めます。
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. 個人情報の定義</h2>
              <p className="text-gray-600 mb-8">
                本プライバシーポリシーにおいて「個人情報」とは、個人情報保護法に定める個人情報、
                すなわち生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により
                特定の個人を識別することができるもの（他の情報と容易に照合することができ、
                それにより特定の個人を識別することができることとなるものを含みます）をいいます。
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. 個人情報の収集</h2>
              <p className="text-gray-600 mb-4">
                当社は、以下の場合に個人情報を収集することがあります：
              </p>
              <ul className="list-disc pl-8 space-y-2 text-gray-600 mb-8">
                <li>お問い合わせフォームからのご連絡時</li>
                <li>資料請求のお申し込み時</li>
                <li>各種サービスのお申し込み時</li>
                <li>アンケートへのご回答時</li>
                <li>その他、お客様から直接または間接的に個人情報をご提供いただく場合</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. 個人情報の利用目的</h2>
              <p className="text-gray-600 mb-4">
                当社は、収集した個人情報を以下の目的で利用いたします：
              </p>
              <ul className="list-disc pl-8 space-y-2 text-gray-600 mb-8">
                <li>お客様からのお問い合わせへの対応</li>
                <li>当社サービスの提供およびその品質向上</li>
                <li>資料・カタログ等の送付</li>
                <li>新商品・サービス等のご案内</li>
                <li>メンテナンス、重要なお知らせ等の連絡</li>
                <li>マーケティング調査および分析</li>
                <li>当社サービスの改善・新サービスの開発</li>
                <li>その他、上記利用目的に付随する目的</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">4. 個人情報の第三者提供</h2>
              <p className="text-gray-600 mb-4">
                当社は、以下の場合を除き、お客様の同意なく個人情報を第三者に提供することはありません：
              </p>
              <ul className="list-disc pl-8 space-y-2 text-gray-600 mb-8">
                <li>法令に基づく場合</li>
                <li>人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">5. 個人情報の安全管理</h2>
              <p className="text-gray-600 mb-8">
                当社は、個人情報の紛失、破壊、改ざん及び漏洩等を防止するため、
                適切な情報セキュリティ対策を実施し、個人情報の安全管理に努めます。
                また、個人情報を取り扱う従業員に対し、適切な監督を行います。
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">6. 個人情報の開示・訂正・削除</h2>
              <p className="text-gray-600 mb-8">
                お客様は、当社が保有するお客様の個人情報について、開示・訂正・削除を請求する権利を有しています。
                請求される場合は、本人確認をさせていただいた上で、合理的な期間内に対応いたします。
                ただし、以下の場合は開示に応じないことがあります：
              </p>
              <ul className="list-disc pl-8 space-y-2 text-gray-600 mb-8">
                <li>本人または第三者の生命、身体、財産その他の権利利益を害するおそれがある場合</li>
                <li>当社の業務の適正な実施に著しい支障を及ぼすおそれがある場合</li>
                <li>他の法令に違反することとなる場合</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">7. Cookieの使用について</h2>
              <p className="text-gray-600 mb-8">
                当社のウェブサイトでは、お客様により良いサービスを提供するためにCookieを使用することがあります。
                Cookieは、ウェブサイトの利用状況を分析し、お客様の利便性を向上させるために使用されます。
                お客様は、ブラウザの設定によりCookieの受け取りを拒否することができますが、
                その場合、当社ウェブサイトの一部機能が利用できなくなる場合があります。
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">8. Google Analyticsの使用について</h2>
              <p className="text-gray-600 mb-8">
                当社のウェブサイトでは、Google社が提供するアクセス解析ツール「Google Analytics」を使用しています。
                Google Analyticsはトラフィックデータの収集のためにCookieを使用しています。
                このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
                この機能はCookieを無効にすることで収集を拒否することが可能ですので、お使いのブラウザの設定をご確認ください。
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">9. プライバシーポリシーの変更</h2>
              <p className="text-gray-600 mb-8">
                当社は、法令の改正や社会情勢の変化等に応じて、本プライバシーポリシーを変更することがあります。
                変更後のプライバシーポリシーは、当社ウェブサイトに掲載した時点から効力を生じるものとします。
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">10. お問い合わせ窓口</h2>
              <p className="text-gray-600 mb-4">
                個人情報の取り扱いに関するお問い合わせは、以下の窓口までご連絡ください：
              </p>
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <p className="text-gray-900 font-semibold mb-2">{companyData.name}</p>
                <p className="text-gray-600">個人情報保護管理責任者</p>
                <p className="text-gray-600">
                  〒{companyData.address.postal} {companyData.address.prefecture}{companyData.address.city}{companyData.address.street}
                </p>
                <p className="text-gray-600">TEL: {companyData.phone}</p>
                <p className="text-gray-600">Email: {companyData.email}</p>
                <p className="text-gray-600">受付時間：平日 9:00-18:00</p>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-right">
                  制定日：2010年4月1日<br />
                  最終更新日：2024年1月1日
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}