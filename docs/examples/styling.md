# スタイリングの実装例

このドキュメントでは、Tailwind CSSを使用した様々なスタイリングパターンと実装例を紹介します。

## 基本的なスタイリングパターン

### レスポンシブデザイン

```tsx
// モバイルファーストアプローチ
<div className="
  w-full                    // モバイル: 幅100%
  md:w-1/2                  // タブレット: 幅50%
  lg:w-1/3                  // デスクトップ: 幅33.33%
  xl:w-1/4                  // 大画面: 幅25%
">
  <h2 className="
    text-xl                 // モバイル: 20px
    md:text-2xl             // タブレット: 24px
    lg:text-3xl             // デスクトップ: 30px
    xl:text-4xl             // 大画面: 36px
  ">
    レスポンシブタイトル
  </h2>
  
  <p className="
    mt-2                    // モバイル: margin-top 8px
    md:mt-4                 // タブレット: margin-top 16px
    lg:mt-6                 // デスクトップ: margin-top 24px
  ">
    画面サイズに応じて調整されるコンテンツ
  </p>
</div>
```

### ホバー・フォーカス状態

```tsx
// インタラクティブな要素
<button className="
  bg-primary
  text-white
  px-4 py-2
  rounded-lg
  transition-all
  duration-200
  
  hover:bg-primary-dark      // ホバー時
  hover:shadow-lg
  hover:scale-105
  
  focus:outline-none         // フォーカス時
  focus:ring-2
  focus:ring-primary
  focus:ring-offset-2
  
  active:scale-95            // クリック時
  
  disabled:opacity-50        // 無効時
  disabled:cursor-not-allowed
  disabled:hover:scale-100
">
  インタラクティブボタン
</button>
```

### グラデーション

```tsx
// 背景グラデーション
<div className="
  bg-gradient-to-r 
  from-primary 
  via-primary-light 
  to-secondary
  text-white
  p-8
  rounded-xl
">
  <h3 className="text-2xl font-bold">グラデーション背景</h3>
</div>

// テキストグラデーション
<h1 className="
  text-5xl 
  font-bold
  bg-gradient-to-r 
  from-primary 
  to-secondary
  bg-clip-text 
  text-transparent
">
  グラデーションテキスト
</h1>

// ボーダーグラデーション
<div className="
  relative
  p-8
  rounded-xl
  bg-white
">
  <div className="
    absolute 
    inset-0 
    bg-gradient-to-r 
    from-primary 
    to-secondary 
    rounded-xl 
    p-[2px]
  ">
    <div className="
      bg-white 
      h-full 
      w-full 
      rounded-xl
    " />
  </div>
  <div className="relative z-10">
    グラデーションボーダー
  </div>
</div>
```

## 高度なレイアウトパターン

### グリッドレイアウト

```tsx
// 自動調整グリッド
<div className="
  grid 
  grid-cols-1 
  sm:grid-cols-2 
  lg:grid-cols-3 
  xl:grid-cols-4 
  gap-6
  auto-rows-fr
">
  {items.map((item) => (
    <div key={item.id} className="...">
      {/* カード内容 */}
    </div>
  ))}
</div>

// 複雑なグリッドレイアウト
<div className="grid grid-cols-12 gap-6">
  <div className="col-span-12 lg:col-span-8">
    {/* メインコンテンツ */}
  </div>
  <aside className="col-span-12 lg:col-span-4">
    {/* サイドバー */}
  </aside>
</div>

// マガジンスタイルグリッド
<div className="grid grid-cols-6 gap-4">
  <article className="col-span-6 md:col-span-4 row-span-2">
    {/* 大きな記事 */}
  </article>
  <article className="col-span-6 md:col-span-2">
    {/* 小さな記事1 */}
  </article>
  <article className="col-span-6 md:col-span-2">
    {/* 小さな記事2 */}
  </article>
</div>
```

### Flexboxパターン

```tsx
// 中央揃えコンテナ
<div className="
  flex 
  items-center 
  justify-center 
  min-h-screen
">
  <div>中央に配置されたコンテンツ</div>
</div>

// スペースビトウィーンレイアウト
<nav className="
  flex 
  items-center 
  justify-between 
  px-6 
  py-4
">
  <div className="flex items-center gap-4">
    <Logo />
    <NavLinks />
  </div>
  <div className="flex items-center gap-4">
    <SearchBar />
    <UserMenu />
  </div>
</nav>

// フレックスラップカード
<div className="
  flex 
  flex-wrap 
  gap-4 
  justify-center
">
  {tags.map((tag) => (
    <span
      key={tag}
      className="
        px-3 
        py-1 
        bg-gray-100 
        rounded-full 
        text-sm
        whitespace-nowrap
      "
    >
      {tag}
    </span>
  ))}
</div>
```

## アニメーションとトランジション

### 基本的なアニメーション

```css
/* globals.css に追加 */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.animate-slideIn {
  animation: slideIn 0.5s ease-out;
}

.animate-fadeInUp {
  animation: fadeInUp 0.5s ease-out;
}

.animate-pulse-slow {
  animation: pulse 2s ease-in-out infinite;
}
```

