import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const pages = [
  { name: 'Homepage', url: '/' },
  { name: 'Services', url: '/services' },
  { name: 'Works', url: '/works' },
  { name: 'Blog', url: '/blog' },
  { name: 'About', url: '/about' },
  { name: 'Contact', url: '/contact' },
]

test.describe('Accessibility Tests', () => {
  pages.forEach(({ name, url }) => {
    test(`${name} page should have no accessibility violations`, async ({ page }) => {
      await page.goto(url)
      await page.waitForLoadState('networkidle')
      
      // axe-coreでアクセシビリティチェック
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()
      
      expect(accessibilityScanResults.violations).toEqual([])
    })

    test(`${name} page should have proper heading structure`, async ({ page }) => {
      await page.goto(url)
      
      // h1タグが1つだけ存在することを確認
      const h1Count = await page.locator('h1').count()
      expect(h1Count).toBe(1)
      
      // ヘディングレベルが順序通りになっているか確認
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').all()
      let previousLevel = 0
      
      for (const heading of headings) {
        const tagName = await heading.evaluate(el => el.tagName)
        const currentLevel = parseInt(tagName.substring(1))
        
        // レベルが2以上飛ばないことを確認
        if (previousLevel > 0) {
          expect(currentLevel - previousLevel).toBeLessThanOrEqual(1)
        }
        
        previousLevel = currentLevel
      }
    })

    test(`${name} page should have proper landmark regions`, async ({ page }) => {
      await page.goto(url)
      
      // 必須のランドマークが存在するか確認
      await expect(page.locator('header, [role="banner"]')).toBeVisible()
      await expect(page.locator('main, [role="main"]')).toBeVisible()
      await expect(page.locator('footer, [role="contentinfo"]')).toBeVisible()
      
      // ナビゲーションが存在するか確認
      await expect(page.locator('nav, [role="navigation"]').first()).toBeVisible()
    })

    test(`${name} page should have proper image alt text`, async ({ page }) => {
      await page.goto(url)
      
      // すべての画像を取得
      const images = await page.locator('img').all()
      
      for (const image of images) {
        const alt = await image.getAttribute('alt')
        const isDecorative = await image.getAttribute('role') === 'presentation'
        
        if (!isDecorative) {
          // 装飾的でない画像にはalt属性が必要
          expect(alt).not.toBeNull()
          expect(alt).not.toBe('')
        }
      }
    })

    test(`${name} page should have sufficient color contrast`, async ({ page }) => {
      await page.goto(url)
      
      // axe-coreで色コントラストをチェック
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2aa'])
        .include('body')
        .analyze()
      
      const colorContrastViolations = accessibilityScanResults.violations.filter(
        violation => violation.id === 'color-contrast'
      )
      
      expect(colorContrastViolations).toEqual([])
    })
  })

  test('Forms should have proper labels', async ({ page }) => {
    await page.goto('/contact')
    
    // すべての入力フィールドを取得
    const inputs = await page.locator('input:not([type="hidden"]), textarea, select').all()
    
    for (const input of inputs) {
      const inputId = await input.getAttribute('id')
      const inputName = await input.getAttribute('name')
      const ariaLabel = await input.getAttribute('aria-label')
      const ariaLabelledby = await input.getAttribute('aria-labelledby')
      
      if (inputId) {
        // 対応するlabelが存在するか確認
        const label = page.locator(`label[for="${inputId}"]`)
        const hasLabel = await label.count() > 0
        
        // labelまたはaria-labelのいずれかが必要
        expect(hasLabel || ariaLabel || ariaLabelledby).toBeTruthy()
      }
    }
  })

  test('Interactive elements should be keyboard accessible', async ({ page }) => {
    await page.goto('/')
    
    // すべてのインタラクティブ要素を取得
    const interactiveElements = await page.locator('a, button, input, textarea, select, [tabindex]').all()
    
    for (const element of interactiveElements) {
      const tabindex = await element.getAttribute('tabindex')
      
      // tabindexが正の値でないことを確認（キーボードナビゲーションの順序を乱さない）
      if (tabindex) {
        expect(parseInt(tabindex)).toBeLessThanOrEqual(0)
      }
      
      // disabledでない限り、フォーカス可能であることを確認
      const isDisabled = await element.isDisabled()
      if (!isDisabled) {
        const isFocusable = await element.evaluate(el => {
          el.focus()
          return document.activeElement === el
        })
        expect(isFocusable).toBeTruthy()
      }
    }
  })

  test('Skip to main content link should exist and work', async ({ page }) => {
    await page.goto('/')
    
    // Skip to main contentリンクを探す
    const skipLink = page.locator('a').filter({ hasText: /skip|メイン|main content/i }).first()
    
    if (await skipLink.count() > 0) {
      // リンクが最初のフォーカス可能要素であることを確認
      await page.keyboard.press('Tab')
      const focusedElement = await page.evaluate(() => document.activeElement?.textContent)
      expect(focusedElement).toMatch(/skip|メイン|main content/i)
      
      // リンクをクリックしてメインコンテンツに移動
      await page.keyboard.press('Enter')
      
      // フォーカスがメインコンテンツに移動したことを確認
      const mainContent = await page.locator('main, [role="main"]').first()
      await expect(mainContent).toBeInViewport()
    }
  })

  test('Error messages should be properly announced', async ({ page }) => {
    await page.goto('/contact')
    
    // 空のフォームを送信してエラーを発生させる
    await page.getByRole('button', { name: /送信|submit/i }).click()
    
    // エラーメッセージを探す
    const errorMessages = await page.locator('[role="alert"], .error-message').all()
    
    for (const error of errorMessages) {
      // エラーメッセージがaria-liveリージョンにあるか確認
      const ariaLive = await error.getAttribute('aria-live')
      const parentAriaLive = await error.evaluate(el => {
        const parent = el.closest('[aria-live]')
        return parent?.getAttribute('aria-live')
      })
      
      expect(ariaLive || parentAriaLive).toBeTruthy()
    }
  })

  test('Focus indicators should be visible', async ({ page }) => {
    await page.goto('/')
    
    // キーボードでナビゲート
    const focusableElements = ['a', 'button', 'input', 'textarea', 'select']
    
    for (const selector of focusableElements) {
      const element = page.locator(selector).first()
      if (await element.count() > 0) {
        await element.focus()
        
        // フォーカスインジケーターが表示されているか確認
        const outlineStyle = await element.evaluate(el => {
          const styles = window.getComputedStyle(el)
          return {
            outlineWidth: styles.outlineWidth,
            outlineStyle: styles.outlineStyle,
            outlineColor: styles.outlineColor,
            boxShadow: styles.boxShadow,
          }
        })
        
        // アウトラインまたはボックスシャドウでフォーカスが示されていることを確認
        const hasOutline = outlineStyle.outlineStyle !== 'none' && outlineStyle.outlineWidth !== '0px'
        const hasBoxShadow = outlineStyle.boxShadow !== 'none' && outlineStyle.boxShadow !== ''
        
        expect(hasOutline || hasBoxShadow).toBeTruthy()
      }
    }
  })

  test('ARIA attributes should be used correctly', async ({ page }) => {
    await page.goto('/')
    
    // aria-labelledbyが参照する要素が存在するか確認
    const elementsWithLabelledby = await page.locator('[aria-labelledby]').all()
    for (const element of elementsWithLabelledby) {
      const labelledbyIds = await element.getAttribute('aria-labelledby')
      if (labelledbyIds) {
        const ids = labelledbyIds.split(' ')
        for (const id of ids) {
          const referencedElement = page.locator(`#${id}`)
          await expect(referencedElement).toHaveCount(1)
        }
      }
    }
    
    // aria-describedbyが参照する要素が存在するか確認
    const elementsWithDescribedby = await page.locator('[aria-describedby]').all()
    for (const element of elementsWithDescribedby) {
      const describedbyIds = await element.getAttribute('aria-describedby')
      if (describedbyIds) {
        const ids = describedbyIds.split(' ')
        for (const id of ids) {
          const referencedElement = page.locator(`#${id}`)
          await expect(referencedElement).toHaveCount(1)
        }
      }
    }
  })
})