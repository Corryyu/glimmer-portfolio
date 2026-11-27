import type { NavLink } from "@/types";

/** 集中配置：个人资料、联系方式、导航、页脚。
 *  缺失字段留空，页面会隐藏对应入口，绝不虚构联系方式。 */
export const site = {
  name: "郁国瑞",
  nameEn: "Guorui Yu",
  fullName: "郁国瑞 Guorui Yu",
  role: "C 端产品经理",
  tagline: "金融 App · AI 应用",
  intro:
    "目前做面向个人投资者的金融 App 产品设计，也在独立设计和开发 AI 情绪自助产品「微光 Glimmer」。",
  introExtended:
    "利兹大学高级计算机科学硕士，日常自己画原型、写英文 PRD，也能直接用 SwiftUI 和 Python 验证技术方案。",
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
