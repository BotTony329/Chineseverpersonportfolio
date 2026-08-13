/**
 * Portfolio Context —— 提供给 Optional AI Provider 的站内事实上下文。
 * 由站内数据（site / projects / skills）程序化生成，与页面内容保持一致。
 */
import { site } from '../../data/site';
import { projects } from '../../data/projects';
import { skillDomains, workingMethod } from '../../data/skills';

export function buildPortfolioContext(): string {
  const projectLines = projects.map((p) => {
    const facts = [p.summary];
    if (p.content.intro) facts.push(...p.content.intro);
    if (p.content.process) {
      facts.push(`关键流程：${p.content.process.map((s) => s.step).join(' → ')}`);
    }
    if (p.content.outcomes) facts.push(`产出：${p.content.outcomes.join('；')}`);
    return `【${p.title}（${p.titleEn ?? p.slug}）· ${p.year ?? '—'} · ${p.role}】\n${facts.join('\n')}`;
  });

  const domainLines = skillDomains.map((d) => `- ${d.title}：${d.skills.join('、')}`);
  const methodLine = workingMethod.map((m) => `${m.en}（${m.zh}）`).join(' → ');

  return [
    `姓名：${site.name}`,
    `定位：${site.tagline}`,
    `简介：${site.description}`,
    `所在地：${site.location}`,
    `邮箱：${site.email}`,
    `LinkedIn：${site.linkedin}`,
    `工作方式：${methodLine}`,
    '能力域：',
    ...domainLines,
    '项目：',
    ...projectLines,
  ].join('\n');
}
