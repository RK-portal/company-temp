'use client'

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

import { mainNavigation, utilityNavigation } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { HeaderProps } from '@/types/navigation'

import MegaMenu from './MegaMenu'
import MobileMenu from './MobileMenu'

export default function Header({ className = '', sticky = true }: HeaderProps) {
  const pathname = usePathname()
  const scrollDirection = useScrollDirection()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Handle sticky header visibility
  const headerVisible = !sticky || scrollDirection !== 'down'

  const handleMenuEnter = (itemId: string) => {
    if (mainNavigation.find((item) => item.id === itemId)?.children) {
      setActiveMenuId(itemId)
      setMegaMenuOpen(true)
    }
  }

  const handleMenuLeave = () => {
    setActiveMenuId(null)
    setMegaMenuOpen(false)
  }

  const activeMenuItem = activeMenuId
    ? mainNavigation.find((item) => item.id === activeMenuId)
    : null

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        メインコンテンツへスキップ
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-sm transition-transform duration-300 ${
          headerVisible ? 'translate-y-0' : '-translate-y-full'
        } ${className}`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="メインナビゲーション">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src={siteConfig.logo.src}
                  alt={siteConfig.logo.alt}
                  width={siteConfig.logo.width}
                  height={siteConfig.logo.height}
                  className="h-8 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-x-8">
              {mainNavigation.map((item) => (
                <div
                  key={item.id}
                  onMouseEnter={() => handleMenuEnter(item.id)}
                  onMouseLeave={handleMenuLeave}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      pathname === item.href || pathname.startsWith(item.href + '/')
                        ? 'text-primary'
                        : 'text-gray-700'
                    }`}
                    aria-expanded={activeMenuId === item.id ? 'true' : 'false'}
                    aria-haspopup={item.children ? 'true' : 'false'}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>

            {/* Utility Navigation */}
            <div className="flex items-center gap-x-4">
              <div className="hidden lg:flex lg:items-center lg:gap-x-4">
                {utilityNavigation.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`text-sm font-medium px-4 py-2 rounded-md transition-colors ${
                      item.id === 'contact'
                        ? 'bg-primary text-white hover:bg-primary-dark'
                        : 'text-gray-700 hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Mobile menu button */}
              <button
                type="button"
                className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="メニューを開く"
              >
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </nav>

        {/* Mega Menu */}
        {megaMenuOpen && activeMenuItem && activeMenuItem.children && (
          <MegaMenu
            items={activeMenuItem.children}
            isOpen={megaMenuOpen}
            onClose={() => {
              setMegaMenuOpen(false)
              setActiveMenuId(null)
            }}
          />
        )}
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Spacer for fixed header */}
      {sticky && <div className="h-16" />}
    </>
  )
}
