import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type ThemeType = "the-palette" | "sapphire-dreams" | "royal-gold" | "minimalist";

interface ThemeColors {
  [key: string]: string;
}

interface ThemeInfo {
  name: string;
  description: string;
  emoji: string;
  colors: ThemeColors;
}

// THE PALETTE - Light
const lightPaletteColors: ThemeColors = {
  "--background": "#F5F1EC",
  "--foreground": "#121418",
  "--section-bg": "#E8EDE6",
  "--card": "#FFFFFF",
  "--card-foreground": "#121418",
  "--border": "#D4E4CE",
  "--primary": "#ACC8A2",
  "--primary-dark": "#8CB79B",
  "--primary-light": "#D4E4CE",
  "--primary-foreground": "#1A2517",
  "--accent": "#1A2517",
  "--accent-light": "#E8EDE6",
  "--text-primary": "#1A2517",
  "--text-secondary": "#2F3640",
  "--text-tertiary": "rgba(0, 0, 0, 0.5)",
  "--text-disabled": "rgba(0, 0, 0, 0.3)",
  "--card-item-hover-bg": "rgba(0, 0, 0, 0.03)",
  "--success": "#ACC8A2",
  "--warning": "#8CB79B",
  "--destructive": "#EF4444",
  "--secondary": "#E8EDE6",
  "--muted": "#E8EDE6",
  "--muted-foreground": "#2F3640",
  "--popover": "#FFFFFF",
  "--popover-foreground": "#121418",
  "--secondary-foreground": "#1A2517",
  "--accent-foreground": "#F5F1EC",
  "--destructive-foreground": "#FFFFFF",
  "--input": "transparent",
  "--input-background": "#FFFFFF",
  "--switch-background": "#D4E4CE",
  "--ring": "#ACC8A2",
  "--sidebar": "#FFFFFF",
  "--sidebar-foreground": "#1A2517",
  "--sidebar-primary": "#ACC8A2",
  "--sidebar-primary-foreground": "#1A2517",
  "--sidebar-accent": "#E8EDE6",
  "--sidebar-accent-foreground": "#1A2517",
  "--sidebar-border": "#D4E4CE",
  "--sidebar-ring": "#ACC8A2",
};

// THE PALETTE - Dark
const darkPaletteColors: ThemeColors = {
  "--background": "#121418",
  "--foreground": "#F5F1EC",
  "--section-bg": "#1A1D22",
  "--card": "#1A1D22",
  "--card-foreground": "#F5F1EC",
  "--border": "#2F3640",
  "--primary": "#2F3640",
  "--primary-dark": "#1A2517",
  "--primary-light": "#3A424E",
  "--primary-foreground": "#F5F1EC",
  "--accent": "#ACC8A2",
  "--accent-light": "#1A2517",
  "--text-primary": "#F5F1EC",
  "--text-secondary": "#ACC8A2",
  "--text-tertiary": "rgba(255, 255, 255, 0.5)",
  "--text-disabled": "rgba(255, 255, 255, 0.3)",
  "--card-item-hover-bg": "rgba(255, 255, 255, 0.06)",
  "--success": "#ACC8A2",
  "--warning": "#8CB79B",
  "--destructive": "#EF4444",
  "--secondary": "#1A1D22",
  "--muted": "#1A1D22",
  "--muted-foreground": "#ACC8A2",
  "--popover": "#1A1D22",
  "--popover-foreground": "#F5F1EC",
  "--secondary-foreground": "#F5F1EC",
  "--accent-foreground": "#121418",
  "--destructive-foreground": "#FFFFFF",
  "--input": "#2F3640",
  "--input-background": "#1A1D22",
  "--switch-background": "#2F3640",
  "--ring": "#ACC8A2",
  "--sidebar": "#0D0F12",
  "--sidebar-foreground": "#F5F1EC",
  "--sidebar-primary": "#ACC8A2",
  "--sidebar-primary-foreground": "#121418",
  "--sidebar-accent": "#1A1D22",
  "--sidebar-accent-foreground": "#F5F1EC",
  "--sidebar-border": "#2F3640",
  "--sidebar-ring": "#ACC8A2",
  "--chart-1": "#ACC8A2",
  "--chart-2": "#8CB79B",
  "--chart-3": "#2F3640",
  "--chart-4": "#1A2517",
  "--chart-5": "#F5F1EC",
};

