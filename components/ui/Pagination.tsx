'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

import { PaginationProps } from '@/types/content'

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  className = '',
}: PaginationProps) {
  const getPageUrl = (page: number) => {
    return page === 1 ? basePath : `${basePath}?page=${page}`
  }

  const renderPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    const end = Math.min(totalPages, start + maxVisible - 1)

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }

    if (start > 1) {
      pages.push(
        <Link
          key={1}
          href={getPageUrl(1)}
          className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
        >
          1
        </Link>
      )
      if (start > 2) {
        pages.push(
          <span key="start-ellipsis" className="px-2 py-2 text-gray-400">
            ...
          </span>
        )
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        i === currentPage ? (
          <span
            key={i}
            aria-current="page"
            className="px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-md"
          >
            {i}
          </span>
        ) : (
          <Link
            key={i}
            href={getPageUrl(i)}
            className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
          >
            {i}
          </Link>
        )
      )
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push(
          <span key="end-ellipsis" className="px-2 py-2 text-gray-400">
            ...
          </span>
        )
      }
      pages.push(
        <Link
          key={totalPages}
          href={getPageUrl(totalPages)}
          className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
        >
          {totalPages}
        </Link>
      )
    }

    return pages
  }

  if (totalPages <= 1) return null

  return (
    <nav
      className={`flex items-center justify-center space-x-1 ${className}`}
      aria-label="ページネーション"
    >
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="前のページ"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </Link>
      ) : (
        <span className="p-2 text-gray-300 cursor-not-allowed">
          <ChevronLeftIcon className="h-5 w-5" />
        </span>
      )}

      <div className="flex items-center space-x-1">{renderPageNumbers()}</div>

      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="次のページ"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </Link>
      ) : (
        <span className="p-2 text-gray-300 cursor-not-allowed">
          <ChevronRightIcon className="h-5 w-5" />
        </span>
      )}
    </nav>
  )
}