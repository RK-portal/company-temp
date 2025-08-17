/**
 * 企業基本情報設定
 * 
 * このファイルを編集することで、サイト全体で使用される会社情報を変更できます。
 * - 会社名、ロゴ
 * - 住所、連絡先
 * - SNSリンク
 * - 会社概要（設立日、資本金など）
 * - 沿革
 */

export const companyConfig = {
  // 基本情報
  name: "株式会社サンプル",
  logo: {
    src: "/images/logo.svg",
    alt: "株式会社サンプル",
    width: 180,
    height: 40,
  },
  
  // 会社詳細
  details: {
    established: "2010年4月1日",
    capital: "5,000万円",
    employees: "120名（2024年1月現在）",
    president: "山田 太郎",
    business: [
      "住宅建築・リフォーム事業",
      "不動産仲介事業",
      "建築資材の販売",
      "住宅メンテナンスサービス"
    ],
  },
  
  // 所在地
  address: {
    postal: "100-0001",
    prefecture: "東京都",
    city: "千代田区",
    street: "千代田1-1-1",
    building: "サンプルビル10F",
    full: "〒100-0001 東京都千代田区千代田1-1-1 サンプルビル10F", // フォーマット済み
  },
  
  // 連絡先
  contact: {
    tel: "03-1234-5678",
    fax: "03-1234-5679",
    email: "info@example.com",
    businessHours: "平日 9:00-18:00",
  },
  
  // 地図座標
  coordinates: {
    lat: 35.6762,
    lng: 139.6503,
  },
  
  // アクセス情報
  access: {
    train: [
      "東京メトロ丸ノ内線「大手町駅」C1出口より徒歩5分",
      "JR各線「東京駅」丸の内北口より徒歩10分",
    ],
    car: [
      "首都高速都心環状線「神田橋IC」より5分",
      "※お客様用駐車場を3台分ご用意しております",
    ],
  },
  
  // SNSリンク
  social: {
    twitter: "https://twitter.com/example",
    facebook: "https://facebook.com/example",
    linkedin: "https://linkedin.com/company/example",
    instagram: "", // 使用しない場合は空文字
    youtube: "", // 使用しない場合は空文字
  },
  
  // 沿革
  history: [
    {
      id: "history-1",
      date: "2010年4月",
      title: "会社設立",
      description: "東京都千代田区にて株式会社サンプルを設立"
    },
    {
      id: "history-2",
      date: "2012年8月",
      title: "本社移転",
      description: "事業拡大に伴い、現在の本社ビルへ移転"
    },
    {
      id: "history-3",
      date: "2015年3月",
      title: "リフォーム事業開始",
      description: "住宅リフォーム・リノベーション事業を本格的に開始"
    },
    {
      id: "history-4",
      date: "2018年6月",
      title: "ISO9001認証取得",
      description: "品質マネジメントシステムの国際規格認証を取得"
    },
    {
      id: "history-5",
      date: "2020年10月",
      title: "創業10周年",
      description: "おかげさまで創業10周年を迎える"
    },
    {
      id: "history-6",
      date: "2022年4月",
      title: "メンテナンス事業強化",
      description: "住宅の長期メンテナンスサービスを拡充"
    }
  ],
  
  // 経営理念
  philosophy: {
    mission: {
      title: "ミッション",
      content: "住まいを通じて、人々の幸せな暮らしを創造する",
      description: "私たちは、単に建物を建てるだけでなく、そこに住む人々の生活や夢を形にすることを使命としています。"
    },
    vision: {
      title: "ビジョン",
      content: "地域No.1の信頼される住宅建築パートナー",
      description: "技術力、サービス、そして何より信頼において、地域で最も選ばれる企業を目指します。"
    },
    values: [
      {
        title: "誠実",
        description: "お客様との約束を必ず守る"
      },
      {
        title: "品質",
        description: "妥協のない高品質な住まいづくり"
      },
      {
        title: "革新",
        description: "新しい技術と価値の創造"
      },
      {
        title: "共創",
        description: "お客様と共に理想を実現"
      }
    ]
  },
  
  // SEO・メタ情報
  seo: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
    siteName: 'コーポレートサイト',
    description: '株式会社サンプルの企業情報をお届けします',
    locale: 'ja',
  },
  
  // フッター情報
  footer: {
    copyright: `© ${new Date().getFullYear()} 株式会社サンプル All rights reserved.`,
  }
}

// 型定義
export type CompanyConfig = typeof companyConfig