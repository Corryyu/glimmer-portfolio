import type { BrokerCaseKind } from "./projects";

interface BrokerCaseContent {
  title: string;
  description: string;
  scenario: string;
  decisions: { question: string; choice: string; reason: string; tradeoff: string }[];
  checks: { scenario: string; expected: string }[];
  contribution: string;
  delivery: string;
}

export const brokerCases: Record<BrokerCaseKind, BrokerCaseContent> = {
  "trade-order": {
    title: "下单数量输错，怎么当场纠正？",
    description: "某只港股每手 100 股。投资者输入 150 股后，界面要让他看懂规则，并决定实际委托多少股。",
    scenario: "港股的每手股数随标的变化。投资者可能从行情、持仓或改单入口进入同一个下单表单，也可能沿用上一只股票的交易习惯。输入数量与规则冲突时，他需要在当前页面看懂原因和下一步。",
    decisions: [
      {
        question: "什么时候告诉用户每手有多少股？",
        choice: "在数量输入处持续显示每手股数。校验失败后，在同一区域解释失败原因。",
        reason: "用户能同时看到当前输入、规则和纠正入口，少一次返回查看标的详情的操作。",
        tradeoff: "切换标的时，提示和校验都要使用当前标的的交易单位。默认值、持仓入口和改单入口也要一起核对。",
      },
      {
        question: "发现 150 股有误后，谁决定该改成多少？",
        choice: "提交校验发现数量不合规时，展示可纠正为 100 股的操作，由用户选择。",
        reason: "数量决定委托金额。把建议股数写在按钮上，用户在改变数量前就能看清会发生什么。",
        tradeoff: "不足一手和超过可买数量要有各自的提示。整手校验通过后，还要继续检查交易时段、购买力等条件。",
      },
    ],
    checks: [
      { scenario: "输入 150 股", expected: "保留输入并说明规则。点击「改为 100 股」后，显示修正值和校验结果。" },
      { scenario: "输入 50 股", expected: "提示最低一手，用户仍可自行编辑数量。" },
      { scenario: "输入 200 股", expected: "数量检查通过，用户可以继续复核委托信息。" },
    ],
    contribution: "我把每手股数、交易时段和账户购买力等规则写进下单交互、需求与验收用例，明确输入、改单和异常提示的行为。",
    delivery: "交易模块 PRD 已定稿。数量输入与纠错已进入交互原型，本站演示取提交校验这一支。",
  },
  "device-authorization": {
    title: "换了手机，哪一步该重新验证？",
    description: "通行密钥可以同步到新手机。券商 App 还要判断这台设备是否已验证，以及用户接下来要做什么。",
    scenario: "一位已开户的用户换了手机。他想先看持仓，再决定是否交易。新手机上已有通行密钥，产品需要安排新设备确认，并为资产查看和发起交易设置合适的验证时机。",
    decisions: [
      {
        question: "通行密钥已经同步，还需要确认新设备吗？",
        choice: "在新设备上，通行密钥验证之后继续完成设备确认。原设备沿用日常登录流程。",
        reason: "通行密钥验证回答是谁在登录。设备确认回答这台设备能否访问账户。",
        tradeoff: "换机增加一步，需要说明正在验证什么，并给验证未完成的用户留出继续办理的入口。",
      },
      {
        question: "查看资产和发起交易应该在哪一步验证？",
        choice: "在近期验证仍有效的场景，登录后可查看资产。尝试下单时，再进入交易授权。",
        reason: "用户可以先获取账户信息。准备发起会影响资金和持仓的操作时，再给出清楚的确认提示。",
        tradeoff: "授权取消或验证过期时，界面需要给出明确的恢复路径。",
      },
    ],
    checks: [
      { scenario: "使用原设备", expected: "使用通行密钥登录后，验证有效时可直接查看资产。" },
      { scenario: "更换新设备", expected: "凭证验证后出现设备确认，完成后才进入已登录状态。" },
      { scenario: "尝试下单", expected: "显示交易授权。取消返回资产页，完成授权后可进入下单页。" },
    ],
    contribution: "我梳理登录、资产查看与交易授权之间的关系，并把换机验证以及交易解锁的主要状态做进方案和原型。",
    delivery: "依据账户方案与原型重构。本站用最近验证有效的场景演示验证时机。",
  },
};
