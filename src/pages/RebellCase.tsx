import { CaseChapter, CaseStudy, DecisionList } from "@/components/site/CaseStudy";
import { Link } from "react-router-dom";
import { rebellCase } from "@/config/rebellCase";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

const chapters = {
  overview: "项目概览",
  "user-problems": "用户问题",
  value: "价值主张",
  modules: "产品模块",
  decisions: "关键产品决策",
  "ai-workflow": "AI 产品工作流实践",
  responsibility: "我的职责",
};

export default function RebellCase() {
  useDocumentTitle("rebellCase");
  const c = rebellCase;
  return (
    <CaseStudy
      title={c.overview.name}
      description={c.overview.positioning}
      facts={[c.overview.platform, c.overview.period, "已上线 · 脱敏案例"]}
      kind="rebell"
      chapters={chapters}
      note={c.overview.sensitiveNote}
    >

      <CaseChapter id="overview" title={chapters.overview}>
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
      </CaseChapter>

      <CaseChapter id="user-problems" title={chapters["user-problems"]}>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {c.userProblems.map((p) => (
            <div key={p.title} className="card p-5">
              <p className="font-semibold text-ink">{p.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{p.desc}</p>
              <p className="mt-3 text-xs text-ink-tertiary">依据：{p.basis}</p>
            </div>
          ))}
        </div>
      </CaseChapter>

      <CaseChapter id="value" title={chapters.value}>
        <p className="mt-4 max-w-prose text-base leading-relaxed text-ink">{c.valueProposition}</p>
      </CaseChapter>

      <CaseChapter id="modules" title={chapters.modules}>
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
      </CaseChapter>

      <CaseChapter id="decisions" title={chapters.decisions}>
        <DecisionList decisions={c.decisions} />
      </CaseChapter>

      <CaseChapter id="ai-workflow" title={chapters["ai-workflow"]}>
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
      </CaseChapter>

      <CaseChapter id="responsibility" title={chapters.responsibility}>
        <div className="mt-5 flex flex-wrap gap-2">
          {c.myRole.map((r) => (
            <span key={r} className="rounded-full bg-brand-primary/10 px-3 py-1.5 text-sm text-brand-primary">
              {r}
            </span>
          ))}
        </div>
      </CaseChapter>

      {/* 返回作品集 */}
      <section className="mt-12">
        <div className="card flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-ink">返回作品集</p>
            <p className="mt-1 text-sm text-ink-secondary">查看其他项目案例。</p>
          </div>
          <Link to="/portfolio" className="btn-secondary">返回作品集</Link>
        </div>
      </section>

      {/* 底部说明 */}
      <p className="mt-8 text-xs text-ink-tertiary">
        本案例为脱敏化展示。如需了解更详细的产品方案或查看原始 PRD，可在面试沟通中按需提供。
      </p>
    </CaseStudy>
  );
}
