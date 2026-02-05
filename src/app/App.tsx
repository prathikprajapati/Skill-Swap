import { RouterProvider } from "react-router";
import { router } from "@/app/routes";
import { ThemeProvider } from "@/app/contexts/ThemeContext";
import { ToastProvider } from "@/app/components/ui/Toast";

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </ThemeProvider>
  );
}