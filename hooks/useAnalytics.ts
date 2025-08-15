'use client'

import { useCallback } from 'react'
import type { AnalyticsEvent } from '@/types/integrations'

export function useAnalytics() {
  const sendEvent = useCallback((event: AnalyticsEvent) => {
    if (typeof window === 'undefined' || !window.gtag) {
      console.log('[Analytics]', event)
      return
    }

    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
    })
  }, [])

  const trackClick = useCallback(
    (label: string, category = 'engagement') => {
      sendEvent({
        action: 'click',
        category,
        label,
      })
    },
    [sendEvent]
  )

  const trackView = useCallback(
    (label: string, category = 'engagement') => {
      sendEvent({
        action: 'view',
        category,
        label,
      })
    },
    [sendEvent]
  )

  const trackFormSubmit = useCallback(
    (formName: string, success: boolean) => {
      sendEvent({
        action: success ? 'form_submit_success' : 'form_submit_error',
        category: 'form',
        label: formName,
      })
    },
    [sendEvent]
  )

  const trackDownload = useCallback(
    (fileName: string) => {
      sendEvent({
        action: 'download',
        category: 'engagement',
        label: fileName,
      })
    },
    [sendEvent]
  )

  const trackShare = useCallback(
    (method: string, contentType: string) => {
      sendEvent({
        action: 'share',
        category: 'social',
        label: `${method}_${contentType}`,
      })
    },
    [sendEvent]
  )

  const trackScroll = useCallback(
    (percentage: number) => {
      sendEvent({
        action: 'scroll',
        category: 'engagement',
        label: `${percentage}%`,
        value: percentage,
      })
    },
    [sendEvent]
  )

  const trackSearch = useCallback(
    (searchTerm: string, resultsCount?: number) => {
      sendEvent({
        action: 'search',
        category: 'engagement',
        label: searchTerm,
        value: resultsCount,
      })
    },
    [sendEvent]
  )

  const trackTiming = useCallback(
    (category: string, variable: string, value: number, label?: string) => {
      if (typeof window === 'undefined' || !window.gtag) {
        console.log('[Analytics Timing]', { category, variable, value, label })
        return
      }

      window.gtag('event', 'timing_complete', {
        name: variable,
        value: Math.round(value),
        event_category: category,
        event_label: label,
      })
    },
    []
  )

  const trackException = useCallback(
    (description: string, fatal = false) => {
      if (typeof window === 'undefined' || !window.gtag) {
        console.error('[Analytics Exception]', { description, fatal })
        return
      }

      window.gtag('event', 'exception', {
        description,
        fatal,
      })
    },
    []
  )

  return {
    sendEvent,
    trackClick,
    trackView,
    trackFormSubmit,
    trackDownload,
    trackShare,
    trackScroll,
    trackSearch,
    trackTiming,
    trackException,
  }
}