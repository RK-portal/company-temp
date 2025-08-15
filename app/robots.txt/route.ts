import { NextResponse } from 'next/server'

import { siteConfig } from '@/config/site'

export async function GET() {
  const baseUrl = siteConfig.url

  const robotsTxt = `# Robots.txt for ${siteConfig.name}
# Generated at: ${new Date().toISOString()}

User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /static/
Disallow: /*.json$

# Crawl-delay
Crawl-delay: 1

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Googlebot
User-agent: Googlebot
Allow: /
Crawl-delay: 0

# Bingbot
User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Block bad bots
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: MJ12bot
Disallow: /
`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}