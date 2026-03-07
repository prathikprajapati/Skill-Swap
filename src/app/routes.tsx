import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import { Layout } from "@/app/components/Layout";
import { ProtectedRoute } from "@/app/components/ProtectedRoute";

// Lazy load pages for better performance (code splitting)
const AuthPage = lazy(() => import("@/app/pages/AuthPage").then(m => ({ default: m.AuthPage })));
const LandingPage = lazy(() => import("@/app/pages/LandingPage").then(m => ({ default: m.LandingPage })));
const DashboardPage = lazy(() => import("@/app/pages/DashboardPage").then(m => ({ default: m.DashboardPage })));
const ProfilePage = lazy(() => import("@/app/pages/ProfilePage").then(m => ({ default: m.ProfilePage })));
const RequestsPage = lazy(() => import("@/app/pages/RequestsPage").then(m => ({ default: m.RequestsPage })));
const ChatPage = lazy(() => import("@/app/pages/ChatPage").then(m => ({ default: m.ChatPage })));
const OnboardingPage = lazy(() => import("@/app/pages/OnboardingPage").then(m => ({ default: m.OnboardingPage })));

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-4">
        <div 
          className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent"
          style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }}
        />
        <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<PageLoader />}>
        <LandingPage />
      </Suspense>
    ),
  },
  {
    path: "/auth",
    element: (
      <Suspense fallback={<PageLoader />}>
        <AuthPage />
      </Suspense>
    ),
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
        element: (
          <Suspense fallback={<PageLoader />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: "requests",
        element: (
          <Suspense fallback={<PageLoader />}>
            <RequestsPage />
          </Suspense>
        ),
      },
      {
        path: "chat",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ChatPage />
          </Suspense>
        ),
      },
      {
        path: "onboarding",
        element: (
          <Suspense fallback={<PageLoader />}>
            <OnboardingPage />
          </Suspense>
        ),
      },
    ],
  },
]);
