import { useState } from "react";
import { useGlimmerStore } from "@/glimmer/GlimmerStoreContext";
import type { ProfileDimension } from "@/types";

const dimMeta: Record<ProfileDimension, { name: string; enName: string; desc: string; color: string }> = {
  nature: { name: "天性", enName: "Nature", desc: "你倾向的价值、需求与适合的条件", color: "#34D399" },
  shadow: { name: "阴影", enName: "Shadow", desc: "压力下的信号与反复出现的模式", color: "#A78BFA" },
  resources: { name: "资源", enName: "Resources", desc: "帮助你恢复的行动与支持偏好", color: "#FBBF24" },
};

const dims: ProfileDimension[] = ["nature", "shadow", "resources"];

export function MeTab() {
  const { store, acceptSuggestion, rejectSuggestion, resetDemo } = useGlimmerStore();
  const [confirmReset, setConfirmReset] = useState(false);

  const pending = store.suggestions.filter((s) => s.status === "pending");

  return (
    <div className="space-y-5 pb-4">
      <div>
        <h1 className="text-lg font-semibold text-ink">本我 Me</h1>
        <p className="mt-1 text-sm text-ink-secondary">
          三个维度的心理画像。AI 只提建议，确认后才写入；刷新后状态保留。
        </p>
      </div>

      {/* 待确认建议 */}
      {pending.length > 0 && (
        <div className="rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-200">
          <p className="text-sm font-semibold text-amber-800">有 {pending.length} 条画像建议待你确认</p>
          <p className="mt-1 text-xs text-amber-700/80">AI 不会自动写入画像，请查看依据后决定。</p>
          <div className="mt-3 space-y-3">
            {pending.map((s) => {
              const meta = dimMeta[s.dimension];
              return (
                <div key={s.id} className="rounded-xl bg-white p-3 ring-1 ring-canvas-border">
                  <span className="rounded-full px-2 py-0.5 text-[11px] text-white" style={{ background: meta.color }}>
                    {meta.name} {meta.enName}
                  </span>
                  <p className="mt-2 text-sm font-medium text-ink">{s.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-secondary">{s.description}</p>
                  {s.evidence.length > 0 && <p className="mt-1 text-xs text-ink-tertiary">依据：{s.evidence.join("、")}</p>}
                  <div className="mt-3 flex gap-2">
                    <button type="button" className="rounded-full bg-brand-primary px-3 py-1 text-xs text-white" onClick={() => acceptSuggestion(s.id)}>
                      确认写入
                    </button>
                    <button type="button" className="rounded-full bg-white px-3 py-1 text-xs text-ink-secondary ring-1 ring-canvas-border" onClick={() => rejectSuggestion(s.id)}>
                      拒绝
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 三维画像 */}
      {dims.map((dim) => {
        const meta = dimMeta[dim];
        const items = store.profile.filter((p) => p.dimension === dim);
        return (
          <div key={dim} className="rounded-2xl bg-white p-5 ring-1 ring-canvas-border">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: meta.color }} aria-hidden="true" />
              <h2 className="text-base font-semibold text-ink">{meta.name} <span className="text-xs font-normal text-ink-tertiary">{meta.enName}</span></h2>
            </div>
            <p className="mt-1 text-xs text-ink-tertiary">{meta.desc}</p>
            {items.length === 0 ? (
              <p className="mt-3 text-sm text-ink-tertiary">
                暂无已确认条目。做几次签到并确认 AI 建议后，这里会逐步形成你的画像。
              </p>
            ) : (
              <ul className="mt-3 space-y-2">
                {items.map((p) => (
                  <li key={p.id} className="rounded-xl bg-canvas-soft p-3">
                    <p className="text-sm font-medium text-ink">{p.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-ink-secondary">{p.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}

      {/* 重置演示数据 */}
      <div className="rounded-2xl border border-dashed border-canvas-border p-4 text-center">
        {confirmReset ? (
          <div>
            <p className="text-sm text-ink">确认重置所有演示数据（签到、画像、建议）？</p>
            <div className="mt-3 flex justify-center gap-3">
              <button type="button" className="rounded-full bg-rose-500 px-4 py-1.5 text-xs text-white" onClick={() => { resetDemo(); setConfirmReset(false); }}>
                确认重置
              </button>
              <button type="button" className="rounded-full bg-white px-4 py-1.5 text-xs text-ink-secondary ring-1 ring-canvas-border" onClick={() => setConfirmReset(false)}>
                取消
              </button>
            </div>
          </div>
        ) : (
          <button type="button" className="text-xs text-ink-tertiary hover:text-rose-500" onClick={() => setConfirmReset(true)}>
            重置演示数据
          </button>
        )}
      </div>
    </div>
  );
}
