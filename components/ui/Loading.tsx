import React from 'react'

import { cn } from '@/lib/cn'

export interface LoadingProps {
  type?: 'spinner' | 'skeleton'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  skeletonLines?: number
}

const Loading: React.FC<LoadingProps> = ({ 
  type = 'spinner', 
  size = 'md', 
  className,
  skeletonLines = 3
}) => {
  if (type === 'skeleton') {
    return (
      <div 
        className={cn('animate-pulse', className)}
        data-testid="loading-skeleton"
        role="status"
        aria-label="Loading"
      >
        {Array.from({ length: skeletonLines }).map((_, index) => (
          <div key={index} className="space-y-3">
            <div 
              className={cn(
                'h-4 bg-neutral-200 rounded',
                index === 0 && 'w-3/4',
                index === 1 && 'w-full',
                index === 2 && 'w-5/6',
                index > 2 && 'w-full'
              )}
            />
            {index < skeletonLines - 1 && <div className="h-3" />}
          </div>
        ))}
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  const spinnerSizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return (
    <div 
      className={cn('flex justify-center items-center', className)}
      data-testid="loading-spinner"
      role="status"
      aria-label="Loading"
    >
      <svg
        className={cn(
          'animate-spin text-primary-600',
          spinnerSizes[size]
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Loading