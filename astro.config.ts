import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './src/data/site';

// https://astro.build/config
export default defineConfig({
  site: site.url,
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
