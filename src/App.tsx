import React, { useState, useEffect } from 'react'
import Editor from './components/Editor'
import Preview from './components/Preview'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { loadContent, saveContent } from './utils/storage'
import { initialMarkdown } from './utils/constants'

function App() {
  const [markdown, setMarkdown] = useState<string>(initialMarkdown)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [activeView, setActiveView] = useState<'editor' | 'preview' | 'split'>('split')

  // 加载保存的内容
  useEffect(() => {
    const savedContent = loadContent()
    if (savedContent) {
      setMarkdown(savedContent)
    }
  }, [])

  // 保存内容到本地存储
  useEffect(() => {
    saveContent(markdown)
  }, [markdown])

  // 切换主题
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Header 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        activeView={activeView}
        setActiveView={setActiveView}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        {activeView !== 'preview' && (
          <Editor 
            markdown={markdown} 
            setMarkdown={setMarkdown} 
            isDarkMode={isDarkMode}
            className={activeView === 'split' ? 'w-1/2' : 'flex-1'}
          />
        )}
        {activeView !== 'editor' && (
          <Preview 
            markdown={markdown} 
            isDarkMode={isDarkMode}
            className={activeView === 'split' ? 'w-1/2' : 'flex-1'}
          />
        )}
      </div>
    </div>
  )
}

export default App