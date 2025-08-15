'use client'

import Image from 'next/image'
import Link from 'next/link'

import { formatDate } from '@/lib/markdown'

interface ArticleCardProps {
  title: string
  description: string
  date: string
  category?: string
  href: string
  image?: string
}

export default function ArticleCard({
  title,
  description,
  date,
  category,
  href,
  image,
}: ArticleCardProps) {
  return (
    <article className="group relative flex flex-col h-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <Link href={href} className="flex flex-col h-full">
        {image && (
          <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          </div>
        )}
        <div className="flex-1 p-6">
          <div className="flex items-center gap-3 mb-3 text-sm">
            <time dateTime={date} className="text-gray-500">
              {formatDate(date)}
            </time>
            {category && (
              <>
                <span className="text-gray-300">•</span>
                <span className="text-primary-600 font-medium">{category}</span>
              </>
            )}
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
        </div>
      </Link>
    </article>
  )
}