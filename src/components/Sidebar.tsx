import React from 'react'
import { FaPlus, FaFolderOpen, FaFileImport, FaFile } from 'react-icons/fa'

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">文档</h2>
        <div className="flex space-x-2">
          <button className="flex-1 flex items-center justify-center py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm">
            <FaPlus className="mr-1" /> 新建
          </button>
          <button className="p-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-600">
            <FaFolderOpen />
          </button>
          <button className="p-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-600">
            <FaFileImport />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-2">
        <div className="px-4 py-2 flex items-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer">
          <FaFile className="mr-2" />
          <span className="truncate">未命名文档.md</span>
        </div>
        <div className="px-4 py-2 flex items-center text-slate-500 dark:text-slate-400 text-sm">
          <span>没有更多文档</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar