import React from 'react'
import { 
  FaMoon, 
  FaSun, 
  FaEye, 
  FaEdit, 
  FaColumns,
  FaFileExport,
  FaShareAlt,
  FaGithub
} from 'react-icons/fa'

interface HeaderProps {
  isDarkMode: boolean
  setIsDarkMode: (isDark: boolean) => void
  activeView: 'editor' | 'preview' | 'split'
  setActiveView: (view: 'editor' | 'preview' | 'split') => void
}

const Header: React.FC<HeaderProps> = ({ 
  isDarkMode, 
  setIsDarkMode, 
  activeView, 
  setActiveView 
}) => {
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
        
        <button 
          className="p-2 rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
          title="导出"
        >
          <FaFileExport />
        </button>
        
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