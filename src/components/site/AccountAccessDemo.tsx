import { useRef, useState } from "react";

type Stage = "sign-in" | "verify-device" | "signed-in" | "assets" | "authorize" | "authorized";

interface Screen {
  title: string;
  detail: string;
  action: string;
  next: Stage;
  stepIndex: 0 | 1 | 2;
}

const devices = [
  {
    label: "新设备",
    title: "你正在用一部新手机",
    detail: "通行密钥已经同步，可以开始登录。",
    afterSignIn: "verify-device",
  },
  {
    label: "原设备",
    title: "你正在用原来的手机",
    detail: "这台手机已经验证过，可以直接使用通行密钥登录。",
    afterSignIn: "signed-in",
  },
] as const;

const screens = {
  "verify-device": {
    title: "请验证这台新设备",
    detail: "通行密钥已确认你的身份。完成设备验证后即可登录。",
    action: "完成设备验证",
    next: "signed-in",
    stepIndex: 0,
  },
  "signed-in": {
    title: "已登录",
    detail: "本次登录的验证仍有效，可以直接查看资产。",
    action: "查看资产",
    next: "assets",
    stepIndex: 1,
  },
  assets: {
    title: "已进入资产页",
    detail: "你可以查看持仓和委托。开始下单时需要确认交易授权。",
    action: "尝试下单",
    next: "authorize",
    stepIndex: 1,
  },
  authorize: {
    title: "请确认交易授权",
    detail: "系统会在下单前核验交易权限。取消可返回资产页。",
    action: "确认交易授权",
    next: "authorized",
    stepIndex: 2,
  },
  authorized: {
    title: "可进入下单页",
    detail: "交易授权已通过，流程演示到此结束。",
    action: "重新体验",
    next: "sign-in",
    stepIndex: 2,
  },
} satisfies Record<Exclude<Stage, "sign-in">, Screen>;

const steps = ["登录", "查看资产", "下单"];
type Device = (typeof devices)[number];

export function AccountAccessDemo() {
  const [device, setDevice] = useState<Device>(devices[0]);
  const [stage, setStage] = useState<Stage>("sign-in");
  const primaryAction = useRef<HTMLButtonElement>(null);
  const screen: Screen = stage === "sign-in"
    ? {
        title: device.title,
        detail: device.detail,
        action: "使用通行密钥登录",
        next: device.afterSignIn,
        stepIndex: 0,
      }
    : screens[stage];

  function selectDevice(nextDevice: Device) {
    if (nextDevice === device) return;
    setDevice(nextDevice);
    setStage("sign-in");
  }

  function returnTo(nextStage: "sign-in" | "assets") {
    setStage(nextStage);
    primaryAction.current?.focus();
  }

  return (
    <section className="broker-demo broker-demo--access" aria-label="换机登录与交易授权演示">
      <div className="broker-demo-topline">
        <span className="broker-demo-name"><span className="broker-demo-icon" aria-hidden="true" />换机验证</span>
        <span className="broker-demo-tag">模拟流程</span>
      </div>

      <div className="broker-demo-surface">
        <div className="broker-access-options" role="group" aria-label="选择设备情境">
          {devices.map((option) => (
            <button type="button" key={option.label} aria-pressed={option === device} onClick={() => selectDevice(option)}>
              {option.label}
            </button>
          ))}
        </div>

        <ol className="broker-access-steps" aria-label="流程步骤">
          {steps.map((step, index) => {
            const current = index === screen.stepIndex;
            return (
              <li key={step} aria-current={current ? "step" : undefined}
                data-state={current ? "current" : index < screen.stepIndex ? "done" : "upcoming"}>
                {step}
              </li>
            );
          })}
        </ol>

        <div className="broker-access-status" role="status" aria-atomic="true">
          <div className="broker-demo-change" key={`${device.label}-${stage}`}>
            <p className="broker-access-status-title">{screen.title}</p>
            <p>{screen.detail}</p>
          </div>
        </div>

        <div className="broker-demo-actions">
          <button ref={primaryAction} type="button" className="broker-demo-primary" onClick={() => setStage(screen.next)}>
            {screen.action}
          </button>
          {stage === "authorize" && (
            <button type="button" className="broker-demo-secondary" onClick={() => returnTo("assets")}>取消</button>
          )}
          {stage !== "sign-in" && stage !== "authorized" && (
            <button type="button" className="broker-demo-secondary" onClick={() => returnTo("sign-in")}>重置</button>
          )}
        </div>
      </div>
    </section>
  );
}
