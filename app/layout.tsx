import { Inter } from 'next/font/google'

import type { Metadata } from 'next'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  )
}