# カスタムページ作成の実装例

このドキュメントでは、新しいページを作成する具体的な実装例を紹介します。

## 基本的なページの作成

### シンプルなページ

`app/(site)/services/page.tsx`:

```tsx
import { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { FeatureGrid } from '@/components/sections/FeatureGrid'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'サービス一覧',
  description: '私たちが提供する住宅関連サービスをご紹介します。',
}

export default function ServicesPage() {
  const breadcrumb = [
    { label: 'ホーム', href: '/' },
    { label: 'サービス一覧' },
  ]

  const services = [
    {
      icon: '🏠',
      title: '新築住宅',
      description: 'お客様の理想を形にする、完全オーダーメイドの新築住宅。',
      href: '/house',
    },
    {
      icon: '🔧',
      title: 'リフォーム・リノベーション',
      description: '住み慣れた家を、より快適で機能的な空間へ。',
      href: '/services/renovation',
    },
    {
      icon: '🏢',
      title: '店舗・オフィス設計',
      description: 'ビジネスの成功を支える、機能的で魅力的な空間設計。',
      href: '/services/commercial',
    },
    {
      icon: '📐',
      title: '建築設計・監理',
      description: '経験豊富な建築士による、安心の設計・監理サービス。',
      href: '/services/design',
    },
  ]

  return (
    <>
      <PageHero
        title="サービス一覧"
        subtitle="住まいに関するあらゆるニーズにお応えします"
        image="/images/services/hero.jpg"
        breadcrumb={breadcrumb}
      />

      <section className="py-16 md:py-24">
        <div className="container">
          <FeatureGrid items={services} columns={2} />
        </div>
      </section>

      <section className="py-16 bg-background-secondary">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            なぜ私たちが選ばれるのか
          </h2>
          <div className="prose prose-lg mx-auto">
            <p>
              創業50年の実績と信頼。地域に根ざした工務店として、
              お客様一人ひとりの想いに寄り添い、理想の住まいづくりをサポートします。
            </p>
            <ul>
              <li>経験豊富な職人による確かな施工品質</li>
              <li>地域の気候・風土を熟知した最適な提案</li>
              <li>アフターフォローまで一貫したサポート体制</li>
              <li>明確で適正な価格設定</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
```

## 動的ルーティングを使用したページ

### カテゴリー別ページ

`app/(site)/works/category/[category]/page.tsx`:

```tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/sections/PageHero'
import { WorksCard } from '@/components/sections/WorksCard'
import { Pagination } from '@/components/ui/Pagination'
import { getWorks, getWorkCategories } from '@/lib/content'

interface PageProps {
  params: { category: string }
  searchParams: { page?: string }
}

export async function generateStaticParams() {
  const categories = await getWorkCategories()
  return categories.map((category) => ({
    category: category.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const categoryName = getCategoryName(params.category)
  
  return {
    title: `${categoryName}の施工事例`,
    description: `${categoryName}の施工事例一覧。豊富な実績をご覧ください。`,
  }
}

export default async function WorksCategoryPage({ params, searchParams }: PageProps) {
  const { category } = params
  const currentPage = Number(searchParams.page) || 1
  const itemsPerPage = 9

  const allWorks = await getWorks()
  const categoryWorks = allWorks.filter(work => 
    work.category.toLowerCase() === category.toLowerCase()
  )

  if (categoryWorks.length === 0) {
    notFound()
  }

  const totalPages = Math.ceil(categoryWorks.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const works = categoryWorks.slice(startIndex, startIndex + itemsPerPage)

  const breadcrumb = [
    { label: 'ホーム', href: '/' },
    { label: '施工事例', href: '/works' },
    { label: getCategoryName(category) },
  ]

  return (
    <>
      <PageHero
        title={`${getCategoryName(category)}の施工事例`}
        subtitle={`${categoryWorks.length}件の実績`}
        image="/images/works/category-hero.jpg"
        breadcrumb={breadcrumb}
      />

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((work) => (
              <WorksCard key={work.slug} {...work} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath={`/works/category/${category}`}
              />
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function getCategoryName(slug: string): string {
  const categories: Record<string, string> = {
    'new-construction': '新築',
    'renovation': 'リフォーム・リノベーション',
    'commercial': '店舗・オフィス',
    'two-family': '二世帯住宅',
  }
  return categories[slug] || slug
}
```

