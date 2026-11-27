import type { WorkExperience, Education, SkillGroup } from "@/types";
import { brokerProjects } from "./projects";

/** 公开展示的工作经历，按任职时间倒序排列。 */
export const workExperience: WorkExperience[] = [
  {
    role: "金融 App 产品经理",
    period: "现职",
    bullets: [
      "设计港股、美股和沪深市场的下单交互，将每手股数、交易时段和账户购买力等规则写入表单提示、纠错动作与验收用例，完成交易模块 PRD 定稿。",
      "设计登录、资产查看与下单授权的分层方案，梳理换机验证和开户、绑户分流，在交互原型中覆盖登录与交易解锁的主要状态。",
      "梳理选股指标的数据源、计算口径和异常样例，输出字段对照及复测记录，为研发实现与数据验收提供依据。",
    ],
    cases: Object.values(brokerProjects).map((project) => ({ label: project.name, to: project.casePath })),
  },
  {
    company: "小慕（深圳）科技有限公司 / Rebell Group",
    role: "产品经理｜海外产品",
    period: "2025.03 – 2026.05",
    bullets: [
      "海外产品全流程：负责面向意大利市场的消费者 App、商户端与管理后台，独立主导 20+ 个模块从需求调研、业务流程梳理、原型/PRD 到上线迭代，围绕当地商户与用户场景完成产品适配。",
      "商户平台与金融合规：搭建商户入驻（Onboarding）流程，梳理 KYB/KYC、合同管理、账号体系、多层级权限及登录安全机制，形成商户全生命周期管理闭环。",
      "增长与运营产品：从 0 到 1 设计营销中心与优惠券系统，支持商户自主发券、平台统一活动配置、第三方优惠聚合及效果追踪。",
      "平台规则与风险控制：梳理 C/B/后台多端状态流转、角色权限及关键操作边界，设计操作日志、审计与异常行为追踪能力，提升平台安全性与可追溯性。",
      "AI 产品工作流：基于 Claude Skill 搭建“需求解析—PRD 生成—设计一致性校验—Xray 测试用例”工作流，设计结构化 Prompt 与校验规则，PRD 产出效率提升 3 倍以上；以英文完成需求文档并协同跨国研发团队交付。",
    ],
  },
  {
    company: "深圳礼意久久网络科技有限公司",
    role: "ERP 产品经理｜跨境电商",
    period: "2023.03 – 2024.08",
    bullets: [
      "跨境业务数字化：调研 6 个业务部门，梳理订单、库存、仓储、物流与成本核算等 20+ 条核心流程，形成跨境电商 ERP 产品方案，库存周转率提升 25%。",
      "数据驱动的决策规则：主导自动化订单分仓系统，将物流成本、履约时效与库存水位抽象为分仓决策规则，自动输出发货仓库方案，人力成本降低 40%。",
      "平台/API 集成：推动 ERP 与 WMS、OMS 及亚马逊 API 对接，梳理数据字段、订单状态、异常处理与回传机制，人工跟单工作量减少 70%。",
    ],
  },
  {
    company: "中国国际电视台（CGTN）伦敦分部",
    role: "产品助理｜海外协作",
    period: "2021.12 – 2023.01",
    bullets: [
      "海外产品协作：在英国团队中参与功能设计、线框图绘制、竞品与市场调研，编写英文需求文档及用户手册，积累跨文化环境下的产品沟通与交付经验。",
    ],
  },
];

export const education: Education[] = [
  {
    school: "英国利兹大学 University of Leeds",
    degree: "高级计算机科学 硕士（Distinction）",
    period: "2020.09 – 2021.11",
    detail: "AI/数据相关课程：机器学习｜知识表示与推理｜数据挖掘与文本分析｜数据科学编程｜大数据系统",
  },
  {
    school: "武汉科技大学",
    degree: "计算机科学与技术 学士",
    period: "2016.09 – 2020.06",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "产品能力",
    items: ["0-1 产品", "C/B/后台产品", "需求抽象", "流程设计", "PRD/原型", "竞品分析", "敏捷迭代"],
  },
  {
    title: "AI 产品",
    items: [
      "LLM 场景设计",
      "AI 洞察设计",
      "Prompt 迭代",
      "模型对比与效果评估",
      "安全策略",
      "Agent/工作流基础",
    ],
  },
  {
    title: "金融与合规",
    items: [
      "证券交易与账户授权",
      "行情与选股指标口径",
      "英文 PRD 与跨团队协作",
      "海外场景适配",
      "KYC/KYB",
      "商户 Onboarding",
      "GDPR/CCPA",
      "API 集成",
    ],
  },
  {
    title: "技术与工具",
    items: ["Figma", "Axure", "Jira", "Confluence", "Xray", "Trae", "SwiftUI", "Python", "SQL", "API 基础"],
  },
];

export const resumeSummary =
  "4 年产品经验，目前做面向个人投资者的券商 App，覆盖证券交易、账户安全与选股数据。将交易规则转化为用户能操作的原型，以及研发可执行的 PRD 和验收用例。曾负责意大利市场的消费者 App 和商户平台，也独立设计和开发了 AI 情绪自助产品「微光 Glimmer」。计算机科学硕士，英语可作为工作语言。";
