'use client'

import React, { forwardRef, createContext, useContext } from 'react'

import { cn } from '@/lib/cn'

interface RadioGroupContextValue {
  name?: string
  value?: string
  onChange?: (value: string) => void
}

const RadioGroupContext = createContext<RadioGroupContextValue>({})

export interface RadioOption {
  value: string
  label: string
  disabled?: boolean
}

export interface RadioGroupProps {
  name?: string
  value?: string
  onChange?: (value: string) => void
  options: RadioOption[]
  label?: string
  error?: string
  helperText?: string
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  onChange,
  options,
  label,
  error,
  helperText,
  orientation = 'vertical',
  className
}) => {
  const groupId = `radio-group-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <RadioGroupContext.Provider value={{ name, value, onChange }}>
      <div 
        role="radiogroup"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${groupId}-error` : helperText ? `${groupId}-helper` : undefined
        }
        className={className}
        data-testid="radio-group"
      >
        {label && (
          <p 
            id={`${groupId}-label`}
            className="text-sm font-medium text-neutral-700 mb-2"
          >
            {label}
          </p>
        )}
        
        <div className={cn(
          'space-y-2',
          orientation === 'horizontal' && 'flex flex-wrap gap-4 space-y-0'
        )}>
          {options.map((option) => (
            <Radio
              key={option.value}
              value={option.value}
              label={option.label}
              disabled={option.disabled}
            />
          ))}
        </div>
        
        {error && (
          <p 
            id={`${groupId}-error`}
            className="mt-1 text-sm text-error-600"
            role="alert"
          >
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p 
            id={`${groupId}-helper`}
            className="mt-1 text-sm text-neutral-500"
          >
            {helperText}
          </p>
        )}
      </div>
    </RadioGroupContext.Provider>
  )
}

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, value, disabled, onChange, ...props }, ref) => {
    const context = useContext(RadioGroupContext)
    const radioId = `radio-${Math.random().toString(36).substr(2, 9)}`
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (context.onChange && value) {
        context.onChange(value as string)
      }
      onChange?.(e)
    }
    
    return (
      <div className="flex items-center">
        <input
          ref={ref}
          id={radioId}
          type="radio"
          name={context.name}
          value={value}
          checked={context.value === value}
          onChange={handleChange}
          disabled={disabled}
          className={cn(
            'h-4 w-4 border-neutral-300',
            'text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-0',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-colors duration-200',
            className
          )}
          data-testid="radio"
          {...props}
        />
        
        {label && (
          <label 
            htmlFor={radioId}
            className="ml-2 text-sm text-neutral-700 cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)

Radio.displayName = 'Radio'

export default Radio