## インタラクティブなページ

### 料金シミュレーター

`app/(site)/simulator/page.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { Radio } from '@/components/ui/Radio'
import { formatCurrency } from '@/lib/utils'

// メタデータはサーバーコンポーネントで設定
export const metadata: Metadata = {
  title: '建築費用シミュレーター',
  description: '新築住宅の概算費用を簡単にシミュレーション。',
}

export default function SimulatorPage() {
  const [formData, setFormData] = useState({
    area: '30',
    structure: 'wood',
    grade: 'standard',
    options: [] as string[],
  })
  
  const [result, setResult] = useState<number | null>(null)

  const calculatePrice = () => {
    const basePrice = {
      wood: 600000,      // 木造: 60万円/坪
      steel: 800000,     // 鉄骨造: 80万円/坪
      rc: 1000000,       // RC造: 100万円/坪
    }

    const gradeMultiplier = {
      economy: 0.8,
      standard: 1.0,
      premium: 1.3,
    }

    const optionPrices = {
      solar: 2000000,    // 太陽光発電
      allElectric: 500000, // オール電化
      floorHeating: 1000000, // 床暖房
      smartHome: 800000,  // スマートホーム
    }

    let total = Number(formData.area) * basePrice[formData.structure as keyof typeof basePrice]
    total *= gradeMultiplier[formData.grade as keyof typeof gradeMultiplier]

    formData.options.forEach(option => {
      total += optionPrices[option as keyof typeof optionPrices] || 0
    })

    setResult(total)
  }

  const toggleOption = (option: string) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.includes(option)
        ? prev.options.filter(o => o !== option)
        : [...prev.options, option]
    }))
  }

  return (
    <>
      <PageHero
        title="建築費用シミュレーター"
        subtitle="簡単な質問に答えるだけで概算費用がわかります"
        image="/images/simulator/hero.jpg"
        breadcrumb={[
          { label: 'ホーム', href: '/' },
          { label: '建築費用シミュレーター' },
        ]}
      />

      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-8">
              {/* 建築面積 */}
              <div>
                <label className="block text-lg font-medium mb-4">
                  建築面積（坪）
                </label>
                <Select
                  value={formData.area}
                  onChange={(value) => setFormData({ ...formData, area: value })}
                  options={[
                    { value: '20', label: '20坪（約66㎡）' },
                    { value: '25', label: '25坪（約83㎡）' },
                    { value: '30', label: '30坪（約99㎡）' },
                    { value: '35', label: '35坪（約116㎡）' },
                    { value: '40', label: '40坪（約132㎡）' },
                    { value: '45', label: '45坪（約149㎡）' },
                    { value: '50', label: '50坪（約165㎡）' },
                  ]}
                />
              </div>

              {/* 構造 */}
              <div>
                <label className="block text-lg font-medium mb-4">
                  構造
                </label>
                <Radio
                  name="structure"
                  value={formData.structure}
                  onChange={(value) => setFormData({ ...formData, structure: value })}
                  options={[
                    { value: 'wood', label: '木造' },
                    { value: 'steel', label: '鉄骨造' },
                    { value: 'rc', label: 'RC造（鉄筋コンクリート）' },
                  ]}
                />
              </div>

              {/* グレード */}
              <div>
                <label className="block text-lg font-medium mb-4">
                  仕様グレード
                </label>
                <Radio
                  name="grade"
                  value={formData.grade}
                  onChange={(value) => setFormData({ ...formData, grade: value })}
                  options={[
                    { value: 'economy', label: 'エコノミー（標準仕様）' },
                    { value: 'standard', label: 'スタンダード（こだわり仕様）' },
                    { value: 'premium', label: 'プレミアム（高級仕様）' },
                  ]}
                />
              </div>

              {/* オプション */}
              <div>
                <label className="block text-lg font-medium mb-4">
                  オプション（複数選択可）
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'solar', label: '太陽光発電システム（5kW）' },
                    { value: 'allElectric', label: 'オール電化' },
                    { value: 'floorHeating', label: '床暖房（LDK）' },
                    { value: 'smartHome', label: 'スマートホーム設備' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.options.includes(option.value)}
                        onChange={() => toggleOption(option.value)}
                        className="mr-3"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 計算ボタン */}
              <div className="text-center">
                <Button onClick={calculatePrice} size="lg">
                  概算費用を計算する
                </Button>
              </div>

              {/* 結果表示 */}
              {result !== null && (
                <div className="mt-8 p-6 bg-primary-light/10 rounded-lg">
                  <h3 className="text-2xl font-bold text-center mb-4">
                    概算建築費用
                  </h3>
                  <p className="text-4xl font-bold text-center text-primary">
                    {formatCurrency(result)}
                  </p>
                  <p className="text-sm text-center text-text-secondary mt-4">
                    ※ この金額は概算です。実際の費用は設計内容により変動します。<br />
                    ※ 土地代、外構工事、諸費用は含まれていません。
                  </p>
                  <div className="text-center mt-6">
                    <Button href="/contact" variant="primary">
                      詳しい見積もりを依頼する
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 prose prose-lg mx-auto">
            <h2>ご利用にあたって</h2>
            <p>
              このシミュレーターは、一般的な建築費用の目安を算出するものです。
              実際の費用は、以下の要因により変動します：
            </p>
            <ul>
              <li>建築地の条件（地盤、接道、高低差など）</li>
              <li>設計の複雑さ（間取り、デザインなど）</li>
              <li>使用する設備・建材のグレード</li>
              <li>地域による価格差</li>
            </ul>
            <p>
              より正確な見積もりをご希望の方は、お気軽にお問い合わせください。
              無料でご相談・概算見積もりを承っております。
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
```

