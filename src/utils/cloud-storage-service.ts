// 网络连接服务，用于管理 S3 和 WebDAV 连接
import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand
} from '@aws-sdk/client-s3';
import { createClient } from 'webdav';

// S3 连接配置类型
interface S3Config {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucket: string;
}

// WebDAV 连接配置类型
interface WebDAVConfig {
  url: string;
  username: string;
  password: string;
}

// 文件信息类型
export interface FileInfo {
  name: string;
  type: 'file' | 'folder';
  size: number;
  modified: Date;
  path: string;
}

// 连接状态类型
type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

class CloudStorageService {
  private s3Client: S3Client | null = null;
  private s3Config: S3Config | null = null;
  private webdavClient: any | null = null;
  private webdavConfig: WebDAVConfig | null = null;
  private currentStorageType: 's3' | 'webdav' | null = null;

  // S3 连接
  async connectToS3(config: S3Config): Promise<{ success: boolean; message: string }> {
    try {
      this.s3Config = config;
      this.s3Client = new S3Client({
        region: config.region,
        credentials: {
          accessKeyId: config.accessKeyId,
          secretAccessKey: config.secretAccessKey
        }
      });
      
      // 测试连接
      await this.s3Client.send(new ListObjectsV2Command({
        Bucket: config.bucket,
        MaxKeys: 1
      }));
      
      this.currentStorageType = 's3';
      return { success: true, message: 'S3 连接成功' };
    } catch (error: any) {
      console.error('S3 连接失败:', error);
      return { success: false, message: `S3 连接失败: ${error.message}` };
    }
  }

  // WebDAV 连接
  async connectToWebDAV(config: WebDAVConfig): Promise<{ success: boolean; message: string }> {
    try {
      this.webdavConfig = config;
      this.webdavClient = createClient(config.url, {
        username: config.username,
        password: config.password
      });
      
      // 测试连接
      await this.webdavClient.getDirectoryContents('/');
      
      this.currentStorageType = 'webdav';
      return { success: true, message: 'WebDAV 连接成功' };
    } catch (error: any) {
      console.error('WebDAV 连接失败:', error);
      return { success: false, message: `WebDAV 连接失败: ${error.message}` };
    }
  }

  // 断开连接
  disconnect() {
    this.s3Client = null;
    this.s3Config = null;
    this.webdavClient = null;
    this.webdavConfig = null;
    this.currentStorageType = null;
  }

  // 获取连接状态
  getConnectionStatus(): ConnectionStatus {
    if (this.currentStorageType === 's3' && this.s3Client) {
      return 'connected';
    } else if (this.currentStorageType === 'webdav' && this.webdavClient) {
      return 'connected';
    } else if (this.currentStorageType) {
      return 'error';
    }
    return 'disconnected';
  }

  // 获取当前存储类型
  getCurrentStorageType(): 's3' | 'webdav' | null {
    return this.currentStorageType;
  }

  // 列出文件
  async listFiles(path: string = '/'): Promise<FileInfo[]> {
    if (this.currentStorageType === 's3' && this.s3Client && this.s3Config) {
      try {
        const command = new ListObjectsV2Command({
          Bucket: this.s3Config.bucket,
          Prefix: path === '/' ? '' : path,
          Delimiter: '/'
        });
        
        const response = await this.s3Client.send(command);
        
        const files: FileInfo[] = [];
        
        // 处理文件
        if (response.Contents) {
          response.Contents.forEach(item => {
            if (item.Key && item.Key !== (path === '/' ? '' : path)) {
              const name = item.Key.split('/').pop() || item.Key;
              files.push({
                name,
                type: 'file',
                size: item.Size || 0,
                modified: item.LastModified || new Date(),
                path: item.Key
              });
            }
          });
        }
        
        // 处理文件夹
        if (response.CommonPrefixes) {
          response.CommonPrefixes.forEach(prefix => {
            if (prefix.Prefix) {
              const name = prefix.Prefix.slice(0, -1).split('/').pop() || prefix.Prefix;
              files.push({
                name,
                type: 'folder',
                size: 0,
                modified: new Date(),
                path: prefix.Prefix
              });
            }
          });
        }
        
        return files;
      } catch (error) {
        console.error('S3 文件列表获取失败:', error);
        throw new Error('无法获取 S3 文件列表');
      }
    } else if (this.currentStorageType === 'webdav' && this.webdavClient) {
      try {
        const items = await this.webdavClient.getDirectoryContents(path);
        
        return items.map((item: any) => ({
          name: item.basename || item.filename,
          type: item.type === 'directory' ? 'folder' : 'file',
          size: item.size || 0,
          modified: new Date(item.lastmod),
          path: item.filename
        }));
      } catch (error) {
        console.error('WebDAV 文件列表获取失败:', error);
        throw new Error('无法获取 WebDAV 文件列表');
      }
    } else {
      throw new Error('未连接到任何存储服务');
    }
  }

  // 读取文件
  async readFile(path: string): Promise<string> {
    if (this.currentStorageType === 's3' && this.s3Client && this.s3Config) {
      try {
        const command = new GetObjectCommand({
          Bucket: this.s3Config.bucket,
          Key: path
        });
        
        const response = await this.s3Client.send(command);
        const content = await response.Body?.transformToString();
        
        return content || '';
      } catch (error) {
        console.error('S3 文件读取失败:', error);
        throw new Error('无法读取 S3 文件');
      }
    } else if (this.currentStorageType === 'webdav' && this.webdavClient) {
      try {
        const content = await this.webdavClient.getFileContents(path, { format: 'text' });
        return content;
      } catch (error) {
        console.error('WebDAV 文件读取失败:', error);
        throw new Error('无法读取 WebDAV 文件');
      }
    } else {
      throw new Error('未连接到任何存储服务');
    }
  }

  // 写入文件
  async writeFile(path: string, content: string): Promise<void> {
    if (this.currentStorageType === 's3' && this.s3Client && this.s3Config) {
      try {
        const command = new PutObjectCommand({
          Bucket: this.s3Config.bucket,
          Key: path,
          Body: content
        });
        
        await this.s3Client.send(command);
      } catch (error) {
        console.error('S3 文件写入失败:', error);
        throw new Error('无法写入 S3 文件');
      }
    } else if (this.currentStorageType === 'webdav' && this.webdavClient) {
      try {
        await this.webdavClient.putFileContents(path, content, { overwrite: true });
      } catch (error) {
        console.error('WebDAV 文件写入失败:', error);
        throw new Error('无法写入 WebDAV 文件');
      }
    } else {
      throw new Error('未连接到任何存储服务');
    }
  }

  // 删除文件
  async deleteFile(path: string): Promise<void> {
    if (this.currentStorageType === 's3' && this.s3Client && this.s3Config) {
      try {
        const command = new DeleteObjectCommand({
          Bucket: this.s3Config.bucket,
          Key: path
        });
        
        await this.s3Client.send(command);
      } catch (error) {
        console.error('S3 文件删除失败:', error);
        throw new Error('无法删除 S3 文件');
      }
    } else if (this.currentStorageType === 'webdav' && this.webdavClient) {
      try {
        await this.webdavClient.deleteFile(path);
      } catch (error) {
        console.error('WebDAV 文件删除失败:', error);
        throw new Error('无法删除 WebDAV 文件');
      }
    } else {
      throw new Error('未连接到任何存储服务');
    }
  }
}

// 创建并导出服务实例
export const cloudStorageService = new CloudStorageService();