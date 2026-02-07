import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type ThemeType = "warm-light" | "cool-light" | "dark" | "sunny-day" | "ocean-breeze" | "spring-garden" | "midnight" | "starry-night" | "cozy-dark";

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
  "sunny-day": {
    name: "Sunny Day",
    description: "Bright & cheerful — perfect for energetic mornings",
    emoji: "☀️",
    colors: {
      "--background": "#FFFBEB",
      "--foreground": "#78350F",
      "--section-bg": "#FEF3C7",
      "--card": "#FFFFFF",
      "--card-foreground": "#78350F",
      "--border": "#FDE68A",
      "--primary": "#F59E0B",
      "--primary-dark": "#D97706",
      "--primary-light": "#FEF3C7",
      "--primary-foreground": "#FFFFFF",
      "--accent": "#FBBF24",
      "--accent-light": "#FDE68A",
      "--accent-indigo": "#F59E0B",
      "--accent-indigo-dark": "#D97706",
      "--text-primary": "#78350F",
      "--text-secondary": "#92400E",
      "--text-disabled": "#B45309",
      "--success": "#22C55E",
      "--warning": "#F59E0B",
      "--destructive": "#EF4444",
      "--secondary": "#FEF3C7",
      "--muted": "#FEF3C7",
      "--muted-foreground": "#92400E",
    },
  },
  "ocean-breeze": {
    name: "Ocean Breeze",
    description: "Calm & refreshing — like a day at the beach",
    emoji: "🌊",
    colors: {
      "--background": "#F0F9FF",
      "--foreground": "#0C4A6E",
      "--section-bg": "#E0F2FE",
      "--card": "#FFFFFF",
      "--card-foreground": "#0C4A6E",
      "--border": "#BAE6FD",
      "--primary": "#0EA5E9",
      "--primary-dark": "#0284C7",
      "--primary-light": "#E0F2FE",
      "--primary-foreground": "#FFFFFF",
      "--accent": "#38BDF8",
      "--accent-light": "#BAE6FD",
      "--accent-indigo": "#0EA5E9",
      "--accent-indigo-dark": "#0284C7",
      "--text-primary": "#0C4A6E",
      "--text-secondary": "#075985",
      "--text-disabled": "#0369A1",
      "--success": "#22C55E",
      "--warning": "#F59E0B",
      "--destructive": "#EF4444",
      "--secondary": "#E0F2FE",
      "--muted": "#E0F2FE",
      "--muted-foreground": "#075985",
    },
  },
  "spring-garden": {
    name: "Spring Garden",
    description: "Fresh & vibrant — blooming with creativity",
    emoji: "🌸",
    colors: {
      "--background": "#FDF2F8",
      "--foreground": "#831843",
      "--section-bg": "#FCE7F3",
      "--card": "#FFFFFF",
      "--card-foreground": "#831843",
      "--border": "#FBCFE8",
      "--primary": "#EC4899",
      "--primary-dark": "#DB2777",
      "--primary-light": "#FCE7F3",
      "--primary-foreground": "#FFFFFF",
      "--accent": "#F472B6",
      "--accent-light": "#FBCFE8",
      "--accent-indigo": "#EC4899",
      "--accent-indigo-dark": "#DB2777",
      "--text-primary": "#831843",
      "--text-secondary": "#9D174D",
      "--text-disabled": "#BE185D",
      "--success": "#22C55E",
      "--warning": "#F59E0B",
      "--destructive": "#EF4444",
      "--secondary": "#FCE7F3",
      "--muted": "#FCE7F3",
      "--muted-foreground": "#9D174D",
    },
  },
  "midnight": {
    name: "Midnight",
    description: "Deep & focused — for late night productivity",
    emoji: "🌃",
    colors: {
      "--background": "#020617",
      "--foreground": "#E2E8F0",
      "--section-bg": "#0F172A",
      "--card": "#1E293B",
      "--card-foreground": "#E2E8F0",
      "--border": "#334155",
      "--primary": "#818CF8",
      "--primary-dark": "#6366F1",
      "--primary-light": "#1E1B4B",
      "--primary-foreground": "#FFFFFF",
      "--accent": "#A5B4FC",
      "--accent-light": "#312E81",
      "--accent-indigo": "#818CF8",
      "--accent-indigo-dark": "#6366F1",
      "--text-primary": "#E2E8F0",
      "--text-secondary": "#94A3B8",
      "--text-disabled": "#64748B",
      "--success": "#22C55E",
      "--warning": "#F59E0B",
      "--destructive": "#F87171",
      "--secondary": "#1E293B",
      "--muted": "#1E293B",
      "--muted-foreground": "#94A3B8",
    },
  },
  "starry-night": {
    name: "Starry Night",
    description: "Dreamy & cosmic — explore the universe",
    emoji: "✨",
    colors: {
      "--background": "#2E1065",
      "--foreground": "#FAE8FF",
      "--section-bg": "#4C1D95",
      "--card": "#581C87",
      "--card-foreground": "#FAE8FF",
      "--border": "#7C3AED",
      "--primary": "#C084FC",
      "--primary-dark": "#A855F7",
      "--primary-light": "#6B21A8",
      "--primary-foreground": "#FFFFFF",
      "--accent": "#D8B4FE",
      "--accent-light": "#7C3AED",
      "--accent-indigo": "#C084FC",
      "--accent-indigo-dark": "#A855F7",
      "--text-primary": "#FAE8FF",
      "--text-secondary": "#E9D5FF",
      "--text-disabled": "#D8B4FE",
      "--success": "#22C55E",
      "--warning": "#F59E0B",
      "--destructive": "#F87171",
      "--secondary": "#581C87",
      "--muted": "#581C87",
      "--muted-foreground": "#E9D5FF",
    },
  },
  "cozy-dark": {
    name: "Cozy Dark",
    description: "Warm & relaxed — your comfort zone",
    emoji: "☕",
    colors: {
      "--background": "#292524",
      "--foreground": "#FAFAF9",
      "--section-bg": "#44403C",
      "--card": "#57534E",
      "--card-foreground": "#FAFAF9",
      "--border": "#78716C",
      "--primary": "#FB923C",
      "--primary-dark": "#F97316",
      "--primary-light": "#7C2D12",
      "--primary-foreground": "#FFFFFF",
      "--accent": "#FDBA74",
      "--accent-light": "#9A3412",
      "--accent-indigo": "#FB923C",
      "--accent-indigo-dark": "#F97316",
      "--text-primary": "#FAFAF9",
      "--text-secondary": "#E7E5E4",
      "--text-disabled": "#A8A29E",
      "--success": "#22C55E",
      "--warning": "#F59E0B",
      "--destructive": "#F87171",
      "--secondary": "#57534E",
      "--muted": "#57534E",
      "--muted-foreground": "#E7E5E4",
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
