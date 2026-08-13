/**
 * 技能域（About 页 + 首页能力域）
 * 按能力域分类，不使用百分比 Skill Bars。
 */
export interface SkillDomain {
  id: string;
  title: string;
  desc: string;
  skills: string[];
}

export const skillDomains: SkillDomain[] = [
  {
    id: 'ba',
    title: 'Business Analysis',
    desc: '从业务问题出发，梳理需求与流程，并形成可落地的交付物。',
    skills: [
      'Requirements Analysis',
      'Stakeholder Management',
      'Process Analysis',
      'PRD',
      'Field Dictionary',
      'User Stories',
      'Testing',
      'Documentation',
    ],
  },
  {
    id: 'enterprise',
    title: 'Enterprise & Transformation',
    desc: '以企业架构方法设计数字化转型路径。',
    skills: [
      'TOGAF',
      'ArchiMate',
      'BPMN',
      'Digital Transformation',
      'Capability Analysis',
    ],
  },
  {
    id: 'product',
    title: 'Product',
    desc: '从产品发现到上线交付的完整产品实践。',
    skills: ['Product Discovery', 'UX', 'Axure RP', 'Figma', 'A/B Testing', 'Product Delivery'],
  },
  {
    id: 'data',
    title: 'Data',
    desc: '用数据支持分析与决策。',
    skills: ['SQL', 'Power BI', 'Excel', 'Data Analysis'],
  },
  {
    id: 'ai',
    title: 'AI',
    desc: '把 AI 能力落进产品与工作流。',
    skills: [
      'LLM',
      'AI Agent',
      'RAG',
      'Prompt Engineering',
      'AI SaaS',
      'Human-AI Collaboration',
    ],
  },
];

/** 我擅长什么（About 页） */
export const strengths = [
  'Business Requirements',
  'Process Analysis',
  'Stakeholder Communication',
  'Product Discovery',
  'SaaS Delivery',
  'UX / Prototype',
  'Testing & Debugging',
  'Enterprise Architecture',
  'AI Product Thinking',
];

/** 工作方式 */
export const workingMethod = [
  { en: 'Understand', zh: '理解业务' },
  { en: 'Structure', zh: '结构化问题' },
  { en: 'Design', zh: '设计解决方案' },
  { en: 'Build', zh: '构建' },
  { en: 'Validate', zh: '验证' },
  { en: 'Deliver', zh: '交付' },
];
