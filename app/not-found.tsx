import Link from 'next/link'

import Button from '@/components/ui/Button'
import { generatePageMetadata } from '@/lib/seo'

export const metadata = generatePageMetadata('404', {
  title: 'ページが見つかりません | Company Demo Site',
  description: 'お探しのページが見つかりませんでした。URLをご確認いただくか、トップページからお探しください。',
  robots: 'noindex, follow',
})

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <p className="text-2xl font-semibold text-gray-800 mt-4">
            ページが見つかりません
          </p>
        </div>

        <div className="mb-8">
          <p className="text-gray-600 mb-4">
            申し訳ございません。お探しのページは見つかりませんでした。
          </p>
          <p className="text-gray-600">
            URLが間違っているか、ページが移動または削除された可能性があります。
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="primary" size="lg">
                トップページへ戻る
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                お問い合わせ
              </Button>
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">
              以下のページもご覧ください
            </p>
            <nav className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <Link
                href="/company"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                会社案内
              </Link>
              <Link
                href="/works"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                施工事例
              </Link>
              <Link
                href="/house"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                注文住宅
              </Link>
              <Link
                href="/maintenance"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                メンテナンス
              </Link>
              <Link
                href="/news"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                お知らせ
              </Link>
              <Link
                href="/topics"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                トピックス
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}