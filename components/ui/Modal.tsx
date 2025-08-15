'use client'

import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import { cn } from '@/lib/cn'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  size = 'md', 
  children 
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  }

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement
      modalRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      previousActiveElement.current?.focus()
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (!isOpen || e.key !== 'Tab' || !modalRef.current) return

      const focusableElements = modalRef.current.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
      )
      const firstFocusable = focusableElements[0] as HTMLElement
      const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable?.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable?.focus()
          e.preventDefault()
        }
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('keydown', handleFocusTrap)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleFocusTrap)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby={title ? 'modal-title' : undefined}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        />
        
        <div
          ref={modalRef}
          tabIndex={-1}
          className={cn(
            'relative bg-white rounded-lg shadow-xl transform transition-all w-full',
            sizes[size]
          )}
          data-testid="modal"
        >
          {title && (
            <div className="px-6 py-4 border-b border-neutral-200">
              <h2 
                id="modal-title" 
                className="text-xl font-semibold text-neutral-900"
              >
                {title}
              </h2>
            </div>
          )}
          
          <div className="px-6 py-4">
            {children}
          </div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
            aria-label="Close modal"
          >
            <svg 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Modal