import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { vi } from 'vitest'
import { NextRouter } from 'next/router'

// Mock Next.js router
export const mockRouter: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: vi.fn(() => Promise.resolve(true)),
  replace: vi.fn(() => Promise.resolve(true)),
  reload: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  prefetch: vi.fn(() => Promise.resolve()),
  beforePopState: vi.fn(),
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  isPreview: false,
}

// Mock useRouter
vi.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Providers wrapper for tests
interface ProvidersProps {
  children: React.ReactNode
}

const AllTheProviders = ({ children }: ProvidersProps) => {
  return <>{children}</>
}

// Custom render method
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }

// Utility to wait for animations
export const waitForAnimation = (duration: number = 300) => {
  return new Promise((resolve) => setTimeout(resolve, duration))
}

// Utility to mock fetch responses
export const mockFetch = (response: any, status: number = 200) => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: async () => response,
    text: async () => JSON.stringify(response),
  })
}

// Utility to check accessibility
export const checkA11y = async (container: HTMLElement) => {
  // This is a placeholder for actual axe-core integration
  // In a real implementation, you would use axe-core here
  return Promise.resolve({ violations: [] })
}

// Mock image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />
  },
}))

// Mock Link component
vi.mock('next/link', () => ({
  default: ({ children, href, passHref, legacyBehavior, ...props }: any) => {
    // With legacyBehavior, Link expects an anchor as child
    if (legacyBehavior) {
      return React.cloneElement(children, { href })
    }
    return <a href={href} {...props}>{children}</a>
  },
}))

// Utility to create mock form data
export const createMockFormData = (data: Record<string, any>) => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value)
  })
  return formData
}

// Utility to wait for async updates
export const waitForAsyncUpdates = async () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}