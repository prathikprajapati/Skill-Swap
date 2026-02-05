import { Button } from "@/app/components/ui/skill-swap-button";
import { SkillChip } from "@/app/components/ui/skill-chip";
import { TrendingUp } from "lucide-react";

export interface MatchCardProps {
  user: {
    name: string;
    avatar: string;
    matchScore: number;
    offeredSkills: string[];
    wantedSkills: string[];
  };
  onSendRequest?: () => void;
}

export function MatchCard({ user, onSendRequest }: MatchCardProps) {
  return (
    <div 
      className="p-6 rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div
            className="w-16 h-16 rounded-full bg-cover bg-center ring-2 ring-offset-2"
            style={{ 
              backgroundImage: `url(${user.avatar})`,
              ringColor: 'var(--primary-light)',
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[18px]" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
              {user.name}
            </h3>
          </div>

          {/* Match Score Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1.5">
              <TrendingUp className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              <span className="text-[12px]" style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
                MATCH STRENGTH
              </span>
              <span className="text-[14px] ml-auto" style={{ color: 'var(--accent)', fontWeight: 600 }}>
                {user.matchScore}%
              </span>
            </div>
            <div 
              className="w-full h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: 'var(--secondary)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  backgroundColor: 'var(--accent)',
                  width: `${user.matchScore}%`,
                }}
              />
            </div>
          </div>

          {/* Offered Skills */}
          <div className="mb-4">
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

          {/* Action Button */}
          <div className="flex justify-end">
            <Button onClick={onSendRequest}>
              Send Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
