import { Link } from "react-router-dom";
import { site } from "@/config/site";
import { resumeSummary, workExperience, education, skillGroups } from "@/config/resume";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export default function About() {
  useDocumentTitle("about");
  return (
    <div className="container-site py-16">
      <p className="eyebrow">关于我</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{site.fullName}</h1>
      <p className="mt-2 text-base text-ink-secondary">{site.tagline}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-10">
          <section>
            <h2 className="text-lg font-semibold text-ink">简短介绍</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{resumeSummary}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">产品方向</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
              我聚焦 AI 应用与海外产品两个方向。在 AI 侧，关注如何把大模型能力收敛为结构化、可评估、有安全边界的产品体验；在海外侧，关注本地化场景适配、合规与跨团队英文协作。经历中包含支付、商户平台与跨境电商 ERP，这些经验帮助我理解平台型产品的状态流转、权限与风控。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">AI 产品理解</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
              我认为好的 AI 产品不是“让 AI 更像人”，而是让 AI 在受控边界内提供有价值的视角，并把判断权交还用户。这要求 Prompt 与输出结构化、结果可评估、安全可熔断、画像由用户确认。微光 Glimmer 是我把这套理解落到一个完整产品上的实践。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">海外与跨文化经历</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
              英国利兹大学高级计算机科学硕士（Distinction），曾在 CGTN 伦敦分部以英文参与产品协作；在 Rebell Group 负责面向意大利市场的消费者 App、商户端与管理后台，独立主导 20+ 模块，以英文完成需求文档并协同跨国研发团队交付。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">工作方式</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
              习惯从问题定义出发，先把业务流程与状态梳理清楚，再进入方案；用结构化 Prompt 与工作流提升 PRD 效率，同时坚持人工校验关键输出。独立产品上，我能覆盖从需求、交互到原生开发验证的完整链路。
            </p>
          </section>
        </div>

        <aside className="space-y-8">
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-ink">技术背景</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
              计算机科学硕士，熟悉 SwiftUI、Python、SQL 与 API 基础；能直接与工程团队对齐字段、状态与异常处理，独立完成 iOS 原生开发验证。
            </p>
          </div>
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-ink">经历摘要</h2>
            <ul className="mt-3 space-y-3 text-sm">
              {workExperience.map((w) => (
                <li key={w.company}>
                  <p className="font-medium text-ink">{w.role}</p>
                  <p className="text-ink-secondary">{w.company}</p>
                  <p className="text-xs text-ink-tertiary">{w.period}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-ink">教育背景</h2>
            <ul className="mt-3 space-y-3 text-sm">
              {education.map((e) => (
                <li key={e.school}>
                  <p className="font-medium text-ink">{e.school}</p>
                  <p className="text-ink-secondary">{e.degree}</p>
                  <p className="text-xs text-ink-tertiary">{e.period}</p>
                  {e.detail && <p className="mt-1 text-xs text-ink-tertiary">{e.detail}</p>}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-ink">核心技能</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((g) => (
            <div key={g.title} className="card p-5">
              <p className="text-sm font-semibold text-ink">{g.title}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-ink-secondary">
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 card p-6">
        <h2 className="text-lg font-semibold text-ink">联系方式</h2>
        <div className="mt-3 flex flex-wrap gap-4 text-sm">
          {site.contact.email && (
            <a className="text-brand-primary hover:underline" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
          )}
          <Link to="/resume" className="text-ink-secondary hover:text-brand-primary">
            查看完整简历与下载 →
          </Link>
        </div>
      </section>
    </div>
  );
}
