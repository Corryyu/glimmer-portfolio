import { useState } from "react";
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

  function changeTab(next: Tab) {
    if (next === tab) return;
    setTab(next);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  return (
    <div className="mx-auto flex min-h-[calc(100svh_-_var(--header-offset)_-_1px)] w-full max-w-app flex-col">
      <div className="flex-1 px-4 pb-5 pt-5 sm:pt-7">
        {tab === "now" && <NowTab onJumpEcho={() => changeTab("echo")} />}
        {tab === "echo" && <EchoTab />}
        {tab === "me" && <MeTab />}
        <div className="mt-3 space-y-2 text-center">
          <p className="text-xs leading-relaxed text-ink-tertiary">
            这是微光 Glimmer 的交互式产品演示版本，部分数据及 AI 结果为演示内容。
          </p>
          <Link to="/portfolio/glimmer" className="site-text-link inline-block">
            查看项目案例
          </Link>
        </div>
      </div>

      <nav
        className="sticky bottom-0 z-30 flex items-stretch border-t border-canvas-border bg-canvas-surface safe-bottom sm:rounded-t-xl sm:border-x"
        aria-label="Glimmer Demo 内部导航"
      >
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => changeTab(key)}
            className="flex min-h-12 flex-1 items-center justify-center gap-1.5 py-2.5 text-sm text-ink-tertiary transition-colors hover:text-ink aria-[current=page]:font-semibold aria-[current=page]:text-[color:var(--site-accent)]"
            aria-current={tab === key ? "page" : undefined}
          >
            {tab === key && <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />}
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
