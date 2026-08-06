import type { NavLink } from "@/types";

/** 集中配置：个人资料、联系方式、导航、页脚。
 *  缺失字段留空，页面会隐藏对应入口，绝不虚构联系方式。 */
export const site = {
  name: "郁国瑞",
  nameEn: "Guorui Yu",
  fullName: "郁国瑞 Guorui Yu",
  tagline: "专注 AI 应用与海外产品",
  intro:
    "我专注于 AI 应用与海外产品，关注如何把复杂技术和业务流程转化为清晰、可信、可落地的产品体验。",
  introExtended:
    "计算机科学硕士背景，4 年产品经验。从海外消费者 App、商户平台到 AI 情绪自助产品，我习惯独立完成从问题定义、交互设计到开发验证的完整链路。",
  contact: {
    email: "867209633@qq.com",
    phone: "19870080745",
    // 以下字段在简历中未提供，留空时页脚隐藏对应入口（不虚构）
    linkedin: "",
    github: "",
  },
  // 简历文件路径；构建时由 public/resume 提供实际文件，缺失时页面隐藏下载按钮
  resume: {
    docx: "./resume/Guorui_Yu_Resume.docx",
    pdf: "./resume/Guorui_Yu_Resume.pdf",
  },
} as const;

export const navLinks: NavLink[] = [
  { label: "首页", to: "/" },
  { label: "作品集", to: "/portfolio" },
  { label: "Glimmer Demo", to: "/glimmer" },
  { label: "简历", to: "/resume" },
];

export const footerLinks: NavLink[] = [
  { label: "作品集", to: "/portfolio" },
  { label: "Glimmer 项目说明", to: "/portfolio/glimmer" },
  { label: "Glimmer Demo", to: "/glimmer" },
  { label: "简历", to: "/resume" },
  { label: "隐私与产品边界", to: "/privacy" },
];
