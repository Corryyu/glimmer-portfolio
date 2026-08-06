/** DailyWhisper 每日低语——来自原 iOS 项目的 DailyWhisperService。
 *  每日一句心理学金句，Now 页顶部展示。按日期轮换，不依赖网络。 */

const whispers = [
  { text: "情绪不是需要被解决的问题，而是需要被听见的信息。", source: "ACT 接纳承诺疗法" },
  { text: "你不需要等到感觉好了才开始行动；行动本身就会改变感觉。", source: "行为激活" },
  { text: "边界不是墙，而是你告诉世界‘这里开始是我’的方式。", source: "关系心理学" },
  { text: "麻木不是冷漠，它更像是系统在帮你省电。", source: "神经生物学" },
  { text: "愤怒通常在守卫一条被越过的线——先看看那条线是什么。", source: "IFS 内在家庭系统" },
  { text: "你对自己说的话，比你以为的更重要。", source: "CBT 认知行为" },
  { text: "恢复不是回到之前的样子，而是在新的状态下找到平衡。", source: "创伤知情" },
  { text: "允许自己‘只是及格’，本身就需要勇气。", source: "自我同情" },
  { text: "不确定性不是危险，它只是还没变成答案。", source: "容忍不确定性" },
  { text: "身体往往比思维更早知道答案。", source: "躯体化觉察" },
  { text: "你不需要说服自己‘其实没那么糟’。感觉是真实的，但它不是判决。", source: "ACT" },
  { text: "小的选择比大的决心更可靠。", source: "微习惯" },
  { text: "休息不是奖励，而是维持运转的基础条件。", source: "能量管理" },
  { text: "你无法选择情绪来不来，但可以选择怎么回应它。", source: "正念" },
];

/** 按日期返回今日低语（基于天数取模，同一天稳定）。 */
export function getDailyWhisper(date: Date = new Date()) {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return whispers[dayOfYear % whispers.length]!;
}
