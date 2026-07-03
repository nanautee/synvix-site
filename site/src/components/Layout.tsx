import { NavLink, Outlet } from "react-router-dom";
import CursorGlow from "./CursorGlow";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/community", label: "Community" },
  { to: "/coming-soon", label: "Coming Soon" },
  { to: "/support", label: "Support" },
];

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <CursorGlow />
      <header className="sticky top-0 z-40 bg-neutral-950/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-2">
          <NavLink to="/" className="flex items-center gap-2 shrink-0">
            <img src="/assets/logo.png" alt="Synvix" width={28} height={28} className="transition-transform hover:scale-110" style={{ objectFit: "contain" }} />
            <span className="text-white text-lg sm:text-xl tracking-wide hidden sm:inline" style={{ fontFamily: "Borney, sans-serif" }}>Synvix</span>
          </NavLink>
          <nav className="flex items-center gap-3 sm:gap-6 overflow-x-auto">
            {NAV.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? "text-white"
                      : "text-neutral-500 hover:text-neutral-300"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="py-10 text-center text-xs text-neutral-600">
        © 2026 Synvix. All rights reserved.
      </footer>
    </div>
  );
}
