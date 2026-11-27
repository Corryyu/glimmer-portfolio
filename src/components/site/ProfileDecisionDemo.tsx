import { useState } from "react";
import type { ProfileSuggestion } from "@/types";

type DecisionStatus = ProfileSuggestion["status"];

const suggestedObservation = "独处时更平静";
const existingObservation = "散步时更放松";

const decisionText = {
  pending: { label: "待确认", feedback: "点选按钮，比较两种结果" },
  accepted: { label: "已确认写入", feedback: "画像新增了这条观察" },
  rejected: { label: "已拒绝", feedback: "画像保持原来的记录" },
} satisfies Record<DecisionStatus, { label: string; feedback: string }>;

export function ProfileDecisionDemo() {
  const [status, setStatus] = useState<DecisionStatus>("pending");
  const observations = status === "accepted"
    ? [existingObservation, suggestedObservation]
    : [existingObservation];

  return (
    <section className="profile-decision-demo" aria-label="微光 Glimmer 画像确认演示">
      <div className="profile-decision-topline">
        <span className="profile-decision-brand">
          <span className="breath-dot" aria-hidden="true" />
          微光 Glimmer
        </span>
        <span className="profile-decision-label">交互示例</span>
      </div>

      <p className="profile-decision-question">AI 的一次观察，要写进长期画像吗？</p>

      <div className="profile-decision-panels">
        <div className="profile-decision-pane">
          <div className="profile-decision-pane-title">
            <p>AI 画像建议</p>
            <span className="profile-decision-status" data-status={status}>{decisionText[status].label}</span>
          </div>
          <p className="profile-decision-observation">「{suggestedObservation}」</p>
          <p className="profile-decision-evidence">来自一次选择了「平静」和「独处」的签到</p>
        </div>

        <div className="profile-decision-pane">
          <div className="profile-decision-pane-title">
            <p>长期画像</p>
            <span className="profile-decision-label">{observations.length} 条</span>
          </div>
          <ul className="profile-decision-records" aria-label="示例画像条目">
            {observations.map((observation) => (
              <li key={observation} className={observation === suggestedObservation ? "profile-decision-record--new" : undefined}>
                {observation}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="profile-decision-controls">
        <div className="profile-decision-buttons" role="group" aria-label="比较同一条建议的处理结果">
          <button type="button" aria-pressed={status === "accepted"} onClick={() => setStatus("accepted")}>确认写入</button>
          <button type="button" aria-pressed={status === "rejected"} onClick={() => setStatus("rejected")}>拒绝</button>
        </div>
        <p className="profile-decision-feedback" role="status">{decisionText[status].feedback}</p>
      </div>
    </section>
  );
}
