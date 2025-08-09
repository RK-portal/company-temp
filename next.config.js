/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静的エクスポート設定
  output: 'export',
  
  // 画像最適化無効化（静的エクスポート時に必要）
  images: {
    unoptimized: true,
  },
  
  // React Strict Modeを有効化
  reactStrictMode: true,
  
  // 本番環境でもソースマップを生成（開発時のデバッグ用）
  productionBrowserSourceMaps: true,
}

module.exports = nextConfig