/** 页面级 SEO：动态 document.title 与 meta description。 */
export interface PageMeta {
  title: string;
  description: string;
}

export const pageMeta = {
  home: {
    title: "郁国瑞 Guorui Yu · AI 应用与海外产品作品集",
    description:
      "郁国瑞，专注 AI 应用与海外产品。查看产品作品集，体验微光 Glimmer 情绪自助与自我觉察产品演示。",
  },
  portfolio: {
    title: "作品集 · 郁国瑞 Guorui Yu",
    description: "产品作品集总览：微光 Glimmer AI 情绪自助产品的定义、设计与产品决策。",
  },
  glimmerCase: {
    title: "微光 Glimmer 项目案例 · 郁国瑞",
    description:
      "微光 Glimmer：基于循证心理学理念的情绪自助与自我觉察 iOS App 的产品案例——问题、架构、流程、AI 设计与安全机制。",
  },
  rebellCase: {
    title: "Rebell Group 海外商户平台案例 · 郁国瑞",
    description:
      "面向意大利市场的海外 B2B 商户平台 0→1：入驻、合规、营销、风控一体化的脱敏化产品案例。",
  },
  glimmer: {
    title: "微光 Glimmer · 交互式产品演示",
    description:
      "体验微光 Glimmer 的情绪签到、AI 洞察、回响与心理画像核心流程。本地演示，数据保存在浏览器中。",
  },
  about: {
    title: "关于我 · 郁国瑞 Guorui Yu",
    description: "郁国瑞的产品方向、经历摘要、AI 产品理解与海外跨文化经历。",
  },
  resume: {
    title: "简历 · 郁国瑞 Guorui Yu",
    description: "郁国瑞个人简历：工作经历、个人项目、教育背景与核心技能，支持文件下载。",
  },
  privacy: {
    title: "隐私与产品边界说明 · 郁国瑞",
    description: "网站用途、微光 Glimmer Demo 数据本地化、本地 Mock AI 与产品边界说明。",
  },
  notFound: {
    title: "页面未找到 · 郁国瑞",
    description: "你访问的页面不存在，返回首页继续浏览。",
  },
} satisfies Record<string, PageMeta>;

export type PageMetaKey = keyof typeof pageMeta;

export const defaultMeta: PageMeta = pageMeta.home;
