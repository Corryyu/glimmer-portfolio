import { useState, useMemo } from "react";
import { useGlimmerStore } from "@/glimmer/GlimmerStoreContext";
import type { ProfileDimension, MoodKey } from "@/types";

const dimMeta: Record<ProfileDimension, { name: string; enName: string; desc: string; color: string }> = {
  nature: { name: "天性", enName: "Nature", desc: "你倾向的价值、需求与适合的条件", color: "#34D399" },
  shadow: { name: "阴影", enName: "Shadow", desc: "压力下的信号与反复出现的模式", color: "#A78BFA" },
  resources: { name: "资源", enName: "Resources", desc: "帮助你恢复的行动与支持偏好", color: "#FBBF24" },
};

const dims: ProfileDimension[] = ["nature", "shadow", "resources"];

/** 滋养性情绪 vs 消耗性情绪（与原 iOS isPositiveMood 一致）。 */
const nourishingMoods: MoodKey[] = ["joy", "peace"];

export function MeTab() {
  const { store, acceptSuggestion, rejectSuggestion, resetDemo } = useGlimmerStore();
  const [confirmReset, setConfirmReset] = useState(false);

  const pending = store.suggestions.filter((s) => s.status === "pending");

  // 诱因排行：滋养 vs 消耗
  const triggerStats = useMemo(() => {
    const nourishing: Record<string, number> = {};
    const draining: Record<string, number> = {};
    store.checkIns.forEach((c) => {
      const isNourishing = nourishingMoods.includes(c.mood);
      const target = isNourishing ? nourishing : draining;
      c.triggers.forEach((t) => {
        target[t] = (target[t] ?? 0) + 1;
      });
    });
    const sortDesc = (obj: Record<string, number>) =>
      Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, 5);
    return {
      nourishing: sortDesc(nourishing),
      draining: sortDesc(draining),
    };
  }, [store.checkIns]);

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
                  <div className="flex items-center justify-between">
                    <span className="rounded-full px-2 py-0.5 text-[11px] text-white" style={{ background: meta.color }}>
                      {meta.name} {meta.enName}
                    </span>
                    <span className="text-[11px] text-ink-tertiary">来源：AI 建议</span>
                  </div>
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

      {/* 诱因排行：滋养 vs 消耗 */}
      {store.checkIns.length > 0 && (
        <div className="rounded-2xl bg-white p-5 ring-1 ring-canvas-border">
          <h2 className="text-base font-semibold text-ink">诱因景观</h2>
          <p className="mt-1 text-xs text-ink-tertiary">基于签到记录，滋养性与消耗性诱因的频率对比。</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold text-emerald-700">🌱 滋养性诱因</p>
              {triggerStats.nourishing.length === 0 ? (
                <p className="mt-2 text-xs text-ink-tertiary">暂无数据</p>
              ) : (
                <ul className="mt-2 space-y-1.5">
                  {triggerStats.nourishing.map(([name, count]) => (
                    <li key={name} className="flex items-center gap-2">
                      <span className="text-sm text-ink">{name}</span>
                      <span className="flex-1 rounded-full bg-canvas-soft">
                        <span className="block h-1.5 rounded-full bg-emerald-400" style={{ width: `${Math.min(100, count * 20)}%` }} />
                      </span>
                      <span className="text-xs text-ink-tertiary">{count}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <p className="text-xs font-semibold text-violet-700">⚡ 消耗性诱因</p>
              {triggerStats.draining.length === 0 ? (
                <p className="mt-2 text-xs text-ink-tertiary">暂无数据</p>
              ) : (
                <ul className="mt-2 space-y-1.5">
                  {triggerStats.draining.map(([name, count]) => (
                    <li key={name} className="flex items-center gap-2">
                      <span className="text-sm text-ink">{name}</span>
                      <span className="flex-1 rounded-full bg-canvas-soft">
                        <span className="block h-1.5 rounded-full bg-violet-400" style={{ width: `${Math.min(100, count * 20)}%` }} />
                      </span>
                      <span className="text-xs text-ink-tertiary">{count}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
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
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-ink">{p.title}</p>
                      <span className="rounded-full bg-white px-2 py-0.5 text-[10px] text-ink-tertiary ring-1 ring-canvas-border">
                        {p.id.startsWith("profile-s") ? "AI 建议 · 已确认" : "手动添加"}
                      </span>
                    </div>
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
