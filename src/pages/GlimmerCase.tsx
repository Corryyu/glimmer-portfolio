import { Link } from "react-router-dom";
import { CaseChapter, CaseStudy, DecisionList } from "@/components/site/CaseStudy";
import { ProfileDecisionDemo } from "@/components/site/ProfileDecisionDemo";
import { glimmerCase, statusLabel, statusStyle } from "@/config/glimmerCase";
import { glimmerProfileDecisionId } from "@/config/projects";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

const chapters = {
  [glimmerProfileDecisionId]: "画像确认的取舍",
  overview: "项目概览",
  "user-problems": "用户问题",
  value: "价值主张",
  architecture: "产品架构",
  "core-flow": "核心用户流程",
  "ai-design": "AI 产品设计",
  safety: "安全机制",
  privacy: "用户主权与隐私",
  decisions: "关键产品决策",
  responsibility: "我的职责",
  status: "当前状态",
  demo: "Demo 入口",
};

export default function GlimmerCase() {
  useDocumentTitle("glimmerCase");
  const c = glimmerCase;
  return (
    <CaseStudy
      title={c.overview.name}
      description={c.overview.positioning}
      facts={[c.overview.platform, c.overview.period, "持续开发中"]}
      kind="glimmer"
      chapters={chapters}
      demoPath="/glimmer"
    >
      <CaseChapter id={glimmerProfileDecisionId} title={chapters[glimmerProfileDecisionId]}>
        <div className="case-profile-decision">
          <ProfileDecisionDemo />
          <dl className="profile-decision-notes">
            <div>
              <dt>为什么这样选</dt>
              <dd>一次签到反映的是当时的感受。我让用户看过依据，再决定要不要把它变成长期记录。</dd>
            </div>
            <div>
              <dt>我接受的代价</dt>
              <dd>多了一次操作，画像积累得更慢。用户可以看清 AI 记住了什么，也能当场拒绝。</dd>
            </div>
            <div>
              <dt>我怎么验证</dt>
              <dd>用同一条示例检查确认和拒绝后的画像状态。下一步验证用户能否说清这条记录会怎么用。</dd>
            </div>
          </dl>
        </div>
      </CaseChapter>
      <CaseChapter id="overview" title={chapters.overview}>
        <p className="mt-4 max-w-prose text-sm leading-relaxed text-ink-secondary">{c.overview.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {c.overview.notWhat.map((w) => (
            <span key={w} className="rounded-full bg-rose-50 px-3 py-1 text-xs text-rose-600 ring-1 ring-rose-200">非 · {w}</span>
          ))}
        </div>
      </CaseChapter>

      <CaseChapter id="user-problems" title={chapters["user-problems"]}>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
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

      <CaseChapter id="architecture" title={chapters.architecture}>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.architecture.map((m) => (
            <div key={m.key} className="card p-5">
              <p className="font-semibold text-ink">{m.name}</p>
              <p className="text-xs text-ink-tertiary">{m.enName}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{m.desc}</p>
            </div>
          ))}
        </div>
      </CaseChapter>

      <CaseChapter id="core-flow" title={chapters["core-flow"]}>
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
      </CaseChapter>

      <CaseChapter id="ai-design" title={chapters["ai-design"]}>
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
      </CaseChapter>

      <CaseChapter id="safety" title={chapters.safety}>
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
      </CaseChapter>

      <CaseChapter id="privacy" title={chapters.privacy}>
        <ul className="mt-4 max-w-prose space-y-2 text-sm leading-relaxed text-ink-secondary">
          <li>· 用户对长期画像拥有最终决定权，AI 不得自动添加、改写或归档画像。</li>
          <li>· 只有用户确认后的画像条目才会进入后续 AI 上下文。</li>
          <li>· 本地优先存储；远程 AI 独立 opt-in；GDPR/CCPA 分区同意。</li>
          <li>· Web Demo 数据完全保存在浏览器本地，不上传任何服务器。</li>
        </ul>
      </CaseChapter>

      <CaseChapter id="decisions" title={chapters.decisions}>
        <DecisionList decisions={c.decisions} />
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

      <CaseChapter id="status" title={chapters.status}>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {c.statusOverview.map((s) => (
            <div key={s.label} className="flex items-center justify-between rounded-xl bg-canvas-soft px-4 py-2.5 ring-1 ring-canvas-border">
              <span className="text-sm text-ink">{s.label}</span>
              <span className={`rounded-full px-2 py-0.5 text-[11px] ${statusStyle[s.status]}`}>{statusLabel[s.status]}</span>
            </div>
          ))}
        </div>
      </CaseChapter>

      <CaseChapter id="demo" title={chapters.demo}>
        <div className="mt-5 card flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-ink">体验微光 Glimmer Web App</p>
            <p className="mt-1 text-sm text-ink-secondary">3 分钟内完成情绪签到、AI 洞察、回响与画像的核心流程。</p>
          </div>
          <Link to="/glimmer" className="btn-primary">体验 Web App</Link>
        </div>
        <p className="mt-4 text-xs text-ink-tertiary">
          这是微光 Glimmer 的交互式产品演示版本，部分数据及 AI 结果为演示内容。
        </p>
      </CaseChapter>
    </CaseStudy>
  );
}
