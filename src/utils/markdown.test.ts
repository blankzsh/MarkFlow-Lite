import { describe, test, expect } from 'vitest'
import { renderMarkdown } from '../utils/markdown'

describe('Markdown Rendering', () => {
  test('should render basic markdown', () => {
    const markdown = '# Hello World'
    const html = renderMarkdown(markdown)
    expect(html).toContain('<h1>Hello World</h1>')
  })

  test('should render bold text', () => {
    const markdown = '**bold text**'
    const html = renderMarkdown(markdown)
    expect(html).toContain('<strong>bold text</strong>')
  })

  test('should render italic text', () => {
    const markdown = '*italic text*'
    const html = renderMarkdown(markdown)
    expect(html).toContain('<em>italic text</em>')
  })
})