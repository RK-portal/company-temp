/**
 * トップページ設定
 * 
 * このファイルを編集することで、トップページの内容を変更できます。
 * - ヒーローセクション（メインビジュアル）
 * - 特徴・強み
 * - サービス紹介
 * - お客様の声
 * - CTA（コールトゥアクション）
 */

export const homeConfig = {
  // メタ情報
  metadata: {
    title: "ホーム",
    description: "確かな技術と信頼で、お客様の理想の住まいを実現します。新築・リフォーム・メンテナンスまでトータルサポート。",
    keywords: ["住宅建築", "リフォーム", "メンテナンス", "注文住宅", "地域密着"]
  },
  
  // ヒーローセクション
  hero: {
    // メインタイトル
    title: {
      line1: "確かな技術と信頼で",
      line2: "理想の住まいを実現"
    },
    
    // サブタイトル
    subtitle: {
      line1: "新築からリフォーム、メンテナンスまで",
      line2: "住まいのことなら何でもお任せください"
    },
    
    // 背景画像
    backgroundImage: "/images/hero-home.jpg",
    
    // CTA（コールトゥアクション）ボタン
    cta: {
      primary: {
        text: "無料相談はこちら",
        href: "/contact",
        style: "primary" // primary | secondary | outline
      },
      secondary: {
        text: "資料請求",
        href: "/documents",
        style: "outline"
      }
    }
  },
  
  // 特徴・強みセクション
  features: {
    title: "私たちの強み",
    subtitle: "お客様に選ばれる3つの理由",
    items: [
      {
        id: "quality",
        title: "高品質な施工",
        description: "熟練の職人による確かな技術力で、長く愛される住まいをご提供します。",
        icon: "CheckBadgeIcon", // アイコン名
        image: "/images/feature-quality.jpg"
      },
      {
        id: "support",
        title: "充実のサポート",
        description: "設計から施工、アフターサービスまで、専任スタッフが一貫してサポートします。",
        icon: "UserGroupIcon",
        image: "/images/feature-support.jpg"
      },
      {
        id: "local",
        title: "地域密着",
        description: "地域の気候や風土を熟知し、その土地に最適な住まいづくりをご提案します。",
        icon: "HomeIcon",
        image: "/images/feature-local.jpg"
      }
    ]
  },
  
  // サービス紹介セクション
  services: {
    title: "サービス一覧",
    subtitle: "住まいに関するあらゆるニーズにお応えします",
    items: [
      {
        id: "new-construction",
        title: "新築住宅",
        description: "お客様の理想を形にする注文住宅。自由設計でこだわりの住まいを実現します。",
        image: "/images/service-new-construction.jpg",
        link: {
          text: "詳しく見る",
          href: "/services/new-construction"
        }
      },
      {
        id: "renovation",
        title: "リフォーム・リノベーション",
        description: "キッチン、バスルーム、外壁など、部分的なリフォームから全面改装まで対応。",
        image: "/images/service-renovation.jpg",
        link: {
          text: "詳しく見る",
          href: "/services/renovation"
        }
      },
      {
        id: "maintenance",
        title: "メンテナンス",
        description: "定期点検から緊急対応まで、住まいの健康を守る総合メンテナンスサービス。",
        image: "/images/service-maintenance.jpg",
        link: {
          text: "詳しく見る",
          href: "/services/maintenance"
        }
      }
    ]
  },
  
  // 実績・数値セクション
  stats: {
    title: "数字で見る実績",
    items: [
      {
        id: "construction",
        label: "施工実績",
        value: "2,500",
        unit: "件以上",
        icon: "BuildingOfficeIcon"
      },
      {
        id: "satisfaction",
        label: "お客様満足度",
        value: "98",
        unit: "%",
        icon: "StarIcon"
      },
      {
        id: "years",
        label: "創業",
        value: "15",
        unit: "年",
        icon: "CalendarIcon"
      },
      {
        id: "staff",
        label: "専門スタッフ",
        value: "120",
        unit: "名",
        icon: "UserGroupIcon"
      }
    ]
  },
  
  // お客様の声セクション
  testimonials: {
    title: "お客様の声",
    subtitle: "実際にご利用いただいたお客様からの評価",
    items: [
      {
        id: "testimonial-1",
        name: "田中様",
        location: "東京都世田谷区",
        project: "新築住宅",
        comment: "理想以上の住まいを建てていただきました。細かい要望にも丁寧に対応していただき、大変満足しています。",
        rating: 5,
        image: "/images/testimonial-1.jpg"
      },
      {
        id: "testimonial-2",
        name: "佐藤様",
        location: "神奈川県横浜市",
        project: "リフォーム",
        comment: "築20年の家が新築のように生まれ変わりました。工事中の対応も丁寧で、安心してお任せできました。",
        rating: 5,
        image: "/images/testimonial-2.jpg"
      },
      {
        id: "testimonial-3",
        name: "鈴木様",
        location: "千葉県柏市",
        project: "メンテナンス",
        comment: "定期的なメンテナンスのおかげで、10年経った今でも快適に暮らせています。迅速な対応にも感謝しています。",
        rating: 5,
        image: "/images/testimonial-3.jpg"
      }
    ]
  },
  
  // ニュース・お知らせセクション
  news: {
    title: "最新情報",
    subtitle: "お知らせ・イベント情報",
    showLatest: 3, // 表示する最新記事数
    link: {
      text: "すべてのお知らせを見る",
      href: "/news"
    }
  },
  
  // CTAセクション（ページ下部）
  cta: {
    title: "理想の住まいづくりを始めませんか？",
    subtitle: "まずは無料相談から。お気軽にお問い合わせください。",
    backgroundImage: "/images/cta-bg.jpg",
    buttons: [
      {
        text: "無料相談を申し込む",
        href: "/contact",
        style: "primary"
      },
      {
        text: "資料請求する",
        href: "/documents",
        style: "secondary"
      }
    ]
  }
}

// 型定義
export type HomeConfig = typeof homeConfig