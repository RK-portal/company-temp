/**
 * 品質へのこだわりページ設定
 * 
 * このファイルを編集することで、品質ページの内容を変更できます。
 * - ページヒーロー情報
 * - 品質管理の基本理念
 * - 品質特徴（ISO認証、検査体制など）
 * - 品質管理プロセス
 */

export const qualityConfig = {
  // メタ情報
  metadata: {
    title: '品質へのこだわり',
    description: 'ISO9001認証取得。確かな品質管理体制と熟練の技術で、安心・安全な住まいづくりを実現します。',
    keywords: ['品質管理', 'ISO9001', '建築技術', '検査体制']
  },
  
  // ページヒーロー
  hero: {
    title: "品質へのこだわり",
    subtitle: "確かな技術と厳格な管理で、最高品質の住まいをお届けします",
    backgroundImage: "/images/hero-quality.jpg",
    breadcrumb: [
      { id: 'home', label: 'ホーム', href: '/' },
      { id: 'quality', label: '品質へのこだわり', href: '/quality' },
    ]
  },
  
  // 品質管理の基本理念
  philosophy: {
    title: "品質管理の基本理念",
    content: `私たちは「品質は信頼の証」という理念のもと、お客様に安心して長く住んでいただける
住まいづくりを追求しています。ISO9001認証を取得し、国際標準に基づいた
品質管理体制を構築。全社一丸となって品質向上に取り組んでいます。`
  },
  
  // 品質特徴
  features: [
    {
      id: 'quality-feature-1',
      title: 'ISO9001認証取得',
      description: '国際標準の品質マネジメントシステムを導入し、設計から施工、アフターサービスまで一貫した品質管理を実施しています。',
      icon: 'CheckCircle', // Lucideアイコン名
    },
    {
      id: 'quality-feature-2',
      title: '厳格な検査体制',
      description: '各工程での自主検査に加え、第三者機関による検査も実施。二重三重のチェック体制で品質を保証します。',
      icon: 'FileCheck',
    },
    {
      id: 'quality-feature-3',
      title: '技術者の育成',
      description: '定期的な技術研修と資格取得支援により、スタッフの技術力向上に努めています。マイスター制度も導入。',
      icon: 'GraduationCap',
    },
    {
      id: 'quality-feature-4',
      title: '最新技術の研究',
      description: '建築技術の進化に対応するため、新工法や新素材の研究・導入を積極的に行っています。',
      icon: 'Beaker',
    },
  ],
  
  // 品質管理プロセス
  process: {
    title: "品質管理プロセス",
    steps: [
      {
        number: 1,
        title: "設計段階",
        description: `建築基準法の遵守はもちろん、耐震性・断熱性・省エネ性能など、
高い性能基準を満たす設計を行います。複数の設計者によるクロスチェックも実施。`
      },
      {
        number: 2,
        title: "施工段階",
        description: `各工程ごとに品質チェックリストに基づいた検査を実施。
基礎・構造・防水など重要工程では、写真記録による品質管理も行います。`
      },
      {
        number: 3,
        title: "完成検査",
        description: `社内検査に加え、第三者機関による完成検査を実施。
お客様立会いのもと、仕上がりの確認と設備の使用説明を丁寧に行います。`
      },
      {
        number: 4,
        title: "アフターサービス",
        description: `定期的な点検により、住まいの状態を継続的に管理。
不具合の早期発見・早期対応により、住まいの長寿命化を実現します。`
      }
    ]
  },
  
  // 品質保証の詳細
  guarantee: {
    title: "品質保証体制",
    items: [
      {
        title: "構造体の品質",
        description: "基礎・柱・梁など主要構造部の強度と耐久性を保証",
        period: "10年保証"
      },
      {
        title: "防水性能",
        description: "屋根・外壁・バルコニーなどの防水性能を保証",
        period: "5年保証"
      },
      {
        title: "設備機器",
        description: "給排水・電気設備などの正常な動作を保証",
        period: "2年保証"
      },
      {
        title: "仕上げ材",
        description: "内装・外装の仕上げ材の品質を保証",
        period: "2年保証"
      }
    ]
  },
  
  // 認証・資格
  certifications: [
    {
      name: "ISO 9001:2015",
      description: "品質マネジメントシステム国際規格",
      date: "2018年6月取得",
      logo: "/images/cert-iso9001.png"
    },
    {
      name: "建設業許可",
      description: "国土交通大臣許可（特-1）第○○○○号",
      date: "2010年4月取得"
    },
    {
      name: "住宅性能評価",
      description: "設計・建設住宅性能評価書取得",
      date: "継続取得中"
    }
  ],
  
  // FAQ関連
  faq: {
    title: "品質に関するよくあるご質問",
    // FAQデータは既存のfaq.jsonから取得
    useExistingData: true,
    dataKey: "quality" // faq.jsonのqualityセクションを使用
  }
}

// 型定義
export type QualityConfig = typeof qualityConfig