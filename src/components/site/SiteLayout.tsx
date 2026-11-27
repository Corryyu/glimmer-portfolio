import { useEffect, useLayoutEffect, useRef } from "react";
import { Link, Outlet, useLocation, useNavigationType } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import "./site.css";

export function SiteLayout() {
  const { pathname, hash, key } = useLocation();
  const navigation = useNavigationType();
  const previousPath = useRef(pathname);
  const main = useRef<HTMLElement>(null);

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
  }, [pathname]);

  return (
    <div className="site-frame flex min-h-screen flex-col">
      <Link to={{ hash: "#main-content" }} className="site-skip-link">跳至正文</Link>
      <Header />
      <main id="main-content" className="flex-1 section-anchor" ref={main} tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
