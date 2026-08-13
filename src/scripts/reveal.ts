/**
 * 滚动渐显：IntersectionObserver 为 .reveal 元素添加 .in。
 * 无 JS / prefers-reduced-motion 时由 CSS 兜底直接可见。
 * 兼容 ViewTransitions：observer 只创建一次，每次 page-load 扫描新节点。
 */
export function initReveal() {
  if ((window as unknown as { __revealBound?: boolean }).__revealBound) return;
  (window as unknown as { __revealBound?: boolean }).__revealBound = true;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );

  const scan = () => {
    document.querySelectorAll('.reveal:not(.in)').forEach((el) => observer.observe(el));
  };

  document.addEventListener('astro:page-load', scan);
  scan();
}
