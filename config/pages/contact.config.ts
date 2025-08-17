/**
 * お問い合わせページ設定
 * 
 * このファイルを編集することで、お問い合わせページの内容を変更できます。
 * - フォーム項目
 * - 営業時間・連絡先情報
 * - よくある質問へのリンク
 */

export const contactConfig = {
  // メタ情報
  metadata: {
    title: "お問い合わせ",
    description: "新築・リフォーム・メンテナンスのご相談、お見積もりなど、お気軽にお問い合わせください。",
    keywords: ["お問い合わせ", "相談", "見積もり", "資料請求"]
  },
  
  // ページヒーロー
  hero: {
    title: "お問い合わせ",
    subtitle: "お住まいに関するご相談、お見積もりなど、お気軽にお問い合わせください",
    backgroundImage: "/images/hero-contact.jpg"
  },
  
  // お問い合わせ前の案内
  introduction: {
    title: "お問い合わせの前に",
    items: [
      {
        icon: "QuestionMarkCircleIcon",
        title: "よくあるご質問",
        description: "お客様からよくいただくご質問をまとめています",
        link: {
          text: "FAQを見る",
          href: "/faq"
        }
      },
      {
        icon: "DocumentTextIcon",
        title: "資料請求",
        description: "詳しい資料をご希望の方はこちらから",
        link: {
          text: "資料請求フォームへ",
          href: "/documents"
        }
      }
    ]
  },
  
  // フォーム設定
  form: {
    title: "お問い合わせフォーム",
    description: "以下のフォームに必要事項をご入力ください。",
    
    // フィールド設定
    fields: {
      // お問い合わせ種別
      inquiryType: {
        label: "お問い合わせ種別",
        required: true,
        options: [
          { value: "consultation", label: "無料相談" },
          { value: "estimate", label: "お見積もり" },
          { value: "maintenance", label: "メンテナンス" },
          { value: "other", label: "その他" }
        ]
      },
      
      // お名前
      name: {
        label: "お名前",
        placeholder: "山田 太郎",
        required: true,
        maxLength: 50
      },
      
      // フリガナ
      nameKana: {
        label: "フリガナ",
        placeholder: "ヤマダ タロウ",
        required: true,
        maxLength: 50
      },
      
      // メールアドレス
      email: {
        label: "メールアドレス",
        placeholder: "example@email.com",
        required: true,
        type: "email"
      },
      
      // 電話番号
      phone: {
        label: "電話番号",
        placeholder: "03-1234-5678",
        required: true,
        type: "tel"
      },
      
      // 郵便番号
      postalCode: {
        label: "郵便番号",
        placeholder: "100-0001",
        required: false,
        pattern: "\\d{3}-\\d{4}"
      },
      
      // 住所
      address: {
        label: "ご住所",
        placeholder: "東京都千代田区千代田1-1-1",
        required: false,
        maxLength: 200
      },
      
      // 希望連絡方法
      preferredContact: {
        label: "希望連絡方法",
        required: true,
        options: [
          { value: "email", label: "メール" },
          { value: "phone", label: "電話" },
          { value: "both", label: "どちらでも可" }
        ]
      },
      
      // お問い合わせ内容
      message: {
        label: "お問い合わせ内容",
        placeholder: "お問い合わせ内容をご入力ください",
        required: true,
        rows: 6,
        maxLength: 1000
      },
      
      // プライバシーポリシー同意
      privacy: {
        label: "プライバシーポリシーに同意する",
        required: true,
        link: {
          text: "プライバシーポリシー",
          href: "/privacy"
        }
      }
    },
    
    // 送信後のメッセージ
    submitMessage: {
      success: {
        title: "お問い合わせありがとうございます",
        description: "内容を確認の上、担当者よりご連絡させていただきます。"
      },
      error: {
        title: "送信エラー",
        description: "申し訳ございません。送信中にエラーが発生しました。お手数ですが、しばらく経ってから再度お試しください。"
      }
    },
    
    // バリデーションメッセージ
    validation: {
      required: "必須項目です",
      email: "正しいメールアドレスを入力してください",
      phone: "正しい電話番号を入力してください",
      maxLength: "文字数が多すぎます"
    }
  },
  
  // 営業時間・連絡先情報
  contactInfo: {
    title: "お電話でのお問い合わせ",
    phone: {
      number: "03-1234-5678",
      label: "お電話でのお問い合わせ",
      hours: "平日 9:00-18:00",
      description: "土日祝日は留守番電話対応となります"
    },
    
    emergency: {
      title: "緊急のご連絡",
      number: "080-1234-5678",
      description: "メンテナンス契約のお客様専用（24時間対応）",
      note: "※契約者番号をお手元にご用意ください"
    },
    
    office: {
      title: "ご来社でのご相談",
      hours: {
        weekday: "平日 9:00-18:00",
        saturday: "土曜 10:00-17:00",
        sunday: "日曜・祝日 休業"
      },
      note: "ご来社の際は事前にご予約をお願いいたします",
      link: {
        text: "アクセス情報を見る",
        href: "/company#access"
      }
    }
  },
  
  // その他の問い合わせ方法
  otherMethods: {
    title: "その他のお問い合わせ方法",
    items: [
      {
        icon: "EnvelopeIcon",
        title: "メール",
        description: "info@example.com",
        note: "返信に2-3営業日かかる場合があります"
      },
      {
        icon: "ChatBubbleLeftRightIcon",
        title: "LINE",
        description: "公式LINEアカウント",
        link: {
          text: "友だち追加",
          href: "https://line.me/..."
        }
      },
      {
        icon: "DocumentTextIcon",
        title: "FAX",
        description: "03-1234-5679",
        note: "24時間受付"
      }
    ]
  },
  
  // プライバシーに関する注意事項
  privacyNotice: {
    title: "個人情報の取り扱いについて",
    content: `ご入力いただいた個人情報は、お問い合わせへの回答、
ご相談内容の確認、サービスのご案内のみに使用いたします。
お客様の同意なく第三者に提供することはございません。`
  }
}

// 型定義
export type ContactConfig = typeof contactConfig