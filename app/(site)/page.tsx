import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ホーム',
  description: '確かな技術と信頼で、お客様の理想の住まいを実現します。新築・リフォーム・メンテナンスまでトータルサポート。',
}

export default function HomePage() {
  return (
    <>
      {/* ヒーローセクション */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-gray-50">
        <div className="relative z-20 container mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
            確かな技術と信頼で<br />
            理想の住まいを実現
          </h1>
          <p className="mb-8 text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto">
            新築からリフォーム、メンテナンスまで<br />
            住まいのことなら何でもお任せください
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="inline-block px-8 py-3 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition-colors"
            >
              無料相談はこちら
            </Link>
            <Link 
              href="/documents"
              className="inline-block px-8 py-3 border-2 border-primary-500 text-primary-600 font-medium rounded-md hover:bg-primary-50 transition-colors"
            >
              資料請求
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}