/**
 * 会社情報ページ設定
 * 
 * このファイルを編集することで、会社情報ページの内容を変更できます。
 * - ページヒーロー
 * - 会社紹介文
 * - 経営理念（ミッション・ビジョン・バリュー）
 * - メッセージ
 * - 施設・設備
 */

export const aboutConfig = {
  // メタ情報
  metadata: {
    title: "会社情報",
    description: "株式会社サンプルの会社概要、沿革、アクセス情報をご紹介します。2010年の創業以来、地域に根ざした住まいづくりを続けています。",
    keywords: ["会社概要", "企業情報", "沿革", "アクセス", "経営理念"]
  },
  
  // ページヒーロー
  hero: {
    title: "会社情報",
    subtitle: "確かな技術と信頼で、地域の住まいづくりに貢献します",
    backgroundImage: "/images/hero-company.jpg"
  },
  
  // 会社紹介セクション
  introduction: {
    title: "私たちについて",
    content: `株式会社サンプルは、2010年の創業以来、地域に根ざした住宅建築会社として
お客様の理想の住まいづくりをサポートしてまいりました。
確かな技術力と豊富な経験、そして何よりお客様との信頼関係を大切に、
これからも地域の皆様に愛される企業を目指してまいります。`,
    image: "/images/about-introduction.jpg"
  },
  
  // 経営理念セクション
  philosophy: {
    title: "経営理念",
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
    values: {
      title: "バリュー",
      items: [
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
    }
  },
  
  // 代表メッセージ
  message: {
    title: "代表メッセージ",
    position: "代表取締役社長",
    name: "山田 太郎",
    content: `お客様の大切な住まいづくりに携わることができることを、
心より感謝申し上げます。

私たちは創業以来、「住まいを通じて人々の幸せな暮らしを創造する」
という理念のもと、一軒一軒心を込めて住まいづくりに取り組んでまいりました。

これからも地域の皆様に愛され、信頼される企業として、
より良い住まいづくりに邁進してまいります。`,
    image: "/images/president.jpg",
    signature: "/images/president-signature.png" // 署名画像（任意）
  },
  
  // 会社概要（詳細情報）
  details: {
    title: "会社概要",
    // companyConfig から情報を取得して表示
    useCompanyConfig: true // trueの場合、company.config.tsの情報を使用
  },
  
  // 沿革
  history: {
    title: "沿革",
    // companyConfig から情報を取得して表示
    useCompanyConfig: true
  },
  
  // 施設・設備
  facilities: {
    title: "施設・設備",
    items: [
      {
        id: "headquarters",
        name: "本社",
        description: "最新の設計システムを導入した快適なオフィス環境",
        image: "/images/facility-headquarters.jpg",
        features: [
          "打ち合わせスペース",
          "CAD設計室",
          "会議室（大・小）",
          "来客用駐車場"
        ]
      },
      {
        id: "showroom",
        name: "ショールーム",
        description: "実際の素材や設備を体感できる展示スペース",
        image: "/images/facility-showroom.jpg",
        features: [
          "キッチン展示",
          "バスルーム展示",
          "建材サンプル",
          "VR体験コーナー"
        ]
      },
      {
        id: "workshop",
        name: "工房・倉庫",
        description: "品質管理を徹底した作業・保管施設",
        image: "/images/facility-workshop.jpg",
        features: [
          "資材保管庫",
          "加工作業場",
          "品質検査室",
          "配送センター"
        ]
      }
    ]
  },
  
  // 認証・資格
  certifications: {
    title: "認証・資格",
    items: [
      {
        id: "iso9001",
        name: "ISO 9001",
        description: "品質マネジメントシステム認証",
        logo: "/images/cert-iso9001.png",
        date: "2018年6月取得"
      },
      {
        id: "construction-license",
        name: "建設業許可",
        description: "国土交通大臣許可（特-1）第○○○○号",
        logo: "/images/cert-construction.png",
        date: "2010年4月取得"
      },
      {
        id: "architect-office",
        name: "一級建築士事務所",
        description: "東京都知事登録 第○○○○号",
        logo: "/images/cert-architect.png",
        date: "2010年4月登録"
      }
    ]
  },
  
  // アクセス情報
  access: {
    title: "アクセス",
    // companyConfig から情報を取得して表示
    useCompanyConfig: true,
    
    // 追加の交通情報
    transportation: {
      title: "交通アクセス",
      train: {
        title: "電車でお越しの方",
        // companyConfig から取得
        useCompanyConfig: true
      },
      car: {
        title: "お車でお越しの方",
        // companyConfig から取得
        useCompanyConfig: true
      }
    },
    
    // Google Map設定
    map: {
      height: "450px",
      zoom: 16,
      // 座標はcompanyConfigから取得
      useCompanyConfig: true
    }
  }
}

// 型定義
export type AboutConfig = typeof aboutConfig