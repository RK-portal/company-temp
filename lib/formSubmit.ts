import type { FormSubmitData, FormSubmitResponse } from '@/types/integrations'

const FORMSPREE_URL = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID
  ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID}`
  : null

export async function submitForm(data: FormSubmitData): Promise<FormSubmitResponse> {
  try {
    if (!FORMSPREE_URL) {
      console.warn('Formspree form ID not configured. Using mock submission.')
      return mockSubmit(data)
    }

    const response = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        company: data.company || '',
        message: data.message,
        _subject: `お問い合わせ: ${data.name}様より`,
        _replyto: data.email,
        _captcha: data.turnstileToken,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new Error(
        errorData?.error || `送信エラー: ${response.status} ${response.statusText}`
      )
    }

    const result = await response.json()

    return {
      success: true,
      message: 'お問い合わせを受け付けました。担当者より折り返しご連絡いたします。',
    }
  } catch (error) {
    console.error('Form submission error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '送信中にエラーが発生しました。',
    }
  }
}

async function mockSubmit(data: FormSubmitData): Promise<FormSubmitResponse> {
  // 開発環境用のモック送信
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // ランダムにエラーを発生させる（テスト用）
  if (Math.random() < 0.1) {
    return {
      success: false,
      error: 'テスト用エラー: 送信に失敗しました。',
    }
  }

  console.log('Mock form submission:', data)

  return {
    success: true,
    message: '（開発環境）お問い合わせを受け付けました。',
  }
}

export function validateFormData(data: Partial<FormSubmitData>): string[] {
  const errors: string[] = []

  if (!data.name?.trim()) {
    errors.push('お名前を入力してください。')
  }

  if (!data.email?.trim()) {
    errors.push('メールアドレスを入力してください。')
  } else if (!isValidEmail(data.email)) {
    errors.push('有効なメールアドレスを入力してください。')
  }

  if (data.phone && !isValidPhone(data.phone)) {
    errors.push('有効な電話番号を入力してください。')
  }

  if (!data.message?.trim()) {
    errors.push('お問い合わせ内容を入力してください。')
  } else if (data.message.length < 10) {
    errors.push('お問い合わせ内容は10文字以上で入力してください。')
  }

  return errors
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function isValidPhone(phone: string): boolean {
  // 日本の電話番号形式（ハイフンあり・なし両対応）
  const phoneRegex = /^0\d{1,4}-?\d{1,4}-?\d{3,4}$/
  return phoneRegex.test(phone.replace(/[ー－―]/g, '-'))
}