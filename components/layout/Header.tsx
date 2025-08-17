'use client'

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

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
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  // Handle sticky header visibility
  const headerVisible = !sticky || scrollDirection !== 'down'

  const handleMenuEnter = (itemId: string) => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }

    if (mainNavigation.find((item) => item.id === itemId)?.children) {
      setActiveMenuId(itemId)
      setMegaMenuOpen(true)
    }
  }

  const handleMenuLeave = () => {
    // Add delay before closing
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenuId(null)
      setMegaMenuOpen(false)
    }, 200)
  }

  const handleMegaMenuEnter = () => {
    // Clear timeout when entering mega menu
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  const handleMegaMenuLeave = () => {
    // Use same delay when leaving mega menu
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenuId(null)
      setMegaMenuOpen(false)
    }, 200)
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
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm transition-all duration-500 ease-out ${
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
                  className="relative group"
                >
                  <Link
                    href={item.href}
                    className={`relative text-sm font-medium transition-all duration-500 ease-out px-2 py-1 ${
                      pathname === item.href || pathname.startsWith(item.href + '/')
                        ? 'text-primary'
                        : 'text-gray-700 hover:text-primary'
                    }`}
                    aria-expanded={activeMenuId === item.id ? 'true' : 'false'}
                    aria-haspopup={item.children ? 'true' : 'false'}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {/* ホバー時の背景アニメーション */}
                    <span className={`absolute inset-0 bg-primary-50 rounded-md transform scale-x-0 transition-transform duration-500 ease-out origin-left ${
                      pathname === item.href || pathname.startsWith(item.href + '/') || activeMenuId === item.id
                        ? 'scale-x-100'
                        : 'group-hover:scale-x-100'
                    }`} />
                    {/* 下線アニメーション */}
                    <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 transform transition-all duration-500 ease-out ${
                      pathname === item.href || pathname.startsWith(item.href + '/')
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`} />
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
                    className={`relative text-sm font-medium px-4 py-2 rounded-md transition-all duration-500 ease-out overflow-hidden ${
                      item.id === 'contact'
                        ? 'bg-primary text-white hover:bg-primary-600 hover:shadow-lg hover:scale-105'
                        : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {item.id === 'contact' && (
                      <>
                        {/* 波紋エフェクト */}
                        <span className="absolute inset-0 bg-white/20 transform translate-y-full transition-transform duration-700 ease-out hover:translate-y-0" />
                        {/* 光沢エフェクト */}
                        <span className="absolute -top-2 -right-2 w-4 h-4 bg-white/30 rounded-full blur-md animate-pulse" />
                      </>
                    )}
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
          <div
            onMouseEnter={handleMegaMenuEnter}
            onMouseLeave={handleMegaMenuLeave}
          >
            <MegaMenu
              items={activeMenuItem.children}
              isOpen={megaMenuOpen}
              onClose={() => {
                setMegaMenuOpen(false)
                setActiveMenuId(null)
              }}
            />
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Spacer for fixed header */}
      {sticky && <div className="h-16" />}
    </>
  )
}
