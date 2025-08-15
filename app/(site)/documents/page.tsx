'use client'

import { DocumentTextIcon, HomeIcon, BuildingOfficeIcon, WrenchIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import DocumentRequestForm from '@/components/sections/DocumentRequestForm'
import PageHero from '@/components/sections/PageHero'
import { useAnalytics } from '@/hooks/useAnalytics'
import { submitForm } from '@/lib/formSubmit'
import { type DocumentRequestFormData } from '@/lib/validation'

const documents = [
  {
    id: 'house-catalog',
    title: '住宅建築カタログ',
    description: '最新の住宅建築事例と技術を紹介する総合カタログです。',
    icon: HomeIcon,
    pages: '48ページ',
    format: 'PDF/冊子',
  },
  {
    id: 'company-profile',
    title: '会社案内',
    description: '当社の理念、実績、サービス内容を詳しくご紹介します。',
    icon: BuildingOfficeIcon,
    pages: '24ページ',
    format: 'PDF/冊子',
  },
  {
    id: 'quality-guide',
    title: '品質・保証ガイド',
    description: 'ISO9001認証取得の品質管理体制と充実の保証制度をご説明します。',
    icon: ChartBarIcon,
    pages: '16ページ',
    format: 'PDF',
  },
  {
    id: 'maintenance-manual',
    title: 'メンテナンスマニュアル',
    description: '住まいを長持ちさせるためのメンテナンス方法を詳しく解説します。',
    icon: WrenchIcon,
    pages: '32ページ',
    format: 'PDF',
  },
]

export default function DocumentsPage() {
  const router = useRouter()
  const { trackFormSubmit } = useAnalytics()
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])

  const handleDocumentToggle = (documentId: string) => {
    setSelectedDocuments(prev => {
      if (prev.includes(documentId)) {
        return prev.filter(id => id !== documentId)
      }
      return [...prev, documentId]
    })
  }

  const handleSubmit = async (data: DocumentRequestFormData) => {
    try {
      const result = await submitForm({
        ...data,
        documents: selectedDocuments,
        formType: 'documents',
      })

      if (result.success) {
        trackFormSubmit('documents', true)
        router.push('/contact/thanks?type=documents')
      } else {
        trackFormSubmit('documents', false)
        alert(result.error || '送信に失敗しました。もう一度お試しください。')
      }
    } catch (error) {
      console.error('送信エラー:', error)
      trackFormSubmit('documents', false)
      alert('送信中にエラーが発生しました。')
    }
  }

  return (
    <>
      <PageHero
        title="資料請求"
        subtitle="お役立ち資料を無料でお届けします"
        image="/images/hero-documents.jpg"
        breadcrumb={[
          { id: 'home', label: 'ホーム', href: '/' },
          { id: 'documents', label: '資料請求', href: '/documents' },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
              お客様のニーズに合わせた資料をご用意
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              住宅建築、リフォーム、メンテナンスに関する詳しい資料をご用意しております。
              必要な資料を選択してご請求ください。PDFでのダウンロードまたは冊子での郵送が可能です。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
            ご請求可能な資料
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8 mb-12">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className={`cursor-pointer rounded-lg border-2 bg-white p-6 transition-all hover:shadow-lg ${
                  selectedDocuments.includes(doc.id)
                    ? 'border-primary-500 shadow-md'
                    : 'border-gray-200'
                }`}
                onClick={() => handleDocumentToggle(doc.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 rounded-lg p-3 ${
                    selectedDocuments.includes(doc.id)
                      ? 'bg-primary-100 text-primary-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <doc.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {doc.title}
                      </h3>
                      <input
                        type="checkbox"
                        checked={selectedDocuments.includes(doc.id)}
                        onChange={() => {}}
                        className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <p className="mb-3 text-gray-600">{doc.description}</p>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>{doc.pages}</span>
                      <span>•</span>
                      <span>{doc.format}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-gray-600">
              <DocumentTextIcon className="inline h-5 w-5 mr-2" />
              {selectedDocuments.length === 0 
                ? '資料を選択してください' 
                : `${selectedDocuments.length}件の資料を選択中`}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-3xl font-bold text-gray-900 lg:text-4xl text-center">
              資料請求フォーム
            </h2>
            <p className="mb-8 text-center text-gray-600">
              選択した資料をお届けするため、下記フォームに必要事項をご記入ください。
            </p>
            {selectedDocuments.length === 0 ? (
              <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-6 text-center">
                <p className="text-yellow-800">
                  上記から請求したい資料を選択してください。
                </p>
              </div>
            ) : (
              <DocumentRequestForm 
                onSubmit={handleSubmit} 
                selectedDocuments={selectedDocuments}
              />
            )}
          </div>
        </div>
      </section>

      <section className="bg-primary-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-md">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              資料請求に関するご注意
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• 資料は無料でお送りいたします。</li>
              <li>• PDFでの即時ダウンロード、または冊子での郵送をお選びいただけます。</li>
              <li>• 冊子での郵送の場合、お届けまで3〜5営業日程度かかります。</li>
              <li>• ご記入いただいた個人情報は、資料送付およびご案内のみに使用いたします。</li>
              <li>• より詳しい情報をご希望の場合は、<a href="/contact" className="text-primary-600 hover:underline">お問い合わせ</a>ください。</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}