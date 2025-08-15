'use client'

import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

import GoogleMap from '@/components/integrations/GoogleMap'
import ContactForm from '@/components/sections/ContactForm'
import PageHero from '@/components/sections/PageHero'
import companyData from '@/data/company.json'
import { useAnalytics } from '@/hooks/useAnalytics'
import { submitForm } from '@/lib/formSubmit'
import { type ContactFormData } from '@/lib/validation'

export default function ContactPage() {
  const router = useRouter()
  const { trackFormSubmit } = useAnalytics()

  const handleSubmit = async (data: ContactFormData) => {
    try {
      const result = await submitForm({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        message: data.message,
      })

      if (result.success) {
        // 成功時の分析イベント送信
        trackFormSubmit('contact', true)
        // サンクスページへ遷移
        router.push('/contact/thanks')
      } else {
        // エラー時の分析イベント送信
        trackFormSubmit('contact', false)
        // エラーメッセージ表示
        alert(result.error || '送信に失敗しました。もう一度お試しください。')
      }
    } catch (error) {
      console.error('送信エラー:', error)
      trackFormSubmit('contact', false)
      alert('送信中にエラーが発生しました。')
    }
  }

  return (
    <>
      <PageHero
        title="お問い合わせ"
        subtitle="お気軽にご相談・ご質問ください"
        image="/images/hero-contact.jpg"
        breadcrumb={[
          { id: 'home', label: 'ホーム', href: '/' },
          { id: 'contact', label: 'お問い合わせ', href: '/contact' },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
              どんなことでもお気軽にご相談ください
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              新築・リフォーム・メンテナンスなど、住まいに関するご相談を承っております。
              お電話またはお問い合わせフォームからお気軽にご連絡ください。
              専門スタッフが丁寧にご対応いたします。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-8 shadow-md text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                <PhoneIcon className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">お電話</h3>
              <p className="mb-4 text-gray-600">平日 9:00-18:00</p>
              <a
                href={`tel:${companyData.phone}`}
                className="text-2xl font-bold text-primary-600 hover:text-primary-700"
              >
                {companyData.phone}
              </a>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-md text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                <EnvelopeIcon className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">メール</h3>
              <p className="mb-4 text-gray-600">24時間受付</p>
              <a
                href={`mailto:${companyData.email}`}
                className="text-lg text-primary-600 hover:text-primary-700 hover:underline"
              >
                {companyData.email}
              </a>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-md text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                <MapPinIcon className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">所在地</h3>
              <p className="text-gray-600">
                〒{companyData.address.postal}<br />
                {companyData.address.prefecture}{companyData.address.city}<br />
                {companyData.address.street}<br />
                {companyData.address.building}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-8 text-3xl font-bold text-gray-900 lg:text-4xl">
                お問い合わせフォーム
              </h2>
              <p className="mb-8 text-gray-600">
                下記フォームに必要事項をご記入の上、送信してください。
                内容を確認後、担当者よりご連絡させていただきます。
              </p>
              <ContactForm onSubmit={handleSubmit} />
            </div>

            <div>
              <h3 className="mb-6 text-2xl font-semibold text-gray-900">
                アクセスマップ
              </h3>
              <GoogleMap
                center={companyData.coordinates}
                height="500px"
                markers={[
                  {
                    position: companyData.coordinates,
                    title: companyData.name,
                    description: `〒${companyData.address.postal} ${companyData.address.prefecture}${companyData.address.city}${companyData.address.street}`,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-md">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              よくあるご質問
            </h3>
            <p className="mb-4 text-gray-600">
              お問い合わせいただく前に、<a href="/quality" className="text-primary-600 hover:underline">品質へのこだわり</a>、
              <a href="/warranty" className="text-primary-600 hover:underline">保証制度</a>、
              <a href="/maintenance" className="text-primary-600 hover:underline">メンテナンスサービス</a>の
              各ページにあるFAQもご確認ください。
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900">相談は無料ですか？</h4>
                <p className="text-gray-600">はい、ご相談・お見積りは無料です。お気軽にご連絡ください。</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">対応エリアは？</h4>
                <p className="text-gray-600">東京都内を中心に、近隣県も対応しております。詳細はお問い合わせください。</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">急ぎの相談も可能ですか？</h4>
                <p className="text-gray-600">緊急のメンテナンスは24時間対応しております。その他のご相談も可能な限り迅速に対応いたします。</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}