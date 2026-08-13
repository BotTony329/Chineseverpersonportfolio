/**
 * 全站个人信息与站点配置 —— 集中管理，改这里全站生效。
 * 部署前请把 url 替换为真实域名。
 */
export const site = {
  name: 'Tony Zhao',
  nameZh: 'Tony Zhao',
  /** 站点公开 URL（含 GitHub Pages 子路径）。改用自定义域名时替换为 https://your-domain.com，并同步 astro.config.ts 的 base 与 public/robots.txt */
  url: 'https://bottony329.github.io/Chineseverpersonportfolio',
  tagline: 'Business Analyst · Digital Transformation · AI Product',
  description:
    'Tony Zhao：Business Analyst / 数字化转型 / AI 产品与 SaaS 实践。从业务问题出发，理解需求、梳理流程、设计解决方案，并推动数字产品真正落地。',
  location: 'Melbourne, Australia',
  email: 'tonyzhao32965@gmail.com',
  linkedin: 'https://www.linkedin.com/in/tony-zhao-589263220',
  /** 首页主标题与副标题 */
  heroTitle: '让业务问题，变成真正落地的数字产品。',
  heroSubtitle: 'Business Analyst · Digital Transformation · AI Product',
  heroIntro:
    '我拥有 Information Systems 背景，参与过企业 SaaS、数字化转型、AI Strategy 与产品设计项目，并正在独立构建 AI SaaS 产品。',
  /** 工作流程（首页流程条） */
  workflow: ['业务分析', '需求定义', '产品设计', '开发协作', '测试', '交付'],
} as const;

export const nav = [
  { label: '首页', href: '/' },
  { label: '项目', href: '/projects' },
  { label: '关于我', href: '/about' },
  { label: '经历', href: '/journey' },
  { label: '联系', href: '/contact' },
] as const;

/** 全站 Person 结构化数据（SEO） */
export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  alternateName: site.nameZh,
  jobTitle: 'Business Analyst · Digital Transformation · AI Product',
  email: `mailto:${site.email}`,
  url: site.url,
  sameAs: [site.linkedin],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Melbourne',
    addressCountry: 'AU',
  },
  description: site.description,
  knowsAbout: [
    'Business Analysis',
    'Digital Transformation',
    'SaaS',
    'AI Product',
    'Enterprise Architecture',
    'UX / Product Design',
    'Requirements Engineering',
  ],
};
