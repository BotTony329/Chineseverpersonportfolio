/**
 * 站点 base path 的单一事实来源，astro.config.ts 与全站链接统一从这里读取。
 * GitHub Pages 项目站点部署在 https://bottony329.github.io/Chineseverpersonportfolio/
 * 注意：Astro dev 服务器也会在 base 路径下服务（http://localhost:4321/Chineseverpersonportfolio/）。
 * 若改用自定义域名，改为 '/' 并同步 src/data/site.ts 的 site.url 与 public/robots.txt。
 */
export const BASE_URL = '/Chineseverpersonportfolio/';
