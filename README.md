# Apple Style Portfolio Blog

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)
![Vite](https://img.shields.io/badge/Vite-6-646cff)

一个受到 Apple 官网设计语言启发的个人博客与作品集网站。采用极致的极简主义风格，结合流畅的微交互与动画，旨在提供沉浸式的阅读与浏览体验。

[查看在线演示](https://peppy-starburst-99905c.netlify.app)

## ✨ 特性

- **极简美学**: 遵循 Apple Design 原则，大量留白，高对比度排版。
- **流畅交互**: 
  - 导航栏磨砂玻璃效果 (Backdrop Blur)
  - 页面元素平滑淡入 (Fade In)
  - 按钮与卡片的精细微交互 (Hover Scale)
- **响应式设计**: 完美适配移动端、平板与桌面端设备。
- **现代化技术栈**: 基于 React + TypeScript + Vite 构建，性能卓越。
- **暗色模式支持**: (架构已就绪，支持系统级自动切换)

## 🛠️ 技术栈

- **核心框架**: [React 18](https://react.dev/)
- **构建工具**: [Vite](https://vitejs.dev/)
- **样式方案**: [Tailwind CSS](https://tailwindcss.com/)
- **动画库**: [Framer Motion](https://www.framer.com/motion/)
- **图标库**: [Lucide React](https://lucide.dev/)
- **语言**: TypeScript

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- npm 或 pnpm

### 安装

1. 克隆仓库
   ```bash
   git clone https://github.com/tianhaishun/appleStyle.git
   cd appleStyle
   ```

2. 安装依赖
   ```bash
   npm install
   ```

3. 启动开发服务器
   ```bash
   npm run dev
   ```

4. 构建生产版本
   ```bash
   npm run build
   ```

## 📂 项目结构

```
src/
├── components/
│   ├── animations/   # 动画组件 (FadeIn, Stagger)
│   ├── layout/       # 布局组件 (Navbar, Footer)
│   ├── sections/     # 页面区块 (Hero, BentoGrid)
│   └── ui/           # 基础UI组件 (Button, Container)
├── data/             # 静态数据内容 (文章, 项目)
├── pages/            # 页面视图 (Home, Article)
└── lib/              # 工具函数
```

## 🚢 部署

本项目支持一键部署到 Vercel 或 Netlify。

### Netlify 部署

1. Fork 本仓库。
2. 登录 Netlify 并选择 "New site from Git"。
3. 选择你的仓库，构建命令填写 `npm run build`，发布目录填写 `dist`。

## 📝 许可证

本项目采用 [MIT 许可证](LICENSE)。

---

Designed & Built by [Tianhaishun](https://github.com/tianhaishun)
