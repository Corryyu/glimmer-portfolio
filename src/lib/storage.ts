import type { CheckIn, GlimmerStore, ProfileItem } from "@/types";

/** localStorage 持久化：签到、画像、建议、演示进度。刷新不丢失。 */
const STORAGE_KEY = "glimmer.demo.v1";

const emptyStore: GlimmerStore = {
  checkIns: [],
  profile: [],
  suggestions: [],
  seeded: false,
};

export function loadStore(): GlimmerStore {
  if (typeof localStorage === "undefined") return { ...emptyStore };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...emptyStore };
    const parsed = JSON.parse(raw) as Partial<GlimmerStore>;
    return {
      checkIns: parsed.checkIns ?? [],
      profile: parsed.profile ?? [],
      suggestions: parsed.suggestions ?? [],
      seeded: parsed.seeded ?? false,
    };
  } catch {
    return { ...emptyStore };
  }
}

export function saveStore(store: GlimmerStore): void {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // 容量或隐私模式下静默失败，不影响演示
  }
}

export function resetStore(): GlimmerStore {
  const fresh = { ...emptyStore, seeded: true };
  saveStore(fresh);
  return fresh;
}

/** 为回响热力图生成 20–30 天合成数据（仅用于 Demo 展示，不与真实用户关联）。 */
export function seedEchoData(): CheckIn[] {
  const moods = ["joy", "peace", "uneasy", "down", "anger", "numb"] as const;
  const titles = [
    "值得记住这一刻的形状",
    "把不确定拆成可触碰的部分",
    "愤怒在保护什么",
    "低落不等于结论",
    "先不急着弄清楚",
    "这种安顿是可以被理解的",
  ];
  const modes = ["explore", "balanced", "stabilize"] as const;
  const triggersPool = [
    ["工作压力", "deadline"],
    ["完成一件事", "小确幸"],
    ["被冒犯", "不公"],
    ["孤独", "疲惫"],
    ["独处", "专注"],
  ];
  const out: CheckIn[] = [];
  const now = new Date();
  // 生成最近 24 天中约 20 条记录
  for (let i = 24; i >= 0; i--) {
    if (Math.random() < 0.18) continue; // 留少量空白天
    const day = new Date(now);
    day.setDate(now.getDate() - i);
    day.setHours(9 + Math.floor(Math.random() * 12), Math.floor(Math.random() * 60), 0, 0);
    const moodIdx = Math.floor(Math.random() * moods.length);
    const mood = moods[moodIdx]!;
    out.push({
      id: `seed-${i}`,
      mood,
      intensity: 1 + Math.floor(Math.random() * 5),
      triggers: triggersPool[moodIdx % triggersPool.length]!,
      note: undefined,
      insightTitle: titles[moodIdx % titles.length]!,
      contentMode: modes[moodIdx % modes.length]!,
      createdAt: day.getTime(),
    });
  }
  return out;
}

/** 把一条画像建议确认后写入画像条目。 */
export function suggestionToProfile(suggestion: {
  id: string;
  dimension: ProfileItem["dimension"];
  title: string;
  description: string;
}): ProfileItem {
  return {
    id: `profile-${suggestion.id}`,
    dimension: suggestion.dimension,
    title: suggestion.title,
    description: suggestion.description,
    confirmedAt: Date.now(),
  };
}
