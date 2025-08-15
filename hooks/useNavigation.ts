'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { NavigationItem } from '@/types/navigation'
import { mainNavigation } from '@/config/navigation'

export function useNavigation() {
  const pathname = usePathname()

  const isActive = useCallback(
    (item: NavigationItem): boolean => {
      if (item.href === '/') {
        return pathname === '/'
      }
      return pathname.startsWith(item.href)
    },
    [pathname]
  )

  const findActiveItem = useCallback(
    (items: NavigationItem[]): NavigationItem | null => {
      for (const item of items) {
        if (isActive(item)) {
          return item
        }
        if (item.children) {
          const activeChild = findActiveItem(item.children)
          if (activeChild) {
            return item
          }
        }
      }
      return null
    },
    [isActive]
  )

  const activeItem = useMemo(() => findActiveItem(mainNavigation), [findActiveItem])

  const breadcrumbs = useMemo(() => {
    const items: { label: string; href?: string; current?: boolean }[] = []
    const pathSegments = pathname.split('/').filter(Boolean)

    items.push({ label: 'ホーム', href: '/' })

    let currentPath = ''
    for (const segment of pathSegments) {
      currentPath += `/${segment}`

      // Find matching navigation item
      const navItem = mainNavigation.find((item) => item.href === currentPath)
      if (navItem) {
        items.push({ label: navItem.label, href: navItem.href })
      } else {
        // Check children of navigation items
        for (const parent of mainNavigation) {
          if (parent.children) {
            const child = parent.children.find((childItem) => childItem.href === currentPath)
            if (child) {
              if (!items.find((item) => item.href === parent.href)) {
                items.push({ label: parent.label, href: parent.href })
              }
              items.push({ label: child.label, href: child.href })
              break
            }
          }
        }
      }
    }

    // Mark the last item as current
    if (items.length > 0) {
      items[items.length - 1].current = true
    }

    return items
  }, [pathname])

  return {
    pathname,
    isActive,
    activeItem,
    breadcrumbs,
    mainNavigation,
  }
}
