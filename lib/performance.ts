import type { PerformanceConfig } from '@/types/integrations'

export const defaultPerformanceConfig: PerformanceConfig = {
  preloadFonts: [
    '/fonts/inter-var.woff2',
    '/fonts/noto-sans-jp-v42-japanese-regular.woff2',
  ],
  prefetchRoutes: ['/company', '/works', '/contact'],
  lazyLoadImages: true,
  optimizeScripts: true,
}

export function generateResourceHints(config: PerformanceConfig = defaultPerformanceConfig) {
  const hints: Array<{ rel: string; href: string; as?: string; crossOrigin?: string }> = []

  // フォントのプリロード
  if (config.preloadFonts) {
    config.preloadFonts.forEach((font) => {
      hints.push({
        rel: 'preload',
        href: font,
        as: 'font',
        crossOrigin: 'anonymous',
      })
    })
  }

  // ルートのプリフェッチ
  if (config.prefetchRoutes) {
    config.prefetchRoutes.forEach((route) => {
      hints.push({
        rel: 'prefetch',
        href: route,
      })
    })
  }

  return hints
}

export function getImageProps(
  src: string,
  alt: string,
  options?: {
    lazy?: boolean
    priority?: boolean
    sizes?: string
    quality?: number
  }
) {
  const { lazy = true, priority = false, sizes, quality = 75 } = options || {}

  return {
    src,
    alt,
    loading: lazy && !priority ? ('lazy' as const) : ('eager' as const),
    priority,
    sizes: sizes || '100vw',
    quality,
    placeholder: 'blur' as const,
  }
}

export function generateImageSizes(breakpoints: Record<string, number>) {
  const sizes = Object.entries(breakpoints)
    .sort(([, a], [, b]) => b - a)
    .map(([breakpoint, width]) => `(min-width: ${breakpoint}) ${width}px`)
    .join(', ')

  return `${sizes}, 100vw`
}

export function optimizeImageUrl(
  src: string,
  options?: {
    width?: number
    height?: number
    quality?: number
    format?: 'auto' | 'webp' | 'avif'
  }
) {
  // Next.js の画像最適化APIを使用
  const params = new URLSearchParams()

  if (options?.width) params.append('w', options.width.toString())
  if (options?.height) params.append('h', options.height.toString())
  if (options?.quality) params.append('q', options.quality.toString())
  if (options?.format) params.append('fm', options.format)

  return `/_next/image?url=${encodeURIComponent(src)}&${params.toString()}`
}

export function generatePreconnectHints() {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
    { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
    { rel: 'dns-prefetch', href: 'https://maps.googleapis.com' },
  ]
}

export function measureWebVitals(metric: {
  name: string
  value: number
  label?: string
  id?: string
}) {
  // Web Vitalsの計測
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.value,
    })
  }
}

export const performanceObserver = {
  init() {
    if (typeof window === 'undefined') return

    // Largest Contentful Paint
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        measureWebVitals({
          name: 'LCP',
          value: lastEntry.startTime,
        })
      })
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })
    } catch (e) {
      console.warn('LCP observer not supported')
    }

    // First Input Delay
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          measureWebVitals({
            name: 'FID',
            value: entry.processingStart - entry.startTime,
          })
        })
      })
      fidObserver.observe({ type: 'first-input', buffered: true })
    } catch (e) {
      console.warn('FID observer not supported')
    }

    // Cumulative Layout Shift
    let clsValue = 0
    let clsEntries: PerformanceEntry[] = []

    try {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
            clsEntries.push(entry)
          }
        }
      })
      clsObserver.observe({ type: 'layout-shift', buffered: true })

      // CLSを送信
      addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden' && clsEntries.length > 0) {
          measureWebVitals({
            name: 'CLS',
            value: clsValue,
          })
        }
      })
    } catch (e) {
      console.warn('CLS observer not supported')
    }
  },
}