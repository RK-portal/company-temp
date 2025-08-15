'use client'

import { Wrapper } from '@googlemaps/react-wrapper'
import { useEffect, useRef } from 'react'

import type { GoogleMapProps, MapMarker } from '@/types/integrations'

interface MapComponentProps {
  center: google.maps.LatLngLiteral
  zoom: number
  markers?: MapMarker[]
}

function MapComponent({ center, zoom, markers = [] }: MapComponentProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mapRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])

  useEffect(() => {
    if (!ref.current) return

    // 地図の初期化
    mapRef.current = new window.google.maps.Map(ref.current, {
      center,
      zoom,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true,
      styles: [
        {
          featureType: 'poi.business',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
      ],
    })

    // 既存のマーカーをクリア
    markersRef.current.forEach((marker) => marker.setMap(null))
    markersRef.current = []

    // 新しいマーカーを追加
    markers.forEach((markerData) => {
      const marker = new window.google.maps.Marker({
        position: markerData.position,
        map: mapRef.current,
        title: markerData.title,
        animation: window.google.maps.Animation.DROP,
      })

      if (markerData.description) {
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-3 max-w-xs">
              ${markerData.title ? `<h3 class="font-semibold mb-1">${markerData.title}</h3>` : ''}
              ${markerData.description ? `<p class="text-sm text-gray-600">${markerData.description}</p>` : ''}
            </div>
          `,
        })

        marker.addListener('click', () => {
          infoWindow.open(mapRef.current!, marker)
        })
      }

      markersRef.current.push(marker)
    })

    // デフォルトマーカー（マーカーが指定されていない場合）
    if (markers.length === 0) {
      const defaultMarker = new window.google.maps.Marker({
        position: center,
        map: mapRef.current,
        animation: window.google.maps.Animation.DROP,
      })
      markersRef.current.push(defaultMarker)
    }

    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null))
    }
  }, [center, zoom, markers])

  return <div ref={ref} className="h-full w-full" />
}

export default function GoogleMap({
  apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  center,
  zoom = 16,
  height = '400px',
  markers,
  className = '',
}: GoogleMapProps) {
  if (!apiKey) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 ${className}`}
        style={{ height }}
      >
        <div className="text-center p-8">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <p className="mb-2 text-gray-600">Google Mapsを表示するにはAPIキーが必要です</p>
          <p className="text-sm text-gray-500">
            環境変数 <code className="bg-gray-100 px-1 py-0.5 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> を設定してください
          </p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`overflow-hidden rounded-lg shadow-lg ${className}`} 
      style={{ height }}
      role="region"
      aria-label="Google Map"
    >
      <Wrapper apiKey={apiKey} libraries={['places']}>
        <MapComponent center={center} zoom={zoom} markers={markers} />
      </Wrapper>
    </div>
  )
}