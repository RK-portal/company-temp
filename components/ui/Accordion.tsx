'use client'

import React, { useState } from 'react'

import { cn } from '@/lib/cn'

export interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
}

export interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  defaultOpen?: string[]
  className?: string
}

const Accordion: React.FC<AccordionProps> = ({ 
  items, 
  allowMultiple = false, 
  defaultOpen = [], 
  className 
}) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen)

  const toggleItem = (itemId: string) => {
    if (allowMultiple) {
      setOpenItems(prev =>
        prev.includes(itemId)
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      )
    } else {
      setOpenItems(prev =>
        prev.includes(itemId) ? [] : [itemId]
      )
    }
  }

  return (
    <div 
      className={cn('divide-y divide-neutral-200', className)}
      data-testid="accordion"
    >
      {items.map((item) => {
        const isOpen = openItems.includes(item.id)
        
        return (
          <div key={item.id} className="py-2">
            <button
              onClick={() => toggleItem(item.id)}
              className="flex justify-between items-center w-full px-4 py-3 text-left font-medium text-neutral-900 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset rounded transition-colors duration-200"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              <span>{item.title}</span>
              <svg
                className={cn(
                  'w-5 h-5 text-neutral-500 transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            
            <div
              id={`accordion-content-${item.id}`}
              className={cn(
                'overflow-hidden transition-all duration-300',
                isOpen ? 'max-h-96' : 'max-h-0'
              )}
              aria-hidden={!isOpen}
            >
              <div className="px-4 py-3 text-neutral-600">
                {item.content}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Accordion