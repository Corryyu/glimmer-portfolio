import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navLinks } from "@/config/site";
import { useTheme } from "@/lib/useTheme";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-canvas-border bg-canvas/85 backdrop-blur safe-top">
      <div className="container-site flex h-16 items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="返回首页">
          <span className="breath-dot animate-breathe" aria-hidden="true" />
          <span className="text-[15px] font-semibold tracking-tight text-ink">
            郁国瑞 <span className="text-ink-secondary">Guorui Yu</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {/* 桌面端主导航 */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="主导航">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `rounded-full px-3.5 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-brand-primary/10 text-brand-primary"
                      : "text-ink-secondary hover:text-ink hover:bg-canvas-soft"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* 主题切换按钮 */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-canvas-border bg-canvas-surface text-ink-secondary transition hover:bg-canvas-soft hover:text-ink"
            aria-label={theme === "dark" ? "切换到浅色模式" : "切换到深色模式"}
            title={theme === "dark" ? "切换到浅色模式" : "切换到深色模式"}
          >
            {theme === "dark" ? (
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* 移动端菜单按钮 */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-canvas-border bg-canvas-surface text-ink-secondary transition hover:bg-canvas-soft hover:text-ink md:hidden"
            aria-label={menuOpen ? "关闭导航菜单" : "打开导航菜单"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
          >
            {menuOpen ? (
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 移动端折叠导航面板 */}
      {menuOpen && (
        <nav
          id="mobile-nav-menu"
          className="border-t border-canvas-border bg-canvas-surface px-5 py-3 md:hidden"
          aria-label="移动导航"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-brand-primary/10 text-brand-primary"
                      : "text-ink-secondary hover:bg-canvas-soft hover:text-ink"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
