import { site } from "./site";

/** 页面级 SEO：动态 document.title 与 meta description。 */
export interface PageMeta {
  title: string;
  description: string;
}

export const pageMeta = {
  home: {
    title: `${site.fullName} · ${site.role}`,
    description: `${site.name}，${site.role}。${site.intro}查看网页简历与代表案例。`,
  },
  portfolio: {
    title: "作品集 · 郁国瑞 Guorui Yu",
    description: "郁国瑞的产品作品集。体验券商 App 的下单纠错、换机验证，以及微光 Glimmer 与海外商户平台。",
  },
  tradeOrderCase: {
    title: "券商 App 下单纠错 · 郁国瑞",
    description: "体验券商 App 的数量校验和行内纠错，了解整手交易规则如何进入交互原型、需求和验收。",
  },
  accountAccessCase: {
    title: "换机登录与交易授权 · 郁国瑞",
    description: "比较原设备与新设备的模拟流程，体验券商 App 如何安排登录、资产查看和下单时的验证。",
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
  resume: {
    title: "简历 · 郁国瑞 Guorui Yu",
    description: `${site.name}的网页简历。查看 C 端金融 App 工作经历、微光 Glimmer 项目与教育背景。`,
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
