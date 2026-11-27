import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navLinks, site } from "@/config/site";
import { useTheme } from "@/lib/useTheme";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  const themeAction = theme === "dark" ? "切换到浅色模式" : "切换到深色模式";

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    function closeMenu(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButton.current?.focus();
    }
    window.addEventListener("keydown", closeMenu);
    return () => window.removeEventListener("keydown", closeMenu);
  }, [menuOpen]);

  function renderLinks() {
    return navLinks.map((link) => (
      <NavLink key={link.to} to={link.to} end={link.to === "/"} onClick={() => setMenuOpen(false)}>
        {link.label}
      </NavLink>
    ));
  }

  return (
    <header className="site-header safe-top">
      <div className="container-site site-header-row">
        <Link to="/" className="site-brand" aria-label={`${site.fullName}，返回首页`}>
          <span className="site-monogram" aria-hidden="true">GY</span>
          <span>
            <span className="site-brand-name">{site.name}</span>
            <span className="site-brand-en" lang="en">{site.nameEn}</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="主导航">{renderLinks()}</nav>

        <div className="site-header-actions">
          <button type="button" className="site-icon-button" onClick={toggleTheme} aria-label={themeAction} title={themeAction}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {theme === "dark" ? (
                <>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </>
              ) : (
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              )}
            </svg>
          </button>

          <button
            type="button"
            ref={menuButton}
            className="site-icon-button site-menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "关闭导航菜单" : "打开导航菜单"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d={menuOpen ? "M18 6 6 18M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      <nav id="mobile-nav-menu" className="container-site mobile-nav" hidden={!menuOpen} aria-label="移动导航">
        {renderLinks()}
      </nav>
    </header>
  );
}
