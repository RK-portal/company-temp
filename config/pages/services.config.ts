/**
 * サービスページ設定
 * 
 * このファイルを編集することで、サービス紹介ページの内容を変更できます。
 * - サービス一覧
 * - サービス詳細
 * - 料金プラン
 * - 施工の流れ
 */

export const servicesConfig = {
  // メタ情報
  metadata: {
    title: "サービス一覧",
    description: "新築住宅、リフォーム・リノベーション、メンテナンスまで、住まいに関するあらゆるサービスをご提供します。",
    keywords: ["新築住宅", "リフォーム", "リノベーション", "メンテナンス", "注文住宅"]
  },
  
  // ページヒーロー
  hero: {
    title: "サービス一覧",
    subtitle: "お客様のニーズに合わせた最適なサービスをご提供します",
    backgroundImage: "/images/hero-services.jpg"
  },
  
  // サービス一覧
  services: [
    {
      id: "new-construction",
      name: "新築住宅",
      slug: "new-construction",
      category: "建築",
      shortDescription: "お客様の理想を形にする注文住宅",
      description: `完全自由設計の注文住宅で、お客様の理想の住まいを実現します。
土地探しから設計、施工まで、専門スタッフが一貫してサポート。
最新の技術と確かな施工力で、長く愛される住まいをお届けします。`,
      image: "/images/service-new-construction-main.jpg",
      
      features: [
        {
          title: "完全自由設計",
          description: "お客様のライフスタイルに合わせた間取り・デザイン",
          icon: "PencilSquareIcon"
        },
        {
          title: "高性能住宅",
          description: "省エネ・耐震・断熱性能に優れた快適な住まい",
          icon: "HomeModernIcon"
        },
        {
          title: "土地探しサポート",
          description: "理想の住まいづくりに最適な土地をご提案",
          icon: "MapPinIcon"
        },
        {
          title: "資金計画相談",
          description: "無理のない返済計画をプロがアドバイス",
          icon: "BanknotesIcon"
        }
      ],
      
      process: [
        {
          step: 1,
          title: "ご相談・ヒアリング",
          description: "お客様のご要望やライフスタイルを詳しくお伺いします"
        },
        {
          step: 2,
          title: "プラン提案・見積もり",
          description: "ご要望に基づいた設計プランと詳細見積もりをご提示"
        },
        {
          step: 3,
          title: "契約・詳細設計",
          description: "契約後、より詳細な設計を進めていきます"
        },
        {
          step: 4,
          title: "着工・施工",
          description: "確かな技術力で丁寧に施工を進めます"
        },
        {
          step: 5,
          title: "竣工・お引き渡し",
          description: "完成検査後、鍵をお渡しします"
        },
        {
          step: 6,
          title: "アフターサービス",
          description: "定期点検など、末永くサポートします"
        }
      ],
      
      pricing: {
        title: "参考価格",
        description: "建物本体価格の目安（土地代別）",
        plans: [
          {
            name: "コンパクトプラン",
            size: "25〜30坪",
            price: "2,000万円〜",
            features: ["2LDK〜3LDK", "コンパクトな敷地に対応", "若い世代に人気"]
          },
          {
            name: "スタンダードプラン",
            size: "30〜40坪",
            price: "2,500万円〜",
            features: ["3LDK〜4LDK", "ファミリー向け", "収納充実"]
          },
          {
            name: "プレミアムプラン",
            size: "40坪〜",
            price: "3,500万円〜",
            features: ["4LDK〜", "ゆとりの空間設計", "高級仕様"]
          }
        ]
      }
    },
    
    {
      id: "renovation",
      name: "リフォーム・リノベーション",
      slug: "renovation",
      category: "改修",
      shortDescription: "住まいに新しい価値を生み出すリフォーム",
      description: `キッチン、バスルーム、トイレなどの水回りから、
外壁、屋根、内装まで、あらゆるリフォームに対応。
部分的な改修から全面リノベーションまで、
お客様のニーズに合わせた最適なプランをご提案します。`,
      image: "/images/service-renovation-main.jpg",
      
      features: [
        {
          title: "水回りリフォーム",
          description: "キッチン・バス・トイレを最新設備に",
          icon: "WrenchScrewdriverIcon"
        },
        {
          title: "外装リフォーム",
          description: "外壁・屋根の塗装や張り替え",
          icon: "HomeIcon"
        },
        {
          title: "内装リフォーム",
          description: "間取り変更や内装の全面リニューアル",
          icon: "PaintBrushIcon"
        },
        {
          title: "バリアフリー化",
          description: "手すり設置や段差解消など",
          icon: "HandRaisedIcon"
        }
      ],
      
      types: [
        {
          name: "キッチンリフォーム",
          description: "最新システムキッチンで快適な料理空間に",
          price: "80万円〜",
          duration: "3〜7日"
        },
        {
          name: "バスルームリフォーム",
          description: "断熱性能も向上する快適なバスルームに",
          price: "100万円〜",
          duration: "4〜7日"
        },
        {
          name: "トイレリフォーム",
          description: "節水型の最新トイレに交換",
          price: "30万円〜",
          duration: "1〜2日"
        },
        {
          name: "外壁塗装",
          description: "美観と防水性能を回復",
          price: "80万円〜",
          duration: "7〜14日"
        },
        {
          name: "全面リノベーション",
          description: "間取りから設備まで全面的に刷新",
          price: "500万円〜",
          duration: "2〜3ヶ月"
        }
      ]
    },
    
    {
      id: "maintenance",
      name: "メンテナンス・アフターサービス",
      slug: "maintenance",
      category: "保守",
      shortDescription: "住まいの健康を守る総合メンテナンス",
      description: `定期点検から緊急対応まで、住まいの困りごとに迅速に対応。
24時間365日の緊急対応体制で、お客様の安心な暮らしをサポートします。
年間メンテナンス契約で、住まいの資産価値を長期的に維持します。`,
      image: "/images/service-maintenance-main.jpg",
      
      features: [
        {
          title: "定期点検",
          description: "年2回の定期点検で早期発見・予防",
          icon: "ClipboardDocumentCheckIcon"
        },
        {
          title: "24時間緊急対応",
          description: "水漏れなどの緊急時も安心",
          icon: "PhoneIcon"
        },
        {
          title: "修繕・補修",
          description: "小さな不具合も迅速に対応",
          icon: "WrenchIcon"
        },
        {
          title: "リフォーム提案",
          description: "ライフステージに合わせた改修提案",
          icon: "LightBulbIcon"
        }
      ],
      
      plans: [
        {
          name: "ベーシックプラン",
          price: "年額 36,000円",
          features: [
            "年2回の定期点検",
            "点検報告書の作成",
            "簡易補修無料（部品代別）",
            "リフォーム相談"
          ]
        },
        {
          name: "スタンダードプラン",
          price: "年額 60,000円",
          features: [
            "年4回の定期点検",
            "24時間緊急対応（年3回まで）",
            "点検報告書の作成",
            "補修工事10%割引"
          ]
        },
        {
          name: "プレミアムプラン",
          price: "年額 120,000円",
          features: [
            "年6回の定期点検",
            "24時間緊急対応（回数無制限）",
            "詳細点検報告書",
            "補修工事20%割引",
            "設備交換優先対応"
          ]
        }
      ]
    }
  ],
  
  // 共通CTA
  cta: {
    title: "お気軽にご相談ください",
    subtitle: "無料相談・お見積もりを承っております",
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
export type ServicesConfig = typeof servicesConfig