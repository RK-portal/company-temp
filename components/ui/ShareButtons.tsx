'use client'

import { ShareButtonsProps } from '@/types/content'

export default function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description || '')

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    line: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
  }

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400')
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">シェア：</span>
      <button
        onClick={() => handleShare('twitter')}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        aria-label="Twitterでシェア"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>
      <button
        onClick={() => handleShare('facebook')}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        aria-label="Facebookでシェア"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>
      <button
        onClick={() => handleShare('line')}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        aria-label="LINEでシェア"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.28 2 11.53c0 4.68 3.66 8.6 8.61 9.35.34.07.8.22.92.5.11.25.07.65.04.91l-.15.94c-.05.28-.22 1.1.96.6 1.18-.5 6.37-3.75 8.7-6.42C22.38 15.56 22 13.61 22 11.53 22 6.28 17.52 2 12 2zm-4.36 9.31c0 .16-.13.29-.29.29H5.19c-.16 0-.29-.13-.29-.29V8.42c0-.16.13-.29.29-.29s.29.13.29.29v2.6h1.87c.16 0 .29.13.29.29zm1.94 0c0 .16-.13.29-.29.29s-.29-.13-.29-.29V8.42c0-.16.13-.29.29-.29s.29.13.29.29v2.89zm4.4 0c0 .11-.06.21-.16.26-.04.02-.08.03-.13.03-.06 0-.13-.02-.18-.07l-2.31-2.31v2.09c0 .16-.13.29-.29.29s-.29-.13-.29-.29V8.42c0-.11.06-.21.16-.26.04-.02.08-.03.13-.03.06 0 .13.02.18.07l2.31 2.31V8.42c0-.16.13-.29.29-.29s.29.13.29.29v2.89zm3.76-.58c.16 0 .29.13.29.29s-.13.29-.29.29h-1.87v.58h1.87c.16 0 .29.13.29.29s-.13.29-.29.29h-2.16c-.16 0-.29-.13-.29-.29V8.42c0-.16.13-.29.29-.29h2.16c.16 0 .29.13.29.29s-.13.29-.29.29h-1.87v.58h1.87z" />
        </svg>
      </button>
    </div>
  )
}