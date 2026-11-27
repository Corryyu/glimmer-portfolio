/** 作品集项目配置——数据驱动，便于后续追加项目。 */
export type BrokerCaseKind = "trade-order" | "device-authorization";
export type ProjectPreviewKind = "glimmer" | "rebell" | BrokerCaseKind;

export const glimmerProfileDecisionId = "profile-decision";

export interface ProjectSummary {
  slug: string;
  name: string;
  tagline: string;
  type: string;
  role: string;
  status: string;
  /** 当前阶段标识：已实现 / 开发中 / 规划中 */
  phase: "live" | "developing" | "planned";
  accent: string;
  casePath: string;
  preview?: ProjectPreviewKind;
  /** Web App 路径；无 demo 时为空字符串，卡片隐藏「体验 Web App」按钮 */
  demoPath?: string;
  /** 标记是否为脱敏化案例（展示「脱敏案例」标签） */
  redacted?: boolean;
}

export const brokerProjects = {
  "trade-order": {
    slug: "trade-order",
    name: "券商 App 下单纠错",
    tagline: "买入数量输错时，在输入处解释整手规则，并给出可确认的纠正操作。",
    type: "交易体验",
    role: "下单交互、交易 PRD 与验收用例",
    status: "原型验证 · PRD 定稿",
    phase: "developing",
    accent: "#24705E",
    casePath: "/portfolio/trade-order",
    preview: "trade-order",
    redacted: true,
  },
  "device-authorization": {
    slug: "device-authorization",
    name: "换机登录与交易授权",
    tagline: "换手机后，分别判断登录、查看资产和下单哪些环节需要验证。",
    type: "账户安全",
    role: "账户方案、认证流程与交互原型",
    status: "产品方案 · 交互原型",
    phase: "developing",
    accent: "#665198",
    casePath: "/portfolio/device-authorization",
    preview: "device-authorization",
    redacted: true,
  },
} satisfies Record<BrokerCaseKind, ProjectSummary>;

export const projects: ProjectSummary[] = [
  ...Object.values(brokerProjects),
  {
    slug: "glimmer",
    name: "微光 Glimmer",
    tagline: "基于循证心理学理念的情绪自助与自我觉察 iOS App",
    type: "AI 情绪自助与自我觉察 iOS App",
    role: "产品定义、信息架构、交互设计、Prompt 设计、安全策略与开发验证",
    status: "持续开发中",
    phase: "developing",
    accent: "#5B50D6",
    casePath: "/portfolio/glimmer",
    preview: "glimmer",
    demoPath: "/glimmer",
  },
  {
    slug: "rebell",
    name: "Rebell Group 海外商户平台",
    tagline: "面向意大利市场的海外 B2B 商户平台 0→1：入驻、合规、营销、风控一体化",
    type: "海外 B2B 商户平台 / 0→1",
    role: "海外产品经理，独立主导 20+ 模块从需求到上线",
    status: "已上线 · 持续迭代",
    phase: "live",
    accent: "#0F766E",
    casePath: "/portfolio/rebell",
    preview: "rebell",
    demoPath: "",
    redacted: true,
  },
];