// SAPPHIRE DREAMS
const sapphireDreamsColors: ThemeColors = {
  "--background": "#0f172a",
  "--foreground": "#e2e8f0",
  "--section-bg": "#1e293b",
  "--card": "#1e293b",
  "--card-foreground": "#e2e8f0",
  "--border": "#334155",
  "--primary": "#6366f1",
  "--primary-dark": "#4f46e5",
  "--primary-light": "#818cf8",
  "--primary-foreground": "#ffffff",
  "--accent": "#8b5cf6",
  "--accent-light": "#1e1b4b",
  "--text-primary": "#f8fafc",
  "--text-secondary": "#cbd5e1",
  "--text-tertiary": "rgba(226, 232, 240, 0.5)",
  "--text-disabled": "rgba(226, 232, 240, 0.3)",
  "--card-item-hover-bg": "rgba(255, 255, 255, 0.06)",
  "--success": "#10b981",
  "--warning": "#f59e0b",
  "--destructive": "#ef4444",
  "--secondary": "#334155",
  "--muted": "#1e293b",
  "--muted-foreground": "#94a3b8",
  "--popover": "#1e293b",
  "--popover-foreground": "#e2e8f0",
  "--secondary-foreground": "#e2e8f0",
  "--accent-foreground": "#f8fafc",
  "--destructive-foreground": "#ffffff",
  "--input": "#334155",
  "--input-background": "#1e293b",
  "--switch-background": "#334155",
  "--ring": "#6366f1",
  "--sidebar": "#0f172a",
  "--sidebar-foreground": "#e2e8f0",
  "--sidebar-primary": "#6366f1",
  "--sidebar-primary-foreground": "#ffffff",
  "--sidebar-accent": "#1e293b",
  "--sidebar-accent-foreground": "#e2e8f0",
  "--sidebar-border": "#334155",
  "--sidebar-ring": "#6366f1",
};

// ROYAL GOLD
const royalGoldColors: ThemeColors = {
  "--background": "#451a03",
  "--foreground": "#fef3c7",
  "--section-bg": "#78350f",
  "--card": "#78350f",
  "--card-foreground": "#fef3c7",
  "--border": "#92400e",
  "--primary": "#f59e0b",
  "--primary-dark": "#d97706",
  "--primary-light": "#fbbf24",
  "--primary-foreground": "#451a03",
  "--accent": "#fbbf24",
  "--accent-light": "#451a03",
  "--text-primary": "#fffbeb",
  "--text-secondary": "#fde68a",
  "--text-tertiary": "rgba(254, 243, 199, 0.5)",
  "--text-disabled": "rgba(254, 243, 199, 0.3)",
  "--card-item-hover-bg": "rgba(255, 255, 255, 0.06)",
  "--success": "#10b981",
  "--warning": "#f59e0b",
  "--destructive": "#ef4444",
  "--secondary": "#92400e",
  "--muted": "#78350f",
  "--muted-foreground": "#fcd34d",
  "--popover": "#78350f",
  "--popover-foreground": "#fef3c7",
  "--secondary-foreground": "#fef3c7",
  "--accent-foreground": "#451a03",
  "--destructive-foreground": "#ffffff",
  "--input": "#92400e",
  "--input-background": "#78350f",
  "--switch-background": "#92400e",
  "--ring": "#f59e0b",
  "--sidebar": "#451a03",
  "--sidebar-foreground": "#fef3c7",
  "--sidebar-primary": "#f59e0b",
  "--sidebar-primary-foreground": "#451a03",
  "--sidebar-accent": "#78350f",
  "--sidebar-accent-foreground": "#fef3c7",
  "--sidebar-border": "#92400e",
  "--sidebar-ring": "#f59e0b",
};

