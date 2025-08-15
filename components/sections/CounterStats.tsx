'use client'

import { useEffect, useState, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

import { type StatItem } from '@/types/pages'

interface CounterStatsProps {
  stats: StatItem[]
  duration?: number
}

interface CounterProps {
  value: number
  suffix?: string
  label: string
  duration: number
}

function Counter({ value, suffix = '', label, duration }: CounterProps) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })
  const hasStarted = useRef(false)

  useEffect(() => {
    if (inView && !hasStarted.current) {
      hasStarted.current = true
      const startTime = Date.now()
      const endValue = value

      const updateCount = () => {
        const now = Date.now()
        const progress = Math.min((now - startTime) / duration, 1)
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentCount = Math.floor(easeOutQuart * endValue)
        
        setCount(currentCount)

        if (progress < 1) {
          requestAnimationFrame(updateCount)
        } else {
          setCount(endValue)
        }
      }

      requestAnimationFrame(updateCount)
    }
  }, [inView, value, duration])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-primary-600 md:text-5xl lg:text-6xl">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-lg text-gray-600">{label}</div>
    </div>
  )
}

export default function CounterStats({ stats, duration = 2000 }: CounterStatsProps) {
  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <Counter
              key={stat.id}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              duration={duration}
            />
          ))}
        </div>
      </div>
    </section>
  )
}