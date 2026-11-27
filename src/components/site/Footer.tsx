import { Link } from "react-router-dom";
import { site, footerLinks } from "@/config/site";

export function Footer() {
  const { contact } = site;
  return (
    <footer className="site-footer">
      <div className="container-site">
        <div className="footer-main">
          <div>
            <p className="footer-name">{site.fullName}</p>
            {contact.email && <a className="site-text-link" href={`mailto:${contact.email}`}>{contact.email}</a>}
            {contact.linkedin && <a className="site-text-link" href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
            {contact.github && <a className="site-text-link" href={contact.github} target="_blank" rel="noreferrer">GitHub</a>}
          </div>
          <nav aria-label="页脚导航">
            {footerLinks.map((link) => <Link key={link.to} to={link.to} className="site-text-link">{link.label}</Link>)}
          </nav>
        </div>
        <p className="footer-note">© {new Date().getFullYear()} {site.fullName} · 个人作品集与微光 Glimmer 产品演示，不提供医疗或心理诊断服务。</p>
      </div>
    </footer>
  );
}
