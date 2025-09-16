# MarkFlow Lite

> Um editor Markdown online de front-end puro

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub last commit](https://img.shields.io/github/last-commit/blankzsh/markflow-lite)](https://github.com/blankzsh/markflow-lite/commits/main)
[![GitHub issues](https://img.shields.io/github/issues/blankzsh/markflow-lite)](https://github.com/blankzsh/markflow-lite/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/blankzsh/markflow-lite)](https://github.com/blankzsh/markflow-lite/pulls)
[![GitHub stars](https://img.shields.io/github/stars/blankzsh/markflow-lite)](https://github.com/blankzsh/markflow-lite/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/blankzsh/markflow-lite)](https://github.com/blankzsh/markflow-lite/network/members)

<p align="center">
  <a href="README.md">中文</a> •
  <a href="README_en.md">English</a> •
  <a href="README_ja.md">日本語</a> •
  <a href="README_es.md">Español</a> •
  <a href="README_de.md">Deutsch</a>
</p>

MarkFlow Lite é um editor Markdown de front-end puro que roda inteiramente no navegador, não requer suporte de servidor e está pronto para usar, com suporte para edição em tempo real, pré-visualização dupla, salvamento local e compartilhamento de conteúdo.

## 🌟 Recursos

- ✍️ **Edição em tempo real** - Suporta sintaxe Markdown padrão (incluindo tabelas, blocos de código, listas, etc.)
- 👁️ **Pré-visualização em tempo real** - Veja enquanto escreve, suporta fórmulas matemáticas e renderização de fluxogramas
- 💾 **Armazenamento local** - Salva automaticamente rascunhos no armazenamento local do navegador
- 📄 **Exportação de arquivos** - Suporta exportação para formatos PDF, HTML, Markdown
- 📂 **Gerenciamento de arquivos** - Suporta criação de novos documentos, abertura de arquivos Markdown locais
- 🔗 **Compartilhamento de conteúdo** - Gera links únicos, conteúdo pode ser compartilhado via parâmetros de URL
- 🎨 **Troca de tema** - Fornece temas escuro/claro, adaptados a diferentes ambientes de leitura
- ⌨️ **Operações de atalho** - Suporta atalhos comuns (negrito, itálico, inserção de título, etc.)
- 📱 **Design responsivo** - Suporta acesso em desktop, tablet e dispositivos móveis

## 🚀 Início rápido

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)

### Uso online

Visite [MarkFlow Lite](https://editor.currso.com) diretamente para começar a usar.

### Desenvolvimento local

```bash
# Clone o projeto
git clone https://github.com/blankzsh/markflow-lite.git

# Entre no diretório do projeto
cd markflow-lite

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Construa para produção
npm run build

# Pré-visualize a construção de produção
npm run preview
```

## 🛠️ Stack tecnológica

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Markdown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white)](https://markdown-it.github.io/)

- **Framework de desenvolvimento**: React + TypeScript + Vite
- **Análise de Markdown**: markdown-it
- **Destaque de código**: Highlight.js
- **Design de estilo**: Tailwind CSS + @tailwindcss/typography
- **Fórmulas matemáticas**: MathJax (via markdown-it-mathjax3)
- **Suporte a fluxogramas**: Mermaid
- **Ferramenta de construção**: Vite
- **Plataformas de deploy**: GitHub Pages / Vercel / Netlify

## 📖 Guia de uso

### Operações básicas

1. **Modo de edição** - Escreva conteúdo Markdown na área de edição esquerda
2. **Modo de pré-visualização** - Veja o efeito renderizado em tempo real
3. **Modo dividido** - Veja ambas as áreas de edição e pré-visualização simultaneamente

### Atalhos

- `Ctrl + B` - Negrito
- `Ctrl + I` - Itálico
- `Ctrl + K` - Inserir link

### Integração de armazenamento em nuvem

MarkFlow Lite suporta múltiplos backends de armazenamento em nuvem:

1. **AWS S3** - Conecte-se a buckets de armazenamento S3 para gerenciamento de arquivos
2. **WebDAV** - Conecte-se a qualquer servidor habilitado para WebDAV
3. **Armazenamento local** - Armazenamento local do navegador (padrão)

Através do explorador de arquivos, você pode:
- Conectar e desconectar serviços de armazenamento em nuvem
- Navegar estruturas de pastas remotas
- Criar, editar e excluir arquivos remotos
- Sincronizar arquivos locais e remotos

### Sintaxe suportada

- Cabeçalhos (#, ##, ###, ...)
- Estilos de texto (negrito, itálico, tachado)
- Listas (ordenadas, não ordenadas, listas de tarefas)
- Links e imagens
- Blocos de código e código inline
- Citações em bloco
- Tabelas
- Regras horizontais
- Fórmulas matemáticas (LaTeX)
- Fluxogramas (Mermaid)

### Uso de fluxogramas Mermaid

Suporta múltiplos tipos de gráficos Mermaid:

```markdown
```mermaid
graph TD
  A[Início] --> B[Processo]
  B --> C[Fim]
```
```

Tipos de gráficos suportados:
- Fluxogramas (Flowchart)
- Diagramas de sequência (Sequence Diagram)
- Diagramas de Gantt (Gantt Diagram)
- Diagramas de classe (Class Diagram)
- Diagramas de estado (State Diagram)

## 📤 Funções de exportação

- **Exportação PDF** - Exporte documentos para o formato PDF
- **Exportação HTML** - Exporte para arquivos HTML independentes
- **Exportação Markdown** - Exporte arquivos Markdown originais

## 🐛 Problemas corrigidos

### Problemas recentemente corrigidos

- Corrigido o problema de renderização de fluxogramas muito grandes, otimizado o controle de tamanho dos gráficos
- Resolvido o problema de blocos de código sendo obscurecidos por tabelas
- Corrigido grandes espaços em branco aparecendo na parte inferior da página após a renderização de fluxogramas
- Otimizado a ordem de exibição correta de todo o conteúdo na mesma camada
- Removida a funcionalidade PWA e configurações relacionadas, resolvidos problemas de compilação

## 🔧 Deploy

### Deploy no Vercel

[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

```bash
npm run build
vercel --prod
```

### Deploy no Netlify

[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://www.netlify.com/)

```bash
npm run build
# Faça upload do diretório dist para o Netlify
```

### Deploy no GitHub Pages

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)

```bash
npm run build
# Envie o diretório dist para o branch gh-pages
```

## 🤝 Contribuição

Bem-vindo para enviar Issues e Pull Requests para ajudar a melhorar o MarkFlow Lite.

### Processo de desenvolvimento

1. Faça fork do projeto
2. Crie um branch de funcionalidade (`git checkout -b feature/AmazingFeature`)
3. Faça commit das alterações (`git commit -m 'Add some AmazingFeature'`)
4. Faça push para o branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes

## 🙏 Agradecimentos

- [markdown-it](https://github.com/markdown-it/markdown-it) - Parser de Markdown
- [Highlight.js](https://highlightjs.org/) - Destaque de sintaxe de código
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [MathJax](https://www.mathjax.org/) - Renderização de fórmulas matemáticas
- [Mermaid](https://mermaid-js.github.io/) - Renderização de fluxogramas
- [Vite](https://vitejs.dev/) - Ferramenta de construção front-end

## 📞 Contato

URL do projeto: [https://github.com/blankzsh/markflow-lite](https://github.com/blankzsh/markflow-lite)

**Email para feedback**: [shell7@petalmail.com](mailto:shell7@petalmail.com)

Se você tiver alguma dúvida ou sugestão, por favor envie um Issue ou entre em contato com o mantenedor do projeto via email. Nós valorizamos o feedback de cada usuário!