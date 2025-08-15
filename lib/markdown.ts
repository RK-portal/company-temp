import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { remark } from 'remark'
import html from 'remark-html'

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

export async function serializeMDX(source: string): Promise<MDXRemoteSerializeResult> {
  return await serialize(source, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
  })
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}年${month}月${day}日`
}

export function extractExcerpt(content: string, length: number = 120): string {
  // HTMLタグを除去
  const stripped = content.replace(/<[^>]*>/g, '')
  // 改行を空白に置換
  const normalized = stripped.replace(/\s+/g, ' ').trim()
  
  if (normalized.length <= length) {
    return normalized
  }
  
  return normalized.substring(0, length) + '...'
}