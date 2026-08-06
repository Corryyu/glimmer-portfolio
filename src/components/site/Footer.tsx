import { Link } from "react-router-dom";
import { site, footerLinks } from "@/config/site";

export function Footer() {
  const { contact } = site;
  return (
    <footer className="mt-24 border-t border-canvas-border bg-white">
      <div className="container-site py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="breath-dot" aria-hidden="true" />
              <span className="font-semibold text-ink">{site.fullName}</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-ink-secondary">{site.tagline} · 个人作品集与产品演示</p>
            <div className="mt-4 flex flex-col gap-1.5 text-sm">
              {contact.email && (
                <a className="text-ink-secondary hover:text-brand-primary" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              )}
              {contact.linkedin && (
                <a className="text-ink-secondary hover:text-brand-primary" href={contact.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              )}
              {contact.github && (
                <a className="text-ink-secondary hover:text-brand-primary" href={contact.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              )}
            </div>
          </div>
          <div>
            <p className="eyebrow">导航</p>
            <ul className="mt-3 space-y-2 text-sm">
              {footerLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-ink-secondary hover:text-brand-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">资料</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/resume" className="text-ink-secondary hover:text-brand-primary">
                  网页简历
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-ink-secondary hover:text-brand-primary">
                  隐私与产品边界
                </Link>
              </li>
              <li>
                <Link to="/portfolio/glimmer" className="text-ink-secondary hover:text-brand-primary">
                  Glimmer 项目说明
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-canvas-border pt-6 text-xs text-ink-tertiary">
          <p>
            © {new Date().getFullYear()} {site.fullName}。微光 Glimmer 是产品唯一正式名称。本站为静态作品集与产品演示，不提供诊断或医疗服务。
          </p>
        </div>
      </div>
    </footer>
  );
}
