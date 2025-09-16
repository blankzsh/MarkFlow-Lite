import React, { useState, useEffect, useCallback } from 'react'
import Editor from './components/Editor'
import Preview from './components/Preview'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { fileManager } from './utils/file-manager'
import { FileInfo } from './utils/cloud-storage-service'
import { initialMarkdown } from './utils/constants'
import S3ConfigModal from './components/modals/S3ConfigModal'
import WebDAVConfigModal from './components/modals/WebDAVConfigModal'
import FileNameModal from './components/modals/FileNameModal'
import MarkdownIt from 'markdown-it'

function App() {
  const [markdown, setMarkdown] = useState<string>('')
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [activeView, setActiveView] = useState<'editor' | 'preview' | 'split'>('split')
  const [isS3ModalOpen, setIsS3ModalOpen] = useState<boolean>(false)
  const [isWebDAVModalOpen, setIsWebDAVModalOpen] = useState<boolean>(false)
  const [isFileNameModalOpen, setIsFileNameModalOpen] = useState<boolean>(false)
  const [currentFile, setCurrentFile] = useState<FileInfo | null>(null)
  const [isInitialized, setIsInitialized] = useState<boolean>(false)

  // 切换主题
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [isDarkMode])

  // 保存文件内容
  const saveFileContent = useCallback(() => {
    if (currentFile) {
      fileManager.writeFile(currentFile.path, markdown)
    }
  }, [currentFile, markdown])

  // 保存内容到本地存储
  useEffect(() => {
    saveFileContent()
  }, [markdown, saveFileContent])

  // 页面关闭时清空文件
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // 清空所有本地文件
      fileManager.clearLocalFiles()
      // 注意：现代浏览器可能不会显示自定义消息
      e.returnValue = '确定要离开页面吗？所有本地文件将被清空。'
      return '确定要离开页面吗？所有本地文件将被清空。'
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  // 检查并创建初始化文档
  const checkAndCreateInitialDocument = useCallback(async () => {
    try {
      // 检查localStorage中是否已有文件
      const savedFiles = localStorage.getItem('markflow-local-files');
      let files: any[] = [];
      
      if (savedFiles) {
        files = JSON.parse(savedFiles);
      }
      
      // 检查是否已经有初始化文档
      const existingInitDoc = files.find((file: any) => file.name === '初始化文档.md');
      
      if (!existingInitDoc) {
        // 如果没有初始化文档，创建一个
        const newFile = fileManager.createLocalFile('初始化文档.md', initialMarkdown);
        setCurrentFile({
          name: newFile.name,
          type: 'file',
          size: newFile.content.length,
          modified: newFile.modified,
          path: newFile.id
        });
        setMarkdown(initialMarkdown);
        setIsInitialized(true);
        
        // 通知Sidebar更新文件列表
        window.dispatchEvent(new CustomEvent('fileCreated'));
        return true;
      } else {
        // 如果已有初始化文档，加载它
        setCurrentFile({
          name: existingInitDoc.name,
          type: 'file',
          size: existingInitDoc.content.length,
          modified: new Date(existingInitDoc.modified),
          path: existingInitDoc.id
        });
        setMarkdown(existingInitDoc.content);
        setIsInitialized(true);
        return false;
      }
    } catch (error) {
      console.error('检查并创建初始化文档失败:', error);
      setIsInitialized(true);
      return false;
    }
  }, [initialMarkdown]);

  // 初始化时创建默认文档
  useEffect(() => {
    if (!isInitialized) {
      checkAndCreateInitialDocument();
    }
  }, [isInitialized, checkAndCreateInitialDocument]);

  // 新建文档
  const handleNewDocument = useCallback(() => {
    // 直接打开文件名输入弹窗，不显示确认弹窗
    setIsFileNameModalOpen(true)
  }, [])

  // 处理文件名保存
  const handleFileNameSave = useCallback((filename: string) => {
    // 确保文件名以.md结尾
    if (!filename.endsWith('.md')) {
      filename += '.md'
    }
    
    // 创建新的空本地文件
    const newFile = fileManager.createLocalFile(filename, '')
    setCurrentFile({
      name: newFile.name,
      type: 'file',
      size: newFile.content.length,
      modified: newFile.modified,
      path: newFile.id
    })
    setMarkdown('')
    setIsFileNameModalOpen(false)
    
    // 通知Sidebar更新文件列表
    window.dispatchEvent(new CustomEvent('fileCreated'))
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
            // 创建本地文件（使用实际内容）
            const newFile = fileManager.createLocalFile(file.name, content)
            setCurrentFile({
              name: newFile.name,
              type: 'file',
              size: newFile.content.length,
              modified: newFile.modified,
              path: newFile.id
            })
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
        markdownLink.download = currentFile ? currentFile.name : 'document.md'
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
        htmlLink.download = currentFile ? currentFile.name.replace('.md', '.html') : 'document.html'
        htmlLink.click()
        URL.revokeObjectURL(htmlUrl)
        break
        
      case 'pdf':
        // 使用 html2pdf.js 导出为 PDF
        import('html2pdf.js').then(({ default: html2pdf }) => {
          try {
            // 创建 Markdown 解析器
            const md = new MarkdownIt()
            
            // 解析 Markdown 内容
            const htmlContent = md.render(markdown)
            
            // 创建带样式的 HTML 内容
            const styledHtml = `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; line-height: 1.6; padding: 2rem; max-width: 800px; margin: 0 auto;">
                <h1 style="color: #333; margin-top: 1.5rem; margin-bottom: 1rem;">${currentFile ? currentFile.name.replace('.md', '') : 'Document'}</h1>
                <div style="margin-top: 2rem;">
                  ${htmlContent}
                </div>
              </div>
            `
            
            // 创建临时的 HTML 元素用于转换
            const element = document.createElement('div')
            element.innerHTML = styledHtml
            
            // 添加缺失的样式
            const style = document.createElement('style')
            style.textContent = `
              pre { 
                background: #f6f8fa; 
                padding: 1rem; 
                overflow: auto; 
                border-radius: 4px; 
                margin: 1rem 0;
              }
              code { 
                background: #f6f8fa; 
                padding: 0.2rem 0.4rem; 
                border-radius: 3px; 
                font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
              }
              blockquote { 
                border-left: 4px solid #dfe2e5; 
                padding: 0 1rem; 
                color: #6a737d; 
                margin: 1rem 0;
              }
              table { 
                border-collapse: collapse; 
                width: 100%; 
                margin: 1rem 0; 
              }
              th, td { 
                border: 1px solid #dfe2e5; 
                padding: 0.5rem; 
                text-align: left; 
              }
              th { 
                background: #f6f8fa; 
              }
              h1, h2, h3, h4, h5, h6 { 
                margin-top: 1.5rem; 
                margin-bottom: 1rem; 
              }
            `
            element.appendChild(style)
            
            // 配置 PDF 选项
            const options = {
              margin: 10,
              filename: currentFile ? currentFile.name.replace('.md', '.pdf') : 'document.pdf',
              image: { type: 'jpeg', quality: 0.98 },
              html2canvas: { 
                scale: 2,
                useCORS: true,
                logging: false
              },
              jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            } as any // 添加类型断言以解决类型问题
            
            // 生成并下载 PDF
            html2pdf().set(options).from(element).save()
          } catch (error: any) {
            console.error('PDF导出失败:', error)
            alert('PDF导出失败: ' + (error.message || '未知错误'))
          }
        }).catch((error: any) => {
          console.error('导入html2pdf.js失败:', error)
          alert('PDF导出失败，请使用浏览器打印功能')
        })
        break
    }
  }, [markdown, currentFile])

  // 复制Markdown到剪贴板
  const handleCopyMarkdown = useCallback(() => {
    navigator.clipboard.writeText(markdown)
      .then(() => {
        alert('Markdown内容已复制到剪贴板')
      })
      .catch(err => {
        console.error('复制失败:', err)
        alert('复制失败，请手动复制')
      })
  }, [markdown])

  // 清除所有本地文件
  const handleClearLocalFiles = useCallback(() => {
    if (window.confirm('确定要清除所有本地文件吗？此操作不可恢复。')) {
      fileManager.clearLocalFiles()
      setCurrentFile(null)
      setMarkdown('')
      setIsInitialized(false)
      
      // 重新初始化文档
      setTimeout(() => {
        checkAndCreateInitialDocument()
      }, 100)
    }
  }, [checkAndCreateInitialDocument])

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
    <div className={`flex flex-col h-screen ${isDarkMode ? 'dark' : ''}`} role="main">
      <Header 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        activeView={activeView}
        setActiveView={setActiveView}
        onExport={handleExport}
        onClearLocalFiles={handleClearLocalFiles}
        onCopyMarkdown={handleCopyMarkdown}
      />
      <div className="flex flex-1 overflow-hidden" role="region" aria-label="编辑器区域">
        <Sidebar 
          onNewDocument={handleNewDocument}
          onOpenDocument={handleOpenDocument}
          onFileSelect={(file) => {
            // 读取文件内容
            fileManager.readFile(file.path)
              .then(content => {
                setCurrentFile(file)
                setMarkdown(content)
              })
              .catch(error => {
                console.error('读取文件失败:', error)
                alert('读取文件失败')
              })
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
      
      <FileNameModal
        isOpen={isFileNameModalOpen}
        onClose={() => setIsFileNameModalOpen(false)}
        onSave={handleFileNameSave}
        title="新建文档"
        placeholder="请输入文件名，例如：我的文档.md"
      />
    </div>
  )
}

export default App