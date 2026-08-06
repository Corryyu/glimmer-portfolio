// 微光 Glimmer Web App — 核心类型定义
// 与产品边界一致：AI 输出是可质疑、可撤回的观察，不诊断、不评估人格。

/** 内容模式：控制产品流程，不代表临床风险等级。 */
export type ContentMode = "explore" | "balanced" | "stabilize" | "crisis";

/** 心理画像维度。对应原 iOS 产品的三大 Inner World 分区。 */
export type ProfileDimension = "nature" | "shadow" | "resources";

/** 画像建议状态：只有用户确认后才会写入画像。 */
export type SuggestionStatus = "pending" | "accepted" | "rejected";

export interface ProfileSuggestion {
  id: string;
  dimension: ProfileDimension;
  title: string;
  description: string;
  evidence: string[];
  status: SuggestionStatus;
}

export interface InsightAction {
  id: string;
  title: string;
  description: string;
  estimatedMinutes?: number;
  /** 行动步骤 emoji，对应原 iOS 的微实验卡片图标 */
  emoji?: string;
}

export interface BodyExercise {
  title: string;
  steps: string[];
}

export interface Insight {
  id: string;
  title: string;
  perspective: string;
  insight: string;
  actions: InsightAction[];
  bodyExercise?: BodyExercise;
  reflectionQuestion?: string;
  riskLevel: number;
  contentMode: ContentMode;
  profileSuggestions?: ProfileSuggestion[];
  isMock: true;
}

/** 情绪签到记录（保存在 localStorage）。 */
export interface CheckIn {
  id: string;
  mood: MoodKey;
  intensity: number; // 1-5
  triggers: string[];
  note?: string;
  insightTitle: string;
  contentMode: ContentMode;
  createdAt: number; // epoch ms
}

export type MoodKey = "joy" | "peace" | "uneasy" | "down" | "anger" | "numb";

export interface MoodDefinition {
  key: MoodKey;
  zh: string;
  en: string;
  emoji: string;
  color: string;
  secondaryColor: string;
  aura: string;
  triggers: string[];
}

/** 已确认写入画像的条目。 */
export interface ProfileItem {
  id: string;
  dimension: ProfileDimension;
  title: string;
  description: string;
  confirmedAt: number;
}

/** 本地持久化的演示数据集合。 */
export interface GlimmerStore {
  checkIns: CheckIn[];
  profile: ProfileItem[];
  suggestions: ProfileSuggestion[];
  seeded: boolean;
}

export interface NavLink {
  label: string;
  to: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  detail?: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}
