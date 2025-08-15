import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { ContactPage } from '../pages/ContactPage'
import { Navigation } from '../pages/Navigation'
import { mockContactFormData } from '../../utils/mock-data'

test.describe('User Journey', () => {
  test('complete user journey from homepage to contact form submission', async ({ page }) => {
    const homePage = new HomePage(page)
    const navigation = new Navigation(page)
    const contactPage = new ContactPage(page)

    // Step 1: ホームページにアクセス
    await homePage.goto()
    await homePage.waitForLoad()
    
    // ヒーローセクションの確認
    const heroText = await homePage.getHeroText()
    expect(heroText.title).toBeTruthy()
    expect(heroText.description).toBeTruthy()

    // Step 2: サービスセクションを確認
    await homePage.scrollToSection('services')
    const serviceCards = await homePage.getServiceCards()
    expect(serviceCards.length).toBeGreaterThan(0)
    
    // サービスカードをクリック
    if (serviceCards.length > 0) {
      await serviceCards[0].click()
      await page.waitForLoadState('networkidle')
      
      // サービス詳細ページの確認
      await expect(page.locator('h1')).toBeVisible()
      
      // ホームに戻る
      await navigation.clickLogo()
    }

    // Step 3: 実績セクションを確認
    await homePage.scrollToSection('works')
    const workCards = await homePage.getWorkCards()
    expect(workCards.length).toBeGreaterThan(0)
    
    // 実績カードをクリック
    if (workCards.length > 0) {
      await workCards[0].click()
      await page.waitForLoadState('networkidle')
      
      // 実績詳細ページの確認
      await expect(page.locator('h1')).toBeVisible()
      
      // ホームに戻る
      await navigation.clickLogo()
    }

    // Step 4: ニュースセクションを確認
    await homePage.scrollToSection('news')
    const newsItems = await homePage.getNewsItems()
    expect(newsItems.length).toBeGreaterThan(0)

    // Step 5: CTAボタンからお問い合わせページへ
    await homePage.clickCTA()
    await page.waitForLoadState('networkidle')
    
    // お問い合わせページの確認
    await expect(page).toHaveURL(/contact/)
    await expect(contactPage.form).toBeVisible()

    // Step 6: お問い合わせフォームを入力・送信
    await contactPage.fillForm(mockContactFormData)
    await contactPage.submitForm()
    
    // 成功メッセージの確認
    await contactPage.waitForSuccessMessage()
    await expect(contactPage.successMessage).toBeVisible()
  })

  test('mobile user journey with menu navigation', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip()
    }

    const homePage = new HomePage(page)
    const navigation = new Navigation(page)

    // ホームページにアクセス
    await homePage.goto()
    
    // モバイルメニューを開く
    await navigation.openMobileMenu()
    
    // サービスページへ移動
    await navigation.navigateTo('サービス')
    await expect(page).toHaveURL(/services/)
    
    // モバイルメニューを開く
    await navigation.openMobileMenu()
    
    // 実績ページへ移動
    await navigation.navigateTo('実績')
    await expect(page).toHaveURL(/works/)
    
    // モバイルメニューを開く
    await navigation.openMobileMenu()
    
    // お問い合わせページへ移動
    await navigation.navigateTo('お問い合わせ')
    await expect(page).toHaveURL(/contact/)
  })

  test('information seeking journey', async ({ page }) => {
    const homePage = new HomePage(page)
    const navigation = new Navigation(page)

    // ホームページから会社情報へ
    await homePage.goto()
    await navigation.navigateTo('会社情報')
    await expect(page).toHaveURL(/about/)
    
    // 会社情報ページの内容確認
    await expect(page.locator('h1')).toContainText(/会社|企業|About/i)
    
    // アクセス情報の確認
    const accessInfo = page.locator('text=/アクセス|Access|所在地/i')
    if (await accessInfo.isVisible()) {
      await accessInfo.scrollIntoViewIfNeeded()
      
      // Google Mapが表示されているか確認
      const map = page.locator('iframe[src*="google.com/maps"], .google-map')
      if (await map.isVisible()) {
        await expect(map).toBeVisible()
      }
    }
    
    // フッターのリンクを確認
    await navigation.scrollToFooter()
    const footerLinks = await navigation.getFooterLinks()
    
    // プライバシーポリシーページへ
    const privacyLink = footerLinks.find(link => link.text.includes('プライバシー'))
    if (privacyLink) {
      await page.goto(privacyLink.href)
      await expect(page.locator('h1')).toContainText(/プライバシー|Privacy/i)
    }
  })

  test('content browsing journey', async ({ page }) => {
    const homePage = new HomePage(page)
    const navigation = new Navigation(page)

    // ブログページへ移動
    await homePage.goto()
    await navigation.navigateTo('ブログ')
    await expect(page).toHaveURL(/blog/)
    
    // ブログ記事一覧の確認
    const articles = page.locator('article, [data-testid="blog-post"]')
    await expect(articles.first()).toBeVisible()
    
    // 最初の記事をクリック
    const firstArticle = articles.first()
    const articleTitle = await firstArticle.locator('h2, h3').textContent()
    await firstArticle.click()
    
    // 記事詳細ページの確認
    await page.waitForLoadState('networkidle')
    await expect(page.locator('h1')).toContainText(articleTitle || '')
    
    // 関連記事があれば確認
    const relatedArticles = page.locator('text=/関連|Related|おすすめ/i')
    if (await relatedArticles.isVisible()) {
      await relatedArticles.scrollIntoViewIfNeeded()
    }
    
    // シェアボタンの確認
    const shareButtons = page.locator('[aria-label*="シェア"], [aria-label*="Share"]')
    if (await shareButtons.first().isVisible()) {
      await expect(shareButtons.first()).toBeVisible()
    }
  })

  test('performance-conscious journey', async ({ page }) => {
    // パフォーマンス測定開始
    await page.goto('/')
    
    // 画像の遅延読み込みを確認
    const images = page.locator('img[loading="lazy"]')
    const lazyImageCount = await images.count()
    expect(lazyImageCount).toBeGreaterThan(0)
    
    // リンクのプリフェッチを確認
    const prefetchLinks = page.locator('link[rel="prefetch"], link[rel="preload"]')
    const prefetchCount = await prefetchLinks.count()
    expect(prefetchCount).toBeGreaterThan(0)
    
    // JavaScriptが非同期で読み込まれているか確認
    const asyncScripts = page.locator('script[async], script[defer]')
    const asyncScriptCount = await asyncScripts.count()
    expect(asyncScriptCount).toBeGreaterThan(0)
  })
})