import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'
import DOMPurify from 'dompurify'

// 高亮函数
const highlight = function (str: string, lang: string, md: MarkdownIt): string {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return `<pre class="hljs"><code class="language-${lang}">${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`
    } catch (__) {}
  }
  
  return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
}

// 创建 markdown-it 实例
const md: MarkdownIt = new MarkdownIt({
  html: true,
  xhtmlOut: true,
  breaks: true,
  linkify: true,
  typographer: true,
  quotes: '“”‘’',
  highlight: function (str, lang) {
    return highlight(str, lang, md)
  }
})

export function renderMarkdown(markdown: string): string {
  try {
    // 渲染 Markdown
    let html = md.render(markdown)
    
    // 使用 DOMPurify 进行安全清理
    html = DOMPurify.sanitize(html, {
      // 允许代码相关的标签和类
      ADD_TAGS: ['iframe'],
      ADD_ATTR: ['class', 'target']
    })
    
    return html
  } catch (error: any) {
    console.error('Markdown 渲染错误:', error)
    return `<p class="error">渲染错误: ${error.message}</p>`
  }
}