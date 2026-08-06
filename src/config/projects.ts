/** 作品集项目配置——数据驱动，便于后续追加项目。 */
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
  /** Web App 路径；无 demo 时为空字符串，卡片隐藏「体验 Web App」按钮 */
  demoPath?: string;
  /** 标记是否为脱敏化案例（展示「脱敏案例」标签） */
  redacted?: boolean;
}

export const projects: ProjectSummary[] = [
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
    demoPath: "",
    redacted: true,
  },
];
