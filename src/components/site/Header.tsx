import { Link, NavLink } from "react-router-dom";
import { navLinks } from "@/config/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-canvas-border bg-canvas/80 backdrop-blur safe-top">
      <div className="container-site flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5" aria-label="返回首页">
          <span className="breath-dot animate-breathe" aria-hidden="true" />
          <span className="text-[15px] font-semibold tracking-tight text-ink">
            郁国瑞 <span className="text-ink-secondary">Guorui Yu</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="主导航">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `rounded-full px-3.5 py-2 text-sm transition ${
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
        {/* 移动端：精简导航 */}
        <nav className="flex items-center gap-1 md:hidden" aria-label="移动导航">
          {navLinks.filter((l) => l.to !== "/").map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-full px-2.5 py-1.5 text-xs transition ${
                  isActive ? "bg-brand-primary/10 text-brand-primary" : "text-ink-secondary"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
