export const initialMarkdown = `# 欢迎使用 MarkFlow Lite

这是一个**在线 Markdown 编辑器**，具有以下特性：

- 实时编辑和预览
- 支持数学公式（KaTeX）
- 支持流程图（Mermaid）
- 本地存储
- 主题切换
- 文件导出

## 基本语法示例

### 文本样式

*斜体* 和 **粗体** 文本

### 列表

无序列表：
- 项目 1
- 项目 2
- 项目 3

有序列表：
1. 第一项
2. 第二项
3. 第三项

### 链接和图片

[MarkFlow Lite](https://github.com/blankzsh/markflow-lite)

### 代码块

\`\`\`javascript
function hello() {
  console.log('Hello, MarkFlow Lite!')
}
\`\`\`

### 数学公式

行内公式：$E = mc^2$

块级公式：
$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

### 流程图

\`\`\`mermaid
graph TD
  A[开始] --> B[初始化编辑器]
  B --> C[用户编辑内容]
  C --> D[实时预览]
  D --> E[保存到本地]
  E --> F[结束]
\`\`\`

### 多级标题

# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

### 引用

> 这是一个引用块
> 
> 包含多行内容

### 分割线

---

### 表格

| 姓名 | 年龄 | 城市 |
| ---- | ---- | ---- |
| 张三 | 25 | 北京 |
| 李四 | 30 | 上海 |

享受您的写作体验！
`