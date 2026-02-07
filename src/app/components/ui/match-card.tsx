import { Button } from "@/app/components/ui/skill-swap-button";
import { SkillChip } from "@/app/components/ui/skill-chip";
import SpotlightCard from "./SpotlightCard";

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
  // Calculate progress bar width based on match score
  const progressWidth = `${user.matchScore}%`;

  return (
    <SpotlightCard 
      className="h-[340px] w-full flex flex-col cursor-pointer group transition-transform duration-300 hover:-translate-y-1"
      spotlightColor="rgba(99, 102, 241, 0.15)"
    >
      {/* Header - Avatar & Name with Match Score */}
      <div className="flex items-center gap-3 mb-3 shrink-0">
        <div
          className="w-12 h-12 rounded-full bg-cover bg-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
          style={{ 
            backgroundImage: `url(${user.avatar})`,
            boxShadow: '0 0 0 2px var(--primary-light)',
          }}
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold truncate leading-tight" style={{ color: 'var(--text-primary)' }}>
            {user.name}
          </h3>
          {/* Match Score - Consistent presentation without arrow */}
          <div className="flex items-center gap-1.5 mt-0.5">
            <span 
              className="text-xs font-bold"
              style={{ color: 'var(--accent)' }}
            >
              {user.matchScore}% Match
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar - Accurate scaling */}
      <div className="mb-4 shrink-0">
        <div 
          className="w-full h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: 'var(--secondary)' }}
        >
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              backgroundColor: 'var(--accent)',
              width: progressWidth,
            }}
          />
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

      {/* Action Button - Fixed at Bottom with consistent spacing */}
      <div className="mt-auto pt-4 shrink-0">
        <Button onClick={onSendRequest} size="sm" className="w-full">
          Send Request
        </Button>
      </div>
    </SpotlightCard>
  );
}
