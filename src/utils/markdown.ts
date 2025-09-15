import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'
import DOMPurify from 'dompurify'
import mk from 'markdown-it-katex'
import 'katex/dist/katex.min.css'
import abbr from 'markdown-it-abbr'
import deflist from 'markdown-it-deflist'
import footnote from 'markdown-it-footnote'
import ins from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import sub from 'markdown-it-sub'
import sup from 'markdown-it-sup'

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

// 添加插件
md.use(abbr)
  .use(deflist)
  .use(footnote)
  .use(ins)
  .use(mark)
  .use(sub)
  .use(sup)
  .use(mk, {
    "throwOnError": false,
    "errorColor": "#cc0000"
  })

// 添加mermaid代码块支持
const defaultFenceRenderer = md.renderer.rules.fence || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options)
}

md.renderer.rules.fence = function (tokens, idx, options, env, self) {
  const token = tokens[idx]
  const code = token.content.trim()
  
  // 检查是否是mermaid代码块
  if (token.info === 'mermaid') {
    return `<div class="mermaid">${code}</div>`
  }
  
  // 使用默认渲染器
  return defaultFenceRenderer(tokens, idx, options, env, self)
}

export function renderMarkdown(markdown: string): string {
  try {
    // 渲染 Markdown
    let html = md.render(markdown)
    
    // 使用 DOMPurify 进行安全清理
    html = DOMPurify.sanitize(html, {
      // 允许代码相关的标签和类
      ADD_TAGS: ['iframe', 'math', 'semantics', 'mrow', 'mi', 'mn', 'mo', 'mtext', 'mspace', 'ms', 'annotation', 'svg', 'path', 'g', 'polygon', 'polyline', 'rect', 'circle', 'ellipse', 'line', 'text', 'tspan', 'textPath', 'use'],
      ADD_ATTR: ['class', 'target', 'xmlns', 'encoding', 'display', 'alttext', 'd', 'fill', 'stroke', 'stroke-width', 'transform', 'x', 'y', 'cx', 'cy', 'r', 'width', 'height', 'viewBox', 'preserveAspectRatio', 'id']
    })
    
    return html
  } catch (error: any) {
    console.error('Markdown 渲染错误:', error)
    return `<p class="error">渲染错误: ${error.message}</p>`
  }
}