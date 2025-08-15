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