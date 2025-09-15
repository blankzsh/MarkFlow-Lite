# 更新日志

## [1.0.0] - 2025-04-05

### 🎉 初始版本发布

#### 新增功能

- **核心编辑功能**
  - 实时 Markdown 编辑器
  - 双向实时预览
  - 支持标准 Markdown 语法
  - 代码语法高亮 (Highlight.js)
  
- **界面设计**
  - 三栏式布局（文件列表、编辑区、预览区）
  - 深色/浅色主题切换
  - 响应式设计，支持移动端使用
  - 直观的工具栏按钮
  
- **存储功能**
  - 浏览器本地存储 (localStorage)
  - 自动保存草稿
  - 内容持久化
  
- **导出功能**
  - 导出为 HTML 格式
  - 导出为 Markdown 格式
  - 一键分享链接生成
  
- **快捷操作**
  - 常用 Markdown 快捷键支持
  - 工具栏快速插入语法
  - Ctrl+B/Ctrl+I/Ctrl+K 快捷键

#### 技术特性

- **前端技术栈**
  - React 18 + TypeScript
  - Vite 构建工具
  - Tailwind CSS 样式框架
  - markdown-it Markdown 解析器
  
- **性能优化**
  - 轻量级实现，加载速度快
  - 代码分割优化
  - 移动端性能优化
  
- **安全性**
  - DOMPurify XSS 防护
  - 内容安全策略
  - 安全的 HTML 渲染

#### 已知问题

- 数学公式渲染需要网络连接加载 MathJax
- Mermaid 流程图支持待完善
- 部分高级 Markdown 扩展语法支持有限

## 开发路线图

### 版本 1.1 (计划中)
- [ ] 云同步功能 (GitHub Gist 集成)
- [ ] PDF 导出功能
- [ ] 更多导出格式支持
- [ ] 插件系统架构

### 版本 1.2 (计划中)
- [ ] PWA 支持
- [ ] AI 写作助手集成
- [ ] 版本历史管理
- [ ] 协作编辑功能

---

**说明**: 此更新日志遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/) 标准，使用 [语义化版本](https://semver.org/lang/zh-CN/) 规范。