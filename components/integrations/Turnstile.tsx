'use client'

import Script from 'next/script'
import { useEffect, useRef, useCallback } from 'react'

import type { TurnstileProps } from '@/types/integrations'

declare global {
  interface Window {
    turnstile: {
      render: (
        element: string | HTMLElement,
        options: {
          sitekey: string
          callback?: (token: string) => void
          'error-callback'?: () => void
          'expired-callback'?: () => void
          theme?: 'light' | 'dark' | 'auto'
          size?: 'normal' | 'compact'
        }
      ) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

export default function Turnstile({
  siteKey,
  onVerify,
  theme = 'auto',
  className = '',
}: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  const handleVerify = useCallback(
    (token: string) => {
      onVerify(token)
    },
    [onVerify]
  )

  const handleError = useCallback(() => {
    console.error('Turnstile verification error')
  }, [])

  const handleExpired = useCallback(() => {
    console.warn('Turnstile token expired')
  }, [])

  useEffect(() => {
    if (!window.turnstile || !containerRef.current || !siteKey) return

    // ウィジェットをレンダリング
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: handleVerify,
      'error-callback': handleError,
      'expired-callback': handleExpired,
      theme,
    })

    return () => {
      // クリーンアップ
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch (error) {
          console.error('Error removing Turnstile widget:', error)
        }
      }
    }
  }, [siteKey, theme, handleVerify, handleError, handleExpired])

  if (!siteKey) {
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className={`p-4 border-2 border-dashed border-gray-300 rounded-lg text-center ${className}`}>
          <p className="text-sm text-gray-500">
            Turnstile Bot対策（開発環境）
          </p>
          <p className="text-xs text-gray-400 mt-1">
            本番環境では実際のウィジェットが表示されます
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
      />
      <div
        ref={containerRef}
        className={`cf-turnstile ${className}`}
        data-testid="turnstile-widget"
      />
    </>
  )
}

export function useTurnstile() {
  const resetTurnstile = useCallback((widgetId: string) => {
    if (window.turnstile && widgetId) {
      window.turnstile.reset(widgetId)
    }
  }, [])

  return { resetTurnstile }
}