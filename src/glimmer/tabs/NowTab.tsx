import { useState } from "react";
import { Link } from "react-router-dom";
import { moods } from "@/config/moods";
import { generateMockInsight, insightForScenario, type CheckInInput } from "@/lib/mockInsight";
import { useGlimmerStore } from "@/glimmer/GlimmerStoreContext";
import { InsightView } from "@/glimmer/InsightView";
import type { CheckIn, Insight, MoodKey } from "@/types";

type Step = "start" | "mood" | "intensity" | "triggers" | "note" | "insight";

const intensityLabels = ["", "很轻", "较轻", "中等", "较强", "很强"];

export function NowTab({ onJumpEcho }: { onJumpEcho: () => void }) {
  const { addCheckIn } = useGlimmerStore();
  const [step, setStep] = useState<Step>("start");
  const [mood, setMood] = useState<MoodKey | null>(null);
  const [intensity, setIntensity] = useState(3);
  const [triggers, setTriggers] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [insight, setInsight] = useState<Insight | null>(null);

  const reset = () => {
    setMood(null);
    setIntensity(3);
    setTriggers([]);
    setNote("");
    setInsight(null);
    setStep("start");
  };

  const finalize = (input: CheckInInput, generated: Insight) => {
    const checkIn: CheckIn = {
      id: generated.id,
      mood: input.mood,
      intensity: input.intensity,
      triggers: input.triggers,
      note: input.note?.trim() || undefined,
      insightTitle: generated.title,
      contentMode: generated.contentMode,
      createdAt: Date.now(),
    };
    addCheckIn(checkIn);
    setInsight(generated);
    setStep("insight");
  };

  const submitCheckIn = () => {
    if (!mood) return;
    const input: CheckInInput = { mood, intensity, triggers, note };
    finalize(input, generateMockInsight(input));
  };

  const runScenario = (scenario: "freeze" | "crisis") => {
    const generated = insightForScenario(scenario);
    const input: CheckInInput =
      scenario === "freeze"
        ? { mood: "numb", intensity: 5, triggers: [], note: "" }
        : { mood: "down", intensity: 5, triggers: [], note: "想消失的念头" };
    finalize(input, generated);
  };

  // ---- 洞察结果 ----
  if (step === "insight" && insight && mood) {
    return (
      <InsightView
        insight={insight}
        mood={mood}
        onDone={reset}
        onEcho={onJumpEcho}
      />
    );
  }

  // ---- 起始入口 ----
  if (step === "start") {
    return (
      <div className="space-y-5 pb-4">
        <div className="rounded-2xl bg-gradient-to-br from-brand-primary to-brand-secondary p-6 text-white">
          <div className="flex items-center gap-2">
            <span className="breath-dot animate-breathe" aria-hidden="true" />
            <h1 className="text-lg font-semibold">微光 Glimmer</h1>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-white/90">
            基于循证心理学理念的情绪自助与自我觉察。做一次结构化情绪签到，获得 AI 即时洞察。
          </p>
          <button type="button" className="mt-5 w-full rounded-full bg-white py-3 text-sm font-semibold text-brand-primary" onClick={() => setStep("mood")}>
            开始体验
          </button>
          <p className="mt-3 text-center text-[11px] text-white/70">推荐体验路径：签到 → 洞察 → 回响 → 本我，约 3 分钟</p>
        </div>

        <div className="rounded-2xl bg-white p-5 ring-1 ring-canvas-border">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-secondary">快捷体验场景</p>
          <p className="mt-1 text-xs text-ink-tertiary">无需逐步签到，直接查看特定安全路径的洞察。</p>
          <div className="mt-3 space-y-2">
            <button type="button" className="flex w-full items-center justify-between rounded-xl bg-canvas-soft px-4 py-3 text-left ring-1 ring-canvas-border" onClick={() => runScenario("freeze")}>
              <span>
                <span className="block text-sm font-medium text-ink">麻木 + 强度 5（Freeze）</span>
                <span className="block text-xs text-ink-tertiary">体验 stabilize 稳定化路径</span>
              </span>
              <span className="text-ink-tertiary">→</span>
            </button>
            <button type="button" className="flex w-full items-center justify-between rounded-xl bg-rose-50 px-4 py-3 text-left ring-1 ring-rose-200" onClick={() => runScenario("crisis")}>
              <span>
                <span className="block text-sm font-medium text-rose-700">安全案例（Crisis）</span>
                <span className="block text-xs text-rose-600/80">体验危机熔断，无需输入真实高风险内容</span>
              </span>
              <span className="text-rose-400">→</span>
            </button>
          </div>
        </div>

        <Link to="/portfolio/glimmer" className="block rounded-2xl bg-white p-4 text-center text-sm text-ink-secondary ring-1 ring-canvas-border hover:text-brand-primary">
          查看项目案例说明 →
        </Link>
      </div>
    );
  }

  // ---- 步骤通用头部 ----
  const stepIndex = { mood: 1, intensity: 2, triggers: 3, note: 4 } as const;
  const total = 4;

  return (
    <div className="space-y-5 pb-4">
      <div className="flex items-center justify-between">
        <button type="button" className="text-xs text-ink-tertiary hover:text-ink" onClick={reset}>
          ← 取消
        </button>
        <span className="text-xs text-ink-tertiary">
          {step !== "note" ? `${stepIndex[step as keyof typeof stepIndex]} / ${total}` : `${total} / ${total}`}
        </span>
      </div>

      {/* 情绪 */}
      {step === "mood" && (
        <section className="animate-fadeUp">
          <h2 className="text-lg font-semibold text-ink">此刻你感觉？</h2>
          <p className="mt-1 text-sm text-ink-secondary">选择一个最接近的情绪。</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {moods.map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => {
                  setMood(m.key);
                  setStep("intensity");
                }}
                className="flex items-center gap-3 rounded-2xl bg-white p-4 text-left ring-1 ring-canvas-border transition hover:-translate-y-0.5"
                style={{ boxShadow: `0 8px 20px ${m.color}1a` }}
              >
                <span className="text-2xl" aria-hidden="true">{m.emoji}</span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{m.zh}</span>
                  <span className="block text-xs text-ink-tertiary">{m.aura}</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 强度（垂直温度计） */}
      {step === "intensity" && mood && (
        <section className="animate-fadeUp">
          <button type="button" className="mb-3 text-xs text-ink-tertiary hover:text-ink" onClick={() => setStep("mood")}>
            ← 返回修改情绪
          </button>
          <h2 className="text-lg font-semibold text-ink">强度有多大？</h2>
          <p className="mt-1 text-sm text-ink-secondary">在垂直温度计上选择 1–5。</p>
          <div className="mt-6 flex items-stretch justify-center gap-5">
            <div className="flex flex-col-reverse gap-2">
              {[1, 2, 3, 4, 5].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setIntensity(v)}
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold transition ${
                    intensity === v ? "bg-brand-primary text-white shadow-soft" : "bg-white text-ink ring-1 ring-canvas-border"
                  }`}
                  aria-label={`强度 ${v} ${intensityLabels[v]}`}
                >
                  {v}
                </button>
              ))}
            </div>
            <div className="flex flex-col items-center">
              <div className="thermometer-track flex w-3 flex-1 rounded-full opacity-70" aria-hidden="true" />
            </div>
            <div className="flex flex-col-reverse justify-around py-2 text-xs text-ink-secondary">
              {[1, 2, 3, 4, 5].map((v) => (
                <span key={v} className={intensity === v ? "font-semibold text-brand-primary" : ""}>{intensityLabels[v]}</span>
              ))}
            </div>
          </div>
          <button type="button" className="btn-primary mt-6 w-full" onClick={() => setStep("triggers")}>
            继续
          </button>
        </section>
      )}

      {/* 诱因 */}
      {step === "triggers" && mood && (
        <section className="animate-fadeUp">
          <button type="button" className="mb-3 text-xs text-ink-tertiary hover:text-ink" onClick={() => setStep("intensity")}>
            ← 返回修改强度
          </button>
          <h2 className="text-lg font-semibold text-ink">是什么引发的？</h2>
          <p className="mt-1 text-sm text-ink-secondary">可多选，也可以跳过。</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {moods.find((m) => m.key === mood)!.triggers.map((t) => {
              const active = triggers.includes(t);
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() =>
                    setTriggers((prev) => (active ? prev.filter((x) => x !== t) : [...prev, t]))
                  }
                  className={`rounded-full px-3.5 py-2 text-sm transition ${
                    active ? "bg-brand-primary text-white" : "bg-white text-ink-secondary ring-1 ring-canvas-border"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
          <div className="mt-6 flex gap-3">
            <button type="button" className="btn-secondary flex-1" onClick={() => setStep("note")}>
              跳过
            </button>
            <button type="button" className="btn-primary flex-1" onClick={() => setStep("note")}>
              继续
            </button>
          </div>
        </section>
      )}

      {/* 可选文字（树洞） */}
      {step === "note" && mood && (
        <section className="animate-fadeUp">
          <button type="button" className="mb-3 text-xs text-ink-tertiary hover:text-ink" onClick={() => setStep("triggers")}>
            ← 返回修改诱因
          </button>
          <h2 className="text-lg font-semibold text-ink">想说点什么吗？</h2>
          <p className="mt-1 text-sm text-ink-secondary">可选。这是情绪签到中的文字补充，不是聊天。</p>
          <textarea
            className="mt-4 h-28 w-full resize-none rounded-2xl bg-white p-4 text-sm text-ink ring-1 ring-canvas-border focus:outline-none focus:ring-2 focus:ring-brand-primary"
            placeholder="（可选）写下此刻的想法……"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={500}
          />
          <p className="mt-1 text-right text-xs text-ink-tertiary">{note.length}/500</p>
          <button type="button" className="btn-primary mt-4 w-full" onClick={submitCheckIn}>
            提交并获得洞察
          </button>
          <p className="mt-2 text-center text-[11px] text-ink-tertiary">提交后保存记录并进入洞察，避免重复提交。</p>
        </section>
      )}
    </div>
  );
}
