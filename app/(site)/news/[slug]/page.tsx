import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import ArticleCard from '@/components/sections/ArticleCard'
import PageHero from '@/components/sections/PageHero'
import ShareButtons from '@/components/ui/ShareButtons'
import { getContentBySlug, getAllContent, getRelatedContent, getCategories } from '@/lib/content'
import { markdownToHtml, formatDate } from '@/lib/markdown'
import { News } from '@/types/content'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const news = getAllContent<News>('news')
  return news.map((item) => ({
    slug: item.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const news = getContentBySlug<News>('news', params.slug)
  
  if (!news) {
    return {
      title: 'ニュースが見つかりません',
    }
  }

  return {
    title: `${news.title} | ニュース | 株式会社サンプル工務店`,
    description: news.description,
    openGraph: {
      title: news.title,
      description: news.description,
      images: news.thumbnail ? [news.thumbnail] : undefined,
      type: 'article',
      publishedTime: news.date,
    },
  }
}

export default async function NewsDetailPage({ params }: PageProps) {
  const news = getContentBySlug<News>('news', params.slug)
  
  if (!news) {
    notFound()
  }

  const htmlContent = await markdownToHtml(news.content)
  const relatedNews = getRelatedContent<News>('news', news.slug, 3)
  const categoryName = getCategories('news').find(c => c.id === news.category)?.name || news.category

  const breadcrumb = [
    { id: 'home', label: 'ホーム', href: '/' },
    { id: 'news', label: 'ニュース', href: '/news' },
    { id: news.slug, label: news.title, href: `/news/${news.slug}` },
  ]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: news.title,
    description: news.description,
    datePublished: news.date,
    dateModified: news.date,
    image: news.thumbnail,
    author: {
      '@type': 'Organization',
      name: '株式会社サンプル工務店',
    },
    publisher: {
      '@type': 'Organization',
      name: '株式会社サンプル工務店',
      logo: {
        '@type': 'ImageObject',
        url: 'https://example.com/images/logo.png',
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <PageHero
        title="ニュース"
        subtitle="News"
        image="/images/news/hero-bg.jpg"
        breadcrumb={breadcrumb}
      />

      <article className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* 記事ヘッダー */}
            <header className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <time dateTime={news.date} className="text-sm text-gray-500">
                  {formatDate(news.date)}
                </time>
                <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
                  {categoryName}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{news.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{news.description}</p>
              <div className="flex items-center justify-between pb-6 border-b">
                {news.author && (
                  <span className="text-sm text-gray-500">執筆: {news.author}</span>
                )}
                <ShareButtons
                  url={`https://example.com/news/${news.slug}`}
                  title={news.title}
                  description={news.description}
                />
              </div>
            </header>

            {/* サムネイル画像 */}
            {news.thumbnail && (
              <div className="mb-8">
                <Image
                  src={news.thumbnail}
                  alt={news.title}
                  width={800}
                  height={450}
                  className="w-full rounded-lg"
                  priority
                />
              </div>
            )}

            {/* 本文 */}
            <div 
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* タグ */}
            {news.tags && news.tags.length > 0 && (
              <div className="mb-12 pt-6 border-t">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-600">タグ:</span>
                  {news.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 関連記事 */}
            {relatedNews.length > 0 && (
              <section className="mt-20 pt-12 border-t">
                <h2 className="text-2xl font-bold mb-8">関連するニュース</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedNews.map((relatedItem) => (
                    <ArticleCard
                      key={relatedItem.slug}
                      title={relatedItem.title}
                      description={relatedItem.description}
                      date={relatedItem.date}
                      category={getCategories('news').find(c => c.id === relatedItem.category)?.name || relatedItem.category}
                      href={`/news/${relatedItem.slug}`}
                      image={relatedItem.thumbnail}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* ナビゲーション */}
            <nav className="mt-12 pt-6 border-t">
              <div className="flex justify-between">
                <Link
                  href="/news"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  ← ニュース一覧へ戻る
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </article>
    </>
  )
}