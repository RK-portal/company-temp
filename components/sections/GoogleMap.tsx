'use client'

import { Wrapper } from '@googlemaps/react-wrapper'
import { useEffect, useRef } from 'react'

interface MapComponentProps {
  center: google.maps.LatLngLiteral
  zoom: number
  companyName: string
}

function MapComponent({ center, zoom, companyName }: MapComponentProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mapRef = useRef<google.maps.Map | null>(null)
  const markerRef = useRef<google.maps.Marker | null>(null)

  useEffect(() => {
    if (!ref.current) return

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
    })

    markerRef.current = new window.google.maps.Marker({
      position: center,
      map: mapRef.current,
      title: companyName,
    })

    const infoWindow = new window.google.maps.InfoWindow({
      content: `<div class="p-2"><h3 class="font-semibold">${companyName}</h3></div>`,
    })

    markerRef.current.addListener('click', () => {
      infoWindow.open(mapRef.current!, markerRef.current!)
    })

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null)
      }
    }
  }, [center, zoom, companyName])

  return <div ref={ref} className="h-full w-full" />
}

interface GoogleMapProps {
  apiKey?: string
  center: {
    lat: number
    lng: number
  }
  zoom?: number
  height?: string
  companyName: string
}

export default function GoogleMap({
  apiKey,
  center,
  zoom = 16,
  height = '400px',
  companyName,
}: GoogleMapProps) {
  if (!apiKey) {
    return (
      <div
        className="flex items-center justify-center bg-gray-100"
        style={{ height }}
      >
        <div className="text-center">
          <p className="mb-2 text-gray-600">Google Mapsを表示するにはAPIキーが必要です</p>
          <p className="text-sm text-gray-500">
            環境変数 NEXT_PUBLIC_GOOGLE_MAPS_API_KEY を設定してください
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg shadow-lg" style={{ height }}>
      <Wrapper apiKey={apiKey}>
        <MapComponent center={center} zoom={zoom} companyName={companyName} />
      </Wrapper>
    </div>
  )
}