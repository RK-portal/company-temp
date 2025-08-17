import { type FeatureItem } from '@/types/pages'

interface FeatureGridProps {
  items: FeatureItem[]
  columns?: 2 | 3 | 4
}

export default function FeatureGrid({ items, columns = 3 }: FeatureGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className={`grid gap-8 ${gridCols[columns]}`}>
          {items.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.id}
                className="group relative rounded-lg border-2 border-gray-200 bg-white p-8 transition-all duration-500 ease-out hover:border-primary-400 hover:shadow-2xl hover:-translate-y-2 overflow-hidden cursor-pointer"
              >
                {/* 背景グラデーション効果 */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent transition-all duration-700 ease-out group-hover:from-primary-50/20 group-hover:via-primary-100/10 group-hover:to-transparent" />
                
                {/* 光沢エフェクト */}
                <div className="absolute -inset-x-4 -top-4 h-32 bg-gradient-to-b from-white/0 via-white/20 to-white/0 opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:translate-y-48 transform rotate-12" />
                
                {Icon && (
                  <div className="relative mb-6">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-600 transition-all duration-500 ease-out group-hover:bg-primary-100 group-hover:scale-125 group-hover:shadow-lg group-hover:shadow-primary-200/50">
                      <Icon className="h-8 w-8 transition-all duration-500 ease-out group-hover:scale-110 group-hover:text-primary-700" />
                    </div>
                    {/* アイコンの背景リング */}
                    <div className="absolute inset-0 rounded-full bg-primary-200/20 scale-0 transition-all duration-700 ease-out group-hover:scale-150 opacity-0 group-hover:opacity-100" />
                  </div>
                )}
                
                <h3 className="relative mb-4 text-xl font-semibold text-gray-900 transition-all duration-500 ease-out group-hover:text-primary-600 group-hover:translate-x-1">
                  {item.title}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary-500 transition-all duration-500 ease-out group-hover:w-full" />
                </h3>
                
                <p className="relative text-gray-600 leading-relaxed transition-all duration-500 ease-out group-hover:text-gray-800">
                  {item.description}
                </p>
                
                {/* ホバー時のボーダーアニメーション */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-400 transform scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 origin-left" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}