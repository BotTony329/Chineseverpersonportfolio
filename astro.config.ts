import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { BASE_URL } from './src/lib/base';

// https://astro.build/config
// GitHub Pages 项目站点：部署在 https://bottony329.github.io/Chineseverpersonportfolio/
// base 的单一事实来源在 src/lib/base.ts；若改用自定义域名，改那里即可（并同步 src/data/site.ts 与 public/robots.txt）。
export default defineConfig({
  site: 'https://bottony329.github.io',
  base: BASE_URL,
  output: 'static',
  compressHTML: true,
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      // 内部 OG 卡片渲染页不出现在 sitemap
      filter: (page) => !page.includes('/og-card'),
    }),
  ],
});
