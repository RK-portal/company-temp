'use client'

import React from 'react'

import { cn } from '@/lib/cn'

export interface BadgeProps {
  text: string
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md'
  className?: string
}

const Badge: React.FC<BadgeProps> = ({ 
  text, 
  color = 'primary', 
  size = 'md', 
  className 
}) => {
  const colors = {
    primary: 'bg-primary-100 text-primary-700',
    secondary: 'bg-secondary-100 text-secondary-700',
    success: 'bg-success-100 text-success-700',
    warning: 'bg-warning-100 text-warning-700',
    error: 'bg-error-100 text-error-700'
  }
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm'
  }
  
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        colors[color],
        sizes[size],
        className
      )}
      data-testid="badge"
    >
      {text}
    </span>
  )
}

export default Badge