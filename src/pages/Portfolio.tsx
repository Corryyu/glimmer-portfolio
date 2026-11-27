import { ProjectCard } from "@/components/site/ProjectCard";
import { projects } from "@/config/projects";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export default function Portfolio() {
  useDocumentTitle("portfolio");

  return (
    <div className="container-site portfolio-page">
      <div className="portfolio-intro">
        <h1>作品集</h1>
        <p>从 AI 情绪自助到海外商户平台。可以先点看项目的关键流程，再读完整复盘。</p>
      </div>

      <div className="project-grid">
        {projects.map((project) => <ProjectCard key={project.slug} project={project} heading="h2" />)}
      </div>
    </div>
  );
}
