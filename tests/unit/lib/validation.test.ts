import { describe, it, expect } from 'vitest'
import { contactFormSchema, ContactFormData } from '@/lib/validation'

describe('contactFormSchema', () => {
  const validData: ContactFormData = {
    company: 'テスト株式会社',
    name: 'テスト太郎',
    email: 'test@example.com',
    phone: '03-1234-5678',
    subject: 'お問い合わせ',
    message: 'これはテストメッセージです。',
    privacy: true,
  }

  it('validates correct data', () => {
    const result = contactFormSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  describe('company field', () => {
    it('requires company name', () => {
      const data = { ...validData, company: '' }
      const result = contactFormSchema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('会社名を入力してください')
      }
    })

    it('accepts valid company name', () => {
      const data = { ...validData, company: '株式会社ABC' }
      const result = contactFormSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  describe('name field', () => {
    it('requires name', () => {
      const data = { ...validData, name: '' }
      const result = contactFormSchema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('氏名を入力してください')
      }
    })

    it('accepts valid name', () => {
      const data = { ...validData, name: '山田 太郎' }
      const result = contactFormSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  describe('email field', () => {
    it('requires email', () => {
      const data = { ...validData, email: '' }
      const result = contactFormSchema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('メールアドレスを入力してください')
      }
    })

    it('validates email format', () => {
      const data = { ...validData, email: 'invalid-email' }
      const result = contactFormSchema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('正しいメールアドレスを入力してください')
      }
    })

    it('accepts valid email formats', () => {
      const validEmails = [
        'test@example.com',
        'user.name@example.co.jp',
        'test+tag@example.com',
        'test_123@sub.example.com',
      ]

      validEmails.forEach((email) => {
        const data = { ...validData, email }
        const result = contactFormSchema.safeParse(data)
        expect(result.success).toBe(true)
      })
    })
  })

  describe('phone field', () => {
    it('requires phone number', () => {
      const data = { ...validData, phone: '' }
      const result = contactFormSchema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('電話番号を入力してください')
      }
    })

    it('validates phone format', () => {
      const data = { ...validData, phone: 'abc-defg-hijk' }
      const result = contactFormSchema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('正しい電話番号を入力してください')
      }
    })

    it('accepts various phone formats', () => {
      const validPhones = [
        '03-1234-5678',
        '090-1234-5678',
        '0312345678',
        '09012345678',
        '+81-3-1234-5678',
        '+81 90 1234 5678',
        '(03) 1234-5678',
        '03 1234 5678',
      ]

      validPhones.forEach((phone) => {
        const data = { ...validData, phone }
        const result = contactFormSchema.safeParse(data)
        expect(result.success).toBe(true)
      })
    })
  })

  describe('subject field', () => {
    it('requires subject', () => {
      const data = { ...validData, subject: '' }
      const result = contactFormSchema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('件名を入力してください')
      }
    })

    it('accepts valid subject', () => {
      const data = { ...validData, subject: 'サービスについての質問' }
      const result = contactFormSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  describe('message field', () => {
    it('requires message', () => {
      const data = { ...validData, message: '' }
      const result = contactFormSchema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('お問い合わせ内容を入力してください')
      }
    })

    it('requires minimum length', () => {
      const data = { ...validData, message: '短い' }
      const result = contactFormSchema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('お問い合わせ内容は10文字以上で入力してください')
      }
    })

    it('accepts message with sufficient length', () => {
      const data = { ...validData, message: 'これは10文字以上のメッセージです。' }
      const result = contactFormSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  describe('privacy field', () => {
    it('requires privacy policy agreement', () => {
      const data = { ...validData, privacy: false }
      const result = contactFormSchema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('プライバシーポリシーに同意してください')
      }
    })

    it('accepts privacy policy agreement', () => {
      const data = { ...validData, privacy: true }
      const result = contactFormSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  describe('multiple errors', () => {
    it('returns all validation errors', () => {
      const data = {
        company: '',
        name: '',
        email: 'invalid',
        phone: 'abc',
        subject: '',
        message: '',
        privacy: false,
      }
      const result = contactFormSchema.safeParse(data)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(1)
      }
    })
  })

  describe('type inference', () => {
    it('infers correct type', () => {
      const data: ContactFormData = {
        company: 'Test Company',
        name: 'Test Name',
        email: 'test@example.com',
        phone: '123-456-7890',
        subject: 'Test Subject',
        message: 'This is a test message.',
        privacy: true,
      }
      
      // TypeScript will check this at compile time
      expect(data.company).toBeTypeOf('string')
      expect(data.privacy).toBeTypeOf('boolean')
    })
  })
})