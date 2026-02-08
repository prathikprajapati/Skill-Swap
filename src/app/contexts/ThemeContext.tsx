import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type ThemeType = "sapphire-dreams" | "deep-space" | "lavender-mist" | "graphite-mint" | "forest-mist" | "royal-gold" | "cosmic-purple" | "warm-burgundy" | "olive-garden";

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes = {
  "sapphire-dreams": {
    name: "Sapphire Dreams",
    description: "Deep blues and rich tones — elegant and sophisticated",
    emoji: "💎",
    colors: {
      "--background": "#07111a",
      "--foreground": "#FFFFFF",
      "--section-bg": "#0d1d2d",
      "--card": "#162a3d",
      "--card-foreground": "#FFFFFF",
      "--border": "#3372ca",
      "--primary": "#3372ca",
      "--primary-dark": "#4c2aa3",
      "--primary-light": "#1a3a5c",
      "--primary-foreground": "#FFFFFF",
      "--accent": "#4c2aa3",
      "--accent-light": "#2d1b5e",
      "--accent-indigo": "#3372ca",
      "--accent-indigo-dark": "#4c2aa3",
      "--text-primary": "#FFFFFF",
      "--text-secondary": "#E8E8E8",
      "--text-disabled": "#A0A0A0",
      "--success": "#22C55E",
      "--warning": "#F59E0B",
      "--destructive": "#EF4444",
      "--secondary": "#162a3d",
      "--muted": "#162a3d",
      "--muted-foreground": "#B0B0B0",
    },
  },
  "deep-space": {
    name: "Deep Space",
    description: "Dark cosmic palette — mysterious and expansive",
    emoji: "🌌",
    colors: {
      "--background": "#11151c",
      "--foreground": "#FFFFFF",
      "--section-bg": "#1a1f2a",
      "--card": "#252b38",
      "--card-foreground": "#FFFFFF",
      "--border": "#d66853",
      "--primary": "#d66853",
      "--primary-dark": "#7d4e57",
      "--primary-light": "#3d2529",
      "--primary-foreground": "#FFFFFF",
      "--accent": "#7d4e57",
      "--accent-light": "#4a2e33",
      "--accent-indigo": "#d66853",
      "--accent-indigo-dark": "#7d4e57",
      "--text-primary": "#FFFFFF",
      "--text-secondary": "#E0E0E0",
      "--text-disabled": "#A0A0A0",
      "--success": "#22C55E",
      "--warning": "#F59E0B",
      "--destructive": "#EF4444",
      "--secondary": "#252b38",
      "--muted": "#252b38",
      "--muted-foreground": "#B0B0B0",
    },
  },
  "lavender-mist": {
    name: "Lavender Mist",
    description: "Soft purples with warm accents — dreamy and artistic",
    emoji: "🔮",
    colors: {
      "--background": "#f5f5f8",
      "--foreground": "#1a1a2e",
      "--section-bg": "#e8e8f0",
      "--card": "#FFFFFF",
      "--card-foreground": "#1a1a2e",
      "--border": "#9b9ece",
      "--primary": "#7d1d3f",
      "--primary-dark": "#512500",
      "--primary-light": "#f0e6eb",
      "--primary-foreground": "#FFFFFF",
      "--accent": "#3943b7",
      "--accent-light": "#d8daf0",
      "--accent-indigo": "#7d1d3f",
      "--accent-indigo-dark": "#512500",
      "--text-primary": "#1a1a2e",
      "--text-secondary": "#3a3a4e",
      "--text-disabled": "#7a7a8e",
      "--success": "#22C55E",
      "--warning": "#F59E0B",
      "--destructive": "#EF4444",
      "--secondary": "#e8e8f0",
      "--muted": "#e8e8f0",
      "--muted-foreground": "#5a5a6e",
    },
  },
  "graphite-mint": {
    name: "Graphite Mint",
    description: "Cool greys with refreshing mint — modern and balanced",
    emoji: "🌿",
    colors: {
      "--background": "#f8f9fa",
      "--foreground": "#1a1d1f",
      "--section-bg": "#e9ecef",
      "--card": "#FFFFFF",
      "--card-foreground": "#1a1d1f",
      "--border": "#438e8b",
      "--primary": "#6ec19e",
      "--primary-dark": "#438e8b",
      "--primary-light": "#d4f0e5",
      "--primary-foreground": "#1a1d1f",
      "--accent": "#438e8b",
      "--accent-light": "#c3e5de",
      "--accent-indigo": "#6ec19e",
      "--accent-indigo-dark": "#438e8b",
      "--text-primary": "#1a1d1f",
      "--text-secondary": "#3a3d3f",
      "--text-disabled": "#6a6d6f",
      "--success": "#22C55E",
      "--warning": "#F59E0B",
      "--destructive": "#EF4444",
      "--secondary": "#e9ecef",
      "--muted": "#e9ecef",
      "--muted-foreground": "#5a5d5f",
    },
  },
  "forest-mist": {
    name: "Forest Mist",
    description: "Serene greens and soft whites — natural and calming",
    emoji: "🌲",
    colors: {
      "--background": "#f4f8f7",
      "--foreground": "#1F3A34",
      "--section-bg": "#e8f0ee",
      "--card": "#FFFFFF",
      "--card-foreground": "#1F3A34",
      "--border": "#8FA8A3",
      "--primary": "#2D5A52",
      "--primary-dark": "#1F3A34",
      "--primary-light": "#E8F0EE",
      "--primary-foreground": "#FFFFFF",
      "--accent": "#8FA8A3",
      "--accent-light": "#D5E0DD",
      "--accent-indigo": "#2D5A52",
      "--accent-indigo-dark": "#1F3A34",
      "--text-primary": "#1F3A34",
      "--text-secondary": "#3F5A54",
      "--text-disabled": "#6F8A84",
      "--success": "#22C55E",
      "--warning": "#F59E0B",
      "--destructive": "#EF4444",
      "--secondary": "#e8f0ee",
      "--muted": "#e8f0ee",
      "--muted-foreground": "#5F7A74",
    },
  },
  "royal-gold": {
    name: "Royal Gold",
    description: "Luxurious gold with deep burgundy — rich and opulent",
    emoji: "👑",
    colors: {
      "--background": "#2a0a1f",
      "--foreground": "#FFFFFF",
      "--section-bg": "#3E0F2F",
      "--card": "#5A1A3D",
      "--card-foreground": "#FFFFFF",
      "--border": "#D4A964",
      "--primary": "#D4A964",
      "--primary-dark": "#8B6914",
      "--primary-light": "#F5E6C8",
      "--primary-foreground": "#2a0a1f",
      "--accent": "#8B6914",
      "--accent-light": "#E8D5A3",
      "--accent-indigo": "#D4A964",
      "--accent-indigo-dark": "#8B6914",
      "--text-primary": "#FFFFFF",
      "--text-secondary": "#F0E0C0",
      "--text-disabled": "#A89070",
      "--success": "#22C55E",
      "--warning": "#F59E0B",
      "--destructive": "#EF4444",
      "--secondary": "#5A1A3D",
      "--muted": "#5A1A3D",
      "--muted-foreground": "#D4A964",
    },
  },
  "cosmic-purple": {
    name: "Cosmic Purple",
    description: "Electric purple on black — futuristic and bold",
    emoji: "🌠",
    colors: {
      "--background": "#0a0a0a",
      "--foreground": "#FFFFFF",
      "--section-bg": "#1A1A1A",
      "--card": "#2D1B4E",
      "--card-foreground": "#FFFFFF",
      "--border": "#AC58E9",
      "--primary": "#AC58E9",
      "--primary-dark": "#7A3DBF",
      "--primary-light": "#D4A5F9",
      "--primary-foreground": "#0a0a0a",
      "--accent": "#D4A5F9",
      "--accent-light": "#2D1B4E",
      "--accent-indigo": "#AC58E9",
      "--accent-indigo-dark": "#7A3DBF",
      "--text-primary": "#FFFFFF",
      "--text-secondary": "#E0D0F0",
      "--text-disabled": "#A080C0",
      "--success": "#22C55E",
      "--warning": "#F59E0B",
      "--destructive": "#EF4444",
      "--secondary": "#2D1B4E",
      "--muted": "#2D1B4E",
      "--muted-foreground": "#AC58E9",
    },
  },
  "warm-burgundy": {
    name: "Warm Burgundy",
    description: "Cream and burgundy — classic and refined",
    emoji: "🍷",
    colors: {
      "--background": "#faf8f5",
      "--foreground": "#90353D",
      "--section-bg": "#f0ebe3",
      "--card": "#FFFFFF",
      "--card-foreground": "#90353D",
      "--border": "#C4A77D",
      "--primary": "#90353D",
      "--primary-dark": "#5C2428",
      "--primary-light": "#F0E0E2",
      "--primary-foreground": "#FFFFFF",
      "--accent": "#C4A77D",
      "--accent-light": "#E8DCC8",
      "--accent-indigo": "#90353D",
      "--accent-indigo-dark": "#5C2428",
      "--text-primary": "#90353D",
      "--text-secondary": "#702530",
      "--text-disabled": "#A68B7A",
      "--success": "#22C55E",
      "--warning": "#F59E0B",
      "--destructive": "#EF4444",
      "--secondary": "#f0ebe3",
      "--muted": "#f0ebe3",
      "--muted-foreground": "#702530",
    },
  },
  "olive-garden": {
    name: "Olive Garden",
    description: "Earthy olive tones — grounded and organic",
    emoji: "🫒",
    colors: {
      "--background": "#f5f5f0",
      "--foreground": "#3A3A24",
      "--section-bg": "#e8e8e0",
      "--card": "#FFFFFF",
      "--card-foreground": "#3A3A24",
      "--border": "#8B8C6A",
      "--primary": "#535434",
      "--primary-dark": "#3A3A24",
      "--primary-light": "#E8E9D4",
      "--primary-foreground": "#FFFFFF",
      "--accent": "#8B8C6A",
      "--accent-light": "#C5C6A8",
      "--accent-indigo": "#535434",
      "--accent-indigo-dark": "#3A3A24",
      "--text-primary": "#3A3A24",
      "--text-secondary": "#5A5A44",
      "--text-disabled": "#8B8C6A",
      "--success": "#22C55E",
      "--warning": "#F59E0B",
      "--destructive": "#EF4444",
      "--secondary": "#e8e8e0",
      "--muted": "#e8e8e0",
      "--muted-foreground": "#6A6A54",
    },
  },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>(() => {
    const saved = localStorage.getItem("skill-swap-theme");
    const validThemes = Object.keys(themes) as ThemeType[];
    // Check if saved theme is valid, otherwise default to sapphire-dreams
    if (saved && validThemes.includes(saved as ThemeType)) {
      return saved as ThemeType;
    }
    return "sapphire-dreams";
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
