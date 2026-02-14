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
                  {themeKey === "sapphire-dreams" && (
                    <>
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#3372ca" }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#4c2aa3" }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#4a1339" }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#07111a" }} />
                    </>
                  )}
                  {/* {themeKey === "deep-space" && (
                    <>
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#d66853" }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#7d4e57" }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#364156" }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#11151c" }} />
                    </>
                  )} */}
                  {/* {themeKey === "lavender-mist" && (
                    <>
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#7d1d3f" }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#3943b7" }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#9b9ece" }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#acadbc" }} />
                    </>
                  )} */}
                  {/* {themeKey === "graphite-mint" && (
                    <>
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#6ec19e" }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#438e8b" }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#636363" }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#2d302f" }} />
                    </>
                  )} */}
                  {/* {themeKey === "forest-mist" && (
                    <>
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#C5D5D1" }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#8FA8A3" }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#2D5A52" }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#1F3A34" }} />
                    </>
                  )} */}
                  {themeKey === "royal-gold" && (
                    <>
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#D4A964" }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#8B6914" }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#5A1A3D" }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#3E0F2F" }} />
                    </>
                  )}
                  {/* {themeKey === "cosmic-purple" && (
                    <>
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#AC58E9" }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#7A3DBF" }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#2D1B4E" }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#000000" }} />
                    </>
                  )} */}
                  {/* {themeKey === "warm-burgundy" && (
                    <>
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#90353D" }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#C4A77D" }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#E8DCC8" }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#F4EDE3" }} />
                    </>
                  )} */}
                  {/* {themeKey === "olive-garden" && (
                    <>
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#D7D8B6" }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#8B8C6A" }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#3A3A24" }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#535434" }} />
                    </>
                  )} */}
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
