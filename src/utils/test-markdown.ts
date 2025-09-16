import { renderMarkdown } from './markdown';

// 测试用的markdown内容
const testMarkdown = `
# 标题1

## 标题2

这是一个段落，包含**粗体**和*斜体*文本。

- 列表项1
- 列表项2

\`\`\`javascript
console.log('Hello World');
\`\`\`
`;

console.log('输入的Markdown:');
console.log(testMarkdown);

const renderedHtml = renderMarkdown(testMarkdown);
console.log('渲染后的HTML:');
console.log(renderedHtml);

// 验证是否包含关键的HTML标签
const hasHeader = renderedHtml.includes('<h1>');
const hasParagraph = renderedHtml.includes('<p>');
const hasStrong = renderedHtml.includes('<strong>');
const hasEm = renderedHtml.includes('<em>');

console.log('验证结果:');
console.log('- 包含<h1>标签:', hasHeader);
console.log('- 包含<p>标签:', hasParagraph);
console.log('- 包含<strong>标签:', hasStrong);
console.log('- 包含<em>标签:', hasEm);

if (hasHeader && hasParagraph && hasStrong && hasEm) {
  console.log('✅ 渲染功能正常工作');
} else {
  console.log('❌ 渲染功能存在问题');
}