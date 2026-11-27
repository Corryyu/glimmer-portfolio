import { ProjectCard } from "@/components/site/ProjectCard";
import { projects } from "@/config/projects";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export default function Portfolio() {
  useDocumentTitle("portfolio");

  return (
    <div className="container-site portfolio-page">
      <div className="portfolio-intro">
        <h1>作品集</h1>
        <p>体验券商 App 的下单纠错与换机验证，再看每一步的设计取舍。也可以浏览微光 Glimmer 和海外商户平台案例。</p>
      </div>

      <div className="project-grid">
        {projects.map((project) => <ProjectCard key={project.slug} project={project} heading="h2" />)}
      </div>
    </div>
  );
}
