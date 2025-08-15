import { Page, Locator } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly heroSection: Locator
  readonly heroTitle: Locator
  readonly heroDescription: Locator
  readonly ctaButton: Locator
  readonly servicesSection: Locator
  readonly worksSection: Locator
  readonly newsSection: Locator
  readonly aboutSection: Locator
  readonly contactSection: Locator

  constructor(page: Page) {
    this.page = page
    this.heroSection = page.locator('section').first()
    this.heroTitle = this.heroSection.locator('h1')
    this.heroDescription = this.heroSection.locator('p').first()
    this.ctaButton = this.heroSection.locator('a', { hasText: /お問い合わせ|問い合わせ/i })
    this.servicesSection = page.locator('section', { has: page.locator('h2', { hasText: /サービス/i }) })
    this.worksSection = page.locator('section', { has: page.locator('h2', { hasText: /実績|事例/i }) })
    this.newsSection = page.locator('section', { has: page.locator('h2', { hasText: /ニュース|お知らせ/i }) })
    this.aboutSection = page.locator('section', { has: page.locator('h2', { hasText: /会社|企業/i }) })
    this.contactSection = page.locator('section', { has: page.locator('h2', { hasText: /お問い合わせ|問い合わせ/i }) })
  }

  async goto() {
    await this.page.goto('/')
  }

  async waitForLoad() {
    await this.heroSection.waitFor({ state: 'visible' })
  }

  async clickCTA() {
    await this.ctaButton.click()
  }

  async getServiceCards() {
    return this.servicesSection.locator('[data-testid="service-card"], .card').all()
  }

  async getWorkCards() {
    return this.worksSection.locator('[data-testid="work-card"], .card').all()
  }

  async getNewsItems() {
    return this.newsSection.locator('[data-testid="news-item"], article').all()
  }

  async scrollToSection(section: 'services' | 'works' | 'news' | 'about' | 'contact') {
    const sectionMap = {
      services: this.servicesSection,
      works: this.worksSection,
      news: this.newsSection,
      about: this.aboutSection,
      contact: this.contactSection,
    }
    await sectionMap[section].scrollIntoViewIfNeeded()
  }

  async isHeroVisible() {
    return this.heroSection.isVisible()
  }

  async getHeroText() {
    return {
      title: await this.heroTitle.textContent(),
      description: await this.heroDescription.textContent(),
    }
  }
}