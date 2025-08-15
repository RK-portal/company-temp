import { Page, Locator } from '@playwright/test'

export class ContactPage {
  readonly page: Page
  readonly form: Locator
  readonly companyInput: Locator
  readonly nameInput: Locator
  readonly emailInput: Locator
  readonly phoneInput: Locator
  readonly subjectInput: Locator
  readonly messageTextarea: Locator
  readonly privacyCheckbox: Locator
  readonly submitButton: Locator
  readonly errorMessages: Locator
  readonly successMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.form = page.locator('form')
    this.companyInput = page.getByLabel(/会社名|company/i)
    this.nameInput = page.getByLabel(/氏名|名前|name/i)
    this.emailInput = page.getByLabel(/メール|email/i)
    this.phoneInput = page.getByLabel(/電話|phone|tel/i)
    this.subjectInput = page.getByLabel(/件名|subject/i)
    this.messageTextarea = page.getByLabel(/メッセージ|内容|message/i)
    this.privacyCheckbox = page.getByRole('checkbox', { name: /プライバシー|privacy/i })
    this.submitButton = page.getByRole('button', { name: /送信|submit/i })
    this.errorMessages = page.locator('.error-message, [role="alert"]')
    this.successMessage = page.locator('.success-message, [data-testid="success-message"]')
  }

  async goto() {
    await this.page.goto('/contact')
  }

  async fillForm(data: {
    company: string
    name: string
    email: string
    phone: string
    subject: string
    message: string
    acceptPrivacy?: boolean
  }) {
    await this.companyInput.fill(data.company)
    await this.nameInput.fill(data.name)
    await this.emailInput.fill(data.email)
    await this.phoneInput.fill(data.phone)
    await this.subjectInput.fill(data.subject)
    await this.messageTextarea.fill(data.message)
    
    if (data.acceptPrivacy !== false) {
      await this.privacyCheckbox.check()
    }
  }

  async submitForm() {
    await this.submitButton.click()
  }

  async getErrorMessages() {
    const errors = await this.errorMessages.allTextContents()
    return errors.filter(text => text.trim() !== '')
  }

  async isSuccessMessageVisible() {
    return this.successMessage.isVisible()
  }

  async waitForSuccessMessage() {
    await this.successMessage.waitFor({ state: 'visible', timeout: 10000 })
  }

  async getFieldError(fieldName: 'company' | 'name' | 'email' | 'phone' | 'subject' | 'message') {
    const fieldMap = {
      company: this.companyInput,
      name: this.nameInput,
      email: this.emailInput,
      phone: this.phoneInput,
      subject: this.subjectInput,
      message: this.messageTextarea,
    }
    
    const field = fieldMap[fieldName]
    const fieldContainer = field.locator('..')
    const error = fieldContainer.locator('.error-message, .text-red-500')
    
    if (await error.isVisible()) {
      return error.textContent()
    }
    return null
  }

  async isFormValid() {
    const errors = await this.getErrorMessages()
    return errors.length === 0
  }

  async clearForm() {
    await this.companyInput.clear()
    await this.nameInput.clear()
    await this.emailInput.clear()
    await this.phoneInput.clear()
    await this.subjectInput.clear()
    await this.messageTextarea.clear()
    await this.privacyCheckbox.uncheck()
  }

  async isSubmitButtonEnabled() {
    return this.submitButton.isEnabled()
  }

  async getFormValues() {
    return {
      company: await this.companyInput.inputValue(),
      name: await this.nameInput.inputValue(),
      email: await this.emailInput.inputValue(),
      phone: await this.phoneInput.inputValue(),
      subject: await this.subjectInput.inputValue(),
      message: await this.messageTextarea.inputValue(),
      acceptPrivacy: await this.privacyCheckbox.isChecked(),
    }
  }
}