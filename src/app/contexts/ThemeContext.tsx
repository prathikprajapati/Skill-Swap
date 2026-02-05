import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeType = "warm-light" | "cool-light" | "dark";

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes = {
  "warm-light": {
    name: "Warm Light",
    description: "Calm, friendly, human — perfect for long reading sessions",
    emoji: "🌤",
    colors: {
      "--background": "#FFF7ED",
      "--foreground": "#1F2933",
      "--section-bg": "#FFF0E0",
      "--card": "#FFFFFF",
      "--card-foreground": "#1F2933",
      "--border": "#E5E7EB",
      "--primary": "#F97316",
      "--primary-dark": "#EA580C",
      "--primary-light": "#FFEDD5",
      "--primary-foreground": "#FFFFFF",
      "--accent": "#FB923C",
      "--accent-light": "#FED7AA",
      "--accent-indigo": "#F97316",
      "--accent-indigo-dark": "#EA580C",
      "--text-primary": "#1F2933",
      "--text-secondary": "#4B5563",
      "--text-disabled": "#9CA3AF",
      "--success": "#22C55E",
      "--warning": "#F59E0B",
      "--destructive": "#EF4444",
      "--secondary": "#FEF3C7",
      "--muted": "#FEF3C7",
      "--muted-foreground": "#4B5563",
    },
  },
  "cool-light": {
    name: "Cool Light",
    description: "Clean, focused, professional — modern SaaS vibes",
    emoji: "❄️",
    colors: {
      "--background": "#F8FAFC",
      "--foreground": "#0F172A",
      "--section-bg": "#F1F5F9",
      "--card": "#FFFFFF",
      "--card-foreground": "#0F172A",
      "--border": "#E2E8F0",
      "--primary": "#4F6D7A",
      "--primary-dark": "#3A505B",
      "--primary-light": "#E8F1F4",
      "--primary-foreground": "#FFFFFF",
      "--accent": "#6FB1A0",
      "--accent-light": "#E3F3EF",
      "--accent-indigo": "#6366F1",
      "--accent-indigo-dark": "#4F46E5",
      "--text-primary": "#0F172A",
      "--text-secondary": "#475569",
      "--text-disabled": "#94A3B8",
      "--success": "#22C55E",
      "--warning": "#F59E0B",
      "--destructive": "#EF4444",
      "--secondary": "#F1F5F9",
      "--muted": "#F1F5F9",
      "--muted-foreground": "#475569",
    },
  },
  "dark": {
    name: "Dark Mode",
    description: "Focus, night mode — low eye strain for power users",
    emoji: "🌙",
    colors: {
      "--background": "#0F172A",
      "--foreground": "#F8FAFC",
      "--section-bg": "#1E293B",
      "--card": "#1E293B",
      "--card-foreground": "#F8FAFC",
      "--border": "#334155",
      "--primary": "#38BDF8",
      "--primary-dark": "#0284C7",
      "--primary-light": "#1E3A8A",
      "--primary-foreground": "#0F172A",
      "--accent": "#A78BFA",
      "--accent-light": "#2E1065",
      "--accent-indigo": "#38BDF8",
      "--accent-indigo-dark": "#0284C7",
      "--text-primary": "#F8FAFC",
      "--text-secondary": "#CBD5E1",
      "--text-disabled": "#64748B",
      "--success": "#22C55E",
      "--warning": "#F59E0B",
      "--destructive": "#F87171",
      "--secondary": "#1E293B",
      "--muted": "#1E293B",
      "--muted-foreground": "#CBD5E1",
    },
  },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>(() => {
    const saved = localStorage.getItem("skill-swap-theme");
    return (saved as ThemeType) || "cool-light";
  });

  useEffect(() => {
    localStorage.setItem("skill-swap-theme", theme);
    
    // Apply theme colors to CSS variables
    const themeColors = themes[theme].colors;
    Object.entries(themeColors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [theme]);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
