import { type Metadata } from 'next'

import { siteConfig } from '@/config/site'
import { type PageMetadata } from '@/types/pages'

export function generatePageMetadata(page: PageMetadata): Metadata {
  const title = `${page.title} | ${siteConfig.company.name}`
  const description = page.description
  const keywords = page.keywords?.join(', ') || ''
  const url = `${siteConfig.url}`
  const ogImage = page.ogImage || '/images/og-default.jpg'

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: siteConfig.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  }
}

export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.company.name,
    description: siteConfig.company.description,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}${siteConfig.logo.src}`,
      width: siteConfig.logo.width,
      height: siteConfig.logo.height,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.company.tel,
      contactType: 'customer service',
      availableLanguage: ['Japanese'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.company.address,
      addressCountry: 'JP',
    },
    sameAs: siteConfig.social.map((social) => social.href),
  }
}

export function generateLocalBusinessStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.company.name,
    description: siteConfig.company.description,
    url: siteConfig.url,
    telephone: siteConfig.company.tel,
    email: siteConfig.company.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.company.address,
      addressCountry: 'JP',
    },
    openingHours: siteConfig.company.businessHours,
    image: `${siteConfig.url}${siteConfig.logo.src}`,
  }
}

export function generateBreadcrumbStructuredData(items: Array<{ label: string; href: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${siteConfig.url}${item.href}`,
    })),
  }
}