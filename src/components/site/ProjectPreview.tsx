import { useId, useState, type KeyboardEvent } from "react";
import type { ProjectPreviewKind } from "@/config/projects";
import { ExampleInsight, MoodOptions, type PreviewMood } from "./GlimmerPreview";

const glimmerTabs = ["情绪签到", "即时洞察", "回响"];

const rebellFlows = [
  { label: "商户入驻", steps: ["资质提交", "合规审核", "合同签署"], detail: "将资质、审核和签约放进同一条可追踪的入驻流程。" },
  { label: "营销运营", steps: ["配置活动", "发券与核销", "效果追踪"], detail: "串起商户自主发券和平台活动，让运营能回看结果。" },
  { label: "风控审计", steps: ["角色授权", "记录操作", "审计回溯"], detail: "明确商户端与后台的权限边界，保留关键操作记录。" },
];

const echoSample = [0, 1, 2, 0, 3, 2, 1, 2, 0, 1, 3, 2, 0, 2, 0, 2, 3, 1, 0, 2, 3, 1, 3, 0, 2, 1, 0, 2];

function GlimmerScene({ index, mood, onSelect }: {
  index: number;
  mood: PreviewMood;
  onSelect: (mood: PreviewMood) => void;
}) {
  if (index === 0) {
    return (
      <div className="preview-check-in">
        <p className="preview-window-title">今天感觉如何？</p>
        <MoodOptions mood={mood} onSelect={onSelect} />
      </div>
    );
  }
  if (index === 1) return <ExampleInsight mood={mood} />;
  return (
    <div className="echo-sample">
      <div>
        <p className="preview-window-title">情绪日历</p>
        <p className="preview-window-copy">按日期回看情绪与诱因。</p>
      </div>
      <div className="echo-sample-grid" aria-hidden="true">
        {echoSample.map((level, index) => <span key={index} data-level={level} />)}
      </div>
    </div>
  );
}

function RebellScene({ index }: { index: number }) {
  const flow = rebellFlows[index];
  if (!flow) return null;
  return (
    <>
      <ol className="rebell-flow">
        {flow.steps.map((step) => (
          <li key={step}>
            <span className="rebell-flow-node" aria-hidden="true" />
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <p className="preview-window-copy">{flow.detail}</p>
    </>
  );
}

export function ProjectPreview({ kind }: { kind: ProjectPreviewKind }) {
  const isGlimmer = kind === "glimmer";
  const [active, setActive] = useState(isGlimmer ? 2 : 0);
  const [mood, setMood] = useState<PreviewMood>("peace");
  const id = useId();
  const tabs = isGlimmer ? glimmerTabs : rebellFlows.map((flow) => flow.label);

  function handleTabKeys(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case "ArrowRight": next = (index + 1) % tabs.length; break;
      case "ArrowLeft": next = (index + tabs.length - 1) % tabs.length; break;
      case "Home": next = 0; break;
      case "End": next = tabs.length - 1; break;
      default: return;
    }
    event.preventDefault();
    setActive(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  }

  return (
    <div className={`project-preview project-preview--${kind}`}>
      <div className="preview-tabs" role="tablist" aria-label={isGlimmer ? "微光功能预览" : "商户平台流程预览"}>
        {tabs.map((label, index) => (
          <button
            key={label}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-panel-${index}`}
            aria-selected={index === active}
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => handleTabKeys(event, index)}
          >
            {label}
          </button>
        ))}
      </div>
      {tabs.map((label, index) => (
        <div
          key={label}
          className="preview-stage"
          role="tabpanel"
          id={`${id}-panel-${index}`}
          aria-labelledby={`${id}-tab-${index}`}
          tabIndex={0}
          hidden={index !== active}
        >
          {index === active && (
            <div className="preview-window">
              <div className="preview-window-topline">
                <span className="preview-window-brand">{isGlimmer ? "微光 Glimmer" : "Rebell 商户平台"}</span>
                <span>{isGlimmer ? "示例" : "脱敏流程示意"}</span>
              </div>
              {isGlimmer ? <GlimmerScene index={index} mood={mood} onSelect={setMood} /> : <RebellScene index={index} />}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
