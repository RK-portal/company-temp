/**
 * 設定ファイル統合エクスポート
 * 
 * すべての設定ファイルを一箇所からインポートできます。
 * 
 * 使用例:
 * import { companyConfig, themeConfig, homeConfig } from '@/config'
 */

// 基本設定
export { companyConfig } from './company.config'
export type { CompanyConfig } from './company.config'

export { themeConfig } from './theme.config'
export type { ThemeConfig } from './theme.config'

// 既存の設定（互換性のため）
export { siteConfig } from './site'
export { mainNavigation, utilityNavigation, footerNavigation } from './navigation'

// ページ別設定
export { homeConfig } from './pages/home.config'
export type { HomeConfig } from './pages/home.config'

export { aboutConfig } from './pages/about.config'
export type { AboutConfig } from './pages/about.config'

export { servicesConfig } from './pages/services.config'
export type { ServicesConfig } from './pages/services.config'

export { contactConfig } from './pages/contact.config'
export type { ContactConfig } from './pages/contact.config'

export { qualityConfig } from './pages/quality.config'
export type { QualityConfig } from './pages/quality.config'

export { warrantyConfig } from './pages/warranty.config'
export type { WarrantyConfig } from './pages/warranty.config'

// 設定をまとめたオブジェクト（必要に応じて使用）
export const config = {
  company: require('./company.config').companyConfig,
  theme: require('./theme.config').themeConfig,
  pages: {
    home: require('./pages/home.config').homeConfig,
    about: require('./pages/about.config').aboutConfig,
    services: require('./pages/services.config').servicesConfig,
    contact: require('./pages/contact.config').contactConfig,
    quality: require('./pages/quality.config').qualityConfig,
    warranty: require('./pages/warranty.config').warrantyConfig,
  },
  navigation: {
    main: require('./navigation').mainNavigation,
    utility: require('./navigation').utilityNavigation,
    footer: require('./navigation').footerNavigation,
  }
}

// デフォルトエクスポート
export default config