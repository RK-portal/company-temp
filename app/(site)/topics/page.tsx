import { Metadata } from 'next'

import ArticleCard from '@/components/sections/ArticleCard'
import PageHero from '@/components/sections/PageHero'
import { getAllContent, getCategories } from '@/lib/content'
import { Topic } from '@/types/content'

export const metadata: Metadata = {
  title: 'トピックス | 株式会社サンプル工務店',
  description: '住まいづくりに役立つ技術情報、コラム、レポートなど、専門的な情報をお届けします。',
  openGraph: {
    title: 'トピックス | 株式会社サンプル工務店',
    description: '住まいづくりに役立つ技術情報、コラム、レポートなど、専門的な情報をお届けします。',
  },
}

export default function TopicsPage() {
  const categories = getCategories('topics')
  const allTopics = getAllContent<Topic>('topics')
  const items = allTopics.slice(0, 12) // 最新12件表示

  const breadcrumb = [
    { id: 'home', label: 'ホーム', href: '/' },
    { id: 'topics', label: 'トピックス', href: '/topics' },
  ]


  return (
    <>
      <PageHero
        title="トピックス"
        subtitle="Topics"
        image="/images/topics/hero-bg.jpg"
        breadcrumb={breadcrumb}
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-lg text-gray-600">
              住まいづくりのプロフェッショナルとして、
              最新の技術情報や業界トレンド、お役立ち情報をお届けします。
            </p>
          </div>


          {items.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {items.map((topic) => (
                  <ArticleCard
                    key={topic.slug}
                    title={topic.title}
                    description={topic.description}
                    date={topic.date}
                    category={getCategories('topics').find(c => c.id === topic.category)?.name || topic.category}
                    href={`/topics/${topic.slug}`}
                    image={topic.thumbnail}
                  />
                ))}
              </div>

              <div className="text-center text-gray-500 text-sm">
                全{allTopics.length}件のトピックス
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">該当するトピックスがありません。</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">資料請求</h3>
              <p className="text-gray-600 mb-6">
                住まいづくりに関する詳しい資料をご用意しています。
                お気軽にお申し込みください。
              </p>
              <a
                href="/contact"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                資料請求はこちら →
              </a>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">無料相談会</h3>
              <p className="text-gray-600 mb-6">
                住まいづくりの専門家が、お客様のご質問にお答えします。
                オンライン相談も承っています。
              </p>
              <a
                href="/contact"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                相談会のご予約 →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}