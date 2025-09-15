import React, { useState } from 'react'
import { FaPlus, FaFolderOpen, FaFileImport, FaFile, FaFolder, FaChevronRight, FaChevronDown, FaCloud, FaServer, FaDesktop, FaSync, FaTrash, FaEdit, FaPlug, FaCircle } from 'react-icons/fa'

interface FileInfo {
  id: string
  name: string
  type: 'file' | 'folder'
  path: string
  modified: Date
  size?: number
}

interface Connection {
  id: string
  name: string
  type: 'local' | 's3' | 'webdav'
  connected: boolean
  lastSync?: Date
}

interface FileTreeProps {
  files: FileInfo[]
  connections: Connection[]
  onFileSelect: (file: FileInfo) => void
  onFolderToggle: (folderId: string) => void
  expandedFolders: Record<string, boolean>
  onNewDocument: () => void
  onOpenDocument: () => void
  onConnect: (connectionId: string) => void
  onDisconnect: (connectionId: string) => void
  onRefresh: (connectionId: string) => void
  onCreateFolder: (parentId: string) => void
  onDelete: (itemId: string, type: 'file' | 'folder') => void
}

const FileTree: React.FC<FileTreeProps> = ({
  files,
  connections,
  onFileSelect,
  onFolderToggle,
  expandedFolders,
  onNewDocument,
  onOpenDocument,
  onConnect,
  onDisconnect,
  onRefresh,
  onCreateFolder,
  onDelete
}) => {
  // 获取根级别的项目
  const getRootItems = () => {
    return files.filter(f => f.path.split('/').length === 2)
  }

  // 获取子项目
  const getChildItems = (parentPath: string) => {
    return files.filter(f => 
      f.path.startsWith(parentPath + '/') && 
      f.path.split('/').length === parentPath.split('/').length + 1
    )
  }

  // 渲染文件树节点
  const renderTreeNode = (item: FileInfo, depth: number = 0) => {
    const isExpanded = expandedFolders[item.id]
    
    return (
      <div key={item.id}>
        <div 
          className={`flex items-center py-1.5 px-2 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer rounded mx-1 transition-colors duration-150 ${
            item.type === 'file' ? 'pl-' + (depth * 4 + 6) : ''
          }`}
          style={{ paddingLeft: `${depth * 20 + 8}px` }}
          onClick={() => {
            if (item.type === 'file') {
              onFileSelect(item)
            } else {
              onFolderToggle(item.id)
            }
          }}
        >
          {item.type === 'folder' ? (
            <button 
              className="mr-1.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-150"
              onClick={(e) => {
                e.stopPropagation()
                onFolderToggle(item.id)
              }}
            >
              {isExpanded ? <FaChevronDown size={10} /> : <FaChevronRight size={10} />}
            </button>
          ) : (
            <span className="mr-1.5 w-3"></span>
          )}
          
          {item.type === 'folder' ? (
            <FaFolder className="mr-2 text-blue-500 flex-shrink-0" size={14} />
          ) : (
            <FaFile className="mr-2 text-gray-500 flex-shrink-0" size={14} />
          )}
          
          <span className="truncate flex-grow text-sm">{item.name}</span>
          
          {item.type === 'file' && (
            <div className="flex space-x-1 opacity-0 hover:opacity-100 transition-opacity duration-200">
              <button 
                className="p-1 text-slate-500 hover:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(item.id, 'file')
                }}
              >
                <FaTrash size={10} />
              </button>
            </div>
          )}
        </div>
        
        {item.type === 'folder' && isExpanded && (
          <div className="relative">
            {/* 连接线 */}
            {getChildItems(item.path).length > 0 && (
              <div 
                className="absolute border-l border-slate-300 dark:border-slate-600 h-full" 
                style={{ left: `${depth * 20 + 18}px` }}
              ></div>
            )}
            {getChildItems(item.path).map((child, index, arr) => {
              const isLast = index === arr.length - 1;
              return (
                <div key={child.id} className="relative">
                  {/* 节点连接线 */}
                  <div 
                    className="absolute border-t border-slate-300 dark:border-slate-600 w-3" 
                    style={{ left: `${depth * 20 + 18}px`, top: '18px' }}
                  ></div>
                  {isLast && (
                    <div 
                      className="absolute border-l border-slate-300 dark:border-slate-600 h-5" 
                      style={{ left: `${depth * 20 + 18}px`, top: '0', height: '18px' }}
                    ></div>
                  )}
                  {renderTreeNode(child, depth + 1)}
                </div>
              );
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* 工具栏 */}
      <div className="p-3 border-b border-slate-200 dark:border-slate-700">
        <div className="flex space-x-2">
          <button 
            className="flex-1 flex items-center justify-center py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors duration-200 shadow-sm"
            onClick={onNewDocument}
            title="新建文档"
          >
            <FaPlus size={12} className="mr-1" />
            <span>新建</span>
          </button>
          <button 
            className="p-1.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-200"
            onClick={onOpenDocument}
            title="打开文档"
          >
            <FaFolderOpen size={14} />
          </button>
          <button 
            className="p-1.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-200"
            title="导入文档"
          >
            <FaFileImport size={14} />
          </button>
        </div>
      </div>
      
      {/* 文件树 */}
      <div className="flex-1 overflow-y-auto py-2 px-1">
        {/* 本地文件 */}
        <div className="px-3 py-2 flex items-center text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider">
          <FaDesktop className="mr-2 text-green-500" size={12} />
          <span>本地文件</span>
        </div>
        
        {getRootItems().filter(f => f.type === 'folder').map(folder => renderTreeNode(folder))}
        
        {getRootItems().filter(f => f.type === 'file').map(file => renderTreeNode(file))}
        
        {/* 云存储连接 */}
        <div className="px-3 py-2 mt-3 flex items-center text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider">
          <FaCloud className="mr-2 text-blue-500" size={12} />
          <span>云存储</span>
        </div>
        
        {connections.map(conn => (
          <div 
            key={conn.id}
            className="px-3 py-2 flex items-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer rounded mx-1 transition-colors duration-150"
            onClick={() => onConnect(conn.id)}
          >
            {conn.type === 's3' ? (
              <FaServer className={`mr-2 flex-shrink-0 ${conn.connected ? 'text-yellow-500' : 'text-slate-400'}`} size={14} />
            ) : conn.type === 'webdav' ? (
              <FaCloud className={`mr-2 flex-shrink-0 ${conn.connected ? 'text-blue-500' : 'text-slate-400'}`} size={14} />
            ) : (
              <FaDesktop className={`mr-2 flex-shrink-0 ${conn.connected ? 'text-green-500' : 'text-slate-400'}`} size={14} />
            )}
            
            <div className="flex flex-col flex-grow min-w-0">
              <div className="flex items-center">
                <span className="truncate text-sm font-medium">{conn.name}</span>
                {conn.connected && (
                  <FaCircle className="ml-2 text-green-500" size={6} />
                )}
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {conn.connected ? '已连接' : '未连接'}
              </span>
            </div>
            
            <div className="flex space-x-1 ml-2">
              <button 
                className="p-1.5 text-slate-500 hover:text-blue-500 dark:hover:text-blue-400 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation()
                  onRefresh(conn.id)
                }}
                title="刷新"
              >
                <FaSync size={12} />
              </button>
              
              {conn.connected ? (
                <button 
                  className="p-1.5 text-slate-500 hover:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDisconnect(conn.id)
                  }}
                  title="断开连接"
                >
                  <FaTrash size={12} />
                </button>
              ) : (
                <button 
                  className="p-1.5 text-slate-500 hover:text-green-500 dark:hover:text-green-400 rounded-full hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation()
                    onConnect(conn.id)
                  }}
                  title="连接"
                >
                  <FaEdit size={12} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* 状态栏 */}
      <div className="px-3 py-2 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
        {files.filter(f => f.type === 'file').length} 个文件
      </div>
    </div>
  )
}

export default FileTree