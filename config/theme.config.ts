/**
 * デザイン・ブランド設定
 * 
 * このファイルを編集することで、サイト全体のデザインテーマを変更できます。
 * - ブランドカラー
 * - フォント設定
 * - 画像アセット
 * - スペーシング、影、角丸などのデザイントークン
 */

export const themeConfig = {
  // ブランドカラー設定
  colors: {
    // プライマリーカラー（メインのブランドカラー）
    primary: {
      50: "#e6f2ff",
      100: "#b3d9ff",
      200: "#80bfff",
      300: "#4da6ff",
      400: "#1a8cff",
      500: "#0073e6", // メインカラー
      600: "#005bb3",
      700: "#004380",
      800: "#002b4d",
      900: "#00131a"
    },
    
    // セカンダリーカラー（アクセントカラー）
    secondary: {
      50: "#fef4e6",
      100: "#fce0b3",
      200: "#facc80",
      300: "#f8b84d",
      400: "#f6a41a",
      500: "#f49000", // メインカラー
      600: "#c17300",
      700: "#8e5600",
      800: "#5b3900",
      900: "#281c00"
    },
    
    // ニュートラルカラー（グレー系）
    neutral: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827"
    },
    
    // システムカラー
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
    
    // 基本カラー
    white: "#ffffff",
    black: "#000000",
    transparent: "transparent"
  },
  
  // フォント設定
  fonts: {
    // フォントファミリー
    family: {
      base: "'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      heading: "'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono: "'Menlo', 'Monaco', 'Courier New', monospace"
    },
    
    // フォントサイズ
    size: {
      xs: "0.75rem",    // 12px
      sm: "0.875rem",   // 14px
      base: "1rem",     // 16px
      lg: "1.125rem",   // 18px
      xl: "1.25rem",    // 20px
      "2xl": "1.5rem",  // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem",    // 48px
      "6xl": "3.75rem", // 60px
    },
    
    // フォントウェイト
    weight: {
      thin: "100",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900"
    },
    
    // 行間
    lineHeight: {
      none: "1",
      tight: "1.25",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2"
    }
  },
  
  // 画像アセット
  images: {
    // ロゴ
    logo: {
      light: "/images/logo.svg",
      dark: "/images/logo-dark.svg", // ダークモード用（任意）
    },
    
    // ヒーロー背景画像
    hero: {
      home: "/images/hero-home.jpg",
      about: "/images/hero-company.jpg",
      services: "/images/hero-services.jpg",
      contact: "/images/hero-contact.jpg",
      documents: "/images/hero-documents.jpg",
    },
    
    // プレースホルダー画像
    placeholder: "/images/placeholder.svg",
    
    // その他の画像
    companyBuilding: "/images/company-building.jpg",
    teamPhoto: "/images/team-photo.jpg",
  },
  
  // スペーシング
  spacing: {
    xs: "0.5rem",   // 8px
    sm: "1rem",     // 16px
    md: "1.5rem",   // 24px
    lg: "2rem",     // 32px
    xl: "3rem",     // 48px
    "2xl": "4rem",  // 64px
    "3xl": "6rem",  // 96px
    "4xl": "8rem",  // 128px
  },
  
  // 角丸
  borderRadius: {
    none: "0",
    sm: "0.125rem",  // 2px
    base: "0.25rem", // 4px
    md: "0.375rem",  // 6px
    lg: "0.5rem",    // 8px
    xl: "0.75rem",   // 12px
    "2xl": "1rem",   // 16px
    "3xl": "1.5rem", // 24px
    full: "9999px"
  },
  
  // 影
  boxShadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    none: "none"
  },
  
  // ブレークポイント（レスポンシブ）
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px"
  },
  
  // アニメーション設定
  animation: {
    // トランジション時間
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms"
    },
    
    // イージング
    easing: {
      linear: "linear",
      in: "cubic-bezier(0.4, 0, 1, 1)",
      out: "cubic-bezier(0, 0, 0.2, 1)",
      inOut: "cubic-bezier(0.4, 0, 0.2, 1)"
    }
  },
  
  // レイアウト設定
  layout: {
    // コンテナ最大幅
    maxWidth: "1280px",
    
    // ヘッダー高さ
    headerHeight: {
      mobile: "64px",
      desktop: "80px"
    },
    
    // サイドバー幅
    sidebarWidth: "280px",
    
    // Zインデックス
    zIndex: {
      dropdown: 10,
      sticky: 20,
      fixed: 30,
      modalBackdrop: 40,
      modal: 50,
      popover: 60,
      tooltip: 70
    }
  }
}

// 型定義
export type ThemeConfig = typeof themeConfig