'use client';

import { tokens } from '@/lib/tokens';

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-neutral-900 mb-8">デザインシステム</h1>

        {/* カラーパレット */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">カラーパレット</h2>
          
          {/* プライマリカラー */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-neutral-700 mb-3">Primary</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {Object.entries(tokens.colors.primary).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div
                    className="w-full aspect-square rounded-lg border border-neutral-200"
                    style={{ backgroundColor: value }}
                  />
                  <p className="text-xs mt-1 text-neutral-600">{key}</p>
                  <p className="text-xs text-neutral-500">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* セカンダリカラー */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-neutral-700 mb-3">Secondary</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {Object.entries(tokens.colors.secondary).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div
                    className="w-full aspect-square rounded-lg border border-neutral-200"
                    style={{ backgroundColor: value }}
                  />
                  <p className="text-xs mt-1 text-neutral-600">{key}</p>
                  <p className="text-xs text-neutral-500">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ニュートラルカラー */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-neutral-700 mb-3">Neutral</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {Object.entries(tokens.colors.neutral).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div
                    className="w-full aspect-square rounded-lg border border-neutral-200"
                    style={{ backgroundColor: value }}
                  />
                  <p className="text-xs mt-1 text-neutral-600">{key}</p>
                  <p className="text-xs text-neutral-500">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 成功カラー */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-neutral-700 mb-3">Success</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {Object.entries(tokens.colors.success).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div
                    className="w-full aspect-square rounded-lg border border-neutral-200"
                    style={{ backgroundColor: value }}
                  />
                  <p className="text-xs mt-1 text-neutral-600">{key}</p>
                  <p className="text-xs text-neutral-500">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 警告カラー */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-neutral-700 mb-3">Warning</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {Object.entries(tokens.colors.warning).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div
                    className="w-full aspect-square rounded-lg border border-neutral-200"
                    style={{ backgroundColor: value }}
                  />
                  <p className="text-xs mt-1 text-neutral-600">{key}</p>
                  <p className="text-xs text-neutral-500">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* エラーカラー */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-neutral-700 mb-3">Error</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {Object.entries(tokens.colors.error).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div
                    className="w-full aspect-square rounded-lg border border-neutral-200"
                    style={{ backgroundColor: value }}
                  />
                  <p className="text-xs mt-1 text-neutral-600">{key}</p>
                  <p className="text-xs text-neutral-500">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* タイポグラフィ */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">タイポグラフィ</h2>
          
          {/* フォントサイズ */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-neutral-700 mb-3">Font Sizes</h3>
            <div className="space-y-2">
              {Object.entries(tokens.typography.fontSize).map(([key, value]) => (
                <div key={key} className="flex items-baseline gap-4">
                  <span className="text-sm text-neutral-600 w-16">{key}</span>
                  <span style={{ fontSize: value }}>
                    The quick brown fox jumps over the lazy dog
                  </span>
                  <span className="text-xs text-neutral-500">({value})</span>
                </div>
              ))}
            </div>
          </div>

          {/* フォントウェイト */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-neutral-700 mb-3">Font Weights</h3>
            <div className="space-y-2">
              {Object.entries(tokens.typography.fontWeight).map(([key, value]) => (
                <div key={key} className="flex items-baseline gap-4">
                  <span className="text-sm text-neutral-600 w-24">{key}</span>
                  <span style={{ fontWeight: value }}>
                    The quick brown fox jumps over the lazy dog
                  </span>
                  <span className="text-xs text-neutral-500">({value})</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* スペーシング */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">スペーシング</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(tokens.spacing).slice(0, 24).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <span className="text-sm text-neutral-600 w-12">{key}</span>
                <div
                  className="bg-primary-500"
                  style={{ width: value, height: '24px' }}
                />
                <span className="text-xs text-neutral-500">({value})</span>
              </div>
            ))}
          </div>
        </section>

        {/* ボーダー半径 */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">ボーダー半径</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(tokens.borderRadius).map(([key, value]) => (
              <div key={key} className="text-center">
                <div
                  className="w-24 h-24 bg-primary-500 mx-auto"
                  style={{ borderRadius: value }}
                />
                <p className="text-sm mt-2 text-neutral-700">{key}</p>
                <p className="text-xs text-neutral-500">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* シャドウ */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">シャドウ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(tokens.boxShadow).map(([key, value]) => (
              <div key={key} className="bg-white p-4 rounded-lg" style={{ boxShadow: value }}>
                <p className="text-sm font-medium text-neutral-700">{key}</p>
                <p className="text-xs text-neutral-500 mt-1">{value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}