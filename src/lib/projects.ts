import { projects, type Project } from '../data/projects';

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeatured(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getAll(): Project[] {
  return projects;
}

/** Case Study 页的上一篇 / 下一篇（按数据顺序） */
export function getPrevNext(slug: string): { prev?: Project; next?: Project } {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return {};
  return {
    prev: projects[idx - 1],
    next: projects[idx + 1],
  };
}

export function getRelated(current: Project, limit = 3): Project[] {
  return projects
    .filter((p) => p.slug !== current.slug)
    .sort((a, b) => {
      const score = (p: Project) =>
        (p.category === current.category ? 2 : 0) +
        p.tags.filter((t) => current.tags.includes(t)).length;
      return score(b) - score(a);
    })
    .slice(0, limit);
}
