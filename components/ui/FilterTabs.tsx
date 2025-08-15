'use client'

import { Category } from '@/types/content'

interface FilterTabsProps {
  categories: Category[]
  activeCategory?: string
  onSelect: (category: string) => void
}

export default function FilterTabs({
  categories,
  activeCategory = 'all',
  onSelect,
}: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
            ${
              activeCategory === category.id
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
          aria-pressed={activeCategory === category.id}
        >
          {category.name}
          {category.count !== undefined && (
            <span className="ml-1 text-xs opacity-70">({category.count})</span>
          )}
        </button>
      ))}
    </div>
  )
}