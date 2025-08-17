import { ShieldCheck, Clock, FileText, Users } from 'lucide-react'
import { type Metadata } from 'next'

import FAQ from '@/components/sections/FAQ'
import FeatureGrid from '@/components/sections/FeatureGrid'
import PageHero from '@/components/sections/PageHero'
import faqData from '@/data/faq.json'
import { generatePageMetadata } from '@/lib/metadata'
import { type FeatureItem } from '@/types/pages'
import { warrantyConfig } from '@/config/pages/warranty.config'

export const metadata: Metadata = generatePageMetadata({
  title: warrantyConfig.metadata.title,
  description: warrantyConfig.metadata.description,
  keywords: warrantyConfig.metadata.keywords,
})

// アイコンマッピング
const iconMap = {
  ShieldCheck,
  Clock,
  FileText,
  Users,
} as const

const warrantyFeatures: FeatureItem[] = warrantyConfig.features.map(feature => ({
  ...feature,
  icon: iconMap[feature.icon as keyof typeof iconMap],
}))

export default function WarrantyPage() {
  return (
    <>
      <PageHero
        title={warrantyConfig.hero.title}
        subtitle={warrantyConfig.hero.subtitle}
        image={warrantyConfig.hero.backgroundImage}
        breadcrumb={warrantyConfig.hero.breadcrumb}
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
              {warrantyConfig.introduction.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
              {warrantyConfig.introduction.content}
            </p>
          </div>
        </div>
      </section>

      <FeatureGrid items={warrantyFeatures} columns={2} />

      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
              {warrantyConfig.warrantyDetails.title}
            </h2>
            
            <div className="overflow-hidden rounded-lg bg-white shadow-lg">
              <table className="w-full">
                <thead className="bg-primary-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">保証対象</th>
                    <th className="px-6 py-4 text-center">保証期間</th>
                    <th className="px-6 py-4 text-left">保証内容</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {warrantyConfig.warrantyDetails.items.map((item, index) => (
                    <tr key={index} className={`group transition-all duration-500 ease-out hover:bg-primary-50/50 hover:shadow-inner cursor-pointer ${index % 2 === 1 ? 'bg-gray-50' : ''}`}>
                      <td className="px-6 py-4 font-medium text-gray-900 transition-all duration-500 ease-out group-hover:text-primary-700 group-hover:translate-x-1">{item.target}</td>
                      <td className="px-6 py-4 text-center text-primary-600 font-bold transition-all duration-500 ease-out group-hover:scale-125 group-hover:text-primary-700">{item.period}</td>
                      <td className="px-6 py-4 text-gray-600 transition-all duration-500 ease-out group-hover:text-gray-800">
                        {item.content}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 rounded-lg bg-primary-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                {warrantyConfig.warrantyDetails.extendedWarranty.title}
              </h3>
              <p className="text-gray-600 whitespace-pre-line">
                {warrantyConfig.warrantyDetails.extendedWarranty.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
              {warrantyConfig.inspectionSchedule.title}
            </h2>
            
            <div className="relative">
              <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-300 md:left-1/2 md:-translate-x-1/2" />
              
              <div className="space-y-8">
                {warrantyConfig.inspectionSchedule.timeline.map((item, index) => (
                  <div key={index} className="relative group">
                    <div className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      <div className="w-full md:w-5/12">
                        <div className="rounded-lg bg-white p-6 shadow-md transition-all duration-700 ease-out hover:shadow-2xl hover:scale-105 hover:-translate-y-2 cursor-pointer">
                          <div className="mb-2 text-lg font-semibold text-primary-600 transition-all duration-500 ease-out group-hover:text-primary-700 group-hover:text-xl">
                            {item.period}点検
                          </div>
                          <p className="text-gray-600 transition-all duration-500 ease-out group-hover:text-gray-800">{item.content}</p>
                          {/* ホバー時のグロー効果 */}
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary-100/0 to-primary-200/0 transition-all duration-700 ease-out group-hover:from-primary-100/20 group-hover:to-primary-200/10" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute left-8 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-600 ring-4 ring-white transition-all duration-500 ease-out group-hover:scale-150 group-hover:bg-primary-700 group-hover:ring-8 md:left-1/2 z-10" />
                    {/* パルスエフェクト */}
                    <div className="absolute left-8 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-400 opacity-0 transition-all duration-1000 ease-out group-hover:opacity-100 group-hover:scale-[4] md:left-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
            {warrantyConfig.faq.title}
          </h2>
          <FAQ items={faqData.warranty} />
        </div>
      </section>
    </>
  )
}