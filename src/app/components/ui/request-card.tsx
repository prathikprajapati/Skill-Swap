import { Button } from "@/app/components/ui/skill-swap-button";
import { SkillChip } from "@/app/components/ui/skill-chip";
import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

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

  return (
    <div 
      className={`p-6 rounded-xl border transition-all duration-300 ${
        type === "incoming" ? "hover:shadow-lg hover:-translate-y-1" : ""
      } ${isAccepting ? "animate-out fade-out slide-out-to-right-4" : ""} ${
        isRejecting ? "animate-out fade-out slide-out-to-left-4" : ""
      }`}
      style={{
        backgroundColor: 'var(--card)',
        borderColor: type === "incoming" ? 'var(--accent)' : 'var(--border)',
        borderWidth: type === "incoming" ? '2px' : '1px',
        boxShadow: type === "incoming" ? '0 0 0 4px rgba(111, 177, 160, 0.1)' : 'none',
      }}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div
            className="w-14 h-14 rounded-full bg-cover bg-center ring-2 ring-offset-2"
            style={{ 
              backgroundImage: `url(${user.avatar})`,
              ringColor: type === "incoming" ? 'var(--accent-light)' : 'var(--border)',
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-[16px] mb-3" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
            {user.name}
            {type === "incoming" && (
              <span 
                className="ml-2 text-[12px] px-2 py-0.5 rounded-full"
                style={{ 
                  backgroundColor: 'var(--accent-light)',
                  color: 'var(--accent)',
                  fontWeight: 600,
                }}
              >
                New
              </span>
            )}
          </h3>

          {/* Offered Skills */}
          <div className="mb-3">
            <p className="text-[12px] mb-2" style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
              CAN TEACH
            </p>
            <div className="flex flex-wrap gap-2">
              {user.offeredSkills.map((skill) => (
                <SkillChip key={skill} skill={skill} type="offer" size="sm" />
              ))}
            </div>
          </div>

          {/* Wanted Skills */}
          <div className="mb-4">
            <p className="text-[12px] mb-2" style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
              WANTS TO LEARN
            </p>
            <div className="flex flex-wrap gap-2">
              {user.wantedSkills.map((skill) => (
                <SkillChip key={skill} skill={skill} type="want" size="sm" />
              ))}
            </div>
          </div>

          {/* Action Buttons - Only for incoming requests */}
          {type === "incoming" && (
            <div className="flex gap-2">
              <Button onClick={handleAccept} size="sm" className="flex-1">
                <CheckCircle className="w-4 h-4 mr-1" />
                Accept
              </Button>
              <Button onClick={handleReject} variant="outline" size="sm" className="flex-1">
                <XCircle className="w-4 h-4 mr-1" />
                Reject
              </Button>
            </div>
          )}

          {/* Status for sent requests */}
          {type === "sent" && (
            <div 
              className="text-[13px] px-3 py-2 rounded-lg inline-flex items-center gap-2"
              style={{ 
                backgroundColor: 'var(--secondary)',
                color: 'var(--text-secondary)',
              }}
            >
              <div 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: 'var(--warning)' }}
              />
              Pending Response
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
