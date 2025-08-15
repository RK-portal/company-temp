# テストガイド

## 概要

本プロジェクトでは、品質保証のために包括的なテスト戦略を採用しています。

## テストの種類

### 1. ユニットテスト
- **フレームワーク**: Vitest + React Testing Library
- **対象**: コンポーネント、hooks、ユーティリティ関数
- **実行**: `npm run test:unit`
- **カバレッジ**: `npm run test:unit:coverage`

### 2. E2Eテスト
- **フレームワーク**: Playwright
- **対象**: ユーザーフロー、画面遷移
- **実行**: `npm run test:e2e`
- **ヘッドレスモード**: `npm run test:e2e:headless`

### 3. アクセシビリティテスト
- **ツール**: Axe-core + Playwright
- **対象**: WCAG 2.1 AA準拠
- **実行**: `npm run test:a11y`

### 4. パフォーマンステスト
- **ツール**: Lighthouse CI
- **対象**: Core Web Vitals、SEO
- **実行**: `npm run test:lighthouse`

## ディレクトリ構造

```
tests/
├── unit/                    # ユニットテスト
│   ├── components/         # コンポーネントテスト
│   ├── lib/               # ユーティリティテスト
│   └── hooks/             # カスタムフックテスト
├── e2e/                    # E2Eテスト
│   ├── scenarios/         # テストシナリオ
│   └── pages/             # ページオブジェクト
├── a11y/                   # アクセシビリティテスト
├── utils/                  # テストユーティリティ
│   ├── test-helpers.ts    # ヘルパー関数
│   └── mock-data.ts       # モックデータ
└── fixtures/               # テストデータ
```

## ユニットテストの書き方

### 基本的な例

```typescript
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '@/components/ui/Button'

describe('Button Component', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    render(<Button onClick={handleClick}>Click</Button>)
    await user.click(screen.getByRole('button'))
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### テストのベストプラクティス

1. **AAA パターン**
   - Arrange: テストの準備
   - Act: アクションの実行
   - Assert: 結果の検証

2. **記述的なテスト名**
   ```typescript
   it('displays error message when form submission fails', async () => {})
   ```

3. **ユーザー視点でのテスト**
   - `getByRole`、`getByLabelText`を優先
   - `data-testid`は最終手段

4. **適切なアサーション**
   ```typescript
   expect(button).toBeInTheDocument()
   expect(button).toBeDisabled()
   expect(input).toHaveValue('test')
   ```

## E2Eテストの書き方

### 基本的な例

```typescript
import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test('submits form successfully', async ({ page }) => {
    await page.goto('/contact')
    
    await page.fill('input[name="name"]', 'テスト太郎')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('textarea[name="message"]', 'テストメッセージ')
    
    await page.click('button[type="submit"]')
    
    await expect(page).toHaveURL('/contact/thanks')
    await expect(page.locator('h1')).toContainText('送信完了')
  })
})
```

### ページオブジェクトパターン

```typescript
// tests/e2e/pages/ContactPage.ts
export class ContactPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/contact')
  }

  async fillForm(data: ContactFormData) {
    await this.page.fill('input[name="name"]', data.name)
    await this.page.fill('input[name="email"]', data.email)
    await this.page.fill('textarea[name="message"]', data.message)
  }

  async submit() {
    await this.page.click('button[type="submit"]')
  }
}
```

## アクセシビリティテスト

### 自動テスト

```typescript
import { test, expect } from '@playwright/test'
import { injectAxe, checkA11y } from '@axe-core/playwright'

test('has no accessibility violations', async ({ page }) => {
  await page.goto('/')
  await injectAxe(page)
  await checkA11y(page, null, {
    detailedReport: true,
    detailedReportOptions: {
      html: true,
    },
  })
})
```

### 手動確認項目

- [ ] キーボードナビゲーション
- [ ] スクリーンリーダー対応
- [ ] カラーコントラスト
- [ ] フォーカス表示
- [ ] 代替テキスト

## CI/CD統合

### GitHub Actions

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run test:all
```

## デバッグ

### Vitestデバッグ

```bash
# UIモードで実行
npm run test:unit:ui

# 特定のファイルのみ実行
npm run test:unit -- Button.test.tsx

# watchモードで実行
npm run test:unit:watch
```

### Playwrightデバッグ

```bash
# デバッグモードで実行
npm run test:e2e:debug

# トレースを有効化
npm run test:e2e -- --trace on

# 特定のブラウザで実行
npm run test:e2e -- --project=chromium
```

## トラブルシューティング

### よくある問題

1. **モジュールが見つからない**
   ```bash
   npm install
   npm run build
   ```

2. **テストがタイムアウトする**
   ```typescript
   test('long running test', async ({ page }) => {
     test.setTimeout(60000) // 60秒に延長
   })
   ```

3. **スナップショットの更新**
   ```bash
   npm run test:unit -- -u
   ```

## 参考リンク

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Playwright Documentation](https://playwright.dev/)
- [Axe-core](https://www.deque.com/axe/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)