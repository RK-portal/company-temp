'use client'

import { useInView } from 'react-intersection-observer'

import { type TimelineItem } from '@/types/pages'

interface TimelineProps {
  items: TimelineItem[]
  alternating?: boolean
}

function TimelineItemComponent({ item, index, alternating }: { item: TimelineItem; index: number; alternating: boolean }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })
  
  const isLeft = alternating ? index % 2 === 0 : true
  
  return (
    <div
      ref={ref}
      className={`relative flex items-center ${
        isLeft ? 'justify-start' : 'justify-end'
      }`}
    >
      <div
        className={`w-full md:w-5/12 ${
          inView ? 'animate-fade-in' : 'opacity-0'
        }`}
      >
        <div
          className={`rounded-lg bg-white p-6 shadow-lg ${
            isLeft ? 'md:mr-auto' : 'md:ml-auto'
          }`}
        >
          <div className="mb-2 text-sm font-semibold text-primary-600">
            {item.date}
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-900">
            {item.title}
          </h3>
          <p className="text-gray-600">{item.description}</p>
        </div>
      </div>
      
      {/* Timeline dot */}
      <div className="absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-primary-600 ring-4 ring-white" />
    </div>
  )
}

export default function Timeline({ items, alternating = true }: TimelineProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gray-300" />
          
          <div className="space-y-12">
            {items.map((item, index) => (
              <TimelineItemComponent
                key={item.id}
                item={item}
                index={index}
                alternating={alternating}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}