### スクロールアニメーション

```tsx
'use client'

import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/cn'

export function AnimatedSection({ children, className }: { 
  children: React.ReactNode
  className?: string 
}) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700',
        inView 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10',
        className
      )}
    >
      {children}
    </div>
  )
}
```

### ローディングスケルトン

```tsx
// スケルトンコンポーネント
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="h-48 bg-gray-200 rounded-lg mb-4" />
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
    </div>
  )
}

// 使用例
export function LoadingCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}
```

## カスタムユーティリティクラス

### globals.cssに追加

```css
@layer utilities {
  /* テキストバランス */
  .text-balance {
    text-wrap: balance;
  }
  
  /* グラスモーフィズム */
  .glass {
    @apply bg-white/70 backdrop-blur-md;
  }
  
  .glass-dark {
    @apply bg-black/50 backdrop-blur-md;
  }
  
  /* ニューモーフィズム */
  .neumorphism {
    @apply bg-gray-100 shadow-[5px_5px_10px_#d1d1d1,-5px_-5px_10px_#ffffff];
  }
  
  .neumorphism-inset {
    @apply bg-gray-100 shadow-[inset_5px_5px_10px_#d1d1d1,inset_-5px_-5px_10px_#ffffff];
  }
  
  /* カスタムシャドウ */
  .shadow-brand {
    box-shadow: 0 10px 30px -5px rgba(var(--color-primary-rgb), 0.3);
  }
  
  /* テキストストローク */
  .text-stroke {
    -webkit-text-stroke: 1px currentColor;
    -webkit-text-fill-color: transparent;
  }
  
  /* セーフエリア対応 */
  .safe-top {
    padding-top: env(safe-area-inset-top);
  }
  
  .safe-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }
  
  /* カスタムスクロールバー */
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    @apply bg-gray-100 rounded-full;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    @apply bg-gray-400 rounded-full hover:bg-gray-500;
  }
}
```

## コンポーネント固有のスタイル

### カードホバーエフェクト

```tsx
export function HoverCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="
      group
      relative
      bg-white
      rounded-xl
      shadow-md
      overflow-hidden
      transition-all
      duration-300
      hover:shadow-xl
      hover:-translate-y-1
    ">
      {/* ホバー時のオーバーレイ */}
      <div className="
        absolute
        inset-0
        bg-gradient-to-t
        from-primary/10
        to-transparent
        opacity-0
        group-hover:opacity-100
        transition-opacity
        duration-300
        pointer-events-none
      " />
      
      {/* コンテンツ */}
      <div className="relative z-10 p-6">
        {children}
      </div>
      
      {/* ホバー時のボーダー */}
      <div className="
        absolute
        inset-x-0
        bottom-0
        h-1
        bg-gradient-to-r
        from-primary
        to-secondary
        transform
        scale-x-0
        group-hover:scale-x-100
        transition-transform
        duration-300
      " />
    </div>
  )
}
```

### パララックススクロール

```tsx
'use client'

import { useEffect, useState } from 'react'

export function ParallaxSection({ 
  children, 
  speed = 0.5 
}: { 
  children: React.ReactNode
  speed?: number 
}) {
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/parallax-bg.jpg)',
          transform: `translateY(${offsetY * speed}px)`,
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
```

### マスクとクリップパス

```tsx
// 斜めセクション
<section className="
  relative
  bg-primary
  text-white
  py-24
  
  before:content-['']
  before:absolute
  before:top-0
  before:left-0
  before:right-0
  before:h-24
  before:bg-white
  before:[clip-path:polygon(0_0,100%_0,100%_100%,0_0)]
  
  after:content-['']
  after:absolute
  after:bottom-0
  after:left-0
  after:right-0
  after:h-24
  after:bg-white
  after:[clip-path:polygon(0_100%,100%_0,100%_100%)]
">
  <div className="container relative z-10">
    {/* コンテンツ */}
  </div>
</section>

// 円形マスク
<div className="
  relative
  w-64
  h-64
  [mask-image:radial-gradient(circle,white_60%,transparent_70%)]
">
  <img src="/image.jpg" alt="" className="w-full h-full object-cover" />
</div>
```

## ダークモード対応

```tsx
// ダークモード対応コンポーネント
export function DarkModeCard() {
  return (
    <div className="
      bg-white 
      dark:bg-gray-800
      
      text-gray-900 
      dark:text-gray-100
      
      border 
      border-gray-200 
      dark:border-gray-700
      
      shadow-md 
      dark:shadow-lg 
      dark:shadow-gray-900/50
      
      rounded-lg 
      p-6
      
      transition-colors 
      duration-200
    ">
      <h3 className="
        text-xl 
        font-bold 
        mb-2
        
        text-gray-900 
        dark:text-white
      ">
        ダークモード対応カード
      </h3>
      
      <p className="
        text-gray-600 
        dark:text-gray-400
      ">
        自動的にダークモードに対応します
      </p>
    </div>
  )
}
```

---

これらのスタイリングパターンを組み合わせて、美しく機能的なUIを作成してください。