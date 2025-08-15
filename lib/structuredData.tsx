import React from 'react'

import { siteConfig } from '@/config/site'

import type {
  StructuredDataOrganization,
  StructuredDataLocalBusiness,
  StructuredDataArticle,
} from '@/types/integrations'

export function generateOrganizationSchema(): StructuredDataOrganization {
  return {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.svg`,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1-2-3 住所町',
      addressLocality: '市区町村',
      addressRegion: '東京都',
      postalCode: '123-4567',
      addressCountry: 'JP',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+81-3-1234-5678',
      contactType: 'customer service',
      areaServed: 'JP',
      availableLanguage: 'Japanese',
    },
  }
}

export function generateLocalBusinessSchema(): StructuredDataLocalBusiness {
  const organizationData = generateOrganizationSchema()
  
  return {
    ...organizationData,
    '@type': 'LocalBusiness',
    priceRange: '¥¥¥',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '17:00',
      },
    ],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 35.6762,
      longitude: 139.6503,
    },
  }
}

export function generateArticleSchema(
  title: string,
  description: string,
  publishedDate: string,
  modifiedDate?: string,
  author?: string,
  imagePath?: string
): StructuredDataArticle {
  return {
    '@type': 'Article',
    headline: title,
    description: description,
    image: imagePath ? `${siteConfig.url}${imagePath}` : `${siteConfig.url}/images/og-image.jpg`,
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,
    author: {
      '@type': 'Organization',
      name: author || siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo.svg`,
      },
    },
  }
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  }
}

export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateProductSchema(
  name: string,
  description: string,
  image: string,
  price?: {
    currency: string
    value: number
  }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: `${siteConfig.url}${image}`,
    brand: {
      '@type': 'Brand',
      name: siteConfig.name,
    },
    offers: price
      ? {
          '@type': 'Offer',
          price: price.value,
          priceCurrency: price.currency,
          availability: 'https://schema.org/InStock',
        }
      : undefined,
  }
}

export function generateJsonLd(data: any): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    ...data,
  })
}

export function JsonLd({ data }: { data: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: generateJsonLd(data),
      }}
    />
  )
}