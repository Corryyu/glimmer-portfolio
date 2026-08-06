import { HashRouter, Routes, Route } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import Home from "@/pages/Home";
import Portfolio from "@/pages/Portfolio";
import GlimmerCase from "@/pages/GlimmerCase";
import RebellCase from "@/pages/RebellCase";
import Resume from "@/pages/Resume";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/NotFound";
import { GlimmerProvider } from "@/glimmer/GlimmerStoreContext";
import { GlimmerShell } from "@/glimmer/GlimmerShell";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Glimmer Web App：独立 Shell，不展示个人网站 Header/Footer */}
        <Route
          path="/glimmer"
          element={
            <GlimmerProvider>
              <GlimmerShell />
            </GlimmerProvider>
          }
        />
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
    </HashRouter>
  );
}
