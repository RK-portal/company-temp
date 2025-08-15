'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { ScrollDirection, UseScrollDirectionOptions } from '@/types/navigation'

export function useScrollDirection(options: UseScrollDirectionOptions = {}): ScrollDirection {
  const { threshold = 5, throttleDelay = 100 } = options
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null)
  const [lastScrollY, setLastScrollY] = useState(0)
  const lastUpdateTime = useRef(Date.now())

  const updateScrollDirection = useCallback(() => {
    const scrollY = window.scrollY

    if (Math.abs(scrollY - lastScrollY) < threshold) {
      return
    }

    const currentTime = Date.now()
    if (currentTime - lastUpdateTime.current < throttleDelay) {
      return
    }

    if (scrollY > lastScrollY) {
      setScrollDirection('down')
    } else {
      setScrollDirection('up')
    }

    setLastScrollY(scrollY)
    lastUpdateTime.current = currentTime
  }, [lastScrollY, threshold, throttleDelay])

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollDirection()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [updateScrollDirection])

  return scrollDirection
}
