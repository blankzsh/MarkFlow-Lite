# MarkFlow Lite

> ピュアフロントエンドのオンラインMarkdownエディター

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub last commit](https://img.shields.io/github/last-commit/blankzsh/markflow-lite)](https://github.com/blankzsh/markflow-lite/commits/main)
[![GitHub issues](https://img.shields.io/github/issues/blankzsh/markflow-lite)](https://github.com/blankzsh/markflow-lite/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/blankzsh/markflow-lite)](https://github.com/blankzsh/markflow-lite/pulls)
[![GitHub stars](https://img.shields.io/github/stars/blankzsh/markflow-lite)](https://github.com/blankzsh/markflow-lite/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/blankzsh/markflow-lite)](https://github.com/blankzsh/markflow-lite/network/members)

<p align="center">
  <a href="README.md">中文</a> •
  <a href="README_en.md">English</a> •
  <a href="README_es.md">Español</a> •
  <a href="README_pt.md">Português</a> •
  <a href="README_de.md">Deutsch</a>
</p>

MarkFlow Liteは、ブラウザ内で完全に動作するピュアフロントエンドのMarkdownエディターで、サーバーを必要とせず、すぐに使用できるリアルタイム編集、デュアルプレビュー、ローカル保存、コンテンツ共有をサポートしています。

## 🌟 特徴

- ✍️ **リアルタイム編集** - 標準のMarkdown構文をサポート（表、コードブロック、リストなどを含む）
- 👁️ **リアルタイムプレビュー** - 書きながら表示、数式とフローチャートのレンダリングをサポート
- 💾 **ローカルストレージ** - ブラウザのローカルストレージに下書きを自動保存
- 📄 **ファイルエクスポート** - PDF、HTML、Markdown形式へのエクスポートをサポート
- 📂 **ファイル管理** - 新規ドキュメントの作成、ローカルMarkdownファイルのオープンをサポート
- 🔗 **コンテンツ共有** - 固有のリンクを生成、URLパラメータ経由でコンテンツを共有可能
- 🎨 **テーマ切替** - ダーク/ライトテーマを提供、異なる読書環境に適応
- ⌨️ **ショートカット操作** - 一般的なショートカットをサポート（太字、斜体、タイトル挿入など）
- 📱 **レスポンシブデザイン** - デスクトップ、タブレット、モバイル端末をサポート

## 📸 インターフェースプレビュー

<div align="center">
  <img src="asset/images/images/screenshot-editor.png" alt="MarkFlow Lite エディターインターフェース" width="800" />
  <p><em>MarkFlow Lite エディターインターフェース - リアルタイム編集とプレビュー機能</em></p>
</div>

<div align="center">
  <img src="asset/images/screenshot-preview.png" alt="MarkFlow Lite プレビューインターフェース" width="800" />
  <p><em>MarkFlow Lite プレビューインターフェース - 数式とフローチャートレンダリングをサポート</em></p>
</div>

<div align="center">
  <img src="asset/images/screenshot-dark-mode.png" alt="MarkFlow Lite ダークテーマ" width="800" />
  <p><em>MarkFlow Lite ダークテーマ - 快適な夜間編集体験</em></p>
</div>

## 🚀 クイックスタート

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)

### オンライン使用

[MarkFlow Lite](https://editor.currso.com)に直接アクセスして使用を開始してください。

### ローカル開発

```bash
# プロジェクトをクローン
git clone https://github.com/blankzsh/markflow-lite.git

# プロジェクトディレクトリに移動
cd markflow-lite

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev

# 本番ビルド
npm run build

# 本番ビルドをプレビュー
npm run preview
```

## 🛠️ 技術スタック

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Markdown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white)](https://markdown-it.github.io/)

- **開発フレームワーク**: React + TypeScript + Vite
- **Markdown解析**: markdown-it
- **コードハイライト**: Highlight.js
- **スタイル設計**: Tailwind CSS + @tailwindcss/typography
- **数式**: MathJax (markdown-it-mathjax3経由)
- **フローチャートサポート**: Mermaid
- **ビルドツール**: Vite
- **デプロイプラットフォーム**: GitHub Pages / Vercel / Netlify

## 📖 使用ガイド

### 基本操作

1. **編集モード** - 左側の編集エリアにMarkdownコンテンツを記述
2. **プレビューモード** - レンダリング効果をリアルタイムで表示
3. **分割モード** - 編集エリアとプレビューエリアを同時に表示

### ショートカット

- `Ctrl + B` - 太字
- `Ctrl + I` - 斜体
- `Ctrl + K` - リンク挿入

### クラウドストレージ統合

MarkFlow Liteは複数のクラウドストレージバックエンドをサポート：

1. **AWS S3** - S3ストレージバケットに接続してファイル管理
2. **WebDAV** - WebDAV対応サーバーに接続
3. **ローカルストレージ** - ブラウザローカルストレージ（デフォルト）

ファイルエクスプローラーを通じて以下の操作が可能：
- クラウドストレージサービスの接続と切断
- リモートフォルダ構造の閲覧
- リモートファイルの作成、編集、削除
- ローカルとリモートファイルの同期

### サポート構文

- 見出し (#, ##, ###, ...)
- テキストスタイル（太字、斜体、取り消し線）
- リスト（順序付き、順序なし、タスクリスト）
- リンクと画像
- コードブロックとインラインコード
- 引用ブロック
- 表
- 水平線
- 数式（LaTeX）
- フローチャート（Mermaid）

### Mermaidフローチャート使用法

複数のMermaidチャートタイプをサポート：

```markdown
```mermaid
graph TD
  A[開始] --> B[処理]
  B --> C[終了]
```
```

サポートチャートタイプ：
- フローチャート（Flowchart）
- シーケンス図（Sequence Diagram）
- ガント図（Gantt Diagram）
- クラス図（Class Diagram）
- 状態図（State Diagram）

## 📤 エクスポート機能

- **PDFエクスポート** - ドキュメントをPDF形式でエクスポート
- **HTMLエクスポート** - 独立したHTMLファイルにエクスポート
- **Markdownエクスポート** - 元のMarkdownファイルをエクスポート

## 🐛 修正事項

### 最近の修正事項

- フローチャートレンダリングが大きすぎる問題を修正、チャートサイズ制御を最適化
- コードブロックが表に隠れる問題を解決
- フローチャートレンダリング後のページ下部に大きな空白が現れる問題を修正
- 同一レイヤー上のすべてのコンテンツの表示順序を最適化
- PWA機能と関連設定を削除、ビルド問題を解決

## 🔧 デプロイ

### Vercelにデプロイ

[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

```bash
npm run build
vercel --prod
```

### Netlifyにデプロイ

[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://www.netlify.com/)

```bash
npm run build
# distディレクトリをNetlifyにアップロード
```

### GitHub Pagesにデプロイ

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)

```bash
npm run build
# distディレクトリをgh-pagesブランチにプッシュ
```

## 🤝 貢献

MarkFlow Liteの改善にIssueとPull Requestを提出してください。

### 開発プロセス

1. プロジェクトをフォーク
2. 機能ブランチを作成（`git checkout -b feature/AmazingFeature`）
3. 変更をコミット（`git commit -m 'Add some AmazingFeature'`）
4. ブランチにプッシュ（`git push origin feature/AmazingFeature`）
5. Pull Requestを開く

## 📄 ライセンス

このプロジェクトはMITライセンスの下でライセンスされています - 詳細は[LICENSE](LICENSE)ファイルを参照

## 🙏 謝辞

- [markdown-it](https://github.com/markdown-it/markdown-it) - Markdownパーサー
- [Highlight.js](https://highlightjs.org/) - コード構文ハイライト
- [Tailwind CSS](https://tailwindcss.com/) - CSSフレームワーク
- [MathJax](https://www.mathjax.org/) - 数式レンダリング
- [Mermaid](https://mermaid-js.github.io/) - フローチャートレンダリング
- [Vite](https://vitejs.dev/) - フロントエンドビルドツール

## 📞 連絡先

プロジェクトURL: [https://github.com/blankzsh/markflow-lite](https://github.com/blankzsh/markflow-lite)

**メールフィードバック**: [shell7@petalmail.com](mailto:shell7@petalmail.com)

ご質問やご提案がある場合は、Issueを提出するか、プロジェクトメンテナーにメールで連絡してください。私たちはすべてのユーザーのフィードバックを大切にしています！