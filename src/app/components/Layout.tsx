import { Outlet, useNavigate } from "react-router";
import { LayoutDashboard, User, Inbox, MessageSquare } from "lucide-react";
import Dock from "@/app/components/ui/Dock";

export function Layout() {
  const navigate = useNavigate();

  const dockItems = [
    {
      icon: <LayoutDashboard size={18} />,
      label: "Dashboard",
      onClick: () => navigate("/app"),
    },
    {
      icon: <User size={18} />,
      label: "Profile",
      onClick: () => navigate("/app/profile"),
    },
    {
      icon: <Inbox size={18} />,
      label: "Requests",
      onClick: () => navigate("/app/requests"),
    },
    {
      icon: <MessageSquare size={18} />,
      label: "Chat",
      onClick: () => navigate("/app/chat"),
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)" }}
    >
      <main className="max-w-[1200px] mx-auto px-6 py-8 pb-24">
        <Outlet />
      </main>
      <Dock
        items={dockItems}
        panelHeight={59}
        baseItemSize={50}
        magnification={70}
      />
    </div>
  );
}
