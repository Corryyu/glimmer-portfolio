import { Suspense, useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { Link, Outlet, useLocation, useNavigationType } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import "./site.css";

function RouteContent({ main }: { main: RefObject<HTMLElement> }) {
  const { pathname, hash, key } = useLocation();
  const navigation = useNavigationType();
  const previousPath = useRef(pathname);

  useLayoutEffect(() => {
    const target = hash && document.getElementById(hash.slice(1));
    if (target) {
      const smooth = previousPath.current === pathname && navigation !== "POP"
        && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: "start", behavior: smooth ? "smooth" : "instant" });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    previousPath.current = pathname;
  }, [hash, key, navigation, pathname]);

  useEffect(() => {
    if (!main.current || !("IntersectionObserver" in window)
      || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-entered", "");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12 });

    main.current.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [main, pathname]);

  return <Outlet />;
}

function RouteFallback() {
  return (
    <div className="container-site flex min-h-[50vh] items-center justify-center gap-3 py-20 text-sm text-ink-secondary" role="status">
      <span className="breath-dot animate-breathe" aria-hidden="true" />
      页面加载中…
    </div>
  );
}

export function SiteLayout() {
  const main = useRef<HTMLElement>(null);

  return (
    <div className="site-frame flex min-h-screen flex-col">
      <Link to={{ hash: "#main-content" }} className="site-skip-link">跳至正文</Link>
      <Header />
      <main id="main-content" className="flex-1 section-anchor" ref={main} tabIndex={-1}>
        <Suspense fallback={<RouteFallback />}>
          <RouteContent main={main} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
