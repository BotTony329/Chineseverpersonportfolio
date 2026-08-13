/**
 * 项目数据 —— 全站 Case Study 内容唯一来源。
 * 新增项目：在此追加一条数据（必要时补充组件），无需写页面代码。
 */
export type ProjectCategory = 'enterprise' | 'ai-product' | 'strategy' | 'product-ux' | 'ux-case';
export type ProjectStatus = 'delivered' | 'ongoing' | 'concept';
export type CoverVariant = 'flow' | 'grid' | 'orbit' | 'nodes';

export interface Highlight {
  title: string;
  text: string;
}

export interface ProcessStep {
  step: string;
  note?: string;
}

export interface ProjectContent {
  intro?: string[];
  highlights?: Highlight[];
  process?: ProcessStep[];
  outcomes?: string[];
  contribution?: { mine: string[]; team?: string[] };
  note?: string;
  /** 如 MART Framework 这类四字母框架 */
  framework?: { id: string; label: string }[];
}

export interface Project {
  slug: string;
  title: string;
  titleEn?: string;
  category: ProjectCategory;
  featured?: boolean;
  status?: ProjectStatus;
  year?: string;
  role: string;
  summary: string;
  tags: string[];
  cover: CoverVariant;
  content: ProjectContent;
  skills?: string[];
}