// FIGMA MINIMALIST - Light
const minimalistLightColors: ThemeColors = {
  "--background": "#FAFAFA",
  "--foreground": "#111827",
  "--section-bg": "#F3F7F9",
  "--card": "#FFFFFF",
  "--card-foreground": "#111827",
  "--border": "#E5E7EB",
  "--primary": "#4F6D7A",
  "--primary-dark": "#3A505B",
  "--primary-light": "#E8F1F4",
  "--primary-foreground": "#FFFFFF",
  "--accent": "#6FB1A0",
  "--accent-light": "#E3F3EF",
  "--accent-indigo": "#6366F1",
  "--accent-indigo-dark": "#4F46E5",
  "--text-primary": "#111827",
  "--text-secondary": "#6B7280",
  "--text-tertiary": "rgba(0, 0, 0, 0.5)",
  "--text-disabled": "rgba(0, 0, 0, 0.3)",
  "--card-item-hover-bg": "rgba(0, 0, 0, 0.03)",
  "--success": "#22C55E",
  "--warning": "#F59E0B",
  "--destructive": "#EF4444",
  "--secondary": "#F3F4F6",
  "--muted": "#F3F4F6",
  "--muted-foreground": "#6B7280",
  "--popover": "#FFFFFF",
  "--popover-foreground": "#111827",
  "--secondary-foreground": "#111827",
  "--accent-foreground": "#111827",
  "--destructive-foreground": "#FFFFFF",
  "--input": "transparent",
  "--input-background": "#FFFFFF",
  "--switch-background": "#cbced4",
  "--ring": "#4F6D7A",
  "--sidebar": "#FFFFFF",
  "--sidebar-foreground": "#111827",
  "--sidebar-primary": "#4F6D7A",
  "--sidebar-primary-foreground": "#FFFFFF",
  "--sidebar-accent": "#F9FAFB",
  "--sidebar-accent-foreground": "#111827",
  "--sidebar-border": "#E5E7EB",
  "--sidebar-ring": "#4F6D7A",
  "--ivory": "#FAFAFA",
  "--glass-bg": "rgba(255, 255, 255, 0.7)",
  "--glass-border": "rgba(255, 255, 255, 0.5)",
  "--neon-glow": "0 0 20px rgba(79, 109, 122, 0.3)",
};

// FIGMA MINIMALIST - Dark
const minimalistDarkColors: ThemeColors = {
  "--background": "oklch(0.145 0 0)",
  "--foreground": "oklch(0.985 0 0)",
  "--section-bg": "oklch(0.205 0 0)",
  "--card": "oklch(0.205 0 0)",
  "--card-foreground": "oklch(0.985 0 0)",
  "--border": "oklch(0.3 0 0)",
  "--primary": "oklch(0.488 0.243 264.376)",
  "--primary-dark": "oklch(0.4 0.2 264.376)",
  "--primary-light": "oklch(0.55 0.25 264.376)",
  "--primary-foreground": "oklch(0.205 0 0)",
  "--accent": "oklch(0.696 0.17 162.48)",
  "--accent-light": "oklch(0.3 0.1 162.48)",
  "--accent-indigo": "oklch(0.488 0.243 264.376)",
  "--accent-indigo-dark": "oklch(0.4 0.2 264.376)",
  "--text-primary": "oklch(0.985 0 0)",
  "--text-secondary": "oklch(0.708 0 0)",
  "--text-tertiary": "rgba(255, 255, 255, 0.5)",
  "--text-disabled": "rgba(255, 255, 255, 0.3)",
  "--card-item-hover-bg": "rgba(255, 255, 255, 0.06)",
  "--success": "oklch(0.62 0.15 160)",
  "--warning": "oklch(0.75 0.15 80)",
  "--destructive": "oklch(0.396 0.141 25.723)",
  "--secondary": "oklch(0.269 0 0)",
  "--muted": "oklch(0.269 0 0)",
  "--muted-foreground": "oklch(0.708 0 0)",
  "--popover": "oklch(0.205 0 0)",
  "--popover-foreground": "oklch(0.985 0 0)",
  "--secondary-foreground": "oklch(0.985 0 0)",
  "--accent-foreground": "oklch(0.205 0 0)",
  "--destructive-foreground": "oklch(0.637 0.237 25.331)",
  "--input": "oklch(0.269 0 0)",
  "--input-background": "oklch(0.205 0 0)",
  "--switch-background": "oklch(0.4 0 0)",
  "--ring": "oklch(0.488 0.243 264.376)",
  "--sidebar": "oklch(0.205 0 0)",
  "--sidebar-foreground": "oklch(0.985 0 0)",
  "--sidebar-primary": "oklch(0.488 0.243 264.376)",
  "--sidebar-primary-foreground": "oklch(0.985 0 0)",
  "--sidebar-accent": "oklch(0.269 0 0)",
  "--sidebar-accent-foreground": "oklch(0.985 0 0)",
  "--sidebar-border": "oklch(0.3 0 0)",
  "--sidebar-ring": "oklch(0.488 0.243 264.376)",
  "--chart-1": "oklch(0.488 0.243 264.376)",
  "--chart-2": "oklch(0.696 0.17 162.48)",
  "--chart-3": "oklch(0.769 0.188 70.08)",
  "--chart-4": "oklch(0.627 0.265 303.9)",
  "--chart-5": "oklch(0.645 0.246 16.439)",
  "--ivory": "oklch(0.985 0 0)",
  "--glass-bg": "rgba(30, 30, 30, 0.7)",
  "--glass-border": "rgba(255, 255, 255, 0.1)",
  "--neon-glow": "0 0 20px rgba(111, 177, 160, 0.4)",
};

