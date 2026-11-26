import { useState } from "react";
import { Link } from "react-router-dom";
import { site } from "@/config/site";
import { capabilities, toolCategories } from "@/config/home";
import { projects } from "@/config/projects";
import { workExperience } from "@/config/resume";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

const phaseLabelStyle: Record<"live" | "developing" | "planned", string> = {
  live: "text-emerald-700 dark:text-emerald-400",
  developing: "text-amber-700 dark:text-amber-400",
  planned: "text-ink-tertiary",
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
      window.location.href = `mailto:${site.contact.email}`;
    }
  };

  return (
    <>
      {/* 首屏：非对称编辑部排版，无渐变光晕与药丸堆砌 */}
      <section className="border-b border-canvas-border">
        <div className="container-site py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div>
              <p className="text-sm font-medium text-ink-secondary">{site.tagline}</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                {site.name}
                <span className="ml-3 font-normal text-ink-tertiary">{site.nameEn}</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink">
                {site.intro}
              </p>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-secondary">
                {site.introExtended}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/portfolio" className="btn-primary">
                  查看作品集
                </Link>
                <Link to="/glimmer" className="btn-secondary">
                  体验 Glimmer Demo
                </Link>
                <Link to="/resume" className="btn-ghost">
                  完整简历
                </Link>
              </div>
            </div>

            {/* 右侧简明档案索引 */}
            <dl className="divide-y divide-canvas-border border-y border-canvas-border text-sm">
              <div className="flex items-baseline justify-between gap-4 py-3">
                <dt className="text-ink-tertiary">经验</dt>
                <dd className="text-right font-medium text-ink">4 年产品经理（B 端 / C 端 / AI）</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3">
                <dt className="text-ink-tertiary">学历</dt>
                <dd className="text-right font-medium text-ink">利兹大学高级 CS 硕士（Distinction）</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3">
                <dt className="text-ink-tertiary">语言</dt>
                <dd className="text-right font-medium text-ink">中文 · English（工作语言）</dd>
              </div>
              {site.contact.email && (
                <div className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-ink-tertiary">联系</dt>
                  <dd className="flex items-center gap-2 text-right">
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="font-medium text-ink underline decoration-canvas-border underline-offset-4 hover:decoration-ink"
                    >
                      {site.contact.email}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="rounded border border-canvas-border px-2 py-0.5 text-xs text-ink-secondary transition hover:border-ink/30 hover:text-ink"
                    >
                      {copiedEmail ? "已复制" : "复制"}
                    </button>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </section>

      {/* 精选项目：结构化列表，告别大面积渐变占位盒 */}
      <section className="container-site py-16">
        <div className="flex items-baseline justify-between border-b border-canvas-border pb-4">
          <h2 className="text-xl font-bold tracking-tight text-ink">精选项目</h2>
          <Link to="/portfolio" className="text-sm text-ink-secondary hover:text-ink">
            作品集详情
          </Link>
        </div>

        <div className="divide-y divide-canvas-border border-b border-canvas-border">
          {projects.map((p) => (
            <article key={p.slug} className="grid gap-6 py-8 lg:grid-cols-[1fr_1.6fr]">
              <div>
                <div className="flex items-center gap-2.5">
                  {p.slug === "glimmer" && (
                    <span className="breath-dot shrink-0" style={{ width: 10, height: 10 }} aria-hidden="true" />
                  )}
                  <h3 className="text-lg font-semibold text-ink">
                    <Link to={p.casePath} className="hover:underline underline-offset-4">
                      {p.name}
                    </Link>
                  </h3>
                </div>
                <p className="mt-1.5 text-sm text-ink-secondary">{p.type}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                  <span className={`font-medium ${phaseLabelStyle[p.phase]}`}>
                    ● {p.status}
                  </span>
                  {p.redacted && (
                    <span className="text-ink-tertiary">· 脱敏案例</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-base leading-relaxed text-ink">{p.tagline}</p>
                  <p className="mt-2 text-sm text-ink-secondary">职责：{p.role}</p>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-5 text-sm font-medium">
                  <Link
                    to={p.casePath}
                    className="text-brand-primary underline decoration-brand-primary/30 underline-offset-4 hover:decoration-brand-primary"
                  >
                    阅读案例复盘
                  </Link>
                  {p.demoPath && (
                    <Link
                      to={p.demoPath}
                      className="text-ink-secondary underline decoration-canvas-border underline-offset-4 hover:text-ink hover:decoration-ink"
                    >
                      体验交互式 Demo
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 关于我：自然叙事，去掉模板化八股小标题 */}
      <section id="about" className="container-site py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-ink">关于我</h2>
            <p className="mt-2 text-sm text-ink-secondary">
              海外 B2B 平台、AI 产品设计与工程背景
            </p>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-ink-secondary">
            <p className="text-ink">
              过去四年里，我先后做过跨境电商 ERP、面向意大利市场的 B2B 商户平台，以及独立开发的 iOS 情绪自助应用「微光 Glimmer」。
            </p>
            <p>
              做 AI 产品时，我更在意可控性而不是拟人感。在 Glimmer 里，大模型只负责输出结构化的观察视角和行动建议，遇到麻木或高风险输入会直接走稳定化或危机熔断；长期画像必须由用户本人点确认才会写入，不让模型擅自替人下结论。
            </p>
            <p>
              在海外业务侧，我曾在 CGTN 伦敦分部以英文参与产品协作，并在 Rebell Group 独立主导过 20 多个商户平台模块。有计算机科学硕士底子，日常可以用 SwiftUI、Python 和 SQL 直接验证逻辑，减少和研发对齐时的信息损耗。
            </p>
          </div>
        </div>
      </section>

      {/* 核心能力：2x2 细线分隔索引 */}
      <section className="container-site py-12">
        <div className="border-b border-canvas-border pb-4">
          <h2 className="text-xl font-bold tracking-tight text-ink">核心能力</h2>
        </div>
        <div className="grid divide-y divide-canvas-border border-b border-canvas-border md:grid-cols-2 md:divide-y-0">
          {capabilities.map((c, idx) => (
            <div
              key={c.title}
              className={`py-6 ${idx % 2 === 0 ? "md:pr-8" : "md:pl-8 md:border-l md:border-canvas-border"} ${idx >= 2 ? "md:border-t md:border-canvas-border" : ""}`}
            >
              <h3 className="text-base font-semibold text-ink">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 工作经历：简洁时间线列表 */}
      <section className="container-site py-12">
        <div className="flex items-baseline justify-between border-b border-canvas-border pb-4">
          <h2 className="text-xl font-bold tracking-tight text-ink">工作经历</h2>
          <Link to="/resume" className="text-sm text-ink-secondary hover:text-ink">
            查看完整简历
          </Link>
        </div>
        <div className="divide-y divide-canvas-border border-b border-canvas-border">
          {recentWork.map((w) => (
            <div key={w.company} className="grid gap-3 py-6 md:grid-cols-[1fr_1.6fr]">
              <div>
                <p className="font-semibold text-ink">{w.company}</p>
                <p className="mt-1 text-sm text-ink-secondary">{w.role}</p>
                <p className="mt-1 text-xs tabular-nums text-ink-tertiary">{w.period}</p>
              </div>
              <p className="text-sm leading-relaxed text-ink-secondary">{w.bullets[0]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 工具与技术：纯文本分类行，去掉药丸标签堆砌 */}
      <section className="container-site py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="text-xl font-bold tracking-tight text-ink">工具与技术</h2>
          <dl className="divide-y divide-canvas-border border-y border-canvas-border text-sm">
            {toolCategories.map((cat) => (
              <div key={cat.label} className="grid gap-2 py-3.5 sm:grid-cols-[120px_1fr]">
                <dt className="text-ink-tertiary">{cat.label}</dt>
                <dd className="text-ink">{cat.items}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
