# portfolio-cn

Tony Zhao 的中文个人 Portfolio 网站 —— Business Analyst · Digital Transformation · AI Product。
基于 Astro 5 构建的纯静态站点（无 UI 框架依赖，原生 CSS）。

## 项目简介

- **页面**：首页 / 项目（5 个核心完整 Case Studies + 3 个简版 UX / Product Case Studies）/ 关于我 / 经历 / 联系 / 404
- **内容驱动**：个人信息、导航、项目案例全部集中在 `src/data/`，组件只负责渲染，新增项目无需写页面代码
- **AI Assistant**：provider-agnostic 架构，本地知识库为基座，可选接入 DeepSeek（见下文）

## 本地运行

```bash
npm install
npm run dev      # 开发模式，默认 http://localhost:4321
```

## 构建

```bash
npm run build    # 产出静态站点到 dist/
npm run preview  # 本地预览构建产物
npm run assets   # 重新生成 favicon / OG 卡片（scripts/generate-assets.mjs）
```

## 新增项目的方法

编辑 `src/data/projects.ts`：

1. 在 `projects` 数组中追加一条 `Project` 数据（`slug`、`title`、`category`、`summary`、`tags`、`cover`、`content` 等）
2. 完整 Case Study 把 `slug` 加入 `projectGroups` 的 `core` 组；简版案例加入 `ux` 组；重点展示的设 `featured: true`
3. 如需新封面变体，在 `src/components/ProjectCover.astro` 中补充

案例详情页由 `src/pages/projects/[slug].astro` 自动生成，无需编写页面代码。

## 修改个人信息的方法

编辑 `src/data/site.ts`：姓名、标语、简介、邮箱、LinkedIn、Hero 文案、导航等全站生效。
技能与工作方式在 `src/data/skills.ts`。

## 部署方法

站点为纯静态输出，可部署到任意静态托管平台（Netlify / Vercel / GitHub Pages / Cloudflare Pages 等）：

```bash
npm run build
```

将 `dist/` 目录发布到托管平台（或按平台文档关联仓库自动构建：构建命令 `npm run build`，输出目录 `dist`）。

## AI Assistant 架构（provider-agnostic）

- **基座：Local Knowledge Base**（`src/data/ai-knowledge.ts`）——关键词匹配，不联网、零外部依赖、始终可用
- **可选：AI Provider**（默认 DeepSeek，OpenAI 兼容协议）——配置 API Key 后，由 AI 基于 **Portfolio Context**（`src/lib/chat/portfolio-context.ts`，由站内数据程序化生成，与页面内容一致）生成自然语言回答
- **无 Key 时**：本地知识库回答
- **有 Key 时**：DeepSeek 回答；请求失败 / 超时自动回退本地知识库
- **Key 的两种配置方式**：
  1. 运行时：聊天面板右上角设置按钮，填入 API Key / Model / Base URL（仅保存在浏览器 localStorage，不上传）
  2. 构建时：环境变量 `PUBLIC_DEEPSEEK_API_KEY`（注意：会打包进客户端代码，仅建议个人站点使用）
- **接入其他 Provider**：实现 `src/lib/chat/types.ts` 中的 `AiProvider` 接口即可；其他 OpenAI 兼容服务可直接改 Base URL / Model

模块划分：`src/lib/chat/`（types / config / local-provider / openai-compat-provider / portfolio-context / 编排 index），UI 在 `src/components/ChatAssistant.astro` 与 `src/scripts/ai-assistant.ts`。

## 域名替换说明（部署前必做）

`src/data/site.ts` 中 `site.url` 当前为占位符 `https://example.com`，影响 canonical / Open Graph / sitemap。

**部署前请替换为真实域名**，例如：

```ts
export const site = {
  // ...
  url: 'https://your-domain.com',
};
```
