import { CheckCircle, FileCheck, GraduationCap, Beaker } from 'lucide-react'
import { type Metadata } from 'next'

import FAQ from '@/components/sections/FAQ'
import FeatureGrid from '@/components/sections/FeatureGrid'
import PageHero from '@/components/sections/PageHero'
import faqData from '@/data/faq.json'
import { generatePageMetadata } from '@/lib/metadata'
import { type FeatureItem } from '@/types/pages'
import { qualityConfig } from '@/config/pages/quality.config'

export const metadata: Metadata = generatePageMetadata({
  title: qualityConfig.metadata.title,
  description: qualityConfig.metadata.description,
  keywords: qualityConfig.metadata.keywords,
})

// アイコンマッピング
const iconMap = {
  CheckCircle,
  FileCheck,
  GraduationCap,
  Beaker,
} as const

const qualityFeatures: FeatureItem[] = qualityConfig.features.map(feature => ({
  ...feature,
  icon: iconMap[feature.icon as keyof typeof iconMap],
}))

export default function QualityPage() {
  return (
    <>
      <PageHero
        title={qualityConfig.hero.title}
        subtitle={qualityConfig.hero.subtitle}
        image={qualityConfig.hero.backgroundImage}
        breadcrumb={qualityConfig.hero.breadcrumb}
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
              {qualityConfig.philosophy.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
              {qualityConfig.philosophy.content}
            </p>
          </div>
        </div>
      </section>

      <FeatureGrid items={qualityFeatures} columns={2} />

      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
              {qualityConfig.process.title}
            </h2>
            
            <div className="space-y-8">
              {qualityConfig.process.steps.map((step) => (
                <div key={step.number} className="group flex items-start space-x-4 p-4 -mx-4 rounded-lg transition-all duration-500 ease-out hover:bg-gray-50 hover:shadow-lg hover:translate-x-2">
                  <div className="relative flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white font-bold text-lg transition-all duration-500 ease-out group-hover:scale-110 group-hover:bg-primary-700 group-hover:shadow-xl group-hover:shadow-primary-200/50">
                      {step.number}
                    </div>
                    {/* パルスアニメーション */}
                    <div className="absolute inset-0 rounded-full bg-primary-400/30 animate-ping opacity-0 group-hover:opacity-100" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-semibold text-gray-900 transition-all duration-500 ease-out group-hover:text-primary-700 group-hover:translate-x-1">{step.title}</h3>
                    <p className="text-gray-600 whitespace-pre-line transition-all duration-500 ease-out group-hover:text-gray-800 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
            {qualityConfig.faq.title}
          </h2>
          <FAQ items={faqData.quality} />
        </div>
      </section>
    </>
  )
}