export const projects: Project[] = [
  /* ============ 旗舰项目 ============ */
  {
    slug: 'enterprise-logistics-saas',
    title: '企业物流 SaaS 落地',
    titleEn: 'Enterprise Logistics SaaS',
    category: 'enterprise',
    featured: true,
    status: 'delivered',
    role: 'Business Analysis · 原型设计 · 测试与交付',
    summary:
      '参与大型企业物流数字化 SaaS 项目：从 Kickoff Meeting 与业务流程确认，到 Axure RP9 原型、PRD、字段字典、每周会议、测试与 Debug、用户手册与最终交付。',
    tags: ['Enterprise SaaS', 'Business Analysis', 'Prototype', 'Testing', 'Delivery'],
    cover: 'flow',
    content: {
      intro: [
        '这是我最完整的企业项目经历之一：参与一个大型企业的物流数字化 SaaS 项目。',
        '项目从 Kickoff Meeting 启动。在推进过程中，我与业务方持续确认 Business Process（Business Process Clarification），并使用 Axure RP 9 制作产品原型。',
        '开发阶段，我参与 Weekly Meetings 跟进项目进度，参与 PRD 编写（PRD Contribution）与 Field Dictionary（字段字典）整理；测试阶段参与 Testing 与 Debugging；交付阶段编写 User Manual 并支持最终 Delivery。',
      ],
      highlights: [
        { title: 'Kickoff Meeting', text: '参与项目启动会议' },
        { title: 'Axure RP9 Prototype', text: '使用 Axure RP 9 制作产品原型' },
        { title: 'Weekly Meetings', text: '参与每周项目会议，跟进开发进度' },
        { title: 'Business Process Clarification', text: '与业务方持续确认业务流程' },
        { title: 'PRD Contribution', text: '参与 PRD 编写' },
        { title: 'Field Dictionary', text: '整理字段字典（Field Dictionary）' },
        { title: 'Testing', text: '参与系统测试' },
        { title: 'Debugging', text: '排查并修复系统问题' },
        { title: 'User Manual', text: '编写用户手册' },
        { title: 'Delivery', text: '支持最终产品交付' },
      ],
      process: [
        { step: 'Kickoff Meeting' },
        { step: 'Axure RP9 Prototype' },
        { step: 'Weekly Meetings' },
        { step: 'Business Process Clarification' },
        { step: 'PRD Contribution' },
        { step: 'Field Dictionary' },
        { step: 'Testing' },
        { step: 'Debugging' },
        { step: 'User Manual' },
        { step: 'Delivery' },
      ],
      outcomes: [
        '参与从 Kickoff Meeting 到最终 Delivery 的完整项目周期',
        '交付物覆盖：Axure RP9 原型、PRD、字段字典、用户手册',
        '通过每周会议与测试、Debug 持续跟进产品落地',
      ],
      note: '由于项目涉及企业客户信息，本案例使用「Enterprise Logistics SaaS」匿名化表达，不披露客户名称与敏感信息。',
    },
    skills: ['Business Analysis', 'Axure RP', 'PRD', 'Field Dictionary', 'Testing', 'Debugging', 'Documentation'],
  },
  {
    slug: 'ai-teacher-growth-platform',
    title: 'AI 教师成长平台',
    titleEn: 'AI Teacher Growth Platform',
    category: 'ai-product',
    featured: true,
    status: 'ongoing',
    role: '独立产品 · 产品定义与开发',
    summary:
      '我正在独立构建的 AI 教育产品：面向教师培训机构和准教师，提供课件分析、AI 模拟课堂、课堂表现分析与成长路径——一个 AI 驱动的教师训练与成长系统。',
    tags: ['AI SaaS', 'Human-AI Collaboration', 'AI Simulation', 'Learning Analytics'],
    cover: 'nodes',
    content: {
      intro: [
        '这是我正在独立推进的 AI 教育产品。目标用户主要是教师培训机构、教师考试与教师培养机构；核心用户是 Pre-service Teachers——准教师、师范生等处于教师职业准备阶段的用户。',
        '它不是普通 Chatbot，而是一个 AI 驱动的教师训练与成长系统：把「上传课件 → 模拟课堂 → 表现分析 → 成长路径」串成完整闭环。',
      ],
      highlights: [
        {
          title: 'Human-AI Collaboration',
          text: 'AI 学生结合课件内容与课堂内容进行提问、回答与互动，形成人机协作的模拟课堂',
        },
        { title: 'AI Simulation', text: '根据上传的课件生成 AI 模拟课堂' },
        { title: 'AI Feedback', text: '课程结束后由 AI 分析课堂表现，并给出教师能力评分' },
        { title: 'Learning Analytics', text: '将本次表现与历史表现比较，形成持续的学习分析' },
        { title: 'Growth Tracking', text: '基于历次表现形成个人成长路径' },
        { title: 'Teacher Training', text: '面向教师职业准备阶段的训练场景设计' },
      ],
      process: [
        { step: '上传课件' },
        { step: 'AI 分析课件' },
        { step: '课件评分' },
        { step: '生成 AI 模拟课堂' },
        { step: '麦克风实时语音转文字' },
        { step: 'AI 学生提问 / 回答 / 互动' },
        { step: '课程结束' },
        { step: 'AI 分析课堂表现' },
        { step: '教师能力评分' },
        { step: '与历史表现比较' },
        { step: '形成成长路径' },
      ],
      outcomes: [
        '形成「训练 → 反馈 → 对比 → 成长」的完整闭环',
        '将 AI 用于教师职业准备阶段的核心训练场景',
        '以独立产品形态持续迭代',
      ],
      note: '该产品由我独立推进，目前处于持续开发阶段。',
    },
    skills: ['AI SaaS', 'LLM', 'AI Agent', 'Prompt Engineering', 'Human-AI Collaboration', 'Product Discovery'],
  },

  /* ============ 企业战略 ============ */
  {
    slug: 'mart-gpt-strategy',
    title: 'Enterprise AI Copilot / Agent Strategy',
    titleEn: 'MART-GPT',
    category: 'strategy',
    featured: true,
    status: 'concept',
    year: '2023',
    role: 'AI Strategy · 企业 Copilot / Agent 设计',
    summary:
      '2023 年完成的企业级 AI Copilot / Agent 战略项目：以 MART Framework 为设计框架，探索企业知识、数据分析、市场分析、内容生成、工作流与数字化转型能力在企业级 Copilot / Agent 中的整合路径。',
    tags: ['AI Strategy', 'AI Agent', 'Copilot', 'Generative AI'],
    cover: 'orbit',
    content: {
      intro: [
        '这是 2023 年完成的企业级 AI Copilot / Agent 战略项目。重点不是「做一个 Chatbot」，而是把企业知识、数据分析、市场分析、内容生成、工作流与数字化转型能力，整合进企业级 AI Copilot / Agent 的应用设想。',
        '项目以 MART Framework 作为整体设计框架，由四个维度构成。',
      ],
      framework: [
        { id: 'M', label: 'Metamorphosis' },
        { id: 'A', label: 'Art' },
        { id: 'R', label: 'Rapid' },
        { id: 'T', label: 'Talent' },
      ],
      highlights: [
        { title: '企业知识', text: '整合企业内部知识，让 Copilot / Agent 在业务语境中支持问答与决策' },
        { title: '数据分析 · 市场分析', text: '将数据分析与市场分析能力纳入 Copilot / Agent 场景设计' },
        { title: '内容生成 · 工作流', text: '覆盖内容生成与工作流环节的企业应用路径' },
        { title: '数字化转型', text: '将 AI 能力与企业数字化转型能力整合，形成企业级应用设想' },
      ],
      outcomes: [
        '完成企业级 AI Copilot / Agent 战略设计（2023 年）',
        '梳理 AI Copilot / Agent 在企业知识、数据分析、市场分析、内容生成、工作流与数字化转型中的整合路径',
        '形成 MART Framework 设计框架',
      ],
      note: '本项目为 2023 年完成的企业级 AI Copilot / Agent 战略设计项目，不涉及生产环境部署。',
    },
    skills: ['AI Strategy', 'Generative AI', 'AI Agent', 'Copilot', 'Business Analysis'],
  },
  {
    slug: 'fmcg-digital-transformation',
    title: '新业务市场进入与数字化转型方案',
    titleEn: 'Market Entry & Digital Transformation Strategy',
    category: 'strategy',
    status: 'delivered',
    role: '方案设计与主讲（团队项目）',
    summary:
      '为 FMCG 企业设计新业务市场进入与数字化转型方案：从 External Research 与 Internal Assessment，到 Capability / Gap Analysis、TOGAF、ArchiMate 目标架构、BPMN 目标流程，最终形成 Transformation Proposal 并完成 Presentation。',
    tags: ['Digital Transformation', 'TOGAF', 'ArchiMate', 'BPMN', 'Enterprise Architecture'],
    cover: 'grid',
    content: {
      intro: [
        '这是一个 FMCG（快速消费品）新业务市场进入与数字化转型项目：先进行 External Research（外部研究）与 Internal Assessment（内部评估），再通过 Capability / Gap Analysis 建立对业务现状与差距的系统理解。',
        '在此基础上，我设计了目标架构：以 TOGAF 思路组织数字化转型方案，用 ArchiMate 描绘 Target Architecture，用 BPMN 描绘目标业务流程。',
        '最终形成 Transformation Proposal，并完成整体方案 Presentation。',
      ],
      process: [
        { step: 'External Research' },
        { step: 'Internal Assessment' },
        { step: 'Capability / Gap Analysis' },
        { step: 'TOGAF' },
        { step: 'ArchiMate Target Architecture' },
        { step: 'BPMN' },
        { step: 'Transformation Proposal' },
        { step: 'Presentation' },
      ],
      contribution: {
        mine: [
          '设计 Target Architecture（TOGAF / ArchiMate）',
          '使用 BPMN 描绘目标业务流程',
          '形成 Transformation Proposal',
          '完成整体方案 Presentation',
        ],
        team: ['Pricing 策略介绍', 'Marketing 策略介绍', 'Branding 策略介绍', 'Employee Training 策略介绍'],
      },
      outcomes: ['形成完整的新业务市场进入与数字化转型方案', '完成整体方案 Presentation'],
      note: '团队项目：我的个人贡献与组员负责的部分已分别列出。',
    },
    skills: ['External Research', 'Internal Assessment', 'Capability / Gap Analysis', 'TOGAF', 'ArchiMate', 'BPMN', 'Digital Transformation'],
  },

  /* ============ 产品与 UX ============ */
  {
    slug: 'product-discovery-delivery',
    title: '产品模块从发现到上线',
    titleEn: 'Product Discovery & Feature Delivery',
    category: 'product-ux',
    status: 'delivered',
    role: 'Digital Product Designer · 端到端参与',
    summary:
      '从 Production Team Briefing 出发，完成两个新产品模块从业务需求理解、UX / Product Design、开发协作、Testing 到上线的完整产品生命周期。',
    tags: ['Product Discovery', 'UX Design', 'A/B Testing', 'Delivery'],
    cover: 'flow',
    content: {
      intro: [
        '这是我在 Digital Product Designer 岗位上的真实产品项目。',
        '我不仅负责设计，而是参与从业务需求到上线的完整产品生命周期：从 Production Team Briefing 与业务需求理解开始，与 Manager 讨论产品理念与解决方案，进行 UX / Product Design，与 IT Team 协作开发，参与 Testing 与 UX A/B Testing，直到 Deployment。',
      ],
      process: [
        { step: 'Production Team Briefing' },
        { step: '理解业务产品需求' },
        { step: '与 Manager 讨论产品理念与解决方案' },
        { step: 'UX / Product Design' },
        { step: '与 IT Team 协作开发' },
        { step: 'Testing' },
        { step: 'UX A/B Testing' },
        { step: 'Deployment' },
      ],
      outcomes: ['两个新的产品模块成功上线'],
    },
    skills: ['Product Discovery', 'UX', 'A/B Testing', 'Testing', 'Product Delivery'],
  },

  /* ============ 简版 UX / Product Case Studies ============ */
  {
    slug: 'ticketing-app',
    title: '票务应用设计',
    titleEn: 'Ticketing App',
    category: 'ux-case',
    status: 'delivered',
    role: 'UX / 产品设计',
    summary: '按偏好购票、与朋友共同组织活动的票务应用设计，包含用户流程梳理与交互原型。',
    tags: ['UX Design', 'Figma', 'Axure RP', 'UX Flow'],
    cover: 'nodes',
    content: {
      intro: [
        '票务应用设计项目：支持用户按偏好购买演出票，并与朋友一起组织活动。完成用户流程梳理与交互原型设计。',
      ],
      highlights: [
        { title: '按偏好购票', text: '围绕用户偏好设计购票流程' },
        { title: '好友共同组织', text: '支持与朋友一起组织活动的协作场景' },
        { title: '交互原型', text: '使用 Figma 与 Axure RP 完成 UX Flow 与交互原型' },
      ],
    },
    skills: ['Figma', 'Axure RP', 'UX Flow', 'UX Design'],
  },
  {
    slug: 'landing-page-template-system',
    title: 'Landing Page 模板系统',
    titleEn: 'Landing Page Template System',
    category: 'ux-case',
    status: 'delivered',
    role: 'Web / 品牌设计',
    summary:
      '设计一套可复用的 Landing Page Template——通用网页模板系统，覆盖功能展示、用户评价与 FAQ 等板块，而非为某一个 App 单独定制。',
    tags: ['Web Design', 'Branding', 'Figma', 'Design System'],
    cover: 'grid',
    content: {
      intro: [
        '这不是单独为某一个 App 设计的 Landing Page，而是一套可复用的 Landing Page Template / 通用网页模板系统。',
        '模板覆盖应用推广页的常见板块：功能展示、用户评价、FAQ 等，可按不同产品快速适配。',
      ],
      highlights: [
        { title: '模板化板块', text: '功能展示、用户评价、FAQ 等通用板块设计' },
        { title: '品牌适配', text: '颜色与视觉元素可按不同产品替换' },
        { title: '可复用结构', text: '形成可快速复用的组件与版面结构' },
      ],
    },
    skills: ['Web Design', 'Branding', 'Figma', 'Design System'],
  },
  {
    slug: 'ux-design-project',
    title: '桌游网站 UX 研究',
    titleEn: 'UX Design Project',
    category: 'ux-case',
    status: 'delivered',
    role: 'UX Research · Usability Testing',
    summary: '针对桌游购物与设计网站的 UX 研究项目：专家评审与主持式、非主持式用户测试，输出可用性改进建议。',
    tags: ['UX Research', 'Usability Testing', 'Figma'],
    cover: 'orbit',
    content: {
      intro: [
        '针对一个桌游购物与设计网站开展的 UX 研究项目：通过专家评审（Expert Review）以及主持式与非主持式用户测试，定位体验问题并输出可用性改进建议。',
      ],
      highlights: [
        { title: 'Expert Review', text: '专家评审定位体验问题' },
        { title: 'Moderated Testing', text: '主持式用户测试' },
        { title: 'Unmoderated Testing', text: '非主持式用户测试' },
        { title: '改进建议', text: '输出可用性改进建议' },
      ],
    },
    skills: ['UX Research', 'Usability Testing', 'Figma'],
  },
];

