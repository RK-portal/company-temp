import Image from 'next/image'
import Link from 'next/link'

import { footerNavigation } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { FooterProps } from '@/types/navigation'

export default function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`bg-gray-900 ${className}`} aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        フッター
      </h2>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pt-12 pb-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            {/* Company Info */}
            <div className="space-y-8">
              <Link href="/" className="inline-block">
                <Image
                  src={siteConfig.logo.src}
                  alt={siteConfig.logo.alt}
                  width={siteConfig.logo.width}
                  height={siteConfig.logo.height}
                  className="h-8 w-auto brightness-0 invert"
                />
              </Link>
              <p className="text-sm text-gray-300">{siteConfig.company.description}</p>
              <div className="flex space-x-6">
                {siteConfig.social.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-300"
                    aria-label={`${social.name}を開く`}
                  >
                    <social.icon className="h-6 w-6" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Sitemap */}
            <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                    企業情報
                  </h3>
                  <ul role="list" className="mt-4 space-y-3">
                    {footerNavigation.company.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          className="text-sm text-gray-400 hover:text-gray-300"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                    事業内容
                  </h3>
                  <ul role="list" className="mt-4 space-y-3">
                    {footerNavigation.business.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          className="text-sm text-gray-400 hover:text-gray-300"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                    サポート
                  </h3>
                  <ul role="list" className="mt-4 space-y-3">
                    {footerNavigation.support.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          className="text-sm text-gray-400 hover:text-gray-300"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                    法務情報
                  </h3>
                  <ul role="list" className="mt-4 space-y-3">
                    {footerNavigation.legal.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          className="text-sm text-gray-400 hover:text-gray-300"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Company Details & Copyright */}
          <div className="mt-12 border-t border-gray-800 pt-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="space-y-2 text-sm text-gray-400">
                <p>{siteConfig.company.name}</p>
                <p>{siteConfig.company.address}</p>
                <p>
                  TEL: {siteConfig.company.tel} / Email: {siteConfig.company.email}
                </p>
                <p>営業時間: {siteConfig.company.businessHours}</p>
              </div>
              <div className="mt-8 md:mt-0">
                <p className="text-sm text-gray-400">{siteConfig.footer.copyright}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
