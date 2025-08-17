/**
 * 保証制度ページ設定
 * 
 * このファイルを編集することで、保証制度ページの内容を変更できます。
 * - ページヒーロー情報
 * - 保証制度の説明
 * - 保証特徴
 * - 保証内容の詳細
 * - 定期点検スケジュール
 */

export const warrantyConfig = {
  // メタ情報
  metadata: {
    title: '保証制度',
    description: '構造躯体10年保証、防水5年保証をはじめ、充実した保証制度で建築後も安心をお約束します。',
    keywords: ['住宅保証', '瑕疵保証', '定期点検', 'アフターサービス']
  },
  
  // ページヒーロー
  hero: {
    title: "保証制度",
    subtitle: "建築後も続く安心。充実の保証制度でお客様の暮らしを守ります",
    backgroundImage: "/images/hero-warranty.jpg",
    breadcrumb: [
      { id: 'home', label: 'ホーム', href: '/' },
      { id: 'warranty', label: '保証制度', href: '/warranty' },
    ]
  },
  
  // 保証制度の説明
  introduction: {
    title: "建てた後も、ずっと安心",
    content: `住まいは建てて終わりではありません。私たちは充実した保証制度と
定期的な点検サービスにより、お客様が安心して長く暮らせる環境を
サポートします。万が一の不具合にも迅速に対応いたします。`
  },
  
  // 保証特徴
  features: [
    {
      id: 'warranty-feature-1',
      title: '長期構造保証',
      description: '基礎・柱・梁などの構造耐力上主要な部分について、10年間の瑕疵保証をご提供。延長保証制度もご用意しています。',
      icon: 'ShieldCheck',
    },
    {
      id: 'warranty-feature-2',
      title: '定期点検サービス',
      description: '3ヶ月、1年、2年、5年、10年の定期点検を無料で実施。住まいの状態を継続的にチェックします。',
      icon: 'Clock',
    },
    {
      id: 'warranty-feature-3',
      title: '保証書の発行',
      description: '保証内容を明記した保証書を発行。保証期間・保証範囲・免責事項などを明確にお示しします。',
      icon: 'FileText',
    },
    {
      id: 'warranty-feature-4',
      title: '専門スタッフ対応',
      description: '保証に関するご相談は専門スタッフが対応。迅速かつ適切なアフターサービスをご提供します。',
      icon: 'Users',
    },
  ],
  
  // 保証内容の詳細
  warrantyDetails: {
    title: "保証内容の詳細",
    items: [
      {
        target: "構造躯体",
        period: "10年",
        content: "基礎、柱、梁、耐力壁などの構造耐力上主要な部分",
        highlight: true
      },
      {
        target: "防水",
        period: "5年",
        content: "屋根、外壁、バルコニーなどの雨水浸入防止部分",
        highlight: false
      },
      {
        target: "設備機器",
        period: "2年",
        content: "給排水設備、電気設備、換気設備などの住宅設備",
        highlight: false
      },
      {
        target: "内装仕上げ",
        period: "2年",
        content: "クロス、フローリング、建具などの内装仕上げ材",
        highlight: false
      }
    ],
    
    // 延長保証
    extendedWarranty: {
      title: "延長保証制度について",
      description: `基本保証期間終了後も、有償にて保証期間を延長できる制度をご用意しています。
最長20年まで延長可能で、より長期的な安心をご提供します。
詳細は担当スタッフまでお問い合わせください。`
    }
  },
  
  // 定期点検スケジュール
  inspectionSchedule: {
    title: "定期点検スケジュール",
    timeline: [
      {
        period: '3ヶ月',
        content: '初期不具合の確認、設備の使用状況チェック'
      },
      {
        period: '1年',
        content: '季節を通じた住まいの状態確認、メンテナンス指導'
      },
      {
        period: '2年',
        content: '設備機器・内装仕上げの保証期限前総点検'
      },
      {
        period: '5年',
        content: '防水性能の確認、外装の劣化状況チェック'
      },
      {
        period: '10年',
        content: '構造躯体の総点検、今後のメンテナンス計画提案'
      }
    ]
  },
  
  // 保証の流れ
  warrantyProcess: {
    title: "保証サービスご利用の流れ",
    steps: [
      {
        number: 1,
        title: "不具合の発見",
        description: "お住まいで不具合を発見された場合は、すぐにご連絡ください。"
      },
      {
        number: 2,
        title: "受付・確認",
        description: "専門スタッフが状況を詳しくお伺いし、保証対象かどうかを確認します。"
      },
      {
        number: 3,
        title: "現地調査",
        description: "必要に応じて技術スタッフが現地調査を行い、原因を特定します。"
      },
      {
        number: 4,
        title: "補修工事",
        description: "保証対象の場合、速やかに補修工事を実施します。"
      },
      {
        number: 5,
        title: "完了確認",
        description: "補修完了後、お客様立会いのもと仕上がりを確認していただきます。"
      }
    ]
  },
  
  // 保証対象外の項目
  exclusions: {
    title: "保証対象外となる主な事項",
    items: [
      "自然災害（地震、台風、洪水など）による損害",
      "お客様の故意または過失による損害",
      "通常の使用による経年劣化や消耗",
      "当社以外の者が行った増改築や補修に起因する不具合",
      "保証書に記載された定期点検を受けていない場合"
    ]
  },
  
  // FAQ関連
  faq: {
    title: "保証に関するよくあるご質問",
    // FAQデータは既存のfaq.jsonから取得
    useExistingData: true,
    dataKey: "warranty" // faq.jsonのwarrantyセクションを使用
  }
}

// 型定義
export type WarrantyConfig = typeof warrantyConfig