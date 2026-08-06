import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { NowTab } from "./tabs/NowTab";
import { EchoTab } from "./tabs/EchoTab";
import { MeTab } from "./tabs/MeTab";

type Tab = "now" | "echo" | "me";

const tabs: { key: Tab; label: string }[] = [
  { key: "now", label: "此刻" },
  { key: "echo", label: "回响" },
  { key: "me", label: "本我" },
];

export function GlimmerShell() {
  useDocumentTitle("glimmer");
  const [tab, setTab] = useState<Tab>("now");

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      {/* 低调顶栏：返回作品集 / 查看项目说明 */}
      <header className="safe-top border-b border-canvas-border bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-12 w-full max-w-app items-center justify-between px-4">
          <Link to="/portfolio" className="text-xs text-ink-tertiary hover:text-brand-primary">
            ← 返回作品集
          </Link>
          <div className="flex items-center gap-2">
            <span className="breath-dot" style={{ width: 10, height: 10 }} aria-hidden="true" />
            <span className="text-sm font-semibold text-ink">微光 Glimmer</span>
          </div>
          <Link to="/portfolio/glimmer" className="text-xs text-ink-tertiary hover:text-brand-primary">
            项目说明
          </Link>
        </div>
      </header>

      {/* 受控宽度 App 区域（桌面端不拉伸到全屏） */}
      <main className="mx-auto w-full max-w-app flex-1 px-4 pb-28 pt-4">
        {tab === "now" && <NowTab onJumpEcho={() => setTab("echo")} />}
        {tab === "echo" && <EchoTab />}
        {tab === "me" && <MeTab />}
      </main>

      {/* 底部导航 */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-canvas-border bg-white/95 backdrop-blur safe-bottom"
        aria-label="Glimmer 主导航"
      >
        <div className="mx-auto flex w-full max-w-app items-stretch">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs transition ${
                tab === t.key ? "text-brand-primary" : "text-ink-tertiary"
              }`}
              aria-current={tab === t.key ? "page" : undefined}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition ${
                  tab === t.key ? "bg-brand-primary" : "bg-transparent"
                }`}
                aria-hidden="true"
              />
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      <DemoNotice />
    </div>
  );
}

/** 低调演示说明。 */
function DemoNotice({ children }: { children?: ReactNode }) {
  return (
    <p className="mx-auto w-full max-w-app px-4 pb-3 text-center text-[11px] text-ink-tertiary">
      {children ??
        "这是微光 Glimmer 的交互式产品演示版本，部分数据及 AI 结果为演示内容。"}
    </p>
  );
}
