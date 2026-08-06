import { useMemo, useState } from "react";
import { useGlimmerStore } from "@/glimmer/GlimmerStoreContext";
import { moodByKey } from "@/config/moods";
import type { CheckIn } from "@/types";

const weekdayLabels = ["日", "一", "二", "三", "四", "五", "六"];
const modeLabel: Record<CheckIn["contentMode"], string> = {
  explore: "探索",
  balanced: "平衡",
  stabilize: "稳定化",
  crisis: "危机熔断",
};

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function EchoTab() {
  const { store } = useGlimmerStore();
  const today = new Date();
  const [cursor, setCursor] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const checkIns = store.checkIns;

  const monthCheckIns = useMemo(
    () => checkIns.filter((c) => {
      const d = new Date(c.createdAt);
      return d.getFullYear() === cursor.year && d.getMonth() === cursor.month;
    }),
    [checkIns, cursor]
  );

  // 当月记录天数 / 主要情绪
  const summary = useMemo(() => {
    const days = new Set(monthCheckIns.map((c) => new Date(c.createdAt).toDateString()));
    const moodCount: Record<string, number> = {};
    monthCheckIns.forEach((c) => {
      moodCount[c.mood] = (moodCount[c.mood] ?? 0) + 1;
    });
    const topMood = Object.entries(moodCount).sort((a, b) => b[1] - a[1])[0]?.[0];
    return {
      recordDays: days.size,
      topMood: topMood ? moodByKey[topMood as keyof typeof moodByKey] : null,
      total: monthCheckIns.length,
    };
  }, [monthCheckIns]);

  // 构建日历
  const firstDay = new Date(cursor.year, cursor.month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(cursor.year, cursor.month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(cursor.year, cursor.month, d));

  const cellMood = (date: Date): CheckIn | null => {
    const dayItems = monthCheckIns
      .filter((c) => sameDay(new Date(c.createdAt), date))
      .sort((a, b) => b.createdAt - a.createdAt);
    return dayItems[0] ?? null;
  };

  const shiftMonth = (delta: number) => {
    const m = cursor.month + delta;
    const year = cursor.year + Math.floor(m / 12);
    const month = ((m % 12) + 12) % 12;
    setCursor({ year, month });
    setSelectedDay(null);
  };

  const selectedItems = selectedDay
    ? checkIns.filter((c) => sameDay(new Date(c.createdAt), selectedDay)).sort((a, b) => a.createdAt - b.createdAt)
    : [];

  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-ink">回响 Echo</h1>
        <div className="flex items-center gap-2">
          <button type="button" className="h-8 w-8 rounded-full bg-white text-ink ring-1 ring-canvas-border" onClick={() => shiftMonth(-1)} aria-label="上个月">‹</button>
          <span className="min-w-[84px] text-center text-sm font-medium text-ink">
            {cursor.year}年{cursor.month + 1}月
          </span>
          <button type="button" className="h-8 w-8 rounded-full bg-white text-ink ring-1 ring-canvas-border" onClick={() => shiftMonth(1)} aria-label="下个月">›</button>
        </div>
      </div>

      {/* 热力图 */}
      <div className="rounded-2xl bg-white p-4 ring-1 ring-canvas-border">
        <div className="mb-2 grid grid-cols-7 text-center text-[11px] text-ink-tertiary">
          {weekdayLabels.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {cells.map((date, i) => {
            if (!date) return <span key={`e${i}`} />;
            const ci = cellMood(date);
            const isToday = sameDay(date, today);
            const isSel = selectedDay && sameDay(date, selectedDay);
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedDay(date)}
                className={`aspect-square rounded-lg text-[11px] transition ${
                  isSel ? "ring-2 ring-brand-primary" : ""
                } ${ci ? "text-white" : "bg-canvas-soft text-ink-tertiary"}`}
                style={ci ? { background: moodByKey[ci.mood].color } : undefined}
                aria-label={`${date.getMonth() + 1}月${date.getDate()}日${ci ? "有记录" : "无记录"}`}
              >
                <span className={ci ? "drop-shadow" : ""}>{date.getDate()}</span>
                {isToday && <span className="ml-0.5 inline-block h-1 w-1 rounded-full bg-brand-primary align-middle" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 趋势总结 */}
      <div className="rounded-2xl bg-canvas-soft p-4 text-sm leading-relaxed text-ink-secondary ring-1 ring-canvas-border">
        {summary.total === 0 ? (
          <p>本月暂无记录。去“此刻”做一次情绪签到吧。</p>
        ) : (
          <p>
            本月共 <span className="font-semibold text-ink">{summary.total}</span> 次签到，覆盖{" "}
            <span className="font-semibold text-ink">{summary.recordDays}</span> 天
            {summary.topMood && (
              <>
                ，出现最多的情绪是{" "}
                <span className="font-semibold" style={{ color: summary.topMood.color }}>
                  {summary.topMood.emoji} {summary.topMood.zh}
                </span>
                。回响帮你看见长期模式，但不替你下结论。
              </>
            )}
          </p>
        )}
      </div>

      {/* 选中日期详情 */}
      {selectedDay && (
        <div className="rounded-2xl bg-white p-4 ring-1 ring-canvas-border">
          <p className="text-sm font-semibold text-ink">
            {selectedDay.getMonth() + 1}月{selectedDay.getDate()}日
          </p>
          {selectedItems.length === 0 ? (
            <p className="mt-2 text-sm text-ink-tertiary">这一天没有记录。</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {selectedItems.map((c) => {
                const m = moodByKey[c.mood];
                return (
                  <li key={c.id} className="flex gap-3">
                    <span className="mt-0.5 text-lg" aria-hidden="true">{m.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-ink">{m.zh}</span>
                        <span className="text-xs text-ink-tertiary">强度 {c.intensity}</span>
                        <span className="text-xs text-ink-tertiary">
                          {new Date(c.createdAt).getHours().toString().padStart(2, "0")}:
                          {new Date(c.createdAt).getMinutes().toString().padStart(2, "0")}
                        </span>
                      </div>
                      {c.triggers.length > 0 && (
                        <p className="mt-0.5 text-xs text-ink-secondary">诱因：{c.triggers.join("、")}</p>
                      )}
                      {c.note && <p className="mt-0.5 text-xs text-ink-secondary">“{c.note}”</p>}
                      <p className="mt-0.5 text-xs" style={{ color: m.color }}>
                        洞察：{c.insightTitle} · {modeLabel[c.contentMode]}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
