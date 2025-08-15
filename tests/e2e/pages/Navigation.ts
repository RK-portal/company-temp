import { Page, Locator } from '@playwright/test'

export class Navigation {
  readonly page: Page
  readonly header: Locator
  readonly logo: Locator
  readonly menuButton: Locator
  readonly mobileMenu: Locator
  readonly navLinks: Locator
  readonly footer: Locator
  readonly footerLinks: Locator

  constructor(page: Page) {
    this.page = page
    this.header = page.locator('header')
    this.logo = this.header.locator('a').first()
    this.menuButton = this.header.locator('button[aria-label*="メニュー"], button[aria-label*="menu"]')
    this.mobileMenu = page.locator('nav[role="navigation"], [data-testid="mobile-menu"]')
    this.navLinks = page.locator('nav a, header a')
    this.footer = page.locator('footer')
    this.footerLinks = this.footer.locator('a')
  }

  async clickLogo() {
    await this.logo.click()
  }

  async openMobileMenu() {
    if (await this.menuButton.isVisible()) {
      await this.menuButton.click()
      await this.mobileMenu.waitFor({ state: 'visible' })
    }
  }

  async closeMobileMenu() {
    if (await this.mobileMenu.isVisible()) {
      await this.menuButton.click()
      await this.mobileMenu.waitFor({ state: 'hidden' })
    }
  }

  async navigateTo(linkText: string) {
    const link = this.navLinks.filter({ hasText: linkText })
    
    // モバイルの場合はメニューを開く
    if (await this.menuButton.isVisible() && !await link.isVisible()) {
      await this.openMobileMenu()
    }
    
    await link.click()
  }

  async getNavigationItems() {
    const items = await this.navLinks.allTextContents()
    return items.filter(text => text.trim() !== '')
  }

  async isHeaderVisible() {
    return this.header.isVisible()
  }

  async isFooterVisible() {
    return this.footer.isVisible()
  }

  async scrollToFooter() {
    await this.footer.scrollIntoViewIfNeeded()
  }

  async getFooterLinks() {
    const links = await this.footerLinks.all()
    const linkData = []
    
    for (const link of links) {
      const text = await link.textContent()
      const href = await link.getAttribute('href')
      if (text && href) {
        linkData.push({ text: text.trim(), href })
      }
    }
    
    return linkData
  }

  async isLinkActive(linkText: string) {
    const link = this.navLinks.filter({ hasText: linkText })
    const classes = await link.getAttribute('class')
    return classes?.includes('active') || classes?.includes('current')
  }

  async waitForNavigationComplete() {
    await this.page.waitForLoadState('networkidle')
  }

  async isMobileMenuOpen() {
    return this.mobileMenu.isVisible()
  }

  async getLogoText() {
    return this.logo.textContent()
  }

  async checkBreadcrumb(expectedPath: string[]) {
    const breadcrumb = this.page.locator('nav[aria-label="breadcrumb"], .breadcrumb')
    if (await breadcrumb.isVisible()) {
      const items = await breadcrumb.locator('a, span').allTextContents()
      return items.map(text => text.trim()).join(' > ') === expectedPath.join(' > ')
    }
    return false
  }
}