/* ============ 归档紧凑卡片（无独立案例页） ============ */
export interface ArchiveMini {
  name: string;
  nameEn: string;
  desc: string;
  tags: string[];
  status?: 'ongoing';
}

export const archiveMinis: ArchiveMini[] = [
  {
    name: 'NexVolt',
    nameEn: 'AI EV Recommendation Platform',
    desc: 'AI 助力的电动车推荐平台，面向澳洲消费者，基于生活方式、预算与用车场景进行匹配推荐。',
    tags: ['AI', 'Recommendation'],
    status: 'ongoing',
  },
  {
    name: 'ECE OS',
    nameEn: 'AI Educator Workflow',
    desc: '面向教育者的 AI 工作流工具，帮助教育工作者减少文档与记录时间。',
    tags: ['AI', 'EdTech'],
    status: 'ongoing',
  },
  {
    name: 'Delivery System',
    nameEn: 'Logistics Dashboard',
    desc: '国际订单跟踪与实时路线可视化的物流系统设计。',
    tags: ['Dashboard', 'Data Visualization'],
  },
  {
    name: 'Calorie App',
    nameEn: 'Calorie Tracking App',
    desc: '卡路里追踪应用：用户将消耗的卡路里「捐赠」给社会，形成独特的动机循环。',
    tags: ['Mobile UI', 'Data Visualization'],
  },
  {
    name: 'Fitness App',
    nameEn: 'Fitness Recommendation App',
    desc: '基于位置与目标推荐健身方案的应用设计。',
    tags: ['Mobile UI', 'Interaction'],
  },
  {
    name: '独立电商',
    nameEn: 'Independent E-commerce',
    desc: '从选品到真实客户的独立电商实践。',
    tags: ['E-commerce'],
  },
];

