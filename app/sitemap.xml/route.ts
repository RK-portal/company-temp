import { NextResponse } from 'next/server'

import { siteConfig } from '@/config/site'
import { getAllContent } from '@/lib/content'

export async function GET() {
  const baseUrl = siteConfig.url

  // 静的ページ
  const staticPages = [
    { path: '', priority: 1.0, changefreq: 'daily' },
    { path: '/company', priority: 0.8, changefreq: 'monthly' },
    { path: '/works', priority: 0.9, changefreq: 'weekly' },
    { path: '/quality', priority: 0.8, changefreq: 'monthly' },
    { path: '/warranty', priority: 0.8, changefreq: 'monthly' },
    { path: '/house', priority: 0.9, changefreq: 'monthly' },
    { path: '/maintenance', priority: 0.8, changefreq: 'monthly' },
    { path: '/news', priority: 0.7, changefreq: 'daily' },
    { path: '/topics', priority: 0.7, changefreq: 'weekly' },
    { path: '/contact', priority: 0.9, changefreq: 'monthly' },
  ]

  // 動的コンテンツを取得
  const [newsItems, topicsItems, worksItems] = await Promise.all([
    getAllContent('news'),
    getAllContent('topics'),
    getAllContent('works'),
  ])

  // XMLを生成
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('')}
  ${newsItems
    .map(
      (item) => `
  <url>
    <loc>${baseUrl}/news/${item.slug}</loc>
    <lastmod>${new Date(item.date).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join('')}
  ${topicsItems
    .map(
      (item) => `
  <url>
    <loc>${baseUrl}/topics/${item.slug}</loc>
    <lastmod>${new Date(item.date).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join('')}
  ${worksItems
    .map(
      (item) => `
  <url>
    <loc>${baseUrl}/works/${item.slug}</loc>
    <lastmod>${new Date(item.date).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}