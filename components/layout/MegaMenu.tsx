'use client'

import { ChevronRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

import { MegaMenuProps } from '@/types/navigation'

export default function MegaMenu({ items, isOpen, onClose }: MegaMenuProps) {
  if (!isOpen || !items || items.length === 0) return null

  // Group items into columns (max 4 items per column)
  const columns: (typeof items)[] = []
  const itemsPerColumn = 4
  for (let i = 0; i < items.length; i += itemsPerColumn) {
    columns.push(items.slice(i, i + itemsPerColumn))
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-25"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mega Menu Content */}
      <div className="absolute left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-6 py-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {columns.map((column, columnIndex) => (
              <div key={columnIndex} className="space-y-4">
                {column.map((item) => (
                  <div key={item.id} className="group">
                    <Link
                      href={item.href}
                      className="block rounded-lg p-3 hover:bg-gray-50 transition-colors"
                      onClick={onClose}
                    >
                      <div className="flex items-start">
                        {item.icon && (
                          <item.icon className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                        )}
                        <div className="ml-3 flex-1">
                          <div className="flex items-center">
                            <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">
                              {item.label}
                            </h3>
                            {item.badge && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary text-white">
                                {item.badge}
                              </span>
                            )}
                            {item.featured && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-white">
                                おすすめ
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                          )}
                        </div>
                        <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-primary flex-shrink-0 ml-2" />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
