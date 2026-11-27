import { Link } from "react-router-dom";
import type { ProjectSummary } from "@/config/projects";
import { ProjectPreview } from "./ProjectPreview";

export function ProjectCard({ project, heading: Heading }: { project: ProjectSummary; heading: "h2" | "h3" }) {
  return (
    <article className="project-card" data-reveal>
      {project.preview && <ProjectPreview kind={project.preview} />}
      <div className="project-card-body">
        <p className="project-card-meta">{project.type}</p>
        <Heading className="project-card-title">
          <Link to={project.casePath}>{project.name}</Link>
        </Heading>
        <p className="project-card-description">{project.tagline}</p>
        <p className="project-card-role">{project.role}</p>
        <div className="project-card-bottom">
          <span className={`project-state project-state--${project.phase}`}>
            {project.status}{project.redacted && " · 脱敏案例"}
          </span>
          <div className="project-card-links">
            {project.demoPath && <Link to={project.demoPath} className="site-text-link">体验 Demo</Link>}
            <Link to={project.casePath} className="site-text-link">
              阅读案例<span className="sr-only"> · {project.name}</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
