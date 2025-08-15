'use client'

import Image from 'next/image'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import { useEffect, useRef } from 'react'

import 'photoswipe/style.css'
import { GalleryImage } from '@/types/content'

interface MediaGalleryProps {
  images: GalleryImage[]
  layout?: 'grid' | 'masonry'
  columns?: number
}

export default function MediaGallery({
  images,
  layout = 'grid',
  columns = 3,
}: MediaGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!galleryRef.current) return

    const lightbox = new PhotoSwipeLightbox({
      gallery: galleryRef.current,
      children: 'a',
      pswpModule: () => import('photoswipe'),
    })

    lightbox.init()

    return () => {
      lightbox.destroy()
    }
  }, [])

  const getGridClass = () => {
    const baseClass = 'grid gap-4'
    const columnClass = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

    if (layout === 'masonry') {
      return `${baseClass} ${columnClass} auto-rows-auto`
    }

    return `${baseClass} ${columnClass}`
  }

  return (
    <div ref={galleryRef} className={getGridClass()}>
      {images.map((image, index) => (
        <a
          key={index}
          href={image.src}
          data-pswp-width={image.width || 1200}
          data-pswp-height={image.height || 800}
          className="group relative block overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className={layout === 'masonry' ? 'relative' : 'relative aspect-[4/3]'}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width || 800}
              height={image.height || 600}
              className={`
                ${layout === 'masonry' ? 'w-full h-auto' : 'object-cover'}
                group-hover:scale-105 transition-transform duration-300
              `}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm">{image.caption}</p>
              </div>
            )}
          </div>
        </a>
      ))}
    </div>
  )
}