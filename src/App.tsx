import { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import Home from "@/pages/Home";

const Portfolio = lazy(() => import("@/pages/Portfolio"));
const GlimmerCase = lazy(() => import("@/pages/GlimmerCase"));
const RebellCase = lazy(() => import("@/pages/RebellCase"));
const Resume = lazy(() => import("@/pages/Resume"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const GlimmerDemo = lazy(async () => {
  const [{ GlimmerProvider }, { GlimmerShell }] = await Promise.all([
    import("@/glimmer/GlimmerStoreContext"),
    import("@/glimmer/GlimmerShell"),
  ]);
  return {
    default: function GlimmerDemoPage() {
      return (
        <GlimmerProvider>
          <GlimmerShell />
        </GlimmerProvider>
      );
    },
  };
});

function RouteFallback() {
  return (
    <div className="container-site flex min-h-[50vh] items-center justify-center py-20">
      <div className="flex items-center gap-3 text-sm text-ink-secondary">
        <span className="breath-dot animate-breathe" aria-hidden="true" />
        <span>页面加载中…</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          {/* Glimmer Web App：独立 Shell，不展示个人网站 Header/Footer */}
          <Route path="/glimmer" element={<GlimmerDemo />} />
          {/* 个人网站主站 */}
          <Route element={<SiteLayout />}>
            <Route index element={<Home />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="portfolio/glimmer" element={<GlimmerCase />} />
            <Route path="portfolio/rebell" element={<RebellCase />} />
            <Route path="resume" element={<Resume />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}
