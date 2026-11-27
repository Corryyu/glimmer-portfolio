import { lazy } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import { brokerProjects } from "@/config/projects";
import Home from "@/pages/Home";

const Portfolio = lazy(() => import("@/pages/Portfolio"));
const GlimmerCase = lazy(() => import("@/pages/GlimmerCase"));
const RebellCase = lazy(() => import("@/pages/RebellCase"));
const BrokerCase = lazy(() => import("@/pages/BrokerCase"));
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

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path={brokerProjects["trade-order"].casePath} element={<BrokerCase kind="trade-order" />} />
          <Route path={brokerProjects["device-authorization"].casePath} element={<BrokerCase kind="device-authorization" />} />
          <Route path="portfolio/glimmer" element={<GlimmerCase />} />
          <Route path="portfolio/rebell" element={<RebellCase />} />
          <Route path="glimmer" element={<GlimmerDemo />} />
          <Route path="resume" element={<Resume />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
