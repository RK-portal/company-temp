export interface MapMarker {
  position: {
    lat: number
    lng: number
  }
  title?: string
  description?: string
}

export interface GoogleMapProps {
  apiKey?: string
  center: {
    lat: number
    lng: number
  }
  zoom?: number
  height?: string
  markers?: MapMarker[]
  className?: string
}

export interface GoogleAnalyticsProps {
  measurementId: string
}

export interface TurnstileProps {
  siteKey: string
  onVerify: (token: string) => void
  theme?: 'light' | 'dark' | 'auto'
  className?: string
}

export interface FormSubmitData {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  turnstileToken?: string
}

export interface FormSubmitResponse {
  success: boolean
  message?: string
  error?: string
}

export interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
}

export interface SEOMetadata {
  title: string
  description: string
  openGraph?: {
    title?: string
    description?: string
    type?: string
    url?: string
    images?: Array<{
      url: string
      width?: number
      height?: number
      alt?: string
    }>
  }
  twitter?: {
    card?: 'summary' | 'summary_large_image'
    site?: string
    creator?: string
  }
  robots?: string
  canonical?: string
  alternates?: {
    canonical?: string
    languages?: Record<string, string>
  }
}

export interface StructuredDataOrganization {
  '@type': 'Organization' | 'LocalBusiness'
  name: string
  url: string
  logo?: string
  description?: string
  address?: {
    '@type': 'PostalAddress'
    streetAddress?: string
    addressLocality?: string
    addressRegion?: string
    postalCode?: string
    addressCountry?: string
  }
  contactPoint?: {
    '@type': 'ContactPoint'
    telephone?: string
    contactType?: string
    areaServed?: string | string[]
    availableLanguage?: string | string[]
  }
}

export interface StructuredDataLocalBusiness extends Omit<StructuredDataOrganization, '@type'> {
  '@type': 'LocalBusiness'
  priceRange?: string
  openingHoursSpecification?: Array<{
    '@type': 'OpeningHoursSpecification'
    dayOfWeek: string | string[]
    opens: string
    closes: string
  }>
  geo?: {
    '@type': 'GeoCoordinates'
    latitude: number
    longitude: number
  }
}

export interface StructuredDataArticle {
  '@type': 'Article'
  headline: string
  description?: string
  image?: string | string[]
  datePublished: string
  dateModified?: string
  author?: {
    '@type': 'Person' | 'Organization'
    name: string
  }
  publisher?: {
    '@type': 'Organization'
    name: string
    logo?: {
      '@type': 'ImageObject'
      url: string
    }
  }
}

export interface PerformanceConfig {
  preloadFonts?: string[]
  prefetchRoutes?: string[]
  lazyLoadImages?: boolean
  optimizeScripts?: boolean
}