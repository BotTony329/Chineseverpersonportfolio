/**
 * Header 滚动背景 + 移动端菜单。
 * 兼容 Astro ViewTransitions：
 * - 全局监听（window/document）只绑定一次（window 标记）；
 * - 每次 astro:page-load 重新绑定到新 DOM 节点，并复位菜单状态。
 */

function onScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 8);
}

function toggleMenu(open: boolean) {
  const menu = document.getElementById('mobile-menu');
  const btn = document.getElementById('menu-btn');
  if (!menu || !btn) return;

  menu.classList.toggle('open', open);
  menu.setAttribute('aria-hidden', String(!open));
  btn.setAttribute('aria-expanded', String(open));
  btn.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
  document.body.classList.toggle('no-scroll', open);

  const burger = btn.querySelector('.icon-burger') as SVGPathElement | null;
  const close = btn.querySelector('.icon-close') as SVGPathElement | null;
  if (burger && close) {
    burger.style.display = open ? 'none' : '';
    close.style.display = open ? '' : 'none';
  }
}

function bindElements() {
  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  toggleMenu(false);

  btn.addEventListener('click', () => {
    toggleMenu(!menu.classList.contains('open'));
  });

  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => toggleMenu(false)));
}

export function initNav() {
  if ((window as unknown as { __navBound?: boolean }).__navBound) return;
  (window as unknown as { __navBound?: boolean }).__navBound = true;

  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMenu(false);
  });
  document.addEventListener('astro:page-load', bindElements);

  bindElements();
  onScroll();
}
