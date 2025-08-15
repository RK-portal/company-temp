import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

import matter from 'gray-matter'

import { Work, News, Topic, ContentBase } from '@/types/content'

const contentDirectory = join(process.cwd(), 'content')

export function getContentBySlug<T extends ContentBase>(
  type: 'works' | 'news' | 'topics',
  slug: string
): T | null {
  try {
    const realSlug = slug.replace(/\.md$/, '')
    const fullPath = join(contentDirectory, type, `${realSlug}.md`)
    const fileContents = readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      ...data,
      slug: realSlug,
      content,
    } as T
  } catch (error) {
    return null
  }
}

export function getAllContent<T extends ContentBase>(
  type: 'works' | 'news' | 'topics'
): T[] {
  try {
    const directory = join(contentDirectory, type)
    const slugs = readdirSync(directory)
    
    const contents = slugs
      .filter((slug) => slug.endsWith('.md'))
      .map((slug) => getContentBySlug<T>(type, slug))
      .filter((content): content is T => content !== null)
      .sort((a, b) => (a.date > b.date ? -1 : 1))

    return contents
  } catch (error) {
    return []
  }
}

export function getContentByCategory<T extends ContentBase>(
  type: 'works' | 'news' | 'topics',
  category?: string
): T[] {
  const allContent = getAllContent<T>(type)
  
  if (!category || category === 'all') {
    return allContent
  }
  
  return allContent.filter((item) => item.category === category)
}

export function getCategories(
  type: 'works' | 'news' | 'topics'
): { id: string; name: string; count: number }[] {
  const allContent = getAllContent<ContentBase>(type)
  const categoryMap = new Map<string, number>()
  
  allContent.forEach((item) => {
    if (item.category) {
      categoryMap.set(item.category, (categoryMap.get(item.category) || 0) + 1)
    }
  })
  
  const categories = Array.from(categoryMap.entries()).map(([id, count]) => ({
    id,
    name: getCategoryName(type, id),
    count,
  }))
  
  // 「すべて」カテゴリーを追加
  categories.unshift({
    id: 'all',
    name: 'すべて',
    count: allContent.length,
  })
  
  return categories
}

function getCategoryName(type: string, id: string): string {
  const categoryNames: Record<string, Record<string, string>> = {
    works: {
      'new-construction': '新築',
      'renovation': 'リフォーム',
      'exterior': '外構・エクステリア',
    },
    news: {
      'announcement': 'お知らせ',
      'event': 'イベント',
      'media': 'メディア掲載',
    },
    topics: {
      'technology': '技術情報',
      'column': 'コラム',
      'report': 'レポート',
    },
  }
  
  return categoryNames[type]?.[id] || id
}

export function getPaginatedContent<T extends ContentBase>(
  items: T[],
  page: number = 1,
  itemsPerPage: number = 12
): {
  items: T[]
  currentPage: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
} {
  const totalPages = Math.ceil(items.length / itemsPerPage)
  const currentPage = Math.max(1, Math.min(page, totalPages))
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  
  return {
    items: items.slice(startIndex, endIndex),
    currentPage,
    totalPages,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  }
}

export function getRelatedContent<T extends ContentBase>(
  type: 'works' | 'news' | 'topics',
  currentSlug: string,
  limit: number = 3
): T[] {
  const allContent = getAllContent<T>(type)
  const current = allContent.find((item) => item.slug === currentSlug)
  
  if (!current) return []
  
  // 同じカテゴリーの記事を優先
  const sameCategory = allContent
    .filter((item) => item.slug !== currentSlug && item.category === current.category)
    .slice(0, limit)
  
  // 不足分を他のカテゴリーから補充
  if (sameCategory.length < limit) {
    const others = allContent
      .filter((item) => item.slug !== currentSlug && item.category !== current.category)
      .slice(0, limit - sameCategory.length)
    
    return [...sameCategory, ...others]
  }
  
  return sameCategory
}

export async function generateStaticParams(type: 'works' | 'news' | 'topics') {
  const contents = getAllContent<ContentBase>(type)
  return contents.map((content) => ({
    slug: content.slug,
  }))
}