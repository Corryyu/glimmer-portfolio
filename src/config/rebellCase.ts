/** Rebell Group 海外商户平台 · 脱敏化产品案例
 *
 *  内容来源：本人简历公开描述 + 实际产出的 PRD 模块清单。
 *  敏感信息处理：不暴露内部项目编号、第三方合作方名称、未公开业务数据、
 *  商户/交易数据。所有指标均来自简历公开表述；未经验证处标注「产品观察」。
 */
export interface RebellModule {
  name: string;
  enName: string;
  desc: string;
  /** 状态：已上线 / 持续迭代 */
  status: "live" | "iterating";
}

export interface RebellDecision {
  question: string;
  choice: string;
  reason: string;
  tradeoff: string;
}

export const rebellCase = {
  overview: {
    name: "Rebell Group 海外商户平台",
    positioning:
      "面向意大利市场的海外商户平台 0→1：覆盖商户入驻、KYB/KYC、合同与账号体系、营销与优惠券、运营后台与风控审计，支撑商户全生命周期管理。",
    company: "小慕（深圳）科技有限公司 / Rebell Group（意大利市场）",
    role: "产品经理（海外产品）",
    period: "2025.03 – 2026.05",
    platform: "Web 商户端 + 管理后台（BO）",
    type: "海外 B2B 商户平台 / 0→1",
    summary:
      "作为海外产品经理，独立主导面向意大利市场的消费者 App、商户端与管理后台，负责 20+ 个模块从需求调研、业务流程梳理、原型/PRD 到上线迭代。围绕当地商户与用户场景完成产品适配，覆盖从商户入驻、合规审核、营销运营到风控审计的完整链路。",
    stack: ["产品定义", "信息架构", "PRD/原型", "跨团队协作", "英文交付", "本地化适配"],
    sensitiveNote:
      "本案例为脱敏化展示，不公开内部项目编号、第三方合作方名称、未公开业务数据与商户/交易数据。文中描述均基于简历已公开内容。",
  },

  // 1. 用户问题（基于产品观察，非用户研究数据）
  userProblems: [
    {
      title: "海外商户入驻门槛高",
      desc: "意大利本地商户对线上入驻流程不熟悉，KYB/KYC、合同签署、账号配置等环节分散，缺少统一的入驻体验。",
      basis: "产品观察",
    },
    {
      title: "多端状态流转复杂",
      desc: "消费者端、商户端、后台三方数据与状态需要协同流转，权限边界与操作审计缺乏统一规范。",
      basis: "产品观察",
    },
    {
      title: "营销运营分散",
      desc: "商户自主发券、平台统一活动、第三方优惠聚合分别独立运作，缺少统一配置与效果追踪。",
      basis: "产品观察",
    },
    {
      title: "风控可追溯性不足",
      desc: "关键操作缺少结构化日志与审计能力，异常行为难以回溯，影响平台合规与安全。",
      basis: "产品观察",
    },
  ],

  // 2. 价值主张
  valueProposition:
    "以「商户全生命周期」为主线，把入驻、合规、运营、风控整合到统一平台，让海外商户能低门槛上线、自主运营，平台能合规管控、可审计追溯。",

  // 3. 产品模块（基于简历公开描述 + PRD 模块清单，已脱敏）
  modules: [
    {
      name: "商户入驻",
      enName: "Onboarding",
      desc: "从注册、资质提交到合同签署的完整入驻流程，整合 KYB/KYC、合同管理与账号开通。",
      status: "live",
    },
    {
      name: "合规审核",
      enName: "KYB / KYC",
      desc: "企业资质与个人信息审核，对接合规校验，形成商户准入闭环。",
      status: "live",
    },
    {
      name: "合同管理",
      enName: "Contract",
      desc: "合同模板、签署流程与归档，支持商户签约状态追踪。",
      status: "live",
    },
    {
      name: "账号与权限",
      enName: "Account & Roles",
      desc: "多层级角色与权限体系，定义 C/B/后台三端操作边界。",
      status: "live",
    },
    {
      name: "登录与安全",
      enName: "Auth & Security",
      desc: "注册、登录、登出与账号安全机制，保障商户账号安全。",
      status: "live",
    },
    {
      name: "商户资料",
      enName: "Merchant Profile",
      desc: "商户基本信息、资质资料与服务配置的统一管理。",
      status: "iterating",
    },
    {
      name: "营销中心",
      enName: "Marketing Center",
      desc: "从 0 到 1 设计，支持商户自主发券、活动配置与效果追踪。",
      status: "live",
    },
    {
      name: "优惠券系统",
      enName: "Coupon",
      desc: "优惠券创建、规则配置、核销与统计，支持平台统一活动与第三方聚合。",
      status: "live",
    },
    {
      name: "消息中心",
      enName: "Notification",
      desc: "商户端消息与通知体系，覆盖交易、审核、运营等场景。",
      status: "live",
    },
    {
      name: "运营后台",
      enName: "Back Office",
      desc: "商户、订单、营销、风控等模块的统一管理后台。",
      status: "live",
    },
    {
      name: "数据看板",
      enName: "Dashboard",
      desc: "商户与平台关键指标可视化，辅助运营决策。",
      status: "live",
    },
    {
      name: "审计与日志",
      enName: "Audit & Logs",
      desc: "关键操作日志与审计能力，提升平台安全性与可追溯性。",
      status: "live",
    },
  ] satisfies RebellModule[],

  // 4. 关键产品决策
  decisions: [
    {
      question: "为什么把入驻、合规、合同整合成统一流程？",
      choice: "构建商户全生命周期的统一入驻链路，而非分散表单。",
      reason: "海外商户对线上入驻流程不熟悉，分散环节会增加流失率；统一链路能降低门槛并让进度可追踪。",
      tradeoff: "前期设计与协调成本更高，需要兼容意大利本地合规要求与合同模板。",
    },
    {
      question: "为什么自建多层级权限与审计体系？",
      choice: "设计 C/B/后台三端角色权限边界 + 操作日志与审计。",
      reason: "B2B 平台对操作可追溯性要求高，统一权限与审计是合规与安全的基础。",
      tradeoff: "权限模型设计复杂，需要持续维护角色与操作矩阵。",
    },
    {
      question: "为什么从 0 到 1 自建营销中心与优惠券系统？",
      choice: "支持商户自主发券 + 平台统一活动 + 第三方聚合的混合模式。",
      reason: "海外市场的营销场景需要兼顾商户自主运营与平台统一管控，自建系统才能覆盖完整场景。",
      tradeoff: "系统复杂度高，需平衡灵活配置与使用门槛。",
    },
    {
      question: "为什么强调英文交付与本地化适配？",
      choice: "以英文完成 PRD 与需求文档，协同跨国研发团队，并按意大利本地场景适配。",
      reason: "海外产品需要服务意大利本地商户与用户，跨文化沟通与本地化适配是落地的关键。",
      tradeoff: "对产品经理的语言与跨文化沟通能力要求高，需要持续对齐本地需求。",
    },
  ] satisfies RebellDecision[],

  // 5. 我的职责
  myRole: [
    "海外产品全流程",
    "20+ 模块 0→1 主导",
    "商户入驻与合规流程",
    "营销中心与优惠券系统",
    "权限、审计与风控设计",
    "英文 PRD 与跨团队协作",
    "本地化适配",
  ],

  // 6. AI 产品工作流（简历公开）
  aiWorkflow: {
    title: "AI 产品工作流实践",
    desc: "基于 Claude Skill 搭建「需求解析—PRD 生成—设计一致性校验—Xray 测试用例」工作流，设计结构化 Prompt 与校验规则，PRD 产出效率提升 3 倍以上。",
    steps: [
      "需求解析：结构化输入业务方需求与场景约束",
      "PRD 生成：结构化 Prompt 生成 PRD 框架与功能描述",
      "设计一致性校验：自动检查 PRD 与原型的一致性",
      "Xray 测试用例：基于 PRD 自动生成测试用例",
    ],
    metric: "PRD 产出效率提升 3 倍以上（来源：简历公开表述）",
  },
} as const;
