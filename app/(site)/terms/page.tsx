import { Metadata } from 'next'

import PageHero from '@/components/sections/PageHero'
import companyData from '@/data/company.json'

export const metadata: Metadata = {
  title: '利用規約',
  description: '当社ウェブサイトの利用規約についてご説明します。',
}

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="利用規約"
        subtitle="ウェブサイト利用規約"
        breadcrumb={[
          { id: 'home', label: 'ホーム', href: '/' },
          { id: 'terms', label: '利用規約', href: '/terms' },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <p className="lead text-lg text-gray-600 mb-8">
                この利用規約（以下「本規約」といいます）は、{companyData.name}（以下「当社」といいます）が
                提供するウェブサイトおよび関連サービス（以下「本サービス」といいます）の利用条件を定めるものです。
                本サービスをご利用いただく前に、必ず本規約をお読みください。
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第1条（適用）</h2>
              <p className="text-gray-600 mb-8">
                本規約は、ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。
                本サービスを利用することにより、ユーザーは本規約に同意したものとみなされます。
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第2条（利用登録）</h2>
              <p className="text-gray-600 mb-4">
                本サービスにおいて登録を必要とする機能の利用を希望する場合は、以下の事項を遵守するものとします：
              </p>
              <ul className="list-disc pl-8 space-y-2 text-gray-600 mb-8">
                <li>登録事項に虚偽の事実がないこと</li>
                <li>本規約に違反したことがある者でないこと</li>
                <li>未成年者の場合は、法定代理人の同意を得ていること</li>
                <li>反社会的勢力等でないこと、また関与していないこと</li>
                <li>その他、当社が定める基準を満たしていること</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第3条（禁止事項）</h2>
              <p className="text-gray-600 mb-4">
                ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません：
              </p>
              <ul className="list-disc pl-8 space-y-2 text-gray-600 mb-8">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>当社、本サービスの他のユーザー、またはその他第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為</li>
                <li>当社のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                <li>本サービスによって得られた情報を商業的に利用する行為</li>
                <li>当社のサービスの運営を妨害するおそれのある行為</li>
                <li>不正アクセスをし、またはこれを試みる行為</li>
                <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                <li>不正な目的を持って本サービスを利用する行為</li>
                <li>本サービスの他のユーザーまたはその他の第三者に不利益、損害、不快感を与える行為</li>
                <li>他のユーザーになりすます行為</li>
                <li>当社が許諾しない本サービス上での宣伝、広告、勧誘、または営業行為</li>
                <li>反社会的勢力等への利益供与</li>
                <li>その他、当社が不適切と判断する行為</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第4条（知的財産権）</h2>
              <p className="text-gray-600 mb-8">
                本サービスおよび本サービスに関連する一切の情報についての著作権およびその他の知的財産権は
                すべて当社または当社にその利用を許諾した権利者に帰属するものとします。
                ユーザーは、本サービスの利用により得られる一切の情報について、当社または権利者の事前の書面による承諾を得ずに、
                複製、送信、印刷、配布、転載、転用、販売、二次利用等をしてはならないものとします。
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第5条（免責事項）</h2>
              <div className="space-y-4 text-gray-600 mb-8">
                <p>
                  1. 当社は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、
                  特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます）
                  がないことを保証するものではありません。
                </p>
                <p>
                  2. 当社は、本サービスによってユーザーに生じたあらゆる損害について、
                  当社の故意または重過失による場合を除き、一切の責任を負いません。
                </p>
                <p>
                  3. 当社は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた
                  取引、連絡または紛争等について一切責任を負いません。
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第6条（サービス内容の変更等）</h2>
              <p className="text-gray-600 mb-8">
                当社は、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、
                これによってユーザーに生じた損害について一切の責任を負いません。
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第7条（利用制限および登録抹消）</h2>
              <p className="text-gray-600 mb-4">
                当社は、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、
                ユーザーに対して、本サービスの全部もしくは一部の利用を制限し、
                またはユーザーとしての登録を抹消することができるものとします：
              </p>
              <ul className="list-disc pl-8 space-y-2 text-gray-600 mb-8">
                <li>本規約のいずれかの条項に違反した場合</li>
                <li>登録事項に虚偽の事実があることが判明した場合</li>
                <li>料金等の支払債務の不履行があった場合</li>
                <li>当社からの連絡に対し、一定期間返答がない場合</li>
                <li>本サービスについて、最終の利用から一定期間利用がない場合</li>
                <li>その他、当社が本サービスの利用を適当でないと判断した場合</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第8条（個人情報の取扱い）</h2>
              <p className="text-gray-600 mb-8">
                当社は、本サービスの利用によって取得する個人情報については、
                当社「<a href="/privacy" className="text-primary-600 hover:underline">プライバシーポリシー</a>」に従い適切に取り扱うものとします。
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第9条（通知または連絡）</h2>
              <p className="text-gray-600 mb-8">
                ユーザーと当社との間の通知または連絡は、当社の定める方法によって行うものとします。
                当社は、ユーザーから当社が別途定める方式に従った変更届け出がない限り、
                現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い、
                これらは発信時にユーザーへ到達したものとみなします。
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第10条（権利義務の譲渡の禁止）</h2>
              <p className="text-gray-600 mb-8">
                ユーザーは、当社の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を
                第三者に譲渡し、または担保に供することはできません。
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第11条（準拠法・裁判管轄）</h2>
              <div className="space-y-4 text-gray-600 mb-8">
                <p>
                  1. 本規約の解釈にあたっては、日本法を準拠法とします。
                </p>
                <p>
                  2. 本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">第12条（規約の変更）</h2>
              <p className="text-gray-600 mb-8">
                当社は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。
                変更後の本規約は、当社ウェブサイトに掲示された時点から効力を生じるものとします。
                本規約の変更後、本サービスの利用を継続した場合には、変更後の本規約に同意したものとみなします。
              </p>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-right">
                  制定日：2010年4月1日<br />
                  最終更新日：2024年1月1日
                </p>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">お問い合わせ</h3>
                <p className="text-gray-600 mb-4">
                  本規約に関するお問い合わせは、以下の窓口までご連絡ください。
                </p>
                <div className="space-y-1 text-gray-600">
                  <p className="font-semibold">{companyData.name}</p>
                  <p>〒{companyData.address.postal} {companyData.address.prefecture}{companyData.address.city}{companyData.address.street}</p>
                  <p>TEL: {companyData.phone}</p>
                  <p>Email: {companyData.email}</p>
                  <p>受付時間：平日 9:00-18:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}