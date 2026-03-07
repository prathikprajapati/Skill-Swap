"use client";

import { SkillChip } from "@/app/components/ui/skill-chip";

interface UserSkill {
  id: string;
  name: string;
}

interface SkillsSummaryCardProps {
  offeredSkills?: UserSkill[];
  wantedSkills?: UserSkill[];
}

export function SkillsSummaryCard({ 
  offeredSkills = [], 
  wantedSkills = [] 
}: SkillsSummaryCardProps) {
  return (
    <div 
      className="p-6 rounded-xl border transition-all duration-300 hover:shadow-md"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      <h3 
        className="text-[18px] mb-4"
        style={{ color: 'var(--text-primary)', fontWeight: 600 }}
      >
        Your Skills Summary
      </h3>

      <div className="mb-5">
        <p 
          className="text-[12px] mb-2"
          style={{ color: 'var(--text-secondary)', fontWeight: 600 }}
        >
          YOU CAN TEACH ({offeredSkills.length})
        </p>
        <div className="flex flex-wrap gap-2">
          {offeredSkills.slice(0, 5).map((skill) => (
            <SkillChip key={skill.id} skill={skill.name} type="offer" size="sm" />
          ))}
          {offeredSkills.length === 0 && (
            <p className="text-sm" style={{ color: 'var(--text-disabled)' }}>No skills added yet</p>
          )}
          {offeredSkills.length > 5 && (
            <span 
              className="text-xs px-2 py-1 rounded-full"
              style={{ 
                backgroundColor: 'var(--secondary)', 
                color: 'var(--text-tertiary)' 
              }}
            >
              +{offeredSkills.length - 5} more
            </span>
          )}
        </div>
      </div>

      <div>
        <p 
          className="text-[12px] mb-2"
          style={{ color: 'var(--text-secondary)', fontWeight: 600 }}
        >
          YOU WANT TO LEARN ({wantedSkills.length})
        </p>
        <div className="flex flex-wrap gap-2">
          {wantedSkills.slice(0, 5).map((skill) => (
            <SkillChip key={skill.id} skill={skill.name} type="want" size="sm" />
          ))}
          {wantedSkills.length === 0 && (
            <p className="text-sm" style={{ color: 'var(--text-disabled)' }}>No skills added yet</p>
          )}
          {wantedSkills.length > 5 && (
            <span 
              className="text-xs px-2 py-1 rounded-full"
              style={{ 
                backgroundColor: 'var(--secondary)', 
                color: 'var(--text-tertiary)' 
              }}
            >
              +{wantedSkills.length - 5} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

