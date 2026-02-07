import { Button } from "@/app/components/ui/skill-swap-button";
import { SkillChip } from "@/app/components/ui/skill-chip";
import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import SpotlightCard from "./SpotlightCard";

export interface RequestCardProps {
  user: {
    name: string;
    avatar: string;
    offeredSkills: string[];
    wantedSkills: string[];
  };
  type: "incoming" | "sent";
  onAccept?: () => void;
  onReject?: () => void;
}

export function RequestCard({ user, type, onAccept, onReject }: RequestCardProps) {
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const handleAccept = () => {
    setIsAccepting(true);
    setTimeout(() => {
      onAccept?.();
    }, 300);
  };

  const handleReject = () => {
    setIsRejecting(true);
    setTimeout(() => {
      onReject?.();
    }, 300);
  };

  // Different spotlight colors based on type
  const spotlightColor = type === "incoming" 
    ? "rgba(34, 197, 94, 0.15)"  // Green tint for incoming
    : "rgba(99, 102, 241, 0.15)"; // Indigo tint for sent

  return (
    <SpotlightCard 
      className={`h-[300px] w-full flex flex-col transition-all duration-300 hover:-translate-y-1 ${
        isAccepting ? "animate-out fade-out slide-out-to-right-4" : ""
      } ${isRejecting ? "animate-out fade-out slide-out-to-left-4" : ""}`}
      spotlightColor={spotlightColor as `rgba(${number}, ${number}, ${number}, ${number})`}
    >
      {/* Header - Avatar & Name */}
      <div className="flex items-center gap-3 mb-3 shrink-0">
        <div
          className="w-11 h-11 rounded-full bg-cover bg-center flex-shrink-0"
          style={{ 
            backgroundImage: `url(${user.avatar})`,
            boxShadow: type === "incoming" 
              ? '0 0 0 2px var(--accent-light)' 
              : '0 0 0 2px var(--border)',
          }}
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold truncate leading-tight" style={{ color: 'var(--text-primary)' }}>
            {user.name}
          </h3>
          {type === "incoming" && (
            <span 
              className="inline-block text-[10px] px-1.5 py-0.5 rounded font-semibold mt-0.5"
              style={{ 
                backgroundColor: 'var(--accent-light)',
                color: 'var(--accent)',
              }}
            >
              New Request
            </span>
          )}
        </div>
      </div>

      {/* Divider */}
      <div 
        className="w-full h-px mb-3 shrink-0"
        style={{ backgroundColor: 'var(--border)' }}
      />

      {/* Skills Sections - Fixed Height with consistent spacing */}
      <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
        {/* Offered Skills */}
        <div className="shrink-0">
          <p 
            className="text-[10px] font-semibold uppercase tracking-wider mb-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            Can Teach
          </p>
          <div className="flex flex-wrap gap-1.5">
            {user.offeredSkills.slice(0, 3).map((skill) => (
              <SkillChip key={skill} skill={skill} type="offer" size="sm" />
            ))}
            {user.offeredSkills.length > 3 && (
              <span 
                className="text-[10px] px-2 py-1 rounded-full font-medium"
                style={{ 
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--text-secondary)',
                }}
              >
                +{user.offeredSkills.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Divider between sections */}
        <div 
          className="w-full h-px shrink-0"
          style={{ backgroundColor: 'var(--border)', opacity: 0.5 }}
        />

        {/* Wanted Skills */}
        <div className="shrink-0">
          <p 
            className="text-[10px] font-semibold uppercase tracking-wider mb-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            Wants to Learn
          </p>
          <div className="flex flex-wrap gap-1.5">
            {user.wantedSkills.slice(0, 3).map((skill) => (
              <SkillChip key={skill} skill={skill} type="want" size="sm" />
            ))}
            {user.wantedSkills.length > 3 && (
              <span 
                className="text-[10px] px-2 py-1 rounded-full font-medium"
                style={{ 
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--text-secondary)',
                }}
              >
                +{user.wantedSkills.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Area - Fixed at Bottom with consistent spacing */}
      <div className="mt-auto pt-4 shrink-0">
        {type === "incoming" ? (
          <div className="flex gap-2">
            <Button onClick={handleAccept} size="sm" className="flex-1">
              <CheckCircle className="w-3.5 h-3.5 mr-1" />
              Accept
            </Button>
            <Button onClick={handleReject} variant="outline" size="sm" className="flex-1">
              <XCircle className="w-3.5 h-3.5 mr-1" />
              Decline
            </Button>
          </div>
        ) : (
          <div 
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium"
            style={{ 
              backgroundColor: 'var(--secondary)',
              color: 'var(--text-secondary)',
            }}
          >
            <div 
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--warning)' }}
            />
            Pending Response
          </div>
        )}
      </div>
    </SpotlightCard>
  );
}
