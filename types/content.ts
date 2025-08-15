export interface ContentBase {
  slug: string
  title: string
  description: string
  date: string
  category: string
  thumbnail?: string
  content: string
}

export interface Work extends ContentBase {
  area?: string
  structure?: string
  completionDate?: string
  images?: string[]
}

export interface News extends ContentBase {
  author?: string
  tags?: string[]
}

export interface Topic extends ContentBase {
  author?: string
  tags?: string[]
}

export interface GalleryImage {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

export interface Category {
  id: string
  name: string
  count?: number
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
  className?: string
}

export interface ContentListProps {
  items: ContentBase[]
  basePath: string
  currentPage?: number
  itemsPerPage?: number
}

export interface ShareButtonsProps {
  url: string
  title: string
  description?: string
}