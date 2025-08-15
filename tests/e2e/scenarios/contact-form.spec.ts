import { test, expect } from '@playwright/test'
import { ContactPage } from '../pages/ContactPage'
import { mockContactFormData } from '../../utils/mock-data'

test.describe('Contact Form', () => {
  let contactPage: ContactPage

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page)
    await contactPage.goto()
  })

  test('should display contact form with all fields', async () => {
    await expect(contactPage.form).toBeVisible()
    await expect(contactPage.companyInput).toBeVisible()
    await expect(contactPage.nameInput).toBeVisible()
    await expect(contactPage.emailInput).toBeVisible()
    await expect(contactPage.phoneInput).toBeVisible()
    await expect(contactPage.subjectInput).toBeVisible()
    await expect(contactPage.messageTextarea).toBeVisible()
    await expect(contactPage.privacyCheckbox).toBeVisible()
    await expect(contactPage.submitButton).toBeVisible()
  })

  test('should submit form successfully with valid data', async ({ page }) => {
    // フォームに入力
    await contactPage.fillForm(mockContactFormData)
    
    // 送信前の確認
    const formValues = await contactPage.getFormValues()
    expect(formValues.company).toBe(mockContactFormData.company)
    expect(formValues.email).toBe(mockContactFormData.email)
    
    // フォーム送信
    await contactPage.submitForm()
    
    // 成功メッセージの確認
    await contactPage.waitForSuccessMessage()
    await expect(contactPage.successMessage).toBeVisible()
    
    // サンクスページまたは成功メッセージの内容確認
    const successText = await contactPage.successMessage.textContent()
    expect(successText).toContain('送信')
  })

  test('should show validation errors for empty required fields', async () => {
    // 何も入力せずに送信
    await contactPage.submitForm()
    
    // エラーメッセージの確認
    const errors = await contactPage.getErrorMessages()
    expect(errors.length).toBeGreaterThan(0)
    
    // 各フィールドのエラー確認
    expect(await contactPage.getFieldError('company')).toContain('会社名')
    expect(await contactPage.getFieldError('name')).toContain('氏名')
    expect(await contactPage.getFieldError('email')).toContain('メール')
    expect(await contactPage.getFieldError('phone')).toContain('電話')
    expect(await contactPage.getFieldError('subject')).toContain('件名')
    expect(await contactPage.getFieldError('message')).toContain('内容')
  })

  test('should validate email format', async () => {
    // 無効なメールアドレスで送信
    await contactPage.fillForm({
      ...mockContactFormData,
      email: 'invalid-email',
    })
    await contactPage.submitForm()
    
    // メールフィールドのエラー確認
    const emailError = await contactPage.getFieldError('email')
    expect(emailError).toContain('メールアドレス')
  })

  test('should validate phone number format', async () => {
    // 無効な電話番号で送信
    await contactPage.fillForm({
      ...mockContactFormData,
      phone: 'abc-defg-hijk',
    })
    await contactPage.submitForm()
    
    // 電話番号フィールドのエラー確認
    const phoneError = await contactPage.getFieldError('phone')
    expect(phoneError).toContain('電話番号')
  })

  test('should require privacy policy acceptance', async () => {
    // プライバシーポリシーに同意せずに送信
    await contactPage.fillForm({
      ...mockContactFormData,
      acceptPrivacy: false,
    })
    await contactPage.submitForm()
    
    // エラーメッセージの確認
    const errors = await contactPage.getErrorMessages()
    const privacyError = errors.find(error => error.includes('プライバシー'))
    expect(privacyError).toBeTruthy()
  })

  test('should validate message minimum length', async () => {
    // 短いメッセージで送信
    await contactPage.fillForm({
      ...mockContactFormData,
      message: '短い',
    })
    await contactPage.submitForm()
    
    // メッセージフィールドのエラー確認
    const messageError = await contactPage.getFieldError('message')
    expect(messageError).toContain('10文字以上')
  })

  test('should clear form after successful submission', async ({ page }) => {
    // フォーム送信
    await contactPage.fillForm(mockContactFormData)
    await contactPage.submitForm()
    
    // 成功を待つ
    await contactPage.waitForSuccessMessage()
    
    // フォームがクリアされているか確認（新しいフォームページに遷移するか、フォームがリセットされる）
    const currentUrl = page.url()
    if (currentUrl.includes('/contact')) {
      // 同じページの場合、フォームがクリアされているか確認
      const formValues = await contactPage.getFormValues()
      expect(formValues.company).toBe('')
      expect(formValues.name).toBe('')
      expect(formValues.email).toBe('')
    } else {
      // サンクスページに遷移している場合
      expect(currentUrl).toContain('thanks')
    }
  })

  test('should handle form submission with network error', async ({ page }) => {
    // ネットワークエラーをシミュレート
    await page.route('**/api/contact', route => route.abort())
    
    // フォーム送信
    await contactPage.fillForm(mockContactFormData)
    await contactPage.submitForm()
    
    // エラーメッセージの確認
    await page.waitForTimeout(1000) // エラー表示を待つ
    const errorMessage = await page.locator('text=/エラー|失敗|Error/i').first()
    await expect(errorMessage).toBeVisible()
  })

  test('should maintain form data on validation error', async () => {
    // 一部のフィールドのみ入力
    const partialData = {
      company: 'テスト会社',
      name: 'テスト太郎',
      email: 'invalid-email', // 無効なメール
      phone: mockContactFormData.phone,
      subject: mockContactFormData.subject,
      message: mockContactFormData.message,
    }
    
    await contactPage.fillForm(partialData)
    await contactPage.submitForm()
    
    // エラー後もデータが保持されているか確認
    const formValues = await contactPage.getFormValues()
    expect(formValues.company).toBe(partialData.company)
    expect(formValues.name).toBe(partialData.name)
    expect(formValues.email).toBe(partialData.email)
  })

  test('should be accessible with keyboard navigation', async ({ page }) => {
    // Tabキーでフォーム内を移動
    await page.keyboard.press('Tab') // Skip to main content link
    await page.keyboard.press('Tab') // Company field
    
    // 会社名入力
    await page.keyboard.type('キーボード会社')
    
    // 次のフィールドへ
    await page.keyboard.press('Tab')
    await page.keyboard.type('キーボード太郎')
    
    // 全フィールドをTabで移動できることを確認
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab')
    }
    
    // 送信ボタンにフォーカスがあることを確認
    const focusedElement = await page.evaluate(() => document.activeElement?.textContent)
    expect(focusedElement).toContain('送信')
  })
})