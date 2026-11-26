import { Link } from "react-router-dom";
import { projects } from "@/config/projects";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

const phaseLabelStyle: Record<"live" | "developing" | "planned", string> = {
  live: "text-emerald-700 dark:text-emerald-400",
  developing: "text-amber-700 dark:text-amber-400",
  planned: "text-ink-tertiary",
};

export default function Portfolio() {
  useDocumentTitle("portfolio");
  return (
    <div className="container-site py-16">
      <p className="text-sm font-medium text-ink-secondary">作品集</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">产品项目</h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-secondary">
        记录两个代表性项目的完整思考过程：问题定义、信息架构、产品取舍与当前状态。
      </p>

      <div className="mt-10 divide-y divide-canvas-border border-y border-canvas-border">
        {projects.map((p) => (
          <article key={p.slug} className="grid gap-8 py-10 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <div className="flex items-center gap-2.5">
                {p.slug === "glimmer" && (
                  <span className="breath-dot shrink-0" style={{ width: 12, height: 12 }} aria-hidden="true" />
                )}
                <h2 className="text-2xl font-bold text-ink">{p.name}</h2>
              </div>
              <p className="mt-2 text-sm text-ink-secondary">{p.type}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                <span className={`font-medium ${phaseLabelStyle[p.phase]}`}>
                  ● {p.status}
                </span>
                {p.redacted && (
                  <span className="rounded border border-canvas-border px-2 py-0.5 text-ink-secondary">
                    脱敏案例
                  </span>
                )}
              </div>
            </div>

            <div>
              <p className="text-lg leading-relaxed text-ink">{p.tagline}</p>
              <dl className="mt-5 grid gap-4 border-t border-canvas-border pt-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-ink-tertiary">当前状态</dt>
                  <dd className="mt-1 text-sm text-ink">{p.status}</dd>
                </div>
                <div>
                  <dt className="text-xs text-ink-tertiary">我的职责</dt>
                  <dd className="mt-1 text-sm text-ink">{p.role}</dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={p.casePath} className="btn-primary">
                  查看完整案例
                </Link>
                {p.demoPath && (
                  <Link to={p.demoPath} className="btn-secondary">
                    体验 Web App
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 text-sm text-ink-tertiary">
        仅收录已上线或正在实际推进的项目，不放占位卡片。
      </p>
    </div>
  );
}
