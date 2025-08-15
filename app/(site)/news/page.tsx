import { Metadata } from 'next'

import ArticleCard from '@/components/sections/ArticleCard'
import PageHero from '@/components/sections/PageHero'
import { getAllContent, getCategories } from '@/lib/content'
import { News } from '@/types/content'

export const metadata: Metadata = {
  title: 'ニュース | 株式会社サンプル工務店',
  description: '新着情報、イベント情報、メディア掲載など、当社の最新ニュースをお届けします。',
  openGraph: {
    title: 'ニュース | 株式会社サンプル工務店',
    description: '新着情報、イベント情報、メディア掲載など、当社の最新ニュースをお届けします。',
  },
}

export default function NewsPage() {
  const categories = getCategories('news')
  const allNews = getAllContent<News>('news')
  const items = allNews.slice(0, 12) // 最新12件表示

  const breadcrumb = [
    { id: 'home', label: 'ホーム', href: '/' },
    { id: 'news', label: 'ニュース', href: '/news' },
  ]


  return (
    <>
      <PageHero
        title="ニュース"
        subtitle="News"
        image="/images/news/hero-bg.jpg"
        breadcrumb={breadcrumb}
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-lg text-gray-600">
              新着情報やイベントのご案内、メディア掲載情報など、
              当社の最新ニュースをお届けします。
            </p>
          </div>


          {items.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {items.map((news) => (
                  <ArticleCard
                    key={news.slug}
                    title={news.title}
                    description={news.description}
                    date={news.date}
                    category={getCategories('news').find(c => c.id === news.category)?.name || news.category}
                    href={`/news/${news.slug}`}
                    image={news.thumbnail}
                  />
                ))}
              </div>

              <div className="text-center text-gray-500 text-sm">
                全{allNews.length}件のニュース
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">該当するニュースがありません。</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">お知らせメール配信</h2>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <p className="text-gray-600 mb-6">
                新着情報やイベント情報をいち早くお届けするメールマガジンを配信しています。
                ご希望の方は、お問い合わせフォームよりお申し込みください。
              </p>
              <div className="text-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors"
                >
                  メールマガジン登録
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}