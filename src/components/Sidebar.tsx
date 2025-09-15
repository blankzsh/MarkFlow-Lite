import React, { useState, useEffect } from 'react'
import FileTree from './FileTree'
import { fileManager } from '../utils/file-manager'

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

interface SidebarProps {
  onNewDocument: () => void
  onOpenDocument: () => void
  onFileSelect: (file: FileInfo) => void
  onS3Connect?: () => void
  onWebDAVConnect?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ onNewDocument, onOpenDocument, onFileSelect, onS3Connect, onWebDAVConnect }) => {
  const [files, setFiles] = useState<FileInfo[]>([
    { id: '1', name: '文档', type: 'folder', path: '/', modified: new Date() },
    { id: '2', name: '未命名文档.md', type: 'file', path: '/未命名文档.md', modified: new Date() },
    { id: '3', name: '项目计划.md', type: 'file', path: '/项目计划.md', modified: new Date() },
    { id: '4', name: '笔记', type: 'folder', path: '/笔记', modified: new Date() },
    { id: '5', name: '学习笔记.md', type: 'file', path: '/笔记/学习笔记.md', modified: new Date() },
  ])
  
  const [connections, setConnections] = useState<Connection[]>([
    { id: 's3-1', name: 'AWS S3 存储', type: 's3', connected: false },
    { id: 'webdav-1', name: 'WebDAV 服务器', type: 'webdav', connected: false },
    { id: 'local-1', name: '本地存储', type: 'local', connected: true }
  ])
  
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    '1': true,
    '4': true
  })

  // 更新连接状态
  useEffect(() => {
    const updateConnectionStatus = () => {
      const storageType = fileManager.getCurrentStorageType();
      const isConnected = storageType !== null;
      
      setConnections(prev => prev.map(conn => {
        if (conn.type === 's3' && storageType === 's3') {
          return { ...conn, connected: true };
        } else if (conn.type === 'webdav' && storageType === 'webdav') {
          return { ...conn, connected: true };
        } else if (conn.type === 's3' || conn.type === 'webdav') {
          return { ...conn, connected: false };
        }
        return conn;
      }));
    };

    updateConnectionStatus();
  }, []);

  const handleFolderToggle = (folderId: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }))
  }

  const handleConnect = (connectionId: string) => {
    // 根据连接类型触发相应的连接操作
    if (connectionId === 's3-1') {
      // 触发 S3 配置弹窗
      if (onS3Connect) {
        onS3Connect();
      }
    } else if (connectionId === 'webdav-1') {
      // 触发 WebDAV 配置弹窗
      if (onWebDAVConnect) {
        onWebDAVConnect();
      }
    }
  }

  const handleDisconnect = (connectionId: string) => {
    // 断开连接
    fileManager.disconnect();
    
    // 更新连接状态
    setConnections(prev => prev.map(conn => 
      conn.id === connectionId ? { ...conn, connected: false } : conn
    ));
    
    // 刷新文件列表
    refreshFileList();
  }

  const handleRefresh = (connectionId: string) => {
    // 刷新文件列表
    refreshFileList();
  }

  const refreshFileList = () => {
    // 在实际应用中，这里会从云存储获取最新的文件列表
    console.log('刷新文件列表');
  }

  const handleCreateFolder = (parentId: string) => {
    // 模拟创建文件夹操作
    console.log(`创建文件夹在 ${parentId}`)
  }

  const handleDelete = (itemId: string, type: 'file' | 'folder') => {
    // 模拟删除操作
    console.log(`删除 ${type} ${itemId}`)
  }

  return (
    <div className="w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col h-full shadow-lg">
      <FileTree
        files={files}
        connections={connections}
        onFileSelect={onFileSelect}
        onFolderToggle={handleFolderToggle}
        expandedFolders={expandedFolders}
        onNewDocument={onNewDocument}
        onOpenDocument={onOpenDocument}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        onRefresh={handleRefresh}
        onCreateFolder={handleCreateFolder}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default Sidebar