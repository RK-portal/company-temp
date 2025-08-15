'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { forwardRef } from 'react'

import { cn } from '@/lib/cn'

export interface CardProps {
  title?: string
  description?: string
  image?: string
  href?: string
  onClick?: () => void
  children?: React.ReactNode
  className?: string
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, description, image, href, onClick, children, className }, ref) => {
    const cardContent = (
      <>
        {image && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={image}
              alt={title || ''}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        {(title || description || children) && (
          <div className="p-6">
            {title && (
              <h3 className="text-xl font-bold text-neutral-900 mb-2">{title}</h3>
            )}
            {description && (
              <p className="text-neutral-600 mb-4">{description}</p>
            )}
            {children}
          </div>
        )}
      </>
    )

    const cardClasses = cn(
      'group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden',
      onClick && 'cursor-pointer',
      className
    )

    if (href) {
      const isExternal = href.startsWith('http')
      
      if (isExternal) {
        return (
          <a
            ref={ref as any}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cardClasses}
            onClick={onClick}
            data-testid="card"
          >
            {cardContent}
          </a>
        )
      }
      
      return (
        <Link href={href} passHref legacyBehavior>
          <a
            ref={ref as any}
            className={cardClasses}
            onClick={onClick}
            data-testid="card"
          >
            {cardContent}
          </a>
        </Link>
      )
    }

    return (
      <div
        ref={ref}
        className={cardClasses}
        onClick={onClick}
        data-testid="card"
      >
        {cardContent}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card