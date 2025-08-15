import { GoogleAnalytics } from '@/components/integrations/GoogleAnalytics'
import { ThemeProvider } from '@/components/theme/ThemeProvider'

import type { Metadata } from 'next'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: '企業名 | 企業向けホームページテンプレート',
  description: '企業向けホームページテンプレートのデモサイトです。',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'),
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  return (
    <html lang="ja">
      <body>
        {measurementId && <GoogleAnalytics measurementId={measurementId} />}
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
