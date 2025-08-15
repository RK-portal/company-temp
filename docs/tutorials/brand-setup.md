# ブランド設定チュートリアル

このチュートリアルでは、テンプレートをあなたのブランドに合わせてカスタマイズする方法を詳しく説明します。

## 目次

1. [デザイントークンの理解](#デザイントークンの理解)
2. [カラーシステムの設定](#カラーシステムの設定)
3. [タイポグラフィの設定](#タイポグラフィの設定)
4. [ロゴとファビコンの設定](#ロゴとファビコンの設定)
5. [OGP画像の設定](#ogp画像の設定)
6. [高度なカスタマイズ](#高度なカスタマイズ)

## デザイントークンの理解

デザイントークンは、デザインシステムの基本単位です。一箇所で定義することで、サイト全体に一貫性のあるデザインを適用できます。

### トークンファイルの構造

`tokens/brand.json`:

```json
{
  "colors": {
    // メインカラー
    "primary": "#1B4E9B",
    "primary-dark": "#164080",
    "primary-light": "#2563EB",
    
    // サブカラー
    "secondary": "#00A0B0",
    "secondary-dark": "#008090",
    "secondary-light": "#00C0D0",
    
    // システムカラー
    "success": "#10B981",
    "warning": "#F59E0B",
    "error": "#EF4444",
    
    // テキストカラー
    "text": {
      "primary": "#1F2937",
      "secondary": "#6B7280",
      "tertiary": "#9CA3AF",
      "inverse": "#FFFFFF"
    },
    
    // 背景色
    "background": {
      "primary": "#FFFFFF",
      "secondary": "#F9FAFB",
      "tertiary": "#F3F4F6",
      "inverse": "#1F2937"
    }
  }
}
```

## カラーシステムの設定

### ステップ1: ブランドカラーの決定

ブランドカラーを決める際のポイント：

1. **プライマリカラー**: ブランドを代表するメインカラー
2. **セカンダリカラー**: プライマリを補完するサブカラー
3. **アクセントカラー**: CTAボタンなど注目を集めたい要素用

### ステップ2: カラーパレットの作成

```json
{
  "colors": {
    // 例: 建設業向けの信頼感のある配色
    "primary": "#003366",      // 濃紺（信頼感）
    "primary-dark": "#002244",
    "primary-light": "#0055AA",
    
    "secondary": "#8B4513",    // ブラウン（木材、温かみ）
    "secondary-dark": "#654321",
    "secondary-light": "#A0522D",
    
    "accent": "#FF6B35"        // オレンジ（活力、行動喚起）
  }
}
```

### ステップ3: コントラスト比の確認

アクセシビリティを確保するため、以下のコントラスト比を満たすことを確認：

- 通常テキスト: 4.5:1以上
- 大きいテキスト: 3:1以上

オンラインツール: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

## タイポグラフィの設定

### ステップ1: フォントの選択

`tokens/brand.json`:

```json
{
  "typography": {
    "fontFamily": {
      "sans": "'Noto Sans JP', 'Hiragino Sans', sans-serif",
      "display": "'Sawarabi Mincho', serif",  // 見出し用
      "mono": "'Source Code Pro', monospace"   // コード用
    },
    "fontSize": {
      "xs": "0.75rem",    // 12px
      "sm": "0.875rem",   // 14px
      "base": "1rem",     // 16px
      "lg": "1.125rem",   // 18px
      "xl": "1.25rem",    // 20px
      "2xl": "1.5rem",    // 24px
      "3xl": "1.875rem",  // 30px
      "4xl": "2.25rem",   // 36px
      "5xl": "3rem"       // 48px
    }
  }
}
```

### ステップ2: Googleフォントの追加

`app/layout.tsx`:

```typescript
import { Noto_Sans_JP, Sawarabi_Mincho } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans',
  display: 'swap',
})

const sawarabiMincho = Sawarabi_Mincho({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-sawarabi',
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${sawarabiMincho.variable}`}>
      {/* ... */}
    </html>
  )
}
```

## ロゴとファビコンの設定

### ステップ1: ロゴの準備

推奨仕様：
- フォーマット: SVG（拡大縮小に強い）またはPNG（透過背景）
- サイズ: 横幅200-300px、高さ40-60px
- カラーバリエーション: 通常版、白抜き版

ファイル配置：
```
public/
└── images/
    ├── logo.svg          # メインロゴ
    ├── logo-white.svg    # 白抜きロゴ（ダークbg用）
    └── logo-mark.svg     # シンボルマークのみ
```

### ステップ2: ファビコンの生成

1. 元画像を用意（512x512px以上の正方形）
2. [Favicon Generator](https://favicon.io/)で生成
3. 生成されたファイルを配置：

```
public/
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
└── site.webmanifest
```

### ステップ3: メタデータの更新

`app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}
```

## OGP画像の設定

### ステップ1: OGP画像の作成

推奨仕様：
- サイズ: 1200x630px
- フォーマット: JPGまたはPNG
- ファイルサイズ: 1MB以下

デザインのポイント：
- ロゴを含める
- キャッチコピーを大きく表示
- ブランドカラーを使用
- テキストは中央80%以内に配置（端が切れる場合があるため）

### ステップ2: 配置と設定

```
public/
└── images/
    └── og-image.jpg
```

`config/site.ts`:

```typescript
export const siteConfig = {
  // ...
  ogImage: '/images/og-image.jpg',
}
```

### ステップ3: ページごとのOGP画像（オプション）

特定のページ用のOGP画像を設定：

```typescript
// app/(site)/about/page.tsx
export const metadata: Metadata = {
  openGraph: {
    images: ['/images/og-about.jpg'],
  },
}
```

## 高度なカスタマイズ

### カスタムCSS変数の追加

`styles/tokens.css`:

```css
:root {
  /* カスタムグラデーション */
  --gradient-primary: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  
  /* カスタムシャドウ */
  --shadow-brand: 0 4px 14px 0 rgba(var(--color-primary-rgb), 0.3);
  
  /* カスタムアニメーション時間 */
  --transition-fast: 150ms;
  --transition-base: 250ms;
  --transition-slow: 350ms;
}
```

### テーマバリエーション

複数のブランドや部門がある場合のテーマ切り替え：

```typescript
// lib/themes.ts
export const themes = {
  main: {
    primary: '#1B4E9B',
    secondary: '#00A0B0',
  },
  residential: {
    primary: '#2E7D32',
    secondary: '#81C784',
  },
  commercial: {
    primary: '#E65100',
    secondary: '#FF9800',
  },
}

// components/theme/ThemeProvider.tsx
export function ThemeProvider({ theme = 'main', children }) {
  useEffect(() => {
    const colors = themes[theme]
    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value)
    })
  }, [theme])
  
  return children
}
```

### ダークモード対応（将来実装用）

```css
/* ダークモード用の色定義 */
@media (prefers-color-scheme: dark) {
  :root {
    --color-text-primary: #F9FAFB;
    --color-text-secondary: #D1D5DB;
    --color-background-primary: #111827;
    --color-background-secondary: #1F2937;
  }
}

