import { useId, useRef, useState } from "react";

const lotSize = 100;
const exampleQuantity = "150";

type QuantityCheck =
  | { status: "format" | "minimum" | "valid" }
  | { status: "lot"; correction: number };

function checkQuantity(value: string): QuantityCheck {
  const text = value.trim();
  const shares = Number(text);
  if (!/^\d+$/.test(text) || !Number.isSafeInteger(shares) || shares <= 0) {
    return { status: "format" };
  }
  if (shares < lotSize) return { status: "minimum" };
  if (shares % lotSize !== 0) {
    return { status: "lot", correction: Math.floor(shares / lotSize) * lotSize };
  }
  return { status: "valid" };
}

const feedback = {
  idle: "可修改数量，再检查是否符合整手规则。",
  format: "请输入有效的正整数股数。",
  minimum: "当前数量不足一手。请输入至少 100 股。",
  lot: "委托数量须为 100 股的整数倍。",
  valid: "数量校验通过，可以继续核对委托信息。",
};

export function TradeOrderDemo() {
  const [quantity, setQuantity] = useState(exampleQuantity);
  const [checked, setChecked] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const ruleId = useId();
  const feedbackId = useId();
  const result = checked ? checkQuantity(quantity) : null;
  const status = result?.status ?? "idle";
  const invalid = result !== null && status !== "valid";

  return (
    <section className="broker-demo broker-demo--trade" aria-label="券商下单纠错演示">
      <div className="broker-demo-topline">
        <p className="broker-demo-name"><span className="broker-demo-icon" aria-hidden="true" />下单纠错</p>
        <span className="broker-demo-tag">模拟委托</span>
      </div>

      <form className="broker-demo-surface" onSubmit={(event) => {
        event.preventDefault();
        setChecked(true);
      }}>
        <div className="broker-trade-instrument">
          <div><p>港股示例</p><strong>海湾科技</strong></div>
          <div id={ruleId}><p>每手股数</p><strong>{lotSize} 股</strong></div>
        </div>

        <label className="broker-trade-label" htmlFor={inputId}>委托数量</label>
        <div className="broker-trade-field" data-invalid={invalid}>
          <input
            id={inputId}
            ref={input}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            spellCheck={false}
            value={quantity}
            aria-invalid={invalid}
            aria-describedby={`${ruleId} ${feedbackId}`}
            onChange={(event) => {
              setQuantity(event.target.value);
              setChecked(false);
            }}
          />
          <span aria-hidden="true">股</span>
        </div>

        <div className="broker-trade-feedback" data-tone={invalid ? "warning" : status}>
          <div id={feedbackId} role="status">
            <p className="broker-demo-change" key={status}>
              <span className="broker-trade-indicator" aria-hidden="true">{invalid ? "!" : status === "valid" ? "✓" : "i"}</span>
              {feedback[status]}
            </p>
          </div>
          {result?.status === "lot" && (
            <button className="broker-trade-correct" type="button" onClick={() => {
              setQuantity(String(result.correction));
              input.current?.focus();
            }}>改为 {result.correction} 股</button>
          )}
        </div>

        <div className="broker-demo-actions">
          <button className="broker-demo-primary" type="submit">检查数量</button>
          <button className="broker-demo-secondary" type="button" onClick={() => {
            setQuantity(exampleQuantity);
            setChecked(false);
          }}>重置</button>
        </div>
      </form>
    </section>
  );
}
