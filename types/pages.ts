import { type BreadcrumbItem } from './navigation'

export interface PageHeroProps {
  title: string
  subtitle?: string
  image: string
  breadcrumb: BreadcrumbItem[]
}

export interface FeatureItem {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

export interface StatItem {
  id: string
  value: number
  suffix?: string
  label: string
}

export interface TimelineItem {
  id: string
  date: string
  title: string
  description: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface CompanyData {
  name: string
  established: string
  capital: string
  employees: string
  president: string
  business: string[]
  address: {
    postal: string
    prefecture: string
    city: string
    street: string
    building?: string
  }
  phone: string
  fax: string
  email: string
  coordinates: {
    lat: number
    lng: number
  }
  history: TimelineItem[]
}

export interface ContactFormData {
  company: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  privacy: boolean
}

export interface PageMetadata {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
}