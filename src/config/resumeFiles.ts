/** 简历文件可用性。
 *  公开仓库不含简历文件，避免暴露邮箱/手机号；页面隐藏下载按钮（不创建死链接）。
 *  如需提供下载，可后续将 DOCX 放到非公开渠道分享。 */
export const resumeFiles = {
  docx: false,
  pdf: false,
} as const;
