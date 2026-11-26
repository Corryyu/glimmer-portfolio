/** 首页内容配置：核心能力、工具与技术。 */

export interface Capability {
  title: string;
  desc: string;
}

export const capabilities: Capability[] = [
  {
    title: "AI 产品设计与边界",
    desc: "把大模型能力约束在结构化输入输出里，设计风险分流、freeze 屏蔽与危机熔断，确保用户保留最终判断权。",
  },
  {
    title: "Prompt 与输出评估",
    desc: "针对具体场景设计结构化 Prompt 与字段契约，在 GLM、Kimi、DeepSeek 上做输出稳定性对比和回归校验。",
  },
  {
    title: "海外产品与本地化",
    desc: "负责过面向意大利市场的消费者端、商户端与后台系统，处理 KYB/KYC 合规、当地商户习惯与英文跨团队交付。",
  },
  {
    title: "从 0 到 1 独立落地",
    desc: "覆盖需求调研、流程梳理、原型、PRD 到开发跟进。能用 SwiftUI、Python、SQL 直接和工程团队对齐实现细节。",
  },
];

export interface ToolCategory {
  label: string;
  items: string;
}

export const toolCategories: ToolCategory[] = [
  { label: "设计与协作", items: "Figma · Axure · Jira · Confluence · Xray" },
  { label: "技术与验证", items: "SwiftUI · React / TypeScript · Python · SQL" },
  { label: "模型与辅助", items: "Claude · ChatGPT · DeepSeek · GLM · Kimi · Trae" },
];

export const toolsAndTech: string[] = [
  "Figma",
  "Axure",
  "Jira",
  "Confluence",
  "Xray",
  "Trae",
  "SwiftUI",
  "Vite / React / TypeScript",
  "Python",
  "SQL",
  "Claude / ChatGPT / DeepSeek",
  "GLM / Kimi",
];
