'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { documentRequestSchema, type DocumentRequestFormData } from '@/lib/validation'

interface DocumentRequestFormProps {
  onSubmit: (data: DocumentRequestFormData) => Promise<void>
  selectedDocuments: string[]
}

export default function DocumentRequestForm({ onSubmit, selectedDocuments }: DocumentRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState<'download' | 'mail'>('download')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<DocumentRequestFormData>({
    resolver: zodResolver(documentRequestSchema),
    defaultValues: {
      deliveryMethod: 'download',
    },
  })

  const watchDeliveryMethod = watch('deliveryMethod')

  const processSubmit = async (data: DocumentRequestFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(processSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
            お名前 <span className="text-red-500">*</span>
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="山田 太郎"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="example@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
            電話番号
          </label>
          <input
            {...register('phone')}
            type="tel"
            id="phone"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="03-1234-5678"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="mb-2 block text-sm font-medium text-gray-700">
            会社名
          </label>
          <input
            {...register('company')}
            type="text"
            id="company"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="株式会社サンプル"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          お届け方法 <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              {...register('deliveryMethod')}
              type="radio"
              value="download"
              className="mr-2"
            />
            <span>PDFダウンロード（即時）</span>
          </label>
          <label className="flex items-center">
            <input
              {...register('deliveryMethod')}
              type="radio"
              value="mail"
              className="mr-2"
            />
            <span>冊子郵送（3〜5営業日）</span>
          </label>
        </div>
        {errors.deliveryMethod && (
          <p className="mt-1 text-sm text-red-600">{errors.deliveryMethod.message}</p>
        )}
      </div>

      {watchDeliveryMethod === 'mail' && (
        <>
          <div>
            <label htmlFor="postalCode" className="mb-2 block text-sm font-medium text-gray-700">
              郵便番号 <span className="text-red-500">*</span>
            </label>
            <input
              {...register('postalCode')}
              type="text"
              id="postalCode"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="123-4567"
            />
            {errors.postalCode && (
              <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-700">
              住所 <span className="text-red-500">*</span>
            </label>
            <input
              {...register('address')}
              type="text"
              id="address"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="東京都千代田区丸の内1-1-1"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>
        </>
      )}

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
          その他ご要望
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={4}
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="特にご要望がありましたらご記入ください"
        />
      </div>

      <div className="rounded-md bg-gray-50 p-4">
        <p className="text-sm text-gray-600">
          選択中の資料: {selectedDocuments.length}件
        </p>
      </div>

      <div className="flex items-center">
        <input
          {...register('privacy')}
          type="checkbox"
          id="privacy"
          className="mr-2 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
        />
        <label htmlFor="privacy" className="text-sm text-gray-700">
          <a href="/privacy" className="text-primary-600 hover:underline" target="_blank">
            プライバシーポリシー
          </a>
          に同意する <span className="text-red-500">*</span>
        </label>
      </div>
      {errors.privacy && (
        <p className="mt-1 text-sm text-red-600">{errors.privacy.message}</p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting || selectedDocuments.length === 0}
      >
        {isSubmitting ? '送信中...' : '資料を請求する'}
      </Button>
    </form>
  )
}