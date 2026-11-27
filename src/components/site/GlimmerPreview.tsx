import { useState, type CSSProperties } from "react";
import { moodByKey } from "@/config/moods";

const moodExamples = {
  peace: {
    title: "留意这份安稳",
    body: "回想一下，今天哪个时刻让你觉得可以慢一点？",
    tint: "#8885cb",
    light: "#e6e2ff",
  },
  joy: {
    title: "记下这个明亮的时刻",
    body: "如果只写一句话，你想记住刚才发生的哪件事？",
    tint: "#be8459",
    light: "#ffe2ac",
  },
  uneasy: {
    title: "把注意力放回眼前",
    body: "可以先把最挂心的事写成一句话，暂时只处理眼前这一步。",
    tint: "#996bc1",
    light: "#f2cbfc",
  },
};

export type PreviewMood = keyof typeof moodExamples;
const previewMoods = ["peace", "joy", "uneasy"] as const;

export function MoodOptions({
  mood,
  onSelect,
}: {
  mood: PreviewMood;
  onSelect: (mood: PreviewMood) => void;
}) {
  return (
    <div className="preview-moods" role="group" aria-label="选择示例情绪">
      {previewMoods.map((key) => (
        <button type="button" key={key} aria-pressed={key === mood} onClick={() => onSelect(key)}>
          <span aria-hidden="true" style={{ backgroundColor: moodByKey[key].color }} />
          {moodByKey[key].zh}
        </button>
      ))}
    </div>
  );
}

export function ExampleInsight({ mood }: { mood: PreviewMood }) {
  const { title, body } = moodExamples[mood];
  return (
    <div className="mood-insight" key={mood}>
      <p className="mood-insight-label">{moodByKey[mood].zh} · 洞察示例</p>
      <p className="mood-insight-title">{title}</p>
      <p className="mood-insight-body">{body}</p>
    </div>
  );
}

export function GlimmerFeature() {
  const [mood, setMood] = useState<PreviewMood>("peace");
  const { tint, light } = moodExamples[mood];

  return (
    <section
      className="glimmer-feature"
      aria-label="微光 Glimmer 情绪签到预览"
      style={{ "--orb-tint": tint, "--orb-light": light } as CSSProperties}
    >
      <div className="feature-topline">
        <span className="feature-brand"><span className="breath-dot" aria-hidden="true" />微光 Glimmer</span>
        <span className="feature-label">情绪签到预览</span>
      </div>
      <div className="feature-scene">
        <div className="feature-aura" aria-hidden="true">
          <span className="feature-orbit" />
          <span className="feature-orb" key={mood} />
        </div>
        <div className="feature-insight" aria-live="polite" aria-atomic="true">
          <ExampleInsight mood={mood} />
        </div>
      </div>
      <div className="feature-actions">
        <p>试着选一种情绪</p>
        <MoodOptions mood={mood} onSelect={setMood} />
      </div>
    </section>
  );
}
