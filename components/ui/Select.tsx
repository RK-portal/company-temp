'use client'

import React, { forwardRef } from 'react'

import { cn } from '@/lib/cn'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
  options: SelectOption[]
  placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    className, 
    label, 
    error, 
    helperText, 
    fullWidth = false,
    options,
    placeholder,
    id,
    ...props 
  }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`
    
    return (
      <div className={cn(fullWidth && 'w-full')}>
        {label && (
          <label 
            htmlFor={selectId}
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'block w-full px-3 py-2 pr-8 border rounded-md shadow-sm appearance-none',
              'text-neutral-900 bg-white',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              'disabled:bg-neutral-50 disabled:text-neutral-500 disabled:cursor-not-allowed',
              'transition-colors duration-200',
              error 
                ? 'border-error-500 focus:ring-error-500 focus:border-error-500' 
                : 'border-neutral-300 focus:ring-primary-500 focus:border-primary-500',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
            }
            data-testid="select"
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <svg 
              className="h-4 w-4 text-neutral-400" 
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
          </div>
        </div>
        
        {error && (
          <p 
            id={`${selectId}-error`}
            className="mt-1 text-sm text-error-600"
            role="alert"
          >
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p 
            id={`${selectId}-helper`}
            className="mt-1 text-sm text-neutral-500"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export default Select