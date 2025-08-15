module.exports = {
  ci: {
    collect: {
      // テスト対象のURL
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/services',
        'http://localhost:3000/works',
        'http://localhost:3000/blog',
        'http://localhost:3000/about',
        'http://localhost:3000/contact',
      ],
      // テスト回数（各URLに対して）
      numberOfRuns: 3,
      // 起動するサーバーのコマンド
      startServerCommand: 'npm run build && npm run start',
      startServerReadyPattern: 'ready on',
      // Chrome設定
      settings: {
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        skipAudits: ['uses-http2'], // HTTP/2はローカルでは無効
        // エミュレーション設定
        formFactor: 'desktop',
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        },
        throttling: {
          rttMs: 40,
          throughputKbps: 10 * 1024,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
          cpuSlowdownMultiplier: 1,
        },
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // パフォーマンススコア
        'categories:performance': ['error', { minScore: 0.9 }],
        // アクセシビリティスコア
        'categories:accessibility': ['error', { minScore: 0.9 }],
        // ベストプラクティススコア
        'categories:best-practices': ['error', { minScore: 0.9 }],
        // SEOスコア
        'categories:seo': ['error', { minScore: 0.9 }],
        
        // 個別の重要な指標
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'interactive': ['error', { maxNumericValue: 3500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        
        // アクセシビリティの重要項目
        'color-contrast': 'error',
        'image-alt': 'error',
        'label': 'error',
        'link-name': 'error',
        'button-name': 'error',
        
        // SEOの重要項目
        'document-title': 'error',
        'meta-description': 'error',
        'crawlable-anchors': 'error',
        'structured-data': 'warn',
        
        // セキュリティ
        'is-on-https': 'off', // ローカル環境では無効
        'external-anchors-use-rel-noopener': 'error',
        'no-vulnerable-libraries': 'error',
        
        // 画像最適化
        'uses-responsive-images': 'warn',
        'uses-optimized-images': 'warn',
        'uses-webp-images': 'warn',
        'image-aspect-ratio': 'warn',
        
        // その他のパフォーマンス項目
        'uses-text-compression': 'warn',
        'uses-long-cache-ttl': 'off', // 開発環境では無効
        'dom-size': ['warn', { maxNumericValue: 1500 }],
        
        // JavaScript関連
        'no-unload-listeners': 'error',
        'errors-in-console': 'warn',
        'server-response-time': ['warn', { maxNumericValue: 600 }],
      },
    },
    upload: {
      // CI環境でのアップロード設定（必要に応じて）
      target: 'temporary-public-storage',
    },
  },
}