/* ============ 独立实践 / Side Projects ============ */
export const sideProjects = [
  'AI SaaS',
  '电商',
  '独立网站',
  'Android App',
  'AI Agent',
  '数据产品',
  '自动化工具',
  '其他个人实验',
];

/* ============ 状态与分组配置 ============ */
export const statusLabels: Record<ProjectStatus, string> = {
  delivered: '已交付',
  ongoing: '进行中',
  concept: '概念项目',
};

export const statusTone: Record<ProjectStatus, 'accent' | 'success' | 'warning'> = {
  delivered: 'success',
  ongoing: 'accent',
  concept: 'warning',
};

export interface ProjectGroup {
  id: string;
  title: string;
  desc: string;
  slugs: string[];
}

export const projectGroups: ProjectGroup[] = [
  {
    id: 'core',
    title: '完整案例',
    desc: '5 个核心完整 Case Studies：企业 SaaS 交付、独立 AI 产品、企业级 AI Copilot / Agent 战略、数字化转型方案与产品模块上线。',
    slugs: [
      'enterprise-logistics-saas',
      'ai-teacher-growth-platform',
      'mart-gpt-strategy',
      'fmcg-digital-transformation',
      'product-discovery-delivery',
    ],
  },
  {
    id: 'ux',
    title: '简版案例',
    desc: '3 个简版 UX / Product Case Studies。',
    slugs: ['ticketing-app', 'landing-page-template-system', 'ux-design-project'],
  },
];
