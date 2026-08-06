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
  demoPath: string;
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
];