export const themes: Record<ThemeType, ThemeInfo> = {
  "the-palette": {
    name: "The Palette",
    description: "Ivory White, Soft Sage & Deep Olive — elegant and organic",
    emoji: "🎨",
    colors: lightPaletteColors,
  },
  "sapphire-dreams": {
    name: "Sapphire Dreams",
    description: "Deep blue night sky with indigo and violet accents",
    emoji: "💎",
    colors: sapphireDreamsColors,
  },
  "royal-gold": {
    name: "Royal Gold",
    description: "Rich amber and gold tones for a majestic feel",
    emoji: "👑",
    colors: royalGoldColors,
  },
  "minimalist": {
    name: "Minimalist",
    description: "Clean, modern design with teal and mint accents",
    emoji: "✨",
    colors: minimalistLightColors,
  },
};

// Map themes to their light/dark color sets
const themeColorSets: Record<ThemeType, { light: ThemeColors; dark: ThemeColors }> = {
  "the-palette": { light: lightPaletteColors, dark: darkPaletteColors },
  "sapphire-dreams": { light: sapphireDreamsColors, dark: sapphireDreamsColors },
  "royal-gold": { light: royalGoldColors, dark: royalGoldColors },
  "minimalist": { light: minimalistLightColors, dark: minimalistDarkColors },
};

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>(() => {
    const saved = localStorage.getItem("skill-swap-theme");
    const validThemes = Object.keys(themes) as ThemeType[];
    if (saved && validThemes.includes(saved as ThemeType)) {
      return saved as ThemeType;
    }
    return "the-palette";
  });

  const [isDarkMode, setIsDarkModeState] = useState<boolean>(() => {
    const saved = localStorage.getItem("skill-swap-dark-mode");
    if (saved) {
      return saved === "true";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    localStorage.setItem("skill-swap-theme", theme);
    localStorage.setItem("skill-swap-dark-mode", String(isDarkMode));
    
    // Get the appropriate color set based on theme and mode
    const colorSet = themeColorSets[theme];
    const themeColors = isDarkMode ? colorSet.dark : colorSet.light;
    
    Object.entries(themeColors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
    
    // Set theme attribute for CSS selectors
    if (theme === "minimalist") {
      document.documentElement.setAttribute("data-theme", "minimalist");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme, isDarkMode]);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
  };

  const setIsDarkMode = (isDark: boolean) => {
    setIsDarkModeState(isDark);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDarkMode, setIsDarkMode }}>
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
