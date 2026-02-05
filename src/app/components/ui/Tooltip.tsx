import { ReactNode, useState } from "react";

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export function Tooltip({ content, children, position = "top" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute z-50 px-3 py-2 rounded-lg text-[12px] whitespace-nowrap animate-in fade-in zoom-in-95 duration-150 ${positionClasses[position]}`}
          style={{
            backgroundColor: 'var(--foreground)',
            color: 'var(--background)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
          }}
        >
          {content}
          {/* Arrow */}
          <div
            className="absolute w-2 h-2 rotate-45"
            style={{
              backgroundColor: 'var(--foreground)',
              ...(position === "top" && { bottom: "-4px", left: "50%", transform: "translateX(-50%)" }),
              ...(position === "bottom" && { top: "-4px", left: "50%", transform: "translateX(-50%)" }),
              ...(position === "left" && { right: "-4px", top: "50%", transform: "translateY(-50%)" }),
              ...(position === "right" && { left: "-4px", top: "50%", transform: "translateY(-50%)" }),
            }}
          />
        </div>
      )}
    </div>
  );
}
