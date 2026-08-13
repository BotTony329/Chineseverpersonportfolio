/**
 * AI 助手本地知识库（Local Knowledge Base）—— provider-agnostic 架构的基座：
 * 回答全部提炼自站内 Portfolio 内容，不联网、不调用外部模型、不编造。
 * 配置 Optional AI Provider（默认 DeepSeek）后，由 AI 基于 Portfolio Context 生成回答；
 * 本知识库同时作为兜底与无 Key 时的默认回答来源。
 * 关键词匹配引擎：权重 = 关键词长度（≥6 → 3 分；≥3 → 2 分；其余 1 分），最高分 ≥2 即命中。
 */
export interface KnowledgeLink {
  label: string;
  href: string;
}

export interface KnowledgeEntry {
  id: string;
  /** 关键词（小写；支持中英文与同义词，长度越长权重越高） */
  keywords: string[];
  answer: string;
  links: KnowledgeLink[];
}

export const quickQuestions = [
  '他做过什么企业 SaaS 项目？',
  'AI 教师平台是什么？',
  '他更偏 BA 还是 Product？',
  'MART 是什么？',
  '他会哪些 BA 方法？',
];

export const assistantMeta = {
  name: 'Moo',
  intro:
    '你好，我是 Tony 的 AI 助手。我可以基于他的 Portfolio 内容回答项目、能力与经历相关的问题。',
  disclaimer: '本地模式 · 回答基于本站 Portfolio 内容',
};

