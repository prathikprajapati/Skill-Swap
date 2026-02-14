import { createBrowserRouter, Outlet } from "react-router";
import { Layout } from "@/app/components/Layout";
import { ProtectedRoute } from "@/app/components/ProtectedRoute";
import { AuthPage } from "@/app/pages/AuthPage";
import { LandingPage } from "@/app/pages/LandingPage";
import { DashboardPage } from "@/app/pages/DashboardPage";
import { ProfilePage } from "@/app/pages/ProfilePage";
import { RequestsPage } from "@/app/pages/RequestsPage";
import { ChatPage } from "@/app/pages/ChatPage";
import { OnboardingPage } from "@/app/pages/OnboardingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/auth",
    Component: AuthPage,
  },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: "profile",
        Component: ProfilePage,
      },
      {
        path: "requests",
        Component: RequestsPage,
      },
      {
        path: "chat",
        Component: ChatPage,
      },
      {
        path: "onboarding",
        Component: OnboardingPage,
      },
    ],
  },
]);