## データ取得を伴うページ

### スタッフ紹介ページ

`app/(site)/staff/page.tsx`:

```tsx
import { Metadata } from 'next'
import Image from 'next/image'
import { PageHero } from '@/components/sections/PageHero'
import { getStaffMembers } from '@/lib/staff'

export const metadata: Metadata = {
  title: 'スタッフ紹介',
  description: '経験豊富なスタッフが、お客様の理想の住まいづくりをサポートします。',
}

interface StaffMember {
  id: string
  name: string
  role: string
  qualification: string[]
  message: string
  image: string
}

export default async function StaffPage() {
  const staffMembers = await getStaffMembers()

  return (
    <>
      <PageHero
        title="スタッフ紹介"
        subtitle="プロフェッショナルチームがお客様をサポート"
        image="/images/staff/hero.jpg"
        breadcrumb={[
          { label: 'ホーム', href: '/' },
          { label: '会社情報', href: '/company' },
          { label: 'スタッフ紹介' },
        ]}
      />

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staffMembers.map((staff) => (
              <StaffCard key={staff.id} {...staff} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background-secondary">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">
            チーム一丸となってサポートします
          </h2>
          <p className="text-lg text-text-secondary mb-8">
            設計から施工、アフターフォローまで、各分野のプロフェッショナルが
            連携してお客様の理想の住まいを実現します。
          </p>
          <Button href="/contact" size="lg">
            無料相談を申し込む
          </Button>
        </div>
      </section>
    </>
  )
}

function StaffCard({ name, role, qualification, message, image }: StaffMember) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-[4/5] relative">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-primary font-medium mb-3">{role}</p>
        {qualification.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-text-secondary">
              {qualification.join(' / ')}
            </p>
          </div>
        )}
        <p className="text-sm leading-relaxed">{message}</p>
      </div>
    </div>
  )
}
```

---

これらの例を参考に、プロジェクトに必要なカスタムページを作成してください。