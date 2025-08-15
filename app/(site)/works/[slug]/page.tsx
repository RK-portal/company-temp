import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import MediaGallery from '@/components/sections/MediaGallery'
import PageHero from '@/components/sections/PageHero'
import WorksCard from '@/components/sections/WorksCard'
import ShareButtons from '@/components/ui/ShareButtons'
import { getContentBySlug, getAllContent, getRelatedContent, getCategories } from '@/lib/content'
import { markdownToHtml, formatDate } from '@/lib/markdown'
import { Work } from '@/types/content'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const works = getAllContent<Work>('works')
  return works.map((work) => ({
    slug: work.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const work = getContentBySlug<Work>('works', params.slug)
  
  if (!work) {
    return {
      title: '施工事例が見つかりません',
    }
  }

  return {
    title: `${work.title} | 施工事例 | 株式会社サンプル工務店`,
    description: work.description,
    openGraph: {
      title: work.title,
      description: work.description,
      images: work.thumbnail ? [work.thumbnail] : undefined,
    },
  }
}

export default async function WorkDetailPage({ params }: PageProps) {
  const work = getContentBySlug<Work>('works', params.slug)
  
  if (!work) {
    notFound()
  }

  const htmlContent = await markdownToHtml(work.content)
  const relatedWorks = getRelatedContent<Work>('works', work.slug, 3)
  const categoryName = getCategories('works').find(c => c.id === work.category)?.name || work.category

  const breadcrumb = [
    { id: 'home', label: 'ホーム', href: '/' },
    { id: 'works', label: '施工事例', href: '/works' },
    { id: work.slug, label: work.title, href: `/works/${work.slug}` },
  ]

  const galleryImages = work.images?.map((src, index) => ({
    src,
    alt: `${work.title} - 画像${index + 1}`,
    caption: `${work.title} - ${index + 1}`,
  })) || []

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: work.title,
    description: work.description,
    datePublished: work.date,
    image: work.thumbnail,
    author: {
      '@type': 'Organization',
      name: '株式会社サンプル工務店',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <PageHero
        title={work.title}
        subtitle={categoryName}
        image={work.thumbnail || '/images/works/hero-bg.jpg'}
        breadcrumb={breadcrumb}
      />

      <article className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* メタ情報 */}
            <div className="mb-8 pb-8 border-b">
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">カテゴリー:</span>
                  <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full">
                    {categoryName}
                  </span>
                </div>
                {work.area && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">延床面積:</span>
                    <span>{work.area}</span>
                  </div>
                )}
                {work.structure && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">構造:</span>
                    <span>{work.structure}</span>
                  </div>
                )}
                {work.completionDate && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">竣工:</span>
                    <span>{work.completionDate}</span>
                  </div>
                )}
              </div>
              <p className="text-lg text-gray-700 mb-4">{work.description}</p>
              <div className="flex items-center justify-between">
                <time dateTime={work.date} className="text-sm text-gray-500">
                  掲載日: {formatDate(work.date)}
                </time>
                <ShareButtons
                  url={`https://example.com/works/${work.slug}`}
                  title={work.title}
                  description={work.description}
                />
              </div>
            </div>

            {/* 画像ギャラリー */}
            {galleryImages.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">写真ギャラリー</h2>
                <MediaGallery images={galleryImages} layout="grid" columns={3} />
              </div>
            )}

            {/* 本文 */}
            <div 
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* 関連施工事例 */}
            {relatedWorks.length > 0 && (
              <section className="mt-20 pt-12 border-t">
                <h2 className="text-2xl font-bold mb-8">関連する施工事例</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedWorks.map((relatedWork) => (
                    <WorksCard
                      key={relatedWork.slug}
                      title={relatedWork.title}
                      description={relatedWork.description}
                      category={getCategories('works').find(c => c.id === relatedWork.category)?.name || relatedWork.category}
                      area={relatedWork.area}
                      href={`/works/${relatedWork.slug}`}
                      thumbnail={relatedWork.thumbnail || '/images/placeholder.svg'}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </article>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">お気軽にご相談ください</h2>
            <p className="text-gray-600 mb-8">
              施工事例についてのご質問や、同様の施工をご希望の方は、
              お気軽にお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors"
              >
                お問い合わせ
              </Link>
              <Link
                href="/works"
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
              >
                他の事例を見る
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}