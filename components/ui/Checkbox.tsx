'use client'

import React, { forwardRef } from 'react'

import { cn } from '@/lib/cn'

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    className, 
    label, 
    error, 
    helperText,
    id,
    ...props 
  }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`
    
    return (
      <div className="relative">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              ref={ref}
              id={checkboxId}
              type="checkbox"
              className={cn(
                'h-4 w-4 rounded border-neutral-300',
                'text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-0',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-colors duration-200',
                error && 'border-error-500',
                className
              )}
              aria-invalid={!!error}
              aria-describedby={
                error ? `${checkboxId}-error` : helperText ? `${checkboxId}-helper` : undefined
              }
              data-testid="checkbox"
              {...props}
            />
          </div>
          
          {label && (
            <label 
              htmlFor={checkboxId}
              className="ml-2 text-sm text-neutral-700 cursor-pointer select-none"
            >
              {label}
            </label>
          )}
        </div>
        
        {error && (
          <p 
            id={`${checkboxId}-error`}
            className="mt-1 text-sm text-error-600"
            role="alert"
          >
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p 
            id={`${checkboxId}-helper`}
            className="mt-1 text-sm text-neutral-500 ml-6"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox