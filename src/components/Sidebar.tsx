import React, { useState, useEffect } from 'react'
import FileTree from './FileTree'
import { fileManager, FileInfo } from '../utils/file-manager'

interface SidebarProps {
  onNewDocument: () => void
  onOpenDocument: () => void
  onFileSelect: (file: FileInfo) => void
  onS3Connect?: () => void
  onWebDAVConnect?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ onNewDocument, onOpenDocument, onFileSelect, onS3Connect, onWebDAVConnect }) => {
  const [files, setFiles] = useState<FileInfo[]>([])
  const [connections, setConnections] = useState([
    { id: 's3-1', name: 'AWS S3 存储', type: 's3', connected: false },
    { id: 'webdav-1', name: 'WebDAV 服务器', type: 'webdav', connected: false },
    { id: 'local-1', name: '本地存储', type: 'local', connected: true }
  ])
  
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'local-root': true
  })
  
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // 加载文件列表
  useEffect(() => {
    loadFileList()
  }, [])

  // 监听文件创建事件
  useEffect(() => {
    const handleFileCreated = () => {
      loadFileList()
    }

    const handleFilesCleared = () => {
      loadFileList()
    }

    window.addEventListener('fileCreated', handleFileCreated)
    window.addEventListener('filesCleared', handleFilesCleared)
    
    return () => {
      window.removeEventListener('fileCreated', handleFileCreated)
      window.removeEventListener('filesCleared', handleFilesCleared)
    }
  }, [])

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

  // 加载文件列表（带防抖）
  const loadFileList = async () => {
    if (isLoading) {
      return;
    }
    
    setIsLoading(true);
    try {
      // 添加一个小延迟避免过于频繁的调用
      await new Promise(resolve => setTimeout(resolve, 50));
      const fileList = await fileManager.listFiles('/')
      setFiles(fileList)
    } catch (error) {
      console.error('加载文件列表失败:', error)
      // 如果加载失败，使用空列表
      setFiles([])
    } finally {
      setIsLoading(false);
    }
  }

  // 新建文档
  const handleNewDocument = () => {
    // 调用父组件的onNewDocument函数
    onNewDocument()
    // 等待一段时间确保文件创建完成，然后更新文件列表
    setTimeout(() => {
      loadFileList()
    }, 100)
  }

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
    
    // 重新加载本地文件列表
    loadFileList();
  }

  const handleRefresh = (connectionId: string) => {
    // 刷新文件列表
    loadFileList();
  }

  const handleCreateFolder = (parentId: string) => {
    // 模拟创建文件夹操作
    console.log(`创建文件夹在 ${parentId}`)
  }

  const handleDelete = (itemId: string, type: 'file' | 'folder') => {
    // 删除文件
    if (type === 'file') {
      // 确认删除
      const file = files.find(f => f.path === itemId);
      if (file && !window.confirm(`确定要删除文件 "${file.name}" 吗？`)) {
        return;
      }
      
      fileManager.deleteFile(itemId)
        .then(() => {
          // 重新加载文件列表
          loadFileList()
        })
        .catch(error => {
          console.error('删除文件失败:', error)
          alert('删除文件失败')
        })
    }
  }

  // 处理文件拖拽
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          // 创建本地文件
          const newFile = fileManager.createLocalFile(file.name, content);
          // 重新加载文件列表
          loadFileList();
        }
      };
      
      reader.readAsText(file);
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  }

  return (
    <div 
      className="w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col h-full shadow-lg"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <FileTree
        files={files}
        connections={connections}
        onFileSelect={onFileSelect}
        onFolderToggle={handleFolderToggle}
        expandedFolders={expandedFolders}
        onNewDocument={handleNewDocument}
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