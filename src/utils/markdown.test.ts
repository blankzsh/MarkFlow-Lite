import { describe, it, expect } from 'vitest';
import { renderMarkdown } from '../utils/markdown';

describe('Markdown Rendering', () => {
  it('should render basic HTML tags correctly', () => {
    const markdown = `
# 标题1

## 标题2

这是一个段落，包含**粗体**和*斜体*文本。

- 列表项1
- 列表项2
`;

    const html = renderMarkdown(markdown);
    
    // 验证关键HTML标签是否存在
    expect(html).toContain('<h1>');
    expect(html).toContain('<h2>');
    expect(html).toContain('<p>');
    expect(html).toContain('<strong>');
    expect(html).toContain('<em>');
    expect(html).toContain('<ul>');
    expect(html).toContain('<li>');
    
    console.log('渲染结果:', html);
  });

  it('should render code blocks correctly', () => {
    const markdown = `
\`\`\`javascript
console.log('Hello World');
\`\`\`
`;

    const html = renderMarkdown(markdown);
    
    expect(html).toContain('<pre');
    expect(html).toContain('<code');
    expect(html).toContain('class="language-javascript"');
    
    console.log('代码块渲染结果:', html);
  });
});