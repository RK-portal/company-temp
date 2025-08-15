import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import ArticleCard from '@/components/sections/ArticleCard'
import PageHero from '@/components/sections/PageHero'
import ShareButtons from '@/components/ui/ShareButtons'
import { getContentBySlug, getAllContent, getRelatedContent, getCategories } from '@/lib/content'
import { markdownToHtml, formatDate } from '@/lib/markdown'
import { Topic } from '@/types/content'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const topics = getAllContent<Topic>('topics')
  return topics.map((topic) => ({
    slug: topic.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const topic = getContentBySlug<Topic>('topics', params.slug)
  
  if (!topic) {
    return {
      title: 'トピックスが見つかりません',
    }
  }

  return {
    title: `${topic.title} | トピックス | 株式会社サンプル工務店`,
    description: topic.description,
    openGraph: {
      title: topic.title,
      description: topic.description,
      images: topic.thumbnail ? [topic.thumbnail] : undefined,
      type: 'article',
      publishedTime: topic.date,
    },
  }
}

export default async function TopicDetailPage({ params }: PageProps) {
  const topic = getContentBySlug<Topic>('topics', params.slug)
  
  if (!topic) {
    notFound()
  }

  const htmlContent = await markdownToHtml(topic.content)
  const relatedTopics = getRelatedContent<Topic>('topics', topic.slug, 3)
  const categoryName = getCategories('topics').find(c => c.id === topic.category)?.name || topic.category

  const breadcrumb = [
    { id: 'home', label: 'ホーム', href: '/' },
    { id: 'topics', label: 'トピックス', href: '/topics' },
    { id: topic.slug, label: topic.title, href: `/topics/${topic.slug}` },
  ]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: topic.title,
    description: topic.description,
    datePublished: topic.date,
    dateModified: topic.date,
    image: topic.thumbnail,
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
        title="トピックス"
        subtitle="Topics"
        image="/images/topics/hero-bg.jpg"
        breadcrumb={breadcrumb}
      />

      <article className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* 記事ヘッダー */}
            <header className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <time dateTime={topic.date} className="text-sm text-gray-500">
                  {formatDate(topic.date)}
                </time>
                <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
                  {categoryName}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{topic.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{topic.description}</p>
              <div className="flex items-center justify-between pb-6 border-b">
                {topic.author && (
                  <span className="text-sm text-gray-500">執筆: {topic.author}</span>
                )}
                <ShareButtons
                  url={`https://example.com/topics/${topic.slug}`}
                  title={topic.title}
                  description={topic.description}
                />
              </div>
            </header>

            {/* サムネイル画像 */}
            {topic.thumbnail && (
              <div className="mb-8">
                <Image
                  src={topic.thumbnail}
                  alt={topic.title}
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
            {topic.tags && topic.tags.length > 0 && (
              <div className="mb-12 pt-6 border-t">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-600">タグ:</span>
                  {topic.tags.map((tag) => (
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

            {/* CTA */}
            <div className="bg-primary-50 p-8 rounded-lg mb-12">
              <h3 className="text-xl font-bold mb-4">専門家に相談する</h3>
              <p className="text-gray-700 mb-6">
                この記事の内容について、より詳しくお知りになりたい方は、
                お気軽にお問い合わせください。専門スタッフが丁寧にご説明いたします。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-2 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors"
                >
                  お問い合わせ
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-2 border border-primary-600 text-primary-600 font-medium rounded-md hover:bg-primary-50 transition-colors"
                >
                  資料請求
                </Link>
              </div>
            </div>

            {/* 関連記事 */}
            {relatedTopics.length > 0 && (
              <section className="mt-20 pt-12 border-t">
                <h2 className="text-2xl font-bold mb-8">関連するトピックス</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedTopics.map((relatedTopic) => (
                    <ArticleCard
                      key={relatedTopic.slug}
                      title={relatedTopic.title}
                      description={relatedTopic.description}
                      date={relatedTopic.date}
                      category={getCategories('topics').find(c => c.id === relatedTopic.category)?.name || relatedTopic.category}
                      href={`/topics/${relatedTopic.slug}`}
                      image={relatedTopic.thumbnail}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* ナビゲーション */}
            <nav className="mt-12 pt-6 border-t">
              <div className="flex justify-between">
                <Link
                  href="/topics"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  ← トピックス一覧へ戻る
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </article>
    </>
  )
}