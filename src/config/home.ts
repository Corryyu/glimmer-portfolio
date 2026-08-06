/** 首页内容配置：核心能力、精选项目入口、工具与技术。 */

export interface Capability {
  title: string;
  desc: string;
}

export const capabilities: Capability[] = [
  {
    title: "AI 应用产品设计",
    desc: "从场景定义到信息架构，把大模型能力收敛为可信、可评估的产品体验。",
  },
  {
    title: "Prompt 与结构化输出",
    desc: "设计结构化 Prompt 与输出契约，保证语气、结构与安全边界的稳定性。",
  },
  {
    title: "模型输出评估",
    desc: "基于 GLM、Kimi、DeepSeek 等模型做迭代、对比与结构稳定性测试。",
  },
  {
    title: "AI 安全与产品边界",
    desc: "设计风险分流、freeze 屏蔽与危机熔断，把最终判断权交还给用户。",
  },
  {
    title: "海外产品与本地化",
    desc: "面向意大利等市场完成场景适配、KYC/KYB、合规与英文跨团队协作。",
  },
  {
    title: "从 0 到 1 产品落地",
    desc: "独立完成需求、PRD、交互到开发验证，覆盖 C/B/后台与独立产品。",
  },
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
