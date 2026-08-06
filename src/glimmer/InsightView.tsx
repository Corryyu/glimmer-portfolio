import { useState } from "react";
import { useGlimmerStore } from "@/glimmer/GlimmerStoreContext";
import type { Insight, ProfileSuggestion, MoodKey } from "@/types";
import { moodByKey } from "@/config/moods";

const modeLabel: Record<Insight["contentMode"], string> = {
  explore: "探索 · explore",
  balanced: "平衡 · balanced",
  stabilize: "稳定化 · stabilize",
  crisis: "危机熔断 · crisis",
};

const modeStyle: Record<Insight["contentMode"], string> = {
  explore: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  balanced: "bg-violet-50 text-violet-700 ring-violet-200",
  stabilize: "bg-amber-50 text-amber-700 ring-amber-200",
  crisis: "bg-rose-50 text-rose-700 ring-rose-200",
};

export function InsightView({
  insight,
  mood,
  onDone,
  onEcho,
}: {
  insight: Insight;
  mood: MoodKey;
  onDone: () => void;
  onEcho: () => void;
}) {
  const { acceptSuggestion, rejectSuggestion, hasSuggestion, store } = useGlimmerStore();
  const moodDef = moodByKey[mood];
  const [feedback, setFeedback] = useState<"helpful" | "not-helpful" | null>(null);

  const renderSuggestion = (s: ProfileSuggestion) => {
    const persisted = store.suggestions.find((x) => x.id === s.id);
    const status = persisted?.status ?? s.status;
    const dimLabel =
      s.dimension === "nature" ? "天性 Nature" : s.dimension === "shadow" ? "阴影 Shadow" : "资源 Resources";
    return (
      <div key={s.id} className="rounded-xl border border-canvas-border bg-canvas-soft p-4">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-white px-2 py-0.5 text-[11px] text-ink-secondary ring-1 ring-canvas-border">
            {dimLabel}
          </span>
          <span className="text-[11px] text-ink-tertiary">AI 画像建议</span>
        </div>
        <p className="mt-2 text-sm font-medium text-ink">{s.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-secondary">{s.description}</p>
        {s.evidence.length > 0 && (
          <p className="mt-2 text-xs text-ink-tertiary">依据：{s.evidence.join("、")}</p>
        )}
        <div className="mt-3 flex gap-2">
          {status === "accepted" ? (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700 ring-1 ring-emerald-200">已确认写入</span>
          ) : status === "rejected" ? (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 ring-1 ring-slate-200">已拒绝</span>
          ) : (
            <>
              <button type="button" className="rounded-full bg-brand-primary px-3 py-1 text-xs text-white" onClick={() => acceptSuggestion(s.id)}>
                确认写入
              </button>
              <button type="button" className="rounded-full bg-white px-3 py-1 text-xs text-ink-secondary ring-1 ring-canvas-border" onClick={() => rejectSuggestion(s.id)}>
                拒绝
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fadeUp space-y-4 pb-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-ink-tertiary">演示结果</span>
        <span className={`rounded-full px-2.5 py-0.5 text-[11px] ring-1 ${modeStyle[insight.contentMode]}`}>
          {modeLabel[insight.contentMode]}
        </span>
      </div>

      <div
        className="rounded-2xl p-5"
        style={{ background: `linear-gradient(135deg, ${moodDef.color}1a, ${moodDef.secondaryColor}0a)` }}
      >
        <p className="text-xs" style={{ color: moodDef.color }}>{moodDef.aura}</p>
        <h2 className="mt-1 text-xl font-bold text-ink">{insight.title}</h2>
        <p className="mt-1 text-xs text-ink-tertiary">{insight.perspective}</p>
      </div>

      <div className="rounded-2xl bg-white p-5 ring-1 ring-canvas-border">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-secondary">核心洞察</p>
        <p className="mt-2 text-sm leading-relaxed text-ink">{insight.insight}</p>
      </div>

      <div className="rounded-2xl bg-white p-5 ring-1 ring-canvas-border">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-secondary">三个低阻力行动 · 选一个试试</p>
        <ul className="mt-3 space-y-3">
          {insight.actions.map((a) => (
            <li key={a.id} className="flex gap-3">
              <span className="text-lg" aria-hidden="true">{a.emoji ?? "•"}</span>
              <div>
                <p className="text-sm font-medium text-ink">{a.title}</p>
                <p className="text-sm text-ink-secondary">{a.description}</p>
                {a.estimatedMinutes && <p className="mt-0.5 text-xs text-ink-tertiary">约 {a.estimatedMinutes} 分钟</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {insight.bodyExercise && (
        <div className="rounded-2xl bg-white p-5 ring-1 ring-canvas-border">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-secondary">身体练习 · {insight.bodyExercise.title}</p>
          <ol className="mt-3 space-y-1.5 text-sm text-ink-secondary">
            {insight.bodyExercise.steps.map((s, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-ink-tertiary">{i + 1}.</span>
                {s}
              </li>
            ))}
          </ol>
        </div>
      )}

      {insight.reflectionQuestion && (
        <div className="rounded-2xl bg-canvas-soft p-5 ring-1 ring-canvas-border">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-tertiary">反思问题</p>
          <p className="mt-2 text-sm leading-relaxed text-ink">{insight.reflectionQuestion}</p>
        </div>
      )}

      {insight.profileSuggestions && insight.profileSuggestions.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-secondary">画像更新建议（需你确认）</p>
          <div className="space-y-3">
            {insight.profileSuggestions.map((s) => (hasSuggestion(s.id) ? renderSuggestion({
              ...s,
              status: store.suggestions.find((x) => x.id === s.id)?.status ?? s.status,
            }) : renderSuggestion(s)))}
          </div>
        </div>
      )}

      {insight.contentMode === "crisis" && (
        <div className="rounded-2xl bg-rose-50 p-4 text-sm leading-relaxed text-rose-800 ring-1 ring-rose-200">
          <p className="font-semibold">本演示不能替代紧急服务。</p>
          <p className="mt-1">如你正处于危机，请立即：</p>
          <ul className="mt-2 space-y-1">
            <li>· 联系现实中可信任的家人、朋友或老师</li>
            <li>· 前往最近的医院急诊或精神卫生中心</li>
            <li>· 拨打当地紧急求助电话（如中国大陆 120 / 110）</li>
            <li>· 联系当地心理援助热线（请自行搜索所在地区认证热线）</li>
          </ul>
          <p className="mt-2 text-xs text-rose-600/80">
            本 Demo 不提供具体热线号码，避免因号码变更或地区差异导致误导。请通过当地官方渠道获取最新支持信息。
          </p>
        </div>
      )}

      {/* 洞察契合度反馈 */}
      {insight.contentMode !== "crisis" && (
        <div className="rounded-2xl bg-canvas-soft p-4 ring-1 ring-canvas-border">
          <p className="text-xs text-ink-tertiary">这个洞察对你有帮助吗？</p>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              className={`rounded-full px-3 py-1 text-xs transition ${
                feedback === "helpful"
                  ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300"
                  : "bg-white text-ink-secondary ring-1 ring-canvas-border"
              }`}
              onClick={() => setFeedback("helpful")}
            >
              👍 有帮助
            </button>
            <button
              type="button"
              className={`rounded-full px-3 py-1 text-xs transition ${
                feedback === "not-helpful"
                  ? "bg-slate-200 text-slate-700 ring-1 ring-slate-300"
                  : "bg-white text-ink-secondary ring-1 ring-canvas-border"
              }`}
              onClick={() => setFeedback("not-helpful")}
            >
              👎 不太对
            </button>
          </div>
          {feedback === "helpful" && (
            <p className="mt-2 text-xs text-ink-tertiary">谢谢，这会帮助 AI 更了解你（演示中不会上传）。</p>
          )}
          {feedback === "not-helpful" && (
            <p className="mt-2 text-xs text-ink-tertiary">收到。洞察只是视角，不是结论——你有权不同意。</p>
          )}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button type="button" className="btn-primary flex-1" onClick={onDone}>完成</button>
        <button type="button" className="btn-secondary flex-1" onClick={onEcho}>查看回响</button>
      </div>
    </div>
  );
}
