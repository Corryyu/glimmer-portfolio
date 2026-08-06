/** 微光 Glimmer 项目案例内容。
 *  依据：最新简历、原 iOS 项目规则（AGENTS.md）、模型层（MoodType / InsightSafety / PsycheProfile）。
 *  无可靠数据时使用“产品观察”或“设计假设”，不伪造用户研究、行业数据或百分比。
 *  状态字段明确区分：已实现 / Web Demo 模拟 / 开发中 / 规划中。 */

export type CaseStatus = "live" | "webDemo" | "developing" | "planned";

export interface CaseStatusItem {
  label: string;
  status: CaseStatus;
}

export interface ProductDecision {
  question: string;
  choice: string;
  reason: string;
  tradeoff: string;
}

export interface ArchitectureModule {
  key: string;
  name: string;
  enName: string;
  desc: string;
}

export interface SafetyMode {
  key: string;
  name: string;
  desc: string;
  status: CaseStatus;
}

export const glimmerCase = {
  overview: {
    name: "微光 Glimmer",
    positioning:
      "微光 Glimmer 是一款基于循证心理学理念（CBT、ACT、IFS 等）的情绪自助与自我觉察 iOS App。",
    notWhat: [
      "不是聊天机器人",
      "不是心理测评工具",
      "不是心理诊断工具",
      "不是医疗服务或在线心理咨询",
    ],
    summary:
      "它把“记录情绪”升级为“理解情绪”：用户做一次结构化情绪签到，AI 给出可质疑、可撤回的即时洞察，长期沉淀为经用户确认的心理画像，帮助用户形成长期自我认识。",
    platform: "iOS 17+ SwiftUI 原生（个人项目，独立产品与开发）",
    period: "2025.11 – 至今",
  },

  userProblems: [
    {
      title: "记录停留在统计",
      desc: "产品观察：多数情绪记录产品止步于“记录 + 统计图表”，用户记录后难以获得有意义的反馈。",
      basis: "产品观察" as const,
    },
    {
      title: "碎片记录难以形成长期认识",
      desc: "产品观察：单次记录彼此孤立，难以沉淀为对自我模式的长期理解。",
      basis: "产品观察" as const,
    },
    {
      title: "AI 心理产品容易越界",
      desc: "设计假设：通用 AI 容易给出空洞安慰、过度解释，或在用户脆弱时挖掘创伤、越界下结论。",
      basis: "设计假设" as const,
    },
  ],

  valueProposition:
    "用结构化洞察替代自由聊天，用“可质疑、可撤回的观察”替代权威结论，用“用户确认后写入”的画像替代 AI 自动画像。让 AI 提供视角，把判断权交还给用户。",

  architecture: [
    {
      key: "now",
      name: "此刻 Now",
      enName: "Now",
      desc: "情绪签到入口：选择情绪、强度、诱因与可选文字补充，获得即时洞察并保存记录。",
    },
    {
      key: "echo",
      name: "回响 Echo",
      enName: "Echo",
      desc: "历史回看：月历热力图、按日查看签到、轻量趋势总结，识别长期模式。",
    },
    {
      key: "me",
      name: "本我 Me",
      enName: "Me",
      desc: "心理画像：天性 / 阴影 / 资源三个维度，AI 只提建议，确认后才写入画像。",
    },
    {
      key: "insight",
      name: "AI 洞察",
      enName: "Insight",
      desc: "结构化洞察系统：标题、心理学观察视角、核心洞察、低阻力行动、身体练习、反思问题、画像建议。",
    },
  ] as ArchitectureModule[],

  coreFlow: [
    "选择情绪",
    "选择强度",
    "选择诱因",
    "可选文字补充",
    "AI 即时洞察",
    "保存记录",
    "回响历史",
    "识别长期模式",
    "画像更新建议",
    "用户确认或拒绝",
  ],

  aiDesign: {
    isWhat:
      "AI 是结构化洞察系统，不是自由聊天。“树洞”只是情绪签到中的可选文字补充，不是聊天输入框。",
    inputs: [
      "当前情绪",
      "强度",
      "诱因",
      "可选补充文字",
      "有限历史模式",
      "经用户确认的画像",
      "内容模式和风险状态",
    ],
    outputs: [
      "标题",
      "心理学观察视角",
      "核心洞察",
      "三个低阻力行动",
      "身体练习",
      "可选反思问题",
      "可选画像更新建议",
    ],
    models:
      "项目使用 GLM、Kimi、DeepSeek 等主流大语言模型进行 Prompt 迭代、输出对比、结构稳定性、语气和安全边界测试。不自研或训练基础模型，也不声称临床验证。",
  },

  safetyModes: [
    {
      key: "explore",
      name: "explore 探索",
      desc: "低强度、偏正向情绪。允许更开放的视角与反思问题，鼓励自我探索。",
      status: "live" as CaseStatus,
    },
    {
      key: "balanced",
      name: "balanced 平衡",
      desc: "普通负向情绪。提供结构化洞察与低阻力行动，保持温和但不过度深入。",
      status: "live" as CaseStatus,
    },
    {
      key: "stabilize",
      name: "stabilize 稳定化",
      desc: "用于麻木、高强度低落或 freeze 状态。减少深度探索，不挖掘创伤，优先提供身体和环境层面的稳定化行动。",
      status: "live" as CaseStatus,
    },
    {
      key: "crisis",
      name: "crisis 危机熔断",
      desc: "停止普通 AI 深度洞察，不分析心理原因，引导用户寻求现实支持。",
      status: "live" as CaseStatus,
    },
  ] as SafetyMode[],

  disclaimer:
    "以上安全模式是产品机制与交互演示，不代表医学或临床验证。风险分流只控制产品流程，不向用户展示临床风险等级。",

  decisions: [
    {
      question: "为什么不做聊天机器人",
      choice: "采用结构化签到 + 结构化洞察，而非自由对话。",
      reason: "聊天容易演变为空洞安慰或越界挖掘；结构化输入让 AI 在受控边界内给出有价值的视角。",
      tradeoff: "牺牲了对话的即时感与陪伴感，换来了输出稳定性和安全可控。",
    },
    {
      question: "为什么使用结构化洞察",
      choice: "AI 输出固定结构：视角、洞察、行动、身体练习、反思问题。",
      reason: "结构化让洞察可评估、可对比、可撤回，避免模型自由发挥带来的越界。",
      tradeoff: "限制了表达的自由度，但显著提升了语气一致性与安全边界。",
    },
    {
      question: "为什么画像更新必须经用户确认",
      choice: "AI 只提出画像建议，用户确认后才写入并用于后续洞察。",
      reason: "用户对长期画像拥有最终决定权，AI 不得自动改写、归档或整合画像。",
      tradeoff: "画像形成更慢，但保证了用户主权与数据的可信度。",
    },
    {
      question: "为什么 freeze 时减少 AI 能力",
      choice: "麻木 / 高强度低落时切换 stabilize，减少深度探索与反思问题。",
      reason: "在脆弱状态下挖掘创伤可能造成二次伤害，优先提供稳定化与环境行动。",
      tradeoff: "用户在 freeze 时得到的“洞察”更少，但更安全。",
    },
    {
      question: "为什么高风险时主动停止 AI",
      choice: "命中或无法确定安全信号时进入 crisis，停止深度生成。",
      reason: "网络错误不得降级为普通洞察；不确定时宁可暂停也不冒险生成。",
      tradeoff: "可能误触发熔断，但把用户安全置于产品体验之上。",
    },
    {
      question: "为什么加入身体练习",
      choice: "洞察中包含一个身体层面的低负担练习。",
      reason: "情绪调节不止是认知层面的工作，身体稳定化是低门槛、高可用的资源。",
      tradeoff: "增加了内容生产成本，但让行动建议更可落地。",
    },
    {
      question: "为什么使用去病理化语言",
      choice: "全应用文案避免诊断、病理化与医疗承诺。",
      reason: "产品定位是非诊疗自我反思工具，去病理化语言降低标签化与病耻感。",
      tradeoff: "无法提供“医学诊断”的权威感，但与产品边界一致。",
    },
  ] as ProductDecision[],

  myRole: [
    "产品定义与定位",
    "信息架构（Now / Echo / Me 三大模块）",
    "交互设计与流程设计",
    "Prompt 设计与输出结构定义",
    "安全策略（风险分流、freeze 屏蔽、危机熔断）",
    "开发验证（SwiftUI + MVVM 原生实现）",
  ],

  statusOverview: [
    { label: "情绪签到流程（情绪/强度/诱因/文字/洞察）", status: "live" },
    { label: "结构化 AI 洞察与低阻力行动", status: "live" },
    { label: "回响月历热力图与按日查看", status: "live" },
    { label: "本我三维画像与建议确认机制", status: "live" },
    { label: "freeze / stabilize 稳定化路径", status: "live" },
    { label: "crisis 危机熔断", status: "live" },
    { label: "Web App 交互演示", status: "webDemo" },
    { label: "周报 / 月报生成", status: "developing" },
    { label: "渐进式画像问卷", status: "developing" },
    { label: "远程 AI 独立安全后端（上线前必需）", status: "planned" },
  ] as CaseStatusItem[],
};

export const statusLabel: Record<CaseStatus, string> = {
  live: "已实现",
  webDemo: "Web Demo 模拟",
  developing: "开发中",
  planned: "规划中",
};

export const statusStyle: Record<CaseStatus, string> = {
  live: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  webDemo: "bg-violet-50 text-violet-700 ring-1 ring-violet-200",
  developing: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  planned: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
};
