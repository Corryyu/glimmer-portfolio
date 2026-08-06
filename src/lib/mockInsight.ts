import type {
  ContentMode,
  Insight,
  MoodKey,
  ProfileSuggestion,
} from "@/types";

/** MockInsightProvider —— 第一版完全本地 Mock，不调用在线模型，不产生费用。
 *  依据情绪、强度、诱因与文字返回结构化洞察。文案遵守产品边界：
 *  温和不软弱、直接不刻薄、不客服式共情、不诊断、不把推测写成事实、把判断权交还用户。 */

export interface CheckInInput {
  mood: MoodKey;
  intensity: number; // 1-5
  triggers: string[];
  note?: string;
}

/** 危机关键词（与原 iOS LocalInsightSafetyGate 一致的高召回规则）。 */
const crisisSignals = [
  "自杀", "自残", "伤害自己", "不想活", "想死", "去死", "活着没意义", "结束生命",
  "kill myself", "end my life", "self harm", "suicide", "want to die", "wish i were dead",
  "撑不下去", "活不下去", "想消失", "结束这一切", "控制不住自己", "怕自己做傻事",
  "better off without me",
];

const numOrDownHighIntensity = (mood: MoodKey, intensity: number) =>
  (mood === "numb" || mood === "down") && intensity >= 4;

export function detectContentMode(input: CheckInInput): ContentMode {
  const text = [input.note ?? "", ...input.triggers].join(" ").toLowerCase();
  if (crisisSignals.some((s) => text.includes(s.toLowerCase()))) {
    return "crisis";
  }
  if (numOrDownHighIntensity(input.mood, input.intensity)) {
    return "stabilize";
  }
  if (input.mood === "numb" && input.intensity >= 4) {
    return "stabilize";
  }
  if (input.mood === "joy" || input.mood === "peace") {
    return "explore";
  }
  return "balanced";
}

