import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ProjectCard } from "@/components/site/ProjectCard";
import { TradeOrderDemo } from "@/components/site/TradeOrderDemo";
import { capabilities, toolCategories } from "@/config/home";
import { brokerProjects, projects } from "@/config/projects";
import { workExperience } from "@/config/resume";
import { site } from "@/config/site";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export default function Home() {
  useDocumentTitle("home");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const copyTimeout = useRef<number>();

  useEffect(() => () => window.clearTimeout(copyTimeout.current), []);

  async function copyEmail() {
    window.clearTimeout(copyTimeout.current);
    try {
      await navigator.clipboard.writeText(site.contact.email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
    copyTimeout.current = window.setTimeout(() => setCopyStatus("idle"), 3000);
  }

  return (
    <div className="container-site home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="hero-copy">
          <p className="hero-role">{site.tagline}</p>
          <h1 id="home-title">
            {site.name}{" "}
            <span>{site.role}</span>
          </h1>
          <p className="hero-intro">{site.intro}</p>
          <div className="hero-actions">
            <Link to="/resume" className="site-button site-button--primary">查看简历</Link>
            <Link to={brokerProjects["trade-order"].casePath} className="site-button">看下单案例</Link>
          </div>
        </div>
        <TradeOrderDemo />
      </section>

      <section id="selected-work" className="home-section section-anchor" tabIndex={-1} aria-labelledby="work-title">
        <div className="section-heading">
          <h2 id="work-title">精选项目</h2>
          <Link to="/portfolio" className="site-text-link">查看全部作品</Link>
        </div>
        <div className="project-grid">
          {projects.map((project) => <ProjectCard key={project.slug} project={project} heading="h3" />)}
        </div>
      </section>

      <section id="about" className="home-section about-section section-anchor" tabIndex={-1} aria-labelledby="about-title" data-reveal>
        <div className="about-copy">
          <h2 id="about-title">关于我</h2>
          <p>{site.introExtended}</p>
          <p>做海外产品时，我用英文与跨国团队交付。做 Glimmer 时，我把长期画像留给用户确认，AI 提供观察视角和可尝试的小行动。</p>
          <dl className="about-facts">
            <div><dt>教育</dt><dd>利兹大学 · 高级计算机科学硕士（Distinction）</dd></div>
            <div><dt>语言</dt><dd>中文 · English（工作语言）</dd></div>
          </dl>
        </div>

        <div>
          <div className="section-heading experience-heading">
            <h3>工作经历</h3>
            <Link to="/resume" className="site-text-link">查看完整简历</Link>
          </div>
          <div className="experience-list">
            {workExperience.map((work, index) => (
              <details key={work.company ?? work.role} className="site-disclosure" open={index === 0}>
                <summary>
                  <span>
                    <span className="experience-company">{work.company ?? work.role}</span>
                    <span className="experience-role">{work.company ? `${work.role} · ${work.period}` : work.period}</span>
                  </span>
                  <span className="disclosure-mark" aria-hidden="true" />
                </summary>
                <p className="experience-detail">{work.bullets[0]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section" aria-labelledby="capabilities-title" data-reveal>
        <div className="section-heading"><h2 id="capabilities-title">核心能力</h2></div>
        <div className="capabilities-grid">
          {capabilities.map((capability) => (
            <div key={capability.title}>
              <h3>{capability.title}</h3>
              <p>{capability.desc}</p>
            </div>
          ))}
        </div>
        <dl className="tool-list" aria-label="工具与技术">
          {toolCategories.map((category) => (
            <div key={category.label}><dt>{category.label}</dt><dd>{category.items}</dd></div>
          ))}
        </dl>
      </section>

      {site.contact.email && (
        <section className="home-contact" aria-labelledby="contact-title" data-reveal>
          <h2 id="contact-title">联系我</h2>
          <div className="contact-actions">
            <a href={`mailto:${site.contact.email}`} className="site-text-link">{site.contact.email}</a>
            <button type="button" className="site-button" onClick={copyEmail}>
              {copyStatus === "copied" ? "已复制" : "复制邮箱"}
            </button>
            <p role="status" className={copyStatus === "failed" ? "contact-status" : "sr-only"}>
              {copyStatus === "copied" && "邮箱已复制到剪贴板"}
              {copyStatus === "failed" && "复制失败，可以直接点击邮箱。"}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
