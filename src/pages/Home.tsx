import { Link } from "react-router-dom";
import { site } from "@/config/site";
import { capabilities, toolsAndTech } from "@/config/home";
import { projects } from "@/config/projects";
import { workExperience } from "@/config/resume";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export default function Home() {
  useDocumentTitle("home");
  const glimmer = projects[0]!;
  const recentWork = workExperience.slice(0, 2);

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
              <span className="ml-3 text-ink-secondary">{site.nameEn}</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink sm:text-xl">
              {site.intro}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-secondary">
              {site.introExtended}
            </p>

            {/* 两个主入口 */}
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <Link to="/portfolio" className="card group p-5 transition hover:-translate-y-0.5 hover:shadow-card">
                <p className="text-sm font-semibold text-ink">产品作品集</p>
                <p className="mt-1.5 text-sm text-ink-secondary">
                  查看我如何定义问题、设计产品并推进方案落地。
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-primary">
                  查看作品集
                  <span aria-hidden="true" className="transition group-hover:translate-x-0.5">→</span>
                </span>
              </Link>
              <Link to="/glimmer" className="card group relative overflow-hidden p-5 transition hover:-translate-y-0.5 hover:shadow-card">
                <div className="flex items-center gap-2">
                  <span className="breath-dot animate-breathe" aria-hidden="true" />
                  <p className="text-sm font-semibold text-ink">微光 Glimmer</p>
                </div>
                <p className="mt-1.5 text-sm text-ink-secondary">
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
                查看简历
              </Link>
              <Link to="/about" className="btn-ghost">
                关于我 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 核心能力 */}
      <section className="container-site py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-ink">核心能力</h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <div key={c.title} className="card p-5">
              <p className="font-semibold text-ink">{c.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 精选项目 */}
      <section className="container-site py-16">
        <h2 className="text-2xl font-bold tracking-tight text-ink">精选项目</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <Link to={glimmer.casePath} className="card group overflow-hidden transition hover:-translate-y-0.5 hover:shadow-card">
            <div
              className="flex h-40 items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${glimmer.accent}22, ${glimmer.accent}0d)`,
              }}
            >
              <span className="breath-dot animate-breathe" style={{ width: 28, height: 28 }} aria-hidden="true" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-ink">{glimmer.name}</h3>
                <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-700 ring-1 ring-amber-200">
                  {glimmer.status}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-ink-secondary">{glimmer.tagline}</p>
              <div className="mt-4 flex gap-3">
                <span className="text-sm font-medium text-brand-primary">查看完整案例 →</span>
                <Link to={glimmer.demoPath} className="text-sm text-ink-secondary hover:text-brand-primary" onClick={(e) => e.stopPropagation()}>
                  体验 Web App
                </Link>
              </div>
            </div>
          </Link>

          <div className="card flex flex-col justify-center p-6">
            <p className="eyebrow">为什么是这个项目</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
              微光 Glimmer 完整体现了我在 AI 应用上的产品判断：结构化洞察、安全边界、用户主权与去病理化语言。它不是聊天机器人，而是一个把心理学理念转化为可落地交互的产品实验。
            </p>
            <Link to="/portfolio" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-primary">
              查看作品集总览 →
            </Link>
          </div>
        </div>
      </section>

      {/* 简短工作经历 */}
      <section className="container-site py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-ink">工作经历</h2>
          <Link to="/resume" className="text-sm text-brand-primary">完整简历 →</Link>
        </div>
        <div className="mt-8 space-y-5">
          {recentWork.map((w) => (
            <div key={w.company} className="card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-semibold text-ink">{w.company}</p>
                <span className="text-sm text-ink-tertiary">{w.period}</span>
              </div>
              <p className="text-sm text-ink-secondary">{w.role}</p>
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
