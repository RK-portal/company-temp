'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { contactFormSchema, type ContactFormData } from '@/lib/validation'

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>
  className?: string
}

export default function ContactForm({ onSubmit, className = '' }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const handleFormSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={`space-y-6 ${className}`}
      noValidate
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="company" className="mb-2 block text-sm font-medium text-gray-700">
            会社名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="company"
            {...register('company')}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            aria-invalid={errors.company ? 'true' : 'false'}
          />
          {errors.company && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.company.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
            お名前 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
            電話番号 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            {...register('phone')}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            aria-invalid={errors.phone ? 'true' : 'false'}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-700">
          件名 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="subject"
          {...register('subject')}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          aria-invalid={errors.subject ? 'true' : 'false'}
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.subject.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
          お問い合わせ内容 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          {...register('message')}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          aria-invalid={errors.message ? 'true' : 'false'}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-start">
          <input
            type="checkbox"
            {...register('privacy')}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-500"
            aria-invalid={errors.privacy ? 'true' : 'false'}
          />
          <span className="ml-2 text-sm text-gray-700">
            <a href="/privacy" className="text-primary-600 hover:underline">
              プライバシーポリシー
            </a>
            に同意する <span className="text-red-500">*</span>
          </span>
        </label>
        {errors.privacy && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.privacy.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-primary-600 px-6 py-3 text-white font-medium transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? '送信中...' : '送信する'}
      </button>
    </form>
  )
}