/* またはクラスベースの切り替え */
.dark {
  --color-text-primary: #F9FAFB;
  /* ... */
}
```

## ブランド設定チェックリスト

設定が完了したら、以下を確認してください：

- [ ] プライマリ・セカンダリカラーが設定されている
- [ ] 全ページでブランドカラーが正しく表示される
- [ ] ロゴが正しく表示される（通常版・白抜き版）
- [ ] ファビコンがブラウザタブに表示される
- [ ] OGP画像がSNSシェア時に表示される
- [ ] フォントが正しく読み込まれている
- [ ] テキストのコントラスト比が基準を満たしている
- [ ] モバイル表示でもブランドが保たれている

## トラブルシューティング

### 色が反映されない

1. `tokens/brand.json`の構文エラーをチェック
2. 開発サーバーを再起動
3. ブラウザキャッシュをクリア

### フォントが表示されない

1. Next.jsのフォント設定を確認
2. `layout.tsx`でCSSクラスが適用されているか確認
3. ネットワークタブでフォントの読み込みを確認

### ロゴのサイズが合わない

`components/layout/Header.tsx`でサイズを調整：

```tsx
<Image
  src={siteConfig.logo}
  alt={siteConfig.name}
  width={180}  // 幅を調整
  height={40}  // 高さを調整
  priority
/>
```

---

ブランド設定が完了したら、[コンテンツ管理チュートリアル](./content-management.md)に進みましょう。