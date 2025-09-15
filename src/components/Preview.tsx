import React, { useEffect, useRef } from 'react'
import { renderMarkdown } from '../utils/markdown'

interface PreviewProps {
  markdown: string
  isDarkMode: boolean
  className?: string
}

const Preview: React.FC<PreviewProps> = ({ markdown, isDarkMode, className = '' }) => {
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (previewRef.current) {
      const html = renderMarkdown(markdown)
      previewRef.current.innerHTML = html
      
      // 强制重新渲染
      previewRef.current.offsetHeight
    }
  }, [markdown, isDarkMode])

  return (
    <div 
      ref={previewRef}
      className={`overflow-auto p-4 prose prose-slate max-w-none dark:prose-invert ${className}`}
    />
  )
}

export default Preview