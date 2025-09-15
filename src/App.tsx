import React, { useState, useEffect, useCallback } from 'react'
import Editor from './components/Editor'
import Preview from './components/Preview'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { loadContent, saveContent } from './utils/storage'
import { fileManager } from './utils/file-manager'
import { initialMarkdown } from './utils/constants'
import S3ConfigModal from './components/modals/S3ConfigModal'
import WebDAVConfigModal from './components/modals/WebDAVConfigModal'

function App() {
  const [markdown, setMarkdown] = useState<string>(initialMarkdown)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [activeView, setActiveView] = useState<'editor' | 'preview' | 'split'>('split')
  const [isS3ModalOpen, setIsS3ModalOpen] = useState<boolean>(false)
  const [isWebDAVModalOpen, setIsWebDAVModalOpen] = useState<boolean>(false)

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

  // 新建文档
  const handleNewDocument = useCallback(() => {
    if (window.confirm('确定要新建文档吗？未保存的更改将会丢失。')) {
      setMarkdown(initialMarkdown)
    }
  }, [])

  // 打开文档
  const handleOpenDocument = useCallback(() => {
    // 创建文件输入元素
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.md,.markdown,text/markdown'
    
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          if (content) {
            setMarkdown(content)
          }
        }
        reader.readAsText(file)
      }
    }
    
    input.click()
  }, [])

  // 导出文档
  const handleExport = useCallback((format: 'html' | 'md' | 'pdf') => {
    switch (format) {
      case 'md':
        // 导出为 Markdown
        const markdownBlob = new Blob([markdown], { type: 'text/markdown' })
        const markdownUrl = URL.createObjectURL(markdownBlob)
        const markdownLink = document.createElement('a')
        markdownLink.href = markdownUrl
        markdownLink.download = 'document.md'
        markdownLink.click()
        URL.revokeObjectURL(markdownUrl)
        break
        
      case 'html':
        // 导出为 HTML
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>MarkFlow Lite Document</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; line-height: 1.6; padding: 2rem; }
        h1, h2, h3, h4, h5, h6 { margin-top: 1.5rem; margin-bottom: 1rem; }
        pre { background: #f6f8fa; padding: 1rem; overflow: auto; border-radius: 4px; }
        code { background: #f6f8fa; padding: 0.2rem 0.4rem; border-radius: 3px; }
        blockquote { border-left: 4px solid #dfe2e5; padding: 0 1rem; color: #6a737d; }
        table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
        th, td { border: 1px solid #dfe2e5; padding: 0.5rem; text-align: left; }
        th { background: #f6f8fa; }
    </style>
</head>
<body>
    <div id="content"></div>
    <script src="https://cdn.jsdelivr.net/npm/markdown-it@13.0.1/dist/markdown-it.min.js"></script>
    <script>
        const md = window.markdownit()
        document.getElementById('content').innerHTML = md.render(${JSON.stringify(markdown)})
    </script>
</body>
</html>`
        const htmlBlob = new Blob([htmlContent], { type: 'text/html' })
        const htmlUrl = URL.createObjectURL(htmlBlob)
        const htmlLink = document.createElement('a')
        htmlLink.href = htmlUrl
        htmlLink.download = 'document.html'
        htmlLink.click()
        URL.revokeObjectURL(htmlUrl)
        break
        
      case 'pdf':
        // PDF 导出提示
        alert('PDF 导出功能需要浏览器打印功能支持。请使用浏览器的打印功能并选择"另存为 PDF"。')
        // 在实际应用中，可以使用 jsPDF 或其他库来实现 PDF 导出
        break
    }
  }, [markdown])

  // 处理S3配置保存
  const handleS3Save = async (config: { accessKeyId: string; secretAccessKey: string; region: string; bucket: string }) => {
    try {
      const result = await fileManager.connect('s3', config)
      if (result.success) {
        alert('S3 连接成功')
        setIsS3ModalOpen(false)
      } else {
        alert(`S3 连接失败: ${result.message}`)
      }
    } catch (error: any) {
      alert(`S3 连接失败: ${error.message || '未知错误'}`)
    }
  }

  // 处理WebDAV配置保存
  const handleWebDAVSave = async (config: { url: string; username: string; password: string }) => {
    try {
      const result = await fileManager.connect('webdav', config)
      if (result.success) {
        alert('WebDAV 连接成功')
        setIsWebDAVModalOpen(false)
      } else {
        alert(`WebDAV 连接失败: ${result.message}`)
      }
    } catch (error: any) {
      alert(`WebDAV 连接失败: ${error.message || '未知错误'}`)
    }
  }

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Header 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        activeView={activeView}
        setActiveView={setActiveView}
        onExport={handleExport}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          onNewDocument={handleNewDocument}
          onOpenDocument={handleOpenDocument}
          onFileSelect={(file) => {
            // 模拟文件加载
            setMarkdown(`# ${file.name}\n\n这是从文件 "${file.name}" 加载的内容。\n\n最后修改时间: ${file.modified.toLocaleString()}`)
          }}
          onS3Connect={() => setIsS3ModalOpen(true)}
          onWebDAVConnect={() => setIsWebDAVModalOpen(true)}
        />
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
      
      <S3ConfigModal 
        isOpen={isS3ModalOpen} 
        onClose={() => setIsS3ModalOpen(false)} 
        onSave={handleS3Save} 
      />
      
      <WebDAVConfigModal 
        isOpen={isWebDAVModalOpen} 
        onClose={() => setIsWebDAVModalOpen(false)} 
        onSave={handleWebDAVSave} 
      />
    </div>
  )
}

export default App