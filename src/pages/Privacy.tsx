import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

const points = [
  "本网站用于作品展示与求职，不是商业服务，也不提供医疗或心理咨询服务。",
  "微光 Glimmer 的 Web 版本是交互式产品演示，用于展示产品流程与安全机制，不是完整 iOS 产品。",
  "网站不要求登录或注册，不创建用户账号。",
  "你在 Glimmer Demo 中产生的数据（签到、画像、建议状态）保存在你的浏览器本地（localStorage），不会上传到任何服务器。",
  "第一版使用本地 Mock AI，不调用在线模型 API，不产生费用，也不发送任何输入到模型服务。",
  "网站没有远程数据库、没有后端、没有云同步。",
  "重置演示数据或清除浏览器数据，即可删除全部 Demo 数据。",
  "AI 输出是可质疑、可撤回的观察，不提供诊断或治疗，不替代心理咨询或紧急服务。",
  "风险分流（explore / balanced / stabilize / crisis）是产品机制与交互演示，不代表医学或临床验证。",
  "crisis 模式不会展示编造的热线号码；未经核验时只提供通用现实支持说明。",
  "正式上线前，仍需进行适用地区的法律、隐私和安全审核。",
];

export default function Privacy() {
  useDocumentTitle("privacy");
  return (
    <div className="container-site py-16">
      <p className="eyebrow">隐私与产品边界</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">隐私与产品边界说明</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-secondary">
        这是面向招聘方与访客的 Demo 说明，不是正式法律文件。它说明网站用途、数据去向与微光 Glimmer 的产品边界。
      </p>

      <div className="mt-8 card p-6">
        <h2 className="text-base font-semibold text-ink">要点</h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-secondary">
          {points.map((p, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary" aria-hidden="true" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-ink">联系方式</h3>
          <p className="mt-2 text-sm text-ink-secondary">
            通过邮箱、LinkedIn 或 GitHub 联系，不开发动态表单，不收集访客输入。
          </p>
          <Link to="/about" className="mt-3 inline-block text-sm text-brand-primary">查看联系方式 →</Link>
        </div>
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-ink">关于 Mock AI</h3>
          <p className="mt-2 text-sm text-ink-secondary">
            当前所有 AI 洞察均为本地预置结果，依据情绪与强度匹配，不调用在线模型。未来实时 AI 需独立安全后端，不会在浏览器中暴露 API Key。
          </p>
          <Link to="/portfolio/glimmer" className="mt-3 inline-block text-sm text-brand-primary">查看产品案例 →</Link>
        </div>
      </div>
    </div>
  );
}
