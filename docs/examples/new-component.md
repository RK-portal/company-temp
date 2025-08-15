# 新規コンポーネント作成の実装例

このドキュメントでは、新しいコンポーネントを作成する具体的な実装例を紹介します。

## 基本的なUIコンポーネント

### Alertコンポーネント

`components/ui/Alert.tsx`:

```tsx
import { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  XCircleIcon,
  InformationCircleIcon 
} from '@heroicons/react/24/outline'

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:pl-7',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-900/10 dark:text-blue-100',
        success: 'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-900/10 dark:text-green-100',
        warning: 'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-900/10 dark:text-yellow-100',
        error: 'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-900/10 dark:text-red-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface AlertProps extends VariantProps<typeof alertVariants> {
  title?: string
  children: ReactNode
  className?: string
}

const iconMap = {
  default: InformationCircleIcon,
  info: InformationCircleIcon,
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  error: XCircleIcon,
}

export function Alert({ title, children, variant = 'default', className }: AlertProps) {
  const Icon = iconMap[variant || 'default']

  return (
    <div className={cn(alertVariants({ variant }), className)}>
      <Icon className="h-5 w-5" />
      <div>
        {title && <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>}
        <div className="text-sm [&_p]:leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

// 使用例
export function AlertExample() {
  return (
    <div className="space-y-4">
      <Alert variant="info" title="お知らせ">
        新しい機能が追加されました。詳細はドキュメントをご覧ください。
      </Alert>
      
      <Alert variant="success" title="成功">
        データが正常に保存されました。
      </Alert>
      
      <Alert variant="warning" title="注意">
        この操作は取り消すことができません。
      </Alert>
      
      <Alert variant="error" title="エラー">
        ファイルのアップロードに失敗しました。もう一度お試しください。
      </Alert>
    </div>
  )
}
```

### ProgressBarコンポーネント

`components/ui/ProgressBar.tsx`:

```tsx
import { cn } from '@/lib/cn'

interface ProgressBarProps {
  value: number // 0-100
  label?: string
  showPercentage?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'success' | 'warning' | 'error'
  className?: string
  animated?: boolean
}

const sizeClasses = {
  sm: 'h-2',
  md: 'h-4',
  lg: 'h-6',
}

const colorClasses = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
}

export function ProgressBar({
  value,
  label,
  showPercentage = false,
  size = 'md',
  color = 'primary',
  className,
  animated = false,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div className={cn('w-full', className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between mb-2">
          {label && <span className="text-sm font-medium">{label}</span>}
          {showPercentage && (
            <span className="text-sm text-text-secondary">{clampedValue}%</span>
          )}
        </div>
      )}
      <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            colorClasses[color],
            animated && 'animate-pulse'
          )}
          style={{ width: `${clampedValue}%` }}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}

// 使用例
export function ProgressBarExample() {
  return (
    <div className="space-y-6">
      <ProgressBar value={75} label="プロジェクト進捗" showPercentage />
      
      <ProgressBar value={50} size="sm" color="success" />
      
      <ProgressBar 
        value={90} 
        label="ディスク使用量" 
        color="warning"
        showPercentage
        animated
      />
      
      <div className="space-y-2">
        <h3 className="font-medium">スキル</h3>
        <ProgressBar value={95} label="設計" size="sm" />
        <ProgressBar value={85} label="施工管理" size="sm" />
        <ProgressBar value={80} label="コスト管理" size="sm" />
      </div>
    </div>
  )
}
```

## 複雑なセクションコンポーネント

### TestimonialsCarousel

`components/sections/TestimonialsCarousel.tsx`:

```tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/cn'

interface Testimonial {
  id: string
  name: string
  role?: string
  company?: string
  content: string
  rating: number
  image?: string
}

interface TestimonialsCarouselProps {
  items: Testimonial[]
  autoPlay?: boolean
  interval?: number
  className?: string
}

export function TestimonialsCarousel({
  items,
  autoPlay = true,
  interval = 5000,
  className,
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)

  useEffect(() => {
    if (!isAutoPlaying || items.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, interval)

    return () => clearInterval(timer)
  }, [isAutoPlaying, items.length, interval])

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  if (items.length === 0) return null

  const currentItem = items[currentIndex]

  return (
    <div className={cn('relative', className)}>
      <div className="overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="p-8 md:p-12">
          {/* 評価の星 */}
          <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={cn(
                  'w-5 h-5',
                  i < currentItem.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                )}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* コンテンツ */}
          <blockquote className="text-lg md:text-xl leading-relaxed mb-6">
            "{currentItem.content}"
          </blockquote>

          {/* 発言者情報 */}
          <div className="flex items-center gap-4">
            {currentItem.image && (
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={currentItem.image}
                  alt={currentItem.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <cite className="not-italic font-semibold">{currentItem.name}</cite>
              {(currentItem.role || currentItem.company) && (
                <p className="text-sm text-text-secondary">
                  {currentItem.role}
                  {currentItem.role && currentItem.company && ' / '}
                  {currentItem.company}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ナビゲーション */}
      {items.length > 1 && (
        <>
          {/* 矢印ボタン */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
            aria-label="前の声"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
            aria-label="次の声"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>

          {/* ドットインジケーター */}
          <div className="flex justify-center gap-2 mt-6">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  index === currentIndex
                    ? 'w-8 bg-primary'
                    : 'bg-gray-300 hover:bg-gray-400'
                )}
                aria-label={`${index + 1}番目の声を表示`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// 使用例
export function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: '山田太郎',
      role: '会社員',
      content: '理想通りの家を建てていただきました。細かい要望にも丁寧に対応していただき、家族全員大満足です。',
      rating: 5,
      image: '/images/testimonials/yamada.jpg',
    },
    {
      id: '2',
      name: '佐藤花子',
      role: '主婦',
      content: 'リフォームをお願いしましたが、期待以上の仕上がりでした。職人さんの技術力の高さに感動しました。',
      rating: 5,
      image: '/images/testimonials/sato.jpg',
    },
    {
      id: '3',
      name: '鈴木一郎',
      role: '自営業',
      content: '予算内で最高の提案をしていただきました。アフターサービスも充実していて安心です。',
      rating: 5,
      image: '/images/testimonials/suzuki.jpg',
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-background-secondary">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          お客様の声
        </h2>
        <TestimonialsCarousel items={testimonials} />
      </div>
    </section>
  )
}
```

