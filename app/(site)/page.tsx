import { Metadata } from 'next'
import Link from 'next/link'
import { homeConfig } from '@/config'

export const metadata: Metadata = {
  title: homeConfig.metadata.title,
  description: homeConfig.metadata.description,
}

export default function HomePage() {
  return (
    <>
      {/* ヒーローセクション */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-gray-50">
        <div className="relative z-20 container mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
            {homeConfig.hero.title.line1}<br />
            {homeConfig.hero.title.line2}
          </h1>
          <p className="mb-8 text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto">
            {homeConfig.hero.subtitle.line1}<br />
            {homeConfig.hero.subtitle.line2}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={homeConfig.hero.cta.primary.href}
              className="inline-block px-8 py-3 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition-colors"
            >
              {homeConfig.hero.cta.primary.text}
            </Link>
            <Link 
              href={homeConfig.hero.cta.secondary.href}
              className="inline-block px-8 py-3 border-2 border-primary-500 text-primary-600 font-medium rounded-md hover:bg-primary-50 transition-colors"
            >
              {homeConfig.hero.cta.secondary.text}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}