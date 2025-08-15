'use client'

import Breadcrumb from '@/components/layout/Breadcrumb'
import { type PageHeroProps } from '@/types/pages'

export default function PageHero({ title, subtitle, image, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative h-[400px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
      </div>
      
      <div className="relative z-10 flex h-full flex-col justify-center">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumb} className="mb-6 text-white/80" />
          
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
          
          {subtitle && (
            <p className="mt-4 text-lg text-white/90 md:text-xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}