'use client'

import Image from 'next/image'
import Link from 'next/link'

interface WorksCardProps {
  title: string
  description: string
  category: string
  area?: string
  href: string
  thumbnail: string
}

export default function WorksCard({
  title,
  description,
  category,
  area,
  href,
  thumbnail,
}: WorksCardProps) {
  return (
    <article className="group relative">
      <Link href={href} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center gap-3 mb-2 text-sm">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                {category}
              </span>
              {area && (
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                  {area}
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
            <p className="text-sm text-white/80 line-clamp-2">{description}</p>
          </div>
        </div>
      </Link>
    </article>
  )
}