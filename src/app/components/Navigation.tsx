import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  User,
  Inbox,
  MessageSquare,
  LogOut,
} from "lucide-react";

export function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: "/app", label: "Dashboard", icon: LayoutDashboard },
    { path: "/app/profile", label: "Profile", icon: User },
    { path: "/app/requests", label: "Requests", icon: Inbox },
    { path: "/app/chat", label: "Chat", icon: MessageSquare },
  ];

  return (
    <nav className="sticky top-0 bg-card border-b border-border z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 transition-transform duration-200 hover:scale-105"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
              style={{ backgroundColor: "var(--primary)" }}
            >
              <span className="text-white font-semibold text-base">SS</span>
            </div>
            <span
              className="font-semibold text-lg"
              style={{ color: "var(--text-primary)" }}
            >
              Skill Swap
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 hover:bg-[var(--section-bg)]"
                  style={{
                    color: isActive
                      ? "var(--accent-indigo)"
                      : "var(--text-secondary)",
                    fontWeight: isActive ? 600 : 400,
                    backgroundColor: isActive
                      ? "var(--section-bg)"
                      : "transparent",
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                      style={{ backgroundColor: "var(--accent-indigo)" }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Logout Button */}
            <Link
              to="/auth"
              className="ml-4 px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 hover:bg-[var(--destructive)] hover:text-white"
              style={{
                color: "var(--text-secondary)",
                borderLeft: "1px solid var(--border)",
                paddingLeft: "1rem",
                marginLeft: "1rem",
              }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
