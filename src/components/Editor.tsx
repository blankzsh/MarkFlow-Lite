import React, { useEffect, useRef } from 'react'
import { FaBold, FaItalic, FaHeading, FaLink, FaImage, FaListUl, FaListOl, FaQuoteLeft } from 'react-icons/fa'

interface EditorProps {
  markdown: string
  setMarkdown: (value: string) => void
  isDarkMode: boolean
  className?: string
}

const Editor: React.FC<EditorProps> = ({ markdown, setMarkdown, isDarkMode, className = '' }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertText = (before: string, after: string = '') => {
    if (!textareaRef.current) return
    
    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = markdown.substring(start, end)
    
    const newText = 
      markdown.substring(0, start) + 
      before + 
      selectedText + 
      after + 
      markdown.substring(end)
    
    setMarkdown(newText)
    
    // 重新设置光标位置
    setTimeout(() => {
      if (textareaRef.current) {
        const newCursorPos = start + before.length
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos + selectedText.length)
        textareaRef.current.focus()
      }
    }, 0)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // 快捷键支持
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault()
          insertText('**', '**')
          break
        case 'i':
          e.preventDefault()
          insertText('*', '*')
          break
        case 'k':
          e.preventDefault()
          insertText('[', '](url)')
          break
      }
    }
  }

  return (
    <div className={`flex flex-col border-r border-slate-200 dark:border-slate-700 ${className}`}>
      <div className="flex flex-wrap items-center p-2 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <button 
          className="p-2 mr-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
          onClick={() => insertText('**', '**')}
          title="粗体 (Ctrl+B)"
        >
          <FaBold />
        </button>
        <button 
          className="p-2 mr-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
          onClick={() => insertText('*', '*')}
          title="斜体 (Ctrl+I)"
        >
          <FaItalic />
        </button>
        <button 
          className="p-2 mr-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
          onClick={() => insertText('# ')}
          title="标题"
        >
          <FaHeading />
        </button>
        <button 
          className="p-2 mr-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
          onClick={() => insertText('[', '](url)')}
          title="链接 (Ctrl+K)"
        >
          <FaLink />
        </button>
        <button 
          className="p-2 mr-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
          onClick={() => insertText('![', '](image-url)')}
          title="图片"
        >
          <FaImage />
        </button>
        <button 
          className="p-2 mr-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
          onClick={() => insertText('- ')}
          title="无序列表"
        >
          <FaListUl />
        </button>
        <button 
          className="p-2 mr-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
          onClick={() => insertText('1. ')}
          title="有序列表"
        >
          <FaListOl />
        </button>
        <button 
          className="p-2 mr-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
          onClick={() => insertText('> ')}
          title="引用"
        >
          <FaQuoteLeft />
        </button>
      </div>
      <textarea
        ref={textareaRef}
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        onKeyDown={handleKeyDown}
        className={`flex-1 p-4 resize-none font-mono text-sm focus:outline-none ${
          isDarkMode 
            ? 'bg-slate-900 text-slate-100' 
            : 'bg-white text-slate-800'
        }`}
        spellCheck={false}
      />
    </div>
  )
}

export default Editor