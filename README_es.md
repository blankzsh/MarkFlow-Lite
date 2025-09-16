# MarkFlow Lite

> Un editor Markdown en línea de front-end puro

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
  <a href="README_pt.md">Português</a> •
  <a href="README_de.md">Deutsch</a>
</p>

MarkFlow Lite es un editor Markdown de front-end puro que se ejecuta completamente en el navegador, no requiere soporte de servidor y está listo para usar, con soporte para edición en tiempo real, vista previa dual, guardado local y compartir contenido.

## 🌟 Características

- ✍️ **Edición en tiempo real** - Soporta sintaxis Markdown estándar (incluyendo tablas, bloques de código, listas, etc.)
- 👁️ **Vista previa en tiempo real** - Ver mientras escribes, soporta fórmulas matemáticas y renderizado de diagramas de flujo
- 💾 **Almacenamiento local** - Guarda automáticamente borradores en el almacenamiento local del navegador
- 📄 **Exportación de archivos** - Soporta exportación a formatos PDF, HTML, Markdown
- 📂 **Gestión de archivos** - Soporta crear nuevos documentos, abrir archivos Markdown locales
- 🔗 **Compartir contenido** - Genera enlaces únicos, el contenido puede compartirse mediante parámetros URL
- 🎨 **Cambio de tema** - Proporciona temas oscuro/claro, adaptados a diferentes entornos de lectura
- ⌨️ **Operaciones de atajo** - Soporta atajos comunes (negrita, cursiva, inserción de título, etc.)
- 📱 **Diseño responsivo** - Soporta acceso desde escritorio, tableta y móvil

## 📸 Vista previa de la interfaz

<div align="center">
  <img src="asset/images/screenshot-editor.png" alt="Interfaz del editor MarkFlow Lite" width="800" />
  <p><em>Interfaz del editor MarkFlow Lite - Funcionalidad de edición y vista previa en tiempo real</em></p>
</div>

<div align="center">
  <img src="asset/images/screenshot-preview.png" alt="Interfaz de vista previa de MarkFlow Lite" width="800" />
  <p><em>Interfaz de vista previa de MarkFlow Lite - Soporta renderizado de fórmulas matemáticas y diagramas de flujo</em></p>
</div>

<div align="center">
  <img src="asset/images/screenshot-dark-mode.png" alt="Tema oscuro de MarkFlow Lite" width="800" />
  <p><em>Tema oscuro de MarkFlow Lite - Experiencia de edición nocturna cómoda</em></p>
</div>

## 🚀 Inicio rápido

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)

### Uso en línea

