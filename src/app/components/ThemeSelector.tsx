import { useTheme, themes } from "../contexts/ThemeContext";
import type { ThemeType } from "../contexts/ThemeContext";
import { Check } from "lucide-react";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-3">
      {(Object.keys(themes) as ThemeType[]).map((themeKey) => {
        const themeInfo = themes[themeKey];
        const isActive = theme === themeKey;

        return (
          <button
            key={themeKey}
            onClick={() => setTheme(themeKey)}
            className="w-full p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] text-left group"
            style={{
              backgroundColor: isActive ? "var(--accent-light)" : "var(--card)",
              borderColor: isActive ? "var(--accent)" : "var(--border)",
              boxShadow: isActive ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "none",
            }}
            aria-label={`Select ${themeInfo.name} theme`}
          >
            <div className="flex items-start gap-3">
              <div
                className="text-3xl mt-0.5 group-hover:scale-110 transition-transform"
                role="img"
                aria-label={themeInfo.name}
              >
                {themeInfo.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4
                    className="text-[16px]"
                    style={{
                      color: "var(--text-primary)",
                      fontWeight: 600,
                    }}
                  >
                    {themeInfo.name}
                  </h4>
                  {isActive && (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center animate-in zoom-in-50"
                      style={{ backgroundColor: "var(--accent)" }}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <p
                  className="text-[13px]"
                  style={{ color: "var(--text-secondary)", lineHeight: 1.5 }}
                >
                  {themeInfo.description}
                </p>

                {/* Color Preview */}
                <div className="flex gap-2 mt-3">
                  {themeKey === "warm-light" && (
                    <>
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: "#F97316" }}
                      />
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: "#FB923C" }}
                      />
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: "#FEF3C7" }}
                      />
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: "#FFF7ED" }}
                      />
                    </>
                  )}
                  {themeKey === "cool-light" && (
                    <>
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: "#4F6D7A" }}
                      />
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: "#6366F1" }}
                      />
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: "#6FB1A0" }}
                      />
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: "#F8FAFC" }}
                      />
                    </>
                  )}
                  {themeKey === "dark" && (
                    <>
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: "#38BDF8" }}
                      />
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: "#A78BFA" }}
                      />
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: "#1E293B" }}
                      />
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: "#0F172A" }}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
