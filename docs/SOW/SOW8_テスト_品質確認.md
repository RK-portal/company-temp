# SOW8: テスト & 品質確認

## 目的/範囲
企業向けホームページテンプレートの品質を保証するための包括的なテスト環境を構築する。ユニットテスト、E2Eテスト、アクセシビリティテスト、パフォーマンステストを実装し、継続的な品質監視体制を確立する。

## 成果物
- テスト設定ファイル（vitest.config.ts、playwright.config.ts）
- ユニットテスト（tests/unit/）
- E2Eテスト（tests/e2e/）
- アクセシビリティテスト（tests/a11y/）
- パフォーマンステスト設定（.lighthouserc.js）
- テストユーティリティ（tests/utils/）
- GitHub Actions設定（.github/workflows/test.yml）
- テストデータ（tests/fixtures/）
- テストドキュメント（docs/TESTING.md）
- 品質チェックリスト（docs/QUALITY_CHECKLIST.md）

## 依存関係
- SOW1～7の完了
- Vitest（ユニットテスト）
- Playwright（E2Eテスト）
- @axe-core/playwright（アクセシビリティ）
- lighthouse-ci（パフォーマンス）
- @testing-library/react（コンポーネントテスト）

## 変更対象（ファイル/配置）
```
/
├── tests/
│   ├── unit/                    # ユニットテスト
│   │   ├── components/         # コンポーネントテスト
│   │   ├── lib/               # ユーティリティテスト
│   │   └── hooks/             # フックテスト
│   ├── e2e/                    # E2Eテスト
│   │   ├── scenarios/         # テストシナリオ
│   │   └── pages/             # ページオブジェクト
│   ├── a11y/                   # アクセシビリティテスト
│   ├── utils/                  # テストユーティリティ
│   │   ├── test-helpers.ts
│   │   └── mock-data.ts
│   └── fixtures/               # テストデータ
├── .github/
│   └── workflows/
│       ├── test.yml            # テスト実行
│       └── lighthouse.yml      # パフォーマンス監視
├── vitest.config.ts            # Vitest設定
├── playwright.config.ts        # Playwright設定
├── .lighthouserc.js           # Lighthouse CI設定
└── docs/
    ├── TESTING.md             # テストガイド
    └── QUALITY_CHECKLIST.md   # 品質チェックリスト
```

## コンポーネント責務/Props契約

### テストユーティリティ
- **renderWithProviders**: プロバイダー付きレンダリング
- **createMockData**: モックデータ生成
- **waitForAnimation**: アニメーション待機
- **checkA11y**: アクセシビリティチェック

### ページオブジェクト（E2E）
- **HomePage**: トップページ操作
- **ContactPage**: お問い合わせページ操作
- **WorksPage**: 施工事例ページ操作
- **Navigation**: ナビゲーション操作

## UI挙動
- テスト実行中のローディング表示なし（ヘッドレス）
- E2Eテストでの実際のユーザー操作シミュレーション
- アクセシビリティ違反の詳細レポート
- パフォーマンス指標の継続的モニタリング

## A11y配慮
- 全ページでWCAG 2.1 AA準拠確認
- キーボードナビゲーションテスト
- スクリーンリーダー互換性テスト
- 色コントラスト自動チェック
- ARIA属性の適切性検証

## 受け入れ基準（DoD）
1. ユニットテストカバレッジ80%以上
2. 全E2Eシナリオがパス
3. アクセシビリティ違反0件（Critical/Serious）
4. Lighthouse Performance Score 90以上
5. TypeScriptエラー0件
6. ESLintエラー0件
7. ビルドエラー0件
8. CI/CDパイプライン正常動作
9. テストドキュメント完成
10. 品質チェックリスト全項目クリア

## 除外項目
- ビジュアルリグレッションテスト（Percy等）
- 負荷テスト
- セキュリティペネトレーションテスト
- 国際化（i18n）テスト
- ブラウザ互換性の手動テスト

## Claude Code実装メモ
1. vitest.config.tsでReact Testing Library統合、カバレッジ設定
2. playwright.config.tsで複数ブラウザ（Chrome、Firefox、Safari）設定
3. tests/unit/components/でButton、Card等の主要コンポーネントテスト作成
4. tests/e2e/scenarios/でユーザーフロー3シナリオ実装
5. tests/a11y/で各ページのaxe-coreによる自動チェック実装
6. .lighthouserc.jsでperformance、accessibility、seo、best-practicesの閾値設定
7. GitHub Actionsでプルリクエスト時の自動テスト実行設定
8. tests/utils/test-helpers.tsでカスタムレンダラー、モックプロバイダー実装
9. docs/TESTING.mdにテスト実行方法、新規テスト追加ガイドライン記載
10. docs/QUALITY_CHECKLIST.mdにリリース前の手動確認項目リスト作成