export const knowledge: KnowledgeEntry[] = [
  {
    id: 'enterprise-saas',
    keywords: ['物流', 'saas', 'enterprise', '企业项目', '企业级', '端到端', '交付', '字段字典', 'user manual', '启动'],
    answer:
      '他参与过大型企业物流数字化 SaaS 项目（Enterprise Logistics SaaS），覆盖从项目启动、业务需求沟通，到产品原型、PRD、字段字典、测试、Debug、用户文档与最终交付的完整生命周期。这也是最能体现端到端交付的项目。',
    links: [{ label: '查看案例', href: '/projects/enterprise-logistics-saas' }],
  },
  {
    id: 'ai-teacher',
    keywords: ['教师', '老师', '师范', '模拟课堂', '成长平台', '课件', '试讲', 'teacher', '教育'],
    answer:
      'AI 教师成长平台是他正在独立构建的 AI 教育产品：面向教师培训机构与准教师，提供课件分析、AI 模拟课堂、课堂表现分析与成长路径。它不是普通 Chatbot，而是 AI 驱动的教师训练与成长系统。',
    links: [{ label: '查看案例', href: '/projects/ai-teacher-growth-platform' }],
  },
  {
    id: 'ba-or-product',
    keywords: ['偏ba', '偏 ba', 'ba还是', 'ba 还是', '更偏', '定位', '偏向', '侧重'],
    answer:
      '两者都有，他的特点正是贯穿两者：有 Business Analysis 的方法基础（需求、流程、PRD、测试），也完整参与过产品从设计到上线的过程。他的工作方式就是：理解业务 → 结构化 → 设计 → 构建 → 验证 → 交付。',
    links: [{ label: '关于我', href: '/about' }],
  },
  {
    id: 'mart',
    keywords: ['mart', 'copilot', 'strategy', '战略', '概念', 'generative', 'agent'],
    answer:
      'MART-GPT 是他 2023 年完成的企业级 AI Copilot / Agent 战略项目，由 Metamorphosis、Art、Rapid、Talent 四个维度构成，探索企业知识、数据分析、市场分析、内容生成、工作流与数字化转型能力在企业级 Copilot / Agent 中的整合路径。',
    links: [{ label: '查看案例', href: '/projects/mart-gpt-strategy' }],
  },
  {
    id: 'ba-methods',
    keywords: ['方法', '需求分析', 'stakeholder', 'prd', 'user story', '流程分析', 'documentation', '会哪些'],
    answer:
      '他常用的 BA 方法包括：Requirements Analysis、Stakeholder Management、Process Analysis、PRD、Field Dictionary、User Stories、Testing 与 Documentation；在数字化转型方向还使用 TOGAF、ArchiMate、BPMN 与 Capability Analysis。',
    links: [{ label: '关于我 · 技能', href: '/about' }],
  },
  {
    id: 'end-to-end',
    keywords: ['最能', '体现', '完整生命周期', '端到端', '哪个项目'],
    answer:
      '最能体现端到端交付的是「企业物流 SaaS 落地」：从启动会议、需求沟通、原型、PRD、开发协作、测试到最终交付全程参与。另外「Product Discovery & Feature Delivery」也完成了两个新模块从业务需求到上线。',
    links: [
      { label: '企业物流 SaaS', href: '/projects/enterprise-logistics-saas' },
      { label: 'Product Discovery', href: '/projects/product-discovery-delivery' },
    ],
  },
  {
    id: 'ai-projects',
    keywords: ['ai项目', 'ai 项目', '人工智能', '有哪些ai', 'ai有哪些'],
    answer:
      '他的 AI 项目包括：2023 年的企业级 AI Copilot / Agent 战略项目（MART-GPT）、正在独立推进的 AI 教师成长平台，以及 AI 助力的电动车推荐平台等产品尝试。',
    links: [{ label: '查看项目', href: '/projects' }],
  },
  {
    id: 'digital-transformation',
    keywords: ['数字化', '转型', 'fmcg', 'togaf', 'archimate', 'bpmn', '架构', 'camunda', '市场进入'],
    answer:
      '他完成过 FMCG 新业务市场进入与数字化转型项目：从 External Research 与 Internal Assessment，到 Capability / Gap Analysis、TOGAF、ArchiMate Target Architecture 与 BPMN，最终形成 Transformation Proposal 并完成 Presentation。',
    links: [{ label: '查看案例', href: '/projects/fmcg-digital-transformation' }],
  },
  {
    id: 'contact',
    keywords: ['联系', '邮箱', 'email', '联系方式', '微信', '合作', '邮件'],
    answer: '你可以发邮件联系他，或查看联系页了解更多合作方向。',
    links: [
      { label: '发邮件', href: 'mailto:tonyzhao32965@gmail.com' },
      { label: '联系页', href: '/contact' },
    ],
  },
  {
    id: 'education',
    keywords: ['教育背景', '学历', '专业', 'information systems', '背景', '哪里毕业', '读书'],
    answer:
      '他有 Information Systems 教育背景：Commerce（Information Systems）学士与 Information Systems 硕士。职业方向是 Business Analysis、Digital Transformation 与 AI Product。',
    links: [{ label: '经历', href: '/journey' }],
  },
  {
    id: 'side-projects',
    keywords: ['独立', 'side', '副业', '创业', 'build', '自己做的', '个人项目'],
    answer:
      '他会用工作之外的时间和自己的资金持续实验产品 Idea：AI SaaS、电商、独立网站、Android App、AI Agent、数据产品、自动化工具等。他的特点就是喜欢 Build——不仅分析问题，也会真正把解决方案做出来。',
    links: [{ label: '查看项目', href: '/projects' }],
  },
  {
    id: 'working-method',
    keywords: ['工作方式', '怎么做', 'approach', '方式', '方法论'],
    answer:
      '他的工作方式是 Understand → Structure → Design → Build → Validate → Deliver：先理解业务、结构化问题，再设计解决方案、构建与验证，最终推动交付。',
    links: [{ label: '关于我', href: '/about' }],
  },
  {
    id: 'who',
    keywords: ['你是谁', '他是谁', '是谁', '介绍', 'who', 'about'],
    answer:
      'Tony Zhao：Business Analyst / 数字化转型 / AI 产品与 SaaS 实践。Information Systems 背景，参与过企业 SaaS、数字化转型、AI Strategy 与产品设计项目，并正在独立构建 AI SaaS 产品。',
    links: [
      { label: '首页', href: '/' },
      { label: '关于我', href: '/about' },
    ],
  },
  {
    id: 'greeting',
    keywords: ['你好', 'hello', 'hi', '嗨', '在吗', '谢谢', 'thanks'],
    answer:
      '你好，我是 Tony 的 AI 助手。我可以基于 Portfolio 内容回答：企业 SaaS 项目、AI 教师平台、MART、BA 方法、端到端交付、AI 项目等。你可以从快捷问题开始，或直接问我。',
    links: [{ label: '查看项目', href: '/projects' }],
  },
];

export const fallback: KnowledgeEntry = {
  id: 'fallback',
  keywords: [],
  answer:
    '关于这个问题，我目前没有更多资料。你可以直接联系 Tony，或浏览项目页了解他做过的事情。',
  links: [
    { label: '联系页', href: '/contact' },
    { label: '查看项目', href: '/projects' },
  ],
};

/**
 * 关键词加权匹配：不调用外部服务。
 * 权重：关键词长度 ≥6 → 3 分；≥3 → 2 分；其余 1 分。最高分 ≥2 即命中，否则走兜底。
 */
export function findAnswer(input: string): KnowledgeEntry {
  const q = input.toLowerCase().replace(/\s+/g, ' ').trim();
  if (!q) return fallback;

  let best: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledge) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw)) score += kw.length >= 6 ? 3 : kw.length >= 3 ? 2 : 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore >= 2 && best ? best : fallback;
}
