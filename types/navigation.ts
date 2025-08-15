export interface NavigationItem {
  id: string
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  description?: string
  children?: NavigationItem[]
  target?: '_blank' | '_self'
  badge?: string
  featured?: boolean
}

export interface BreadcrumbItem {
  id: string
  label: string
  href?: string
  current?: boolean
}

export interface MegaMenuColumn {
  title: string
  items: NavigationItem[]
}

export interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export interface HeaderProps {
  className?: string
  sticky?: boolean
}

export interface FooterProps {
  className?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export interface MegaMenuProps {
  items: NavigationItem[]
  isOpen: boolean
  onClose: () => void
}

export type ScrollDirection = 'up' | 'down' | null

export interface UseScrollDirectionOptions {
  threshold?: number
  throttleDelay?: number
}

export interface SocialLink {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export interface CompanyInfo {
  name: string
  description: string
  address: string
  tel: string
  email: string
  businessHours: string
}

export interface SiteConfig {
  name: string
  description: string
  url: string
  locale: string
  logo: {
    src: string
    alt: string
    width: number
    height: number
  }
  company: CompanyInfo
  social: SocialLink[]
  footer: {
    copyright: string
    links: NavigationItem[]
  }
}
