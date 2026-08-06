import { Link } from "react-router-dom";
import { site } from "@/config/site";
import { resumeFiles } from "@/config/resumeFiles";
import {
  resumeSummary,
  workExperience,
  education,
  skillGroups,
} from "@/config/resume";
import { glimmerCase } from "@/config/glimmerCase";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export default function Resume() {
  useDocumentTitle("resume");
  const showDocx = resumeFiles.docx;
  const showPdf = resumeFiles.pdf;

  return (
    <div className="container-site py-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow">简历</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{site.fullName}</h1>
          <p className="mt-2 text-base text-ink-secondary">产品经理｜海外产品 · AI 应用</p>
          <p className="mt-1 text-sm text-ink-tertiary">
            {site.contact.email} ｜ 英国利兹大学 高级计算机科学硕士 ｜ 英语可作为工作语言
          </p>
        </div>
        {(showDocx || showPdf) && (
          <div className="flex flex-wrap gap-2">
            {showPdf && (
              <a href={site.resume.pdf} download className="btn-primary">
                下载 PDF
              </a>
            )}
            {showDocx && (
              <a href={site.resume.docx} download className="btn-secondary">
                下载 DOCX
              </a>
            )}
          </div>
        )}
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-ink">个人概述</h2>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink-secondary">{resumeSummary}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-ink">工作经历</h2>
        <div className="mt-5 space-y-6">
          {workExperience.map((w) => (
            <div key={w.company} className="card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-semibold text-ink">{w.company}</p>
                <span className="text-sm text-ink-tertiary">{w.period}</span>
              </div>
              <p className="text-sm text-brand-primary">{w.role}</p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-secondary">
                {w.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-secondary" aria-hidden="true" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-ink">个人项目</h2>
        <div className="mt-5 card p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-semibold text-ink">微光 Glimmer</p>
            <span className="text-sm text-ink-tertiary">{glimmerCase.overview.period}</span>
          </div>
          <p className="text-sm text-brand-primary">AI 情绪自助与自我觉察 iOS App（独立产品与开发）</p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-secondary">
            <li className="flex gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-secondary" aria-hidden="true" />
              <span>独立完成从用户问题、产品定位、信息架构、交互设计到 iOS 原生开发，围绕“情绪签到—AI 即时洞察—历史回看—心理画像”搭建 Now、Echo、Me 三大核心模块。</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-secondary" aria-hidden="true" />
              <span>基于 CBT、ACT、IFS 等心理学框架设计即时洞察、周报/月报与智能画像更新；基于 GLM、Kimi、DeepSeek 等模型开展 Prompt 迭代与输出稳定性评估，画像建议须经用户确认后生效。</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-secondary" aria-hidden="true" />
              <span>设计风险分流、freeze 状态下的创伤内容屏蔽及高风险危机熔断；采用本地优先存储、远程 AI 独立 opt-in 与 GDPR/CCPA 分区同意。</span>
            </li>
          </ul>
          <div className="mt-4 flex gap-3">
            <Link to="/portfolio/glimmer" className="text-sm font-medium text-brand-primary">查看项目案例 →</Link>
            <Link to="/glimmer" className="text-sm text-ink-secondary hover:text-brand-primary">体验 Web App</Link>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-ink">教育背景</h2>
        <div className="mt-5 space-y-4">
          {education.map((e) => (
            <div key={e.school} className="card p-5">
              <p className="font-semibold text-ink">{e.school}</p>
              <p className="text-sm text-ink-secondary">{e.degree}</p>
              <p className="text-sm text-ink-tertiary">{e.period}</p>
              {e.detail && <p className="mt-1 text-sm text-ink-tertiary">{e.detail}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-ink">核心技能</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((g) => (
            <div key={g.title} className="card p-5">
              <p className="text-sm font-semibold text-ink">{g.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{g.items.join("｜")}</p>
            </div>
          ))}
        </div>
      </section>

      {!showDocx && !showPdf && (
        <p className="mt-8 text-sm text-ink-tertiary">简历文件暂未提供，可在线查看以上内容或通过邮箱索取。</p>
      )}
    </div>
  );
}
