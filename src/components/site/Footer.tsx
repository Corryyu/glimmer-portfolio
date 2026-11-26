import { Link } from "react-router-dom";
import { site, footerLinks } from "@/config/site";

export function Footer() {
  const { contact } = site;
  return (
    <footer className="mt-20 border-t border-canvas-border bg-canvas-surface">
      <div className="container-site py-10">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-sm font-semibold text-ink">{site.fullName}</p>
            <p className="mt-1.5 max-w-xs text-sm text-ink-secondary">{site.tagline}</p>
            <div className="mt-4 flex flex-col gap-1 text-sm">
              {contact.email && (
                <a className="text-ink-secondary hover:text-ink hover:underline" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              )}
              {contact.linkedin && (
                <a className="text-ink-secondary hover:text-ink hover:underline" href={contact.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              )}
              {contact.github && (
                <a className="text-ink-secondary hover:text-ink hover:underline" href={contact.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              )}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-ink-tertiary">页面</p>
            <ul className="mt-3 space-y-2 text-sm">
              {footerLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-ink-secondary hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium text-ink-tertiary">说明</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/resume" className="text-ink-secondary hover:text-ink">
                  网页简历
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-ink-secondary hover:text-ink">
                  隐私与产品边界
                </Link>
              </li>
              <li>
                <Link to="/portfolio/glimmer" className="text-ink-secondary hover:text-ink">
                  Glimmer 项目说明
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-canvas-border pt-6 text-xs text-ink-tertiary">
          <p>
            © {new Date().getFullYear()} {site.fullName} · 个人作品集与微光 Glimmer 产品演示，不提供医疗或心理诊断服务。
          </p>
        </div>
      </div>
    </footer>
  );
}
