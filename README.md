# 郁国瑞 Guorui Yu · 个人网站与产品作品集

这是郁国瑞（Guorui Yu）的个人网站与产品作品集，用于求职展示。网站同时包含**微光 Glimmer** 的交互式产品演示（Web App）。

- 技术栈：Vite + React + TypeScript（严格模式）+ React Router + Tailwind CSS
- 部署：Trae 静态网页部署（纯静态站点，输出 `dist/`）
- 不依赖 Vercel、MCP、服务器、数据库或在线模型 API

## 产品名称说明

- 产品唯一正式名称：**微光 Glimmer**（中文“微光”，英文“Glimmer”）
- 原产品为 iOS 17+ SwiftUI 项目（源代码中历史遗留名 Shimmer 仅作内部代号，**不在公开内容中出现**）
- Web App 是面向招聘展示与产品验证的交互式 Demo，第一版使用**本地 Mock AI**

## 微光 Glimmer 的产品边界（重要）

- 微光 Glimmer **不是聊天机器人**、心理测评工具、心理诊断工具、医疗服务或在线心理咨询
- AI 输出是**可质疑、可撤回的观察**，不提供诊断或治疗
- “树洞”只是情绪签到中的可选文字补充，不是聊天输入框
- 风险分流（explore / balanced / stabilize / crisis）是**产品机制与交互演示，不代表医学或临床验证**
- 画像更新必须经用户确认后才会写入

## 页面与路由

使用 **HashRouter**（无法确认 Trae 静态部署是否支持 SPA History Fallback，稳定优先，避免刷新 404）。

| 路由 | 说明 |
| --- | --- |
| `/#/` | 个人主页（两个主入口 + 查看简历） |
| `/#/portfolio` | 作品集总览 |
| `/#/portfolio/glimmer` | 微光 Glimmer 项目案例（12 节） |
| `/#/glimmer` | 微光 Glimmer Web App（独立 Shell） |
| `/#/about` | 关于我 |
| `/#/resume` | 网页简历 + 文件下载 |
| `/#/privacy` | 隐私与产品边界说明 |
| 其他 | Not Found |

> 选择 HashRouter 的原因：静态托管若未配置 SPA fallback，BrowserRouter 刷新内部页会 404；HashRouter 不依赖服务端回退，最稳定。

## Glimmer Web App 已实现功能（P0）

- **情绪签到**：情绪 → 强度（1–5 垂直温度计）→ 诱因（多选）→ 可选文字 → 提交 → 洞察；支持返回修改
- **Mock AI 洞察**：6 种情绪 + freeze/stabilize + crisis 场景，结构化输出（标题/视角/洞察/三个行动/身体练习/反思问题/画像建议）
- **回响 Echo**：月历热力图、月份切换、点击日期查看签到、轻量趋势总结（20–30 天合成数据）
- **本我 Me**：天性 / 阴影 / 资源三维画像；AI 提建议 → 用户确认/拒绝 → 仅确认后写入；刷新保留
- **Freeze / Stabilize**：麻木 + 强度 5 直达，不挖掘创伤，优先稳定化
- **Crisis**：独立安全入口，停止深度洞察，不分析原因，引导现实支持（不编造热线）
- **本地数据**：localStorage 保存签到、画像、建议、进度；提供“重置演示数据”（二次确认）

## 使用 Mock 的功能

- 所有 AI 洞察均为**本地预置结果**（`src/lib/mockInsight.ts`），依据情绪/强度/诱因匹配，**不调用在线模型**
- 回响热力图的初始 20–30 天数据为**合成数据**（仅 Demo 展示，与真实用户无关）
- 危机案例为**安全演示**，不要求访客输入真实高风险内容

## 未实现 / 不在第一版范围

登录注册、账号、后端、数据库、云同步、在线模型 API、实时聊天/陪伴、安装包、社区、支付、通知、动态表单、博客/CMS、后台、多语言、年视图、实时周月报、多模型切换、完整医学风险算法、数据导入导出、全部 iOS 页面迁移。

> 未来实时 AI 需要独立安全后端（密钥只存服务端环境变量），**不能在浏览器中暴露 API Key**。当前仅实现 `MockInsightProvider`。

## 内容配置说明

内容与 UI / 业务逻辑分离，集中在 `src/config/`：

| 文件 | 内容 |
| --- | --- |
| `site.ts` | 姓名、联系方式、导航、页脚、简历路径（缺失字段留空，页面自动隐藏） |
| `resume.ts` | 工作经历、教育背景、技能、个人概述（来自最新简历） |
| `resumeFiles.ts` | 简历文件可用性（DOCX/PDF 是否存在，缺失则隐藏按钮） |
| `projects.ts` | 作品集项目（数据驱动，便于追加） |
| `glimmerCase.ts` | Glimmer 案例内容（12 节 + 决策 + 状态） |
| `moods.ts` | 情绪定义（名称/配色/emoji 来自原 iOS 项目） |
| `home.ts` | 核心能力、工具与技术 |
| `seo.ts` | 页面 title / description |

更新资料 / 作品 / 简历 / Mock 数据：直接修改对应配置文件后重新构建。

### 更新简历文件

1. 将简历放入 `public/resume/`（当前 `Guorui_Yu_Resume.docx`）
2. 在 `src/config/resumeFiles.ts` 设置 `{ docx: true, pdf: true/false }`
3. 文件缺失时页面自动隐藏对应下载按钮，不创建死链接

## 本地运行与构建

```bash
npm install
npm run dev      # 本地开发
npm run build    # 生成 dist/
npm run preview  # 本地预览构建产物
```

构建产物输出至 `dist/`，`base` 设为 `'./'`（相对路径，兼容静态托管子路径）。

## Trae 静态部署步骤

1. `npm run build` 生成 `dist/`
2. 通过 Trae 静态网页部署功能发布 `dist` 目录
3. 部署后回归测试：首页两入口、导航、案例页、Glimmer 完整签到、回响、本我、刷新保留、重置、简历下载

## 浏览器兼容性

- 桌面：Chrome / Edge / Safari / Firefox（最新版）
- 移动：iOS Safari、Android Chrome
- 支持 `prefers-reduced-motion`、键盘导航、焦点状态、安全区域
- Glimmer 桌面端使用受控宽度（`max-w-app`），不拉伸全屏

## 招聘方三分钟体验路径

1. 首页 → 点“体验 Web App”进入 Glimmer（约 10 秒理解定位）
2. “开始体验” → 选情绪 → 选强度 → 选诱因 → 提交，查看结构化洞察（约 1 分钟）
3. 点“查看回响” → 月历热力图、点一天查看签到（约 30 秒）
4. 切到“本我” → 查看画像建议、点“确认写入”（约 30 秒）
5. 返回起始页 → 体验“麻木+强度5（Freeze）”和“安全案例（Crisis）”（约 30 秒）

## 已知问题

- 简历仅提供 DOCX 下载（环境无 LibreOffice，未生成 PDF；页面已隐藏 PDF 按钮，符合“文件不存在时隐藏”规则）
- LinkedIn / GitHub 在简历中未提供，页脚对应入口已隐藏（不虚构）
- Mock 洞察为预置场景，非真实模型输出
