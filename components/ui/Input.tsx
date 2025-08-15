'use client'

import React, { forwardRef } from 'react'

import { cn } from '@/lib/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    label, 
    error, 
    helperText, 
    fullWidth = false, 
    type = 'text',
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    
    return (
      <div className={cn(fullWidth && 'w-full')}>
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            {label}
          </label>
        )}
        
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            'block w-full px-3 py-2 border rounded-md shadow-sm',
            'text-neutral-900 placeholder-neutral-400',
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
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          data-testid="input"
          {...props}
        />
        
        {error && (
          <p 
            id={`${inputId}-error`}
            className="mt-1 text-sm text-error-600"
            role="alert"
          >
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p 
            id={`${inputId}-helper`}
            className="mt-1 text-sm text-neutral-500"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input