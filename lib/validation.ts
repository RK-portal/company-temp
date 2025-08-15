import { z } from 'zod'

export const contactFormSchema = z.object({
  company: z.string().min(1, '会社名を入力してください'),
  name: z.string().min(1, '氏名を入力してください'),
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email('正しいメールアドレスを入力してください'),
  phone: z
    .string()
    .min(1, '電話番号を入力してください')
    .regex(
      /^[\d-+() ]+$/,
      '正しい電話番号を入力してください'
    ),
  subject: z.string().min(1, '件名を入力してください'),
  message: z
    .string()
    .min(1, 'お問い合わせ内容を入力してください')
    .min(10, 'お問い合わせ内容は10文字以上で入力してください'),
  privacy: z
    .boolean()
    .refine((val) => val === true, {
      message: 'プライバシーポリシーに同意してください',
    }),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export const documentRequestSchema = z.object({
  name: z.string().min(1, 'お名前を入力してください'),
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email('正しいメールアドレスを入力してください'),
  phone: z.string().optional(),
  company: z.string().optional(),
  deliveryMethod: z.enum(['download', 'mail'], {
    required_error: 'お届け方法を選択してください',
  }),
  postalCode: z.string().optional(),
  address: z.string().optional(),
  message: z.string().optional(),
  privacy: z
    .boolean()
    .refine((val) => val === true, {
      message: 'プライバシーポリシーに同意してください',
    }),
}).refine(
  (data) => {
    if (data.deliveryMethod === 'mail') {
      return data.postalCode && data.address
    }
    return true
  },
  {
    message: '郵送の場合は郵便番号と住所が必要です',
    path: ['postalCode'],
  }
)

export type DocumentRequestFormData = z.infer<typeof documentRequestSchema>