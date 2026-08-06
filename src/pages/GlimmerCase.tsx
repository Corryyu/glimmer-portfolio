import { Link } from "react-router-dom";
import { glimmerCase, statusLabel, statusStyle } from "@/config/glimmerCase";
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

export default function GlimmerCase() {
  useDocumentTitle("glimmerCase");
  const c = glimmerCase;
  return (
    <article className="container-site py-16">
      <p className="eyebrow">项目案例</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{c.overview.name}</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-secondary">{c.overview.positioning}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-canvas-soft px-3 py-1 text-ink-secondary ring-1 ring-canvas-border">{c.overview.platform}</span>
        <span className="rounded-full bg-canvas-soft px-3 py-1 text-ink-secondary ring-1 ring-canvas-border">{c.overview.period}</span>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700 ring-1 ring-amber-200">持续开发中</span>
      </div>

      {/* 1. 项目概览 */}
      <section className="mt-12">
        <SectionTitle n={1}>项目概览</SectionTitle>
        <p className="mt-4 max-w-prose text-sm leading-relaxed text-ink-secondary">{c.overview.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {c.overview.notWhat.map((w) => (
            <span key={w} className="rounded-full bg-rose-50 px-3 py-1 text-xs text-rose-600 ring-1 ring-rose-200">非 · {w}</span>
          ))}
        </div>
      </section>

      {/* 2. 用户问题 */}
      <section className="mt-12">
        <SectionTitle n={2}>用户问题</SectionTitle>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
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

      {/* 4. 产品架构 */}
      <section className="mt-12">
        <SectionTitle n={4}>产品架构</SectionTitle>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.architecture.map((m) => (
            <div key={m.key} className="card p-5">
              <p className="font-semibold text-ink">{m.name}</p>
              <p className="text-xs text-ink-tertiary">{m.enName}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 核心用户流程 */}
      <section className="mt-12">
        <SectionTitle n={5}>核心用户流程</SectionTitle>
        <ol className="mt-5 flex flex-wrap gap-2">
          {c.coreFlow.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span className="rounded-lg bg-canvas-soft px-3 py-1.5 text-sm text-ink ring-1 ring-canvas-border">
                <span className="mr-1.5 text-xs text-brand-secondary">{i + 1}</span>
                {step}
              </span>
              {i < c.coreFlow.length - 1 && <span className="text-ink-tertiary" aria-hidden="true">→</span>}
            </li>
          ))}
        </ol>
      </section>

      {/* 6. AI 产品设计 */}
      <section className="mt-12">
        <SectionTitle n={6}>AI 产品设计</SectionTitle>
        <p className="mt-4 max-w-prose text-sm leading-relaxed text-ink-secondary">{c.aiDesign.isWhat}</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="card p-5">
            <p className="text-sm font-semibold text-ink">输入</p>
            <ul className="mt-3 space-y-1.5 text-sm text-ink-secondary">
              {c.aiDesign.inputs.map((i) => (
                <li key={i}>· {i}</li>
              ))}
            </ul>
          </div>
          <div className="card p-5">
            <p className="text-sm font-semibold text-ink">输出</p>
            <ul className="mt-3 space-y-1.5 text-sm text-ink-secondary">
              {c.aiDesign.outputs.map((o) => (
                <li key={o}>· {o}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink-secondary">{c.aiDesign.models}</p>
      </section>

      {/* 7. 安全机制 */}
      <section className="mt-12">
        <SectionTitle n={7}>安全机制</SectionTitle>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.safetyModes.map((m) => (
            <div key={m.key} className="card p-5">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-ink">{m.name}</p>
                <span className={`rounded-full px-2 py-0.5 text-[11px] ${statusStyle[m.status]}`}>{statusLabel[m.status]}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{m.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl bg-amber-50 p-4 text-xs leading-relaxed text-amber-800 ring-1 ring-amber-200">
          ⚠ {c.disclaimer}
        </p>
      </section>

      {/* 8. 用户主权与隐私 */}
      <section className="mt-12">
        <SectionTitle n={8}>用户主权与隐私</SectionTitle>
        <ul className="mt-4 max-w-prose space-y-2 text-sm leading-relaxed text-ink-secondary">
          <li>· 用户对长期画像拥有最终决定权，AI 不得自动添加、改写或归档画像。</li>
          <li>· 只有用户确认后的画像条目才会进入后续 AI 上下文。</li>
          <li>· 本地优先存储；远程 AI 独立 opt-in；GDPR/CCPA 分区同意。</li>
          <li>· Web Demo 数据完全保存在浏览器本地，不上传任何服务器。</li>
        </ul>
      </section>

      {/* 9. 关键产品决策 */}
      <section className="mt-12">
        <SectionTitle n={9}>关键产品决策</SectionTitle>
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

      {/* 10. 我的职责 */}
      <section className="mt-12">
        <SectionTitle n={10}>我的职责</SectionTitle>
        <div className="mt-5 flex flex-wrap gap-2">
          {c.myRole.map((r) => (
            <span key={r} className="rounded-full bg-brand-primary/10 px-3 py-1.5 text-sm text-brand-primary">
              {r}
            </span>
          ))}
        </div>
      </section>

      {/* 11. 当前状态 */}
      <section className="mt-12">
        <SectionTitle n={11}>当前状态</SectionTitle>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {c.statusOverview.map((s) => (
            <div key={s.label} className="flex items-center justify-between rounded-xl bg-canvas-soft px-4 py-2.5 ring-1 ring-canvas-border">
              <span className="text-sm text-ink">{s.label}</span>
              <span className={`rounded-full px-2 py-0.5 text-[11px] ${statusStyle[s.status]}`}>{statusLabel[s.status]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 12. Demo 入口 */}
      <section className="mt-12">
        <SectionTitle n={12}>Demo 入口</SectionTitle>
        <div className="mt-5 card flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-ink">体验微光 Glimmer Web App</p>
            <p className="mt-1 text-sm text-ink-secondary">3 分钟内完成情绪签到、AI 洞察、回响与画像的核心流程。</p>
          </div>
          <Link to="/glimmer" className="btn-primary">体验 Web App →</Link>
        </div>
        <p className="mt-4 text-xs text-ink-tertiary">
          这是微光 Glimmer 的交互式产品演示版本，部分数据及 AI 结果为演示内容。
        </p>
      </section>
    </article>
  );
}