### BeforeAfterSlider

`components/sections/BeforeAfterSlider.tsx`:

```tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/cn'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.min(100, Math.max(0, percentage)))
  }

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    handleMove(e.touches[0].clientX)
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false)
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      handleMove(e.clientX)
    }

    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp)
      document.addEventListener('mousemove', handleGlobalMouseMove)
    }

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp)
      document.removeEventListener('mousemove', handleGlobalMouseMove)
    }
  }, [isDragging])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden rounded-lg cursor-col-resize select-none',
        className
      )}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* After画像（背景） */}
      <div className="relative w-full h-full">
        <Image
          src={afterImage}
          alt={afterLabel}
          fill
          className="object-cover"
          priority
        />
        <span className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm font-medium">
          {afterLabel}
        </span>
      </div>

      {/* Before画像（前景） */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="relative w-full h-full">
          <Image
            src={beforeImage}
            alt={beforeLabel}
            fill
            className="object-cover"
            style={{ maxWidth: 'none', width: `${(100 / sliderPosition) * 100}%` }}
            priority
          />
          <span className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm font-medium">
            {beforeLabel}
          </span>
        </div>
      </div>

      {/* スライダーハンドル */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
        style={{ left: `${sliderPosition}%` }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-col-resize"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>
    </div>
  )
}

// 使用例
export function BeforeAfterSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          リフォーム事例
        </h2>
        <p className="text-lg text-text-secondary text-center mb-12">
          ドラッグして変化をご覧ください
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">キッチンリフォーム</h3>
            <BeforeAfterSlider
              beforeImage="/images/renovation/kitchen-before.jpg"
              afterImage="/images/renovation/kitchen-after.jpg"
              beforeLabel="リフォーム前"
              afterLabel="リフォーム後"
              className="aspect-[4/3]"
            />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">浴室リフォーム</h3>
            <BeforeAfterSlider
              beforeImage="/images/renovation/bathroom-before.jpg"
              afterImage="/images/renovation/bathroom-after.jpg"
              beforeLabel="リフォーム前"
              afterLabel="リフォーム後"
              className="aspect-[4/3]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
```

## ユーティリティコンポーネント

### ScrollToTop

`components/ui/ScrollToTop.tsx`:

```tsx
'use client'

import { useState, useEffect } from 'react'
import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/cn'

interface ScrollToTopProps {
  threshold?: number
  className?: string
}

export function ScrollToTop({ threshold = 400, className }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // 初期状態をチェック

    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-8 right-8 z-50',
        'bg-primary text-white rounded-full p-3',
        'shadow-lg hover:shadow-xl',
        'transition-all duration-300',
        'hover:scale-110',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        className
      )}
      aria-label="ページトップへ戻る"
    >
      <ChevronUpIcon className="w-6 h-6" />
    </button>
  )
}
```

### LazyLoad

`components/ui/LazyLoad.tsx`:

```tsx
'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface LazyLoadProps {
  children: ReactNode
  threshold?: number
  rootMargin?: string
  placeholder?: ReactNode
  className?: string
  onVisible?: () => void
}

export function LazyLoad({
  children,
  threshold = 0.1,
  rootMargin = '50px',
  placeholder = <div className="h-full w-full bg-gray-200 animate-pulse" />,
  className,
  onVisible,
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          onVisible?.()
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin, onVisible])

  return (
    <div ref={elementRef} className={cn('relative', className)}>
      {isVisible ? children : placeholder}
    </div>
  )
}

// 使用例
export function LazyLoadExample() {
  return (
    <div className="space-y-8">
      <LazyLoad
        onVisible={() => console.log('Component is now visible!')}
        placeholder={
          <div className="h-64 bg-gray-200 animate-pulse rounded-lg" />
        }
      >
        <div className="h-64 bg-primary rounded-lg flex items-center justify-center text-white text-2xl">
          遅延読み込みされたコンテンツ
        </div>
      </LazyLoad>

      <LazyLoad threshold={0.5} rootMargin="100px">
        <Image
          src="/images/large-image.jpg"
          alt="大きな画像"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </LazyLoad>
    </div>
  )
}
```

---

これらの例を参考に、プロジェクトに必要な新しいコンポーネントを作成してください。