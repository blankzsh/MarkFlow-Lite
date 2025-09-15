# MarkFlow Lite

> 一个纯前端在线 Markdown 编辑器

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

MarkFlow Lite 是一个完全运行在浏览器中的纯前端 Markdown 编辑器，无需服务器支持，开箱即用，支持实时编辑、双向预览、本地保存和内容分享。

## 🌟 特性

- ✍️ **实时编辑** - 支持标准 Markdown 语法（含表格、代码块、列表等）
- 👁️ **实时预览** - 边写边看，支持数学公式和流程图渲染
- 💾 **本地存储** - 自动保存草稿到浏览器本地存储
- 📄 **文件导出** - 支持导出为 PDF、HTML 等格式
- 🔗 **内容分享** - 生成唯一链接，内容可通过 URL 参数共享
- 🎨 **主题切换** - 提供深色/浅色主题，适配不同阅读环境
- ⌨️ **快捷操作** - 支持常用快捷键（加粗、斜体、标题插入等）
- 📱 **响应式设计** - 支持桌面、平板、手机访问

## 🚀 快速开始

### 在线使用

直接访问 [MarkFlow Lite](https://editor.currso.com) 即可开始使用。

### 本地开发

```bash
# 克隆项目
git clone https://github.com/blankzsh/markflow_lite.git

# 进入项目目录
cd markflow-lite

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 🛠️ 技术栈

- **开发框架**: React + TypeScript + Vite
- **Markdown 解析**: markdown-it
- **代码高亮**: Highlight.js
- **样式设计**: Tailwind CSS + @tailwindcss/typography
- **数学公式**: MathJax (通过 markdown-it-mathjax3)
- **构建工具**: Vite
- **部署平台**: GitHub Pages / Vercel / Netlify

## 📖 使用指南

### 基本操作

1. **编辑模式** - 在左侧编辑区域编写 Markdown 内容
2. **预览模式** - 实时查看渲染后的效果
3. **分屏模式** - 同时查看编辑和预览区域

### 快捷键

- `Ctrl + B` - 粗体
- `Ctrl + I` - 斜体
- `Ctrl + K` - 插入链接

### 支持的语法

- 标题 (#, ##, ###, ...)
- 文本样式 (粗体、斜体、删除线)
- 列表 (有序、无序、任务列表)
- 链接和图片
- 代码块和行内代码
- 引用块
- 表格
- 水平分割线
- 数学公式 (LaTeX)
- 流程图 (Mermaid)

## 📤 导出功能

- **PDF 导出** - 将文档导出为 PDF 格式
- **HTML 导出** - 导出为独立的 HTML 文件
- **Markdown 导出** - 导出原始 Markdown 文件

## 🔧 部署

### 部署到 Vercel

```bash
npm run build
vercel --prod
```

### 部署到 Netlify

```bash
npm run build
# 上传 dist 目录到 Netlify
```

### 部署到 GitHub Pages

```bash
npm run build
# 将 dist 目录推送到 gh-pages 分支
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进 MarkFlow Lite。

### 开发流程

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 鸣谢

- [markdown-it](https://github.com/markdown-it/markdown-it) - Markdown 解析器
- [Highlight.js](https://highlightjs.org/) - 代码语法高亮
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [MathJax](https://www.mathjax.org/) - 数学公式渲染
- [Vite](https://vitejs.dev/) - 前端构建工具

## 📞 联系

项目地址: [https://github.com/blankzsh/markflow-lite](https://github.com/blankzsh/markflow-lite)

如有任何问题或建议，请提交 Issue 或联系项目维护者。