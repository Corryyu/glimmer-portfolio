import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { ProjectPreviewKind } from "@/config/projects";
import { ProjectPreview } from "./ProjectPreview";

export function CaseStudy({ title, description, facts, kind, chapters, demoPath, heroPreview, note, children }: {
  title: string;
  description: string;
  facts: string[];
  kind: ProjectPreviewKind;
  chapters: Record<string, string>;
  demoPath?: string;
  heroPreview?: ReactNode;
  note?: string;
  children: ReactNode;
}) {
  const article = useRef<HTMLElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const navigation = useRef<HTMLElement>(null);
  const [currentChapter, setCurrentChapter] = useState("");
  const chapterSelectId = useId();
  const navigate = useNavigate();

  useEffect(() => {
    const element = article.current;
    const progressBar = progress.current;
    if (!element || !progressBar) return;

    const header = document.querySelector<HTMLElement>(".site-header");
    const sections = [...element.querySelectorAll<HTMLElement>(".case-chapter")];
    const compact = window.matchMedia("(max-width: 850px)");
    let frame = 0;

    function update() {
      frame = 0;
      if (!element || !progressBar) return;
      const height = header?.offsetHeight ?? 0;
      const bounds = element.getBoundingClientRect();
      const range = Math.max(1, bounds.height - window.innerHeight + height);
      const fraction = Math.min(1, Math.max(0, (height - bounds.top) / range));
      progressBar.style.transform = `scaleX(${fraction})`;

      const chapterOffset = height + (compact.matches ? navigation.current?.offsetHeight ?? 0 : 0) + 34;
      let nextChapter = "";
      for (const section of sections) {
        if (section.getBoundingClientRect().top > chapterOffset) break;
        nextChapter = section.id;
      }
      if (window.scrollY > 0 && document.documentElement.scrollHeight - window.scrollY - window.innerHeight < 2) {
        nextChapter = sections[sections.length - 1]?.id ?? nextChapter;
      }
      setCurrentChapter(nextChapter);
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleUpdate);
    observer?.observe(element);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      observer?.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <article className="container-site case-study" ref={article}>
      <div className="case-progress" aria-hidden="true"><span ref={progress} /></div>
      <Link to="/portfolio" className="site-text-link case-back-link">返回作品集</Link>
      <header className="case-hero">
        <div>
          <h1>{title}</h1>
          <p className="case-lead">{description}</p>
          <ul className="case-facts">{facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
          {demoPath && <Link to={demoPath} className="site-button site-button--primary">体验完整 Demo</Link>}
        </div>
        {heroPreview ?? <ProjectPreview kind={kind} />}
      </header>
      {note && <p className="case-note">{note}</p>}

      <div className="case-body">
        <nav className="case-nav" ref={navigation} aria-label="案例目录">
          <p>案例目录</p>
          <div className="case-nav-links">
            {Object.entries(chapters).map(([id, label]) => (
              <Link key={id} to={{ hash: `#${id}` }} aria-current={id === currentChapter ? "location" : undefined}>
                {label}
              </Link>
            ))}
          </div>
          <div className="case-nav-select">
            <label htmlFor={chapterSelectId}>案例目录</label>
            <div>
              <select id={chapterSelectId} value={currentChapter} onChange={(event) => navigate({ hash: `#${event.target.value}` })}>
                <option value="" disabled>选择章节</option>
                {Object.entries(chapters).map(([id, label]) => <option value={id} key={id}>{label}</option>)}
              </select>
            </div>
          </div>
        </nav>
        <div className="case-content">{children}</div>
      </div>
    </article>
  );
}

export function CaseChapter({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section className="case-chapter" id={id} tabIndex={-1} aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`}>{title}</h2>
      {children}
    </section>
  );
}

export function DecisionList({ decisions }: {
  decisions: readonly { question: string; choice: string; reason: string; tradeoff: string }[];
}) {
  return (
    <div className="case-decisions">
      {decisions.map((decision, index) => (
        <details className="site-disclosure" key={decision.question} open={index === 0}>
          <summary>
            <span>{decision.question}</span>
            <span className="disclosure-mark" aria-hidden="true" />
          </summary>
          <dl className="decision-detail">
            <div><dt>选择</dt><dd>{decision.choice}</dd></div>
            <div><dt>原因</dt><dd>{decision.reason}</dd></div>
            <div><dt>代价或限制</dt><dd>{decision.tradeoff}</dd></div>
          </dl>
        </details>
      ))}
    </div>
  );
}
