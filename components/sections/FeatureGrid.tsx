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
                className="group rounded-lg border border-gray-200 bg-white p-8 transition-all hover:border-primary-500 hover:shadow-lg"
              >
                {Icon && (
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100">
                    <Icon className="h-8 w-8" />
                  </div>
                )}
                
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}