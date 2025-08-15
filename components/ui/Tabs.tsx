'use client'

import React, { useState, useRef } from 'react'

import { cn } from '@/lib/cn'

export interface TabItem {
  id: string
  label: string
  content: React.ReactNode
}

export interface TabsProps {
  items: TabItem[]
  defaultTab?: string
  onChange?: (tab: string) => void
  className?: string
}

const Tabs: React.FC<TabsProps> = ({ 
  items, 
  defaultTab, 
  onChange, 
  className 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id)
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    onChange?.(tabId)
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        newIndex = index > 0 ? index - 1 : items.length - 1
        break
      case 'ArrowRight':
        e.preventDefault()
        newIndex = index < items.length - 1 ? index + 1 : 0
        break
      case 'Home':
        e.preventDefault()
        newIndex = 0
        break
      case 'End':
        e.preventDefault()
        newIndex = items.length - 1
        break
      default:
        return
    }

    tabsRef.current[newIndex]?.focus()
    handleTabChange(items[newIndex].id)
  }

  const activeItem = items.find(item => item.id === activeTab)

  return (
    <div className={cn('w-full', className)} data-testid="tabs">
      <div 
        className="flex border-b border-neutral-200"
        role="tablist"
        aria-label="Tabs"
      >
        {items.map((item, index) => {
          const isActive = item.id === activeTab
          
          return (
            <button
              key={item.id}
              ref={el => {tabsRef.current[index] = el}}
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleTabChange(item.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                'px-4 py-2 font-medium text-sm transition-colors duration-200',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset',
                isActive
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-neutral-600 hover:text-neutral-900'
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      
      {activeItem && (
        <div
          role="tabpanel"
          id={`tabpanel-${activeItem.id}`}
          aria-labelledby={`tab-${activeItem.id}`}
          className="py-4"
          tabIndex={0}
        >
          {activeItem.content}
        </div>
      )}
    </div>
  )
}

export default Tabs