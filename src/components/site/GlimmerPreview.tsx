import { moodByKey } from "@/config/moods";

const moodExamples = {
  peace: {
    title: "留意这份安稳",
    body: "回想一下，今天哪个时刻让你觉得可以慢一点？",
  },
  joy: {
    title: "记下这个明亮的时刻",
    body: "如果只写一句话，你想记住刚才发生的哪件事？",
  },
  uneasy: {
    title: "把注意力放回眼前",
    body: "可以先把最挂心的事写成一句话，暂时只处理眼前这一步。",
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
