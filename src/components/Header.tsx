import React, { useState, useRef, useEffect } from 'react';
import { 
  FaMoon, 
  FaSun, 
  FaEye, 
  FaEdit, 
  FaColumns,
  FaFileExport,
  FaShareAlt,
  FaGithub,
  FaCopy
} from 'react-icons/fa'
import LanguageSwitcher from './LanguageSwitcher'

interface HeaderProps {
  isDarkMode: boolean
  setIsDarkMode: (isDark: boolean) => void
  activeView: 'editor' | 'preview' | 'split'
  setActiveView: (view: 'editor' | 'preview' | 'split') => void
  onExport: (format: 'html' | 'md' | 'pdf') => void
  onClearLocalFiles?: () => void
  onCopyMarkdown?: () => void
}

const Header: React.FC<HeaderProps> = ({ 
  isDarkMode, 
  setIsDarkMode, 
  activeView, 
  setActiveView,
  onExport,
  onClearLocalFiles,
  onCopyMarkdown
}) => {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭导出下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportRef.current && !exportRef.current.contains(event.target as Node)) {
        setIsExportOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="bg-blue-600 text-white p-2 rounded-lg">
          <FaEdit />
        </div>
        <h1 className="text-xl font-bold text-slate-800 dark:text-white">MarkFlow Lite</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex border border-slate-300 dark:border-slate-600 rounded-md overflow-hidden">
          <button 
            className={`p-2 ${activeView === 'editor' ? 'bg-slate-200 dark:bg-slate-700' : 'bg-white dark:bg-slate-800'} text-slate-700 dark:text-slate-300`}
            onClick={() => setActiveView('editor')}
            title="编辑模式"
          >
            <FaEdit />
          </button>
          <button 
            className={`p-2 ${activeView === 'split' ? 'bg-slate-200 dark:bg-slate-700' : 'bg-white dark:bg-slate-800'} text-slate-700 dark:text-slate-300`}
            onClick={() => setActiveView('split')}
            title="分屏模式"
          >
            <FaColumns />
          </button>
          <button 
            className={`p-2 ${activeView === 'preview' ? 'bg-slate-200 dark:bg-slate-700' : 'bg-white dark:bg-slate-800'} text-slate-700 dark:text-slate-300`}
            onClick={() => setActiveView('preview')}
            title="预览模式"
          >
            <FaEye />
          </button>
        </div>
        
        <div className="relative" ref={exportRef}>
          <button 
            className="p-2 rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            title="导出"
            onClick={() => setIsExportOpen(!isExportOpen)}
          >
            <FaFileExport />
          </button>
          {isExportOpen && (
            <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-lg z-20">
              <button 
                className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                onClick={() => {
                  onExport('html');
                  setIsExportOpen(false);
                }}
              >
                导出为 HTML
              </button>
              <button 
                className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                onClick={() => {
                  onExport('md');
                  setIsExportOpen(false);
                }}
              >
                导出为 Markdown
              </button>
              {onCopyMarkdown && (
                <button 
                  className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  onClick={() => {
                    onCopyMarkdown();
                    setIsExportOpen(false);
                  }}
                >
                  复制 Markdown
                </button>
              )}
              <button 
                className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                onClick={() => {
                  onExport('pdf');
                  setIsExportOpen(false);
                }}
              >
                导出为 PDF
              </button>
              {onClearLocalFiles && (
                <button 
                  className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border-t border-slate-200 dark:border-slate-700"
                  onClick={() => {
                    onClearLocalFiles();
                    setIsExportOpen(false);
                  }}
                >
                  清除本地文件
                </button>
              )}
            </div>
          )}
        </div>
        
        <button 
          className="p-2 rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
          title="分享"
        >
          <FaShareAlt />
        </button>
        
        <button 
          className="p-2 rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
          onClick={() => setIsDarkMode(!isDarkMode)}
          title={isDarkMode ? "切换到浅色模式" : "切换到深色模式"}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
        
        <LanguageSwitcher />
        
        <a 
          href="https://github.com/blankzsh/markflow-lite" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
          title="GitHub 仓库"
        >
          <FaGithub />
        </a>
      </div>
    </header>
  )
}

export default Header