Visita [MarkFlow Lite](https://editor.currso.com) directamente para comenzar a usarlo.

### Desarrollo local

```bash
# Clonar el proyecto
git clone https://github.com/blankzsh/markflow-lite.git

# Entrar al directorio del proyecto
cd markflow-lite

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar la construcción de producción
npm run preview
```

## 🛠️ Pila tecnológica

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Markdown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white)](https://markdown-it.github.io/)

- **Marco de desarrollo**: React + TypeScript + Vite
- **Análisis de Markdown**: markdown-it
- **Resaltado de código**: Highlight.js
- **Diseño de estilo**: Tailwind CSS + @tailwindcss/typography
- **Fórmulas matemáticas**: MathJax (mediante markdown-it-mathjax3)
- **Soporte de diagramas de flujo**: Mermaid
- **Herramienta de construcción**: Vite
- **Plataformas de despliegue**: GitHub Pages / Vercel / Netlify

## 📖 Guía de uso

### Operaciones básicas

1. **Modo de edición** - Escribe contenido Markdown en el área de edición izquierda
2. **Modo de vista previa** - Ver el efecto renderizado en tiempo real
3. **Modo dividido** - Ver ambas áreas de edición y vista previa simultáneamente

### Atajos

- `Ctrl + B` - Negrita
- `Ctrl + I` - Cursiva
- `Ctrl + K` - Insertar enlace

### Integración de almacenamiento en la nube

MarkFlow Lite soporta múltiples backends de almacenamiento en la nube:

1. **AWS S3** - Conectarse a buckets de almacenamiento S3 para gestión de archivos
2. **WebDAV** - Conectarse a cualquier servidor habilitado para WebDAV
3. **Almacenamiento local** - Almacenamiento local del navegador (por defecto)

A través del explorador de archivos, puedes:
- Conectar y desconectar servicios de almacenamiento en la nube
- Navegar estructuras de carpetas remotas
- Crear, editar y eliminar archivos remotos
- Sincronizar archivos locales y remotos

### Sintaxis soportada

- Encabezados (#, ##, ###, ...)
- Estilos de texto (negrita, cursiva, tachado)
- Listas (ordenadas, desordenadas, listas de tareas)
- Enlaces e imágenes
- Bloques de código y código en línea
- Citas en bloque
- Tablas
- Reglas horizontales
- Fórmulas matemáticas (LaTeX)
- Diagramas de flujo (Mermaid)

### Uso de diagramas de flujo Mermaid

Soporta múltiples tipos de gráficos Mermaid:

```markdown
```mermaid
graph TD
  A[Inicio] --> B[Proceso]
  B --> C[Fin]
```
```

Tipos de gráficos soportados:
- Diagramas de flujo (Flowchart)
- Diagramas de secuencia (Sequence Diagram)
- Diagramas de Gantt (Gantt Diagram)
- Diagramas de clase (Class Diagram)
- Diagramas de estado (State Diagram)

## 📤 Funciones de exportación

- **Exportación PDF** - Exportar documentos al formato PDF
- **Exportación HTML** - Exportar a archivos HTML independientes
- **Exportación Markdown** - Exportar archivos Markdown originales

## 🐛 Problemas corregidos

### Problemas recientemente corregidos

- Corregido el problema de renderizado de diagramas de flujo demasiado grandes, optimizado el control de tamaño de gráficos
- Resuelto el problema de bloques de código ocultos por tablas
- Corregido los grandes espacios en blanco que aparecían en la parte inferior de la página después del renderizado de diagramas de flujo
- Optimizado el orden de visualización correcto de todo el contenido en la misma capa
- Eliminada la funcionalidad PWA y configuraciones relacionadas, resueltos problemas de compilación

## 🔧 Despliegue

### Desplegar en Vercel

[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

```bash
npm run build
vercel --prod
```

### Desplegar en Netlify

[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://www.netlify.com/)

```bash
npm run build
# Subir directorio dist a Netlify
```

### Desplegar en GitHub Pages

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)

```bash
npm run build
# Enviar directorio dist a la rama gh-pages
```

## 🤝 Contribución

Bienvenido a enviar Issues y Pull Requests para ayudar a mejorar MarkFlow Lite.

### Proceso de desarrollo

1. Hacer fork del proyecto
2. Crear una rama de función (`git checkout -b feature/AmazingFeature`)
3. Hacer commit de los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Hacer push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles

## 🙏 Agradecimientos

- [markdown-it](https://github.com/markdown-it/markdown-it) - Analizador de Markdown
- [Highlight.js](https://highlightjs.org/) - Resaltado de sintaxis de código
- [Tailwind CSS](https://tailwindcss.com/) - Marco CSS
- [MathJax](https://www.mathjax.org/) - Renderizado de fórmulas matemáticas
- [Mermaid](https://mermaid-js.github.io/) - Renderizado de diagramas de flujo
- [Vite](https://vitejs.dev/) - Herramienta de construcción front-end

## 📞 Contacto

URL del proyecto: [https://github.com/blankzsh/markflow-lite](https://github.com/blankzsh/markflow-lite)

**Correo de retroalimentación**: [shell7@petalmail.com](mailto:shell7@petalmail.com)

Si tienes alguna pregunta o sugerencia, por favor envía un Issue o contacta al mantenedor del proyecto por correo electrónico. ¡Valoramos la retroalimentación de cada usuario!