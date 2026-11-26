import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

/** 路由切换时回到顶部（HashRouter 不支持 ScrollRestoration，手动实现）。 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/** 个人网站主框架（首页/作品集/案例/关于/简历/隐私）。Glimmer Web App 使用独立 Shell。 */
export function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:shadow-card"
      >
        跳至正文
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
