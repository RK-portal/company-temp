import { Metadata } from 'next'
import Link from 'next/link'

import PageHero from '@/components/sections/PageHero'
import WorksCard from '@/components/sections/WorksCard'
import { getAllContent, getCategories } from '@/lib/content'
import { Work } from '@/types/content'

export const metadata: Metadata = {
  title: '施工事例 | 株式会社サンプル工務店',
  description: '新築住宅、リフォーム、外構工事など、様々な施工事例をご紹介します。理想の住まいづくりの参考にご覧ください。',
  openGraph: {
    title: '施工事例 | 株式会社サンプル工務店',
    description: '新築住宅、リフォーム、外構工事など、様々な施工事例をご紹介します。',
  },
}

export default function WorksPage() {
  const categories = getCategories('works')
  const allWorks = getAllContent<Work>('works')
  const items = allWorks.slice(0, 12) // 最新12件表示

  const breadcrumb = [
    { id: 'home', label: 'ホーム', href: '/' },
    { id: 'works', label: '施工事例', href: '/works' },
  ]


  return (
    <>
      <PageHero
        title="施工事例"
        subtitle="Works"
        image="/images/works/hero-bg.jpg"
        breadcrumb={breadcrumb}
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-lg text-gray-600">
              お客様の理想を形にした施工事例をご紹介します。
              新築からリフォーム、外構まで、様々なプロジェクトをご覧いただけます。
            </p>
          </div>


          {items.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {items.map((work) => (
                  <WorksCard
                    key={work.slug}
                    title={work.title}
                    description={work.description}
                    category={getCategories('works').find(c => c.id === work.category)?.name || work.category}
                    area={work.area}
                    href={`/works/${work.slug}`}
                    thumbnail={work.thumbnail || '/images/placeholder.svg'}
                  />
                ))}
              </div>

              <div className="text-center text-gray-500 text-sm">
                全{allWorks.length}件の施工事例
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">該当する施工事例がありません。</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">理想の住まいを実現します</h2>
            <p className="text-gray-600 mb-8">
              豊富な施工実績と確かな技術力で、お客様の夢を形にします。
              まずはお気軽にご相談ください。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors"
            >
              お問い合わせはこちら
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}