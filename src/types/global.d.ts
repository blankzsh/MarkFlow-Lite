// Global type declarations for the project

// 声明window对象上的全局属性
declare interface Window {
  i18next?: any;
  markdownit?: any;
  hljs?: any;
  DOMPurify?: any;
  mermaid?: any;
  html2pdf?: any;
}

// 声明模块
declare module 'dompurify' {
  const DOMPurify: {
    sanitize(dirty: string, cfg?: any): string;
  };
  export default DOMPurify;
}

// 声明markdown-it相关类型
declare module 'markdown-it' {
  import MarkdownIt from 'markdown-it';
  export default MarkdownIt;
}

declare module 'highlight.js' {
  import hljs from 'highlight.js';
  export default hljs;
}

// 声明mermaid相关类型
declare module 'mermaid' {
  const mermaid: {
    initialize(config: any): void;
    render(id: string, text: string): Promise<{ svg: string; bindFunctions?: (element: Element) => void }>;
    changeLanguage(lang: string): Promise<void>;
    on(event: string, callback: (data: any) => void): void;
    off(event: string, callback: (data: any) => void): void;
    language: string;
  };
  export default mermaid;
}

// 声明html2pdf.js相关类型
declare module 'html2pdf.js' {
  const html2pdf: any;
  export default html2pdf;
}

// 声明文件信息类型
interface FileInfo {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size: number;
  modified: Date;
  path: string;
}

// 声明连接类型
interface Connection {
  id: string;
  name: string;
  type: 'local' | 's3' | 'webdav';
  connected: boolean;
}

// 声明S3配置类型
interface S3Config {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucket: string;
}

// 声明WebDAV配置类型
interface WebDAVConfig {
  url: string;
  username: string;
  password: string;
}