import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import Script from 'next/script'

import { siteConfig } from '@/config/site'
import { BreadcrumbProps } from '@/types/navigation'

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  // Generate structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${siteConfig.url}${item.href}` : undefined,
    })),
  }

  return (
    <>
      {/* Structured Data */}
      <Script
        id="breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Breadcrumb Navigation */}
      <nav className={`flex ${className}`} aria-label="パンくずリスト">
        <ol role="list" className="flex items-center space-x-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRightIcon
                  className="flex-shrink-0 h-4 w-4 text-gray-400 mx-2"
                  aria-hidden="true"
                />
              )}
              {item.current ? (
                <span className="text-sm text-gray-500" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href || '#'}
                  className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  {index === 0 ? (
                    <span className="flex items-center">
                      <HomeIcon className="flex-shrink-0 h-4 w-4 mr-1" aria-hidden="true" />
                      <span className="sr-only">{item.label}</span>
                    </span>
                  ) : (
                    item.label
                  )}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
