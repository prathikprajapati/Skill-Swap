import { X } from "lucide-react";

export interface SkillChipProps {
  skill: string;
  type: "offer" | "want";
  onRemove?: () => void;
  size?: "default" | "sm";
}

export function SkillChip({ skill, type, onRemove, size = "default" }: SkillChipProps) {
  const bgColor = type === "offer" ? "var(--accent-light)" : "var(--primary-light)";
  const textColor = type === "offer" ? "var(--accent)" : "var(--primary-dark)";
  
  const padding = size === "sm" ? "px-2.5 py-1.5" : "px-3 py-2";
  const fontSize = size === "sm" ? "text-[12px]" : "text-[14px]";

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full ${padding} ${fontSize} transition-all duration-200 hover:shadow-sm`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        fontWeight: 500,
      }}
    >
      <span>{skill}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:opacity-70 transition-opacity rounded-full hover:bg-white/50 p-0.5"
          aria-label={`Remove ${skill}`}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
