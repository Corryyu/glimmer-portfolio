import { Link } from "react-router-dom";
import { projects } from "@/config/projects";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export default function Portfolio() {
  useDocumentTitle("portfolio");
  return (
    <div className="container-site py-16">
      <p className="eyebrow">作品集</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">产品作品集</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-secondary">
        这里展示我主导的产品项目。每个项目都包含问题定义、产品架构、关键决策与当前状态，不复制完整简历。
      </p>

      <div className="mt-10 space-y-6">
        {projects.map((p) => (
          <article key={p.slug} className="card overflow-hidden">
            <div
              className="flex h-44 items-center justify-center sm:h-56"
              style={{ background: `linear-gradient(135deg, ${p.accent}1f, ${p.accent}08)` }}
            >
              <div className="text-center">
                <span className="breath-dot animate-breathe mx-auto" style={{ width: 30, height: 30 }} aria-hidden="true" />
                <p className="mt-4 text-lg font-semibold text-ink">{p.name}</p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-ink">{p.name}</h2>
                <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs text-amber-700 ring-1 ring-amber-200">
                  {p.status}
                </span>
              </div>
              <p className="mt-2 text-base text-ink-secondary">{p.tagline}</p>

              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-ink-tertiary">项目类型</dt>
                  <dd className="mt-1 text-sm text-ink">{p.type}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-ink-tertiary">当前状态</dt>
                  <dd className="mt-1 text-sm text-ink">{p.status}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-ink-tertiary">我的职责</dt>
                  <dd className="mt-1 text-sm text-ink">{p.role}</dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={p.casePath} className="btn-primary">
                  查看完整案例
                </Link>
                <Link to={p.demoPath} className="btn-secondary">
                  体验 Web App
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-10 text-sm text-ink-tertiary">
        当前公开展示一个完整项目。后续项目会以同样的数据结构追加，不预留空卡片或“敬请期待”。
      </p>
    </div>
  );
}