const baseId = () => `mock-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

/** 危机熔断洞察：停止普通深度洞察，不分析心理原因，引导现实支持。 */
function crisisInsight(): Insight {
  return {
    id: baseId(),
    title: "先停下来，你不是一个人",
    perspective: "安全优先",
    insight:
      "这里出现了一些让我需要暂停的信号。在现在的状态下，继续深入分析可能不是最稳妥的选择。比起文字，此刻更值得做的是联系现实中可以信任的人，或寻求专业支持。",
    actions: [
      {
        id: "a1",
        title: "联系一个此刻能找到的人",
        description: "家人、朋友或任何你能开口的人，哪怕只是待在同一个空间。",
        emoji: "🤝",
      },
      {
        id: "a2",
        title: "前往安全的现实环境",
        description: "离开让你不适的空间，去人多或熟悉的地方。",
        emoji: "🚶",
      },
      {
        id: "a3",
        title: "寻求专业或紧急支持",
        description: "本演示不提供热线号码；请通过当地紧急渠道或医疗机构获取帮助。",
        emoji: "🏥",
      },
    ],
    bodyExercise: {
      title: "双脚落地",
      steps: ["双脚平放在地上", "感受脚底与地面的接触", "慢慢吸气 4 秒，呼气 6 秒", "重复几次"],
    },
    riskLevel: 5,
    contentMode: "crisis",
    isMock: true,
  };
}

/** stabilize：麻木 / 高强度低落。减少深度探索，不挖掘创伤，优先身体与环境稳定化。 */
function stabilizeInsight(input: CheckInInput): Insight {
  const isNumb = input.mood === "numb";
  return {
    id: baseId(),
    title: isNumb ? "先不急着弄清楚，先回到身体" : "现在不需要想清楚",
    perspective: "稳定化优先",
    insight: isNumb
      ? "麻木本身不是问题需要被解决，它更像是系统在节能。此刻不必追问原因，也不必强迫自己有感觉。先把注意力放回身体和当下环境，等能量回来一些再谈理解。"
      : "在这么高的强度下，深入分析反而可能让你更难承受。这一刻的目标不是“想明白”，而是“先稳住”。理解可以等，稳定不能等。",
    actions: [
      {
        id: "a1",
        title: "喝一杯温水",
        description: "用一个小动作把注意力拉回身体。",
        estimatedMinutes: 2,
        emoji: "💧",
      },
      {
        id: "a2",
        title: "看看窗外或走动几步",
        description: "换一个环境刺激，哪怕只是站起来。",
        estimatedMinutes: 3,
        emoji: "🌿",
      },
      {
        id: "a3",
        title: "做一件最小的事",
        description: "不是任务清单，而是一个小到不会失败的动作，比如整理桌面。",
        estimatedMinutes: 5,
        emoji: "✋",
      },
    ],
    bodyExercise: {
      title: "5-4-3-2-1 感官锚定",
      steps: [
        "说出 5 件能看到的东西",
        "4 件能触摸到的",
        "3 件能听到的",
        "2 件能闻到的",
        "1 件能尝到的",
      ],
    },
    riskLevel: 4,
    contentMode: "stabilize",
    isMock: true,
  };
}

/** explore：开心 / 平静。允许更开放的视角与反思。 */
function exploreInsight(input: CheckInInput): Insight {
  const isJoy = input.mood === "joy";
  const suggestions: ProfileSuggestion[] = [
    {
      id: "s1",
      dimension: "nature",
      title: isJoy ? "正向体验的来源" : "让你安顿的条件",
      description: isJoy
        ? "你似乎在一些具体场景里更容易体验到开心，这可能是理解自身资源的一个入口。"
        : "你描述的平静状态背后，可能藏着一些对你重要的稳定条件。",
      evidence: input.triggers.slice(0, 2),
      status: "pending",
    },
  ];
  return {
    id: baseId(),
    title: isJoy ? "值得记住这一刻的形状" : "这种安顿是可以被理解的",
    perspective: isJoy ? "积极心理学视角" : "正念视角",
    insight: isJoy
      ? "开心常常一闪而过。比起“我应该更开心”，更值得做的是看清这一刻由什么构成——被什么触发、身体什么感觉、和谁在一起。这些细节日后会变成你的资源地图。"
      : "平静不是空白，而是一种可被识别的状态。当你能描述它发生的前提，就更有可能在需要时重新接近它。",
    actions: [
      {
        id: "a1",
        title: "记录一个具体细节",
        description: "此刻最明显的身体感觉或一个画面。",
        estimatedMinutes: 2,
        emoji: "📝",
      },
      {
        id: "a2",
        title: "做一件延续它的小事",
        description: "不是维持情绪，而是给这种状态一点空间。",
        estimatedMinutes: 5,
        emoji: "🌱",
      },
      {
        id: "a3",
        title: "告诉一个人",
        description: "如果有想分享的对象，分享本身也是一种巩固。",
        estimatedMinutes: 3,
        emoji: "💬",
      },
    ],
    bodyExercise: {
      title: "延长一次呼吸",
      steps: ["吸气时留意胸腔扩张", "在顶端停 1 秒", "呼气比吸气更长", "重复 4 次"],
    },
    reflectionQuestion: isJoy
      ? "如果这种开心有一个‘配方’，你觉得里面有哪些原料？"
      : "这种平静和你‘努力换来’的放松，是同一种吗？",
    riskLevel: 1,
    contentMode: "explore",
    profileSuggestions: suggestions,
    isMock: true,
  };
}

/** balanced：普通不安 / 低落 / 愤怒。结构化洞察 + 低阻力行动。 */
function balancedInsight(input: CheckInInput): Insight {
  if (input.mood === "anger") {
    return angerInsight(input);
  }
  if (input.mood === "uneasy") {
    return uneasyInsight(input);
  }
  return downInsight(input);
}

function angerInsight(input: CheckInInput): Insight {
  return {
    id: baseId(),
    title: "愤怒在保护什么",
    perspective: "IFS 内在系统视角",
    insight:
      "愤怒很少是无端爆发，它通常在守卫一条被越过的边界。现在不必急着判断自己‘该不该’生气，而是看看这条边界是什么——是公平、尊重、还是被看见的需求。情绪是信号，不是判决。",
    actions: [
      {
        id: "a1",
        title: "先不回应",
        description: "给愤怒一个缓冲，避免在高峰时做决定。",
        estimatedMinutes: 10,
        emoji: "⏸️",
      },
      {
        id: "a2",
        title: "把想说的写下来",
        description: "不发给任何人，只是把冲到嘴边的话外化。",
        estimatedMinutes: 5,
        emoji: "✍️",
      },
      {
        id: "a3",
        title: "区分‘事实’和‘解读’",
        description: "哪部分是确实发生的，哪部分是你赋予的意义？",
        estimatedMinutes: 5,
        emoji: "🔍",
      },
    ],
    bodyExercise: {
      title: "释放式握拳",
      steps: ["双手用力握拳 5 秒", "同时憋一口气", "一次松开手指并呼气", "重复 3 次"],
    },
    reflectionQuestion: "如果愤怒会说话，它最想保护的那件事是什么？",
    riskLevel: 2,
    contentMode: "balanced",
    profileSuggestions: [
      {
        id: "s1",
        dimension: "shadow",
        title: "反复被触碰的边界",
        description: "你似乎对某类情境有较一致的反应，这可能是值得辨认的边界模式。",
        evidence: input.triggers.slice(0, 2),
        status: "pending",
      },
    ],
    isMock: true,
  };
}

function uneasyInsight(input: CheckInInput): Insight {
  return {
    id: baseId(),
    title: "把不确定拆成可触碰的部分",
    perspective: "CBT 认知视角",
    insight:
      "不安往往来自‘不确定’被整体化——把所有未知揉成一团，感觉什么都悬而未决。把它拆开，会看到有些部分其实已有答案，有些部分此刻无法改变，真正需要处理的可能比感觉中小得多。",
    actions: [
      {
        id: "a1",
        title: "列出让你不安的具体事项",
        description: "把模糊的‘好多事’变成可数的几条。",
        estimatedMinutes: 5,
        emoji: "📋",
      },
      {
        id: "a2",
        title: "标记可控与不可控",
        description: "只对‘可控’的部分想下一步。",
        estimatedMinutes: 3,
        emoji: "🎯",
      },
      {
        id: "a3",
        title: "定一个最小的下一步",
        description: "不是解决全部，而是动一处。",
        estimatedMinutes: 5,
        emoji: "👣",
      },
    ],
    bodyExercise: {
      title: "方块呼吸",
      steps: ["吸气 4 秒", "屏息 4 秒", "呼气 4 秒", "屏息 4 秒", "重复 4 轮"],
    },
    reflectionQuestion: "此刻你担心里，有多少是‘可能发生’，又有多少是‘已经在发生’？",
    riskLevel: 2,
    contentMode: "balanced",
    profileSuggestions: [
      {
        id: "s1",
        dimension: "shadow",
        title: "不确定触发的反应模式",
        description: "面对不确定时你倾向于反复推演，这可能既是能力也是消耗。",
        evidence: input.triggers.slice(0, 2),
        status: "pending",
      },
    ],
    isMock: true,
  };
}

function downInsight(input: CheckInInput): Insight {
  return {
    id: baseId(),
    title: "低落不等于结论",
    perspective: "ACT 接纳视角",
    insight:
      "低落时大脑很容易把‘现在的感觉’当成‘事情的真实样子’。这是一种状态，不是对未来的判决。不需要立刻振作，也不需要说服自己‘其实没那么糟’。允许它存在一会儿，同时不让它替你做重要决定。",
    actions: [
      {
        id: "a1",
        title: "降低对自己的要求到‘及格’",
        description: "今天的目标可以是‘没有更糟’。",
        estimatedMinutes: 1,
        emoji: "🔽",
      },
      {
        id: "a2",
        title: "做一件不需要动脑的事",
        description: "洗碗、散步、整理——让身体先动起来。",
        estimatedMinutes: 10,
        emoji: "🧹",
      },
      {
        id: "a3",
        title: "推迟重要决定",
        description: "把会显著影响生活的决定挪到状态回升后。",
        estimatedMinutes: 1,
        emoji: "⏳",
      },
    ],
    bodyExercise: {
      title: "暖手",
      steps: ["搓热双手", "捂住眼睛", "感受温度", "重复 3 次"],
    },
    reflectionQuestion: "如果换一个状态看同一件事，你看到的会一样吗？",
    riskLevel: 2,
    contentMode: "balanced",
    profileSuggestions: [
      {
        id: "s1",
        dimension: "resources",
        title: "过去低落时帮过你的事",
        description: "回看历史，你似乎有一些自己用过的‘回血’方式，值得记录下来。",
        evidence: input.triggers.slice(0, 2),
        status: "pending",
      },
    ],
    isMock: true,
  };
}

export function generateMockInsight(input: CheckInInput): Insight {
  const mode = detectContentMode(input);
  switch (mode) {
    case "crisis":
      return crisisInsight();
    case "stabilize":
      return stabilizeInsight(input);
    case "explore":
      return exploreInsight(input);
    case "balanced":
    default:
      return balancedInsight(input);
  }
}

/** 为指定场景直接生成（用于 Demo 入口的快捷体验，如 freeze / crisis）。 */
export function insightForScenario(scenario: "freeze" | "crisis"): Insight {
  if (scenario === "freeze") {
    return stabilizeInsight({ mood: "numb", intensity: 5, triggers: [], note: "" });
  }
  return crisisInsight();
}
