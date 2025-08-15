import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { Navigation } from '../pages/Navigation'

test.describe('Navigation', () => {
  let homePage: HomePage
  let navigation: Navigation

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    navigation = new Navigation(page)
    await homePage.goto()
  })

  test('should display header and footer', async () => {
    await expect(navigation.header).toBeVisible()
    await expect(navigation.footer).toBeVisible()
  })

  test('should navigate to all main pages', async ({ page }) => {
    const pages = [
      { name: 'サービス', url: '/services' },
      { name: '実績', url: '/works' },
      { name: 'ブログ', url: '/blog' },
      { name: '会社情報', url: '/about' },
      { name: 'お問い合わせ', url: '/contact' },
    ]

    for (const pageInfo of pages) {
      await navigation.navigateTo(pageInfo.name)
      await navigation.waitForNavigationComplete()
      await expect(page).toHaveURL(new RegExp(pageInfo.url))
      
      // ホームに戻る
      await navigation.clickLogo()
      await expect(page).toHaveURL('/')
    }
  })

  test('should handle mobile menu', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip()
    }

    // メニューボタンが表示されているか確認
    await expect(navigation.menuButton).toBeVisible()
    
    // メニューを開く
    await navigation.openMobileMenu()
    await expect(navigation.mobileMenu).toBeVisible()
    
    // メニューアイテムが表示されているか確認
    const menuItems = await navigation.getNavigationItems()
    expect(menuItems.length).toBeGreaterThan(0)
    
    // メニューを閉じる
    await navigation.closeMobileMenu()
    await expect(navigation.mobileMenu).not.toBeVisible()
  })

  test('should scroll to footer and check links', async () => {
    await navigation.scrollToFooter()
    await expect(navigation.footer).toBeInViewport()
    
    const footerLinks = await navigation.getFooterLinks()
    expect(footerLinks.length).toBeGreaterThan(0)
    
    // プライバシーポリシーとターム・オブ・サービスのリンクがあるか確認
    const hasPrivacyPolicy = footerLinks.some(link => 
      link.text.includes('プライバシー') || link.text.includes('Privacy')
    )
    expect(hasPrivacyPolicy).toBeTruthy()
  })

  test('should highlight active navigation item', async ({ page }) => {
    // サービスページに移動
    await navigation.navigateTo('サービス')
    await navigation.waitForNavigationComplete()
    
    // サービスリンクがアクティブになっているか確認
    const isActive = await navigation.isLinkActive('サービス')
    expect(isActive).toBeTruthy()
  })

  test('should handle 404 page', async ({ page }) => {
    // 存在しないページに移動
    await page.goto('/non-existent-page')
    
    // 404ページが表示されているか確認
    await expect(page.locator('h1')).toContainText(/404|見つかりません|Not Found/i)
    
    // ホームへ戻るリンクがあるか確認
    const homeLink = page.locator('a', { hasText: /ホーム|トップ|Home/i })
    await expect(homeLink).toBeVisible()
    
    // ホームに戻る
    await homeLink.click()
    await expect(page).toHaveURL('/')
  })

  test('should have proper SEO meta tags', async ({ page }) => {
    // タイトルタグ
    await expect(page).toHaveTitle(/Acme/i)
    
    // メタディスクリプション
    const description = await page.locator('meta[name="description"]').getAttribute('content')
    expect(description).toBeTruthy()
    expect(description!.length).toBeGreaterThan(50)
    
    // OGPタグ
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content')
    expect(ogTitle).toBeTruthy()
    
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content')
    expect(ogDescription).toBeTruthy()
  })

  test('should navigate using keyboard', async ({ page }) => {
    // Tabキーでナビゲーション
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    
    // 現在フォーカスされている要素を確認
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
    expect(focusedElement).toBe('A')
    
    // Enterキーでナビゲーション
    await page.keyboard.press('Enter')
    await navigation.waitForNavigationComplete()
    
    // ページが変わったことを確認
    const url = page.url()
    expect(url).not.toBe('/')
  })
})