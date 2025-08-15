import { CheckCircleIcon, HomeIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { type Metadata } from 'next'
import Link from 'next/link'

import PageHero from '@/components/sections/PageHero'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'お問い合わせ完了',
  description: 'お問い合わせありがとうございました。内容を確認後、担当者よりご連絡いたします。',
})

export default function ContactThanksPage() {
  return (
    <>
      <PageHero
        title="お問い合わせ完了"
        subtitle="お問い合わせありがとうございました"
        image="/images/hero-contact.jpg"
        breadcrumb={[
          { id: 'home', label: 'ホーム', href: '/' },
          { id: 'contact', label: 'お問い合わせ', href: '/contact' },
          { id: 'thanks', label: '完了', href: '/contact/thanks' },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircleIcon className="h-12 w-12" />
            </div>
            
            <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
              お問い合わせを受け付けました
            </h2>
            
            <p className="mb-8 text-lg text-gray-600 leading-relaxed">
              この度はお問い合わせいただき、誠にありがとうございます。<br />
              お送りいただいた内容を確認の上、担当者より2営業日以内に<br />
              ご連絡させていただきます。
            </p>

            <div className="mb-12 rounded-lg bg-gray-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                今後の流れ
              </h3>
              <ol className="space-y-2 text-left text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2 font-semibold text-primary-600">1.</span>
                  <span>担当者がお問い合わせ内容を確認いたします</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-semibold text-primary-600">2.</span>
                  <span>2営業日以内にメールまたはお電話でご連絡いたします</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-semibold text-primary-600">3.</span>
                  <span>ご要望に応じて、詳細なご相談や現地調査の日程を調整します</span>
                </li>
              </ol>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                ※ お急ぎの場合は、お電話でのお問い合わせをお願いいたします。
              </p>
              <p className="text-sm text-gray-600">
                ※ 自動返信メールが届かない場合は、メールアドレスの入力間違いの可能性があります。<br />
                その場合は、お手数ですが再度お問い合わせください。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h3 className="mb-8 text-center text-2xl font-bold text-gray-900">
              その他のご案内
            </h3>
            
            <div className="grid gap-6 md:grid-cols-3">
              <Link
                href="/house"
                className="group rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-900">事業紹介</h4>
                  <ArrowRightIcon className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1" />
                </div>
                <p className="text-gray-600">
                  新築・リフォーム・不動産仲介など、当社の事業内容をご紹介します。
                </p>
              </Link>

              <Link
                href="/quality"
                className="group rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-900">品質へのこだわり</h4>
                  <ArrowRightIcon className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1" />
                </div>
                <p className="text-gray-600">
                  ISO9001認証取得。確かな品質管理体制についてご説明します。
                </p>
              </Link>

              <Link
                href="/company"
                className="group rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-900">会社情報</h4>
                  <ArrowRightIcon className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1" />
                </div>
                <p className="text-gray-600">
                  会社概要、沿革、経営理念など、当社について詳しくご紹介します。
                </p>
              </Link>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/"
                className="inline-flex items-center rounded-lg bg-primary-600 px-6 py-3 text-white font-medium transition-colors hover:bg-primary-700"
              >
                <HomeIcon className="mr-2 h-5 w-5" />
                トップページへ戻る
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}