// 远程文件管理功能实现方案
import { cloudStorageService, FileInfo } from './cloud-storage-service';

// 本地文件信息类型
interface LocalFileInfo {
  id: string;
  name: string;
  content: string;
  modified: Date;
}

/**
 * 统一文件管理器
 * 
 * 管理多种存储后端的统一接口
 */
class FileManager {
  private currentStorage: 'local' | 's3' | 'webdav' = 'local'
  private localFiles: LocalFileInfo[] = []

  constructor() {
    // 从 localStorage 加载本地文件
    this.loadLocalFiles();
  }

  // 从 localStorage 加载本地文件
  private loadLocalFiles() {
    try {
      const savedFiles = localStorage.getItem('markflow-local-files');
      if (savedFiles) {
        const parsedFiles = JSON.parse(savedFiles);
        this.localFiles = parsedFiles.map((file: any) => ({
          ...file,
          modified: new Date(file.modified)
        }));
      }
    } catch (error) {
      console.error('加载本地文件失败:', error);
      this.localFiles = [];
    }
  }

  // 保存本地文件到 localStorage
  private saveLocalFiles() {
    try {
      localStorage.setItem('markflow-local-files', JSON.stringify(this.localFiles));
    } catch (error) {
      console.error('保存本地文件失败:', error);
    }
  }

  // 设置当前存储后端
  setCurrentStorage(storage: 'local' | 's3' | 'webdav') {
    this.currentStorage = storage
  }

  // 连接到存储
  async connect(storage: 's3' | 'webdav', config: any): Promise<{ success: boolean; message: string }> {
    switch (storage) {
      case 's3':
        return cloudStorageService.connectToS3(config)
      case 'webdav':
        return cloudStorageService.connectToWebDAV(config)
      default:
        return { success: false, message: '不支持的存储类型' }
    }
  }

  // 断开存储连接
  disconnect() {
    cloudStorageService.disconnect()
    this.currentStorage = 'local'
  }

  // 获取连接状态
  getConnectionStatus() {
    return cloudStorageService.getConnectionStatus()
  }

  // 获取当前存储类型
  getCurrentStorageType() {
    return cloudStorageService.getCurrentStorageType()
  }

  // 创建本地文件
  createLocalFile(name: string, content: string = '') {
    const newFile: LocalFileInfo = {
      id: Date.now().toString(),
      name,
      content,
      modified: new Date()
    };
    
    this.localFiles.push(newFile);
    this.saveLocalFiles();
    return newFile;
  }

  // 更新本地文件内容
  updateLocalFile(id: string, content: string) {
    const file = this.localFiles.find(f => f.id === id);
    if (file) {
      file.content = content;
      file.modified = new Date();
      this.saveLocalFiles();
    }
  }

  // 删除本地文件
  deleteLocalFile(id: string) {
    this.localFiles = this.localFiles.filter(f => f.id !== id);
    this.saveLocalFiles();
  }

  // 清空所有本地文件
  clearLocalFiles() {
    this.localFiles = [];
    this.saveLocalFiles();
  }

  // 获取本地文件内容
  getLocalFileContent(id: string): string | null {
    const file = this.localFiles.find(f => f.id === id);
    return file ? file.content : null;
  }

  // 获取本地文件列表
  getLocalFiles(): FileInfo[] {
    return this.localFiles.map(file => ({
      name: file.name,
      type: 'file',
      size: file.content.length,
      modified: file.modified,
      path: file.id
    }));
  }

  // 列出文件
  async listFiles(path: string = '/'): Promise<FileInfo[]> {
    switch (this.currentStorage) {
      case 's3':
      case 'webdav':
        return cloudStorageService.listFiles(path)
      case 'local':
      default:
        // 返回本地文件列表
        return this.getLocalFiles();
    }
  }

  // 读取文件
  async readFile(path: string): Promise<string> {
    switch (this.currentStorage) {
      case 's3':
      case 'webdav':
        return cloudStorageService.readFile(path)
      case 'local':
      default:
        // 读取本地文件
        return this.getLocalFileContent(path) || ''
    }
  }

  // 写入文件
  async writeFile(path: string, content: string): Promise<void> {
    switch (this.currentStorage) {
      case 's3':
      case 'webdav':
        return cloudStorageService.writeFile(path, content)
      case 'local':
      default:
        // 更新本地文件
        this.updateLocalFile(path, content)
    }
  }

  // 删除文件
  async deleteFile(path: string): Promise<void> {
    switch (this.currentStorage) {
      case 's3':
      case 'webdav':
        return cloudStorageService.deleteFile(path)
      case 'local':
      default:
        // 删除本地文件
        this.deleteLocalFile(path)
    }
  }
}

// 导出管理器实例
export const fileManager = new FileManager()