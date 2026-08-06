import { Link } from "react-router-dom";
import { rebellCase } from "@/config/rebellCase";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

function SectionTitle({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-xl font-bold tracking-tight text-ink">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary/10 text-sm font-bold text-brand-primary">
        {n}
      </span>
      {children}
    </h2>
  );
}

export default function RebellCase() {
  useDocumentTitle("rebellCase");
  const c = rebellCase;
  return (
    <article className="container-site py-16">
      <p className="eyebrow">项目案例 · 脱敏化展示</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{c.overview.name}</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-secondary">{c.overview.positioning}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-canvas-soft px-3 py-1 text-ink-secondary ring-1 ring-canvas-border">{c.overview.platform}</span>
        <span className="rounded-full bg-canvas-soft px-3 py-1 text-ink-secondary ring-1 ring-canvas-border">{c.overview.period}</span>
        <span className="rounded-full bg-canvas-soft px-3 py-1 text-ink-secondary ring-1 ring-canvas-border">{c.overview.type}</span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 ring-1 ring-emerald-200">已上线</span>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700 ring-1 ring-amber-200">脱敏案例</span>
      </div>

      {/* 敏感信息说明 */}
      <p className="mt-5 rounded-xl bg-amber-50 p-4 text-xs leading-relaxed text-amber-800 ring-1 ring-amber-200">
        ⚠ {c.overview.sensitiveNote}
      </p>

      {/* 1. 项目概览 */}
      <section className="mt-12">
        <SectionTitle n={1}>项目概览</SectionTitle>
        <p className="mt-4 max-w-prose text-sm leading-relaxed text-ink-secondary">{c.overview.summary}</p>
        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-ink-tertiary">公司</dt>
            <dd className="mt-1 text-sm text-ink">{c.overview.company}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-ink-tertiary">角色</dt>
            <dd className="mt-1 text-sm text-ink">{c.overview.role}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-ink-tertiary">周期</dt>
            <dd className="mt-1 text-sm text-ink">{c.overview.period}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-ink-tertiary">平台</dt>
            <dd className="mt-1 text-sm text-ink">{c.overview.platform}</dd>
          </div>
        </dl>
        <div className="mt-5 flex flex-wrap gap-2">
          {c.overview.stack.map((s) => (
            <span key={s} className="rounded-full bg-brand-primary/10 px-3 py-1.5 text-xs text-brand-primary">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* 2. 用户问题 */}
      <section className="mt-12">
        <SectionTitle n={2}>用户问题</SectionTitle>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {c.userProblems.map((p) => (
            <div key={p.title} className="card p-5">
              <p className="font-semibold text-ink">{p.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{p.desc}</p>
              <p className="mt-3 text-xs text-ink-tertiary">依据：{p.basis}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 价值主张 */}
      <section className="mt-12">
        <SectionTitle n={3}>价值主张</SectionTitle>
        <p className="mt-4 max-w-prose text-base leading-relaxed text-ink">{c.valueProposition}</p>
      </section>

      {/* 4. 产品模块 */}
      <section className="mt-12">
        <SectionTitle n={4}>产品模块（20+，已脱敏）</SectionTitle>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.modules.map((m) => (
            <div key={m.enName} className="card p-5">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-ink">{m.name}</p>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] ${
                    m.status === "live"
                      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                      : "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                  }`}
                >
                  {m.status === "live" ? "已上线" : "持续迭代"}
                </span>
              </div>
              <p className="text-xs text-ink-tertiary">{m.enName}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{m.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-ink-tertiary">
          以上为代表性模块，完整平台覆盖 20+ 模块。模块名称已通用化处理，不暴露内部项目编号。
        </p>
      </section>

      {/* 5. 关键产品决策 */}
      <section className="mt-12">
        <SectionTitle n={5}>关键产品决策</SectionTitle>
        <div className="mt-5 space-y-4">
          {c.decisions.map((d) => (
            <div key={d.question} className="card p-5">
              <p className="font-semibold text-ink">{d.question}</p>
              <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-brand-secondary">选择</dt>
                  <dd className="mt-1 text-sm text-ink">{d.choice}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-brand-secondary">原因</dt>
                  <dd className="mt-1 text-sm text-ink-secondary">{d.reason}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-ink-tertiary">代价或限制</dt>
                  <dd className="mt-1 text-sm text-ink-secondary">{d.tradeoff}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </section>

      {/* 6. AI 产品工作流 */}
      <section className="mt-12">
        <SectionTitle n={6}>AI 产品工作流实践</SectionTitle>
        <p className="mt-4 max-w-prose text-sm leading-relaxed text-ink-secondary">{c.aiWorkflow.desc}</p>
        <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {c.aiWorkflow.steps.map((step, i) => (
            <li key={step} className="card p-4">
              <span className="text-xs font-bold text-brand-secondary">步骤 {i + 1}</span>
              <p className="mt-1 text-sm text-ink">{step}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-800 ring-1 ring-emerald-200">
          ✓ {c.aiWorkflow.metric}
        </p>
      </section>

      {/* 7. 我的职责 */}
      <section className="mt-12">
        <SectionTitle n={7}>我的职责</SectionTitle>
        <div className="mt-5 flex flex-wrap gap-2">
          {c.myRole.map((r) => (
            <span key={r} className="rounded-full bg-brand-primary/10 px-3 py-1.5 text-sm text-brand-primary">
              {r}
            </span>
          ))}
        </div>
      </section>

      {/* 返回作品集 */}
      <section className="mt-12">
        <div className="card flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-ink">返回作品集</p>
            <p className="mt-1 text-sm text-ink-secondary">查看其他项目案例。</p>
          </div>
          <Link to="/portfolio" className="btn-secondary">← 返回作品集</Link>
        </div>
      </section>

      {/* 底部说明 */}
      <p className="mt-8 text-xs text-ink-tertiary">
        本案例为脱敏化展示。如需了解更详细的产品方案或查看原始 PRD，可在面试沟通中按需提供。
      </p>
    </article>
  );
}
