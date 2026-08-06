import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export default function NotFound() {
  useDocumentTitle("notFound");
  return (
    <div className="container-site flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="breath-dot animate-breathe" aria-hidden="true" />
      <p className="mt-6 text-6xl font-bold tracking-tight text-ink">404</p>
      <p className="mt-3 text-base text-ink-secondary">你访问的页面不存在，或地址已变更。</p>
      <div className="mt-7 flex gap-3">
        <Link to="/" className="btn-primary">
          返回首页
        </Link>
        <Link to="/portfolio" className="btn-secondary">
          查看作品集
        </Link>
      </div>
    </div>
  );
}
