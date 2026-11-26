import { useState } from "react";
import { Link } from "react-router-dom";
import { site } from "@/config/site";
import { capabilities, toolsAndTech } from "@/config/home";
import { projects } from "@/config/projects";
import { resumeSummary, workExperience } from "@/config/resume";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

const phaseBadgeStyle: Record<"live" | "developing" | "planned", string> = {
  live: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:ring-emerald-800/70",
  developing: "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:ring-amber-800/70",
  planned: "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700",
};

export default function Home() {
  useDocumentTitle("home");
  const recentWork = workExperience.slice(0, 2);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    if (!site.contact.email) return;
    try {
      await navigator.clipboard.writeText(site.contact.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // 剪贴板不可用时退回 mailto
      window.location.href = `mailto:${site.contact.email}`;
    }
  };

  return (
    <>
      {/* 第一屏 */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(900px 480px at 12% -8%, rgba(91,80,214,0.14), transparent 60%), radial-gradient(700px 420px at 92% 0%, rgba(74,144,226,0.12), transparent 55%)",
          }}
          aria-hidden="true"
        />
        <div className="container-site pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="max-w-3xl animate-fadeUp">
            <p className="eyebrow">{site.tagline}</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              {site.name}
              <span className="ml-3 font-medium text-ink-secondary">{site.nameEn}</span>
            </h1>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-canvas-surface px-3 py-1 text-xs font-medium text-ink-secondary ring-1 ring-canvas-border">
                4 年产品经验
              </span>
              <span className="rounded-full bg-canvas-surface px-3 py-1 text-xs font-medium text-ink-secondary ring-1 ring-canvas-border">
                利兹大学高级 CS 硕士
              </span>
              <span className="rounded-full bg-canvas-surface px-3 py-1 text-xs font-medium text-ink-secondary ring-1 ring-canvas-border">
                中文 / English 工作语言
              </span>
            </div>

            <p className="mt-6 text-lg leading-relaxed text-ink sm:text-xl">
              {site.intro}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-secondary">
              {site.introExtended}
            </p>

            {/* 两个主入口 */}
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <Link to="/portfolio" className="card group p-5 transition hover:-translate-y-0.5 hover:shadow-card">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary" aria-hidden="true">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" rx="1.5" />
                      <rect x="14" y="3" width="7" height="7" rx="1.5" />
                      <rect x="3" y="14" width="7" height="7" rx="1.5" />
                      <rect x="14" y="14" width="7" height="7" rx="1.5" />
                    </svg>
                  </span>
                  <p className="text-sm font-semibold text-ink">产品作品集</p>
                </div>
                <p className="mt-2 text-sm text-ink-secondary">
                  查看我如何定义问题、设计产品并推进方案落地（含 AI 应用与海外 B2B 平台案例）。
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-primary">
                  查看作品集
                  <span aria-hidden="true" className="transition group-hover:translate-x-0.5">→</span>
                </span>
              </Link>

              <Link to="/glimmer" className="card group relative overflow-hidden p-5 transition hover:-translate-y-0.5 hover:shadow-card">
                <div className="flex items-center gap-2.5">
                  <span className="breath-dot animate-breathe" aria-hidden="true" />
                  <p className="text-sm font-semibold text-ink">微光 Glimmer</p>
                </div>
                <p className="mt-2 text-sm text-ink-secondary">
                  体验情绪签到、AI 洞察、回响和心理画像的核心流程。
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-primary">
                  体验 Web App
                  <span aria-hidden="true" className="transition group-hover:translate-x-0.5">→</span>
                </span>
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to="/resume" className="btn-secondary">
                查看完整简历
              </Link>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              >
                关于我 ↓
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 关于我（叙事） */}
      <section id="about" className="container-site py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-ink">关于我</h2>
          <Link to="/resume" className="text-sm font-medium text-brand-primary hover:underline">完整简历 →</Link>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-ink">简短介绍</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{resumeSummary}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">产品方向</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                我聚焦 AI 应用与海外产品两个方向。在 AI 侧，关注如何把大模型能力收敛为结构化、可评估、有安全边界的产品体验；在海外侧，关注本地化场景适配、合规与跨团队英文协作。
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">AI 产品理解</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                好的 AI 产品不是“让 AI 更像人”，而是让 AI 在受控边界内提供有价值的视角，并把判断权交还用户。这要求 Prompt 与输出结构化、结果可评估、安全可熔断、画像由用户确认。
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">海外与跨文化经历</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                英国利兹大学高级计算机科学硕士（Distinction），曾在 CGTN 伦敦分部以英文参与产品协作；在 Rebell Group 负责面向意大利市场的商户平台，独立主导 20+ 模块。
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">工作方式</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                从问题定义出发，先把业务流程与状态梳理清楚，再进入方案；用结构化 Prompt 与工作流提升 PRD 效率，同时坚持人工校验关键输出。
              </p>
            </div>
          </div>
          <aside className="space-y-5">
            <div className="card p-5">
              <p className="text-sm font-semibold text-ink">技术背景</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                计算机科学硕士，熟悉 SwiftUI、Python、SQL 与 API 基础；能直接与工程团队对齐字段、状态与异常处理，独立完成 iOS 原生开发验证。
              </p>
            </div>
            <div className="card p-6">
              <p className="text-sm font-semibold text-ink">联系方式</p>
              <div className="mt-3 flex flex-col gap-3 text-sm">
                {site.contact.email && (
                  <div className="flex flex-wrap items-center gap-2">
                    <a className="font-medium text-brand-primary hover:underline" href={`mailto:${site.contact.email}`}>
                      {site.contact.email}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="rounded-full bg-canvas-soft px-2.5 py-0.5 text-xs text-ink-secondary ring-1 ring-canvas-border transition hover:text-ink"
                    >
                      {copiedEmail ? "已复制 ✓" : "复制"}
                    </button>
                  </div>
                )}
                <Link to="/resume" className="text-ink-secondary hover:text-brand-primary">
                  查看简历 →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 核心能力 */}
      <section className="container-site py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-ink">核心能力</h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <div key={c.title} className="card p-5 transition hover:border-brand-primary/30">
              <p className="font-semibold text-ink">{c.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 精选项目 */}
      <section className="container-site py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-ink">精选项目</h2>
          <Link to="/portfolio" className="text-sm font-medium text-brand-primary hover:underline">
            全部作品 →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {projects.map((p) => (
            <article key={p.slug} className="card flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-card">
              <Link
                to={p.casePath}
                className="flex h-36 items-center justify-center focus:outline-none"
                style={{
                  background: `linear-gradient(135deg, ${p.accent}24, ${p.accent}0a)`,
                }}
                aria-label={`查看 ${p.name} 项目案例`}
              >
                {p.slug === "glimmer" ? (
                  <span className="breath-dot animate-breathe" style={{ width: 28, height: 28 }} aria-hidden="true" />
                ) : (
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-teal-500/25 bg-canvas-surface/85 text-teal-700 shadow-soft dark:text-teal-300"
                    aria-hidden="true"
                  >
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9h18M9 21V9M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5z" />
                    </svg>
                  </div>
                )}
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-ink">
                    <Link to={p.casePath} className="hover:text-brand-primary">
                      {p.name}
                    </Link>
                  </h3>
                  <span className={`rounded-full px-2 py-0.5 text-xs ring-1 ${phaseBadgeStyle[p.phase]}`}>
                    {p.status}
                  </span>
                  {p.redacted && (
                    <span className="rounded-full bg-canvas-soft px-2 py-0.5 text-xs text-ink-secondary ring-1 ring-canvas-border">
                      脱敏案例
                    </span>
                  )}
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-secondary">{p.tagline}</p>
                <div className="mt-4 flex flex-wrap items-center gap-4 pt-2">
                  <Link to={p.casePath} className="text-sm font-medium text-brand-primary hover:underline">
                    查看完整案例 →
                  </Link>
                  {p.demoPath && (
                    <Link to={p.demoPath} className="text-sm text-ink-secondary hover:text-brand-primary">
                      体验 Web App
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 简短工作经历 */}
      <section className="container-site py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-ink">工作经历</h2>
          <Link to="/resume" className="text-sm font-medium text-brand-primary hover:underline">完整简历 →</Link>
        </div>
        <div className="mt-8 space-y-5">
          {recentWork.map((w) => (
            <div key={w.company} className="card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-semibold text-ink">{w.company}</p>
                <span className="text-sm text-ink-tertiary">{w.period}</span>
              </div>
              <p className="mt-0.5 text-sm text-brand-primary">{w.role}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{w.bullets[0]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 工具与技术 */}
      <section className="container-site py-16">
        <h2 className="text-2xl font-bold tracking-tight text-ink">工具与技术</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {toolsAndTech.map((t) => (
            <span key={t} className="rounded-full bg-canvas-soft px-3.5 py-1.5 text-sm text-ink-secondary ring-1 ring-canvas-border">
              {t}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
