# 湘绣元镜 - 湘绣传统文化元宇宙平台

## 项目简介

这是一个基于Vue 3和Vite开发的湘绣传统文化元宇宙展示平台，旨在通过数字化手段展示和传承湘绣这一非物质文化遗产，让更多人了解和欣赏湘绣的魅力。

## 主要功能

- 🎨 **作品展示**：展示精美的湘绣作品，包括图片、描述和创作背景
- 🏬 **虚拟商城**：提供湘绣相关产品的浏览和购买功能
- 🏛️ **场馆导览**：提供虚拟场馆的在线导览体验
- 🎭 **文化展览**：举办线上湘绣文化展览
- 🔍 **知识图谱**：构建湘绣知识图谱，帮助用户深入了解湘绣文化

## 技术栈

- **前端框架**：Vue 3
- **构建工具**：Vite
- **路由管理**：Vue Router 4
- **HTTP客户端**：Axios
- **图标库**：Font Awesome
- **样式**：CSS原生 + Vue组件样式

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发模式运行

```bash
npm run dev
# 或
yarn dev
```

项目将在开发服务器启动，通常是 `http://localhost:5173`

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

构建后的文件将位于 `dist` 目录

### 预览生产版本

```bash
npm run preview
# 或
yarn preview
```

## 部署说明

### GitHub 仓库设置

1. 在GitHub上创建一个新的仓库
2. 将本地项目关联到GitHub仓库
3. 推送代码到GitHub仓库

```bash
# 初始化git（如果尚未初始化）
git init
# 添加远程仓库
git remote add origin https://github.com/[your-username]/[repository-name].git
# 添加所有文件
git add .
# 提交更改
git commit -m "Initial commit"
# 推送代码
git push -u origin main
```

### Netlify 部署

1. 登录Netlify账号
2. 点击"New site from Git"
3. 选择GitHub，授权访问你的仓库
4. 选择要部署的仓库
5. 配置构建设置：
   - **Branch to deploy**: main
   - **Build command**: npm run build
   - **Publish directory**: dist
6. 点击"Deploy site"

部署完成后，Netlify将生成一个URL，你可以通过该URL访问你的网站。

## 项目结构

```
src/
├── App.vue           # 应用入口组件
├── main.js           # 应用初始化文件
├── assets/           # 静态资源文件
├── components/       # 可复用组件
├── router/           # 路由配置
├── utils/            # 工具函数
├── views/            # 页面组件
└── style.css         # 全局样式
```

## 贡献指南

1. Fork本仓库
2. 创建新的分支（`git checkout -b feature/your-feature`）
3. 提交你的更改（`git commit -m 'Add some feature'`）
4. 推送到分支（`git push origin feature/your-feature`）
5. 打开Pull Request

## 许可证

本项目采用MIT许可证 - 详情请查看 [LICENSE](LICENSE) 文件

## 联系我们

如有任何问题或建议，请随时联系我们。

---

© 2025 湘绣元镜项目团队 版权所有
