# 貢献ガイドライン

企業向けホームページテンプレートプロジェクトへの貢献をご検討いただき、ありがとうございます。このガイドラインでは、プロジェクトへの貢献方法について説明します。

## 目次

1. [行動規範](#行動規範)
2. [貢献の方法](#貢献の方法)
3. [開発環境のセットアップ](#開発環境のセットアップ)
4. [コーディング規約](#コーディング規約)
5. [コミットメッセージ](#コミットメッセージ)
6. [プルリクエスト](#プルリクエスト)
7. [イシューの報告](#イシューの報告)
8. [テスト](#テスト)
9. [ドキュメント](#ドキュメント)

## 行動規範

### 基本原則

- **敬意を持って接する**: すべての貢献者に対して敬意を持って接してください
- **建設的なフィードバック**: 批判ではなく、改善提案を心がけてください
- **多様性を尊重**: 異なる視点や経験を歓迎します
- **協力的な姿勢**: チームワークを大切にしてください

### 禁止事項

- ハラスメント行為
- 差別的な言動
- 個人攻撃
- 不適切なコンテンツの投稿

## 貢献の方法

### 1. バグ報告

バグを発見した場合は、以下の手順で報告してください：

1. [Issues](https://github.com/your-repo/issues)を確認し、同じバグが既に報告されていないか確認
2. 新しいIssueを作成し、バグレポートテンプレートを使用
3. 再現手順、期待される動作、実際の動作を明確に記載

### 2. 機能提案

新しい機能のアイデアがある場合：

1. [Discussions](https://github.com/your-repo/discussions)で提案を投稿
2. コミュニティからのフィードバックを収集
3. 合意が得られたら、Issueを作成

### 3. コード貢献

コードの貢献は以下の流れで行います：

1. リポジトリをフォーク
2. 新しいブランチを作成
3. 変更を実装
4. テストを実行
5. プルリクエストを作成

## 開発環境のセットアップ

### 必要なツール

- Node.js 18.17.0以上
- pnpm 8.x以上
- Git
- VS Code（推奨）

### セットアップ手順

```bash
# 1. リポジトリをフォーク
# GitHubでForkボタンをクリック

# 2. フォークしたリポジトリをクローン
git clone https://github.com/your-username/company-demo-site.git
cd company-demo-site

# 3. アップストリームを設定
git remote add upstream https://github.com/original-repo/company-demo-site.git

# 4. 依存関係をインストール
pnpm install

# 5. 開発サーバーを起動
pnpm dev
```

### ブランチ戦略

```bash
# 機能開発
git checkout -b feature/機能名

# バグ修正
git checkout -b fix/バグ名

# ドキュメント更新
git checkout -b docs/更新内容

# リファクタリング
git checkout -b refactor/対象名
```

## コーディング規約

### TypeScript

```typescript
// ✅ Good: 明確な型定義
interface UserProps {
  name: string
  age: number
  email?: string
}

// ❌ Bad: any型の使用
interface UserProps {
  data: any
}

// ✅ Good: 関数の型定義
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0)
}

// ✅ Good: Enumの使用
enum Status {
  Pending = 'pending',
  Completed = 'completed',
  Failed = 'failed'
}
```

### React

```tsx
// ✅ Good: 関数コンポーネント
export function Button({ children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  )
}

// ✅ Good: カスタムフックの命名
function useScrollPosition() {
  // ...
}

// ✅ Good: Props の分割代入
function Card({ title, description, image }: CardProps) {
  // ...
}
```

### CSS/Tailwind

```tsx
// ✅ Good: Tailwindクラスの整理
<div className={cn(
  'flex items-center justify-between',
  'p-4 rounded-lg',
  'bg-white shadow-md',
  'hover:shadow-lg transition-shadow'
)} />

// ❌ Bad: 長すぎるクラス文字列
<div className="flex items-center justify-between p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow" />

// ✅ Good: レスポンシブクラスの順序
<div className="w-full md:w-1/2 lg:w-1/3" />
```

### ファイル構造

```
components/
├── ui/                 # 基本UIコンポーネント
│   ├── Button.tsx      # コンポーネント本体
│   ├── Button.test.tsx # テストファイル
│   └── index.ts        # エクスポート
├── sections/           # セクションコンポーネント
└── layout/            # レイアウトコンポーネント
```

### 命名規則

```typescript
// コンポーネント: PascalCase
export function UserProfile() {}

// 関数: camelCase
function calculateTotalPrice() {}

// 定数: UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3

// ファイル名
- コンポーネント: PascalCase.tsx
- ユーティリティ: camelCase.ts
- 型定義: types.ts
```

## コミットメッセージ

[Conventional Commits](https://www.conventionalcommits.org/)の形式に従います。

### フォーマット

```
<type>(<scope>): <subject>

<body>

<footer>
```

### タイプ

- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメントのみの変更
- `style`: コードの意味に影響しない変更（空白、フォーマット等）
- `refactor`: バグ修正や機能追加を伴わないコード変更
- `perf`: パフォーマンス改善
- `test`: テストの追加・修正
- `build`: ビルドシステムや外部依存関係の変更
- `ci`: CI設定ファイルとスクリプトの変更
- `chore`: その他の変更

### 例

```bash
# 新機能
feat(contact): お問い合わせフォームにreCAPTCHA追加

# バグ修正
fix(header): モバイルメニューの表示不具合を修正

# ドキュメント
docs(readme): セットアップ手順を更新

# リファクタリング
refactor(utils): 日付フォーマット関数を最適化

# Breaking Change
feat(api)!: APIレスポンス形式を変更

BREAKING CHANGE: レスポンスのデータ構造が変更されました
```

## プルリクエスト

### PRを作成する前に

- [ ] すべてのテストが通過している
- [ ] ESLintエラーがない
- [ ] TypeScriptエラーがない
- [ ] ドキュメントを更新した（必要な場合）
- [ ] CHANGELOGを更新した（必要な場合）

### PRテンプレート

```markdown
## 概要
このPRで実装した内容の概要を記載

## 変更内容
- [ ] 実装した機能や修正した内容
- [ ] UI/UXの変更点
- [ ] APIの変更点

## テスト
- [ ] ユニットテストを追加/更新
- [ ] E2Eテストを追加/更新
- [ ] 手動テストを実施

## スクリーンショット
UI変更がある場合は、変更前後のスクリーンショットを添付

## 関連Issue
Fixes #123
```

### レビュープロセス

1. **自動チェック**: CI/CDが自動的に実行されます
2. **コードレビュー**: 最低1名のレビュアーが承認
3. **マージ**: メンテナーがマージを実行

### レビューのポイント

- コードの品質と可読性
- パフォーマンスへの影響
- セキュリティの考慮
- テストカバレッジ
- ドキュメントの更新

## イシューの報告

### バグレポート

```markdown
## バグの概要
バグの簡潔な説明

## 再現手順
1. '...'に移動
2. '...'をクリック
3. '...'までスクロール
4. エラーが表示される

## 期待される動作
期待される正しい動作の説明

## 実際の動作
実際に起きている動作の説明

## スクリーンショット
可能であればスクリーンショットを添付

## 環境
- OS: [例: macOS 13.0]
- ブラウザ: [例: Chrome 120]
- バージョン: [例: v1.0.0]

## 追加情報
問題解決に役立つその他の情報
```

### 機能リクエスト

```markdown
## 機能の概要
提案する機能の簡潔な説明

## 動機
なぜこの機能が必要なのか

## 提案する解決策
どのように実装すべきか

## 代替案
検討した他の解決策

## 追加情報
その他の関連情報
```

## テスト

### テストの実行

```bash
# すべてのテストを実行
pnpm test

# ウォッチモードで実行
pnpm test:watch

# カバレッジレポート付きで実行
pnpm test:coverage

# E2Eテストを実行
pnpm test:e2e
```

### テストの作成

```typescript
// コンポーネントテストの例
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    screen.getByText('Click me').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### E2Eテストの作成

```typescript
// E2Eテストの例
import { test, expect } from '@playwright/test'

test('contact form submission', async ({ page }) => {
  await page.goto('/contact')
  
  await page.fill('input[name="name"]', 'テスト太郎')
  await page.fill('input[name="email"]', 'test@example.com')
  await page.fill('textarea[name="message"]', 'テストメッセージ')
  
  await page.click('button[type="submit"]')
  
  await expect(page).toHaveURL('/contact/thanks')
  await expect(page.locator('h1')).toContainText('送信完了')
})
```

## ドキュメント

### ドキュメントの更新

以下の場合はドキュメントの更新が必要です：

- 新しい機能の追加
- APIの変更
- 設定方法の変更
- 依存関係の更新

### ドキュメントの種類

- **README.md**: プロジェクトの概要とセットアップ
- **API.md**: 内部APIの仕様
- **CHANGELOG.md**: バージョンごとの変更履歴
- **コード内コメント**: 複雑なロジックの説明

### ドキュメントの書き方

```markdown
# 明確な見出し

## 概要
機能の簡潔な説明。

## 使用方法
\`\`\`typescript
// コード例
import { someFunction } from '@/lib/utils'

const result = someFunction(param)
\`\`\`

## パラメータ
| 名前 | 型 | 必須 | 説明 |
|------|-----|------|------|
| param | string | Yes | パラメータの説明 |

## 戻り値
戻り値の説明。

## 例
実際の使用例を記載。
```

---

ご質問やご提案がある場合は、[Discussions](https://github.com/your-repo/discussions)でお気軽にお問い合わせください。

最終更新: 2025-08-14