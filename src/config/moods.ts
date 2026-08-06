import type { MoodDefinition, MoodKey } from "@/types";

/** 情绪定义——名称、配色、emoji 均来自原 iOS 项目（MoodType / MoodAppearance）。
 *  诱因为代表性标签（演示用），未迁移完整 100+ 标签。 */
export const moods: MoodDefinition[] = [
  {
    key: "joy",
    zh: "开心",
    en: "Joy",
    emoji: "✨",
    color: "#FBBF24",
    secondaryColor: "#FCD34D",
    aura: "明亮而温暖",
    triggers: ["被肯定", "完成一件事", "和喜欢的人在一起", "好天气", "小确幸", "进展顺利", "收到好消息", "放松时刻"],
  },
  {
    key: "peace",
    zh: "平静",
    en: "Peace",
    emoji: "🌙",
    color: "#34D399",
    secondaryColor: "#6EE7B7",
    aura: "安宁而舒展",
    triggers: ["独处", "自然", "阅读", "运动后", "专注", "无特别原因", "休息", "呼吸顺畅"],
  },
  {
    key: "uneasy",
    zh: "不安",
    en: "Uneasy",
    emoji: "⚡",
    color: "#A78BFA",
    secondaryColor: "#C4B5FD",
    aura: "躁动而不安",
    triggers: ["工作压力", " deadline", "不确定", "人际冲突", "经济压力", "未来", "等待结果", "被比较", "健康担忧"],
  },
  {
    key: "down",
    zh: "低落",
    en: "Down",
    emoji: "☁️",
    color: "#60A5FA",
    secondaryColor: "#93C5FD",
    aura: "低沉而阴郁",
    triggers: ["孤独", "失败", "失去", "疲惫", "自我怀疑", "被忽视", "天气阴沉", "回忆", "无力感"],
  },
  {
    key: "anger",
    zh: "愤怒",
    en: "Anger",
    emoji: "🔥",
    color: "#FB7185",
    secondaryColor: "#FDA4AF",
    aura: "灼热而愤怒",
    triggers: ["被冒犯", "不公", "被误解", "边界被侵犯", "计划被打乱", "谎言", "失控感", "等待", "被指责"],
  },
  {
    key: "numb",
    zh: "麻木",
    en: "Numb",
    emoji: "⬜",
    color: "#9CA3AF",
    secondaryColor: "#D1D5DB",
    aura: "麻木而混沌",
    triggers: ["没有感觉", "耗尽", "说不清", "长期压力", " dissociation", "空虚", "提不起劲", "想消失的念头"],
  },
];

export const moodByKey: Record<MoodKey, MoodDefinition> = moods.reduce(
  (acc, m) => {
    acc[m.key] = m;
    return acc;
  },
  {} as Record<MoodKey, MoodDefinition>
);
